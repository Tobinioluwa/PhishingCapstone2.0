const { UAParser } = require("ua-parser-js");
const { Redis } = require("@upstash/redis");

// Works with either naming convention Vercel's storage integrations use.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

const VISITS_KEY = "visits";
const MAX_VISITS = 5000;

function getClientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  let ip = fwd ? fwd.split(",")[0].trim() : req.socket?.remoteAddress;
  if (ip && ip.startsWith("::ffff:")) ip = ip.slice(7);
  return ip || "unknown";
}

function parseDevice(uaString) {
  const parser = new UAParser(uaString);
  const result = parser.getResult();
  return {
    deviceType: result.device.type || "desktop",
    os: [result.os.name, result.os.version].filter(Boolean).join(" ") || "Unknown",
    browser: [result.browser.name, result.browser.version].filter(Boolean).join(" ") || "Unknown",
  };
}

// Logs a visit; awaited so serverless doesn't tear down before the write completes.
async function logVisit(req, path) {
  try {
    const ip = getClientIp(req);
    const ua = req.headers["user-agent"] || "";
    const device = parseDevice(ua);

    const entry = {
      id: Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      timestamp: new Date().toISOString(),
      path,
      ip,
      userAgent: ua,
      ...device,
    };

    await redis.lpush(VISITS_KEY, JSON.stringify(entry));
    await redis.ltrim(VISITS_KEY, 0, MAX_VISITS - 1);
  } catch (err) {
    console.error("Failed to log visit:", err);
  }
}

async function getVisits() {
  const raw = await redis.lrange(VISITS_KEY, 0, -1);
  return raw.map((item) => (typeof item === "string" ? JSON.parse(item) : item));
}

module.exports = { logVisit, getVisits };
