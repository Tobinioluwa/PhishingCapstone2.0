const express = require("express");
const path = require("path");
const fs = require("fs");
const { UAParser } = require("ua-parser-js");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "visits.json");

// ---------- Simple JSON "database" ----------
function loadVisits() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveVisits(visits) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(visits, null, 2));
}

let visits = loadVisits();

// ---------- Helpers ----------
function getClientIp(req) {
  // Respect X-Forwarded-For if you're behind a proxy/load balancer (e.g. Render, Heroku, Nginx)
  const fwd = req.headers["x-forwarded-for"];
  let ip = fwd ? fwd.split(",")[0].trim() : req.socket.remoteAddress;
  if (ip && ip.startsWith("::ffff:")) ip = ip.slice(7); // normalize IPv4-mapped IPv6
  return ip || "unknown";
}

async function geolocate(ip) {
  // Skip lookups for local/private addresses (won't resolve to a real place)
  const isLocal =
    !ip ||
    ip === "unknown" ||
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip);

  if (isLocal) {
    return { city: "Local", region: "", country: "Local/Private IP", lat: null, lon: null };
  }

  try {
    // Free tier, no API key required (https://ipapi.co)
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!res.ok) throw new Error(`geo lookup failed: ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(data.reason || "geo lookup error");
    return {
      city: data.city || "Unknown",
      region: data.region || "",
      country: data.country_name || "Unknown",
      lat: data.latitude ?? null,
      lon: data.longitude ?? null,
    };
  } catch (err) {
    return { city: "Unknown", region: "", country: "Unknown", lat: null, lon: null, error: String(err.message || err) };
  }
}

function parseDevice(uaString) {
  const parser = new UAParser(uaString);
  const result = parser.getResult();
  return {
    deviceType: result.device.type || "desktop", // mobile, tablet, desktop (default)
    deviceModel: [result.device.vendor, result.device.model].filter(Boolean).join(" ") || "Unknown",
    os: [result.os.name, result.os.version].filter(Boolean).join(" ") || "Unknown",
    browser: [result.browser.name, result.browser.version].filter(Boolean).join(" ") || "Unknown",
  };
}

// ---------- Middleware: log every real page visit ----------
async function logVisit(req, res, next) {
  try {
    const ip = getClientIp(req);
    const ua = req.headers["user-agent"] || "";
    const device = parseDevice(ua);
    const geo = await geolocate(ip);

    const entry = {
      id: Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      timestamp: new Date().toISOString(),
      path: req.path,
      ip,
      userAgent: ua,
      ...device,
      ...geo,
    };

    visits.unshift(entry); // newest first
    if (visits.length > 5000) visits = visits.slice(0, 5000); // cap file size
    saveVisits(visits);
  } catch (err) {
    console.error("Failed to log visit:", err);
  }
  next();
}

// Only log actual page views, not asset/API requests
app.get(["/", "/about", "/contact"], logVisit);

// ---------- Static files & pages ----------
app.use(express.static(path.join(__dirname, "public")));

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// ---------- API for the dashboard ----------
app.get("/api/visits", (req, res) => {
  res.json(visits);
});

app.get("/api/stats", (req, res) => {
  const total = visits.length;
  const uniqueIps = new Set(visits.map((v) => v.ip)).size;

  const countBy = (key) =>
    visits.reduce((acc, v) => {
      const k = v[key] || "Unknown";
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});

  res.json({
    total,
    uniqueIps,
    byDeviceType: countBy("deviceType"),
    byCountry: countBy("country"),
    byBrowser: countBy("browser"),
    byOs: countBy("os"),
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Dashboard at   http://localhost:${PORT}/dashboard`);
});
