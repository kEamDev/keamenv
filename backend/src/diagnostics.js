import { execFile } from "node:child_process";
import net from "node:net";
import { promisify } from "node:util";
import { russianSites, speedTestServices, vpnHosts, whiteListProbeHosts } from "./config.js";

const execFileAsync = promisify(execFile);
const DEFAULT_TIMEOUT_MS = 6000;

function nowIso() {
  return new Date().toISOString();
}

function withTimeout(promise, timeoutMs, label) {
  let timeout;
  const timer = new Promise((_, reject) => {
    timeout = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs);
  });

  return Promise.race([promise, timer]).finally(() => clearTimeout(timeout));
}

function parsePingOutput(output) {
  const normalized = output.replace(/\r/g, "");
  const packetLossMatch =
    normalized.match(/(\d+(?:\.\d+)?)%\s*(?:packet\s*)?loss/i) ||
    normalized.match(/\((\d+(?:\.\d+)?)%\s*loss\)/i) ||
    normalized.match(/\((\d+(?:[,.]\d+)?)%\s*(?:потерь|loss)\)/i);

  const avgMatch =
    normalized.match(/=\s*[\d.]+\/([\d.]+)\/[\d.]+\/[\d.]+\s*ms/i) ||
    normalized.match(/Average\s*=\s*(\d+)\s*ms/i) ||
    normalized.match(/(?:Среднее|Average)\s*=\s*(\d+)\s*(?:мс|ms)/i);

  const minMatch =
    normalized.match(/=\s*([\d.]+)\/[\d.]+\/[\d.]+\/[\d.]+\s*ms/i) ||
    normalized.match(/Minimum\s*=\s*(\d+)\s*ms/i) ||
    normalized.match(/(?:Минимальное|Minimum)\s*=\s*(\d+)\s*(?:мс|ms)/i);

  const maxMatch =
    normalized.match(/=\s*[\d.]+\/[\d.]+\/([\d.]+)\/[\d.]+\s*ms/i) ||
    normalized.match(/Maximum\s*=\s*(\d+)\s*ms/i) ||
    normalized.match(/(?:Максимальное|Maximum)\s*=\s*(\d+)\s*(?:мс|ms)/i);

  const parseNumber = (value) => (value ? Number(value.replace(",", ".")) : null);

  return {
    latencyMs: parseNumber(avgMatch?.[1]),
    minMs: parseNumber(minMatch?.[1]),
    maxMs: parseNumber(maxMatch?.[1]),
    packetLoss: parseNumber(packetLossMatch?.[1])
  };
}

export async function pingHost(host) {
  const isWindows = process.platform === "win32";

  if (isWindows) {
    const safeHost = host.replace(/'/g, "''");
    const script = `
$target = '${safeHost}'
$responses = @(Test-Connection -ComputerName $target -Count 4 -ErrorAction SilentlyContinue)
$latencies = @($responses | ForEach-Object {
  if ($null -ne $_.ResponseTime) { [double]$_.ResponseTime }
  elseif ($null -ne $_.Latency) { [double]$_.Latency }
})
$received = $responses.Count
$sent = 4
$packetLoss = if ($sent -gt 0) { [math]::Round((($sent - $received) / $sent) * 100, 2) } else { 100 }
$avg = if ($latencies.Count -gt 0) { [math]::Round(($latencies | Measure-Object -Average).Average, 2) } else { $null }
$min = if ($latencies.Count -gt 0) { [math]::Round(($latencies | Measure-Object -Minimum).Minimum, 2) } else { $null }
$max = if ($latencies.Count -gt 0) { [math]::Round(($latencies | Measure-Object -Maximum).Maximum, 2) } else { $null }
[pscustomobject]@{
  ok = $received -gt 0
  host = $target
  latencyMs = $avg
  minMs = $min
  maxMs = $max
  packetLoss = $packetLoss
  sent = $sent
  received = $received
} | ConvertTo-Json -Compress
`;

    try {
      const { stdout } = await withTimeout(
        execFileAsync("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script]),
        10000,
        `ping ${host}`
      );
      const parsed = JSON.parse(stdout.trim());

      return {
        ok: Boolean(parsed.ok),
        host,
        latencyMs: parsed.latencyMs,
        minMs: parsed.minMs,
        maxMs: parsed.maxMs,
        packetLoss: parsed.packetLoss,
        raw: `sent=${parsed.sent} received=${parsed.received}`,
        checkedAt: nowIso()
      };
    } catch (error) {
      return {
        ok: false,
        host,
        latencyMs: null,
        packetLoss: 100,
        error: error.message,
        raw: "",
        checkedAt: nowIso()
      };
    }
  }

  const command = "ping";
  const args = ["-c", "4", "-W", "2", host];

  try {
    const { stdout, stderr } = await withTimeout(execFileAsync(command, args), 10000, `ping ${host}`);
    return {
      ok: true,
      host,
      ...parsePingOutput(`${stdout}\n${stderr}`),
      raw: stdout.trim().slice(0, 2000),
      checkedAt: nowIso()
    };
  } catch (error) {
    const output = `${error.stdout || ""}\n${error.stderr || ""}`.trim();
    const parsed = output ? parsePingOutput(output) : {};

    return {
      ok: false,
      host,
      latencyMs: parsed.latencyMs ?? null,
      packetLoss: parsed.packetLoss ?? 100,
      error: error.message,
      raw: output.slice(0, 2000),
      checkedAt: nowIso()
    };
  }
}

export function tcpConnect(host, port, timeoutMs = 3500) {
  return new Promise((resolve) => {
    const startedAt = performance.now();
    const socket = net.createConnection({ host, port });

    const finish = (result) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve({
        host,
        port,
        checkedAt: nowIso(),
        ...result
      });
    };

    socket.setTimeout(timeoutMs);
    socket.once("connect", () => {
      finish({ ok: true, latencyMs: Math.round(performance.now() - startedAt) });
    });
    socket.once("timeout", () => {
      finish({ ok: false, latencyMs: null, error: `TCP timeout after ${timeoutMs}ms` });
    });
    socket.once("error", (error) => {
      finish({ ok: false, latencyMs: null, error: error.message });
    });
  });
}

export async function httpCheck(site) {
  const controller = new AbortController();
  const startedAt = performance.now();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(site.url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "vpn-diagnostics/1.0"
      }
    });

    return {
      id: site.id,
      name: site.name,
      url: site.url,
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      latencyMs: Math.round(performance.now() - startedAt),
      checkedAt: nowIso()
    };
  } catch (error) {
    return {
      id: site.id,
      name: site.name,
      url: site.url,
      ok: false,
      status: null,
      latencyMs: null,
      error: error.name === "AbortError" ? `HTTP timeout after ${DEFAULT_TIMEOUT_MS}ms` : error.message,
      checkedAt: nowIso()
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function tracerouteHost(host) {
  const isWindows = process.platform === "win32";
  const command = isWindows ? "tracert" : "traceroute";
  const args = isWindows ? ["-d", "-h", "12", "-w", "1000", host] : ["-n", "-m", "12", "-w", "2", host];

  try {
    const { stdout } = await withTimeout(execFileAsync(command, args), 18000, `traceroute ${host}`);
    const hops = stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => /^\d+/.test(line))
      .slice(0, 12)
      .map((line) => ({ raw: line }));

    return {
      ok: true,
      host,
      hops,
      raw: stdout.trim().slice(0, 5000),
      checkedAt: nowIso()
    };
  } catch (error) {
    const raw = `${error.stdout || ""}\n${error.stderr || ""}`.trim();

    return {
      ok: false,
      host,
      hops: [],
      raw: raw.slice(0, 5000),
      error: error.code === "ENOENT" ? `${command} is not available in this environment` : error.message,
      checkedAt: nowIso()
    };
  }
}

export async function runHostDiagnostics(hostConfig, emit) {
  emit("test:start", { scope: "host", id: hostConfig.id, name: hostConfig.name });

  const [ping, tcp] = await Promise.all([
    pingHost(hostConfig.host),
    tcpConnect(hostConfig.host, hostConfig.port)
  ]);
  emit("test:update", { scope: "host", id: hostConfig.id, phase: "ping-tcp", ping, tcp });

  const traceroute = await tracerouteHost(hostConfig.host);
  const result = {
    ...hostConfig,
    ping,
    tcp,
    traceroute,
    ok: Boolean(ping.ok || tcp.ok),
    latencyMs: tcp.latencyMs ?? ping.latencyMs ?? null,
    packetLoss: ping.packetLoss,
    checkedAt: nowIso()
  };

  emit("test:complete", { scope: "host", id: hostConfig.id, result });
  return result;
}

export async function runSiteDiagnostics(site, emit) {
  emit("test:start", { scope: "site", id: site.id, name: site.name });
  const result = await httpCheck(site);
  emit("test:complete", { scope: "site", id: site.id, result });
  return result;
}

export async function runRussianSiteDiagnostics(site, emit) {
  emit("test:start", { scope: "russian-site", id: site.id, name: site.name });
  const result = await httpCheck(site);
  emit("test:complete", { scope: "russian-site", id: site.id, result });
  return result;
}

export async function detectWhiteListMode(emit = () => {}) {
  emit("test:start", { scope: "whitelist", id: "whitelist", name: "Белые списки" });

  const checks = await Promise.all(
    whiteListProbeHosts.map(async (target) => ({
      ...target,
      ping: await pingHost(target.host)
    }))
  );

  const international = checks.filter((check) => check.group === "international");
  const russian = checks.filter((check) => check.group === "russian");
  const internationalUnavailable = international.every((check) => !check.ping.ok);
  const russianAvailable = russian.every((check) => check.ping.ok);
  const enabled = internationalUnavailable && russianAvailable;

  const result = {
    id: "whitelist",
    enabled,
    status: enabled ? "yes" : "no",
    label: enabled ? "Да" : "Нет",
    reason: enabled
      ? "Google/Apple не пингуются, VK/Ozon пингуются"
      : "Условие не выполнено: нужен недоступный ping до Google/Apple и доступный ping до VK/Ozon",
    checks,
    checkedAt: nowIso()
  };

  emit("test:complete", { scope: "whitelist", id: "whitelist", result });
  return result;
}

export async function runSpeedTest(service, emit = () => {}) {
  emit("test:start", { scope: "speed", id: service.id, name: service.name });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 22000);
  const startedAt = performance.now();
  let bytesRead = 0;

  try {
    const response = await fetch(service.url, {
      signal: controller.signal,
      headers: {
        "user-agent": "vpn-diagnostics/1.0"
      }
    });

    if (!response.ok || !response.body) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const reader = response.body.getReader();
    while (bytesRead < service.maxBytes) {
      const { done, value } = await reader.read();
      if (done) break;
      bytesRead += value.byteLength;
      emit("test:update", {
        scope: "speed",
        id: service.id,
        bytesRead,
        maxBytes: service.maxBytes
      });
    }
    await reader.cancel().catch(() => {});

    const durationSec = Math.max((performance.now() - startedAt) / 1000, 0.001);
    const mbps = Number(((bytesRead * 8) / durationSec / 1_000_000).toFixed(2));
    const result = {
      ...service,
      ok: true,
      bytesRead,
      durationSec: Number(durationSec.toFixed(2)),
      mbps,
      checkedAt: nowIso()
    };

    emit("test:complete", { scope: "speed", id: service.id, result });
    return result;
  } catch (error) {
    const result = {
      ...service,
      ok: false,
      bytesRead,
      durationSec: Number(((performance.now() - startedAt) / 1000).toFixed(2)),
      mbps: null,
      error: error.name === "AbortError" ? "Speed test timeout" : error.message,
      checkedAt: nowIso()
    };

    emit("test:complete", { scope: "speed", id: service.id, result });
    return result;
  } finally {
    clearTimeout(timeout);
  }
}

export async function runSpeedTests(emit = () => {}) {
  const results = [];
  for (const service of speedTestServices) {
    results.push(await runSpeedTest(service, emit));
  }
  return results;
}

export async function runAllDiagnostics(emit = () => {}) {
  const total = vpnHosts.length + russianSites.length + 1 + speedTestServices.length;
  let done = 0;

  const reportProgress = () => {
    done += 1;
    emit("progress", { done, total, percent: Math.round((done / total) * 100) });
  };

  emit("run:start", { total, startedAt: nowIso() });

  const russianSiteResults = [];
  for (const site of russianSites) {
    const result = await runRussianSiteDiagnostics(site, emit);
    russianSiteResults.push(result);
    reportProgress();
  }

  const hostResults = [];
  for (const host of vpnHosts) {
    const result = await runHostDiagnostics(host, emit);
    hostResults.push(result);
    reportProgress();
  }

  const whiteList = await detectWhiteListMode(emit);
  reportProgress();

  const speedTests = [];
  for (const service of speedTestServices) {
    speedTests.push(await runSpeedTest(service, emit));
    reportProgress();
  }

  const summary = {
    sites: [],
    russianSites: russianSiteResults,
    hosts: hostResults,
    whiteList,
    speedTests,
    completedAt: nowIso()
  };

  emit("run:complete", summary);
  return summary;
}
