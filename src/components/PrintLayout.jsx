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
  var today = new Date().toLocaleDateString(
    lang === 'AM' ? 'hy-AM' : lang === 'RU' ? 'ru-RU' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  var lbl = {
    generatedOn: { AM: 'Ստեղծված:', RU: 'Дата создания:', EN: 'Generated on:' },
    disclaimer:  {
      AM: 'Այս հաշվարկը կրում է տեղեկատվական բնույթ և չի հանդիսանում ֆինանսական խորհրդատվություն:',
      RU: 'Этот расчёт носит информационный характер и не является финансовым советом.',
      EN: 'This calculation is for informational purposes only and does not constitute financial advice.'
    },
    loanParams:  { AM: 'Վարկի Պարամետրեր', RU: 'Параметры кредита', EN: 'Loan Parameters' },
    summary:     { AM: 'Արդյունքներ', RU: 'Результаты', EN: 'Summary' },
    amortTable:  { AM: 'Ամորտիզացիայի Գրաֆիկ', RU: 'График платежей', EN: 'Amortization Schedule' },
    earlyPay:    { AM: 'Վաղաժամկետ Վճարումներ', RU: 'Досрочные платежи', EN: 'Early Payments' },
    month:       { AM: 'Ամիս', RU: 'Мес.', EN: 'Mo.' },
    payment:     { AM: 'Վճար', RU: 'Платёж', EN: 'Payment' },
    principal:   { AM: 'Մայր Գումար', RU: 'Осн. долг', EN: 'Principal' },
    interest:    { AM: 'Տոկոս', RU: 'Проценты', EN: 'Interest' },
    extra:       { AM: 'Լրաց.', RU: 'Доп.', EN: 'Extra' },
    balance:     { AM: 'Մնացորդ', RU: 'Остаток', EN: 'Balance' }
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
                      {row.extra > 0 ? (SYM + fmt(row.extra)) : '\u2014'}
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
          <div className="print-footer-brand">ArmFinCredit \u2014 armfincredit.am</div>
        </div>

      </div>
    </div>
  )
}
