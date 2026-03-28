import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

var CONTENT = {
  EN: {
    title: 'Terms of Use',
    updated: 'Last updated: March 28, 2026',
    sections: [
      {
        h: '1. Acceptance of Terms',
        p: 'By accessing and using ArmFinCredit at armfincredit-app.vercel.app, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Service.'
      },
      {
        h: '2. Description of Service',
        p: 'ArmFinCredit is a free online loan calculator that provides amortization schedules, early repayment analysis, and APR calculations for informational purposes only. The Service does not constitute financial advice, and we are not a licensed financial institution.'
      },
      {
        h: '3. Disclaimer of Warranties',
        p: 'The Service is provided on an AS IS and AS AVAILABLE basis without warranties of any kind. Calculation results are for illustrative purposes only and may differ from actual loan terms offered by financial institutions. Always consult a qualified financial advisor before making borrowing decisions.'
      },
      {
        h: '4. Limitation of Liability',
        p: 'ArmFinCredit shall not be liable for any direct, indirect, incidental, special or consequential damages resulting from the use or inability to use our Service, or from reliance on any information provided by the Service.'
      },
      {
        h: '5. Intellectual Property',
        p: 'All content, design, graphics, and code on this Service are the property of ArmFinCredit and are protected by applicable intellectual property laws. You may not reproduce or distribute any part of the Service without written permission.'
      },
      {
        h: '6. Third-Party Advertising',
        p: "The Service displays advertisements provided by Google AdSense. These ads are governed by Google's own terms and privacy policy. We are not responsible for the content of third-party advertisements."
      },
      {
        h: '7. Changes to Terms',
        p: 'We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting. Continued use of the Service after changes constitutes acceptance of the new terms.'
      },
      {
        h: '8. Governing Law',
        p: 'These Terms shall be governed by and construed in accordance with the laws of the Republic of Armenia, without regard to conflict of law provisions.'
      }
    ]
  },
  RU: {
    title: '\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u043e\u0435 \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435',
    updated: '\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0435 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435: 28 \u043c\u0430\u0440\u0442\u0430 2026',
    sections: [
      {
        h: '1. \u041f\u0440\u0438\u043d\u044f\u0442\u0438\u0435 \u0443\u0441\u043b\u043e\u0432\u0438\u0439',
        p: '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044f \u0441\u0430\u0439\u0442 ArmFinCredit, \u0432\u044b \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044c \u0441 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0438\u043c\u0438 \u0423\u0441\u043b\u043e\u0432\u0438\u044f\u043c\u0438. \u0415\u0441\u043b\u0438 \u0432\u044b \u043d\u0435 \u0441\u043e\u0433\u043b\u0430\u0441\u043d\u044b \u0441 \u0443\u0441\u043b\u043e\u0432\u0438\u044f\u043c\u0438, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u043d\u0435 \u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435\u0441\u044c \u043d\u0430\u0448\u0438\u043c \u0441\u0435\u0440\u0432\u0438\u0441\u043e\u043c.'
      },
      {
        h: '2. \u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u0430',
        p: 'ArmFinCredit \u2014 \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0439 \u043e\u043d\u043b\u0430\u0439\u043d-\u043a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440 \u043a\u0440\u0435\u0434\u0438\u0442\u043e\u0432 \u0434\u043b\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0445 \u0446\u0435\u043b\u0435\u0439. \u0421\u0435\u0440\u0432\u0438\u0441 \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u043c \u043a\u043e\u043d\u0441\u0443\u043b\u044c\u0442\u0430\u043d\u0442\u043e\u043c.'
      },
      {
        h: '3. \u041e\u0442\u043a\u0430\u0437 \u043e\u0442 \u0433\u0430\u0440\u0430\u043d\u0442\u0438\u0439',
        p: '\u0421\u0435\u0440\u0432\u0438\u0441 \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442\u0441\u044f "\u041a\u0410\u041a \u0415\u0421\u0422\u042c" \u0431\u0435\u0437 \u043a\u0430\u043a\u0438\u0445-\u043b\u0438\u0431\u043e \u0433\u0430\u0440\u0430\u043d\u0442\u0438\u0439. \u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b \u043d\u043e\u0441\u044f\u0442 \u0438\u043b\u043b\u044e\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043d\u044b\u0439 \u0445\u0430\u0440\u0430\u043a\u0442\u0435\u0440 \u0438 \u043c\u043e\u0433\u0443\u0442 \u043e\u0442\u043b\u0438\u0447\u0430\u0442\u044c\u0441\u044f \u043e\u0442 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0445 \u0443\u0441\u043b\u043e\u0432\u0438\u0439 \u0431\u0430\u043d\u043a\u043e\u0432.'
      },
      {
        h: '4. \u041e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u0435 \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u0438',
        p: 'ArmFinCredit \u043d\u0435 \u043d\u0435\u0441\u0451\u0442 \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u0438 \u0437\u0430 \u043f\u0440\u044f\u043c\u044b\u0435 \u0438\u043b\u0438 \u043f\u043e\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0435 \u0443\u0431\u044b\u0442\u043a\u0438, \u0432\u044b\u0442\u0435\u043a\u0430\u044e\u0449\u0438\u0435 \u0438\u0437 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u044f \u0441\u0435\u0440\u0432\u0438\u0441\u0430.'
      },
      {
        h: '5. \u0420\u0435\u043a\u043b\u0430\u043c\u0430 \u0442\u0440\u0435\u0442\u044c\u0438\u0445 \u043b\u0438\u0446',
        p: '\u0421\u0435\u0440\u0432\u0438\u0441 \u043e\u0442\u043e\u0431\u0440\u0430\u0436\u0430\u0435\u0442 \u0440\u0435\u043a\u043b\u0430\u043c\u0443 Google AdSense. \u041c\u044b \u043d\u0435 \u043d\u0435\u0441\u0451\u043c \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u0438 \u0437\u0430 \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u0435 \u0440\u0435\u043a\u043b\u0430\u043c\u043d\u044b\u0445 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0439 \u0442\u0440\u0435\u0442\u044c\u0438\u0445 \u043b\u0438\u0446.'
      },
      {
        h: '6. \u041f\u0440\u0438\u043c\u0435\u043d\u0438\u043c\u043e\u0435 \u043f\u0440\u0430\u0432\u043e',
        p: '\u041d\u0430\u0441\u0442\u043e\u044f\u0449\u0438\u0435 \u0423\u0441\u043b\u043e\u0432\u0438\u044f \u0440\u0435\u0433\u0443\u043b\u0438\u0440\u0443\u044e\u0442\u0441\u044f \u0437\u0430\u043a\u043e\u043d\u0430\u043c\u0438 \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0438 \u0410\u0440\u043c\u0435\u043d\u0438\u044f.'
      }
    ]
  },
  AM: {
    title: 'Terms of Use',
    updated: 'Last updated: March 28, 2026',
    sections: [
      {
        h: '1. Acceptance of Terms',
        p: 'By accessing and using ArmFinCredit at armfincredit-app.vercel.app, you accept and agree to be bound by these Terms of Use.'
      },
      {
        h: '2. Description of Service',
        p: 'ArmFinCredit is a free online loan calculator for informational purposes only. The Service does not constitute financial advice.'
      },
      {
        h: '3. Disclaimer of Warranties',
        p: 'The Service is provided on an AS IS basis. Calculation results are illustrative and may differ from actual bank offers. Always consult a qualified financial advisor.'
      },
      {
        h: '4. Limitation of Liability',
        p: 'ArmFinCredit shall not be liable for any damages resulting from the use of our Service or reliance on any information provided.'
      },
      {
        h: '5. Third-Party Advertising',
        p: 'The Service displays advertisements provided by Google AdSense. We are not responsible for the content of third-party advertisements.'
      },
      {
        h: '6. Governing Law',
        p: 'These Terms shall be governed by the laws of the Republic of Armenia.'
      }
    ]
  }
}

export default function TermsPage() {
  var langCtx = useLanguage()
  var lang = langCtx.language
  var c = CONTENT[lang] || CONTENT.EN

  return (
    <main className="flex-1 pt-24 pb-16 px-6 md:px-12 max-w-3xl mx-auto w-full">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-700 font-bold mb-8 hover:underline">
        <span className="material-symbols-outlined" style={{fontSize:'16px'}}>arrow_back</span>
        {lang === 'RU' ? '\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e' : 'Back'}
      </Link>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">{c.title}</h1>
      <p className="text-sm text-slate-400 mb-10">{c.updated}</p>
      <div className="space-y-8">
        {c.sections.map(function(s, i) {
          return (
            <div key={i}>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">{s.h}</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.p}</p>
            </div>
          )
        })}
      </div>
    </main>
  )
}
