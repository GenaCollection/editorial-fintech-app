import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full py-10 px-8 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="font-bold text-slate-400 mb-1 text-xs uppercase tracking-widest">Editorial Fintech</div>
          <p className="text-xs text-slate-400">2024 Editorial Fintech. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          {['Privacy Policy','Terms','Disclosures','Support'].map(l => (
            <a key={l} href="#" className="text-xs text-slate-400 hover:text-blue-600 uppercase tracking-widest">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
