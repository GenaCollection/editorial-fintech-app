var L = {
  brand: { AM: 'ArmFinCredit', RU: 'ArmFinCredit', EN: 'ArmFinCredit' },

  nav: {
    calc:    { AM: 'Հաշվիչ',           RU: 'Калькулятор',    EN: 'Calculator' },
    sched:   { AM: 'Վճ. Ժամ.',         RU: 'График',         EN: 'Schedule' },
    early:   { AM: 'Վաղ. Մար.',        RU: 'Досроч. пог.',   EN: 'Early Repayment' },
    apply:   { AM: 'Դիմել',            RU: 'Подать заявку',  EN: 'Apply Now' }
  },

  sidebar: {
    planner:  { AM: 'Վարկի Պլան.',     RU: 'Планировщик',    EN: 'Loan Planner' },
    inst:     { AM: 'Ինստ. Մութք',     RU: 'Институц.',      EN: 'Institutional' },
    newCalc:  { AM: 'Նոր Հաշվ.',       RU: 'Новый расчет',   EN: 'New Calculation' },
    saved:    { AM: 'Պահված',          RU: 'Сохраненное',    EN: 'Saved' },
    settings: { AM: 'Կարգ.',           RU: 'Настройки',      EN: 'Settings' },
    help:     { AM: 'Օգնութ.',         RU: 'Помощь',         EN: 'Help' },
    newApp:   { AM: 'Նոր Հայտ',        RU: 'Новая заявка',   EN: 'New Application' }
  },

  calc: {
    title:     { AM: 'Վարկային Հաշվիչ',         RU: 'Кредитный калькулятор', EN: 'Loan Calculator' },
    desc:      { AM: 'Սահմանեք վարկի պարամ.',   RU: 'Задайте параметры кредита', EN: 'Configure your loan parameters.' },
    params:    { AM: 'Վարկի Պարամ.',             RU: 'Параметры',          EN: 'Loan Parameters' },
    amount:    { AM: 'Վարկի Գումար',             RU: 'Сумма кредита',      EN: 'Loan Amount' },
    rate:      { AM: 'Տոկոսադրույք',             RU: 'Процентная ставка',  EN: 'Interest Rate' },
    term:      { AM: 'Ժամկետ',                  RU: 'Срок',               EN: 'Loan Term' },
    months:    { AM: 'ամիս',                    RU: 'мес.',               EN: 'mos.' },
    monthly:   { AM: 'Ամսական Վճար',             RU: 'Ежемес. платеж',     EN: 'Monthly Payment' },
    totalInt:  { AM: 'Ընդհ. Տոկոս',             RU: 'Сумма процентов',    EN: 'Total Interest' },
    total:     { AM: 'Ընդհանուր',               RU: 'Итого',              EN: 'Total' },
    preview:   { AM: 'Կանխնայկ',               RU: 'Предпросмотр',        EN: 'Preview' },
    viewFull:  { AM: 'Տեսնել Ժամ.',             RU: 'Полный график',       EN: 'View Full Schedule' },
    print:     { AM: 'Տպագել',                  RU: 'Печать',             EN: 'Print / PDF' },
    breakd:    { AM: 'Բաշխակություն',            RU: 'Структура',          EN: 'Breakdown' },
    principal: { AM: 'Ասլ.',                    RU: 'Осн. долг',          EN: 'Principal' }
  },

  sched: {
    title:     { AM: 'Վճ. Ժամանակ.',            RU: 'График платежей',    EN: 'Payment Schedule' },
    desc:      { AM: 'Աmorт. Ժամ.',             RU: 'Амортизация',        EN: 'Amortization timeline.' },
    addEarly:  { AM: 'Ավելալ Վաղ.',             RU: 'Добавить досроч.',   EN: 'Add Early Payment' },
    month:     { AM: 'Ամիս',                   RU: 'Месяц',              EN: 'Month' },
    amount:    { AM: 'Գումար',                 RU: 'Сумма',              EN: 'Amount' },
    apply:     { AM: 'Կիրառել',                RU: 'Применить',          EN: 'Apply' },
    saved:     { AM: 'Լրաց.',                  RU: 'Сэкон.',             EN: 'Mo. Saved' },
    intSaved:  { AM: 'Տոկ. Լրաց.',             RU: 'Ток. сын.',          EN: 'Int. Saved' },
    payment:   { AM: 'Վճար',                   RU: 'Платеж',             EN: 'Payment' },
    principal: { AM: 'Ասլ.',                    RU: 'Осн.',               EN: 'Principal' },
    interest:  { AM: 'Տոկ.',                    RU: 'Проц.',              EN: 'Interest' },
    balance:   { AM: 'Մնաց.',                   RU: 'Остаток',            EN: 'Balance' },
    prev:      { AM: 'Առاջ',                   RU: 'Назад',              EN: 'Prev' },
    next:      { AM: 'Հաджорд',                RU: 'Далее',              EN: 'Next' },
    page:      { AM: 'Եջ.',                     RU: 'Стр.',               EN: 'Page' },
    table:     { AM: 'Ալյուск',                 RU: 'Таблица',            EN: 'Table' },
    forecast:  { AM: 'Կանխատեսական',            RU: 'Прогноз',            EN: 'Forecast' }
  },

  early: {
    title:     { AM: 'Վաղ. Մարում',             RU: 'Досроч. погашение',  EN: 'Early Repayment' },
    desc:      { AM: 'Ռկսեք Վաղ.',              RU: 'Где выигрываете',    EN: 'See where early payments win.' },
    extra:     { AM: 'Ավել.',                   RU: 'Доп.',               EN: 'Extra / mo.' },
    newTerm:   { AM: 'Նոր Ժամկ.',               RU: 'Новый срок',         EN: 'New Term' },
    reduction: { AM: 'կrч.',                    RU: 'Сокр.',              EN: 'Reduction' },
    intSaved:  { AM: 'Տոկ. Լр.',               RU: 'Экон. ток.',         EN: 'Int. Saved' },
    scenarios: { AM: 'Սцен.',                   RU: 'Сценарии',           EN: 'Scenarios' },
    loanAmt:   { AM: 'Վارки Гумар',             RU: 'Сумма',              EN: 'Loan Amount' },
    monthly:   { AM: 'Амскаyн',                 RU: 'Ежемес.',            EN: 'Monthly' },
    interest:  { AM: 'Тoкos',                   RU: 'Проц.',              EN: 'Interest' },
    totalMo:   { AM: 'Жам.',                    RU: 'Мес.',               EN: 'Months' }
  },

  footer: {
    rights:  { AM: '2024 ArmFinCredit.', RU: '2024 ArmFinCredit.', EN: '2024 ArmFinCredit. All rights reserved.' },
    privacy: { AM: 'Գաղտ.',  RU: 'Конфид.', EN: 'Privacy' },
    terms:   { AM: 'Պայм.',  RU: 'Условия', EN: 'Terms' },
    support: { AM: 'Աջկ.',  RU: 'Подд.',   EN: 'Support' }
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
