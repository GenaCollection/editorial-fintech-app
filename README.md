# Editorial Fintech — Loan Planning Suite

> Multi-language (AM / RU / EN) loan calculator — React 18 + Vite + Tailwind CSS

## 🚀 Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/GenaCollection/editorial-fintech-app)

## Local Development

```bash
npm install
npm run dev
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

## Stack

| Layer | Tech |
|---|---|
| UI Framework | React 18 |
| Router | React Router 6 |
| Styling | Tailwind CSS 3 (Material Design 3 tokens) |
| Build | Vite 5 |
| Deploy | Vercel |

## Project Structure

```
src/
├── main.jsx
├── App.jsx
├── styles/global.css
├── i18n/labels.js
├── context/LoanContext.jsx
├── components/
│   ├── Navigation.jsx
│   ├── Sidebar.jsx
│   └── Footer.jsx
└── pages/
    ├── CalculatorPage.jsx
    ├── SchedulePage.jsx
    └── EarlyPage.jsx
```
