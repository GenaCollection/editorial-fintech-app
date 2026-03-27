// Centralized i18n labels helper
// Usage: getLabel(language, 'navigation', 'calculator')
window.i18nLabels = {
    navigation: {
        calculator: { AM: 'Հաշվիչ', RU: 'Калькулятор', EN: 'Calculator' },
        schedule:   { AM: 'Վճարումների ժամանակացույց', RU: 'График платежей', EN: 'Payment Schedule' },
        earlyInfo:  { AM: 'Վաղաժամկետ մարում', RU: 'Досрочное погашение', EN: 'Early Repayment Info' },
        apply:      { AM: 'Դիմել հիմա', RU: 'Применить', EN: 'Apply Now' }
    },
    sidebar: {
        planner:  { AM: 'Վարկի պլանավորում', RU: 'Планировщик', EN: 'Loan Planner' },
        access:   { AM: 'Ինստիտուցիոնալ մուտք', RU: 'Институциональный доступ', EN: 'Institutional Access' },
        newCalc:  { AM: 'Նոր հաշվարկ', RU: 'Новый расчет', EN: 'New Calculation' },
        history:  { AM: 'Վարկային պատմություն', RU: 'История кредитов', EN: 'Loan History' },
        saved:    { AM: 'Պահպանվածներ', RU: 'Сохранено', EN: 'Saved Estimates' },
        settings: { AM: 'Կարգավորումներ', RU: 'Настройки', EN: 'Settings' },
        help:     { AM: 'Օգնություն', RU: 'Помощь', EN: 'Help Center' },
        apply:    { AM: 'Նոր հայտ', RU: 'Новая заявка', EN: 'New Application' }
    },
    footer: {
        rights:      { AM: '© 2024 Editorial Fintech. Բոլոր իրավունքները պաշտպանված են:', RU: '© 2024 Editorial Fintech. Все права защищены.', EN: '© 2024 Editorial Fintech. All rights reserved.' },
        privacy:     { AM: 'Գաղտնիություն', RU: 'Конфиденциальность', EN: 'Privacy Policy' },
        terms:       { AM: 'Պայմաններ', RU: 'Условия', EN: 'Terms of Service' },
        disclosures: { AM: 'Բացահայտումներ', RU: 'Раскрытие', EN: 'FDIC Disclosures' },
        support:     { AM: 'Աջակցություն', RU: 'Поддержка', EN: 'Contact Support' }
    },
    calculator: {
        title:       { AM: 'Վարկային Հաշվիչ', RU: 'Кредитный калькулятор', EN: 'Loan Calculator' },
        desc:        { AM: 'Սահմանեք ձեր պարամետրերը', RU: 'Рассчитайте параметры вашего кредита', EN: 'Define your parameters to see your institutional lending projection.' },
        param:       { AM: 'Վարկի Պարամետրեր', RU: 'Параметры кредита', EN: 'Loan Parameters' },
        loanAmt:     { AM: 'Վարկի Գումար', RU: 'Сумма кредита', EN: 'Loan Amount' },
        intRate:     { AM: 'Տոկոսադրույք', RU: 'Процентная ставка', EN: 'Interest Rate (APR)' },
        term:        { AM: 'Ժամկետ', RU: 'Срок кредита', EN: 'Loan Term' },
        months:      { AM: 'ամիս', RU: 'мес.', EN: 'mos.' },
        monthly:     { AM: 'Ամսական Վճարում', RU: 'Ежемесячный платеж', EN: 'Monthly Payment' },
        totalInt:    { AM: 'Ընդհանուր Տոկոսավճար', RU: 'Общая сумма процентов', EN: 'Total Interest Paid' },
        scheduleBtn: { AM: 'Տեսնել Մարման Ժամանակացույցը', RU: 'Посмотреть график платежей', EN: 'View Full Schedule' }
    },
    schedule: {
        title:    { AM: 'Վճարումների ժամանակացույց', RU: 'График платежей', EN: 'Payment Schedule' },
        desc:     { AM: 'Վերլուծեք ձեր ամորտիզացիոն ժամանակացույցը:', RU: 'Проанализируйте ваш график амортизации.', EN: 'Analyze your amortization timeline and explore savings.' },
        addEarly: { AM: 'Ավելացնել վաղաժամկետ մարում', RU: 'Добавить платеж', EN: 'Add Early Payment' },
        amount:   { AM: 'Գումար', RU: 'Сумма', EN: 'Payment Amount' },
        apply:    { AM: 'Կիրառել', RU: 'Применить', EN: 'Apply to Schedule' },
        month:    { AM: 'Ամիս', RU: 'Месяц', EN: 'Month' },
        payment:  { AM: 'Վճարում', RU: 'Платеж', EN: 'Payment' },
        balance:  { AM: 'Մնացորդ', RU: 'Остаток', EN: 'Remaining Balance' }
    }
};

window.t = (language, section, key) => {
    const lang = language || 'EN';
    return window.i18nLabels?.[section]?.[key]?.[lang] || key;
};
