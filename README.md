# Visitor Monitor

A small website ("Bright Path Consulting") with a hidden analytics dashboard.

## What it does

- **Home / About / Contact pages** — a normal-looking consulting website.
- **`/dashboard`** — shows every visit logged: timestamp, page, IP address, approximate location (city/region/country via IP geolocation), device type (mobile/tablet/desktop), device model, OS, and browser.

Data is stored in `data/visits.json` and updates live on the dashboard (auto-refreshes every 15 seconds).

## Setup

```bash
npm install
node server.js
```

Then visit:
- `http://localhost:3000/` — the public site
- `http://localhost:3000/dashboard` — the dashboard

## How it works

- Every request to `/`, `/about`, or `/contact` is logged server-side (IP, User-Agent).
- **Device/browser/OS** are parsed from the User-Agent string using `ua-parser-js`.
- **Location** is looked up via [ipapi.co](https://ipapi.co)'s free API (no key needed, ~1,000 lookups/day free). Local/private IPs (e.g. when testing on your own machine) show as "Local/Private IP" since they can't be geolocated.

## Deploying

This needs a Node.js host (e.g. Render, Railway, Fly.io, a VPS, etc.) — it won't work as a static site since it needs a server to capture visitor IPs. If you put it behind a reverse proxy or CDN (e.g. Cloudflare, Nginx), make sure `X-Forwarded-For` is passed through so the real visitor IP is logged instead of the proxy's IP.

## Restricting access to the dashboard

Right now `/dashboard` is open to anyone who knows the URL. Before deploying, you'll probably want to lock it down — e.g. add basic auth, put it behind a login, or restrict it by IP. Ask me if you'd like this added.

## A privacy note

Logging IPs, device info, and location for every visitor is standard analytics practice, but depending on where your visitors are located (e.g. EU/UK under GDPR, California under CCPA), you may be legally required to disclose this in a privacy policy and/or get consent via a cookie/tracking notice. Worth checking what applies to your audience before going live. (This isn't legal advice — just a heads-up to check.)
