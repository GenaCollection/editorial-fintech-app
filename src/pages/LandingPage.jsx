import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { LANDINGS, LANDING_UI, findLanding, landingPath } from '../seo/landings.js'
import { landingSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'
import MiniCalculator from '../components/MiniCalculator.jsx'
import AdSlot from '../components/AdSlot.jsx'
import NotFoundPage from './NotFoundPage.jsx'

// SEO landing page for one topic in one language (/hy|ru|en/<slug>).
// The language comes from the URL, not from the visitor's saved preference,
// so every URL always renders the same, indexable content.
export default function LandingPage() {
  var loc = useLocation()
  var found = findLanding(loc.pathname)
  if (!found) return <NotFoundPage />
  return <Landing key={loc.pathname} landing={found.landing} lang={found.lang} />
}

function Landing(props) {
  var landing = props.landing; var lang = props.lang
  var c = landing.content[lang]
  var langCtx = useLanguage()
  useSeo(landingSeo(landing, lang))

  // Keep the rest of the UI (menu, footer, AI) in the page's language.
  useEffect(function() {
    if (langCtx.language !== lang) langCtx.setLanguage(lang)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  return (
    <main className="flex-1 pt-24 pb-24 px-4 md:px-8 w-full max-w-6xl mx-auto animate-fade-up">
      <nav aria-label="Breadcrumb" className="text-xs text-slate-400 mb-4">
        <Link to="/" className="hover:text-blue-600">ArmFinCredit</Link>
        <span className="mx-1.5">/</span>
        <span>{landing.short[lang]}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
        <div className="lg:col-span-6 lg:pt-6">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/40 rounded-full px-3 py-1 mb-4">
            <span className="material-symbols-outlined" style={{fontSize:'16px'}}>{landing.icon}</span>
            {landing.short[lang]}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
            <span className="text-gradient">{c.h1}</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{c.intro}</p>
          <ol className="space-y-3">
            {LANDING_UI.how[lang].map(function(step, i) {
              return (
                <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-gradient text-white text-sm font-extrabold flex items-center justify-center">{i + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              )
            })}
          </ol>
        </div>
        <div className="lg:col-span-6">
          <MiniCalculator lang={lang} initial={landing.preset} showBranding={false} />
          <p className="text-xs text-slate-400 mt-2 text-center">{LANDING_UI.example[lang]}</p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-5">{LANDING_UI.tipsTitle[lang]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {c.tips.map(function(tip, i) {
            return (
              <div key={i} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-6">
                <span className="material-symbols-outlined text-emerald-500 mb-3 block">lightbulb</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{tip}</p>
              </div>
            )
          })}
        </div>
      </section>

      <AdSlot placement="landing" className="mb-12" />

      <section className="mb-12 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">{LANDING_UI.faqTitle[lang]}</h2>
        {c.faq.map(function(q, i) {
          return (
            <details key={i} className="group border-b border-slate-200 dark:border-slate-800 py-4" open={i === 0}>
              <summary className="flex justify-between items-center gap-4 cursor-pointer font-bold text-slate-800 dark:text-slate-200 list-none">
                <h3 className="text-base">{q[0]}</h3>
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">{q[1]}</p>
            </details>
          )
        })}
      </section>

      <section>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">{LANDING_UI.others[lang]}</h2>
        <div className="flex flex-wrap gap-2">
          {LANDINGS.filter(function(l) { return l.key !== landing.key }).map(function(l) {
            return (
              <Link key={l.key} to={landingPath(l, lang)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-blue-400">
                <span className="material-symbols-outlined text-blue-600" style={{fontSize:'18px'}}>{l.icon}</span>
                {l.short[lang]}
              </Link>
            )
          })}
          <Link to="/compare" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-blue-400">
            <span className="material-symbols-outlined text-blue-600" style={{fontSize:'18px'}}>compare_arrows</span>
            {t(lang, 'menu', 'compare')}
          </Link>
        </div>
      </section>
    </main>
  )
}
