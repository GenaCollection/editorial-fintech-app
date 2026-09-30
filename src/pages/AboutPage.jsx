import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { CONTACT_EMAIL, mailto, PARTNER_TELEGRAM, PARTNER_TELEGRAM_URL } from '../config/monetization.js'
import { SITE_URL } from '../config/site.js'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'
import { localPathFor } from '../seo/localPages.js'
import { guidesIndexPath } from '../content/articles.js'

// About / contacts: who runs the site, where the data comes from and how it
// is funded — what visitors, banks and ad reviewers look for.

function L(am, ru, en) { return { AM: am, RU: ru, EN: en } }

var TEXT = {
  h1: L('ArmFinCredit-ի մասին', 'О проекте ArmFinCredit', 'About ArmFinCredit'),
  intro: L(
    'ArmFinCredit-ը անվճար ֆինանսական հաշվիչների և համեմատությունների կայք է Հայաստանի համար՝ հայերեն, ռուսերեն և անգլերեն։ Մեր նպատակն է օգնել մարդկանց հասկանալ վարկի կամ ավանդի իրական արժեքը մինչև բանկ գնալը։',
    'ArmFinCredit — бесплатный сайт финансовых калькуляторов и сравнений для Армении на армянском, русском и английском. Наша цель — помочь понять реальную стоимость кредита или доходность вклада до похода в банк.',
    'ArmFinCredit is a free website of financial calculators and comparisons for Armenia, in Armenian, Russian and English. Our goal is to help people understand the real cost of a loan or the return on a deposit before they visit a bank.'
  ),
  sections: [
    [L('Ինչ կա կայքում', 'Что есть на сайте', 'What the site offers'), [
      L('Վարկի հաշվիչ՝ ամսական վճար, մարման գրաֆիկ, վաղաժամկետ մարում, փաստացի դրույք (APR), տարբեր արժույթներով։', 'Кредитный калькулятор: ежемесячный платёж, график, досрочное погашение, эффективная ставка (APR), расчёт в разных валютах.', 'A loan calculator: monthly payment, schedule, early repayment and the effective rate (APR), in several currencies.'),
      L('Ավանդի հաշվիչ, բանկերի դրույքների կատալոգ և համեմատություն ձեր գումարով, ԿԲ փոխարժեքներ։', 'Калькулятор вкладов, каталог ставок банков и сравнение на вашу сумму, курсы ЦБ.', 'A deposit calculator, a catalog of bank rates with comparison on your amount, and Central Bank exchange rates.'),
      L('Ուղեցույցներ և AI խորհրդատու, որը բացատրում է ձեր հաշվարկը։', 'Гайды и ИИ-советник, который объясняет ваш расчёт.', 'Guides and an AI advisor that explains your calculation.')
    ]],
    [L('Որտեղից են տվյալները', 'Откуда данные', 'Where the data comes from'), [
      L('Փոխարժեքները՝ ՀՀ Կենտրոնական բանկից, ամեն օր։ Բանկերի դրույքները՝ բանկերի կայքերից և պաշտոնական հրապարակումներից. յուրաքանչյուր թիվ ունի աղբյուր և ամսաթիվ, իսկ կատալոգը թարմացվում է ամեն ամիս։', 'Курсы валют — Центральный банк Армении, ежедневно. Ставки банков — с сайтов банков и из официальных публикаций; у каждой цифры указаны источник и дата, каталог обновляется ежемесячно.', 'Exchange rates come from the Central Bank of Armenia daily. Bank rates come from bank websites and official announcements; every figure has its source and date, and the catalog is refreshed monthly.'),
      L('Հաշվարկները կատարվում են ձեր բրաուզերում ստանդարտ բանաձևերով, և դուք կարող եք դրանք ստուգել։ Սխալ եք գտել՝ գրեք մեզ։', 'Расчёты выполняются в вашем браузере по стандартным формулам — их можно проверить. Нашли ошибку — напишите нам.', 'Calculations run in your browser using standard formulas you can verify. Found a mistake? Write to us.')
    ]],
    [L('Ինչպես է ֆինանսավորվում կայքը', 'Как устроено финансирование', 'How the site is funded'), [
      L('Կայքն անվճար է և ապրում է գովազդով (Google AdSense), կամընտիր Pro բաժանորդագրությամբ և բանկերի հետ համագործակցությամբ։ Գործընկերների առաջարկները միշտ նշված են, իսկ բանկերը դասավորվում են ըստ դրույքի։', 'Сайт бесплатный и живёт за счёт рекламы (Google AdSense), необязательной подписки Pro и сотрудничества с банками. Партнёрские предложения всегда помечены, а банки сортируются по ставке.', 'The site is free and funded by advertising (Google AdSense), an optional Pro subscription and partnerships with banks. Partner offers are always marked, and banks are sorted by rate.'),
      L('ArmFinCredit-ը բանկ չէ, վարկ չի տրամադրում, և կայքի տեղեկությունները ֆինանսական խորհուրդ չեն։', 'ArmFinCredit не является банком, не выдаёт кредиты, а информация на сайте не является финансовой консультацией.', 'ArmFinCredit is not a bank, does not lend, and the information on the site is not financial advice.')
    ]]
  ],
  contacts: L('Կոնտակտներ', 'Контакты', 'Contacts'),
  contactsText: L('Հարցեր, առաջարկներ, սխալներ տվյալներում կամ համագործակցություն՝ գրեք մեզ։', 'Вопросы, предложения, ошибки в данных или сотрудничество — напишите нам.', 'Questions, suggestions, data errors or partnership — write to us.'),
  forBanks: L('Բանկերի համար', 'Для банков', 'For banks'),
  guides: L('Ուղեցույցներ', 'Гайды', 'Guides')
}

export default function AboutPage() {
  var lang = useLanguage().language
  var seo = pageSeo('about', lang)
  seo.jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ArmFinCredit',
    url: SITE_URL + '/',
    logo: SITE_URL + '/icon.svg',
    email: CONTACT_EMAIL,
    areaServed: 'AM',
    sameAs: [PARTNER_TELEGRAM_URL],
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', email: CONTACT_EMAIL, availableLanguage: ['hy', 'ru', 'en'] }]
  }
  useSeo(seo)

  return (
    <main className="flex-1 px-4 md:px-8 pt-24 pb-24 max-w-3xl mx-auto w-full animate-fade-up">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 break-words"><span className="text-gradient">{TEXT.h1[lang]}</span></h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{TEXT.intro[lang]}</p>

      {TEXT.sections.map(function(sec, i) {
        return (
          <section key={i} className="mb-8">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">{sec[0][lang]}</h2>
            {sec[1].map(function(p, j) { return <p key={j} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{p[lang]}</p> })}
          </section>
        )
      })}

      <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-6 mb-8">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">{TEXT.contacts[lang]}</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">{TEXT.contactsText[lang]}</p>
        <p className="mb-1"><span className="text-slate-400">Email: </span><a href={mailto('ArmFinCredit')} className="font-bold text-blue-600 dark:text-blue-400 hover:underline break-all">{CONTACT_EMAIL}</a></p>
        <p><span className="text-slate-400">Telegram: </span><a href={PARTNER_TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">@{PARTNER_TELEGRAM}</a></p>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link to={localPathFor('/partners', lang)} className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-blue-400">{TEXT.forBanks[lang]}</Link>
        <Link to={guidesIndexPath(lang)} className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-blue-400">{TEXT.guides[lang]}</Link>
      </div>
    </main>
  )
}
