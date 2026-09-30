import { LANGS, LANG_TO_URL, URL_TO_LANG } from '../config/site.js'

// Guides (/hy|ru|en/<slug>): evergreen explanations that link to the
// calculators. Figures that change (rates, limits, programmes) are not
// hard-coded here — the text points to the live pages and official sources.
//
// content[lang] = { title, description, h1, intro, sections: [[h2, [p, …]], …] }
// cta: calculator the guide leads to (plain app path, localized on render).

export var ARTICLES_UPDATED = '2026-09'

export var GUIDES_INDEX = {
  slug: { AM: 'ughecuycner', RU: 'gajdy', EN: 'guides' },
  title: { AM: 'Ուղեցույցներ վարկերի և ավանդների մասին | ArmFinCredit', RU: 'Гайды по кредитам и вкладам в Армении | ArmFinCredit', EN: 'Guides to Loans and Deposits in Armenia | ArmFinCredit' },
  h1: { AM: 'Ուղեցույցներ', RU: 'Гайды', EN: 'Guides' },
  description: {
    AM: 'Պարզ բացատրություններ հիփոթեքի, վարկի վճարման տեսակների, ավանդների, վաղաժամկետ մարման և փաստացի տոկոսադրույքի մասին՝ հաշվիչներով։',
    RU: 'Простые объяснения про ипотеку, виды платежей, вклады, досрочное погашение и эффективную ставку — с калькуляторами для своих цифр.',
    EN: 'Plain explanations of mortgages, payment types, deposits, early repayment and the effective rate — with calculators for your own numbers.'
  }
}

export var ARTICLES = [
  {
    key: 'mortgage-guide', icon: 'home', cta: '/',
    slug: { AM: 'inchpes-stanal-hipoteq', RU: 'kak-poluchit-ipoteku-v-armenii', EN: 'how-to-get-a-mortgage-in-armenia' },
    content: {
      RU: {
        title: 'Как получить ипотеку в Армении: шаги, документы, расходы | ArmFinCredit',
        description: 'Пошагово: сколько нужно на первый взнос, какие документы собрать, как сравнивать ставки банков и какие расходы кроме процентов учесть при ипотеке в Армении.',
        h1: 'Как получить ипотеку в Армении',
        intro: 'Ипотека — самый крупный кредит в жизни большинства людей, поэтому ошибка в выборе банка или срока стоит миллионы драмов. Ниже — порядок действий и то, на что смотреть в каждом шаге.',
        sections: [
          ['1. Посчитайте, какой платёж вы потянете', [
            'Банки в Армении обычно ограничивают долговую нагрузку: все платежи по кредитам не должны занимать слишком большую часть подтверждённого дохода. Прежде чем выбирать квартиру, посчитайте платёж для нескольких сумм и сроков в калькуляторе и оставьте запас на случай роста расходов.',
            'Более длинный срок снижает платёж, но заметно увеличивает переплату. Сравните 15 и 20 лет — разница в процентах часто больше стоимости ремонта.'
          ]],
          ['2. Первый взнос и тип жилья', [
            'Обычно банки просят первый взнос от 10–30% стоимости жилья; точный процент зависит от банка, программы и того, новостройка это или вторичный рынок. Чем больше взнос, тем ниже ставка и платёж.',
            'Есть государственные и партнёрские программы (например, для молодых семей или через Национальную ипотечную компанию) с более низкой ставкой, но с условиями отбора — уточняйте их в банке.'
          ]],
          ['3. Сравните банки по эффективной ставке', [
            'Номинальная ставка — не вся цена кредита. Банки обязаны указывать фактическую (эффективную) ставку, в которую входят комиссии, оценка и страхование. Сравнивайте предложения именно по ней и по полной переплате за весь срок.',
            'Уточните, фиксированная ставка или плавающая: плавающая может вырасти вслед за ставкой Центрального банка.'
          ]],
          ['4. Документы и сделка', [
            'Обычно нужны паспорт и соцкарта, справка о доходах (или выписка), документы на приобретаемое жильё и отчёт об оценке. После одобрения подписывается кредитный договор и договор залога, сделка регистрируется в Кадастре.',
            'Кроме процентов заложите в бюджет оценку, страхование, нотариальные и регистрационные расходы.'
          ]],
          ['5. Налоговые льготы и досрочное погашение', [
            'В Армении действует программа возврата подоходного налога по процентам ипотеки, но её условия в последние годы менялись. Перед покупкой уточните в банке и на сайте Комитета госдоходов, подходит ли под неё ваше жильё.',
            'Проверьте в договоре условия досрочного погашения: даже небольшие ежемесячные доплаты сокращают срок и переплату.'
          ]]
        ]
      },
      EN: {
        title: 'How to Get a Mortgage in Armenia: Steps, Documents, Costs | ArmFinCredit',
        description: 'Step by step: the down payment you need, documents to collect, how to compare bank rates and which costs besides interest to budget for a mortgage in Armenia.',
        h1: 'How to get a mortgage in Armenia',
        intro: 'A mortgage is the largest loan most people ever take, so a wrong choice of bank or term costs millions of drams. Here is the order of steps and what to check at each one.',
        sections: [
          ['1. Work out the payment you can afford', [
            'Armenian banks usually cap the debt burden: all your loan payments must not take too large a share of confirmed income. Before choosing a flat, calculate the payment for several amounts and terms and keep a margin for rising expenses.',
            'A longer term lowers the payment but noticeably raises the total interest. Compare 15 and 20 years — the difference is often more than the cost of renovation.'
          ]],
          ['2. Down payment and type of property', [
            'Banks typically ask for 10–30% of the price as a down payment; the exact share depends on the bank, the programme and whether the property is new or resale. A larger down payment means a lower rate and payment.',
            'State and partner programmes (for example for young families or through the National Mortgage Company) offer lower rates but have eligibility criteria — check them with the bank.'
          ]],
          ['3. Compare banks by the effective rate', [
            'The nominal rate is not the full price of a loan. Banks must disclose the effective annual rate, which includes fees, valuation and insurance. Compare offers by it and by the total overpayment over the term.',
            'Ask whether the rate is fixed or floating: a floating rate can rise after the Central Bank rate.'
          ]],
          ['4. Documents and the deal', [
            'You usually need a passport and social card, proof of income (or a statement), documents for the property and a valuation report. After approval you sign the loan and pledge agreements, and the deal is registered with the Cadastre.',
            'Besides interest, budget for valuation, insurance, notary and registration costs.'
          ]],
          ['5. Tax benefits and early repayment', [
            'Armenia has an income-tax refund for mortgage interest, but its conditions have changed in recent years. Before buying, check with the bank and the State Revenue Committee whether your property qualifies.',
            'Check the early repayment terms in the contract: even small monthly extra payments shorten the term and the interest.'
          ]]
        ]
      },
      AM: {
        title: 'Ինչպես ստանալ հիփոթեք Հայաստանում. քայլեր, փաստաթղթեր, ծախսեր | ArmFinCredit',
        description: 'Քայլ առ քայլ՝ որքան է պետք կանխավճարի համար, ինչ փաստաթղթեր հավաքել, ինչպես համեմատել բանկերի դրույքները և ինչ ծախսեր հաշվի առնել տոկոսներից բացի։',
        h1: 'Ինչպես ստանալ հիփոթեք Հայաստանում',
        intro: 'Հիփոթեքը մարդկանց մեծ մասի կյանքի ամենամեծ վարկն է, ուստի բանկի կամ ժամկետի սխալ ընտրությունն արժե միլիոնավոր դրամներ։ Ստորև՝ քայլերի հերթականությունը և այն, ինչին պետք է ուշադրություն դարձնել։',
        sections: [
          ['1. Հաշվեք, թե ինչ վճար կարող եք իրեն թույլ տալ', [
            'Հայաստանի բանկերը սովորաբար սահմանափակում են պարտքային բեռը. վարկերի բոլոր վճարները չպետք է կազմեն հաստատված եկամտի չափազանց մեծ մասը։ Բնակարան ընտրելուց առաջ հաշվեք վճարը մի քանի գումարի և ժամկետի համար և պահուստ թողեք։',
            'Ավելի երկար ժամկետը նվազեցնում է վճարը, բայց զգալիորեն մեծացնում գերավճարը։ Համեմատեք 15 և 20 տարին։'
          ]],
          ['2. Կանխավճար և բնակարանի տեսակ', [
            'Բանկերը սովորաբար պահանջում են գնի 10–30% կանխավճար. ճշգրիտ չափը կախված է բանկից, ծրագրից և նրանից, նորակառույց է, թե երկրորդային շուկա։ Որքան մեծ է կանխավճարը, այնքան ցածր են դրույքն ու վճարը։',
            'Կան պետական և գործընկերային ծրագրեր (օրինակ՝ երիտասարդ ընտանիքների համար կամ Ազգային հիփոթեքային ընկերության միջոցով)՝ ավելի ցածր դրույքով, բայց ընտրության պայմաններով։'
          ]],
          ['3. Համեմատեք բանկերը փաստացի տոկոսադրույքով', [
            'Անվանական դրույքը վարկի ամբողջ գինը չէ։ Բանկերը պարտավոր են նշել փաստացի տոկոսադրույքը, որը ներառում է միջնորդավճարները, գնահատումը և ապահովագրությունը։ Համեմատեք առաջարկները հենց դրանով և ամբողջ ժամկետի գերավճարով։',
            'Ճշտեք՝ դրույքը ֆիքսված է, թե լողացող. լողացողը կարող է աճել Կենտրոնական բանկի դրույքին հետևելով։'
          ]],
          ['4. Փաստաթղթեր և գործարք', [
            'Սովորաբար անհրաժեշտ են անձնագիր և սոցքարտ, եկամտի տեղեկանք (կամ քաղվածք), գնվող բնակարանի փաստաթղթեր և գնահատման հաշվետվություն։ Հաստատումից հետո ստորագրվում են վարկային և գրավի պայմանագրերը, գործարքը գրանցվում է Կադաստրում։',
            'Տոկոսներից բացի բյուջեում նախատեսեք գնահատման, ապահովագրության, նոտարական և գրանցման ծախսերը։'
          ]],
          ['5. Հարկային արտոնություններ և վաղաժամկետ մարում', [
            'Հայաստանում գործում է հիփոթեքի տոկոսների դիմաց եկամտային հարկի վերադարձի ծրագիր, սակայն դրա պայմանները վերջին տարիներին փոխվել են։ Գնելուց առաջ ճշտեք բանկում և Պետական եկամուտների կոմիտեի կայքում։',
            'Պայմանագրում ստուգեք վաղաժամկետ մարման պայմանները. նույնիսկ փոքր ամսական լրացուցիչ վճարները կրճատում են ժամկետը և գերավճարը։'
          ]]
        ]
      }
    }
  },
  {
    key: 'annuity-vs-differentiated', icon: 'balance', cta: '/',
    slug: { AM: 'anuitet-te-diferencvac', RU: 'annuitet-ili-differencirovannyj-platezh', EN: 'annuity-vs-differentiated-payments' },
    content: {
      RU: {
        title: 'Аннуитетный или дифференцированный платёж: что выгоднее | ArmFinCredit',
        description: 'Чем отличаются аннуитетный и дифференцированный платежи по кредиту, как они считаются, какой выгоднее по переплате и какой подходит под ваш бюджет — с примером.',
        h1: 'Аннуитетный или дифференцированный платёж',
        intro: 'Одна и та же сумма, ставка и срок дают разную переплату в зависимости от схемы погашения. Разберёмся, как работают обе схемы и какую выбрать.',
        sections: [
          ['Аннуитет: равные платежи', [
            'Платёж одинаковый весь срок: P × r / (1 − (1 + r)^−n), где P — сумма кредита, r — месячная ставка (годовая ÷ 12), n — число месяцев. В начале большая часть платежа — проценты, к концу — основной долг.',
            'Плюс — предсказуемый бюджет и более низкий первый платёж. Минус — долг гасится медленнее, поэтому переплата выше.'
          ]],
          ['Дифференцированный: убывающие платежи', [
            'Основной долг делится на равные части, а проценты начисляются на остаток. Поэтому первый платёж самый большой, а каждый следующий меньше.',
            'Плюс — меньшая переплата. Минус — в первые месяцы нужен больший доход, и банк может одобрить меньшую сумму.'
          ]],
          ['Пример', [
            '5 000 000 ֏ под 12% на 24 месяца: аннуитетный платёж — около 235 367 ֏ каждый месяц, переплата около 648 800 ֏. Дифференцированный начинается примерно с 258 333 ֏ и снижается до ~210 400 ֏, переплата — 625 000 ֏.',
            'На длинных сроках разница больше: на ипотеке за 20 лет она может составить миллионы драмов.'
          ]],
          ['Что выбрать', [
            'Если доход стабилен и первые платежи комфортны, дифференцированная схема дешевле. Если важен ровный бюджет — выбирайте аннуитет и уменьшайте переплату досрочными платежами.',
            'Посчитайте обе схемы на своих цифрах: в калькуляторе есть переключатель «Аннуитет / Дифф.».'
          ]]
        ]
      },
      EN: {
        title: 'Annuity vs Differentiated Loan Payments: Which Is Cheaper | ArmFinCredit',
        description: 'How annuity and differentiated loan payments differ, how each is calculated, which one costs less in interest and which fits your budget — with an example.',
        h1: 'Annuity vs differentiated payments',
        intro: 'The same amount, rate and term give a different total interest depending on the repayment scheme. Here is how both work and how to choose.',
        sections: [
          ['Annuity: equal payments', [
            'The payment stays the same: P × r / (1 − (1 + r)^−n), where P is the loan amount, r the monthly rate (annual ÷ 12) and n the number of months. Early payments are mostly interest, later ones mostly principal.',
            'Pros: a predictable budget and a lower first payment. Cons: the debt shrinks more slowly, so the total interest is higher.'
          ]],
          ['Differentiated: decreasing payments', [
            'The principal is split into equal parts and interest is charged on the remaining balance, so the first payment is the largest and each next one is smaller.',
            'Pros: less interest overall. Cons: you need a higher income in the first months, and the bank may approve a smaller amount.'
          ]],
          ['Example', [
            'AMD 5,000,000 at 12% for 24 months: the annuity payment is about AMD 235,367 every month, total interest about AMD 648,800. The differentiated payment starts at about AMD 258,333 and falls to ~AMD 210,400, total interest AMD 625,000.',
            'Over long terms the gap grows: on a 20-year mortgage it can reach millions of drams.'
          ]],
          ['Which to choose', [
            'If your income is stable and the first payments are comfortable, the differentiated scheme is cheaper. If an even budget matters more, choose the annuity and cut the interest with early repayments.',
            'Compare both on your own numbers: the calculator has an Annuity / Differentiated switch.'
          ]]
        ]
      },
      AM: {
        title: 'Անուիտետ թե դիֆերենցված վճար. որն է ավելի ձեռնտու | ArmFinCredit',
        description: 'Ինչով են տարբերվում անուիտետային և դիֆերենցված վճարները, ինչպես են հաշվարկվում, որն է ավելի էժան և որն է համապատասխանում ձեր բյուջեին՝ օրինակով։',
        h1: 'Անուիտետ թե դիֆերենցված վճար',
        intro: 'Նույն գումարը, դրույքը և ժամկետը տալիս են տարբեր գերավճար՝ կախված մարման սխեմայից։ Տեսնենք, թե ինչպես են աշխատում երկուսն էլ և որն ընտրել։',
        sections: [
          ['Անուիտետ՝ հավասար վճարներ', [
            'Վճարը ամբողջ ժամկետում նույնն է՝ P × r / (1 − (1 + r)^−n), որտեղ P-ն վարկի գումարն է, r-ը՝ ամսական դրույքը (տարեկան ÷ 12), n-ը՝ ամիսների թիվը։ Սկզբում վճարի մեծ մասը տոկոս է, վերջում՝ մայր գումար։',
            'Առավելությունը կանխատեսելի բյուջեն և ավելի ցածր առաջին վճարն է։ Թերությունը՝ պարտքը ավելի դանդաղ է մարվում, ուստի գերավճարն ավելի մեծ է։'
          ]],
          ['Դիֆերենցված՝ նվազող վճարներ', [
            'Մայր գումարը բաժանվում է հավասար մասերի, իսկ տոկոսները հաշվարկվում են մնացորդի վրա։ Ուստի առաջին վճարն ամենամեծն է, իսկ յուրաքանչյուր հաջորդը՝ ավելի փոքր։',
            'Առավելությունը ավելի փոքր գերավճարն է։ Թերությունը՝ առաջին ամիսներին ավելի մեծ եկամուտ է պետք, և բանկը կարող է հաստատել ավելի փոքր գումար։'
          ]],
          ['Օրինակ', [
            '5 000 000 ֏ 12%-ով 24 ամսով՝ անուիտետային վճարը մոտ 235 367 ֏ է ամեն ամիս, գերավճարը՝ մոտ 648 800 ֏։ Դիֆերենցվածը սկսվում է մոտ 258 333 ֏-ից և նվազում մինչև ~210 400 ֏, գերավճարը՝ 625 000 ֏։',
            'Երկար ժամկետներում տարբերությունն ավելի մեծ է. 20 տարվա հիփոթեքի դեպքում այն կարող է հասնել միլիոնավոր դրամների։'
          ]],
          ['Որն ընտրել', [
            'Եթե եկամուտը կայուն է, և առաջին վճարները հարմար են, դիֆերենցված սխեման ավելի էժան է։ Եթե կարևոր է հավասար բյուջեն՝ ընտրեք անուիտետը և նվազեցրեք գերավճարը վաղաժամկետ վճարումներով։',
            'Համեմատեք երկուսն էլ ձեր թվերով. հաշվիչում կա «Անուիտետ / Դիֆ.» փոխարկիչ։'
          ]]
        ]
      }
    }
  },
  {
    key: 'deposit-guide', icon: 'savings', cta: '/deposit',
    slug: { AM: 'inchpes-yntrel-avand', RU: 'kak-vybrat-vklad-v-armenii', EN: 'how-to-choose-a-deposit-in-armenia' },
    content: {
      RU: {
        title: 'Как выбрать вклад в Армении: ставка, капитализация, налог | ArmFinCredit',
        description: 'На что смотреть при выборе вклада в Армении: ставка и срок, капитализация, пополнение, досрочное снятие, налог на проценты и гарантирование вкладов.',
        h1: 'Как выбрать вклад в Армении',
        intro: 'Максимальная ставка в рекламе — не всегда самый выгодный вклад. Итоговый доход зависит от капитализации, условий пополнения и досрочного закрытия, налога и валюты.',
        sections: [
          ['Ставка и срок', [
            'Самые высокие ставки обычно по вкладам в драмах на 1–2 года без пополнения. Ставки по долларовым и особенно евровым вкладам заметно ниже. Сравнить банки можно на странице ставок по вкладам — там указан источник и дата каждой цифры.'
          ]],
          ['Капитализация и выплата процентов', [
            'Если проценты добавляются к вкладу каждый месяц (капитализация), следующие проценты начисляются уже на большую сумму — эффективная доходность выше номинальной ставки. При выплате процентов в конце срока доход меньше.',
            'Если проценты выплачиваются на карту, вы получаете деньги раньше, но без эффекта капитализации.'
          ]],
          ['Пополнение и досрочное закрытие', [
            'Вклады с пополнением и частичным снятием удобнее, но ставка по ним ниже. Некоторые банки снижают ставку за каждое пополнение. При досрочном закрытии проценты часто пересчитывают по минимальной ставке — внимательно читайте условия.'
          ]],
          ['Налог и гарантии', [
            'С процентного дохода по вкладам в Армении удерживается подоходный налог 10% — калькулятор вкладов показывает доход уже после налога.',
            'Вклады физических лиц гарантирует Фонд гарантирования вкладов в пределах установленного лимита. Проверьте актуальные лимиты на сайте фонда и не держите в одном банке больше гарантированной суммы.'
          ]],
          ['Валюта', [
            'Вклад в долларах или евро защищает от падения драма, но ставка ниже, а при укреплении драма доход в драмах уменьшается. Многие делят сбережения между валютами.'
          ]]
        ]
      },
      EN: {
        title: 'How to Choose a Deposit in Armenia: Rate, Compounding, Tax | ArmFinCredit',
        description: 'What to check when choosing a deposit in Armenia: rate and term, compounding, top-ups, early withdrawal, tax on interest and the deposit guarantee.',
        h1: 'How to choose a deposit in Armenia',
        intro: 'The highest advertised rate is not always the best deposit. Your real income depends on compounding, top-up and early closure terms, tax and currency.',
        sections: [
          ['Rate and term', [
            'The highest rates are usually on dram deposits for 1–2 years without top-ups. USD and especially EUR deposits pay noticeably less. Compare banks on the deposit rates page — every figure there has its source and date.'
          ]],
          ['Compounding and interest payout', [
            'If interest is added to the deposit every month (compounding), the next interest is earned on a larger amount, so the effective yield is above the nominal rate. Interest paid at the end of the term earns less.',
            'Interest paid out to a card reaches you sooner but without the compounding effect.'
          ]],
          ['Top-ups and early closure', [
            'Deposits with top-ups and partial withdrawals are more flexible but pay less. Some banks cut the rate for every top-up. On early closure interest is often recalculated at a minimal rate — read the terms carefully.'
          ]],
          ['Tax and guarantee', [
            'Deposit interest in Armenia is subject to 10% income tax — the deposit calculator shows income after tax.',
            'Personal deposits are guaranteed by the Deposit Guarantee Fund up to a set limit. Check the current limits on the fund’s website and do not keep more than the guaranteed amount in one bank.'
          ]],
          ['Currency', [
            'A USD or EUR deposit protects against a weaker dram, but the rate is lower, and if the dram strengthens your income in drams shrinks. Many people split savings between currencies.'
          ]]
        ]
      },
      AM: {
        title: 'Ինչպես ընտրել ավանդ Հայաստանում. դրույք, կապիտալացում, հարկ | ArmFinCredit',
        description: 'Ինչին նայել ավանդ ընտրելիս՝ դրույք և ժամկետ, կապիտալացում, համալրում, վաղաժամկետ դադարեցում, տոկոսների հարկ և ավանդների երաշխավորում։',
        h1: 'Ինչպես ընտրել ավանդ Հայաստանում',
        intro: 'Գովազդի ամենաբարձր դրույքը միշտ չէ, որ ամենաշահավետ ավանդն է։ Իրական եկամուտը կախված է կապիտալացումից, համալրման և վաղաժամկետ դադարեցման պայմաններից, հարկից և արժույթից։',
        sections: [
          ['Դրույք և ժամկետ', [
            'Ամենաբարձր դրույքները սովորաբար դրամային ավանդներինն են՝ 1–2 տարով, առանց համալրման։ Դոլարային և հատկապես եվրոյով ավանդների դրույքները զգալիորեն ցածր են։ Բանկերը կարող եք համեմատել ավանդների դրույքների էջում՝ յուրաքանչյուր թիվ աղբյուրով և ամսաթվով։'
          ]],
          ['Կապիտալացում և տոկոսների վճարում', [
            'Եթե տոկոսներն ամեն ամիս ավելացվում են ավանդին (կապիտալացում), հաջորդ տոկոսները հաշվարկվում են ավելի մեծ գումարի վրա, և փաստացի եկամտաբերությունը բարձր է անվանական դրույքից։ Ժամկետի վերջում վճարվող տոկոսներով եկամուտն ավելի փոքր է։',
            'Քարտին վճարվող տոկոսները ստանում եք ավելի շուտ, բայց առանց կապիտալացման էֆեկտի։'
          ]],
          ['Համալրում և վաղաժամկետ դադարեցում', [
            'Համալրվող և մասնակի ելքով ավանդներն ավելի հարմար են, բայց դրանց դրույքը ցածր է։ Որոշ բանկեր նվազեցնում են դրույքը յուրաքանչյուր համալրման համար։ Վաղաժամկետ դադարեցման դեպքում տոկոսները հաճախ վերահաշվարկվում են նվազագույն դրույքով։'
          ]],
          ['Հարկ և երաշխիքներ', [
            'Հայաստանում ավանդների տոկոսային եկամուտից պահվում է 10% եկամտային հարկ. ավանդի հաշվիչը ցույց է տալիս եկամուտը հարկից հետո։',
            'Ֆիզիկական անձանց ավանդները երաշխավորում է Ավանդների հատուցումը երաշխավորող հիմնադրամը՝ սահմանված չափով։ Ստուգեք գործող սահմանաչափերը հիմնադրամի կայքում։'
          ]],
          ['Արժույթ', [
            'Դոլարով կամ եվրոյով ավանդը պաշտպանում է դրամի արժեզրկումից, բայց դրույքը ցածր է, իսկ դրամի ամրապնդման դեպքում եկամուտը դրամով նվազում է։ Շատերը խնայողությունները բաժանում են արժույթների միջև։'
          ]]
        ]
      }
    }
  },
  {
    key: 'early-repayment-guide', icon: 'rocket_launch', cta: '/early',
    slug: { AM: 'vaghajamket-marum-inchpes-xnayel', RU: 'dosrochnoe-pogashenie-kredita-kak-sekonomit', EN: 'early-loan-repayment-how-to-save' },
    content: {
      RU: {
        title: 'Досрочное погашение кредита: как сэкономить на процентах | ArmFinCredit',
        description: 'Как работает досрочное погашение, что выгоднее — сокращать срок или платёж, когда доплачивать и что проверить в договоре. С расчётом экономии.',
        h1: 'Досрочное погашение: как сэкономить на процентах',
        intro: 'Каждый драм, внесённый сверх графика, сразу уменьшает основной долг — а значит, и проценты на все следующие месяцы. Поэтому даже небольшие доплаты дают заметную экономию.',
        sections: [
          ['Почему это работает', [
            'Проценты начисляются на остаток долга. Досрочный платёж уменьшает остаток, и в следующем месяце процентов уже меньше. Чем раньше вы доплачиваете, тем больше эффект: в начале кредита остаток максимальный.'
          ]],
          ['Сокращать срок или платёж?', [
            'После досрочного платежа банк обычно предлагает уменьшить срок (платёж прежний) или уменьшить платёж (срок прежний). Сокращение срока экономит больше процентов, уменьшение платежа — снижает нагрузку на бюджет.',
            'Если цель — заплатить меньше, выбирайте сокращение срока.'
          ]],
          ['Регулярно или разово', [
            'Регулярная доплата даже 10% к платежу на длинном кредите может сократить срок на годы. Разовый крупный платёж в начале срока экономит больше, чем тот же платёж ближе к концу. Сравните сценарии в калькуляторе досрочного погашения.'
          ]],
          ['Что проверить в договоре', [
            'Узнайте, есть ли комиссия за досрочное погашение и минимальная сумма, нужно ли заранее уведомлять банк и как пересчитывается график. Многие банки в Армении погашают досрочно без штрафов, но условия у разных продуктов отличаются.'
          ]],
          ['Когда не спешить', [
            'Если у вас нет финансовой подушки на 3–6 месяцев расходов, сначала сформируйте её. А если ставка по кредиту ниже, чем доход по надёжному вкладу после налога, досрочное погашение может быть менее выгодным.'
          ]]
        ]
      },
      EN: {
        title: 'Early Loan Repayment: How to Save on Interest | ArmFinCredit',
        description: 'How early repayment works, whether to shorten the term or the payment, when to pay extra and what to check in the contract — with a savings calculation.',
        h1: 'Early repayment: how to save on interest',
        intro: 'Every dram paid above the schedule immediately reduces the principal — and therefore the interest for all the following months. That is why even small extra payments add up.',
        sections: [
          ['Why it works', [
            'Interest is charged on the remaining balance. An early payment lowers the balance, so next month there is less interest. The earlier you pay extra, the bigger the effect, because the balance is highest at the start.'
          ]],
          ['Shorten the term or the payment?', [
            'After an early payment the bank usually offers to shorten the term (same payment) or lower the payment (same term). Shortening the term saves more interest; lowering the payment eases the budget.',
            'If the goal is to pay less overall, shorten the term.'
          ]],
          ['Regular or one-off', [
            'Paying even 10% extra every month on a long loan can cut years off it. A large one-off payment early in the term saves more than the same payment near the end. Compare scenarios in the early repayment calculator.'
          ]],
          ['What to check in the contract', [
            'Find out whether there is an early repayment fee or a minimum amount, whether you must notify the bank in advance and how the schedule is recalculated. Many Armenian banks allow early repayment without penalties, but terms differ between products.'
          ]],
          ['When not to rush', [
            'Without an emergency fund of 3–6 months of expenses, build that first. And if the loan rate is lower than what a safe deposit earns after tax, early repayment may pay off less.'
          ]]
        ]
      },
      AM: {
        title: 'Վարկի վաղաժամկետ մարում. ինչպես խնայել տոկոսների վրա | ArmFinCredit',
        description: 'Ինչպես է աշխատում վաղաժամկետ մարումը, ինչն է ավելի ձեռնտու՝ կրճատել ժամկետը թե վճարը, երբ վճարել ավելին և ինչ ստուգել պայմանագրում։',
        h1: 'Վաղաժամկետ մարում. ինչպես խնայել տոկոսների վրա',
        intro: 'Գրաֆիկից ավել վճարված յուրաքանչյուր դրամ անմիջապես նվազեցնում է մայր գումարը, հետևաբար նաև հաջորդ բոլոր ամիսների տոկոսները։ Ուստի նույնիսկ փոքր լրացուցիչ վճարները նկատելի խնայողություն են տալիս։',
        sections: [
          ['Ինչու է դա աշխատում', [
            'Տոկոսները հաշվարկվում են պարտքի մնացորդի վրա։ Վաղաժամկետ վճարը նվազեցնում է մնացորդը, և հաջորդ ամիս տոկոսներն արդեն ավելի քիչ են։ Որքան շուտ եք վճարում, այնքան մեծ է էֆեկտը։'
          ]],
          ['Կրճատել ժամկետը թե վճարը', [
            'Վաղաժամկետ վճարից հետո բանկը սովորաբար առաջարկում է կրճատել ժամկետը (վճարը նույնն է) կամ նվազեցնել վճարը (ժամկետը նույնն է)։ Ժամկետի կրճատումն ավելի շատ տոկոս է խնայում, վճարի նվազեցումը՝ թեթևացնում բյուջեն։',
            'Եթե նպատակը քիչ վճարելն է, ընտրեք ժամկետի կրճատումը։'
          ]],
          ['Պարբերաբար թե միանվագ', [
            'Երկար վարկի դեպքում վճարին ամեն ամիս նույնիսկ 10% ավելացնելը կարող է ժամկետը կրճատել տարիներով։ Ժամկետի սկզբում մեծ միանվագ վճարն ավելի շատ է խնայում, քան նույն վճարը վերջում։ Համեմատեք սցենարները վաղաժամկետ մարման հաշվիչում։'
          ]],
          ['Ինչ ստուգել պայմանագրում', [
            'Պարզեք՝ կա՞ արդյոք վաղաժամկետ մարման միջնորդավճար կամ նվազագույն գումար, պետք է նախապես տեղեկացնել բանկին, և ինչպես է վերահաշվարկվում գրաֆիկը։ Հայաստանի շատ բանկեր թույլ են տալիս վաղաժամկետ մարում առանց տույժերի, բայց պայմանները տարբեր են։'
          ]],
          ['Երբ չշտապել', [
            'Եթե չունեք 3–6 ամսվա ծախսերի ֆինանսական պահուստ, նախ ստեղծեք այն։ Իսկ եթե վարկի դրույքն ավելի ցածր է հուսալի ավանդի հարկից հետո եկամտաբերությունից, վաղաժամկետ մարումը կարող է պակաս շահավետ լինել։'
          ]]
        ]
      }
    }
  },
  {
    key: 'effective-rate-guide', icon: 'percent', cta: '/compare',
    slug: { AM: 'pastaci-tokosadruyq-inch-e', RU: 'effektivnaya-stavka-po-kreditu', EN: 'effective-interest-rate-explained' },
    content: {
      RU: {
        title: 'Эффективная ставка по кредиту: что это и как сравнивать | ArmFinCredit',
        description: 'Чем эффективная (фактическая) ставка отличается от номинальной, что в неё входит и почему кредиты нужно сравнивать по ней и по полной переплате.',
        h1: 'Эффективная ставка по кредиту',
        intro: 'Два кредита с одинаковой номинальной ставкой могут стоить по-разному: всё решают комиссии, страховки и график. Эффективная ставка сводит всё это к одной цифре.',
        sections: [
          ['Номинальная и эффективная', [
            'Номинальная ставка — это проценты на остаток долга. Эффективная (фактическая) годовая ставка учитывает все обязательные платежи: комиссию за выдачу, обслуживание счёта, обязательное страхование, оценку. Банки в Армении обязаны её указывать.'
          ]],
          ['Почему она выше', [
            'Если за выдачу 5 000 000 ֏ удерживают 100 000 ֏ комиссии, вы фактически получаете меньше, а платите как за полную сумму. Поэтому реальная цена кредита выше номинальной ставки — иногда на несколько процентных пунктов.',
            'В разделе «Доп.» калькулятора можно указать комиссию и ежемесячную страховку — он покажет эффективную ставку (APR).'
          ]],
          ['Как сравнивать кредиты', [
            'Сравнивайте по эффективной ставке и по полной переплате за весь срок при одинаковой сумме и сроке. Обратите внимание, фиксированная ли ставка: плавающая может вырасти.',
            'Удобно сравнить до четырёх предложений бок о бок на странице сравнения кредитов.'
          ]],
          ['На что ещё смотреть', [
            'Условия досрочного погашения, штрафы за просрочку, требования к залогу и поручителям, срок рассмотрения. Самая низкая ставка не всегда означает лучший кредит.'
          ]]
        ]
      },
      EN: {
        title: 'Effective Interest Rate on a Loan: What It Is and How to Compare | ArmFinCredit',
        description: 'How the effective (actual) annual rate differs from the nominal rate, what it includes and why loans should be compared by it and by the total overpayment.',
        h1: 'The effective interest rate on a loan',
        intro: 'Two loans with the same nominal rate can cost differently: fees, insurance and the schedule decide. The effective rate turns all of that into one number.',
        sections: [
          ['Nominal vs effective', [
            'The nominal rate is interest on the remaining balance. The effective (actual) annual rate includes every mandatory payment: origination fee, account service, mandatory insurance, valuation. Banks in Armenia must disclose it.'
          ]],
          ['Why it is higher', [
            'If AMD 100,000 is withheld as a fee on an AMD 5,000,000 loan, you actually receive less but pay as if for the full amount. So the real price of the loan is above the nominal rate — sometimes by several points.',
            'In the calculator’s Advanced tab you can enter the fee and monthly insurance to see the effective rate (APR).'
          ]],
          ['How to compare loans', [
            'Compare by the effective rate and the total overpayment for the same amount and term. Check whether the rate is fixed: a floating rate can rise.',
            'You can compare up to four offers side by side on the loan comparison page.'
          ]],
          ['What else to check', [
            'Early repayment terms, late payment penalties, collateral and guarantor requirements, and approval time. The lowest rate is not always the best loan.'
          ]]
        ]
      },
      AM: {
        title: 'Վարկի փաստացի տոկոսադրույք. ինչ է և ինչպես համեմատել | ArmFinCredit',
        description: 'Ինչով է փաստացի տարեկան տոկոսադրույքը տարբերվում անվանականից, ինչ է ներառում և ինչու պետք է վարկերը համեմատել հենց դրանով և ամբողջ գերավճարով։',
        h1: 'Վարկի փաստացի տոկոսադրույք',
        intro: 'Նույն անվանական դրույքով երկու վարկ կարող են տարբեր արժենալ. որոշում են միջնորդավճարները, ապահովագրությունը և գրաֆիկը։ Փաստացի դրույքը այս ամենը բերում է մեկ թվի։',
        sections: [
          ['Անվանական և փաստացի', [
            'Անվանական դրույքը պարտքի մնացորդի տոկոսն է։ Փաստացի տարեկան տոկոսադրույքը ներառում է բոլոր պարտադիր վճարները՝ տրամադրման միջնորդավճար, հաշվի սպասարկում, պարտադիր ապահովագրություն, գնահատում։ Հայաստանում բանկերը պարտավոր են այն նշել։'
          ]],
          ['Ինչու է այն ավելի բարձր', [
            'Եթե 5 000 000 ֏ վարկից պահվում է 100 000 ֏ միջնորդավճար, դուք փաստացի ստանում եք ավելի քիչ, բայց վճարում եք ամբողջ գումարի համար։ Ուստի վարկի իրական գինը բարձր է անվանական դրույքից՝ երբեմն մի քանի կետով։',
            'Հաշվիչի «Լրացուցիչ» բաժնում կարող եք նշել միջնորդավճարը և ամսական ապահովագրությունը՝ տեսնելու փաստացի դրույքը (APR)։'
          ]],
          ['Ինչպես համեմատել վարկերը', [
            'Համեմատեք փաստացի դրույքով և ամբողջ ժամկետի գերավճարով՝ նույն գումարի և ժամկետի դեպքում։ Ուշադրություն դարձրեք՝ դրույքը ֆիքսված է, թե լողացող։',
            'Մինչև չորս առաջարկ կարող եք համեմատել կողք կողքի վարկերի համեմատության էջում։'
          ]],
          ['Ինչին էլ նայել', [
            'Վաղաժամկետ մարման պայմաններին, ուշացման տույժերին, գրավի և երաշխավորների պահանջներին, դիտարկման ժամկետին։ Ամենացածր դրույքը միշտ չէ, որ լավագույն վարկն է։'
          ]]
        ]
      }
    }
  }
]

export var ARTICLES_UI = {
  updated: { AM: 'Թարմացված է՝', RU: 'Обновлено:', EN: 'Updated:' },
  calc: { AM: 'Հաշվել ձեր թվերով', RU: 'Посчитать на своих цифрах', EN: 'Calculate with your numbers' },
  more: { AM: 'Այլ ուղեցույցներ', RU: 'Другие гайды', EN: 'More guides' },
  read: { AM: 'Կարդալ', RU: 'Читать', EN: 'Read' },
  disclaimer: {
    AM: 'Հոդվածը տեղեկատվական է և ֆինանսական խորհուրդ չէ։ Կոնկրետ պայմանները ճշտեք բանկում։',
    RU: 'Статья носит информационный характер и не является финансовой консультацией. Конкретные условия уточняйте в банке.',
    EN: 'This article is for information only and is not financial advice. Check specific terms with the bank.'
  }
}

export function articlePath(a, lang) { return '/' + LANG_TO_URL[lang] + '/' + a.slug[lang] }
export function guidesIndexPath(lang) { return '/' + LANG_TO_URL[lang] + '/' + GUIDES_INDEX.slug[lang] }

// Resolves /<lang>/<slug> to { article, lang } | { index: true, lang } | null.
export function findArticle(pathname) {
  var parts = String(pathname || '').split('/').filter(Boolean)
  if (parts.length !== 2) return null
  var lang = URL_TO_LANG[parts[0]]
  if (!lang) return null
  if (GUIDES_INDEX.slug[lang] === parts[1]) return { index: true, lang: lang }
  for (var i = 0; i < ARTICLES.length; i++) {
    if (ARTICLES[i].slug[lang] === parts[1]) return { article: ARTICLES[i], lang: lang }
  }
  return null
}

export function articleAlternates(a) {
  return LANGS.map(function(l) { return { hreflang: LANG_TO_URL[l], path: articlePath(a, l) } })
    .concat([{ hreflang: 'x-default', path: articlePath(a, 'EN') }])
}

export function guidesAlternates() {
  return LANGS.map(function(l) { return { hreflang: LANG_TO_URL[l], path: guidesIndexPath(l) } })
    .concat([{ hreflang: 'x-default', path: guidesIndexPath('EN') }])
}
