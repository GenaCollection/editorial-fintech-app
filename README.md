# Editorial Fintech — Loan Planning Suite

Multi-language (AM / RU / EN) loan calculator web application.
Built with React 18, React Router 6, Tailwind CSS (Material Design 3 tokens).

## Live features

- ✅ Annuity loan calculator with real-time sliders + editable number inputs
- ✅ Global state via React Context (LoanContext) — calculator state shared across all pages
- ✅ Full amortization schedule generation (all N months, paginated)
- ✅ Extra/early payments — add any extra amount to any month, see impact immediately
- ✅ Savings Forecast with real SVG chart (balance curve vs original)
- ✅ Early Repayment Intelligence page with scenario comparison table
- ✅ Dark mode toggle (persists in session)
- ✅ Mobile hamburger menu with drawer
- ✅ Mobile FAB navigates to schedule page
- ✅ Active link highlighting in Sidebar
- ✅ Print / PDF via browser print dialog (nav/sidebar hidden in print CSS)
- ✅ Input validation (min/max guards on all numeric fields)
- ✅ Full i18n AM / RU / EN on all pages
- ✅ Loan breakdown bar (Principal vs Interest %)

## Project Structure

```
editorial-fintech-app/
├── index.html
└── src/
    ├── tailwind.config.js
    ├── styles/global.css
    ├── i18n/labels.js              ← All translations
    ├── context/LoanContext.js      ← Global state + amortization engine
    ├── hooks/useLoanCalculator.js
    ├── components/
    │   ├── Navigation.jsx          ← Dark mode, mobile menu
    │   ├── Sidebar.jsx             ← Active link highlight
    │   └── Footer.jsx
    └── pages/
        ├── CalculatorPage.jsx      ← Sliders + breakdown bar + preview table
        ├── SchedulePage.jsx        ← Full table + pagination + extra payments
        └── EarlyPage.jsx           ← Scenarios + KPI cards
```

## Next steps (roadmap)

- [ ] Migrate to Vite + React (for production build & Vercel deploy)
- [ ] jsPDF export for proper PDF generation
- [ ] Differential payment type (alongside annuity)
- [ ] Save calculations to localStorage
- [ ] Comparison mode: compare two loan scenarios side by side
