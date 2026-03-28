import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'

var SECTIONS = {
  EN: [
    ['1. Acceptance of Terms', 'By accessing and using ArmFinCredit at armfincredit-app.vercel.app, you agree to be bound by these Terms of Use. If you do not agree, please do not use the Service.'],
    ['2. Description of Service', 'ArmFinCredit is a free online loan calculator for informational purposes only. It provides amortization schedules, early repayment analysis, and APR calculations. It does not constitute financial advice.'],
    ['3. No Warranties', 'The Service is provided on an AS IS and AS AVAILABLE basis without warranties of any kind. Calculation results are illustrative and may differ from actual loan offers from financial institutions.'],
    ['4. Limitation of Liability', 'ArmFinCredit is not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the Service or reliance on its content.'],
    ['5. Intellectual Property', 'All content, design, graphics, and code on this Service are the property of ArmFinCredit unless otherwise stated and are protected by applicable intellectual property laws.'],
    ['6. Third-Party Advertising', 'The Service displays advertisements provided by Google AdSense. Those ads are governed by Google\'s own terms and privacy policy, and we are not responsible for their content.'],
    ['7. Governing Law', 'These Terms are governed by the laws of the Republic of Armenia.'],
    ['8. Changes to Terms', 'We may update these Terms of Use from time to time. Continued use of the Service after changes means you accept the updated Terms.']
  ],
  RU: [
    ['1. Принятие условий', 'Используя ArmFinCredit на armfincredit-app.vercel.app, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны, пожалуйста, не используйте Сервис.'],
    ['2. Описание сервиса', 'ArmFinCredit — это бесплатный онлайн-калькулятор кредитов, предназначенный только для информационных целей. Он предоставляет графики платежей, анализ досрочного погашения и расчёт APR. Это не является финансовой консультацией.'],
    ['3. Отсутствие гарантий', 'Сервис предоставляется на условиях «как есть» и «по мере доступности» без каких-либо гарантий. Результаты расчётов носят иллюстративный характер и могут отличаться от реальных предложений финансовых учреждений.'],
    ['4. Ограничение ответственности', 'ArmFinCredit не несёт ответственности за прямые, косвенные, случайные, специальные или последующие убытки, возникшие в результате использования Сервиса или доверия к его содержанию.'],
    ['5. Интеллектуальная собственность', 'Весь контент, дизайн, графика и код на данном Сервисе являются собственностью ArmFinCredit, если не указано иное, и защищены применимым законодательством об интеллектуальной собственности.'],
    ['6. Реклама третьих лиц', 'Сервис отображает рекламу, предоставляемую Google AdSense. Такая реклама регулируется собственными условиями и политикой конфиденциальности Google, и мы не отвечаем за её содержание.'],
    ['7. Применимое право', 'Настоящие Условия регулируются законодательством Республики Армения.'],
    ['8. Изменения условий', 'Мы можем периодически обновлять настоящие Условия использования. Продолжение использования Сервиса после изменений означает ваше согласие с обновлёнными условиями.']
  ],
  AM: [
    ['1. Պայմանների ընդունում', 'ArmFinCredit-ը armfincredit-app.vercel.app հասցեով օգտագործելով՝ դուք համաձայնվում եք այս Օգտագործման պայմաններին։ Եթե համաձայն չեք, խնդրում ենք չօգտվել Ծառայությունից։'],
    ['2. Ծառայության նկարագրություն', 'ArmFinCredit-ը անվճար առցանց վարկային հաշվիչ է՝ միայն տեղեկատվական նպատակներով։ Այն տրամադրում է վճարումների գրաֆիկներ, վաղաժամկետ մարումների վերլուծություն և APR-ի հաշվարկ։ Սա ֆինանսական խորհրդատվություն չէ։'],
    ['3. Երաշխիքների բացակայություն', 'Ծառայությունը տրամադրվում է «ինչպես կա» և «ըստ հասանելիության» սկզբունքով՝ առանց որևէ երաշխիքի։ Հաշվարկների արդյունքները ցուցադրական են և կարող են տարբերվել ֆինանսական հաստատությունների իրական առաջարկներից։'],
    ['4. Պատասխանատվության սահմանափակում', 'ArmFinCredit-ը պատասխանատվություն չի կրում որևէ ուղղակի, անուղղակի, պատահական, հատուկ կամ հետևանքային վնասների համար, որոնք առաջանում են Ծառայությունից օգտվելուց կամ դրա բովանդակությանը վստահելուց։'],
    ['5. Ինտելեկտուալ սեփականություն', 'Այս Ծառայության ամբողջ բովանդակությունը, դիզայնը, գրաֆիկան և կոդը պատկանում են ArmFinCredit-ին, եթե այլ բան նշված չէ, և պաշտպանված են կիրառելի օրենսդրությամբ։'],
    ['6. Երրորդ կողմի գովազդ', 'Ծառայությունը ցուցադրում է Google AdSense-ի տրամադրած գովազդ։ Այդ գովազդը կարգավորվում է Google-ի սեփական պայմաններով ու գաղտնիության քաղաքականությամբ, և մենք պատասխանատվություն չենք կրում դրա բովանդակության համար։'],
    ['7. Կիրառելի իրավունք', 'Այս Պայմանները կարգավորվում են Հայաստանի Հանրապետության օրենսդրությամբ։'],
    ['8. Պայմանների փոփոխություններ', 'Մենք կարող ենք պարբերաբար թարմացնել այս Օգտագործման պայմանները։ Ծառայությունից օգտվելն ընդունված փոփոխություններից հետո նշանակում է, որ դուք ընդունում եք թարմացված պայմանները։']
  ]
}

var TITLE = { EN: 'Terms of Use', RU: 'Пользовательское соглашение', AM: 'Օգտագործման Պայմաններ' }
var UPDATED = { EN: 'Last updated: March 28, 2026', RU: 'Последнее обновление: 28 марта 2026', AM: 'Վերջին թարմացում՝ 2026 թ. մարտի 28' }

export default function TermsPage() {
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
