var L = {
  brand: { AM: 'ArmFinCredit', RU: 'ArmFinCredit', EN: 'ArmFinCredit' },

  nav: {
    calc:    { AM: 'Հաշվիչ',             RU: 'Калькулятор',       EN: 'Calculator' },
    sched:   { AM: 'Վճարի Գրաֆիկ',      RU: 'График',            EN: 'Schedule' },
    early:   { AM: 'Վաղաժամկետ Մարում', RU: 'Досрочное',         EN: 'Early Repayment' },
    apply:   { AM: 'Դիմել',             RU: 'Подать заявку',     EN: 'Apply Now' }
  },

  sidebar: {
    planner:  { AM: 'Վարկի Պլանավորում', RU: 'Планировщик',       EN: 'Loan Planner' },
    inst:     { AM: 'Ինստիտուցիոնալ',   RU: 'Институциональный', EN: 'Institutional' },
    newCalc:  { AM: 'Նոր Հաշվարկ',      RU: 'Новый расчёт',      EN: 'New Calculation' },
    saved:    { AM: 'Պահված',            RU: 'Сохранённое',       EN: 'Saved' },
    settings: { AM: 'Կարգավորումներ',    RU: 'Настройки',         EN: 'Settings' },
    help:     { AM: 'Օգնություն',        RU: 'Помощь',            EN: 'Help' },
    newApp:   { AM: 'Նոր Հայտ',         RU: 'Новая заявка',      EN: 'New Application' }
  },

  calc: {
    title:     { AM: 'Վարկային Հաշվիչ',             RU: 'Кредитный калькулятор',     EN: 'Loan Calculator' },
    desc:      { AM: 'Սահմանեք վարկի պարամետրերը', RU: 'Задайте параметры кредита', EN: 'Configure your loan parameters.' },
    params:    { AM: 'Վարկի Պարամետրեր',            RU: 'Параметры кредита',         EN: 'Loan Parameters' },
    amount:    { AM: 'Վարկի Գումար',                RU: 'Сумма кредита',             EN: 'Loan Amount' },
    rate:      { AM: 'Տոկոսադրույք',                RU: 'Процентная ставка',         EN: 'Interest Rate' },
    term:      { AM: 'Ժամկետ',                     RU: 'Срок',                      EN: 'Loan Term' },
    months:    { AM: 'ամիս',                       RU: 'мес.',                      EN: 'mos.' },
    monthly:   { AM: 'Ամսական Վճար',                RU: 'Ежемес. платёж',            EN: 'Monthly Payment' },
    totalInt:  { AM: 'Ընդհանուր Տոկոս',             RU: 'Сумма процентов',           EN: 'Total Interest' },
    total:     { AM: 'Ընդհանուր',                   RU: 'Итого',                     EN: 'Total' },
    preview:   { AM: 'Կանխնայց',                   RU: 'Предпросмотр',              EN: 'Preview' },
    viewFull:  { AM: 'Տեսնել Ամբողջ Գրաֆիկը',      RU: 'Полный график',             EN: 'View Full Schedule' },
    print:     { AM: 'Տպել / PDF',                 RU: 'Печать / PDF',              EN: 'Print / PDF' },
    breakd:    { AM: 'Կառուցվածք',                 RU: 'Структура',                 EN: 'Breakdown' },
    principal: { AM: 'Մայր Գումար',                RU: 'Осн. долг',                 EN: 'Principal' },
    payType:   { AM: 'Վճարի Տեսակ',                RU: 'Тип платежа',               EN: 'Payment Type' },
    interest:  { AM: 'Տոկոս',                      RU: 'Проценты',                  EN: 'Interest' },
    payments:  { AM: 'Վճարումներ',                 RU: 'Платежей',                  EN: 'Payments' },
    type:      { AM: 'Տեսակ',                      RU: 'Тип',                       EN: 'Type' },
    schema:    { AM: 'Սխեման',                     RU: 'Схема',                     EN: 'Schema' },
    effRate:   { AM: 'Իրական Տոկ.',                RU: 'Реальная ставка',           EN: 'Effective rate' },
    annuity:   { AM: 'Անուիտետ',                   RU: 'Аннуитет',                  EN: 'Annuity' },
    diff:      { AM: 'Դիֆ.',                       RU: 'Дифф.',                     EN: 'Diff.' },
    firstDown: { AM: 'Առաջին, հետո',               RU: 'Первый, до',                EN: 'first, down to' }
  },

  sched: {
    title:     { AM: 'Վճարի Գրաֆիկ',              RU: 'График платежей',           EN: 'Payment Schedule' },
    desc:      { AM: 'Մարման ժամանակացույց', RU: 'Амортизация', EN: 'Amortization timeline.' },
    addEarly:  { AM: 'Ավելացնել Վաղ. Մարում',      RU: 'Добавить досроч.',          EN: 'Add Early Payment' },
    month:     { AM: 'Ամիս',                       RU: 'Месяц',                     EN: 'Month' },
    amount:    { AM: 'Գումար',                     RU: 'Сумма',                     EN: 'Amount' },
    apply:     { AM: 'Կիրառել',                    RU: 'Применить',                 EN: 'Apply' },
    saved:     { AM: 'Խնայված Ամիսներ',            RU: 'Сэкон. месяцев',            EN: 'Mo. Saved' },
    intSaved:  { AM: 'Խնայված Տոկոս',              RU: 'Эконом. на %',              EN: 'Int. Saved' },
    payment:   { AM: 'Վճար',                       RU: 'Платёж',                    EN: 'Payment' },
    principal: { AM: 'Մայր Գումար',                RU: 'Осн. долг',                 EN: 'Principal' },
    interest:  { AM: 'Տոկոս',                      RU: 'Проценты',                  EN: 'Interest' },
    balance:   { AM: 'Մնացորդ',                    RU: 'Остаток',                   EN: 'Balance' },
    prev:      { AM: 'Նախորդ',                     RU: 'Назад',                     EN: 'Prev' },
    next:      { AM: 'Հաջորդ',                     RU: 'Далее',                     EN: 'Next' },
    page:      { AM: 'Էջ',                         RU: 'Стр.',                      EN: 'Page' },
    table:     { AM: 'Աղյուսակ',                   RU: 'Таблица',                   EN: 'Table' },
    forecast:  { AM: 'Կանխատեսում',                RU: 'Прогноз',                   EN: 'Forecast' },
    mo:        { AM: 'Ամ.',                        RU: 'Мес.',                      EN: 'Mo.' }
  },

  early: {
    title:       { AM: 'Վաղաժամկետ Մարում',        RU: 'Досроч. погашение',         EN: 'Early Repayment' },
    desc:        { AM: 'Տեսեք, թե ուր եք շահում',  RU: 'Где выигрываете',           EN: 'See where early payments win.' },
    extra:       { AM: 'Լրացուցիչ / ամիս',         RU: 'Доп. / мес.',               EN: 'Extra / mo.' },
    newTerm:     { AM: 'Նոր Ժամկետ',              RU: 'Новый срок',                EN: 'New Term' },
    reduction:   { AM: 'Կրճատում',                 RU: 'Сокращение',                EN: 'Reduction' },
    intSaved:    { AM: 'Խնայված Տոկոս',            RU: 'Экон. на %',                EN: 'Int. Saved' },
    scenarios:   { AM: 'Սցենարներ',               RU: 'Сценарии',                  EN: 'Scenarios' },
    loanAmt:     { AM: 'Վարկի Գումար',             RU: 'Сумма кредита',             EN: 'Loan Amount' },
    monthly:     { AM: 'Ամսական',                  RU: 'Ежемес.',                   EN: 'Monthly' },
    interest:    { AM: 'Տոկոս',                    RU: 'Проценты',                  EN: 'Interest' },
    totalMo:     { AM: 'Ամիսներ',                  RU: 'Месяцев',                   EN: 'Months' },
    moSaved:     { AM: 'Խնայված Ամիս',             RU: 'Мес. сэкон.',               EN: 'Months Saved' },
    intSavedLbl: { AM: 'Խնայված Տոկ.',             RU: 'Экон. на проц.',            EN: 'Interest Saved' },
    addPayment:  { AM: 'Ավելացնել Վճար',           RU: 'Добавить платёж',           EN: 'Add Payment' },
    addEarly:    { AM: 'Ավելացնել Վաղ. Վճար',      RU: 'Добавить досроч. платёж',   EN: 'Add Early Payment' },
    extraHdr:    { AM: 'Ամսական Լրաց. — Սցեն.',    RU: 'Ежемес. доплата — Сцен.',   EN: 'Monthly extra — scenarios' },
    extraCol:    { AM: '+Լրաց.',                   RU: '+Доп.',                     EN: '+Extra' },
    months:      { AM: 'Ամիս',                     RU: 'Мес.',                      EN: 'Months' },
    saved:       { AM: 'Խնայած',                   RU: 'Сэконом.',                  EN: 'Saved' }
  },

  adv: {
    title:      { AM: 'Լրացուցիչ Պարամ.',          RU: 'Доп. параметры',            EN: 'Advanced' },
    fee:        { AM: 'Տրամադրման Վճար',           RU: 'Комиссия за выдачу',        EN: 'Origination Fee' },
    feeNote:    { AM: 'Մեկ անգամ տրամ. ժամ.',     RU: 'Единовременно при выдаче',  EN: 'One-time at disbursement' },
    insurance:  { AM: 'Ապահ. / ամիս',             RU: 'Страховка / мес.',          EN: 'Insurance / month' },
    insNote:    { AM: 'Ամեն ամիս ավելացվում է',    RU: 'Ежемесячно',                EN: 'Added each month' },
    startDate:  { AM: 'Վճարումների Սկիզբ',         RU: 'Дата начала выплат',        EN: 'Repayment Start' },
    aprNote:    { AM: 'Ապահ. և վճ. ներառվում են APR-ի հաշ.', RU: 'Страховка и комиссия учитываются при расчёте реальной СТП (APR).', EN: 'Insurance and fee are included when computing the real APR.' }
  },

  tabs: {
    params:   { AM: 'Պարամ.',  RU: 'Параметры', EN: 'Parameters' },
    early:    { AM: 'Վաղ.',    RU: 'Досроч.',   EN: 'Early' },
    advanced: { AM: 'Լրաց.',  RU: 'Доп.',      EN: 'Advanced' }
  },

  saveModal: {
    title:       { AM: 'Պահպել Հաշվարկը',          RU: 'Сохранить расчёт',          EN: 'Save Calculation' },
    nameLbl:     { AM: 'Անուն',                     RU: 'Название',                  EN: 'Name' },
    placeholder: { AM: 'Օր. Բն. Վարկ 2026',        RU: 'Напр., Ипотека 2026',       EN: 'e.g. Home Loan 2026' },
    save:        { AM: 'Պահպել',                    RU: 'Сохранить',                 EN: 'Save' },
    cancel:      { AM: 'Չեղարկել',                  RU: 'Отмена',                    EN: 'Cancel' },
    btnSave:     { AM: 'Պահպել',                    RU: 'Сохранить',                 EN: 'Save' },
    btnShare:    { AM: 'Կիսվել',                    RU: 'Поделиться',                EN: 'Share' },
    btnCopied:   { AM: 'Պատճենված!',                RU: 'Скопировано!',              EN: 'Copied!' }
  },

  footer: {
    rights:     { AM: '© 2026 ArmFinCredit. Բոլոր իրավունքները պաշտպանված են։', RU: '© 2026 ArmFinCredit. Все права защищены.', EN: '© 2026 ArmFinCredit. All rights reserved.' },
    nav:        { AM: 'Նավիգացիա',            RU: 'Навигация',               EN: 'Navigation' },
    legal:      { AM: 'Իրավական',             RU: 'Правовая информация',     EN: 'Legal' },
    privacy:    { AM: 'Գաղտնիության Քաղ.',    RU: 'Конфиденциальность',      EN: 'Privacy Policy' },
    terms:      { AM: 'Օգտ. Պայմաններ',       RU: 'Пользов. соглашение',     EN: 'Terms of Use' },
    support:    { AM: 'Աջակցություն',          RU: 'Поддержка',               EN: 'Support' },
    disclaimer: { AM: 'Միայն տեղեկատվական նպատակներով։ Ֆինանսական խորհրդատվություն չէ։', RU: 'Только для информации. Не фин. консультация.', EN: 'For informational purposes only. Not financial advice.' }
  },

  common: {
    back:     { AM: 'Հետ',              RU: 'Назад',                EN: 'Back' },
    home:     { AM: 'Գլխավոր',         RU: 'На главную',           EN: 'Back to home' },
    notFound: { AM: 'Էջը չի գտնվել',  RU: 'Страница не найдена',  EN: 'Page not found' }
  },

  // ── Monetization ────────────────────────────────────────────────────────────
  menu: {
    offers:  { AM: 'Առաջարկներ',  RU: 'Предложения', EN: 'Offers' },
    compare: { AM: 'Համեմատել',   RU: 'Сравнение',   EN: 'Compare' },
    saved:   { AM: 'Պահված',      RU: 'Сохранённые', EN: 'Saved' },
    deposit: { AM: 'Ավանդներ',    RU: 'Вклады',      EN: 'Deposits' },
    banks:   { AM: 'Բանկեր',      RU: 'Банки',       EN: 'Banks' },
    pro:     { AM: 'Pro',         RU: 'Pro',         EN: 'Pro' },
    trial:   { AM: 'Փորձ',        RU: 'Пробный',     EN: 'Trial' },
    daysLeft:{ AM: 'օր',          RU: 'дн.',         EN: 'd left' }
  },

  ads: {
    label:   { AM: 'Գովազդ',                RU: 'Реклама',            EN: 'Advertisement' },
    remove:  { AM: 'Հեռացնել գովազդը',      RU: 'Убрать рекламу',     EN: 'Remove ads' },
    removeSoon: { AM: 'Առանց գովազդի՝ Pro (շուտով)', RU: 'Без рекламы — Pro (скоро)', EN: 'Ad-free with Pro (soon)' },
    sponsored: { AM: 'Գովազդային',          RU: 'Спонсор',            EN: 'Sponsored' }
  },

  pro: {
    badge:      { AM: 'PRO',                                     RU: 'PRO',                                   EN: 'PRO' },
    soonBadge:  { AM: 'Շուտով',                                  RU: 'Скоро',                                 EN: 'Soon' },
    soonTitle:  { AM: 'Pro-ն շուտով կգործարկվի',                 RU: 'Pro скоро будет доступен',              EN: 'Pro is coming soon' },
    soonDesc:   { AM: 'Մենք պատրաստում ենք Pro-ն՝ առանց գովազդի, ավելի շատ AI հարցերով և լրացուցիչ հնարավորություններով։ Առայժմ հաշվիչը լիովին անվճար է։', RU: 'Мы готовим Pro: без рекламы, больше вопросов ИИ и дополнительные функции. Пока калькулятор полностью бесплатный.', EN: 'We are preparing Pro: no ads, more AI questions and extra features. For now the calculator is completely free.' },
    gotIt:      { AM: 'Լավ',                                     RU: 'Понятно',                               EN: 'Got it' },
    title:      { AM: 'ArmFinCredit Pro',                        RU: 'ArmFinCredit Pro',                      EN: 'ArmFinCredit Pro' },
    subtitle:   { AM: 'Ավելի խելացի որոշումներ վարկի վերաբերյալ՝ սուրճի գնով։', RU: 'Умные решения по кредиту — по цене чашки кофе.', EN: 'Smarter loan decisions for the price of a coffee.' },
    free:       { AM: 'Անվճար',                                  RU: 'Бесплатно',                             EN: 'Free' },
    freeDesc:   { AM: 'Հիմնական հաշվիչ՝ գովազդով',               RU: 'Базовый калькулятор с рекламой',        EN: 'Core calculator with ads' },
    current:    { AM: 'Ընթացիկ',                                 RU: 'Текущий',                               EN: 'Current' },
    bestValue:  { AM: 'Լավագույն ընտրություն',                   RU: 'Выгоднее всего',                        EN: 'Best value' },
    buy:        { AM: 'Գնել',                                    RU: 'Купить',                                EN: 'Get Pro' },
    soon:       { AM: 'Շուտով',                                  RU: 'Скоро',                                 EN: 'Coming soon' },
    startTrial: { AM: 'Սկսել 7 օր անվճար',                      RU: 'Попробовать 7 дней бесплатно',          EN: 'Start 7-day free trial' },
    trialNote:  { AM: 'Առանց քարտի։ Ավտոմատ չի գանձվում։',       RU: 'Без карты. Автосписаний нет.',          EN: 'No card required. No auto-charge.' },
    trialOn:    { AM: 'Փորձաշրջանն ակտիվ է',                     RU: 'Пробный период активен',                EN: 'Trial active' },
    trialEnded: { AM: 'Փորձաշրջանն ավարտվել է',                   RU: 'Пробный период закончился',             EN: 'Your trial has ended' },
    active:     { AM: 'Pro-ն ակտիվ է',                           RU: 'Pro активен',                           EN: 'Pro is active' },
    thanks:     { AM: 'Շնորհակալություն աջակցության համար։',     RU: 'Спасибо за поддержку!',                 EN: 'Thanks for supporting us!' },
    haveKey:    { AM: 'Ունե՞ք լիցենզիայի բանալի',                RU: 'Уже есть лицензионный ключ?',           EN: 'Already have a license key?' },
    keyPh:      { AM: 'XXXX-XXXX-XXXX-XXXX',                     RU: 'XXXX-XXXX-XXXX-XXXX',                   EN: 'XXXX-XXXX-XXXX-XXXX' },
    activate:   { AM: 'Ակտիվացնել',                              RU: 'Активировать',                          EN: 'Activate' },
    deactivate: { AM: 'Անջատել այս սարքում',                     RU: 'Отключить на этом устройстве',          EN: 'Remove from this device' },
    badKey:     { AM: 'Բանալին վավեր չէ',                        RU: 'Ключ недействителен',                   EN: 'This key is not valid' },
    netErr:     { AM: 'Սերվերը հասանելի չէ, փորձեք ավելի ուշ',   RU: 'Сервер недоступен, попробуйте позже',   EN: 'Server unavailable, try again later' },
    maybeLater: { AM: 'Հետո',                                    RU: 'Позже',                                 EN: 'Maybe later' },
    seePlans:   { AM: 'Տեսնել պլանները',                         RU: 'Смотреть тарифы',                       EN: 'See plans' },
    faq:        { AM: 'Հաճախ տրվող հարցեր',                      RU: 'Частые вопросы',                        EN: 'FAQ' },
    // feature list
    fNoAds:     { AM: 'Առանց գովազդի',                           RU: 'Без рекламы',                           EN: 'No ads' },
    fAi:        { AM: 'AI խորհրդատու՝ 100 հարց/օր',              RU: 'ИИ-советник: 100 вопросов/день',        EN: 'AI advisor: 100 questions/day' },
    fAiFree:    { AM: 'AI խորհրդատու՝ 2 հարց/օր',                RU: 'ИИ-советник: 2 вопроса/день',           EN: 'AI advisor: 2 questions/day' },
    fPdf:       { AM: 'PDF առանց ջրանիշի',                       RU: 'PDF без водяного знака',                EN: 'Clean PDF, no watermark' },
    fPdfFree:   { AM: '2 PDF/օր՝ ջրանիշով',                      RU: '2 PDF в день, с водяным знаком',        EN: '2 PDFs/day, watermarked' },
    fBanks:     { AM: 'Բանկերի առաջարկների ամբողջական ցանկ',     RU: 'Все предложения банков Армении',        EN: 'All Armenian bank offers' },
    fBanksFree: { AM: 'Բանկերի առաջարկներ՝ 1',                   RU: 'Предложения банков: 1',                 EN: 'Bank offers: 1' },
    rBanks:     { AM: 'Բանկերի բոլոր առաջարկները՝ Pro-ում',      RU: 'Все предложения банков — в Pro',        EN: 'All bank offers are in Pro' },
    fCsv:       { AM: 'CSV / Excel արտահանում',                  RU: 'Экспорт CSV / Excel',                   EN: 'CSV / Excel export' },
    fSaves:     { AM: 'Մինչև 50 պահված հաշվարկ',                 RU: 'До 50 сохранённых расчётов',            EN: 'Up to 50 saved calculations' },
    fSavesFree: { AM: '3 պահված հաշվարկ',                        RU: '3 сохранённых расчёта',                 EN: '3 saved calculations' },
    fCompare:   { AM: 'Համեմատել մինչև 4 վարկ',                  RU: 'Сравнение до 4 кредитов',               EN: 'Compare up to 4 loans' },
    fCompareFree:{ AM: 'Համեմատել 2 վարկ',                       RU: 'Сравнение 2 кредитов',                  EN: 'Compare 2 loans' },
    fCalc:      { AM: 'Հաշվիչ, գրաֆիկ, վաղաժամկետ մարում',       RU: 'Калькулятор, график, досрочка',         EN: 'Calculator, schedule, early repayment' },
    // paywall reasons
    rGeneric:   { AM: 'Բացեք բոլոր հնարավորությունները',         RU: 'Откройте все возможности',              EN: 'Unlock everything' },
    rSaves:     { AM: 'Անվճար պլանում՝ առավելագույնը 3 պահպանում', RU: 'В бесплатном тарифе — максимум 3 сохранения', EN: 'The free plan keeps up to 3 calculations' },
    rCsv:       { AM: 'CSV արտահանումը Pro հնարավորություն է',   RU: 'Экспорт CSV доступен в Pro',            EN: 'CSV export is a Pro feature' },
    rAi:        { AM: 'Այսօրվա անվճար AI հարցերն ավարտվեցին',    RU: 'Бесплатные вопросы ИИ на сегодня закончились', EN: "You've used today's free AI questions" },
    rCompare:   { AM: '3-րդ և 4-րդ վարկը հասանելի են Pro-ում',   RU: '3-й и 4-й кредит доступны в Pro',       EN: 'Loans C and D are a Pro feature' },
    rPdf:       { AM: 'Այսօրվա անվճար PDF-ներն ավարտվեցին',      RU: 'Бесплатные PDF на сегодня закончились', EN: "You've used today's free PDFs" },
    q1:         { AM: 'Ինչպե՞ս է աշխատում փորձաշրջանը',          RU: 'Как работает пробный период?',          EN: 'How does the trial work?' },
    a1:         { AM: '7 օր ամբողջական Pro՝ առանց քարտի։ Հետո դուք պարզապես վերադառնում եք անվճար պլանին։', RU: '7 дней полного Pro без привязки карты. Потом вы просто возвращаетесь на бесплатный тариф.', EN: '7 days of full Pro, no card needed. Afterwards you simply return to the free plan.' },
    q2:         { AM: 'Ինչպե՞ս եմ ստանում Pro-ն վճարումից հետո',  RU: 'Как получить Pro после оплаты?',        EN: 'How do I get Pro after paying?' },
    a2:         { AM: 'Վճարումից հետո էլ. փոստով կստանաք լիցենզիայի բանալի։ Մուտքագրեք այն այս էջում։', RU: 'После оплаты вы получите лицензионный ключ на e-mail. Введите его на этой странице.', EN: 'After checkout you get a license key by e-mail. Enter it on this page.' },
    q3:         { AM: 'Կարո՞ղ եմ չեղարկել',                      RU: 'Можно ли отменить подписку?',           EN: 'Can I cancel?' },
    a3:         { AM: 'Այո, ցանկացած պահի՝ վճարման էջի հղումով։', RU: 'Да, в любой момент — по ссылке из письма с чеком.', EN: 'Yes, any time, via the link in your receipt e-mail.' }
  },

  offers: {
    title:     { AM: 'Վարկային առաջարկներ',                     RU: 'Кредитные предложения',                 EN: 'Loan offers' },
    desc:      { AM: 'Առաջարկներ, որոնք համապատասխանում են ձեր հաշվարկին', RU: 'Предложения партнёров под ваш расчёт', EN: 'Partner offers that match your calculation' },
    yourCalc:  { AM: 'Ձեր հաշվարկը',                            RU: 'Ваш расчёт',                            EN: 'Your calculation' },
    rateFrom:  { AM: 'Տոկոս՝ սկսած',                            RU: 'Ставка от',                             EN: 'Rate from' },
    upTo:      { AM: 'Մինչև',                                   RU: 'До',                                    EN: 'Up to' },
    estPay:    { AM: 'Մոտ. ամսական վճար',                       RU: 'Прим. платёж/мес.',                     EN: 'Est. monthly' },
    save:      { AM: 'Խնայողություն',                           RU: 'Экономия',                              EN: 'You save' },
    apply:     { AM: 'Դիմել',                                   RU: 'Оформить',                              EN: 'Apply' },
    example:   { AM: 'Օրինակ',                                  RU: 'Пример',                                EN: 'Example' },
    fits:      { AM: 'Համապատասխանում է',                       RU: 'Подходит',                              EN: 'Matches' },
    noFit:     { AM: 'Գումարը կամ ժամկետը գերազանցում է',       RU: 'Сумма или срок выше лимита',            EN: 'Amount or term above limit' },
    disclosure:{ AM: 'Մենք կարող ենք միջնորդավճար ստանալ գործընկերներից, եթե դիմեք մեր հղումով։ Դա ձեզ համար գինը չի փոխում։', RU: 'Мы можем получать вознаграждение от партнёров, если вы оформите продукт по нашей ссылке. Для вас цена не меняется.', EN: 'We may earn a commission if you apply through our links. It never changes your price.' },
    partnerT:  { AM: 'Բանկ կամ ՎԿ եք՞',                         RU: 'Вы банк или МФО?',                      EN: 'Are you a lender?' },
    partnerD:  { AM: 'Տեղադրեք ձեր առաջարկը հազարավոր օգտատերերի առջև, ովքեր հենց հիմա վարկ են հաշվարկում։', RU: 'Разместите предложение перед тысячами людей, которые прямо сейчас считают кредит.', EN: 'Put your offer in front of people who are calculating a loan right now.' },
    partnerB:  { AM: 'Դառնալ գործընկեր',                        RU: 'Стать партнёром',                       EN: 'Become a partner' }
  },

  dep: {
    title:     { AM: 'Ավանդի հաշվիչ',                   RU: 'Калькулятор вкладов',            EN: 'Deposit calculator' },
    desc:      { AM: 'Հաշվեք, թե որքան կաճեն ձեր խնայողությունները', RU: 'Посчитайте, сколько вырастут ваши накопления', EN: 'See how much your savings will grow' },
    initial:   { AM: 'Սկզբնական գումար',                RU: 'Начальная сумма',                EN: 'Initial amount' },
    monthly:   { AM: 'Ամսական համալրում',               RU: 'Пополнение в месяц',             EN: 'Monthly top-up' },
    rate:      { AM: 'Տարեկան տոկոսադրույք',            RU: 'Годовая ставка',                 EN: 'Annual rate' },
    term:      { AM: 'Ժամկետ',                          RU: 'Срок',                           EN: 'Term' },
    cap:       { AM: 'Կապիտալացում',                    RU: 'Капитализация',                  EN: 'Capitalisation' },
    capM:      { AM: 'Ամսական',                         RU: 'Ежемесячно',                     EN: 'Monthly' },
    capQ:      { AM: 'Եռամսյակային',                    RU: 'Ежеквартально',                  EN: 'Quarterly' },
    capE:      { AM: 'Ժամկետի վերջում',                 RU: 'В конце срока',                  EN: 'At the end' },
    tax:       { AM: 'Եկամտային հարկ տոկոսից',          RU: 'Налог на проценты',              EN: 'Tax on interest' },
    taxNote:   { AM: 'Ստուգեք ընթացիկ դրույքը',         RU: 'Уточните актуальную ставку налога', EN: 'Check the current tax rate' },
    final:     { AM: 'Վերջնական գումար',                RU: 'Итоговая сумма',                 EN: 'Final balance' },
    contrib:   { AM: 'Ձեր ներդրումները',                RU: 'Ваши взносы',                    EN: 'Your contributions' },
    earned:    { AM: 'Զուտ եկամուտ',                    RU: 'Чистый доход',                   EN: 'Net interest' },
    taxPaid:   { AM: 'Հարկ',                            RU: 'Налог',                          EN: 'Tax' },
    effective: { AM: 'Արդյունավետ եկամտաբերություն',    RU: 'Эффективная доходность',         EN: 'Effective yield' },
    perYear:   { AM: 'տարեկան',                         RU: 'годовых',                        EN: 'per year' },
    growth:    { AM: 'Աճի գրաֆիկ',                      RU: 'График роста',                   EN: 'Growth' },
    byYear:    { AM: 'Ըստ տարիների',                    RU: 'По годам',                       EN: 'By year' },
    year:      { AM: 'Տարի',                            RU: 'Год',                            EN: 'Year' },
    balance:   { AM: 'Մնացորդ',                         RU: 'Остаток',                        EN: 'Balance' },
    banksCta:  { AM: 'Համեմատել բանկերի դրույքները',    RU: 'Сравнить ставки банков',         EN: 'Compare bank rates' },
    banksCtaD: { AM: 'Հայաստանի բանկերի ավանդների և հիփոթեքի դրույքները մեկ տեղում', RU: 'Ставки по вкладам и ипотеке банков Армении в одном месте', EN: 'Deposit and mortgage rates of Armenian banks in one place' },
    disclaimer:{ AM: 'Հաշվարկը մոտավոր է։ Իրական պայմանները կախված են բանկից։', RU: 'Расчёт ориентировочный. Реальные условия зависят от банка.', EN: 'Indicative calculation. Actual terms depend on the bank.' }
  },

  banks: {
    title:     { AM: 'Հայաստանի բանկերի առաջարկներ',    RU: 'Предложения банков Армении',     EN: 'Armenian bank offers' },
    desc:      { AM: 'Ավանդներ, հիփոթեք և վարկեր՝ դրույքներով, պայմաններով և աղբյուրներով', RU: 'Вклады, ипотека и кредиты — ставки, условия и источники', EN: 'Deposits, mortgages and loans — rates, terms and sources' },
    loans:     { AM: 'Վարկեր',                          RU: 'Кредиты',                        EN: 'Loans' },
    from:      { AM: 'սկսած',                           RU: 'от',                             EN: 'from' },
    min:       { AM: 'նվազ.',                           RU: 'мин.',                           EN: 'min.' },
    until:     { AM: 'Գործում է մինչև',                 RU: 'Действует до',                   EN: 'Valid until' },
    all:       { AM: 'Բոլորը',                          RU: 'Все',                            EN: 'All' },
    offersFrom:{ AM: 'առաջարկ',                         RU: 'предложений от',                 EN: 'offers from' },
    banksN:    { AM: 'բանկից',                          RU: 'банков',                         EN: 'banks' },
    empty:     { AM: 'Այս արժույթով առաջարկներ չկան',   RU: 'Нет предложений в этой валюте',  EN: 'No offers in this currency' },
    noData:    { AM: 'Այլ բանկեր',                      RU: 'Другие банки',                   EN: 'Other banks' },
    noDataDesc:{ AM: 'Այս բանկերի ստուգված հրապարակային դրույք չենք գտել․ տեսեք նրանց կայքում։', RU: 'Для этих банков мы не нашли проверенную публичную ставку — смотрите на их сайте.', EN: 'We could not find a verified public rate for these banks — see their websites.' },
    deposits:  { AM: 'Ավանդներ',                        RU: 'Вклады',                         EN: 'Deposits' },
    mortgage:  { AM: 'Հիփոթեք',                         RU: 'Ипотека',                        EN: 'Mortgage' },
    upTo:      { AM: 'մինչև',                           RU: 'до',                             EN: 'up to' },
    asOf:      { AM: 'Տվյալները՝',                      RU: 'Данные на',                      EN: 'Data as of' },
    source:    { AM: 'Աղբյուր',                         RU: 'Источник',                       EN: 'Source' },
    open:      { AM: 'Բանկի կայք',                      RU: 'Сайт банка',                     EN: 'Bank website' },
    cba:       { AM: 'ԿԲ վերաֆինանսավորման դրույք',     RU: 'Ставка рефинансирования ЦБ',     EN: 'Central Bank refinancing rate' },
    warn:      { AM: 'Դրույքները ցուցադրական են և հաճախ փոխվում են։ Սա գովազդ կամ առաջարկ չէ․ ստուգեք պայմանները բանկի կայքում։', RU: 'Ставки ориентировочные и часто меняются. Это не реклама и не оферта — проверяйте условия на сайте банка.', EN: 'Rates are indicative and change often. This is not advertising or an offer — check the terms on the bank website.' },
    locked:    { AM: 'Ամբողջական ցանկը՝ Pro-ում',        RU: 'Полный список — в Pro',          EN: 'Full list in Pro' },
    more:      { AM: 'Ավելի շատ համեմատություններ',     RU: 'Больше сравнений',               EN: 'More comparisons' }
  },

  widget: {
    full:       { AM: 'Ամբողջական գրաֆիկ և PDF',       RU: 'Полный график и PDF',             EN: 'Full schedule & PDF' },
    lower:      { AM: 'Գտնել ավելի ցածր տոկոս',        RU: 'Найти ставку ниже',               EN: 'Find a lower rate' },
    powered:    { AM: 'Հաշվիչը՝',                      RU: 'Калькулятор от',                  EN: 'Calculator by' },
    years:      { AM: 'տ.',                            RU: 'г.',                              EN: 'y' },
    overpay:    { AM: 'Գերավճար',                      RU: 'Переплата',                       EN: 'Overpayment' },
    // /widget page
    badge:      { AM: 'Անվճար վիջեթ',                  RU: 'Бесплатный виджет',               EN: 'Free widget' },
    title:      { AM: 'Վարկային հաշվիչ ձեր կայքի համար', RU: 'Кредитный калькулятор для вашего сайта', EN: 'A loan calculator for your website' },
    subtitle:   { AM: 'Ավելացրեք հարմարվող հաշվիչ կոդի մեկ տողով։ Այն աշխատում է բոլոր սարքերում, հայերեն, ռուսերեն և անգլերեն։', RU: 'Добавьте адаптивный калькулятор одной строкой кода. Работает на всех устройствах, на армянском, русском и английском.', EN: 'Add a responsive calculator with one line of code. Works on every device, in Armenian, Russian and English.' },
    who:        { AM: 'Հարմար է ավտոսրահների, կառուցապատողների, անշարժ գույքի գործակալությունների և ֆինանսական բլոգների համար։', RU: 'Подходит автосалонам, застройщикам, агентствам недвижимости и финансовым блогам.', EN: 'Perfect for car dealers, developers, real-estate agencies and finance blogs.' },
    settings:   { AM: 'Կարգավորումներ',                RU: 'Настройки',                       EN: 'Settings' },
    language:   { AM: 'Լեզու',                         RU: 'Язык',                            EN: 'Language' },
    theme:      { AM: 'Թեմա',                          RU: 'Тема',                            EN: 'Theme' },
    light:      { AM: 'Լուսավոր',                      RU: 'Светлая',                         EN: 'Light' },
    dark:       { AM: 'Մութ',                          RU: 'Тёмная',                          EN: 'Dark' },
    auto:       { AM: 'Ավտո',                          RU: 'Авто',                            EN: 'Auto' },
    accent:     { AM: 'Գույն',                         RU: 'Цвет',                            EN: 'Colour' },
    ref:        { AM: 'Գործընկերոջ ID (ըստ ցանկության)', RU: 'ID партнёра (необязательно)',   EN: 'Partner ID (optional)' },
    defaults:   { AM: 'Սկզբնական արժեքներ',            RU: 'Начальные значения',              EN: 'Default values' },
    preview:    { AM: 'Նախադիտում',                    RU: 'Предпросмотр',                    EN: 'Preview' },
    code:       { AM: 'Տեղադրեք այս կոդը ձեր կայքում', RU: 'Вставьте этот код на свой сайт',  EN: 'Paste this code into your site' },
    copy:       { AM: 'Պատճենել',                      RU: 'Копировать',                      EN: 'Copy' },
    copied:     { AM: 'Պատճենված է',                   RU: 'Скопировано',                     EN: 'Copied' },
    f1:         { AM: 'Անվճար՝ ընդմիշտ',               RU: 'Бесплатно навсегда',              EN: 'Free forever' },
    f1d:        { AM: 'Առանց գրանցման և սահմանափակումների։', RU: 'Без регистрации и ограничений.', EN: 'No sign-up, no limits.' },
    f2:         { AM: 'Ավտոմատ բարձրություն',          RU: 'Автоматическая высота',           EN: 'Auto height' },
    f2d:        { AM: 'Վիջեթը ինքն է հարմարվում էջին։', RU: 'Виджет сам подстраивается под страницу.', EN: 'The widget resizes itself to fit the page.' },
    f3:         { AM: 'Ձեր գույներն ու լեզուն',        RU: 'Ваши цвета и язык',               EN: 'Your colours and language' },
    f3d:        { AM: 'Ընտրեք թեման, գույնը և սկզբնական պարամետրերը։', RU: 'Выберите тему, цвет и начальные параметры.', EN: 'Pick the theme, colour and default values.' },
    proT:       { AM: 'White-label բիզնեսի համար',     RU: 'White-label для бизнеса',         EN: 'White-label for business' },
    proD:       { AM: 'Առանց մեր լոգոյի, ձեր կոճակով (օր.՝ «Դիմել վարկի») և ձեր հայտերի հղումով։ Գրեք մեզ՝ գնի համար։', RU: 'Без нашего логотипа, с вашей кнопкой (например, «Подать заявку») и ссылкой на ваши заявки. Напишите нам, чтобы узнать цену.', EN: 'No branding, your own button (e.g. “Apply now”) linking to your lead form. Contact us for pricing.' },
    proB:       { AM: 'Կապվել մեզ հետ',                RU: 'Связаться с нами',                EN: 'Contact us' }
  },

  ai: {
    title:    { AM: 'AI Վարկային խորհրդատու',                   RU: 'ИИ кредитный советник',                 EN: 'AI loan advisor' },
    hello:    { AM: 'Բարև։ Ես տեսնում եմ ձեր ընթացիկ հաշվարկը։ Հարցրեք ինչ ուզում եք, կամ ընտրեք հարց ներքևում։', RU: 'Привет! Я вижу ваш текущий расчёт. Спросите что угодно или выберите вопрос ниже.', EN: "Hi! I can see your current calculation. Ask anything or pick a question below." },
    ph:       { AM: 'Հարցրեք ձեր վարկի մասին…',                 RU: 'Спросите о своём кредите…',             EN: 'Ask about your loan…' },
    send:     { AM: 'Ուղարկել',                                 RU: 'Отправить',                             EN: 'Send' },
    left:     { AM: 'մնաց այսօր',                               RU: 'осталось сегодня',                      EN: 'left today' },
    thinking: { AM: 'Մտածում եմ…',                              RU: 'Думаю…',                                EN: 'Thinking…' },
    offline:  { AM: 'Օֆլայն վերլուծություն',                    RU: 'Офлайн-анализ',                         EN: 'Offline analysis' },
    disclaimer:{ AM: 'AI-ն կարող է սխալվել։ Սա ֆինանսական խորհուրդ չէ։', RU: 'ИИ может ошибаться. Это не финансовая консультация.', EN: 'AI can make mistakes. Not financial advice.' },
    s1:       { AM: 'Բացատրիր իմ վարկը պարզ բառերով',           RU: 'Объясни мой кредит простыми словами',   EN: 'Explain my loan in plain words' },
    s2:       { AM: 'Ինչպե՞ս խնայել տոկոսների վրա',              RU: 'Как сэкономить на процентах?',          EN: 'How can I save on interest?' },
    s3:       { AM: 'Անուիտետ թե՞ դիֆերենցված',                 RU: 'Аннуитет или дифференцированный?',       EN: 'Annuity or differentiated?' },
    s4:       { AM: 'Լավ տոկոսադրույք է՞',                     RU: 'Это хорошая ставка?',                   EN: 'Is this a good rate?' },
    upgrade:  { AM: 'Ավելի շատ հարցեր Pro-ով',                  RU: 'Больше вопросов с Pro',                 EN: 'More questions with Pro' }
  }
}

export function t(lang, section, key) {
  var l = lang || 'EN'
  var sec = L[section]
  if (!sec) return key
  var entry = sec[key]
  if (!entry) return key
  return entry[l] || entry['EN'] || key
}

export default L
