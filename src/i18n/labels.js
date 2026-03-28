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
    title:     { AM: 'Վարկային Հաշվիչ',             RU: 'Кредитный калькулятор',   EN: 'Loan Calculator' },
    desc:      { AM: 'Սահմանեք վարկի պարամետրերը', RU: 'Задайте параметры кредита', EN: 'Configure your loan parameters.' },
    params:    { AM: 'Վարկի Պարամետրեր',            RU: 'Параметры кредита',       EN: 'Loan Parameters' },
    amount:    { AM: 'Վարկի Գումար',                RU: 'Сумма кредита',           EN: 'Loan Amount' },
    rate:      { AM: 'Տոկոսադրույք',                RU: 'Процентная ставка',       EN: 'Interest Rate' },
    term:      { AM: 'Ժամկետ',                     RU: 'Срок',                    EN: 'Loan Term' },
    months:    { AM: 'ամիս',                       RU: 'мес.',                    EN: 'mos.' },
    monthly:   { AM: 'Ամսական Վճար',                RU: 'Ежемес. платёж',          EN: 'Monthly Payment' },
    totalInt:  { AM: 'Ընդհանուր Տոկոս',             RU: 'Сумма процентов',         EN: 'Total Interest' },
    total:     { AM: 'Ընդհանուր',                   RU: 'Итого',                   EN: 'Total' },
    preview:   { AM: 'Կանխնայց',                   RU: 'Предпросмотр',            EN: 'Preview' },
    viewFull:  { AM: 'Տեսնել Ամբողջ Գրաֆիկը',      RU: 'Полный график',           EN: 'View Full Schedule' },
    print:     { AM: 'Տպել / PDF',                 RU: 'Печать / PDF',            EN: 'Print / PDF' },
    breakd:    { AM: 'Կառուցվածք',                 RU: 'Структура',               EN: 'Breakdown' },
    principal: { AM: 'Մայր Գումար',                RU: 'Осн. долг',               EN: 'Principal' }
  },

  sched: {
    title:     { AM: 'Վճարի Գրաֆիկ',               RU: 'График платежей',         EN: 'Payment Schedule' },
    desc:      { AM: 'Ամortizaciayi ժամանակացույց', RU: 'Амортизация',             EN: 'Amortization timeline.' },
    addEarly:  { AM: 'Ավելացնել Վաղ. Մարում',       RU: 'Добавить досроч.',        EN: 'Add Early Payment' },
    month:     { AM: 'Ամիս',                       RU: 'Месяц',                   EN: 'Month' },
    amount:    { AM: 'Գումար',                     RU: 'Сумма',                   EN: 'Amount' },
    apply:     { AM: 'Կիրառել',                    RU: 'Применить',               EN: 'Apply' },
    saved:     { AM: 'Խնայված Ամիսներ',            RU: 'Сэкон. месяцев',          EN: 'Mo. Saved' },
    intSaved:  { AM: 'Խնայված Տոկոս',              RU: 'Эконом. на %',            EN: 'Int. Saved' },
    payment:   { AM: 'Վճար',                       RU: 'Платёж',                  EN: 'Payment' },
    principal: { AM: 'Մայր Գումար',                RU: 'Осн. долг',               EN: 'Principal' },
    interest:  { AM: 'Տոկոս',                      RU: 'Проценты',                EN: 'Interest' },
    balance:   { AM: 'Մնացորդ',                    RU: 'Остаток',                 EN: 'Balance' },
    prev:      { AM: 'Նախորդ',                     RU: 'Назад',                   EN: 'Prev' },
    next:      { AM: 'Հաջորդ',                     RU: 'Далее',                   EN: 'Next' },
    page:      { AM: 'Էջ',                         RU: 'Стр.',                    EN: 'Page' },
    table:     { AM: 'Աղյուսակ',                   RU: 'Таблица',                 EN: 'Table' },
    forecast:  { AM: 'Կանխատեսում',                RU: 'Прогноз',                 EN: 'Forecast' }
  },

  early: {
    title:     { AM: 'Վաղաժամկետ Մարում',          RU: 'Досроч. погашение',       EN: 'Early Repayment' },
    desc:      { AM: 'Տեսեք, թե ուր շահում եք',    RU: 'Где выигрываете',         EN: 'See where early payments win.' },
    extra:     { AM: 'Լրացուցիչ / ամիս',           RU: 'Доп. / мес.',             EN: 'Extra / mo.' },
    newTerm:   { AM: 'Նոր Ժամկետ',                RU: 'Новый срок',              EN: 'New Term' },
    reduction: { AM: 'Կրճատում',                   RU: 'Сокращение',              EN: 'Reduction' },
    intSaved:  { AM: 'Խնայված Տոկոս',              RU: 'Экон. на %',              EN: 'Int. Saved' },
    scenarios: { AM: 'Սցենարներ',                  RU: 'Сценарии',                EN: 'Scenarios' },
    loanAmt:   { AM: 'Վարկի Գումար',               RU: 'Сумма кредита',           EN: 'Loan Amount' },
    monthly:   { AM: 'Ամսական',                    RU: 'Ежемес.',                 EN: 'Monthly' },
    interest:  { AM: 'Տոկոս',                      RU: 'Проценты',                EN: 'Interest' },
    totalMo:   { AM: 'Ամիսներ',                    RU: 'Месяцев',                 EN: 'Months' }
  },

  footer: {
    rights:  { AM: '© 2026 ArmFinCredit. Բոլոր իրավունքները պաշտպանված են։', RU: '© 2026 ArmFinCredit. Все права защищены.', EN: '© 2026 ArmFinCredit. All rights reserved.' },
    nav:     { AM: 'Նավիգացիա',                    RU: 'Навигация',               EN: 'Navigation' },
    legal:   { AM: 'Իրավական',                     RU: 'Правовая информация',     EN: 'Legal' },
    privacy: { AM: 'Գաղտնիության Քաղ.',            RU: 'Конфиденциальность',      EN: 'Privacy Policy' },
    terms:   { AM: 'Օգտ. Պայմաններ',              RU: 'Пользов. соглашение',     EN: 'Terms of Use' },
    support: { AM: 'Աջակցություն',                 RU: 'Поддержка',               EN: 'Support' },
    disclaimer: { AM: 'Միայն տեղեկատվական նպատակներով։ Ֆինանսական խորհրդատվություն չէ։', RU: 'Только для информации. Не фин. консультация.', EN: 'For informational purposes only. Not financial advice.' }
  },

  common: {
    back:    { AM: 'Հետ',      RU: 'Назад',      EN: 'Back' },
    home:    { AM: 'Գլխավոր', RU: 'На главную', EN: 'Back to home' },
    notFound:{ AM: 'Էջը չի գտնվել', RU: 'Страница не найдена', EN: 'Page not found' }
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
