import { http, params } from "@ampt/sdk";
import express, { Router, raw } from "express";
import { data } from "@ampt/data";
import { createHash } from "crypto";
import geoip from "geoip-lite";

const app = express();
const api = Router();

app.set("trust proxy", true);

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use("/api", raw({ type: ["application/json", "text/plain"], limit: "100kb" }));

function normalizeIp(raw: string): string {
  return raw.trim().replace(/:\d+$/, "").replace(/^\[|\]$/g, "");
}

function getClientIp(req: express.Request): string {
  const cf = req.headers["cloudfront-viewer-address"];
  if (typeof cf === "string" && cf) {
    return normalizeIp(cf);
  }
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff) {
    const first = xff.split(",")[0];
    if (first.trim()) return normalizeIp(first);
  }
  return req.ip || req.socket?.remoteAddress || "unknown";
}

function getCountry(req: express.Request, ip: string): string {
  const header = req.headers["cloudfront-viewer-country"];
  if (typeof header === "string" && header) {
    return header;
  }
  try {
    const lookup = geoip.lookup(ip);
    if (lookup && lookup.country) return lookup.country;
  } catch {
    // ignore geo lookup failures
  }
  return "unknown";
}

function toKey(path: string): string {
  const cleaned = (path || "").replace(/[^\w\-/.]/g, "_").slice(0, 200);
  return cleaned || "home";
}

async function aggregateStats() {
  const [total, ips, pages, countries, days] = await Promise.all([
    data.get("visits").catch(() => 0),
    data.get("ip:*", { limit: 1000 }),
    data.get("page:*", { limit: 1000 }),
    data.get("country:*", { limit: 1000 }),
    data.get("day:*", { limit: 1000 }),
  ]);

  const list = (items: Array<{ key: string; value: unknown }> | undefined) => items || [];
  const pageStats = list(pages?.items)
    .map((it) => ({ path: it.key.replace(/^page:/, ""), visits: Number(it.value) || 0 }))
    .sort((a, b) => b.visits - a.visits);
  const countryStats = list(countries?.items)
    .map((it) => ({ country: it.key.replace(/^country:/, ""), visits: Number(it.value) || 0 }))
    .sort((a, b) => b.visits - a.visits);

  return {
    totalVisits: Number(total ?? 0) || 0,
    uniqueIps: list(ips?.items).length,
    pageCount: pageStats.length,
    countryCount: countryStats.length,
    pages: pageStats,
    countries: countryStats,
    days: list(days?.items).map((it) => ({
      date: it.key.replace(/^day:/, ""),
      visits: Number(it.value) || 0,
    })),
  };
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

app.get("/stats", async (req, res) => {
  try {
    const stats = await aggregateStats();
    const pagesRows = stats.pages
      .map((p) => `<tr><td>${esc(p.path)}</td><td>${p.visits}</td></tr>`)
      .join("");
    const countryRows = stats.countries
      .map((c) => `<tr><td>${esc(c.country)}</td><td>${c.visits}</td></tr>`)
      .join("");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Site Stats</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 16px; color: #222; }
  h1 { font-size: 1.6rem; }
  h2 { font-size: 1.1rem; margin-top: 32px; }
  table { border-collapse: collapse; width: 100%; }
  th, td { text-align: left; padding: 6px 10px; border-bottom: 1px solid #ddd; }
  th { border-bottom: 2px solid #aaa; }
  .totals { display: flex; gap: 32px; flex-wrap: wrap; }
  .totals .box { background: #f4f4f4; border-radius: 8px; padding: 12px 20px; }
  .totals .num { font-size: 1.8rem; font-weight: 700; }
  a { color: #06c; }
</style>
</head>
<body>
<h1>Site Stats</h1>
<div class="totals">
  <div class="box"><div class="num">${stats.totalVisits}</div><div>Total visits</div></div>
  <div class="box"><div class="num">${stats.uniqueIps}</div><div>Unique IPs</div></div>
</div>
<h2>Page visits</h2>
<table><thead><tr><th>Page</th><th>Visits</th></tr></thead><tbody>${pagesRows || "<tr><td colspan='2'>No data yet</td></tr>"}</tbody></table>
<h2>By country</h2>
<table><thead><tr><th>Country</th><th>Visits</th></tr></thead><tbody>${countryRows || "<tr><td colspan='2'>No data yet</td></tr>"}</tbody></table>
<p>Raw JSON: <a href="/api/stats">/api/stats</a></p>
</body>
</html>`;

    res.set("Content-Type", "text/html").send(html);
  } catch (err) {
    res.status(500).send("Error loading stats");
  }
});

// Mount api to /api base route
app.use("/api", api);

// Hello route: /api/hello
api.get("/hello", (req, res) => {
  return res.status(200).send({ message: "Hello from the public api!" });
});

// Greet route: /api/greet/:name
api.get("/greet/:name", (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).send({ message: "Missing route param for `name`!" });
  }

  return res.status(200).send({ message: `Hello ${name}!` });
});

// Post route: /api/submit
api.post("/submit", async (req, res) => {
  return res.status(200).send({
    body: req.body,
    message: "You just posted data",
  });
});

// Track route: POST /api/track
api.post("/track", async (req, res) => {
  try {
    let path = typeof req.query.p === "string" ? req.query.p : "/";

    if (req.body) {
      const text = Buffer.isBuffer(req.body) ? req.body.toString("utf-8") : String(req.body);
      try {
        const parsed = JSON.parse(text);
        if (typeof parsed.path === "string") {
          path = parsed.path;
        }
      } catch {
        // ignore unparseable bodies
      }
    }

    const ip = normalizeIp(getClientIp(req));
    const country = getCountry(req, ip);
    const ipHash = createHash("sha256")
      .update((params("IP_SALT") || "") + ip)
      .digest("hex")
      .slice(0, 32);
    const now = new Date().toISOString();

    await Promise.all([
      data.add("visits", 1),
      data.add("day:" + now.slice(0, 10), 1),
      data.add("page:" + toKey(path), 1),
      data.add("country:" + country, 1),
      data.set(
        "ip:" + ipHash,
        { country, visits: { $add: 1 }, lastSeen: now },
        { default: { firstSeen: now } }
      ),
    ]);
  } catch (err) {
    console.error("track failed", err);
  }

  return res.status(200).json({ ok: true });
});

// Stats route: GET /api/stats
api.get("/stats", async (req, res) => {
  try {
    const stats = await aggregateStats();
    return res.status(200).json(stats);
  } catch (err) {
    return res.status(500).json({ error: "Failed to load stats" });
  }
});

// Expose the app to the Internet
http.node.use(app);