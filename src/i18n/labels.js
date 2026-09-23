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
    pro:     { AM: 'Pro',         RU: 'Pro',         EN: 'Pro' },
    trial:   { AM: 'Փորձ',        RU: 'Пробный',     EN: 'Trial' },
    daysLeft:{ AM: 'օր',          RU: 'дн.',         EN: 'd left' }
  },

  ads: {
    label:   { AM: 'Գովազդ',                RU: 'Реклама',            EN: 'Advertisement' },
    remove:  { AM: 'Հեռացնել գովազդը',      RU: 'Убрать рекламу',     EN: 'Remove ads' },
    sponsored: { AM: 'Գովազդային',          RU: 'Спонсор',            EN: 'Sponsored' }
  },

  pro: {
    badge:      { AM: 'PRO',                                     RU: 'PRO',                                   EN: 'PRO' },
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
    fAiFree:    { AM: 'AI խորհրդատու՝ 3 հարց/օր',                RU: 'ИИ-советник: 3 вопроса/день',           EN: 'AI advisor: 3 questions/day' },
    fPdf:       { AM: 'PDF առանց ջրանիշի',                       RU: 'PDF без водяного знака',                EN: 'Clean PDF, no watermark' },
    fPdfFree:   { AM: 'PDF ջրանիշով',                            RU: 'PDF с водяным знаком',                  EN: 'PDF with watermark' },
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
    rPdf:       { AM: 'Pro-ում PDF-ը առանց ջրանիշի է',           RU: 'В Pro PDF без водяного знака',          EN: 'Pro exports PDFs without a watermark' },
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
