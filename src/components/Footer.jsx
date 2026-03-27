import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full py-10 px-8 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">Editorial Fintech</div>
          <p className="text-xs text-slate-400">2024 Editorial Fintech. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-slate-400 hover:text-blue-600">Privacy</a>
          <a href="#" className="text-xs text-slate-400 hover:text-blue-600">Terms</a>
          <a href="#" className="text-xs text-slate-400 hover:text-blue-600">Support</a>
        </div>
      </div>
    </footer>
  )
}
