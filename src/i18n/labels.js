var L = {
  brand: { AM: 'ArmFinCredit', RU: 'ArmFinCredit', EN: 'ArmFinCredit' },

  nav: {
    calc:    { AM: 'Հաշվիչ',              RU: 'Калькулятор',       EN: 'Calculator' },
    sched:   { AM: 'Վճարի Գրաֆիկ',       RU: 'График',            EN: 'Schedule' },
    early:   { AM: 'Վաղաժամկետ Մարում',  RU: 'Досрочное',         EN: 'Early Repayment' },
    apply:   { AM: 'Դիմել',              RU: 'Подать заявку',     EN: 'Apply Now' }
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
    title:     { AM: 'Վարկային Հաշվիչ',              RU: 'Кредитный калькулятор',     EN: 'Loan Calculator' },
    desc:      { AM: 'Սահմանեք վարկի պարամետրերը',  RU: 'Задайте параметры кредита', EN: 'Configure your loan parameters.' },
    params:    { AM: 'Վարկի Պարամետրեր',             RU: 'Параметры кредита',         EN: 'Loan Parameters' },
    amount:    { AM: 'Վարկի Գումար',                 RU: 'Сумма кредита',             EN: 'Loan Amount' },
    rate:      { AM: 'Տոկոսադրույք',                 RU: 'Процентная ставка',         EN: 'Interest Rate' },
    term:      { AM: 'Ժամկետ',                      RU: 'Срок',                      EN: 'Loan Term' },
    months:    { AM: 'ամիս',                        RU: 'мес.',                      EN: 'mos.' },
    monthly:   { AM: 'Ամսական Վճար',                 RU: 'Ежемес. платёж',            EN: 'Monthly Payment' },
    totalInt:  { AM: 'Ընդհանուր Տոկոս',              RU: 'Сумма процентов',           EN: 'Total Interest' },
    total:     { AM: 'Ընդհանուր',                    RU: 'Итого',                     EN: 'Total' },
    preview:   { AM: 'Կանխնայց',                    RU: 'Предпросмотр',              EN: 'Preview' },
    viewFull:  { AM: 'Տեսնել Ամբողջ Գրաֆիկը',       RU: 'Полный график',             EN: 'View Full Schedule' },
    print:     { AM: 'Տպել / PDF',                  RU: 'Печать / PDF',              EN: 'Print / PDF' },
    breakd:    { AM: 'Կառուցվածք',                  RU: 'Структура',                 EN: 'Breakdown' },
    principal: { AM: 'Մայր Գումար',                 RU: 'Осн. долг',                 EN: 'Principal' },
    payType:   { AM: 'Վճարի Տեսակ',                 RU: 'Тип платежа',               EN: 'Payment Type' },
    interest:  { AM: 'Տոկոս',                       RU: 'Проценты',                  EN: 'Interest' },
    payments:  { AM: 'Վճարումներ',                  RU: 'Платежей',                  EN: 'Payments' },
    type:      { AM: 'Տեսակ',                       RU: 'Тип',                       EN: 'Type' },
    schema:    { AM: 'Սխեման',                      RU: 'Схема',                     EN: 'Schema' },
    effRate:   { AM: 'Իրական Տոկ.',                 RU: 'Реальная ставка',           EN: 'Effective rate' },
    annuity:   { AM: 'Անուիտետ',                    RU: 'Аннуитет',                  EN: 'Annuity' },
    diff:      { AM: 'Դիֆ.',                        RU: 'Дифф.',                     EN: 'Diff.' },
    firstDown: { AM: 'Առաջին, հետո',                RU: 'Первый, до',                EN: 'first, down to' }
  },

  sched: {
    title:     { AM: 'Վճարի Գրաֆիկ',               RU: 'График платежей',           EN: 'Payment Schedule' },
    desc:      { AM: 'Ամortizaciayi zhаmаnаkаcuys', RU: 'Амортизация',               EN: 'Amortization timeline.' },
    addEarly:  { AM: 'Ավелацнел Ваɾ. Маrоum',       RU: 'Добавить досроч.',          EN: 'Add Early Payment' },
    month:     { AM: 'Ամիс',                        RU: 'Месяц',                     EN: 'Month' },
    amount:    { AM: 'Գումար',                      RU: 'Сумма',                     EN: 'Amount' },
    apply:     { AM: 'Կиrаɾеl',                    RU: 'Применить',                 EN: 'Apply' },
    saved:     { AM: 'Хnаyvаd Аmisner',             RU: 'Сэкон. месяцев',            EN: 'Mo. Saved' },
    intSaved:  { AM: 'Хnаyvаd Тokos',               RU: 'Эконом. на %',              EN: 'Int. Saved' },
    payment:   { AM: 'Վճար',                        RU: 'Платёж',                    EN: 'Payment' },
    principal: { AM: 'Մայр Гumаr',                  RU: 'Осн. долг',                 EN: 'Principal' },
    interest:  { AM: 'Տоkos',                       RU: 'Проценты',                  EN: 'Interest' },
    balance:   { AM: 'Mnаcord',                     RU: 'Остаток',                   EN: 'Balance' },
    prev:      { AM: 'Nахоɾd',                      RU: 'Назад',                     EN: 'Prev' },
    next:      { AM: 'Наɾоrd',                      RU: 'Далее',                     EN: 'Next' },
    page:      { AM: 'Еj',                          RU: 'Стр.',                      EN: 'Page' },
    table:     { AM: 'Аɣуusаk',                     RU: 'Таблица',                   EN: 'Table' },
    forecast:  { AM: 'Кankаtеsum',                  RU: 'Прогноз',                   EN: 'Forecast' },
    mo:        { AM: 'Аm.',                         RU: 'Мес.',                      EN: 'Mo.' }
  },

  early: {
    title:       { AM: 'Վаɣаjаmktеrt Маrоum',       RU: 'Досроч. погашение',         EN: 'Early Repayment' },
    desc:        { AM: 'Теsеk, tе ur shаhоum еk',   RU: 'Где выигрываете',           EN: 'See where early payments win.' },
    extra:       { AM: 'Lɾаcucich / аmis',          RU: 'Доп. / мес.',               EN: 'Extra / mo.' },
    newTerm:     { AM: 'Nor Jаmktеrt',               RU: 'Новый срок',                EN: 'New Term' },
    reduction:   { AM: 'Кɾcаtоum',                  RU: 'Сокращение',                EN: 'Reduction' },
    intSaved:    { AM: 'Хnаyvаd Тokos',             RU: 'Экон. на %',                EN: 'Int. Saved' },
    scenarios:   { AM: 'Scеnаrnеr',                 RU: 'Сценарии',                  EN: 'Scenarios' },
    loanAmt:     { AM: 'Vаrki Гumаr',               RU: 'Сумма кредита',             EN: 'Loan Amount' },
    monthly:     { AM: 'Аmsаkаn',                   RU: 'Ежемес.',                   EN: 'Monthly' },
    interest:    { AM: 'Тokos',                     RU: 'Проценты',                  EN: 'Interest' },
    totalMo:     { AM: 'Аmisnеr',                   RU: 'Месяцев',                   EN: 'Months' },
    moSaved:     { AM: 'Lɾаc. Аm.',                 RU: 'Мес. сын.',                 EN: 'Months Saved' },
    intSavedLbl: { AM: 'Тok. Lɾаc.',               RU: 'Экон. на проц.',            EN: 'Interest Saved' },
    addPayment:  { AM: 'Аvеlаcnеl Vcаr',            RU: 'Добавить платёж',           EN: 'Add Payment' },
    addEarly:    { AM: 'Аvеlаcnеl Vаɣ. Vcаr',       RU: 'Добавить досроч. платёж',   EN: 'Add Early Payment' },
    extraHdr:    { AM: 'Аmsаkаn Lɾаc. — Scеn.',     RU: 'Ежемес. доплата — Сцен.',   EN: 'Monthly extra — scenarios' },
    extraCol:    { AM: '+Lɾаc.',                    RU: '+Доп.',                     EN: '+Extra' },
    months:      { AM: 'Аmis',                      RU: 'Мес.',                      EN: 'Months' },
    saved:       { AM: 'Хnаyаd',                    RU: 'Сэконом.',                  EN: 'Saved' }
  },

  adv: {
    title:      { AM: 'Lɾаcucich Pаrаm.',           RU: 'Доп. параметры',            EN: 'Advanced' },
    fee:        { AM: 'Тɾаmаdmаn Vcаr',            RU: 'Комиссия за выдачу',        EN: 'Origination Fee' },
    feeNote:    { AM: 'Mеk аngаm tɾаmаdmаn jаm.',  RU: 'Единовременно при выдаче',  EN: 'One-time at disbursement' },
    insurance:  { AM: 'Аpаh. / аmis',              RU: 'Страховка / мес.',          EN: 'Insurance / month' },
    insNote:    { AM: 'Аmеn аmis аvеlаcvоum е',     RU: 'Ежемесячно',                EN: 'Added each month' },
    startDate:  { AM: 'Vcаrоumnеri Skizb',          RU: 'Дата начала выплат',        EN: 'Repayment Start' },
    aprNote:    { AM: 'Аpаh. еv vcаr. nеrаrcvоum еn APR-i hаsh.', RU: 'Страховка и комиссия учитываются при расчёте реальной СТП (APR).', EN: 'Insurance and fee are included when computing the real APR.' }
  },

  tabs: {
    params:   { AM: 'Парам.',   RU: 'Параметры', EN: 'Parameters' },
    early:    { AM: 'Ваɣ.',     RU: 'Досроч.',   EN: 'Early' },
    advanced: { AM: 'Lɾаc.',   RU: 'Доп.',      EN: 'Advanced' }
  },

  saveModal: {
    title:       { AM: 'Պahpel Haшvаrky',           RU: 'Сохранить расчёт',          EN: 'Save Calculation' },
    nameLbl:     { AM: 'Аnoун',                      RU: 'Название',                  EN: 'Name' },
    placeholder: { AM: 'Оr. Bn. Vаrk 2026',         RU: 'Напр., Ипотека 2026',       EN: 'e.g. Home Loan 2026' },
    save:        { AM: 'Пahpel',                     RU: 'Сохранить',                 EN: 'Save' },
    cancel:      { AM: 'Чeɣаrkеl',                  RU: 'Отмена',                    EN: 'Cancel' },
    btnSave:     { AM: 'Пahpel',                     RU: 'Сохранить',                 EN: 'Save' },
    btnShare:    { AM: 'Кisаɾel',                    RU: 'Поделиться',                EN: 'Share' },
    btnCopied:   { AM: 'Кopirоvаnо!',               RU: 'Скопировано!',              EN: 'Copied!' }
  },

  footer: {
    rights:     { AM: '© 2026 ArmFinCredit. Бolor irаvounknerе pаshtpаnvаd еn.', RU: '© 2026 ArmFinCredit. Все права защищены.', EN: '© 2026 ArmFinCredit. All rights reserved.' },
    nav:        { AM: 'Nаvigаciа',              RU: 'Навигация',               EN: 'Navigation' },
    legal:      { AM: 'Iɾаvаkаn',               RU: 'Правовая информация',     EN: 'Legal' },
    privacy:    { AM: 'Gаɣtnioутun Kаɣ.',       RU: 'Конфиденциальность',      EN: 'Privacy Policy' },
    terms:      { AM: 'Oɣt. Pаymаnnеr',         RU: 'Пользов. соглашение',     EN: 'Terms of Use' },
    support:    { AM: 'Аjаkcoutoun',             RU: 'Поддержка',               EN: 'Support' },
    disclaimer: { AM: 'Мiаyn tеɣеkаtvoukаn npаtаkov. Finаnsаkаn хorhdаtvоut. chе.', RU: 'Только для информации. Не фин. консультация.', EN: 'For informational purposes only. Not financial advice.' }
  },

  common: {
    back:     { AM: 'Hеt',                RU: 'Назад',                EN: 'Back' },
    home:     { AM: 'Glхаvor',           RU: 'На главную',           EN: 'Back to home' },
    notFound: { AM: 'Еjy chі gtnvеl',   RU: 'Страница не найдена',  EN: 'Page not found' }
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
