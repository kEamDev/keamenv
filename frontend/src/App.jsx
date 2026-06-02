import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Download,
  Gauge,
  Globe2,
  Play,
  Radar,
  RefreshCw,
  Router,
  ShieldCheck,
  Signal,
  Wifi,
  XCircle
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const DEFAULT_API_BASE = import.meta.env.DEV ? "http://localhost:4000" : window.location.origin;
const DEFAULT_WS_BASE = import.meta.env.DEV ? "ws://localhost:4000" : window.location.origin.replace(/^http/, "ws");
const API_BASE = import.meta.env.VITE_API_BASE || DEFAULT_API_BASE;
const WS_BASE = import.meta.env.VITE_WS_BASE || DEFAULT_WS_BASE;

const initialBrowserState = {
  publicIp: { status: "idle", value: null, error: null },
  siteChecks: [],
  dns: [],
  webrtc: { status: "idle", local: [], public: [], mdns: [], error: null }
};

const statusStyles = {
  ok: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  blocked: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  warn: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  running: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
  idle: "border-slate-500/30 bg-slate-500/10 text-slate-200"
};

function buildWsUrl() {
  return `${WS_BASE.replace(/\/$/, "")}/ws/diagnostics`;
}

function buildPublicAssetUrl(path) {
  return `${import.meta.env.BASE_URL}${path}`.replace(/\/{2,}/g, "/");
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

function withAbortTimeout(timeoutMs) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    done: () => window.clearTimeout(timeout)
  };
}

function normalizeTxtRecord(data) {
  const answers = data?.Answer || data?.answer || [];
  return answers
    .map((answer) => answer.data || "")
    .join(" ")
    .replaceAll('"', "")
    .trim();
}

async function detectPublicIp() {
  const providers = [
    "https://api.ipify.org?format=json",
    "https://ifconfig.co/json"
  ];

  for (const provider of providers) {
    try {
      const data = await fetchJson(provider);
      return data.ip || data.ip_addr;
    } catch {
      // Try the next public endpoint.
    }
  }

  throw new Error("Не удалось получить публичный IP");
}

async function runBrowserFetchProbe(target) {
  const timer = withAbortTimeout(6000);
  const startedAt = performance.now();

  try {
    await fetch(target.url, {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
      signal: timer.signal
    });

    return {
      ...target,
      status: "ok",
      label: "Доступен",
      latencyMs: Math.round(performance.now() - startedAt),
      checkedAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      ...target,
      status: "blocked",
      label: error.name === "AbortError" ? "Таймаут" : "Блокирован",
      latencyMs: null,
      error: error.name === "AbortError" ? "Нет ответа за 6 секунд" : error.message,
      checkedAt: new Date().toISOString()
    };
  } finally {
    timer.done();
  }
}

async function detectDnsViaDoh() {
  const endpoints = [
    {
      provider: "Cloudflare DoH",
      url: "https://cloudflare-dns.com/dns-query?name=whoami.cloudflare&type=TXT",
      headers: { accept: "application/dns-json" }
    },
    {
      provider: "Google DoH",
      url: "https://dns.google/resolve?name=o-o.myaddr.l.google.com&type=TXT"
    }
  ];

  const results = await Promise.all(
    endpoints.map(async (endpoint) => {
      const timer = withAbortTimeout(6000);
      const startedAt = performance.now();

      try {
        const data = await fetchJson(endpoint.url, {
          headers: endpoint.headers || {},
          signal: timer.signal
        });

        return {
          provider: endpoint.provider,
          status: "ok",
          value: normalizeTxtRecord(data) || "Ответ без TXT-записи",
          latencyMs: Math.round(performance.now() - startedAt)
        };
      } catch (error) {
        return {
          provider: endpoint.provider,
          status: "blocked",
          value: null,
          latencyMs: null,
          error: error.name === "AbortError" ? "Таймаут DoH" : error.message
        };
      } finally {
        timer.done();
      }
    })
  );

  return results;
}

function classifyIp(value) {
  if (!value) return "unknown";
  if (value.endsWith(".local")) return "mdns";
  if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(value)) return "local";
  if (/^127\.|^0\.0\.0\.0$/.test(value)) return "local";
  if (/^(fc|fd|fe80:)/i.test(value)) return "local";
  if (/^[a-f0-9:]+$/i.test(value) && value.includes(":")) return "public";
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(value)) return "public";
  return "unknown";
}

function parseCandidateIp(candidate) {
  const ipv4 = candidate.match(/(\d{1,3}(?:\.\d{1,3}){3})/);
  if (ipv4) return ipv4[1];

  const mdns = candidate.match(/([a-z0-9-]+\.local)/i);
  if (mdns) return mdns[1];

  const ipv6 = candidate.match(/([a-f0-9]{0,4}:[a-f0-9:]{2,})/i);
  return ipv6?.[1] || null;
}

function detectWebRtcLeaks() {
  return new Promise((resolve) => {
    if (!window.RTCPeerConnection) {
      resolve({ status: "warn", local: [], public: [], mdns: [], error: "RTCPeerConnection не поддерживается" });
      return;
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });
    const seen = new Set();
    const result = { status: "ok", local: [], public: [], mdns: [], error: null };

    const addCandidate = (candidateLine) => {
      const ip = parseCandidateIp(candidateLine);
      if (!ip || seen.has(ip)) return;
      seen.add(ip);

      const type = classifyIp(ip);
      if (type === "local") result.local.push(ip);
      if (type === "public") result.public.push(ip);
      if (type === "mdns") result.mdns.push(ip);
    };

    const finish = () => {
      pc.onicecandidate = null;
      pc.close();
      if (!result.local.length && !result.public.length && !result.mdns.length) {
        result.status = "warn";
        result.error = "ICE-кандидаты не раскрыты браузером";
      }
      resolve(result);
    };

    pc.createDataChannel("diagnostics");
    pc.onicecandidate = (event) => {
      if (event.candidate?.candidate) {
        addCandidate(event.candidate.candidate);
      }
    };

    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .catch((error) => {
        result.status = "warn";
        result.error = error.message;
        finish();
      });

    window.setTimeout(finish, 4200);
  });
}

function StatusPill({ status, children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status] || statusStyles.idle}`}>
      {status === "ok" && <CheckCircle2 className="h-3.5 w-3.5" />}
      {status === "blocked" && <XCircle className="h-3.5 w-3.5" />}
      {status === "warn" && <AlertTriangle className="h-3.5 w-3.5" />}
      {status === "running" && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
      {children}
    </span>
  );
}

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1 text-cyan-200" aria-label="Загрузка">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-200 [animation-delay:-0.2s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-200 [animation-delay:-0.1s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-200" />
    </span>
  );
}

function MetricCard({ icon: Icon, label, value, tone = "cyan", sub }) {
  const tones = {
    cyan: "from-cyan-300/20 to-teal-300/10 text-cyan-100",
    green: "from-emerald-300/20 to-lime-300/10 text-emerald-100",
    amber: "from-amber-300/20 to-orange-300/10 text-amber-100",
    rose: "from-rose-300/20 to-red-300/10 text-rose-100"
  };

  return (
    <section className="glass rounded-lg p-4 animate-slide-up">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className={`rounded-lg bg-gradient-to-br p-3 ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {sub && <p className="mt-3 text-sm text-slate-400">{sub}</p>}
    </section>
  );
}

function WhiteListCard({ whiteList }) {
  const isRunning = whiteList.status === "running";
  const isReady = whiteList.status === "yes" || whiteList.status === "no";
  const status = isRunning ? "running" : whiteList.enabled ? "warn" : isReady ? "ok" : "idle";

  return (
    <section className="glass rounded-lg p-4 animate-slide-up">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Белые списки</p>
          <p className="mt-2 text-3xl font-semibold text-white">{isReady ? whiteList.label : isRunning ? "..." : "n/a"}</p>
        </div>
        <div className={`rounded-lg bg-gradient-to-br p-3 ${whiteList.enabled ? "from-amber-300/20 to-orange-300/10 text-amber-100" : "from-emerald-300/20 to-teal-300/10 text-emerald-100"}`}>
          {isRunning ? <RefreshCw className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
        </div>
      </div>
      <div className="mt-3">
        <StatusPill status={status}>{isRunning ? "Проверка" : whiteList.enabled ? "Да" : isReady ? "Нет" : "Ожидание"}</StatusPill>
      </div>
      <p className="mt-3 text-sm leading-5 text-slate-400">
        {whiteList.reason || "Ждем результат проверки."}
      </p>
    </section>
  );
}

function Panel({ title, icon: Icon, children, action }) {
  return (
    <section className="glass rounded-lg p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-cyan-200" />
          <h2 className="text-base font-semibold text-white">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function DataTable({ columns, rows, emptyText }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-700/70 text-xs uppercase tracking-[0.16em] text-slate-400">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="whitespace-nowrap px-3 py-3 font-medium">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {rows.length === 0 && (
            <tr>
              <td className="px-3 py-5 text-slate-400" colSpan={columns.length}>
                {emptyText}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr key={row.id || row.provider || row.name} className="hover:bg-slate-800/35">
              {columns.map((column) => (
                <td key={column.key} className="whitespace-nowrap px-3 py-3 text-slate-200">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [config, setConfig] = useState({ browserTargets: [], testSites: [], russianSites: [], vpnHosts: [], speedTestServices: [], whiteListProbeHosts: [] });
  const [backendAvailable, setBackendAvailable] = useState(false);
  const [browser, setBrowser] = useState(initialBrowserState);
  const [serverRussianSites, setServerRussianSites] = useState([]);
  const [serverHosts, setServerHosts] = useState([]);
  const [whiteList, setWhiteList] = useState({ status: "idle", enabled: false, label: null, reason: null, checks: [] });
  const [speedTests, setSpeedTests] = useState([]);
  const [progress, setProgress] = useState({ done: 0, total: 0, percent: 0, running: false });
  const [events, setEvents] = useState([]);
  const [socketState, setSocketState] = useState("idle");
  const socketRef = useRef(null);

  const appendEvent = (message, status = "running") => {
    setEvents((current) => [
      { id: crypto.randomUUID(), message, status, time: new Date().toLocaleTimeString() },
      ...current
    ].slice(0, 10));
  };

  const runBrowserDiagnostics = async (targets) => {
    setBrowser({
      publicIp: { status: "running", value: null, error: null },
      siteChecks: targets.map((target) => ({ ...target, status: "running", label: "Проверка", latencyMs: null })),
      dns: [
        { provider: "Cloudflare DoH", status: "running", value: "Проверка", latencyMs: null },
        { provider: "Google DoH", status: "running", value: "Проверка", latencyMs: null }
      ],
      webrtc: { status: "running", local: [], public: [], mdns: [], error: null }
    });

    detectPublicIp()
      .then((ip) => setBrowser((state) => ({ ...state, publicIp: { status: "ok", value: ip, error: null } })))
      .catch((error) => setBrowser((state) => ({ ...state, publicIp: { status: "blocked", value: null, error: error.message } })));

    Promise.all(targets.map(runBrowserFetchProbe)).then((siteChecks) => {
      setBrowser((state) => ({ ...state, siteChecks }));
    });

    detectDnsViaDoh().then((dns) => {
      setBrowser((state) => ({ ...state, dns }));
    });

    detectWebRtcLeaks().then((webrtc) => {
      setBrowser((state) => ({ ...state, webrtc }));
    });
  };

  const startServerDiagnostics = () => {
    if (!backendAvailable) {
      setSocketState("disabled");
      setProgress({ done: 0, total: 0, percent: 0, running: false });
      appendEvent("Серверная диагностика отключена: сайт работает в бесплатном browser-only режиме", "warn");
      return;
    }

    socketRef.current?.close();
    setServerRussianSites([]);
    setServerHosts([]);
    setSpeedTests([]);
    setWhiteList({ status: "idle", enabled: false, label: null, reason: null, checks: [] });
    setProgress({ done: 0, total: config.russianSites.length + config.vpnHosts.length + config.speedTestServices.length + 1, percent: 0, running: true });
    setEvents([]);
    setSocketState("connecting");

    const socket = new WebSocket(buildWsUrl());
    socketRef.current = socket;

    socket.onopen = () => {
      setSocketState("connected");
      appendEvent("WebSocket подключен, серверные тесты запущены", "ok");
      socket.send(JSON.stringify({ type: "run" }));
    };

    socket.onmessage = (event) => {
      let message;
      try {
        message = JSON.parse(event.data);
      } catch {
        appendEvent("Backend прислал некорректный JSON", "blocked");
        return;
      }

      const payload = message.payload || {};

      if (message.type === "progress") {
        setProgress((state) => ({ ...state, ...payload, running: payload.done < payload.total }));
      }

      if (message.type === "test:start") {
        if (payload.scope === "whitelist") {
          setWhiteList((state) => ({
            ...state,
            status: "running",
            checks: config.whiteListProbeHosts || []
          }));
        }
        if (payload.scope === "speed") {
          setSpeedTests((rows) => [
            ...rows.filter((row) => row.id !== payload.id),
            { id: payload.id, name: payload.name, status: "running", bytesRead: 0, maxBytes: 0, mbps: null }
          ]);
        }
        appendEvent(`Старт: ${payload.name}`, "running");
      }

      if (message.type === "test:update") {
        if (payload.scope === "speed") {
          setSpeedTests((rows) =>
            rows.map((row) =>
              row.id === payload.id ? { ...row, status: "running", bytesRead: payload.bytesRead, maxBytes: payload.maxBytes } : row
            )
          );
        }
        appendEvent(`Промежуточный результат: ${payload.id}`, "running");
      }

      if (message.type === "test:complete" && payload.scope === "russian-site") {
        setServerRussianSites((rows) => [...rows.filter((row) => row.id !== payload.id), payload.result]);
        appendEvent(`RU сайт ${payload.result.name}: ${payload.result.ok ? "доступен" : "ошибка"}`, payload.result.ok ? "ok" : "blocked");
      }

      if (message.type === "test:complete" && payload.scope === "host") {
        setServerHosts((rows) => [...rows.filter((row) => row.id !== payload.id), payload.result]);
        appendEvent(`Хост ${payload.result.name}: ${payload.result.ok ? "есть связь" : "нет связи"}`, payload.result.ok ? "ok" : "blocked");
      }

      if (message.type === "test:complete" && payload.scope === "whitelist") {
        setWhiteList(payload.result);
        appendEvent(`Белые списки: ${payload.result.label}`, payload.result.enabled ? "warn" : "ok");
      }

      if (message.type === "test:complete" && payload.scope === "speed") {
        setSpeedTests((rows) => [...rows.filter((row) => row.id !== payload.id), payload.result]);
        appendEvent(`Скорость ${payload.result.name}: ${payload.result.ok ? `${payload.result.mbps} Mbps` : "ошибка"}`, payload.result.ok ? "ok" : "blocked");
      }

      if (message.type === "run:complete") {
        if (payload.whiteList) {
          setWhiteList(payload.whiteList);
        }
        if (payload.speedTests) {
          setSpeedTests(payload.speedTests);
        }
        setProgress((state) => ({ ...state, percent: 100, running: false }));
        appendEvent("Серверная диагностика завершена", "ok");
      }

      if (message.type === "error") {
        appendEvent(payload.error || "Ошибка WebSocket", "blocked");
        setProgress((state) => ({ ...state, running: false }));
      }
    };

    socket.onerror = () => {
      if (socketRef.current !== socket) return;
      setSocketState("error");
      setProgress((state) => ({ ...state, running: false }));
      appendEvent("Ошибка подключения к backend", "blocked");
    };

    socket.onclose = () => {
      if (socketRef.current !== socket) return;
      setSocketState((state) => (state === "error" ? "error" : "closed"));
    };
  };

  const runAll = async (loadedConfig = config) => {
    const targets = loadedConfig.browserTargets || [];
    runBrowserDiagnostics(targets);
    if (backendAvailable) {
      startServerDiagnostics();
    }
  };

  useEffect(() => {
    fetchJson(`${API_BASE}/api/config`)
      .then((data) => {
        setBackendAvailable(true);
        setConfig(data);
        runBrowserDiagnostics(data.browserTargets);
      })
      .catch((error) => {
        fetchJson(buildPublicAssetUrl("config.json"))
          .then((data) => {
            setBackendAvailable(false);
            setConfig(data);
            runBrowserDiagnostics(data.browserTargets || []);
            appendEvent(`Backend недоступен (${error.message}); включен browser-only режим`, "warn");
          })
          .catch(() => {
            const fallbackTargets = [
              { id: "google", name: "Google", url: "https://www.google.com/generate_204" },
              { id: "ozon", name: "Ozon", url: "https://www.ozon.ru" }
            ];
            setBackendAvailable(false);
            setConfig((state) => ({ ...state, browserTargets: fallbackTargets }));
            runBrowserDiagnostics(fallbackTargets);
            appendEvent(`Backend недоступен: ${error.message}`, "blocked");
          });
      });

    return () => socketRef.current?.close();
  }, []);

  useEffect(() => {
    if (backendAvailable && (config.russianSites.length || config.vpnHosts.length || config.speedTestServices.length)) {
      startServerDiagnostics();
    }
  }, [backendAvailable, config.russianSites.length, config.vpnHosts.length, config.speedTestServices.length]);

  const stats = useMemo(() => {
    const browserOk = browser.siteChecks.filter((site) => site.status === "ok").length;
    const browserBlocked = browser.siteChecks.filter((site) => site.status === "blocked").length;
    const hostOk = serverHosts.filter((host) => host.ok).length;
    const russianOk = serverRussianSites.filter((site) => site.ok).length;
    const speedOk = speedTests.filter((test) => test.ok).length;
    const avgLatencyRows = [
      ...browser.siteChecks.filter((row) => Number.isFinite(row.latencyMs)),
      ...serverRussianSites.filter((row) => Number.isFinite(row.latencyMs)),
      ...serverHosts.filter((row) => Number.isFinite(row.latencyMs))
    ];
    const avgLatency = avgLatencyRows.length
      ? Math.round(avgLatencyRows.reduce((sum, row) => sum + row.latencyMs, 0) / avgLatencyRows.length)
      : null;

    const bestSpeed = speedTests
      .filter((test) => Number.isFinite(test.mbps))
      .reduce((best, test) => Math.max(best, test.mbps), 0);

    return { browserOk, browserBlocked, hostOk, russianOk, speedOk, bestSpeed, avgLatency };
  }, [browser.siteChecks, serverHosts, serverRussianSites, speedTests]);

  const latencyData = useMemo(() => {
    const russianRows = serverRussianSites.map((site) => ({
      name: site.name,
      latency: site.latencyMs || 0,
      type: "RU"
    }));
    const hostRows = serverHosts.map((host) => ({
      name: host.name,
      latency: host.latencyMs || 0,
      type: "TCP/Ping"
    }));
    return [...russianRows, ...hostRows].slice(0, 14);
  }, [serverRussianSites, serverHosts]);

  const statusData = useMemo(() => {
    const ok = serverRussianSites.filter((site) => site.ok).length + serverHosts.filter((host) => host.ok).length + speedTests.filter((test) => test.ok).length;
    const failed = serverRussianSites.length + serverHosts.length + speedTests.length - ok;
    return [
      { name: "OK", value: ok },
      { name: "Ошибка", value: failed }
    ];
  }, [serverRussianSites, serverHosts, speedTests]);

  const speedData = useMemo(
    () => speedTests.map((test) => ({ name: test.name, speed: test.mbps || 0 })),
    [speedTests]
  );

  const downloadReport = () => {
    const lines = [
      "VPN Diagnostics report",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      `Public IP: ${browser.publicIp.value || browser.publicIp.error || "pending"}`,
      `White lists: ${whiteList.label || "pending"}`,
      `White lists reason: ${whiteList.reason || "pending"}`,
      "",
      "Browser checks:",
      ...browser.siteChecks.map((site) => `- ${site.name}: ${site.label || site.status}, latency=${site.latencyMs ?? "n/a"} ms, url=${site.url}`),
      "",
      "DNS over HTTPS:",
      ...browser.dns.map((dns) => `- ${dns.provider}: ${dns.status}, value=${dns.value || dns.error || "n/a"}, latency=${dns.latencyMs ?? "n/a"} ms`),
      "",
      "WebRTC:",
      `- status=${browser.webrtc.status}`,
      `- public=${browser.webrtc.public.join(", ") || "none"}`,
      `- local=${browser.webrtc.local.join(", ") || "none"}`,
      `- mdns=${browser.webrtc.mdns.join(", ") || "none"}`,
      "",
      "Russian site checks:",
      ...serverRussianSites.map((site) => `- ${site.name}: ok=${site.ok}, status=${site.status ?? "n/a"}, latency=${site.latencyMs ?? "n/a"} ms, url=${site.url}`),
      "",
      "VPN hosts:",
      ...serverHosts.map((host) => `- ${host.name} (${host.host}:${host.port}): ok=${host.ok}, latency=${host.latencyMs ?? "n/a"} ms, packetLoss=${host.packetLoss ?? "n/a"}%`),
      "",
      "Speed tests:",
      ...speedTests.map((test) => `- ${test.name}: ok=${test.ok}, speed=${test.mbps ?? "n/a"} Mbps, bytes=${test.bytesRead ?? 0}, duration=${test.durationSec ?? "n/a"} sec${test.error ? `, error=${test.error}` : ""}`),
      "",
      "White list ping checks:",
      ...(whiteList.checks || []).map((check) => `- ${check.name} (${check.host}): ok=${check.ping?.ok ?? "pending"}, latency=${check.ping?.latencyMs ?? "pending"} ms, packetLoss=${check.ping?.packetLoss ?? "pending"}%`)
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vpn-diagnostics-${new Date().toISOString().replace(/[:.]/g, "-")}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const browserSiteColumns = [
    { key: "name", title: "Сайт" },
    { key: "url", title: "URL" },
    {
      key: "status",
      title: "Статус",
      render: (row) => <StatusPill status={row.status}>{row.label}</StatusPill>
    },
    { key: "latencyMs", title: "Latency", render: (row) => (row.latencyMs ? `${row.latencyMs} ms` : "n/a") }
  ];

  const serverSiteColumns = [
    { key: "name", title: "Сайт" },
    { key: "status", title: "HTTP", render: (row) => row.status || "n/a" },
    { key: "latencyMs", title: "Latency", render: (row) => (row.latencyMs ? `${row.latencyMs} ms` : "n/a") },
    {
      key: "ok",
      title: "Статус",
      render: (row) => <StatusPill status={row.ok ? "ok" : "blocked"}>{row.ok ? "Доступен" : "Ошибка"}</StatusPill>
    }
  ];

  const hostColumns = [
    { key: "name", title: "VPN-хост" },
    { key: "host", title: "Адрес" },
    { key: "port", title: "Порт" },
    { key: "latencyMs", title: "Latency", render: (row) => (row.latencyMs ? `${row.latencyMs} ms` : "n/a") },
    { key: "packetLoss", title: "Loss", render: (row) => (row.packetLoss !== null && row.packetLoss !== undefined ? `${row.packetLoss}%` : "n/a") },
    {
      key: "ok",
      title: "Статус",
      render: (row) => <StatusPill status={row.ok ? "ok" : "blocked"}>{row.ok ? "Связь есть" : "Нет связи"}</StatusPill>
    }
  ];

  const whiteListColumns = [
    { key: "name", title: "Хост" },
    { key: "host", title: "Адрес" },
    { key: "group", title: "Группа", render: (row) => (row.group === "international" ? "Google/Apple" : "RU") },
    { key: "latency", title: "Ping", render: (row) => (row.ping ? `${row.ping.latencyMs ?? 0} ms` : <LoadingDots />) },
    { key: "loss", title: "Loss", render: (row) => (row.ping ? `${row.ping.packetLoss ?? 0}%` : <LoadingDots />) },
    {
      key: "ok",
      title: "Статус",
      render: (row) => row.ping ? <StatusPill status={row.ping.ok ? "ok" : "blocked"}>{row.ping.ok ? "Пингуется" : "Нет ping"}</StatusPill> : <StatusPill status="running">Проверка</StatusPill>
    }
  ];

  const speedColumns = [
    { key: "name", title: "Сервис" },
    {
      key: "status",
      title: "Статус",
      render: (row) => row.status === "running" ? <StatusPill status="running">Загрузка</StatusPill> : <StatusPill status={row.ok ? "ok" : "blocked"}>{row.ok ? "Готово" : "Ошибка"}</StatusPill>
    },
    { key: "mbps", title: "Скорость", render: (row) => row.status === "running" ? <LoadingDots /> : row.mbps ? `${row.mbps} Mbps` : "n/a" },
    {
      key: "bytesRead",
      title: "Объем",
      render: (row) => row.bytesRead ? `${(row.bytesRead / 1_000_000).toFixed(1)} MB` : row.status === "running" ? <LoadingDots /> : "n/a"
    },
    { key: "durationSec", title: "Время", render: (row) => row.durationSec ? `${row.durationSec} sec` : row.status === "running" ? <LoadingDots /> : "n/a" }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="network-grid pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <header className="glass overflow-hidden rounded-lg p-5 md:p-6">
          <div className="absolute left-0 right-0 top-0 h-1 bg-slate-700 signal-line" />
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <StatusPill status={progress.running ? "running" : socketState === "error" ? "blocked" : "ok"}>
                  {progress.running ? "Диагностика идет" : socketState === "error" ? "Backend offline" : backendAvailable ? "Realtime dashboard" : "Browser-only"}
                </StatusPill>
                <StatusPill status={browser.publicIp.status === "ok" ? "ok" : browser.publicIp.status}>
                  IP: {browser.publicIp.value || browser.publicIp.error || "проверка"}
                </StatusPill>
              </div>
              <h1 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                VPN Diagnostics
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Браузерные проверки, WebRTC leak test, DoH-запросы, серверный ping, TCP connect,
                HTTP GET и traceroute в одном дашборде с живым прогрессом.
              </p>
            </div>

            <button
              type="button"
              onClick={() => runAll(config)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              {progress.running ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              Запустить заново
            </button>
            <button
              type="button"
              onClick={downloadReport}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-4 text-sm font-semibold text-slate-100 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <Download className="h-4 w-4" />
              Скачать отчет
            </button>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
              <span>Серверные тесты</span>
              <span>{progress.percent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-200 transition-all duration-500"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard icon={Globe2} label="Browser доступно" value={`${stats.browserOk}/${browser.siteChecks.length || 0}`} tone="green" sub={`${stats.browserBlocked} проблемных проверок`} />
          <MetricCard icon={Wifi} label="Русские сайты" value={`${stats.russianOk}/${serverRussianSites.length || config.russianSites.length || 0}`} tone="green" sub="VK, Sber, Avito, Вкусно и точка" />
          <MetricCard icon={Gauge} label="Скорость" value={stats.bestSpeed ? `${stats.bestSpeed} Mbps` : progress.running ? "..." : "n/a"} tone="rose" sub={`${stats.speedOk}/${speedTests.length || config.speedTestServices.length || 0} сервиса`} />
          <MetricCard icon={Router} label="VPN-хосты" value={`${stats.hostOk}/${serverHosts.length || config.vpnHosts.length || 0}`} tone="amber" sub="Ping, TCP, traceroute" />
          <WhiteListCard whiteList={whiteList} />
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <Panel title="Latency" icon={Activity}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={latencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.24)", borderRadius: 8, color: "#e2e8f0" }} labelStyle={{ color: "#f8fafc" }} itemStyle={{ color: "#e2e8f0" }} />
                  <Bar dataKey="latency" radius={[6, 6, 0, 0]}>
                    {latencyData.map((entry) => (
                      <Cell key={entry.name} fill={entry.type === "RU" ? "#34d399" : "#fbbf24"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Статусы" icon={ShieldCheck}>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={46} outerRadius={72} paddingAngle={4}>
                      <Cell fill="#34d399" />
                      <Cell fill="#fb7185" />
                    </Pie>
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.24)", borderRadius: 8, color: "#e2e8f0" }} labelStyle={{ color: "#f8fafc" }} itemStyle={{ color: "#e2e8f0" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-lg border border-slate-700/70 bg-slate-950/30 p-3">
                <p className="text-sm font-medium text-white">WebRTC leaks</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusPill status={browser.webrtc.status}>
                    {browser.webrtc.status === "running" ? "Проверка" : browser.webrtc.public.length ? "Публичный IP найден" : "Публичный IP скрыт"}
                  </StatusPill>
                  {browser.webrtc.local.length > 0 && <StatusPill status="warn">Local: {browser.webrtc.local.length}</StatusPill>}
                  {browser.webrtc.mdns.length > 0 && <StatusPill status="ok">mDNS: {browser.webrtc.mdns.length}</StatusPill>}
                </div>
                <p className="mt-3 break-words text-xs leading-5 text-slate-400">
                  {[...browser.webrtc.public, ...browser.webrtc.local, ...browser.webrtc.mdns].join(", ") ||
                    browser.webrtc.error ||
                    "Кандидаты еще не получены"}
                </p>
              </div>
            </div>
          </Panel>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          <Panel title="Browser fetch/XHR" icon={Wifi}>
            <DataTable columns={browserSiteColumns} rows={browser.siteChecks} emptyText="Браузерные проверки еще не запущены" />
          </Panel>

          <Panel title="DNS через DoH" icon={Radar}>
            <DataTable
              columns={[
                { key: "provider", title: "Провайдер" },
                {
                  key: "status",
                  title: "Статус",
                  render: (row) => <StatusPill status={row.status}>{row.status === "ok" ? "Ответ" : row.status === "running" ? "Проверка" : "Ошибка"}</StatusPill>
                },
                { key: "value", title: "TXT / endpoint", render: (row) => row.value || row.error || "n/a" },
                { key: "latencyMs", title: "Latency", render: (row) => (row.latencyMs ? `${row.latencyMs} ms` : "n/a") }
              ]}
              rows={browser.dns}
              emptyText="DoH-проверки еще не запущены"
            />
            <p className="mt-3 text-xs leading-5 text-slate-400">
              Браузер не раскрывает системный DNS напрямую; DoH-тест показывает, доступен ли DNS-over-HTTPS
              и какой endpoint видит запрос.
            </p>
          </Panel>
        </section>

        <section className="grid gap-5">
          <Panel title="Русские сайты" icon={Wifi}>
            <DataTable columns={serverSiteColumns} rows={serverRussianSites} emptyText="Ожидание проверок VK, Sber, Avito и Вкусно и точка" />
          </Panel>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <Panel title="VPN hosts" icon={Signal}>
            <DataTable columns={hostColumns} rows={serverHosts} emptyText="Ожидание ping/TCP/traceroute" />
          </Panel>

          <Panel title="Белые списки да/нет" icon={ShieldCheck}>
            <div className="mb-4 rounded-lg border border-slate-700/70 bg-slate-950/30 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill status={whiteList.status === "running" ? "running" : whiteList.enabled ? "warn" : whiteList.status === "no" ? "ok" : "idle"}>
                  {whiteList.status === "running" ? "Проверка" : whiteList.label || "Ожидание"}
                </StatusPill>
                <span className="text-sm text-slate-300">{whiteList.reason || "Ждем ping-проверки с backend"}</span>
              </div>
            </div>
            <DataTable columns={whiteListColumns} rows={whiteList.checks || []} emptyText="Ожидание ping google.com, apple.com, vk.com и ozon.ru" />
          </Panel>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <Panel title="Скорость интернета" icon={Gauge}>
            <DataTable columns={speedColumns} rows={speedTests} emptyText="Ожидание проверки скорости через Cloudflare и Яндекс CDN" />
            <p className="mt-3 text-xs leading-5 text-slate-400">
              Яндекс Интернетометр не предоставляет публичный API; второй замер идет через публичное зеркало Яндекса.
            </p>
          </Panel>

          <Panel title="Скорость по сервисам" icon={Activity}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={speedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.24)", borderRadius: 8, color: "#e2e8f0" }} labelStyle={{ color: "#f8fafc" }} itemStyle={{ color: "#e2e8f0" }} />
                  <Bar dataKey="speed" radius={[6, 6, 0, 0]} fill="#fb7185" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <Panel title="Realtime events" icon={Activity}>
            <div className="space-y-2">
              {events.length === 0 && <p className="text-sm text-slate-400">События появятся после старта диагностики.</p>}
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <StatusPill status={event.status}>{event.status === "ok" ? "OK" : event.status === "blocked" ? "ERR" : "RUN"}</StatusPill>
                    <p className="truncate text-sm text-slate-200">{event.message}</p>
                  </div>
                  <span className="shrink-0 text-xs text-slate-500">{event.time}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Packet loss" icon={Router}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={serverHosts.map((host) => ({ name: host.name, loss: host.packetLoss ?? 0 }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.24)", borderRadius: 8, color: "#e2e8f0" }} labelStyle={{ color: "#f8fafc" }} itemStyle={{ color: "#e2e8f0" }} />
                  <Line type="monotone" dataKey="loss" stroke="#fb7185" strokeWidth={3} dot={{ r: 4, fill: "#fb7185" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </section>
      </div>
    </main>
  );
}

export default App;
