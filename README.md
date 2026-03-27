# Editorial Fintech — Loan Planning Suite

Multi-language (AM / RU / EN) loan calculator web application built with React 18, React Router 6, and Tailwind CSS.

## Project Structure

```
editorial-fintech-app/
├── index.html                  # Entry point
├── src/
│   ├── tailwind.config.js      # Tailwind theme (Material Design 3 tokens)
│   ├── styles/
│   │   └── global.css          # Global styles
│   ├── i18n/
│   │   └── labels.js           # All translation strings (AM/RU/EN)
│   ├── hooks/
│   │   └── useLoanCalculator.js # Annuity calculation logic
│   ├── components/
│   │   ├── Navigation.jsx      # Top nav with language switcher
│   │   ├── Sidebar.jsx         # Left sidebar (desktop only)
│   │   └── Footer.jsx          # Footer with links
│   └── pages/
│       ├── CalculatorPage.jsx  # Main calculator page
│       ├── SchedulePage.jsx    # Payment schedule page
│       └── EarlyPage.jsx       # Early repayment info page
```

## Known Issues / TODO

- [ ] `SchedulePage`: amortization table uses **hardcoded mock data** — needs real calculation from calculator state
- [ ] Calculator state is **not shared** between pages (no global context/store)
- [ ] `EarlyPage` labels are **partially hardcoded** (not using i18n helper)
- [ ] Mobile navigation (hamburger menu) is missing
- [ ] Dark mode toggle button is missing
- [ ] PDF download button has no implementation
- [ ] `Savings Forecast` on SchedulePage shows static values
- [ ] No input validation on loan amount / rate / term fields

## Roadmap

1. Add React Context for global loan state sharing between pages
2. Implement real amortization table generation
3. Add mobile bottom navigation
4. Add dark mode toggle
5. Add PDF export (jsPDF or print CSS)
6. Migrate to Vite + React project for production build & Vercel deploy
