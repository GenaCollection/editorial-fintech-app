import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LANG_TO_URL } from '../config/site.js'
import { ARTICLES, ARTICLES_UI, ARTICLES_UPDATED, GUIDES_INDEX, findArticle, articlePath, guidesIndexPath } from '../content/articles.js'
import { articleSeo, guidesSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'
import { localPathFor } from '../seo/localPages.js'
import AdSlot from '../components/AdSlot.jsx'
import NotFoundPage from './NotFoundPage.jsx'

// Guides: the index (/ru/gajdy) and each article (/ru/<slug>).
// The language comes from the URL; App keeps the UI language in step.

function calcPath(path, lang) { return path === '/' ? '/' + LANG_TO_URL[lang] : localPathFor(path, lang) }

function ArticleCard(props) {
  var a = props.article; var lang = props.lang; var c = a.content[lang]
  return (
    <Link to={articlePath(a, lang)}
      className="group block rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-6 hover:border-blue-400 transition-colors">
      <span className="material-symbols-outlined text-blue-600 mb-2 block">{a.icon}</span>
      <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-300">{c.h1}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{c.description}</p>
      <span className="inline-block mt-3 text-sm font-bold text-blue-600 dark:text-blue-400">{ARTICLES_UI.read[lang]} →</span>
    </Link>
  )
}

function GuidesIndex(props) {
  var lang = props.lang
  useSeo(guidesSeo(lang))
  return (
    <main className="flex-1 px-4 md:px-8 pt-24 pb-24 max-w-5xl mx-auto w-full animate-fade-up">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3"><span className="text-gradient">{GUIDES_INDEX.h1[lang]}</span></h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-3xl">{GUIDES_INDEX.description[lang]}</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {ARTICLES.map(function(a) { return <ArticleCard key={a.key} article={a} lang={lang} /> })}
      </div>
      <AdSlot placement="bottom" />
    </main>
  )
}

function Article(props) {
  var a = props.article; var lang = props.lang; var c = a.content[lang]
  useSeo(articleSeo(a, lang))
  var cta = (
    <Link to={calcPath(a.cta, lang)}
      className="inline-flex items-center gap-2 px-5 py-3 bg-brand-gradient text-white rounded-2xl font-extrabold shadow-lg shadow-blue-700/25 hover:opacity-95">
      <span className="material-symbols-outlined" style={{fontSize:'18px'}}>calculate</span>{ARTICLES_UI.calc[lang]}
    </Link>
  )
  return (
    <main className="flex-1 px-4 md:px-8 pt-24 pb-24 max-w-3xl mx-auto w-full animate-fade-up">
      <nav aria-label="Breadcrumb" className="text-xs text-slate-400 mb-4">
        <Link to="/" className="hover:text-blue-600">ArmFinCredit</Link>
        <span className="mx-1.5">/</span>
        <Link to={guidesIndexPath(lang)} className="hover:text-blue-600">{GUIDES_INDEX.h1[lang]}</Link>
      </nav>
      <article>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-[1.1] break-words text-slate-900 dark:text-white">{c.h1}</h1>
        <p className="text-xs text-slate-400 mb-5">{ARTICLES_UI.updated[lang]} {ARTICLES_UPDATED} · ArmFinCredit</p>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{c.intro}</p>
        <div className="mb-8">{cta}</div>
        {c.sections.map(function(sec, i) {
          return (
            <section key={i} className="mb-7">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">{sec[0]}</h2>
              {sec[1].map(function(p, j) {
                return <p key={j} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{p}</p>
              })}
              {i === 1 && <AdSlot placement="landing" className="my-6" />}
            </section>
          )
        })}
      </article>
      <div className="rounded-3xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-bold text-slate-800 dark:text-slate-200">{c.h1}</p>
        {cta}
      </div>
      <p className="text-xs text-slate-400 mb-10">{ARTICLES_UI.disclaimer[lang]}</p>
      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">{ARTICLES_UI.more[lang]}</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {ARTICLES.filter(function(x) { return x.key !== a.key }).slice(0, 4).map(function(x) { return <ArticleCard key={x.key} article={x} lang={lang} /> })}
      </div>
      <AdSlot placement="bottom" />
    </main>
  )
}

export default function ArticlePage() {
  var loc = useLocation()
  var found = findArticle(loc.pathname)
  if (!found) return <NotFoundPage />
  if (found.index) return <GuidesIndex key={loc.pathname} lang={found.lang} />
  return <Article key={loc.pathname} article={found.article} lang={found.lang} />
}
