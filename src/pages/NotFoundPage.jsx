import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'

export default function NotFoundPage() {
  var lang = useLanguage().language
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="text-8xl font-black text-blue-700 mb-4 select-none">404</div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
        {t(lang, 'common', 'notFound')}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
        {lang === 'RU'
          ? 'Запрашиваемая страница не существует или была перемещена.'
          : lang === 'AM'
          ? 'Այս էջը գոյություն չունի կամ տեղափոխվել է։'
          : 'The page you are looking for does not exist or has been moved.'}
      </p>
      <Link to="/"
        className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 active:scale-95 transition-all">
        <span className="material-symbols-outlined" style={{fontSize:'18px'}}>arrow_back</span>
        {t(lang, 'common', 'home')}
      </Link>
    </main>
  )
}
