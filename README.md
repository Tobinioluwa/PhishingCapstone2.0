# Visitor Monitor — Vercel Edition

Same site as before ("Bright Path Consulting" + hidden `/dashboard`), restructured to run on Vercel:
- Pages (`/`, `/about`, `/contact`, `/dashboard`) are serverless functions in `/api`, wired up via `vercel.json` rewrites.
- Visit data is stored in **Upstash Redis** (via the Vercel Storage Marketplace) instead of a local JSON file — Vercel's filesystem doesn't persist between requests, so the old approach wouldn't have worked here.

## Deploy steps

1. **Push this folder to a GitHub repo** (or use the Vercel CLI to deploy directly — see below).

2. **Import the repo into Vercel** at vercel.com/new. Framework preset: "Other" (no build step needed).

3. **Add a Redis store:**
   - In your Vercel project, go to **Storage → Create Database**.
   - Choose **Upstash** (Redis) from the Marketplace.
   - Connect it to this project — Vercel will automatically inject the right environment variables (something like `KV_REST_API_URL` / `KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`, depending on how the integration names them). The code checks for both, so either naming works.

4. **Redeploy** (Vercel will prompt you to redeploy once the storage is connected, so the new env vars are picked up).

5. Visit your live URL:
   - `https://your-project.vercel.app/` — the public site
   - `https://your-project.vercel.app/dashboard` — the dashboard

## Deploying via CLI instead of GitHub

```bash
npm install -g vercel
cd visitor-monitor-vercel
vercel
```
Follow the prompts, then add the Upstash storage from the dashboard as in step 3 above and run `vercel --prod` again.

## Restricting access to the dashboard

`/dashboard` is currently open to anyone with the URL. Before sharing the live link, you'll probably want to lock it down. A couple of easy options on Vercel:
- **Vercel's built-in Password Protection** (Pro plan feature, applies to the whole deployment).
- **Basic auth check inside `api/dashboard.js`** — I can add this for you if you'd like (just say the word), checking a username/password against an environment variable you set in Vercel.

## A privacy note

Logging IPs, device info, and location for every visitor is standard analytics practice, but depending on where your visitors are located (e.g. EU/UK under GDPR, California under CCPA), you may be legally required to disclose this in a privacy policy and/or get consent via a cookie/tracking notice. Worth checking what applies to your audience before sharing the live link. (This isn't legal advice — just a heads-up to check.)
