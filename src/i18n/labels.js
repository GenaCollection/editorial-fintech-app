export const labels = {
  navigation: {
    calculator: { AM: 'Հաշվիչ',                       RU: 'Калькулятор',          EN: 'Calculator' },
    schedule:   { AM: 'Վճարումների ժամանակացույց',     RU: 'График платежей',      EN: 'Payment Schedule' },
    earlyInfo:  { AM: 'Վաղաժամկետ մարում',             RU: 'Досрочное погашение',  EN: 'Early Repayment' },
    apply:      { AM: 'Դիմել հիմա',                    RU: 'Подать заявку',        EN: 'Apply Now' },
  },
  sidebar: {
    planner:  { AM: 'Վարկի պլանավորում',               RU: 'Планировщик',                  EN: 'Loan Planner' },
    access:   { AM: 'Ինստիտուցիոնալ մուտք',            RU: 'Институциональный доступ',     EN: 'Institutional Access' },
    newCalc:  { AM: 'Նոր հաշվարկ',                     RU: 'Новый расчет',                 EN: 'New Calculation' },
    history:  { AM: 'Վճ. ժամանակ.',                    RU: 'График платежей',              EN: 'Payment Schedule' },
    saved:    { AM: 'Պահպանվածներ',                    RU: 'Сохранено',                    EN: 'Saved Estimates' },
    settings: { AM: 'Կարգավորումներ',                  RU: 'Настройки',                    EN: 'Settings' },
    help:     { AM: 'Օгнություн',                       RU: 'Помощь',                       EN: 'Help Center' },
    apply:    { AM: 'Նոր հայт',                        RU: 'Новая заявка',                 EN: 'New Application' },
  },
  footer: {
    rights:      { AM: '© 2024 Editorial Fintech. Բոլոր իравунqнерě пашtпанваtsal en.',
                   RU: '© 2024 Editorial Fintech. Все права защищены.',
                   EN: '© 2024 Editorial Fintech. All rights reserved.' },
    privacy:     { AM: 'Գаղtниуtyун',  RU: 'Конфиденциальность', EN: 'Privacy Policy' },
    terms:       { AM: 'Пайманнер',    RU: 'Условия',            EN: 'Terms of Service' },
    disclosures: { AM: 'Бацаhайtумнер', RU: 'Раскрытие',         EN: 'FDIC Disclosures' },
    support:     { AM: 'Аджакцуtyун',  RU: 'Поддержка',         EN: 'Contact Support' },
  },
  calculator: {
    title:       { AM: 'Վаркайин Hашвич',    RU: 'Кредитный калькулятор',      EN: 'Loan Calculator' },
    desc:        { AM: 'Саhманеq жер параметрнерě',  RU: 'Рассчитайте параметры кредита', EN: 'Define your parameters to see your institutional lending projection.' },
    param:       { AM: 'Варки Параметрер',   RU: 'Параметры кредита',          EN: 'Loan Parameters' },
    loanAmt:     { AM: 'Варки Гумар',        RU: 'Сумма кредита',              EN: 'Loan Amount' },
    intRate:     { AM: 'Токосадруйк',        RU: 'Процентная ставка',          EN: 'Interest Rate (APR)' },
    term:        { AM: 'Жамкет',             RU: 'Срок кредита',               EN: 'Loan Term' },
    months:      { AM: 'амис',               RU: 'мес.',                       EN: 'mos.' },
    monthly:     { AM: 'Амсакан Вчарум',     RU: 'Ежемесячный платеж',         EN: 'Monthly Payment' },
    totalInt:    { AM: 'Ендханур Токосавчар', RU: 'Общая сумма процентов',      EN: 'Total Interest Paid' },
    scheduleBtn: { AM: 'Тесел Мармани Жаманакацуйцě', RU: 'Посмотреть график платежей', EN: 'View Full Schedule' },
  },
  schedule: {
    title:    { AM: 'Вчарумнери Жаманакацуйц', RU: 'График платежей',       EN: 'Payment Schedule' },
    desc:     { AM: 'Верлузеq жер амортизацион жаманакацуйцě:', RU: 'Проанализируйте ваш график амортизации.', EN: 'Analyze your amortization timeline and explore savings.' },
    addEarly: { AM: 'Ավелацнел ваغаjамкет марум', RU: 'Добавить досрочный платеж', EN: 'Add Early Payment' },
    amount:   { AM: 'Гумар',   RU: 'Сумма',   EN: 'Amount' },
    apply:    { AM: 'Кирарел', RU: 'Применить', EN: 'Apply to Schedule' },
    month:    { AM: 'Амис',    RU: 'Месяц',   EN: 'Month' },
    payment:  { AM: 'Вчарум',  RU: 'Платеж',  EN: 'Payment' },
    balance:  { AM: 'Мнацорд', RU: 'Остаток', EN: 'Remaining Balance' },
  },
};

export const t = (language, section, key) => {
  const lang = language || 'EN';
  return labels?.[section]?.[key]?.[lang] || labels?.[section]?.[key]?.EN || key;
};
