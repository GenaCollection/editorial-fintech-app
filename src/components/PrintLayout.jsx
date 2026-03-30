import React from 'react'
import { t } from '../i18n/labels.js'

var SYM = '\u058f'
function fmt(n) { return Math.round(n).toLocaleString() }
function fmtR(n) { return Number(n).toFixed(2) }

export default function PrintLayout(props) {
  var loanState = props.loanState
  var schedule = props.schedule
  var monthlyPayment = props.monthlyPayment
  var totalInterest = props.totalInterest
  var totalPayment = props.totalPayment
  var apr = props.apr
  var extraPayments = props.extraPayments || []
  var lang = props.lang || 'EN'

  var isDiff = loanState.loanType === 'differentiated'
  var firstPayment = schedule.length > 0 ? schedule[0].payment : monthlyPayment
  var lastPayment  = schedule.length > 0 ? schedule[schedule.length - 1].payment : monthlyPayment
  var today = new Date().toLocaleDateString(lang === 'AM' ? 'hy-AM' : lang === 'RU' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  var lbl = {
    generatedOn: { AM: '\u0531\u0564\u056f\u0563\u0580\u057eած և', RU: '\u0414ата создания:', EN: 'Generated on:' },
    disclaimer:  { AM: '\u0531\u057d \u0540\u0561\u0577\u057e\u0561\u580\u056f\u0568 \u056f\u0580\u0569\u0578ւթյանական նպատակներով է և ծորհրդական հլատկություն չլի կազմի:', RU: '\u042d\u0442\u043e\u0442 \u0440\u0430\u0441\u0447\u0451\u0442 \u043d\u043e\u0441\u0438\u0442 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u0445\u0430\u0440\u0430\u043a\u0442\u0435\u0440 \u0438 \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u043c \u0441\u043e\u0432\u0435\u0442\u043e\u043c:', EN: 'This calculation is for informational purposes only and does not constitute financial advice.' },
    loanParams:  { AM: '\u054e\u0561\u0580\u056f\u056b \u054a\u0561\u0580\u0561\u0574\u0565\u057f\u0580\u0565\u0580', RU: '\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u043a\u0440\u0435\u0434\u0438\u0442\u0430', EN: 'Loan Parameters' },
    summary:     { AM: '\u0531\u0580\u0564\u0575\u0578\u0582\u0576\u0584\u0576\u0565\u0580', RU: '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b', EN: 'Summary' },
    amortTable:  { AM: '\u0531\u0574ortizaciayi \u0533\u0580\u0561\u0586\u056b\u056f', RU: '\u0413\u0440\u0430\u0444\u0438\u043a \u043f\u043b\u0430\u0442\u0435\u0436\u0435\u0439', EN: 'Amortization Schedule' },
    earlyPay:    { AM: '\u054e\u0561\u0572\u0561\u056a\u0561\u0574\u056f\u0565\u057f \u054e\u0573\u0561\u580\u0578\u0582\u0574\u0576\u0565\u0580', RU: '\u0414\u043e\u0441\u0440\u043e\u0447\u043d\u044b\u0435 \u043f\u043b\u0430\u0442\u0435\u0436\u0438', EN: 'Early Payments' },
    month:       { AM: '\u0531\u0574\u056b\u057d', RU: '\u041c\u0435\u0441.', EN: 'Mo.' },
    payment:     { AM: '\u054e\u0573\u0561\u0580', RU: '\u041f\u043b\u0430\u0442\u0451\u0436', EN: 'Payment' },
    principal:   { AM: '\u0544\u0561\u0575\u0580 \u0533\u0578\u0582\u0574\u0561\u0580', RU: '\u041e\u0441\u043d. \u0434\u043e\u043b\u0563', EN: 'Principal' },
    interest:    { AM: '\u054f\u0578\u056f\u0578\u057d', RU: '\u041f\u0440\u043e\u0446\u0435\u043d\u0442\u044b', EN: 'Interest' },
    extra:       { AM: '\u053c\u0580\u0561\u0581', RU: '\u0414\u043e\u043f.', EN: 'Extra' },
    balance:     { AM: '\u0544\u0576\u0561\u0581\u0578\u0580\u0564', RU: '\u041e\u057d\u057f\u0561\u057f\u043e\u043a', EN: 'Balance' }
  }
  function tr(k) { return (lbl[k] && lbl[k][lang]) || lbl[k]['EN'] }

  return (
    <div id="print-layout" style={{ display: 'none' }}>
      <div className="print-page">

        {/* Header */}
        <div className="print-header">
          <div className="print-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#1d4ed8"/>
              <path d="M8 10h10a6 6 0 0 1 0 12H8V10z" fill="white"/>
              <path d="M8 10v12" stroke="#1d4ed8" strokeWidth="2"/>
              <circle cx="18" cy="16" r="3" fill="#1d4ed8"/>
            </svg>
            <span className="print-brand">ArmFinCredit</span>
          </div>
          <div className="print-meta">
            <div className="print-meta-date">{tr('generatedOn')} {today}</div>
            <div className="print-meta-tag">armfincredit.am</div>
          </div>
        </div>

        <div className="print-divider" />

        {/* Loan Parameters */}
        <div className="print-section-title">{tr('loanParams')}</div>
        <div className="print-params-grid">
          <div className="print-param">
            <span className="print-param-label">{t(lang,'calc','amount')}</span>
            <span className="print-param-value">{SYM}{fmt(loanState.amount)}</span>
          </div>
          <div className="print-param">
            <span className="print-param-label">{t(lang,'calc','rate')}</span>
            <span className="print-param-value">{fmtR(loanState.rate)}%</span>
          </div>
          <div className="print-param">
            <span className="print-param-label">{t(lang,'calc','term')}</span>
            <span className="print-param-value">{loanState.term} {t(lang,'calc','months')}</span>
          </div>
          <div className="print-param">
            <span className="print-param-label">{t(lang,'calc','type')}</span>
            <span className="print-param-value">{isDiff ? t(lang,'calc','diff') : t(lang,'calc','annuity')}</span>
          </div>
          {loanState.fee > 0 && (
            <div className="print-param">
              <span className="print-param-label">{t(lang,'adv','fee')}</span>
              <span className="print-param-value">{SYM}{fmt(loanState.fee)}</span>
            </div>
          )}
          {loanState.insurance > 0 && (
            <div className="print-param">
              <span className="print-param-label">{t(lang,'adv','insurance')}</span>
              <span className="print-param-value">{SYM}{fmt(loanState.insurance)}/{t(lang,'calc','months')}</span>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="print-section-title">{tr('summary')}</div>
        <div className="print-summary-grid">
          <div className="print-summary-card print-summary-accent">
            <div className="print-summary-card-label">{t(lang,'calc','monthly')}</div>
            <div className="print-summary-card-value">
              {SYM}{fmt(isDiff ? firstPayment : monthlyPayment)}
            </div>
            {isDiff && (
              <div className="print-summary-card-sub">
                {t(lang,'calc','firstDown')} {SYM}{fmt(lastPayment)}
              </div>
            )}
          </div>
          <div className="print-summary-card">
            <div className="print-summary-card-label">{t(lang,'calc','totalInt')}</div>
            <div className="print-summary-card-value">{SYM}{fmt(totalInterest)}</div>
          </div>
          <div className="print-summary-card">
            <div className="print-summary-card-label">{t(lang,'calc','total')}</div>
            <div className="print-summary-card-value">{SYM}{fmt(totalPayment)}</div>
          </div>
          <div className="print-summary-card">
            <div className="print-summary-card-label">APR ({t(lang,'calc','effRate')})</div>
            <div className="print-summary-card-value">{fmtR(apr)}%</div>
          </div>
        </div>

        {/* Early payments if any */}
        {extraPayments.length > 0 && (
          <>
            <div className="print-section-title">{tr('earlyPay')}</div>
            <table className="print-table" style={{ marginBottom: '16px' }}>
              <thead>
                <tr>
                  <th>{tr('month')}</th>
                  <th style={{ textAlign: 'right' }}>{SYM}</th>
                </tr>
              </thead>
              <tbody>
                {extraPayments.map(function(ep) {
                  return (
                    <tr key={ep.month}>
                      <td>{ep.month}</td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>{SYM}{Number(ep.amount).toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}

        {/* Amortization Table */}
        <div className="print-section-title">{tr('amortTable')}</div>
        <table className="print-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{tr('month')}</th>
              <th style={{ textAlign: 'right' }}>{tr('payment')}</th>
              <th style={{ textAlign: 'right' }}>{tr('principal')}</th>
              <th style={{ textAlign: 'right' }}>{tr('interest')}</th>
              {extraPayments.length > 0 && <th style={{ textAlign: 'right' }}>{tr('extra')}</th>}
              <th style={{ textAlign: 'right' }}>{tr('balance')}</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map(function(row, i) {
              return (
                <tr key={row.month} className={i % 2 === 0 ? 'print-row-even' : ''}>
                  <td className="print-month-num">{row.month}</td>
                  <td>{row.label}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>{SYM}{fmt(row.payment)}</td>
                  <td style={{ textAlign: 'right' }}>{SYM}{fmt(row.principal)}</td>
                  <td style={{ textAlign: 'right', color: '#059669' }}>{SYM}{fmt(row.interest)}</td>
                  {extraPayments.length > 0 && (
                    <td style={{ textAlign: 'right', color: '#7c3aed' }}>
                      {row.extra > 0 ? (SYM + fmt(row.extra)) : '—'}
                    </td>
                  )}
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{SYM}{fmt(row.balance)}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="print-tfoot">
              <td colSpan={extraPayments.length > 0 ? 4 : 3}></td>
              <td style={{ textAlign: 'right', fontWeight: 700, color: '#059669' }}>{SYM}{fmt(totalInterest)}</td>
              {extraPayments.length > 0 && <td></td>}
              <td style={{ textAlign: 'right', fontWeight: 700 }}>{SYM}0</td>
            </tr>
          </tfoot>
        </table>

        {/* Footer */}
        <div className="print-footer">
          <div>{tr('disclaimer')}</div>
          <div className="print-footer-brand">ArmFinCredit — armfincredit.am</div>
        </div>

      </div>
    </div>
  )
}
