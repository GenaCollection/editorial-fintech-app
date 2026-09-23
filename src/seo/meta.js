import { LANGS, LANG_TO_URL } from '../config/site.js'
import { LANDINGS, landingPath } from './landings.js'

// Titles and descriptions for the app's own pages (per language).
var PAGES = {
  home: {
    path: '/',
    title: {
      EN: 'ArmFinCredit — Loan Calculator Armenia (AMD) with AI Advisor',
      RU: 'Кредитный калькулятор Армения (драм) с ИИ-советником — ArmFinCredit',
      AM: 'Վարկային հաշվիչ (դրամ) AI խորհրդատուով — ArmFinCredit'
    },
    description: {
      EN: 'Free loan calculator for Armenia in drams: monthly payment, amortization schedule, early repayment, real APR, loan comparison and an AI advisor. In Armenian, Russian and English.',
      RU: 'Бесплатный кредитный калькулятор в драмах: ежемесячный платёж, график платежей, досрочное погашение, реальная ставка APR, сравнение кредитов и ИИ-советник.',
      AM: 'Անվճար վարկային հաշվիչ դրամով՝ ամսական վճար, մարման գրաֆիկ, վաղաժամկետ մարում, իրական APR, վարկերի համեմատություն և AI խորհրդատու։'
    }
  },
  schedule: {
    path: '/schedule',
    title: {
      EN: 'Loan Amortization Schedule — Month by Month | ArmFinCredit',
      RU: 'График платежей по кредиту — помесячно | ArmFinCredit',
      AM: 'Վարկի մարման գրաֆիկ — ըստ ամիսների | ArmFinCredit'
    },
    description: {
      EN: 'Full month-by-month loan schedule: payment, principal, interest and balance. Add early payments and export to CSV or PDF.',
      RU: 'Полный помесячный график платежей: платёж, основной долг, проценты и остаток. Добавляйте досрочные платежи и выгружайте в CSV или PDF.',
      AM: 'Վարկի ամբողջական ամսական գրաֆիկ՝ վճար, մայր գումար, տոկոս և մնացորդ։ Ավելացրեք վաղաժամկետ վճարումներ և արտահանեք CSV կամ PDF։'
    }
  },
  early: {
    path: '/early',
    title: {
      EN: 'Early Repayment Scenarios — Interest Saved | ArmFinCredit',
      RU: 'Досрочное погашение — сценарии и экономия | ArmFinCredit',
      AM: 'Վաղաժամկետ մարում — սցենարներ և խնայողություն | ArmFinCredit'
    },
    description: {
      EN: 'Compare monthly extra payments and see how many months and how much interest you save.',
      RU: 'Сравните ежемесячные доплаты и узнайте, сколько месяцев и процентов вы сэкономите.',
      AM: 'Համեմատեք ամսական լրացուցիչ վճարումները և տեսեք, թե քանի ամիս և որքան տոկոս կխնայեք։'
    }
  },
  compare: {
    path: '/compare',
    title: {
      EN: 'Compare Loans Side by Side | ArmFinCredit',
      RU: 'Сравнение кредитов бок о бок | ArmFinCredit',
      AM: 'Վարկերի համեմատություն | ArmFinCredit'
    },
    description: {
      EN: 'Compare up to 4 loan offers by monthly payment, total interest, total cost and effective rate.',
      RU: 'Сравните до 4 кредитных предложений по платежу, переплате, полной стоимости и эффективной ставке.',
      AM: 'Համեմատեք մինչև 4 վարկային առաջարկ ըստ ամսական վճարի, գերավճարի, ընդհանուր արժեքի և արդյունավետ տոկոսադրույքի։'
    }
  },
  offers: {
    path: '/offers',
    title: {
      EN: 'Loan Offers Matched to Your Calculation | ArmFinCredit',
      RU: 'Кредитные предложения под ваш расчёт | ArmFinCredit',
      AM: 'Վարկային առաջարկներ ձեր հաշվարկի համար | ArmFinCredit'
    },
    description: {
      EN: 'Partner loan offers compared with your own calculation: estimated payment and how much you could save.',
      RU: 'Предложения партнёров в сравнении с вашим расчётом: примерный платёж и возможная экономия.',
      AM: 'Գործընկերների առաջարկները՝ համեմատած ձեր հաշվարկի հետ․ մոտավոր վճար և հնարավոր խնայողություն։'
    }
  },
  pro: {
    path: '/pro',
    title: {
      EN: 'ArmFinCredit Pro — No Ads, AI Advisor, Clean PDF',
      RU: 'ArmFinCredit Pro — без рекламы, ИИ-советник, чистый PDF',
      AM: 'ArmFinCredit Pro — առանց գովազդի, AI խորհրդատու'
    },
    description: {
      EN: 'Pro from $1.99/month: no ads, 100 AI questions a day, clean PDF, CSV export, 50 saved calculations. 7-day free trial.',
      RU: 'Pro от $1.99 в месяц: без рекламы, 100 вопросов ИИ в день, PDF без водяного знака, экспорт CSV, 50 сохранённых расчётов. 7 дней бесплатно.',
      AM: 'Pro՝ $1.99/ամիս-ից․ առանց գովազդի, օրական 100 AI հարց, PDF առանց ջրանիշի, CSV արտահանում, 50 պահված հաշվարկ։ 7 օր անվճար։'
    }
  },
  widget: {
    path: '/widget',
    title: {
      EN: 'Free Loan Calculator Widget for Your Website | ArmFinCredit',
      RU: 'Бесплатный виджет кредитного калькулятора для сайта | ArmFinCredit',
      AM: 'Վարկային հաշվիչի անվճար վիջեթ ձեր կայքի համար | ArmFinCredit'
    },
    description: {
      EN: 'Add a free, responsive loan calculator to your website with one line of code. Armenian, Russian and English, your own colours.',
      RU: 'Добавьте на свой сайт бесплатный адаптивный кредитный калькулятор одной строкой кода. Армянский, русский и английский, ваши цвета.',
      AM: 'Ավելացրեք անվճար, հարմարվող վարկային հաշվիչ ձեր կայքում՝ կոդի մեկ տողով։ Հայերեն, ռուսերեն և անգլերեն, ձեր գույներով։'
    }
  },
  privacy: {
    path: '/privacy',
    title: { EN: 'Privacy Policy | ArmFinCredit', RU: 'Политика конфиденциальности | ArmFinCredit', AM: 'Գաղտնիության քաղաքականություն | ArmFinCredit' },
    description: {
      EN: 'How ArmFinCredit handles data, cookies, advertising, the AI advisor and payments.',
      RU: 'Как ArmFinCredit обращается с данными, cookie, рекламой, ИИ-советником и платежами.',
      AM: 'Ինչպես է ArmFinCredit-ը մշակում տվյալները, քուքիները, գովազդը, AI խորհրդատուն և վճարումները։'
    }
  },
  terms: {
    path: '/terms',
    title: { EN: 'Terms of Use | ArmFinCredit', RU: 'Пользовательское соглашение | ArmFinCredit', AM: 'Օգտագործման պայմաններ | ArmFinCredit' },
    description: {
      EN: 'Terms of use of the ArmFinCredit loan calculator.',
      RU: 'Условия использования кредитного калькулятора ArmFinCredit.',
      AM: 'ArmFinCredit վարկային հաշվիչի օգտագործման պայմանները։'
    }
  },
  saved: {
    path: '/saved', noindex: true,
    title: { EN: 'Saved Calculations | ArmFinCredit', RU: 'Сохранённые расчёты | ArmFinCredit', AM: 'Պահված հաշվարկներ | ArmFinCredit' },
    description: { EN: 'Your saved loan calculations.', RU: 'Ваши сохранённые расчёты.', AM: 'Ձեր պահված հաշվարկները։' }
  },
  notFound: {
    path: '/404', noindex: true,
    title: { EN: 'Page not found | ArmFinCredit', RU: 'Страница не найдена | ArmFinCredit', AM: 'Էջը չի գտնվել | ArmFinCredit' },
    description: { EN: 'This page does not exist.', RU: 'Такой страницы нет.', AM: 'Այս էջը գոյություն չունի։' }
  },
  embed: {
    path: '/embed', noindex: true,
    title: { EN: 'Loan calculator widget | ArmFinCredit', RU: 'Виджет кредитного калькулятора | ArmFinCredit', AM: 'Վարկային հաշվիչի վիջեթ | ArmFinCredit' },
    description: { EN: 'Embeddable loan calculator.', RU: 'Встраиваемый кредитный калькулятор.', AM: 'Ներդրվող վարկային հաշվիչ։' }
  }
}

function pick(obj, lang) { return obj[lang] || obj.EN }

var LANG_HOMES = LANGS.map(function(l) { return { hreflang: LANG_TO_URL[l], path: '/' + LANG_TO_URL[l] } })
  .concat([{ hreflang: 'x-default', path: '/' }])

// `path` overrides the default path (used for the /hy, /ru, /en homes).
export function pageSeo(key, lang, path) {
  var p = PAGES[key] || PAGES.home
  var m = {
    title: pick(p.title, lang),
    description: pick(p.description, lang),
    path: path || p.path,
    lang: LANG_TO_URL[lang] || 'en'
  }
  if (p.noindex) m.noindex = true
  if (key === 'home') m.alternates = LANG_HOMES
  return m
}

export function landingSeo(landing, lang) {
  var c = landing.content[lang]
  var alternates = LANGS.map(function(l) { return { hreflang: LANG_TO_URL[l], path: landingPath(landing, l) } })
    .concat([{ hreflang: 'x-default', path: landingPath(landing, 'EN') }])
  return {
    title: c.title,
    description: c.description,
    path: landingPath(landing, lang),
    lang: LANG_TO_URL[lang],
    alternates: alternates,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faq.map(function(q) {
        return { '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } }
      })
    }
  }
}

// Every URL that is prerendered to static HTML and listed in the sitemap.
export function prerenderRoutes() {
  var routes = [
    { path: '/', lang: 'EN', priority: '1.0' },
    { path: '/schedule', lang: 'EN', priority: '0.8' },
    { path: '/early', lang: 'EN', priority: '0.8' },
    { path: '/compare', lang: 'EN', priority: '0.8' },
    { path: '/offers', lang: 'EN', priority: '0.7' },
    { path: '/widget', lang: 'EN', priority: '0.6' },
    { path: '/pro', lang: 'EN', priority: '0.6' },
    { path: '/privacy', lang: 'EN', priority: '0.2' },
    { path: '/terms', lang: 'EN', priority: '0.2' },
    { path: '/saved', lang: 'EN', sitemap: false },
    { path: '/embed', lang: 'EN', sitemap: false }
  ]
  LANGS.forEach(function(l) {
    routes.push({ path: '/' + LANG_TO_URL[l], lang: l, priority: '0.9', alternates: LANG_HOMES })
  })
  LANDINGS.forEach(function(landing) {
    LANGS.forEach(function(l) {
      routes.push({ path: landingPath(landing, l), lang: l, priority: '0.9', alternates: landingSeo(landing, l).alternates })
    })
  })
  routes[0].alternates = LANG_HOMES
  return routes
}
