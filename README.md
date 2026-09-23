# Editorial Fintech — Loan Planning Suite

> Multi-language (AM / RU / EN) loan calculator with AI advisor, freemium Pro plan, partner offers and AdSense — React 18 + Vite + Tailwind CSS + Vercel Functions

💰 **Monetization setup guide: [MONETIZATION.md](./MONETIZATION.md)**

## 🚀 Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/GenaCollection/editorial-fintech-app)

## Local Development

```bash
npm install
cp .env.example .env.local   # optional: AI key, checkout links, ad slots
npm run dev                  # serves the app and /api/* functions
```

## Production Build

```bash
npm run build   # outputs to /dist
npm run preview # preview production build locally
```

## Features

- ✅ Annuity loan calculator — real-time sliders + editable inputs
- ✅ React Context (LoanContext) — shared state across all pages
- ✅ Full amortization schedule — all months, paginated (12/page)
- ✅ Extra/early payments — add to any month, see impact live
- ✅ Savings forecast with real SVG chart
- ✅ Early Repayment scenario comparison table
- ✅ Dark mode toggle
- ✅ Mobile hamburger menu
- ✅ Print / PDF (browser print)
- ✅ Input validation
- ✅ i18n AM / RU / EN
- ✅ AI loan advisor (Gemini / Groq / OpenRouter, offline fallback)
- ✅ Pro plan: 7-day trial, license keys (Lemon Squeezy / Gumroad)
- ✅ Partner loan offers (affiliate) + AdSense slots hidden for Pro
- ✅ Compare up to 4 loans, PWA (installable, offline), SEO meta + JSON-LD

## Stack

| Layer | Tech |
|---|---|
| UI Framework | React 18 |
| Router | React Router 6 |
| Styling | Tailwind CSS 3 (Material Design 3 tokens) |
| Build | Vite 5 |
| Backend | Vercel Functions (`/api`) |
| Deploy | Vercel |

## Project Structure

```
api/                     Vercel serverless functions
├── ai.js                AI advisor proxy (OpenAI-compatible)
├── license.js           Pro license validation
└── _lib/license.js
public/                  ads.txt, manifest, sw.js, sitemap, icons
src/
├── config/monetization.js   prices, limits, ad slots, partner offers
├── context/             Loan, Language, Saved, Pro (plan/trial/license)
├── components/          Navigation, Footer, AdSlot, AiAdvisor, UpgradeModal
├── lib/insights.js      offline loan analysis
└── pages/               Calculator, Schedule, Early, Compare, Saved, Offers, Pricing, …
```
