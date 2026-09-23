import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { PARTNER_TELEGRAM, PARTNER_TELEGRAM_URL } from '../config/monetization.js'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'

// For banks and credit organisations: partnership formats and the contact.

function L(am, ru, en) { return { AM: am, RU: ru, EN: en } }

var FORMATS = [
  {
    icon: 'contact_phone',
    title: L('Վճար հայտի դիմաց (CPL)', 'Оплата за заявку (CPL)', 'Pay per lead (CPL)'),
    text: L('Հաճախորդը հայտ է թողնում ձեր առաջարկի քարտում՝ արդեն հաշվարկված գումարով և ժամկետով։ Դուք վճարում եք միայն ստացված հայտերի համար։',
      'Клиент оставляет заявку прямо в карточке вашего продукта — с уже посчитанной суммой и сроком. Вы платите только за полученные заявки.',
      'A customer applies right on your product card, with the amount and term already calculated. You pay only for the requests you receive.')
  },
  {
    icon: 'leaderboard',
    title: L('Տեղադրում համեմատություններում', 'Размещение в сравнениях', 'Placement in comparisons'),
    text: L('«Գործընկեր» նշումով առաջարկ «Վարկային առաջարկներ» էջում, բանկերի կատալոգում և դրույքների էջերում հայերեն, ռուսերեն և անգլերեն։',
      'Предложение с отметкой «Партнёр» в сравнении кредитов, каталоге банков и на страницах ставок — на армянском, русском и английском.',
      'Your offer marked "Partner" in the loan comparison, the bank catalog and the rate pages — in Armenian, Russian and English.')
  },
  {
    icon: 'widgets',
    title: L('Հաշվիչ ձեր կայքում', 'Калькулятор на сайте банка', 'Calculator on your website'),
    text: L('Վարկային հաշվիչի վիջեթ ձեր գույներով և դրույքներով, առանց ArmFinCredit բրենդի։',
      'Виджет кредитного калькулятора в ваших цветах и с вашими ставками, без бренда ArmFinCredit.',
      'A loan calculator widget in your colours and with your rates, without ArmFinCredit branding.')
  },
  {
    icon: 'verified',
    title: L('Ճշգրիտ պայմաններ', 'Точные условия', 'Accurate terms'),
    text: L('Թարմացնում ենք ձեր դրույքներն ու պայմանները անմիջապես ձեր տվյալներով, որպեսզի հաճախորդները տեսնեն ճիշտ թվեր։',
      'Обновляем ваши ставки и условия напрямую по вашим данным — клиенты видят точные цифры.',
      'We update your rates and terms directly from your data, so customers see the right numbers.')
  }
]

var WHY = [
  L('Այցելուները հաշվում են իրենց վարկը դրամով և համեմատում բանկերը՝ պատրաստ են դիմելու։', 'Посетители считают свой кредит в драмах и сравнивают банки — они уже готовы подать заявку.', 'Visitors calculate their loan in drams and compare banks — they are ready to apply.'),
  L('Օրգանական տրաֆիկ Google-ից՝ վարկերի, հիփոթեքի և ավանդների դրույքների էջերից։', 'Органический трафик из Google на страницы ставок по кредитам, ипотеке и вкладам.', 'Organic traffic from Google to loan, mortgage and deposit rate pages.'),
  L('Հայերեն, ռուսերեն և անգլերեն՝ ներառյալ սփյուռքը։', 'Три языка — армянский, русский, английский, включая диаспору.', 'Three languages — Armenian, Russian, English, including the diaspora.')
]

var STEPS = [
  L('Գրեք Telegram-ով', 'Напишите в Telegram', 'Message us on Telegram'),
  L('Համաձայնեցնում ենք ձևաչափը և գինը', 'Согласуем формат и стоимость', 'We agree on the format and price'),
  L('Միացնում ենք հայտերի առաքումը (Telegram, email կամ API)', 'Подключаем доставку заявок (Telegram, email или API)', 'We connect lead delivery (Telegram, email or API)'),
  L('Ամսական հաշվետվություն', 'Ежемесячный отчёт', 'Monthly report')
]

function TelegramButton(props) {
  return (
    <a href={PARTNER_TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
      className={'inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-extrabold shadow-lg ' + props.className}>
      <span className="material-symbols-outlined" style={{fontSize:'18px'}}>send</span>
      {t(props.lang, 'partners', 'cta')} · @{PARTNER_TELEGRAM}
    </a>
  )
}

export default function PartnersPage() {
  var lang = useLanguage().language
  useSeo(pageSeo('partners', lang))

  return (
    <main className="flex-1 px-4 md:px-8 pt-24 pb-24 max-w-5xl mx-auto w-full animate-fade-up">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight break-words mb-3"><span className="text-gradient">{t(lang, 'partners', 'title')}</span></h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-6 max-w-2xl">{t(lang, 'partners', 'desc')}</p>
        <TelegramButton lang={lang} className="bg-brand-gradient text-white shadow-blue-700/25 hover:opacity-95" />
      </div>

      <ul className="grid md:grid-cols-3 gap-3 mb-10">
        {WHY.map(function(w, i) {
          return (
            <li key={i} className="flex gap-3 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-5 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined text-emerald-500">check_circle</span>
              <span>{w[lang]}</span>
            </li>
          )
        })}
      </ul>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {FORMATS.map(function(f) {
          return (
            <div key={f.icon} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-6">
              <span className="material-symbols-outlined text-blue-600 mb-2 block">{f.icon}</span>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">{f.title[lang]}</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.text[lang]}</p>
            </div>
          )
        })}
      </div>

      <ol className="grid sm:grid-cols-4 gap-3 mb-10">
        {STEPS.map(function(s, i) {
          return (
            <li key={i} className="flex gap-3 items-start text-slate-600 dark:text-slate-300">
              <span className="shrink-0 w-7 h-7 rounded-full bg-brand-gradient text-white text-sm font-extrabold flex items-center justify-center">{i + 1}</span>
              <span className="pt-0.5 text-sm">{s[lang]}</span>
            </li>
          )
        })}
      </ol>

      <div className="rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-5 justify-between">
        <div>
          <p className="text-2xl font-extrabold">Telegram: @{PARTNER_TELEGRAM}</p>
          <p className="opacity-75 mt-1">{t(lang, 'partners', 'notBank')}</p>
        </div>
        <TelegramButton lang={lang} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white shrink-0" />
      </div>
    </main>
  )
}
