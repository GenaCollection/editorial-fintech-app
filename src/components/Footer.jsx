import React from 'react'
import { t } from '../i18n/labels'

export default function Footer({ language }) {
  const links = ['privacy', 'terms', 'disclosures', 'support']
  return (
    <footer className="w-full py-12 px-8 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="font-manrope font-extrabold text-slate-400 mb-4 tracking-widest text-sm">EDITORIAL FINTECH</div>
          <p className="text-xs text-slate-400 uppercase tracking-widest leading-loose">
            {t(language, 'footer', 'rights')}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
          {links.map(key => (
            <a key={key} href="#"
              className="text-xs text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">
              {t(language, 'footer', key)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
