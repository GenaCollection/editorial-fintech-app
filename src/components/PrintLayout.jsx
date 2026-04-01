import React from 'react'
import { t } from '../i18n/labels.js'

var SYM = '\u058f'
function fmt(n) { return Math.round(n).toLocaleString() }
function fmtR(n) { return Number(n).toFixed(2) }

// All styles INLINE — html2pdf clones this node.
// wrapStyle hides element from UI without clipping its rendered size.
// CRITICAL: do NOT use overflow:hidden or height:0/1px here —
// html2canvas measures the element's full rendered dimensions on the clone.
var wrapStyle = {
  position: 'absolute',
  left: '-9999px',
  top: 0,
  width: '900px',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: -1,
  visibility: 'hidden'
}

var S = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    fontSize: '9pt',
    lineHeight: 1.45,
    color: '#1e293b',
    background: '#ffffff',
    width: '900px',
    padding: '32px 20px',
    boxSizing: 'border-box'
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '10pt'
  },
  logo: { display: 'flex', alignItems: 'center', gap: '8pt' },
  brand: { fontSize: '16pt', fontWeight: 800, letterSpacing: '-0.03em', color: '#1d4ed8' },
  meta: { textAlign: 'right', color: '#64748b', fontSize: '8pt' },
  metaTag: { fontSize: '7pt', color: '#94a3b8', marginTop: '2pt' },
  divider: { border: 'none', borderTop: '1.5pt solid #1d4ed8', margin: '8pt 0 14pt' },
  sectionTitle: {
    fontSize: '8pt', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.08em', color: '#64748b',
    margin: '14pt 0 6pt', paddingBottom: '3pt',
    borderBottom: '0.5pt solid #e2e8f0'
  },
  paramsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '6pt', marginBottom: '4pt'
  },
  param: {
    background: '#f8fafc', border: '0.5pt solid #e2e8f0',
    borderRadius: '4pt', padding: '6pt 8pt'
  },
  paramLabel: {
    display: 'block', fontSize: '7pt', color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2pt'
  },
  paramValue: { display: 'block', fontSize: '10pt', fontWeight: 700, color: '#0f172a' },
  summaryGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '6pt', marginBottom: '4pt'
  },
  summaryCard: {
    border: '0.5pt solid #e2e8f0', borderRadius: '4pt',
    padding: '7pt 8pt', background: '#f8fafc'
  },
  summaryCardAccent: {
    background: '#1d4ed8', border: '0.5pt solid #1d4ed8',
    borderRadius: '4pt', padding: '7pt 8pt'
  },
  summaryLabel: {
    fontSize: '7pt', color: '#64748b', textTransform: 'uppercase',
    letterSpacing: '0.06em', marginBottom: '3pt'
  },
  summaryLabelW: {
    fontSize: '7pt', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase',
    letterSpacing: '0.06em', marginBottom: '3pt'
  },
  summaryValue: { fontSize: '12pt', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' },
  summaryValueW: { fontSize: '12pt', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' },
  summarySub: { fontSize: '7pt', color: '#94a3b8', marginTop: '2pt' },
  summarySubW: { fontSize: '7pt', color: 'rgba(255,255,255,0.6)', marginTop: '2pt' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '8pt', marginBottom: '4pt' },
  thead: { background: '#1d4ed8' },
  th: {
    padding: '5pt 6pt', fontWeight: 700, textAlign: 'left',
    fontSize: '7pt', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff'
  },
  thR: {
    padding: '5pt 6pt', fontWeight: 700, textAlign: 'right',
    fontSize: '7pt', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff'
  },
  tr: { pageBreakInside: 'avoid' },
  td:        { padding: '3.5pt 6pt', borderBottom: '0.3pt solid #f1f5f9', color: '#334155' },
  tdR:       { padding: '3.5pt 6pt', borderBottom: '0.3pt solid #f1f5f9', color: '#334155', textAlign: 'right' },
  tdEven:    { padding: '3.5pt 6pt', borderBottom: '0.3pt solid #f1f5f9', color: '#334155', background: '#f8fafc' },
  tdEvenR:   { padding: '3.5pt 6pt', borderBottom: '0.3pt solid #f1f5f9', color: '#334155', background: '#f8fafc', textAlign: 'right' },
  tdNum:     { padding: '3.5pt 6pt', borderBottom: '0.3pt solid #f1f5f9', fontWeight: 700, color: '#1d4ed8' },
  tdNumEven: { padding: '3.5pt 6pt', borderBottom: '0.3pt solid #f1f5f9', fontWeight: 700, color: '#1d4ed8', background: '#f8fafc' },
  tdGreen:     { padding: '3.5pt 6pt', borderBottom: '0.3pt solid #f1f5f9', color: '#059669', textAlign: 'right' },
  tdGreenEven: { padding: '3.5pt 6pt', borderBottom: '0.3pt solid #f1f5f9', color: '#059669', textAlign: 'right', background: '#f8fafc' },
  tfootTd: {
    padding: '5pt 6pt', borderTop: '1pt solid #cbd5e1',
    background: '#f1f5f9', fontSize: '8pt', fontWeight: 700
  },
  footer: {
    marginTop: '14pt', paddingTop: '8pt',
    borderTop: '0.5pt solid #e2e8f0', fontSize: '7pt', color: '#94a3b8',
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12pt'
  },
  footerBrand: { fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }
}

export default function PrintLayout(props) {
  var loanState     = props.loanState
  var schedule      = props.schedule
  var monthlyPayment = props.monthlyPayment
  var totalInterest = props.totalInterest
  var totalPayment  = props.totalPayment
  var apr           = props.apr
  var extraPayments = props.extraPayments || []
  var lang          = props.lang || 'EN'

  var isDiff       = loanState.loanType === 'differentiated'
  var firstPayment = schedule.length > 0 ? schedule[0].payment : monthlyPayment
  var lastPayment  = schedule.length > 0 ? schedule[schedule.length - 1].payment : monthlyPayment
  var today = new Date().toLocaleDateString(
    lang === 'AM' ? 'hy-AM' : lang === 'RU' ? 'ru-RU' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  var lbl = {
    generatedOn: { AM: 'Ստեղծված:', RU: 'Дата:', EN: 'Generated:' },
    disclaimer: {
      AM: 'Այս հաշվարկի կրի տեղեկատվական բնույթ և չի հանդիսանում ֆինանսական խորհրդատվություն:',
      RU: 'Этот расчёт носит информационный характер и не является финансовым советом.',
      EN: 'This calculation is for informational purposes only and does not constitute financial advice.'
    },
    loanParams: { AM: 'Վարկի Պարամետրներ', RU: 'Параметры кредита', EN: 'Loan Parameters' },
    summary:    { AM: 'Արդյունքներ', RU: 'Результаты', EN: 'Summary' },
    amortTable: { AM: 'Ամortizaciayi Grafik', RU: 'График платежей', EN: 'Amortization Schedule' },
    earlyPay:   { AM: 'Արտահերթ Վճարումներ', RU: 'Досрочные платежи', EN: 'Early Payments' },
    month:      { AM: 'Ամիս', RU: 'Мес.', EN: 'Mo.' },
    date:       { AM: 'Ամsathiv', RU: 'Дата', EN: 'Date' },
    payment:    { AM: 'Վճարում', RU: 'Платёж', EN: 'Payment' },
    principal:  { AM: 'Մայր Գումար', RU: 'Осн. долг', EN: 'Principal' },
    interest:   { AM: 'Տոկոս', RU: 'Проценты', EN: 'Interest' },
    extra:      { AM: 'Լրաց.', RU: 'Доп.', EN: 'Extra' },
    balance:    { AM: 'Մնachorд', RU: 'Остаток', EN: 'Balance' }
  }
  function tr(k) { return (lbl[k] && lbl[k][lang]) || (lbl[k] && lbl[k]['EN']) || k }

  return (
    <div id="print-layout" style={wrapStyle}>
      <div style={S.page}>

        {/* Header */}
        <div style={S.header}>
          <div style={S.logo}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#1d4ed8"/>
              <path d="M8 10h10a6 6 0 0 1 0 12H8V10z" fill="white"/>
              <path d="M8 10v12" stroke="#1d4ed8" strokeWidth="2"/>
              <circle cx="18" cy="16" r="3" fill="#1d4ed8"/>
            </svg>
            <span style={S.brand}>ArmFinCredit</span>
          </div>
          <div style={S.meta}>
            <div>{tr('generatedOn')} {today}</div>
            <div style={S.metaTag}>armfincredit.am</div>
          </div>
        </div>

        <hr style={S.divider} />

        {/* Loan Parameters */}
        <div style={S.sectionTitle}>{tr('loanParams')}</div>
        <div style={S.paramsGrid}>
          <div style={S.param}>
            <span style={S.paramLabel}>{t(lang,'calc','amount')}</span>
            <span style={S.paramValue}>{SYM}{fmt(loanState.amount)}</span>
          </div>
          <div style={S.param}>
            <span style={S.paramLabel}>{t(lang,'calc','rate')}</span>
            <span style={S.paramValue}>{fmtR(loanState.rate)}%</span>
          </div>
          <div style={S.param}>
            <span style={S.paramLabel}>{t(lang,'calc','term')}</span>
            <span style={S.paramValue}>{loanState.term} {t(lang,'calc','months')}</span>
          </div>
          <div style={S.param}>
            <span style={S.paramLabel}>{t(lang,'calc','type')}</span>
            <span style={S.paramValue}>{isDiff ? t(lang,'calc','diff') : t(lang,'calc','annuity')}</span>
          </div>
          {loanState.fee > 0 && (
            <div style={S.param}>
              <span style={S.paramLabel}>{t(lang,'adv','fee')}</span>
              <span style={S.paramValue}>{SYM}{fmt(loanState.fee)}</span>
            </div>
          )}
          {loanState.insurance > 0 && (
            <div style={S.param}>
              <span style={S.paramLabel}>{t(lang,'adv','insurance')}</span>
              <span style={S.paramValue}>{SYM}{fmt(loanState.insurance)}</span>
            </div>
          )}
        </div>

        {/* Summary */}
        <div style={S.sectionTitle}>{tr('summary')}</div>
        <div style={S.summaryGrid}>
          <div style={S.summaryCardAccent}>
            <div style={S.summaryLabelW}>{t(lang,'calc','monthly')}</div>
            <div style={S.summaryValueW}>{SYM}{fmt(isDiff ? firstPayment : monthlyPayment)}</div>
            {isDiff && <div style={S.summarySubW}>{t(lang,'calc','firstDown')} {SYM}{fmt(lastPayment)}</div>}
          </div>
          <div style={S.summaryCard}>
            <div style={S.summaryLabel}>{t(lang,'calc','totalInt')}</div>
            <div style={S.summaryValue}>{SYM}{fmt(totalInterest)}</div>
          </div>
          <div style={S.summaryCard}>
            <div style={S.summaryLabel}>{t(lang,'calc','total')}</div>
            <div style={S.summaryValue}>{SYM}{fmt(totalPayment)}</div>
          </div>
          <div style={S.summaryCard}>
            <div style={S.summaryLabel}>APR</div>
            <div style={S.summaryValue}>{fmtR(apr)}%</div>
            <div style={S.summarySub}>{t(lang,'calc','effRate')}</div>
          </div>
        </div>

        {/* Early payments */}
        {extraPayments.length > 0 && (
          <>
            <div style={S.sectionTitle}>{tr('earlyPay')}</div>
            <table style={{ ...S.table, marginBottom: '12pt' }}>
              <thead style={S.thead}>
                <tr>
                  <th style={S.th}>{tr('month')}</th>
                  <th style={S.thR}>{SYM}</th>
                </tr>
              </thead>
              <tbody>
                {extraPayments.map(function(ep, i) {
                  var even = i % 2 === 0
                  return (
                    <tr key={ep.month} style={S.tr}>
                      <td style={even ? S.tdEven : S.td}>{ep.month}</td>
                      <td style={{ ...(even ? S.tdEvenR : S.tdR), fontWeight: 700 }}>{SYM}{Number(ep.amount).toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}

        {/* Amortization Table */}
        <div style={S.sectionTitle}>{tr('amortTable')}</div>
        <table style={S.table}>
          <thead style={S.thead}>
            <tr>
              <th style={S.th}>#</th>
              <th style={S.th}>{tr('date')}</th>
              <th style={S.thR}>{tr('payment')}</th>
              <th style={S.thR}>{tr('principal')}</th>
              <th style={S.thR}>{tr('interest')}</th>
              {extraPayments.length > 0 && <th style={S.thR}>{tr('extra')}</th>}
              <th style={S.thR}>{tr('balance')}</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map(function(row, i) {
              var even = i % 2 === 0
              return (
                <tr key={row.month} style={S.tr}>
                  <td style={even ? S.tdNumEven : S.tdNum}>{row.month}</td>
                  <td style={even ? S.tdEven : S.td}>{row.label}</td>
                  <td style={{ ...(even ? S.tdEvenR : S.tdR), fontWeight: 700 }}>{SYM}{fmt(row.payment)}</td>
                  <td style={even ? S.tdEvenR : S.tdR}>{SYM}{fmt(row.principal)}</td>
                  <td style={even ? S.tdGreenEven : S.tdGreen}>{SYM}{fmt(row.interest)}</td>
                  {extraPayments.length > 0 && (
                    <td style={{ ...(even ? S.tdEvenR : S.tdR), color: '#7c3aed' }}>
                      {row.extra > 0 ? (SYM + fmt(row.extra)) : '\u2014'}
                    </td>
                  )}
                  <td style={{ ...(even ? S.tdEvenR : S.tdR), fontWeight: 600 }}>{SYM}{fmt(row.balance)}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr style={S.tr}>
              <td colSpan={extraPayments.length > 0 ? 4 : 3} style={S.tfootTd}></td>
              <td style={{ ...S.tfootTd, color: '#059669', textAlign: 'right' }}>{SYM}{fmt(totalInterest)}</td>
              {extraPayments.length > 0 && <td style={S.tfootTd}></td>}
              <td style={{ ...S.tfootTd, textAlign: 'right' }}>{SYM}0</td>
            </tr>
          </tfoot>
        </table>

        {/* Footer */}
        <div style={S.footer}>
          <div>{tr('disclaimer')}</div>
          <div style={S.footerBrand}>ArmFinCredit &mdash; armfincredit.am</div>
        </div>

      </div>
    </div>
  )
}
