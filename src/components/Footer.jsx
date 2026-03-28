import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Footer() {
  var langCtx = useLanguage()
  var lang = langCtx.language

  var labels = {
    rights:  { EN: '\u00a9 2026 ArmFinCredit. All rights reserved.', RU: '\u00a9 2026 ArmFinCredit. \u0412\u0441\u0435 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043d\u044b.', AM: '\u00a9 2026 ArmFinCredit.' },
    privacy: { EN: 'Privacy Policy', RU: '\u041a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c', AM: '\u0533\u0561\u0572\u057f\u576e\u056b\u0578\u0582\u0569\u0575\u0578\u0582\u0576' },
    terms:   { EN: 'Terms of Use', RU: '\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u043e\u0435 \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435', AM: '\u0555\u0578\u0582\u056c\u0561\u056f\u0563\u0578\u0580\u056e. \u057a\u0561\u0575\u0574.' },
    support: { EN: 'Support', RU: '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430', AM: '\u0531\u056b\u056f' },
    calc:    { EN: 'Calculator', RU: '\u041a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440', AM: '\u0540\u0561\u0577\u057e\u056b\u091a' },
    sched:   { EN: 'Schedule', RU: '\u0413\u0440\u0430\u0444\u0438\u043a', AM: '\u053a\u0561\u0574\u0561\u0576\u0561\u056f' },
    disclaimer: { EN: 'For informational purposes only. Not financial advice.', RU: '\u0422\u043e\u043b\u044c\u043a\u043e \u0434\u043b\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438. \u041d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0444\u0438\u043d. \u043a\u043e\u043d\u0441\u0443\u043b\u044c\u0442\u0430\u0446\u0438\u0435\u0439.', AM: '\u053f\u0580\u0569\u0561\u056f\u0561\u0576 \u0576\u057a\u0561\u057f\u0561\u056f\u056b \u0570\u0561\u0574\u0561\u0580 \u0562\u056c\u056e\u0561.' }
  }

  function L(key) { return labels[key][lang] || labels[key].EN }

  return (
    <footer className="w-full pt-10 pb-6 px-8 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="font-black text-blue-900 dark:text-blue-100 text-lg tracking-tight mb-2">ArmFinCredit</div>
            <p className="text-xs text-slate-400 leading-relaxed">{L('disclaimer')}</p>
          </div>
          {/* Links */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              {lang === 'RU' ? '\u041d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f' : 'Navigation'}
            </div>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{L('calc')}</Link>
              <Link to="/schedule" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{L('sched')}</Link>
            </div>
          </div>
          {/* Legal */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              {lang === 'RU' ? '\u041f\u0440\u0430\u0432\u043e\u0432\u0430\u044f' : 'Legal'}
            </div>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{L('privacy')}</Link>
              <Link to="/terms" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{L('terms')}</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-slate-400">{L('rights')}</p>
          <p className="text-xs text-slate-400">armfincredit-app.vercel.app</p>
        </div>
      </div>
    </footer>
  )
}
