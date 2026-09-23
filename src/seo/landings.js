import { LANG_TO_URL, URL_TO_LANG } from '../config/site.js'
import { findRatePage, ratePagePath } from './rates.js'

// SEO landing pages: one topic × three languages, each with its own URL
// (/hy/…, /ru/…, /en/…) so every language version can rank on its own.
// Presets are example values only; they are not market rates.

export var LANDINGS = [
  {
    key: 'mortgage', icon: 'home',
    preset: { amount: 30000000, rate: 11, term: 240, type: 'annuity' },
    slug: { AM: 'hipotekayin-hashvich', RU: 'ipotechnyj-kalkulyator', EN: 'mortgage-calculator' },
    short: { AM: 'Հիփոթեք', RU: 'Ипотека', EN: 'Mortgage' },
    content: {
      EN: {
        title: 'Mortgage Calculator Armenia (AMD) — Monthly Payment & Schedule | ArmFinCredit',
        description: 'Calculate your mortgage payment in Armenian drams: monthly payment, total interest, full amortization schedule and early repayment savings. Free, in English, Russian and Armenian.',
        h1: 'Mortgage calculator for Armenia',
        intro: 'Estimate the monthly payment on a home loan in drams, see how much interest you will pay over 10–30 years and how early repayments shorten the loan. Adjust the amount, rate and term — results update instantly.',
        tips: [
          'Compare offers by APR, not only by the nominal rate: fees and insurance can add a full point or more.',
          'Even a small extra payment each month in the first years cuts the total interest noticeably.',
          'Ask the bank whether you are eligible for the mortgage interest income-tax refund and include it in your budget.'
        ],
        faq: [
          ['How is the monthly mortgage payment calculated?', 'Most mortgages use the annuity formula: payment = P × r / (1 − (1 + r)^−n), where P is the loan amount, r is the monthly rate (annual rate ÷ 12) and n is the number of months. The payment stays the same, while the share of interest in it falls over time.'],
          ['Annuity or differentiated — which is cheaper?', 'A differentiated schedule repays the same principal every month, so the first payments are higher but the total interest is lower. An annuity has equal payments that are easier to plan. The calculator shows both.'],
          ['Does early repayment make sense?', 'Usually yes: every extra dram goes straight to the principal, so less interest is charged afterwards. Check your contract for early repayment fees first.']
        ]
      },
      RU: {
        title: 'Ипотечный калькулятор Армения (драм) — платёж и график | ArmFinCredit',
        description: 'Рассчитайте ипотеку в драмах: ежемесячный платёж, переплата, полный график платежей и экономия при досрочном погашении. Бесплатно, на русском, армянском и английском.',
        h1: 'Ипотечный калькулятор для Армении',
        intro: 'Узнайте ежемесячный платёж по ипотеке в драмах, сколько процентов вы заплатите за 10–30 лет и как досрочные платежи сокращают срок. Меняйте сумму, ставку и срок — результат пересчитывается сразу.',
        tips: [
          'Сравнивайте предложения по APR, а не только по номинальной ставке: комиссии и страховка добавляют процентный пункт и больше.',
          'Даже небольшая ежемесячная доплата в первые годы заметно снижает переплату.',
          'Уточните в банке, положен ли вам возврат подоходного налога по процентам ипотеки, и учтите его в бюджете.'
        ],
        faq: [
          ['Как рассчитывается ежемесячный платёж по ипотеке?', 'Большинство ипотек считается по аннуитетной формуле: платёж = P × r / (1 − (1 + r)^−n), где P — сумма кредита, r — месячная ставка (годовая ÷ 12), n — число месяцев. Платёж не меняется, а доля процентов в нём со временем уменьшается.'],
          ['Аннуитет или дифференцированный — что выгоднее?', 'В дифференцированной схеме основной долг гасится равными частями, поэтому первые платежи больше, но общая переплата меньше. Аннуитет — это равные платежи, которые проще планировать. Калькулятор показывает оба варианта.'],
          ['Есть ли смысл гасить досрочно?', 'Обычно да: каждый дополнительный драм идёт в погашение основного долга, и дальше начисляется меньше процентов. Сначала проверьте в договоре комиссию за досрочное погашение.']
        ]
      },
      AM: {
        title: 'Հիփոթեքային հաշվիչ (դրամ) — ամսական վճար և գրաֆիկ | ArmFinCredit',
        description: 'Հաշվարկեք հիփոթեքը դրամով՝ ամսական վճարը, գերավճարը, վճարումների ամբողջական գրաֆիկը և վաղաժամկետ մարման խնայողությունը։ Անվճար՝ հայերեն, ռուսերեն և անգլերեն։',
        h1: 'Հիփոթեքային վարկի հաշվիչ',
        intro: 'Իմացեք հիփոթեքի ամսական վճարը դրամով, թե որքան տոկոս կվճարեք 10–30 տարվա ընթացքում և ինչպես են վաղաժամկետ վճարումները կրճատում ժամկետը։ Փոխեք գումարը, տոկոսադրույքը և ժամկետը՝ արդյունքը թարմացվում է անմիջապես։',
        tips: [
          'Համեմատեք առաջարկները ըստ APR-ի, ոչ միայն անվանական տոկոսադրույքի․ միջնորդավճարներն ու ապահովագրությունը կարող են ավելացնել մեկ կետ և ավելի։',
          'Նույնիսկ փոքր ամսական լրացուցիչ վճարումը առաջին տարիներին նկատելիորեն նվազեցնում է գերավճարը։',
          'Ճշտեք բանկում՝ արդյոք իրավունք ունեք հիփոթեքի տոկոսների դիմաց եկամտային հարկի վերադարձի, և հաշվի առեք այն բյուջեում։'
        ],
        faq: [
          ['Ինչպե՞ս է հաշվարկվում հիփոթեքի ամսական վճարը', 'Հիփոթեքների մեծ մասը հաշվարկվում է անուիտետային բանաձևով՝ վճար = P × r / (1 − (1 + r)^−n), որտեղ P-ն վարկի գումարն է, r-ը՝ ամսական տոկոսադրույքը (տարեկան ÷ 12), n-ը՝ ամիսների քանակը։ Վճարը մնում է նույնը, իսկ դրանում տոկոսների բաժինը ժամանակի ընթացքում նվազում է։'],
          ['Անուիտե՞տ, թե՞ դիֆերենցված․ որն է ավելի ձեռնտու', 'Դիֆերենցված գրաֆիկում մայր գումարը մարվում է հավասար մասերով, ուստի առաջին վճարներն ավելի մեծ են, բայց ընդհանուր տոկոսը՝ ավելի քիչ։ Անուիտետը հավասար վճարներ ունի, որոնք հեշտ է պլանավորել։ Հաշվիչը ցույց է տալիս երկու տարբերակը։'],
          ['Արժե՞ արդյոք վաղաժամկետ մարել', 'Սովորաբար՝ այո․ յուրաքանչյուր լրացուցիչ դրամ գնում է մայր գումարի մարմանը, և հետագայում ավելի քիչ տոկոս է հաշվարկվում։ Նախ ստուգեք պայմանագրում վաղաժամկետ մարման տույժերը։']
        ]
      }
    }
  },
  {
    key: 'car', icon: 'directions_car',
    preset: { amount: 8000000, rate: 13, term: 60, type: 'annuity' },
    slug: { AM: 'avtovarki-hashvich', RU: 'avtokredit-kalkulyator', EN: 'car-loan-calculator' },
    short: { AM: 'Ավտովարկ', RU: 'Автокредит', EN: 'Car loan' },
    content: {
      EN: {
        title: 'Car Loan Calculator Armenia (AMD) — Monthly Payment | ArmFinCredit',
        description: 'Calculate a car loan in drams: monthly payment, overpayment and schedule. Compare terms from 1 to 7 years and see the real APR with fees and insurance.',
        h1: 'Car loan calculator',
        intro: 'Plan the purchase of a new or used car: enter the price minus your down payment, the bank’s rate and the term to see the monthly payment and how much the loan really costs.',
        tips: [
          'A larger down payment lowers both the monthly payment and the total interest.',
          'Car loans often require comprehensive (CASCO) insurance — add it in the Advanced tab to see the real APR.',
          'A shorter term means a higher payment but a noticeably smaller overpayment.'
        ],
        faq: [
          ['How much can I borrow for a car?', 'It depends on your income: banks usually want the monthly payment to stay within a certain share of your net income. Use the calculator to find a payment that fits your budget, then ask the bank about its limits.'],
          ['Why is the APR higher than the rate?', 'APR includes one-time fees and monthly insurance, so it shows the real annual cost of the loan. Enter them in the Advanced tab to get it.'],
          ['Can I repay a car loan early?', 'Most banks allow it. Use the Early tab to see how many months and how much interest an extra payment saves.']
        ]
      },
      RU: {
        title: 'Калькулятор автокредита Армения (драм) — ежемесячный платёж | ArmFinCredit',
        description: 'Рассчитайте автокредит в драмах: ежемесячный платёж, переплата и график. Сравните сроки от 1 до 7 лет и узнайте реальную ставку APR с комиссиями и страховкой.',
        h1: 'Калькулятор автокредита',
        intro: 'Спланируйте покупку нового или подержанного автомобиля: укажите цену за вычетом первоначального взноса, ставку банка и срок — и узнайте ежемесячный платёж и реальную стоимость кредита.',
        tips: [
          'Больший первоначальный взнос снижает и платёж, и переплату.',
          'Для автокредита часто требуют КАСКО — добавьте страховку во вкладке «Доп.», чтобы увидеть реальный APR.',
          'Короткий срок — выше платёж, но заметно меньше переплата.'
        ],
        faq: [
          ['Сколько можно взять на автомобиль?', 'Это зависит от дохода: банки обычно хотят, чтобы платёж не превышал определённой доли чистого дохода. Подберите в калькуляторе комфортный платёж, а затем уточните лимиты в банке.'],
          ['Почему APR выше ставки?', 'APR учитывает разовые комиссии и ежемесячную страховку, поэтому показывает реальную годовую стоимость кредита. Введите их во вкладке «Доп.».'],
          ['Можно ли погасить автокредит досрочно?', 'В большинстве банков — да. Во вкладке «Досроч.» видно, сколько месяцев и процентов сэкономит доплата.']
        ]
      },
      AM: {
        title: 'Ավտովարկի հաշվիչ (դրամ) — ամսական վճար | ArmFinCredit',
        description: 'Հաշվարկեք ավտովարկը դրամով՝ ամսական վճար, գերավճար և գրաֆիկ։ Համեմատեք 1-ից 7 տարի ժամկետները և տեսեք իրական APR-ը՝ միջնորդավճարներով և ապահովագրությամբ։',
        h1: 'Ավտովարկի հաշվիչ',
        intro: 'Պլանավորեք նոր կամ օգտագործված մեքենայի գնումը․ մուտքագրեք գինը՝ առանց կանխավճարի, բանկի տոկոսադրույքը և ժամկետը՝ ամսական վճարը և վարկի իրական արժեքը տեսնելու համար։',
        tips: [
          'Ավելի մեծ կանխավճարը նվազեցնում է և՛ ամսական վճարը, և՛ գերավճարը։',
          'Ավտովարկի դեպքում հաճախ պահանջվում է ԿԱՍԿՈ ապահովագրություն․ ավելացրեք այն «Լրաց.» բաժնում՝ իրական APR-ը տեսնելու համար։',
          'Կարճ ժամկետը նշանակում է ավելի մեծ վճար, բայց զգալիորեն փոքր գերավճար։'
        ],
        faq: [
          ['Որքա՞ն կարող եմ վերցնել մեքենայի համար', 'Դա կախված է եկամտից․ բանկերը սովորաբար ցանկանում են, որ ամսական վճարը չգերազանցի զուտ եկամտի որոշակի մասը։ Հաշվիչում ընտրեք հարմար վճար, ապա ճշտեք սահմանաչափերը բանկում։'],
          ['Ինչու՞ է APR-ը տոկոսադրույքից բարձր', 'APR-ը ներառում է միանվագ միջնորդավճարները և ամսական ապահովագրությունը, ուստի ցույց է տալիս վարկի իրական տարեկան արժեքը։ Մուտքագրեք դրանք «Լրաց.» բաժնում։'],
          ['Կարո՞ղ եմ ավտովարկը մարել վաղաժամկետ', 'Բանկերի մեծ մասում՝ այո։ «Վաղ.» բաժնում կտեսնեք, թե քանի ամիս և որքան տոկոս կխնայի լրացուցիչ վճարումը։']
        ]
      }
    }
  },
  {
    key: 'consumer', icon: 'shopping_bag',
    preset: { amount: 2000000, rate: 16, term: 36, type: 'annuity' },
    slug: { AM: 'sparoghakan-varki-hashvich', RU: 'potrebitelskij-kredit-kalkulyator', EN: 'personal-loan-calculator' },
    short: { AM: 'Սպառողական վարկ', RU: 'Потребкредит', EN: 'Personal loan' },
    content: {
      EN: {
        title: 'Personal Loan Calculator Armenia (AMD) — Payment & Overpayment | ArmFinCredit',
        description: 'Free consumer loan calculator in drams: monthly payment, total interest, schedule and real APR. Find out how much a personal loan really costs before you sign.',
        h1: 'Personal loan calculator',
        intro: 'Before taking a consumer loan, check what it will really cost. Enter the amount, rate and term to see the monthly payment, the overpayment and the real annual rate including fees.',
        tips: [
          'Consumer loans usually have higher rates than mortgages — compare at least three offers by APR.',
          'Borrow only the amount you need: every extra ֏100,000 adds interest for the whole term.',
          'Check whether the bank charges a fee for issuing or servicing the loan and enter it in the Advanced tab.'
        ],
        faq: [
          ['What is a good rate for a personal loan?', 'There is no single answer: it depends on the bank, your credit history and whether the loan is secured. Compare several offers by APR — the calculator shows how much each point of rate costs you.'],
          ['What is overpayment?', 'It is the total interest (plus fees) you pay on top of the amount borrowed. The calculator shows it as Total interest.'],
          ['How do I lower my monthly payment?', 'Choose a longer term, a lower rate or a smaller amount. A longer term lowers the payment but increases the overpayment — the calculator shows both.']
        ]
      },
      RU: {
        title: 'Калькулятор потребительского кредита Армения (драм) — платёж и переплата | ArmFinCredit',
        description: 'Бесплатный кредитный калькулятор в драмах: ежемесячный платёж, переплата, график и реальная ставка APR. Узнайте полную стоимость потребительского кредита до подписания договора.',
        h1: 'Калькулятор потребительского кредита',
        intro: 'Прежде чем брать потребительский кредит, проверьте, во сколько он обойдётся. Укажите сумму, ставку и срок — и увидите ежемесячный платёж, переплату и реальную годовую ставку с учётом комиссий.',
        tips: [
          'Ставки по потребкредитам обычно выше, чем по ипотеке, — сравните минимум три предложения по APR.',
          'Берите ровно столько, сколько нужно: каждые лишние 100 000 ֏ добавляют проценты на весь срок.',
          'Узнайте, есть ли комиссия за выдачу или обслуживание, и внесите её во вкладке «Доп.».'
        ],
        faq: [
          ['Какая ставка по потребкредиту считается хорошей?', 'Единого ответа нет: всё зависит от банка, кредитной истории и наличия залога. Сравните несколько предложений по APR — калькулятор показывает, сколько стоит вам каждый процентный пункт.'],
          ['Что такое переплата?', 'Это сумма процентов (и комиссий), которую вы платите сверх взятой суммы. В калькуляторе она показана как «Сумма процентов».'],
          ['Как уменьшить ежемесячный платёж?', 'Выберите более длинный срок, меньшую ставку или сумму. Длинный срок снижает платёж, но увеличивает переплату — калькулятор показывает и то, и другое.']
        ]
      },
      AM: {
        title: 'Սպառողական վարկի հաշվիչ (դրամ) — վճար և գերավճար | ArmFinCredit',
        description: 'Անվճար վարկային հաշվիչ դրամով՝ ամսական վճար, գերավճար, գրաֆիկ և իրական APR։ Իմացեք սպառողական վարկի ամբողջական արժեքը մինչև պայմանագիր կնքելը։',
        h1: 'Սպառողական վարկի հաշվիչ',
        intro: 'Նախքան սպառողական վարկ վերցնելը՝ ստուգեք, թե որքան կարժենա այն։ Մուտքագրեք գումարը, տոկոսադրույքը և ժամկետը՝ տեսնելու ամսական վճարը, գերավճարը և իրական տարեկան տոկոսադրույքը՝ միջնորդավճարներով։',
        tips: [
          'Սպառողական վարկերի տոկոսադրույքները սովորաբար ավելի բարձր են, քան հիփոթեքինը․ համեմատեք առնվազն երեք առաջարկ ըստ APR-ի։',
          'Վերցրեք միայն անհրաժեշտ գումարը․ յուրաքանչյուր ավելորդ 100 000 ֏ տոկոս է ավելացնում ամբողջ ժամկետի համար։',
          'Պարզեք՝ կա՞ արդյոք վարկի տրամադրման կամ սպասարկման միջնորդավճար, և մուտքագրեք այն «Լրաց.» բաժնում։'
        ],
        faq: [
          ['Ո՞ր տոկոսադրույքն է լավը սպառողական վարկի համար', 'Միանշանակ պատասխան չկա․ այն կախված է բանկից, վարկային պատմությունից և գրավի առկայությունից։ Համեմատեք մի քանի առաջարկ ըստ APR-ի․ հաշվիչը ցույց է տալիս, թե որքան արժե տոկոսադրույքի յուրաքանչյուր կետը։'],
          ['Ի՞նչ է գերավճարը', 'Դա տոկոսների (և միջնորդավճարների) գումարն է, որը վճարում եք վերցրած գումարից ավել։ Հաշվիչում այն ցույց է տրված որպես «Ընդհանուր Տոկոս»։'],
          ['Ինչպե՞ս նվազեցնել ամսական վճարը', 'Ընտրեք ավելի երկար ժամկետ, ավելի ցածր տոկոսադրույք կամ փոքր գումար։ Երկար ժամկետը նվազեցնում է վճարը, բայց մեծացնում գերավճարը․ հաշվիչը ցույց է տալիս երկուսն էլ։']
        ]
      }
    }
  },
  {
    key: 'early', icon: 'rocket_launch',
    preset: { amount: 10000000, rate: 12, term: 120, type: 'annuity' },
    slug: { AM: 'vaghajamket-marman-hashvich', RU: 'dosrochnoe-pogashenie-kalkulyator', EN: 'early-repayment-calculator' },
    short: { AM: 'Վաղաժամկետ մարում', RU: 'Досрочное погашение', EN: 'Early repayment' },
    content: {
      EN: {
        title: 'Early Repayment Calculator — How Much Interest You Save | ArmFinCredit',
        description: 'See how early or extra loan payments shorten your term and cut interest. One-off or monthly extra payments — free calculator in drams.',
        h1: 'Early loan repayment calculator',
        intro: 'Find out how much you save by paying more than required. Add a one-off or a regular extra payment and instantly see how many months disappear from the schedule and how much interest you keep.',
        tips: [
          'The earlier you make an extra payment, the more interest it saves.',
          'A regular small extra payment often beats a single large one made years later.',
          'Check your contract for early repayment fees and whether the bank shortens the term or lowers the payment.'
        ],
        faq: [
          ['What is better: a shorter term or a lower payment?', 'Shortening the term saves more interest; lowering the payment eases your monthly budget. The calculator shortens the term, so you see the maximum saving.'],
          ['When is early repayment not worth it?', 'If the contract has a high early repayment fee, or if you would pay for it with a more expensive loan. Also keep an emergency fund before prepaying.'],
          ['How do I add an extra payment?', 'Open the Early tab in the calculator (or the Schedule page), choose the month and the amount and press Add — the schedule updates immediately.']
        ]
      },
      RU: {
        title: 'Калькулятор досрочного погашения кредита — сколько вы сэкономите | ArmFinCredit',
        description: 'Узнайте, как досрочные и дополнительные платежи сокращают срок кредита и переплату. Разовая или ежемесячная доплата — бесплатный калькулятор в драмах.',
        h1: 'Калькулятор досрочного погашения',
        intro: 'Посчитайте, сколько вы сэкономите, если будете платить больше обязательного. Добавьте разовую или регулярную доплату и сразу увидите, сколько месяцев исчезнет из графика и сколько процентов останется у вас.',
        tips: [
          'Чем раньше сделана доплата, тем больше процентов она экономит.',
          'Регулярная небольшая доплата часто выгоднее одного крупного платежа через несколько лет.',
          'Проверьте в договоре комиссию за досрочное погашение и что делает банк: сокращает срок или уменьшает платёж.'
        ],
        faq: [
          ['Что выгоднее: сократить срок или уменьшить платёж?', 'Сокращение срока экономит больше процентов, уменьшение платежа облегчает ежемесячный бюджет. Калькулятор сокращает срок, поэтому показывает максимальную экономию.'],
          ['Когда досрочное погашение невыгодно?', 'Если в договоре высокая комиссия за досрочное погашение или если для этого придётся взять более дорогой кредит. И сохраните резерв на непредвиденные расходы.'],
          ['Как добавить доплату?', 'Откройте вкладку «Досроч.» в калькуляторе (или страницу «График»), выберите месяц и сумму и нажмите «Добавить» — график обновится сразу.']
        ]
      },
      AM: {
        title: 'Վաղաժամկետ մարման հաշվիչ — որքան տոկոս կխնայեք | ArmFinCredit',
        description: 'Տեսեք, թե ինչպես են վաղաժամկետ և լրացուցիչ վճարումները կրճատում վարկի ժամկետը և գերավճարը։ Միանվագ կամ ամսական լրացուցիչ վճար՝ անվճար հաշվիչ դրամով։',
        h1: 'Վարկի վաղաժամկետ մարման հաշվիչ',
        intro: 'Հաշվեք, թե որքան կխնայեք, եթե վճարեք պարտադիրից ավելի։ Ավելացրեք միանվագ կամ պարբերական լրացուցիչ վճար և անմիջապես կտեսնեք, թե քանի ամսով կկրճատվի գրաֆիկը և որքան տոկոս կմնա ձեզ։',
        tips: [
          'Որքան շուտ կատարեք լրացուցիչ վճարումը, այնքան ավելի շատ տոկոս այն կխնայի։',
          'Պարբերական փոքր լրացուցիչ վճարումը հաճախ ավելի ձեռնտու է, քան մեկ մեծ վճարումը մի քանի տարի անց։',
          'Պայմանագրում ստուգեք վաղաժամկետ մարման տույժը և թե ինչ է անում բանկը՝ կրճատում է ժամկետը, թե նվազեցնում վճարը։'
        ],
        faq: [
          ['Ո՞րն է ավելի ձեռնտու՝ կրճատել ժամկետը, թե՞ նվազեցնել վճարը', 'Ժամկետի կրճատումն ավելի շատ տոկոս է խնայում, վճարի նվազեցումը թեթևացնում է ամսական բյուջեն։ Հաշվիչը կրճատում է ժամկետը, ուստի ցույց է տալիս առավելագույն խնայողությունը։'],
          ['Ե՞րբ վաղաժամկետ մարումը ձեռնտու չէ', 'Եթե պայմանագրում վաղաժամկետ մարման բարձր տույժ կա, կամ եթե դրա համար պետք է ավելի թանկ վարկ վերցնել։ Նաև պահեք ֆինանսական պահուստ անկանխատեսելի ծախսերի համար։'],
          ['Ինչպե՞ս ավելացնել լրացուցիչ վճար', 'Բացեք հաշվիչի «Վաղ.» բաժինը (կամ «Վճարի Գրաֆիկ» էջը), ընտրեք ամիսը և գումարը և սեղմեք «Ավելացնել»․ գրաֆիկը կթարմացվի անմիջապես։']
        ]
      }
    }
  }
]

// Shared copy for every landing page.
export var LANDING_UI = {
  howTitle: { AM: 'Ինչպես է աշխատում', RU: 'Как это работает', EN: 'How it works' },
  how: {
    AM: ['Նշեք վարկի գումարը, տարեկան տոկոսադրույքը և ժամկետը, կամ թողեք օրինակի արժեքները։', 'Ընտրեք անուիտետային (հավասար վճարներ) կամ դիֆերենցված (նվազող վճարներ) տեսակը։', 'Բացեք ամբողջական հաշվիչը՝ ամսական գրաֆիկը տեսնելու, վաղաժամկետ վճարումներ ավելացնելու և PDF ներբեռնելու համար։'],
    RU: ['Укажите сумму, годовую ставку и срок — или оставьте значения из примера.', 'Выберите аннуитетный (равные платежи) или дифференцированный (убывающие платежи) тип.', 'Откройте полный калькулятор, чтобы увидеть помесячный график, добавить досрочные платежи и скачать PDF.'],
    EN: ['Set the loan amount, annual rate and term — or keep the example values.', 'Choose annuity (equal payments) or differentiated (decreasing payments).', 'Open the full calculator to see the month-by-month schedule, add early payments and download a PDF.']
  },
  tipsTitle: { AM: 'Խորհուրդներ', RU: 'Советы', EN: 'Tips' },
  faqTitle:  { AM: 'Հաճախ տրվող հարցեր', RU: 'Частые вопросы', EN: 'FAQ' },
  others:    { AM: 'Այլ հաշվիչներ', RU: 'Другие калькуляторы', EN: 'Other calculators' },
  example:   { AM: 'Օրինակի արժեքներ են՝ փոխարինեք ձերով։', RU: 'Значения для примера — замените на свои.', EN: 'Example values — change them to your own.' },
  menuTitle: { AM: 'Հաշվիչներ', RU: 'Калькуляторы', EN: 'Calculators' }
}

export function landingPath(landing, lang) {
  return '/' + LANG_TO_URL[lang] + '/' + landing.slug[lang]
}

// Resolves /<lang>/<slug> to { landing, lang } or null.
export function findLanding(pathname) {
  var parts = String(pathname || '').split('/').filter(Boolean)
  if (parts.length !== 2) return null
  var lang = URL_TO_LANG[parts[0]]
  if (!lang) return null
  for (var i = 0; i < LANDINGS.length; i++) {
    if (LANDINGS[i].slug[lang] === parts[1]) return { landing: LANDINGS[i], lang: lang }
  }
  return null
}

// Same page in another language, for URLs that carry the language
// (/hy|ru|en and the landing pages). Returns null for other pages.
export function alternatePath(pathname, lang) {
  var found = findLanding(pathname)
  if (found) return landingPath(found.landing, lang)
  var rp = findRatePage(pathname)
  if (rp) return ratePagePath(rp.page, lang)
  var parts = String(pathname || '').split('/').filter(Boolean)
  if (parts.length === 1 && URL_TO_LANG[parts[0]]) return '/' + LANG_TO_URL[lang]
  return null
}
