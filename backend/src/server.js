import express from "express";
import cors from "cors";
import http from "node:http";
import { WebSocket, WebSocketServer } from "ws";
import { browserTargets, russianSites, speedTestServices, testSites, vpnHosts, whiteListProbeHosts } from "./config.js";
import { detectWhiteListMode, httpCheck, runAllDiagnostics, runHostDiagnostics, runSpeedTests } from "./diagnostics.js";

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "vpn-diagnostics-backend", now: new Date().toISOString() });
});

app.get("/api/config", (_req, res) => {
  res.json({ vpnHosts, testSites, russianSites, browserTargets, whiteListProbeHosts, speedTestServices });
});

app.get("/api/sites", async (_req, res) => {
  const results = await Promise.all(testSites.map((site) => httpCheck(site)));
  res.json({ results });
});

app.get("/api/russian-sites", async (_req, res) => {
  const results = await Promise.all(russianSites.map((site) => httpCheck(site)));
  res.json({ results });
});

app.get("/api/hosts", async (_req, res) => {
  const emit = () => {};
  const results = [];
  for (const host of vpnHosts) {
    results.push(await runHostDiagnostics(host, emit));
  }
  res.json({ results });
});

app.get("/api/whitelist", async (_req, res) => {
  res.json(await detectWhiteListMode());
});

app.get("/api/speed", async (_req, res) => {
  res.json({ results: await runSpeedTests() });
});

app.get("/api/diagnostics", async (_req, res) => {
  const summary = await runAllDiagnostics();
  res.json(summary);
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws/diagnostics" });

function send(ws, type, payload) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type, payload, ts: new Date().toISOString() }));
  }
}

wss.on("connection", (ws) => {
  send(ws, "connected", { message: "Diagnostics stream connected" });

  ws.on("message", async (rawMessage) => {
    let message;
    try {
      message = JSON.parse(rawMessage.toString());
    } catch {
      send(ws, "error", { error: "Invalid JSON message" });
      return;
    }

    if (message.type !== "run") {
      send(ws, "error", { error: `Unsupported message type: ${message.type}` });
      return;
    }

    try {
      await runAllDiagnostics((type, payload) => send(ws, type, payload));
    } catch (error) {
      send(ws, "error", { error: error.message });
    }
  });
});

server.listen(port, () => {
  console.log(`VPN diagnostics backend listening on http://localhost:${port}`);
});
