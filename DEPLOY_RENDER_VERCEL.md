# 🚀 Deploy to Render (Backend) + Vercel (Frontend)

This guide gets your platform live on the internet with a public URL.
**Order matters:** deploy the backend first, then the frontend.

Total time: ~20-30 minutes. You only need free accounts.

---

## PART A — Backend + Database on Render (~15 min)

### A1. Create a Render account
1. Go to https://render.com and sign up (use "Sign in with GitHub").
2. Authorize Render to access your GitHub account.

### A2. Deploy using the Blueprint (easiest)
Your repo already contains a `render.yaml` file that sets up both the
web service AND a PostgreSQL database automatically.

1. In Render, click **New +** → **Blueprint**.
2. Select your repository: **snerantie/B2B**.
3. Render reads `render.yaml` and shows: `b2b-backend` + `b2b-db`.
4. Click **Apply**. Render will:
   - Create a free PostgreSQL database (`b2b-db`)
   - Build and start the backend (`b2b-backend`)
   - Auto-generate `JWT_SECRET` and link `DATABASE_URL`
5. Wait for the backend status to become **Live** (2-4 min).

### A3. Copy your backend URL
Once live, Render gives you a URL like:
```
https://b2b-backend-xxxx.onrender.com
```
👉 **Copy this — you need it for Vercel in Part B.**

Test it works: open `https://b2b-backend-xxxx.onrender.com/api/health`
You should see: `{"status":"ok","message":"Fintech Marketplace API is running"}`

### A4. Initialize the database tables
The database is empty until you load the schema. In Render:

1. Open the **b2b-backend** service → **Shell** tab (left menu).
2. Run this command to create tables + sample data:
   ```bash
   npm run db:init:seed
   ```
   (Use `npm run db:init` instead if you want tables WITHOUT sample data.)
3. You should see `🎉 Database initialization complete.`

> No Shell tab on free plan? Alternative: temporarily set the start command
> to `npm run db:init:seed && node server/index.js`, deploy once, then change
> it back to `node server/index.js`.

---

## PART B — Frontend on Vercel (~10 min)

### B1. Point the frontend at your backend
The file `client/vercel.json` proxies API calls to your backend.
You must replace the placeholder URL with your real Render URL.

**Tell me your Render URL and I'll update this file for you**, OR edit it
yourself on GitHub:
1. Open `client/vercel.json` in your repo.
2. Replace `https://REPLACE-WITH-YOUR-RENDER-URL.onrender.com` with your
   actual Render URL (e.g. `https://b2b-backend-xxxx.onrender.com`).
3. Commit the change.

### B2. Create a Vercel account
1. Go to https://vercel.com and sign up with **GitHub**.
2. Authorize Vercel.

### B3. Import the project
1. Click **Add New...** → **Project**.
2. Select your repo **snerantie/B2B** → **Import**.
3. Configure these settings (IMPORTANT):
   - **Root Directory:** click **Edit** → select `client`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)
4. Click **Deploy**.
5. Wait ~1-2 min. Vercel gives you a public URL like:
   ```
   https://b2b-xxxx.vercel.app
   ```
🎉 **Open that URL — this is your live site!**

### B4. Connect backend to frontend (CORS)
1. Go back to Render → **b2b-backend** → **Environment**.
2. Set `CLIENT_URL` to your Vercel URL (e.g. `https://b2b-xxxx.vercel.app`).
3. Save — Render redeploys automatically.

---

## ✅ Final Check
1. Open your Vercel URL.
2. Click **Get Started** and register an account.
3. Browse services, create an RFQ, view the dashboard.

If registration works, your full stack is live! 🎉

---

## What YOU do vs what I can do

**You (need your accounts):**
- Create Render + Vercel accounts
- Click through the Blueprint / Import steps
- Run `npm run db:init:seed` in Render Shell
- Tell me your Render URL so I can wire up `vercel.json`

**I can do for you:**
- Update `client/vercel.json` with your Render URL
- Fix any build/config errors that come up
- Adjust env handling, CORS, or database setup
- Add a custom domain config when you're ready

---

## Notes on the Free Tier
- Render free web services **sleep after 15 min** of inactivity and take
  ~30-50s to wake on the next request. Fine for testing/demo; upgrade later.
- Render free PostgreSQL is deleted after 90 days unless upgraded.
- Vercel free tier is generous and does not sleep.

---

## Troubleshooting
- **Frontend loads but API calls fail:** `vercel.json` still has the
  placeholder URL, or `CLIENT_URL` not set on Render. Re-check B1 and B4.
- **502 / long first load on Render:** free service waking up — wait 40s.
- **DB errors:** make sure you ran `npm run db:init:seed` (Part A4).
- **Build fails on Vercel:** confirm Root Directory is set to `client`.
