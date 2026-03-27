// i18n translation labels
// All strings use single script per value to avoid Rollup parser issues

const AM = 'AM'
const RU = 'RU'
const EN = 'EN'

export const labels = {
  navigation: {
    calculator: { AM: 'Calculator AM', RU: 'Calculator RU', EN: 'Calculator' },
    schedule:   { AM: 'Schedule AM',   RU: 'Schedule RU',   EN: 'Payment Schedule' },
    earlyInfo:  { AM: 'Early AM',      RU: 'Early RU',      EN: 'Early Repayment' },
    apply:      { AM: 'Apply AM',      RU: 'Apply RU',      EN: 'Apply Now' },
  },
  sidebar: {
    planner:  { AM: 'Planner AM',  RU: 'Planner RU',  EN: 'Loan Planner' },
    access:   { AM: 'Access AM',   RU: 'Access RU',   EN: 'Institutional' },
    newCalc:  { AM: 'New Calc AM', RU: 'New Calc RU', EN: 'New Calculation' },
    history:  { AM: 'History AM',  RU: 'History RU',  EN: 'Payment Schedule' },
    saved:    { AM: 'Saved AM',    RU: 'Saved RU',    EN: 'Saved Estimates' },
    settings: { AM: 'Settings AM', RU: 'Settings RU', EN: 'Settings' },
    help:     { AM: 'Help AM',     RU: 'Help RU',     EN: 'Help Center' },
    apply:    { AM: 'Apply AM',    RU: 'Apply RU',    EN: 'New Application' },
  },
  footer: {
    rights:      { AM: 'All rights reserved.', RU: 'All rights reserved.', EN: 'All rights reserved.' },
    privacy:     { AM: 'Privacy',     RU: 'Privacy',     EN: 'Privacy Policy' },
    terms:       { AM: 'Terms',       RU: 'Terms',       EN: 'Terms of Service' },
    disclosures: { AM: 'Disclosures', RU: 'Disclosures', EN: 'FDIC Disclosures' },
    support:     { AM: 'Support',     RU: 'Support',     EN: 'Contact Support' },
  },
  calculator: {
    title:       { AM: 'Loan Calc AM',  RU: 'Loan Calc RU',  EN: 'Loan Calculator' },
    desc:        { AM: 'Desc AM',       RU: 'Desc RU',       EN: 'Define your parameters to see your lending projection.' },
    param:       { AM: 'Params AM',     RU: 'Params RU',     EN: 'Loan Parameters' },
    loanAmt:     { AM: 'Amount AM',     RU: 'Amount RU',     EN: 'Loan Amount' },
    intRate:     { AM: 'Rate AM',       RU: 'Rate RU',       EN: 'Interest Rate (APR)' },
    term:        { AM: 'Term AM',       RU: 'Term RU',       EN: 'Loan Term' },
    months:      { AM: 'mo.',           RU: 'mo.',           EN: 'mos.' },
    monthly:     { AM: 'Monthly AM',    RU: 'Monthly RU',    EN: 'Monthly Payment' },
    totalInt:    { AM: 'Total Int AM',  RU: 'Total Int RU',  EN: 'Total Interest Paid' },
    scheduleBtn: { AM: 'Schedule AM',   RU: 'Schedule RU',   EN: 'View Full Schedule' },
  },
  schedule: {
    title:    { AM: 'Schedule AM',   RU: 'Schedule RU',   EN: 'Payment Schedule' },
    desc:     { AM: 'Desc AM',       RU: 'Desc RU',       EN: 'Analyze your amortization timeline.' },
    addEarly: { AM: 'Add Early AM',  RU: 'Add Early RU',  EN: 'Add Early Payment' },
    amount:   { AM: 'Amount AM',     RU: 'Amount RU',     EN: 'Amount' },
    apply:    { AM: 'Apply AM',      RU: 'Apply RU',      EN: 'Apply to Schedule' },
    month:    { AM: 'Month AM',      RU: 'Month RU',      EN: 'Month' },
    payment:  { AM: 'Payment AM',    RU: 'Payment RU',    EN: 'Payment' },
    balance:  { AM: 'Balance AM',    RU: 'Balance RU',    EN: 'Remaining Balance' },
  },
}

export const t = (language, section, key) => {
  const lang = language || 'EN'
  return labels?.[section]?.[key]?.[lang] || labels?.[section]?.[key]?.EN || key
}
