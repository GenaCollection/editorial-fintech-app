import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'

var SECTIONS = {
  EN: [
    ['1. Introduction', 'ArmFinCredit ("we", "our", "us") operates the website armfincredit-app.vercel.app (the "Service"). This page explains how we collect, use, and disclose information when you use our Service.'],
    ['2. Information We Collect', 'We do not require registration or account creation. The Service runs in your browser. We do not collect, store, or transmit the financial values you enter into the calculator. We may collect anonymous usage analytics through third-party services.'],
    ['3. Google AdSense and Cookies', 'We use Google AdSense to display advertisements. Google and its partners may use cookies to serve ads based on your visits to this and other websites. You can opt out of personalized advertising at google.com/settings/ads.'],
    ['4. Third-Party Services', 'Our Service may contain links to third-party sites. We are not responsible for the content, privacy policies, or practices of third-party websites or services.'],
    ['5. Data Retention', 'Because we do not store the values you enter, there is no personal calculator data retained by us. Anonymous analytics, if enabled, may be retained by the third-party provider according to its own policy.'],
    ["6. Children's Privacy", 'Our Service is not intended for children under 13. We do not knowingly collect personally identifiable information from children under 13.'],
    ['7. Changes to This Policy', 'We may update this Privacy Policy from time to time. Changes are effective immediately after they are posted on this page.'],
    ['8. Contact Us', 'If you have any questions about this Privacy Policy, please contact us via the Support link in the footer of our website.']
  ],
  RU: [
    ['1. Введение', 'ArmFinCredit («мы», «наш», «нам») управляет сайтом armfincredit-app.vercel.app (далее — «Сервис»). Настоящая страница объясняет, как мы собираем, используем и раскрываем информацию при использовании Сервиса.'],
    ['2. Какие данные мы собираем', 'Мы не требуем регистрации или создания аккаунта. Сервис работает прямо в браузере. Мы не собираем, не храним и не передаём введённые вами в калькулятор финансовые значения. Анонимная статистика посещаемости может собираться через сторонние сервисы.'],
    ['3. Google AdSense и cookie', 'Мы используем Google AdSense для показа рекламы. Google и его партнёры могут использовать cookie-файлы для показа объявлений на основе ваших посещений этого и других сайтов. Вы можете отключить персонализированную рекламу на google.com/settings/ads.'],
    ['4. Сторонние сервисы', 'Сервис может содержать ссылки на сторонние сайты. Мы не отвечаем за содержание, политики конфиденциальности или практики сторонних веб-ресурсов и сервисов.'],
    ['5. Хранение данных', 'Поскольку мы не сохраняем введённые вами значения, у нас не хранится персональная кредитная информация. Анонимная аналитика, если она включена, может храниться у стороннего поставщика в соответствии с его политикой.'],
    ['6. Конфиденциальность детей', 'Наш Сервис не предназначен для детей младше 13 лет. Мы не собираем сознательно персональные данные детей младше 13 лет.'],
    ['7. Изменения политики', 'Мы можем периодически обновлять настоящую Политику конфиденциальности. Изменения вступают в силу сразу после публикации на этой странице.'],
    ['8. Связаться с нами', 'Если у вас есть вопросы по этой Политике конфиденциальности, пожалуйста, свяжитесь с нами через ссылку Support в футере сайта.']
  ],
  AM: [
    ['1. Ներածություն', 'ArmFinCredit-ը («մենք», «մեր», «մեզ») կառավարում է armfincredit-app.vercel.app կայքը (այսուհետ՝ «Ծառայություն»): Այս էջը նկարագրում է, թե ինչպես ենք մենք հավաքում, օգտագործում և բացահայտում տեղեկատվությունը Ծառայությունից օգտվելիս։'],
    ['2. Ինչ տվյալներ ենք հավաքում', 'Մենք չենք պահանջում գրանցում կամ հաշվի ստեղծում։ Ծառայությունը աշխատում է անմիջապես ձեր բրաուզերում։ Մենք չենք հավաքում, չենք պահպանում և չենք փոխանցում հաշվիչում մուտքագրված ֆինանսական տվյալները։ Անանուն օգտագործման վիճակագրությունը կարող է հավաքվել երրորդ կողմի ծառայությունների միջոցով։'],
    ['3. Google AdSense և քուքիներ', 'Մենք օգտագործում ենք Google AdSense՝ գովազդ ցուցադրելու համար։ Google-ը և նրա գործընկերները կարող են օգտագործել քուքիներ՝ ձեր կայք այցելությունների հիման վրա գովազդ ցուցադրելու համար։ Դուք կարող եք անջատել անհատականացված գովազդը google.com/settings/ads հասցեով։'],
    ['4. Երրորդ կողմի ծառայություններ', 'Ծառայությունը կարող է պարունակել հղումներ երրորդ կողմի կայքերին։ Մենք պատասխանատվություն չենք կրում երրորդ կողմի կայքերի կամ ծառայությունների բովանդակության կամ գաղտնիության քաղաքականության համար։'],
    ['5. Տվյալների պահպանում', 'Քանի որ մենք չենք պահպանում ձեր մուտքագրած արժեքները, մեր կողմից անձնական վարկային տվյալներ չեն պահպանվում։ Անանուն վերլուծությունը կարող է պահպանվել երրորդ կողմի մատակարարի կողմից՝ ըստ նրա քաղաքականության։'],
    ['6. Երեխաների գաղտնիություն', 'Մեր Ծառայությունը նախատեսված չէ 13 տարեկանից փոքր երեխաների համար։ Մենք գիտակցաբար չենք հավաքում 13 տարեկանից փոքր երեխաների անձնական տվյալներ։'],
    ['7. Քաղաքականության փոփոխություններ', 'Մենք կարող ենք պարբերաբար թարմացնել այս Գաղտնիության քաղաքականությունը։ Փոփոխությունները ուժի մեջ են մտնում անմիջապես այս էջում հրապարակվելուց հետո։'],
    ['8. Կապ մեզ հետ', 'Եթե ունեք հարցեր այս Գաղտնիության քաղաքականության վերաբերյալ, խնդրում ենք կապվել մեզ հետ կայքի ստորոտում գտնվող Աջակցություն հղումով։']
  ]
}

var TITLE = { EN: 'Privacy Policy', RU: 'Политика конфиденциальности', AM: 'Գաղտնիության Քաղաքականություն' }
var UPDATED = { EN: 'Last updated: March 28, 2026', RU: 'Последнее обновление: 28 марта 2026', AM: 'Վերջին թարմացում՝ 2026 թ. մարտի 28' }

export default function PrivacyPage() {
  var langCtx = useLanguage()
  var lang = langCtx.language
  var sections = SECTIONS[lang] || SECTIONS.EN
  return (
    <main className="flex-1 pt-24 pb-16 px-6 md:px-12 max-w-3xl mx-auto w-full">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-700 font-bold mb-8 hover:underline">
        <span className="material-symbols-outlined" style={{fontSize:'16px'}}>arrow_back</span>
        {t(lang, 'common', 'home')}
      </Link>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">{TITLE[lang] || TITLE.EN}</h1>
      <p className="text-sm text-slate-400 mb-10">{UPDATED[lang] || UPDATED.EN}</p>
      <div className="space-y-8">
        {sections.map(function(s, i) {
          return (
            <div key={i}>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">{s[0]}</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s[1]}</p>
            </div>
          )
        })}
      </div>
    </main>
  )
}
