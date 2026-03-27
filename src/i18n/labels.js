var L = {
  brand: { AM: 'ArmFinCredit', RU: 'ArmFinCredit', EN: 'ArmFinCredit' },

  nav: {
    calc:    { AM: '\u0540\u0561\u0577\u057e\u056b\u0579', RU: '\u041a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440', EN: 'Calculator' },
    sched:   { AM: '\u054e\u0579. \u053a\u0561\u0574.',    RU: '\u0413\u0440\u0430\u0444\u0438\u043a',                              EN: 'Schedule' },
    early:   { AM: '\u054e\u0561\u0572. \u0544\u0561\u0580.', RU: '\u0414\u043e\u0441\u0440. \u043f\u043e\u0563.',                 EN: 'Early Repayment' },
    apply:   { AM: '\u0564\u056b\u0574\u0565\u056c',        RU: '\u041f\u043e\u0434\u0430\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443', EN: 'Apply Now' }
  },

  sidebar: {
    planner:  { AM: '\u054e\u0561\u0580\u056f\u056b \u054a\u056c\u0561\u0576.', RU: '\u041f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u0449\u0438\u043a', EN: 'Loan Planner' },
    inst:     { AM: '\u053b\u0576\u057d\u057f. \u0544\u0578\u0582\u057f\u0584', RU: '\u0418\u043d\u0441\u0442\u0438\u0442\u0443\u0446.',               EN: 'Institutional' },
    newCalc:  { AM: '\u0546\u0578\u0580 \u0540\u0561\u0577\u057e.',             RU: '\u041d\u043e\u0432\u044b\u0439 \u0440\u0430\u0441\u0447\u0435\u0442', EN: 'New Calculation' },
    saved:    { AM: '\u054a\u0561\u0570\u057e\u0561\u056e',                     RU: '\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043d\u043e\u0435',  EN: 'Saved' },
    settings: { AM: '\u053f\u0561\u0580\u0563.',                               RU: '\u041d\u0561\u0441\u0442\u0440\u043e\u0439\u043a\u0438',             EN: 'Settings' },
    help:     { AM: '\u0555\u0563\u0576\u0578\u0582\u0569.',                   RU: '\u041f\u043e\u043c\u043e\u0449\u044c',                             EN: 'Help' },
    newApp:   { AM: '\u0546\u0578\u0580 \u0540\u0561\u0575\u057f',             RU: '\u041d\u043e\u0432\u0430\u044f \u0437\u0430\u044f\u0432\u043a\u0430',  EN: 'New Application' }
  },

  calc: {
    title:     { AM: '\u054e\u0561\u0580\u056f\u0561\u0575\u056b\u0576 \u0540\u0561\u0577\u057e\u056b\u0579', RU: '\u041a\u0440\u0435\u0564\u0438\u0442\u043d\u044b\u0439 \u043a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440', EN: 'Loan Calculator' },
    desc:      { AM: '\u054d\u0561\u0570\u0574\u0561\u0576\u0565\u0584 \u057e\u0561\u0580\u056f\u056b \u057a\u0561\u0580\u0561\u0574\u0565\u057f\u0580\u0587\u0580\u0568', RU: '\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u043a\u0440\u0435\u0434\u0438\u0442\u0430', EN: 'Configure your loan parameters.' },
    params:    { AM: '\u054e\u0561\u0580\u056f\u056b \u054a\u0561\u0580\u0561\u0574.',  RU: '\u041f\u0430\u0580\u0561\u043c\u0565\u0442\u0580\u044b',                                    EN: 'Loan Parameters' },
    amount:    { AM: '\u054e\u0561\u0580\u056f\u056b \u0533\u0578\u0582\u0574\u0561\u0580', RU: '\u0421\u0443\u043c\u043c\u0561 \u043a\u0440\u0435\u0434\u0438\u0442\u0430',                EN: 'Loan Amount' },
    rate:      { AM: '\u054f\u0578\u056f\u0578\u057d\u0561\u0564\u0580\u0578\u0582\u0575\u0584', RU: '\u041f\u0440\u043e\u0446\u0435\u043d\u0442\u043d\u0430\u044f \u0441\u0442\u0430\u0432\u043a\u0430', EN: 'Interest Rate' },
    term:      { AM: '\u056a\u0561\u0574\u056f\u0565\u057f',                              RU: '\u0421\u0440\u043e\u043a',                                          EN: 'Loan Term' },
    months:    { AM: '\u0561\u0574\u056b\u057d',                                         RU: '\u043c\u0435\u0441.',                                               EN: 'mos.' },
    monthly:   { AM: '\u0531\u0574\u057d\u056f\u0561\u0576 \u054e\u0579\u0561\u0580',    RU: '\u0415\u0436\u0435\u043c\u0435\u0441. \u043f\u043b\u0430\u0442\u0435\u0436', EN: 'Monthly Payment' },
    totalInt:  { AM: '\u0538\u0576\u0564\u0570. \u054f\u0578\u056f\u0578\u057d',         RU: '\u0421\u0443\u043c\u043c\u0430 \u043f\u0440\u043e\u0446\u0435\u043d\u0442\u043e\u0432', EN: 'Total Interest' },
    total:     { AM: '\u0538\u0576\u0564\u0570\u0561\u0576\u0578\u0582\u0580',           RU: '\u0418\u0442\u043e\u0433\u043e',                                    EN: 'Total' },
    preview:   { AM: '\u056f\u0561\u0576\u056a\u0576\u0561\u056f',                       RU: '\u041f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440', EN: 'Preview' },
    viewFull:  { AM: '\u057f\u0565\u057d\u0576\u0565\u056c \u056a\u0561\u0574.',         RU: '\u041f\u043e\u043b\u043d\u044b\u0439 \u0433\u0440\u0430\u0444\u0438\u043a', EN: 'View Full Schedule' },
    print:     { AM: '\u054f\u057a\u0561\u0563\u0565\u056c',                             RU: '\u041f\u0435\u0447\u0430\u0442\u044c',                              EN: 'Print / PDF' },
    breakd:    { AM: '\u0532\u0561\u0577\u056f\u0561\u056f\u0578\u0582\u0569\u0575\u0578\u0582\u0576', RU: '\u0421\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430',           EN: 'Breakdown' },
    principal: { AM: '\u0531\u057d\u056c.',                                              RU: '\u041e\u0441\u043d. \u0434\u043e\u043b\u0433',                      EN: 'Principal' }
  },

  sched: {
    title:     { AM: '\u054e\u0579. \u056a\u0561\u0574\u0561\u0576\u0561\u056f.',        RU: '\u0413\u0440\u0430\u0444\u0438\u043a \u043f\u043b\u0430\u0442\u0435\u0436\u0435\u0439', EN: 'Payment Schedule' },
    desc:      { AM: '\u0531\u0574\u0578\u0580\u057f. \u056a\u0561\u0574.',              RU: '\u0410\u043c\u043e\u0440\u0442\u0438\u0437\u0430\u0446\u0438\u044f',   EN: 'Amortization timeline.' },
    addEarly:  { AM: '\u0531\u057e\u0565\u056c\u0561\u056c \u054e\u0561\u0572.',        RU: '\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0434\u043e\u0441\u0440.', EN: 'Add Early Payment' },
    month:     { AM: '\u0531\u0574\u056b\u057d',                                        RU: '\u041c\u0435\u057d\u044f\u0446',                                    EN: 'Month' },
    amount:    { AM: '\u0533\u0578\u0582\u0574\u0561\u0580',                            RU: '\u0421\u0443\u043c\u043c\u0430',                                    EN: 'Amount' },
    apply:     { AM: '\u053f\u056b\u0580\u0561\u057c\u0565\u056c',                      RU: '\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c',             EN: 'Apply' },
    saved:     { AM: '\u053c\u0580\u0561\u0581.',                                       RU: '\u0421\u044d\u043a\u043e\u043d.',                                   EN: 'Mo. Saved' },
    intSaved:  { AM: '\u054f\u0578\u056f. \u053c\u0580\u0561\u0581.',                  RU: '\u0422\u043e\u043a. \u0441\u044b\u043d.',                           EN: 'Int. Saved' },
    payment:   { AM: '\u054e\u0579\u0561\u0580',                                       RU: '\u041f\u043b\u0430\u0442\u0435\u0436',                              EN: 'Payment' },
    principal: { AM: '\u0531\u057d\u056c.',                                            RU: '\u041e\u0441\u043d.',                                               EN: 'Principal' },
    interest:  { AM: '\u054f\u0578\u056f.',                                            RU: '\u041f\u0440\u043e\u0446.',                                         EN: 'Interest' },
    balance:   { AM: '\u0544\u0576\u0561\u0581.',                                      RU: '\u041e\u0441\u0442\u0430\u0442\u043e\u043a',                         EN: 'Balance' },
    prev:      { AM: '\u0531\u057c\u0561\u056b',                                       RU: '\u041d\u0430\u0437\u0430\u0434',                                    EN: 'Prev' },
    next:      { AM: '\u0540\u0561\u057b\u0578\u0580\u0564',                           RU: '\u0414\u0430\u056c\u0565\u0565',                                    EN: 'Next' },
    page:      { AM: '\u0535\u0565\u056f.',                                            RU: '\u0421\u0442\u0440.',                                               EN: 'Page' },
    table:     { AM: '\u0531\u056c\u0575\u0578\u0582\u057d\u056f',                     RU: '\u0422\u0430\u0431\u043b\u0438\u0446\u0430',                         EN: 'Table' },
    forecast:  { AM: '\u056f\u0561\u0576\u056�\u0561\u0569\u056f\u0561\u0576',         RU: '\u041f\u0580\u043e\u0433\u043d\u043e\u0566',                         EN: 'Forecast' }
  },

  early: {
    title:     { AM: '\u054e\u0561\u0572. \u0544\u0561\u0580\u0578\u0582\u0574',       RU: '\u0414\u043e\u0441\u0440. \u043f\u043e\u0433\u0430\u0448\u0435\u043d\u0438\u0435', EN: 'Early Repayment' },
    desc:      { AM: '\u054c\u056f\u057d\u0565\u0584 \u053b\u0576\u056c\u056c \u054e\u0561\u0572.', RU: '\u0413\u0434\u0435 \u0432\u044b\u0438\u0433\u0440\u044b\u0432\u0430\u0435\u0442\u0435', EN: 'See where early payments win.' },
    extra:     { AM: '\u0531\u057e\u0565\u056c.',                                      RU: '\u0414\u043e\u043f.',                                               EN: 'Extra / mo.' },
    newTerm:   { AM: '\u0546\u0578\u0580 \u056a\u0561\u0574\u056f.',                   RU: '\u041d\u043e\u0432\u044b\u0439 \u0441\u0440\u043e\u043a',             EN: 'New Term' },
    reduction: { AM: '\u056f\u0580\u0579.',                                            RU: '\u0421\u043e\u056f\u0580.',                                         EN: 'Reduction' },
    intSaved:  { AM: '\u054f\u0578\u056f. \u053c\u0580.',                              RU: '\u0415\u043a\u043e\u043d. \u0442\u043e\u056f.',                      EN: 'Int. Saved' },
    scenarios: { AM: '\u054d\u0581\u0565\u0576\u0561\u0580.',                          RU: '\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0438',                   EN: 'Scenarios' },
    loanAmt:   { AM: '\u054e\u0561\u0580\u056f\u056b \u0533\u0578\u0582\u0574\u0561\u0580', RU: '\u0421\u0443\u043c\u043c\u0430',                              EN: 'Loan Amount' },
    monthly:   { AM: '\u0531\u0574\u057d\u056f\u0561\u0576',                           RU: '\u0415\u0436\u0435\u043c\u0565\u057d.',                             EN: 'Monthly' },
    interest:  { AM: '\u054f\u0578\u056f\u0578\u057d',                                RU: '\u041f\u0440\u043e\u0446.',                                         EN: 'Interest' },
    totalMo:   { AM: '\u056a\u0561\u0574.',                                            RU: '\u041c\u0435\u057d.',                                               EN: 'Months' }
  },

  footer: {
    rights:  { AM: '2024 ArmFinCredit.', RU: '2024 ArmFinCredit.', EN: '2024 ArmFinCredit. All rights reserved.' },
    privacy: { AM: '\u0533\u0561\u0572\u057f.', RU: '\u041a\u043e\u043d\u0444\u0438\u0434.', EN: 'Privacy' },
    terms:   { AM: '\u054a\u0561\u0575\u0574.', RU: '\u0423\u057d\u056c\u043e\u057e.',       EN: 'Terms' },
    support: { AM: '\u0531\u056b\u056f.',       RU: '\u041f\u043e\u0434\u0434.',              EN: 'Support' }
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
