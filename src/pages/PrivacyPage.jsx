import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

var CONTENT = {
  EN: {
    title: 'Privacy Policy',
    updated: 'Last updated: March 28, 2026',
    sections: [
      {
        h: '1. Introduction',
        p: 'ArmFinCredit ("we", "our", "us") operates the website armfincredit-app.vercel.app (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.'
      },
      {
        h: '2. Data We Collect',
        p: 'We do not require registration or account creation. The Service is a financial calculator tool that runs entirely in your browser. We do not collect, store or transmit any personal financial data you enter into the calculator. We may collect anonymous usage analytics through third-party services.'
      },
      {
        h: '3. Google AdSense & Cookies',
        p: 'We use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting google.com/settings/ads. Third-party vendors, including Google, use cookies to serve ads based on prior visits to our website.'
      },
      {
        h: '4. Third-Party Services',
        p: 'Our Service may contain links to third-party sites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.'
      },
      {
        h: "5. Children's Privacy",
        p: 'Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.'
      },
      {
        h: '6. Changes to This Policy',
        p: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Changes are effective immediately after they are posted.'
      },
      {
        h: '7. Contact Us',
        p: 'If you have any questions about this Privacy Policy, please contact us via the Support link in the footer of our website.'
      }
    ]
  },
  RU: {
    title: '\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430 \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u0438',
    updated: '\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0435 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435: 28 \u043c\u0430\u0440\u0442\u0430 2026',
    sections: [
      {
        h: '1. \u0412\u0432\u0435\u0434\u0435\u043d\u0438\u0435',
        p: 'ArmFinCredit \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442 \u0441\u0430\u0439\u0442\u043e\u043c armfincredit-app.vercel.app. \u041d\u0430\u0441\u0442\u043e\u044f\u0449\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u0438\u043d\u0444\u043e\u0440\u043c\u0438\u0440\u0443\u0435\u0442 \u0432\u0430\u0441 \u043e \u043f\u043e\u043b\u0438\u0442\u0438\u043a\u0435 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0438 \u0432\u0430\u0448\u0438\u0445 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u043f\u0440\u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0438 \u043d\u0430\u0448\u0435\u0433\u043e \u0441\u0435\u0440\u0432\u0438\u0441\u0430.'
      },
      {
        h: '2. \u0414\u0430\u043d\u043d\u044b\u0435, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043c\u044b \u0441\u043e\u0431\u0438\u0440\u0430\u0435\u043c',
        p: '\u041c\u044b \u043d\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u043c \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438. \u0421\u0435\u0440\u0432\u0438\u0441 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440\u043e\u043c, \u0440\u0430\u0431\u043e\u0442\u0430\u044e\u0449\u0438\u043c \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435. \u041c\u044b \u043d\u0435 \u0441\u043e\u0431\u0438\u0440\u0430\u0435\u043c, \u043d\u0435 \u0445\u0440\u0430\u043d\u0438\u043c \u0438 \u043d\u0435 \u043f\u0435\u0440\u0435\u0434\u0430\u0451\u043c \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0432\u044b \u0432\u0432\u043e\u0434\u0438\u0442\u0435 \u0432 \u043a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440.'
      },
      {
        h: '3. Google AdSense \u0438 Cookie',
        p: '\u041c\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c Google AdSense \u0434\u043b\u044f \u043f\u043e\u043a\u0430\u0437\u0430 \u0440\u0435\u043a\u043b\u0430\u043c\u044b. Google AdSense \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442 cookie \u0434\u043b\u044f \u043f\u043e\u043a\u0430\u0437\u0430 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0439 \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u0432\u0430\u0448\u0438\u0445 \u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u0445 \u043f\u043e\u0441\u0435\u0449\u0435\u043d\u0438\u0439. \u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043e\u0442\u043a\u0430\u0437\u0430\u0442\u044c\u0441\u044f \u0447\u0435\u0440\u0435\u0437 google.com/settings/ads.'
      },
      {
        h: '4. \u0421\u0442\u043e\u0440\u043e\u043d\u043d\u0438\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u044b',
        p: '\u0421\u0430\u0439\u0442 \u043c\u043e\u0436\u0435\u0442 \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0438 \u043d\u0430 \u0441\u0442\u043e\u0440\u043e\u043d\u043d\u0438\u0435 \u0441\u0430\u0439\u0442\u044b. \u041c\u044b \u043d\u0435 \u043d\u0435\u0441\u0451\u043c \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u0438 \u0437\u0430 \u0438\u0445 \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u0435 \u0438\u043b\u0438 \u043f\u043e\u043b\u0438\u0442\u0438\u043a\u0443 \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u0438.'
      },
      {
        h: '5. \u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043f\u043e\u043b\u0438\u0442\u0438\u043a\u0438',
        p: '\u041c\u044b \u043c\u043e\u0436\u0435\u043c \u043e\u0431\u043d\u043e\u0432\u043b\u044f\u0442\u044c \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0443\u044e \u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0443 \u0432\u0440\u0435\u043c\u044f \u043e\u0442 \u0432\u0440\u0435\u043c\u0435\u043d\u0438. \u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0432\u0441\u0442\u0443\u043f\u0430\u044e\u0442 \u0432 \u0441\u0438\u043b\u0443 \u043d\u0435\u043c\u0435\u0434\u043b\u0435\u043d\u043d\u043e \u043f\u043e\u0441\u043b\u0435 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438.'
      },
      {
        h: '6. \u0421\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0441 \u043d\u0430\u043c\u0438',
        p: '\u0415\u0441\u043b\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044c \u0432\u043e\u043f\u0440\u043e\u0441\u044b, \u0441\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0447\u0435\u0440\u0435\u0437 \u0441\u0441\u044b\u043b\u043a\u0443 Support \u0432 \u0444\u0443\u0442\u0435\u0440\u0435 \u0441\u0430\u0439\u0442\u0430.'
      }
    ]
  },
  AM: {
    title: 'Privacy Policy',
    updated: 'Last updated: March 28, 2026',
    sections: [
      {
        h: '1. Introduction',
        p: 'ArmFinCredit operates the website armfincredit-app.vercel.app. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.'
      },
      {
        h: '2. Data We Collect',
        p: 'We do not require registration. The Service is a calculator that runs entirely in your browser. We do not collect, store or transmit any personal financial data you enter into the calculator.'
      },
      {
        h: '3. Google AdSense & Cookies',
        p: 'We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits. You may opt out at google.com/settings/ads.'
      },
      {
        h: '4. Third-Party Services',
        p: 'Our Service may contain links to third-party sites. We assume no responsibility for the content or privacy policies of any third-party sites.'
      },
      {
        h: '5. Changes to This Policy',
        p: 'We may update our Privacy Policy from time to time. Changes are effective immediately after they are posted on this page.'
      },
      {
        h: '6. Contact Us',
        p: 'If you have any questions about this Privacy Policy, please contact us via the Support link in the footer.'
      }
    ]
  }
}

export default function PrivacyPage() {
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
