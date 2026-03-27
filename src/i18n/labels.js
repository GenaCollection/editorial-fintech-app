export const labels = {
  navigation: {
    calculator: { AM: 'Հաշվիչ',             RU: 'Калькулятор',          EN: 'Calculator' },
    schedule:   { AM: 'Վճարումների Ժ.',       RU: 'График платежей',      EN: 'Payment Schedule' },
    earlyInfo:  { AM: 'Վաղ. մարում',          RU: 'Досрочное погашение',  EN: 'Early Repayment' },
    apply:      { AM: 'Դիմել հիմա',           RU: 'Подать заявку',        EN: 'Apply Now' },
  },
  sidebar: {
    planner:  { AM: 'Վարկի Պլանավ.',   RU: 'Планировщик',         EN: 'Loan Planner' },
    access:   { AM: 'Ինստ. մուտք',     RU: 'Институц. доступ',    EN: 'Institutional' },
    newCalc:  { AM: 'Նոր հաշվարկ',    RU: 'Новый расчет',        EN: 'New Calculation' },
    history:  { AM: 'Վճ. ժամ.',        RU: 'График платежей',     EN: 'Payment Schedule' },
    saved:    { AM: 'Պահպանված',       RU: 'Сохранено',           EN: 'Saved Estimates' },
    settings: { AM: 'Կարգավ.',         RU: 'Настройки',           EN: 'Settings' },
    help:     { AM: 'Օգնություն',       RU: 'Помощь',              EN: 'Help Center' },
    apply:    { AM: 'Նոր հայտ',        RU: 'Новая заявка',        EN: 'New Application' },
  },
  footer: {
    rights:      { AM: '© 2024 Editorial Fintech.',    RU: '© 2024 Editorial Fintech.',    EN: '© 2024 Editorial Fintech. All rights reserved.' },
    privacy:     { AM: 'Գաղտնիություն', RU: 'Конфиденц.',  EN: 'Privacy Policy' },
    terms:       { AM: 'Պայմաններ',    RU: 'Условия',     EN: 'Terms of Service' },
    disclosures: { AM: 'Բացահայտ.',    RU: 'Раскрытие',   EN: 'FDIC Disclosures' },
    support:     { AM: 'Աջակցություն', RU: 'Поддержка',   EN: 'Contact Support' },
  },
  calculator: {
    title:       { AM: 'Վարկային Հաշվիչ',      RU: 'Кредитный калькулятор',  EN: 'Loan Calculator' },
    desc:        { AM: 'Սահմանեք պարամ.',      RU: 'Рассчитайте кредит',     EN: 'Define your parameters to see your lending projection.' },
    param:       { AM: 'Վարկի Պարամ.',        RU: 'Параметры кредита',      EN: 'Loan Parameters' },
    loanAmt:     { AM: 'Վարկի Գումար',        RU: 'Сумма кредита',          EN: 'Loan Amount' },
    intRate:     { AM: 'Տոկոսադրույք',        RU: 'Процентная ставка',      EN: 'Interest Rate (APR)' },
    term:        { AM: 'Ժամկետ',             RU: 'Срок кредита',           EN: 'Loan Term' },
    months:      { AM: 'ամիս',              RU: 'мес.',                   EN: 'mos.' },
    monthly:     { AM: 'Ամսական Վճար',       RU: 'Ежемесячный платеж',     EN: 'Monthly Payment' },
    totalInt:    { AM: 'Ընդհանուր Տոկ.',     RU: 'Общая сумма процентов',  EN: 'Total Interest Paid' },
    scheduleBtn: { AM: 'Տեսնել Ժամանակ.',    RU: 'Смотреть график',        EN: 'View Full Schedule' },
  },
  schedule: {
    title:    { AM: 'Վճ. Ժամանակացույց', RU: 'График платежей',   EN: 'Payment Schedule' },
    desc:     { AM: 'Ամորտ. ժամ.ցույց', RU: 'Анализ амортизации', EN: 'Analyze your amortization timeline.' },
    addEarly: { AM: 'Ավ. վաղ. մ.',       RU: 'Доп. платеж',       EN: 'Add Early Payment' },
    amount:   { AM: 'Գումար',            RU: 'Сумма',             EN: 'Amount' },
    apply:    { AM: 'Կիրառել',           RU: 'Применить',         EN: 'Apply to Schedule' },
    month:    { AM: 'Ամիս',             RU: 'Месяц',             EN: 'Month' },
    payment:  { AM: 'Վճար',             RU: 'Платеж',            EN: 'Payment' },
    balance:  { AM: 'Մնացorд',          RU: 'Остаток',           EN: 'Remaining Balance' },
  },
}

export const t = (language, section, key) => {
  const lang = language || 'EN'
  return labels?.[section]?.[key]?.[lang] || labels?.[section]?.[key]?.EN || key
}
