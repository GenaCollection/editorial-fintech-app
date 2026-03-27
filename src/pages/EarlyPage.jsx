const EarlyPage = ({ language }) => {
    const { loanState, monthlyPayment, totalInterest, schedule } = React.useContext(window.LoanContext);
    const symbol = '֏';

    // Calculate impact of different extra monthly amounts
    const scenarios = React.useMemo(() => {
        const extras = [50000, 100000, 200000];
        return extras.map(extraAmt => {
            const extraPayments = Array.from({length: loanState.term}, (_, i) => ({ month: i + 1, amount: extraAmt }));
            const { schedule: sc } = window.generateAmortization(loanState.amount, loanState.rate, loanState.term, extraPayments);
            const interest = sc.reduce((s, r) => s + r.interest, 0);
            const saved = totalInterest - interest;
            const monthsSaved = schedule.length - sc.length;
            return { extraAmt, months: sc.length, saved: Math.max(0, saved), monthsSaved: Math.max(0, monthsSaved) };
        });
    }, [loanState, totalInterest, schedule]);

    const labels = {
        title: { AM: 'Վաղաժամկետ մարման տեղեկատվություն', RU: 'Информация о досрочном погашении', EN: 'Early Repayment Intelligence' },
        desc:  { AM: 'Հասկացեք, թե ինչպես կրճատել ձեր վարկը:', RU: 'Узнайте, как каждый дополнительный платёж ускоряет погашение.', EN: 'Understand how every extra payment accelerates your loan maturity.' },
        extraMonthly: { AM: 'Լրացուցիչ ամսական', RU: 'Доп. ежемесячно', EN: 'Extra monthly' },
        termReduction: { AM: 'Ժամկետի կրճատում', RU: 'Сокращение срока', EN: 'Term reduction' },
        interestSaved: { AM: 'Խնայված տոկոս', RU: 'Экономия на %', EN: 'Interest saved' },
        months: { AM: 'ամիս', RU: 'мес.', EN: 'mo.' }
    };
    const l = (key) => labels[key]?.[language] || labels[key]?.EN || key;

    return (
        <div className="flex pt-20 min-h-screen">
            <Sidebar language={language} />
            <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="font-headline text-4xl font-extrabold text-on-surface dark:text-slate-100 tracking-tight mb-2">{l('title')}</h1>
                    <p className="text-on-surface-variant dark:text-slate-400 text-lg">{l('desc')}</p>
                </header>

                {/* Current Loan Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: 'Loan Amount',    value: symbol + loanState.amount.toLocaleString(), icon: 'payments' },
                        { label: 'Monthly Payment',value: symbol + Math.round(monthlyPayment).toLocaleString(), icon: 'calendar_today' },
                        { label: 'Total Interest', value: symbol + Math.round(totalInterest).toLocaleString(), icon: 'percent' },
                        { label: 'Total Payments', value: schedule.length, icon: 'format_list_numbered' }
                    ].map(item => (
                        <div key={item.label} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
                            <span className="material-symbols-outlined text-primary dark:text-blue-400 mb-2 block">{item.icon}</span>
                            <div className="text-xl font-headline font-extrabold text-on-surface dark:text-white">{item.value}</div>
                            <div className="text-xs text-on-surface-variant dark:text-slate-500 mt-1">{item.label}</div>
                        </div>
                    ))}
                </div>

                {/* Scenarios Table */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden mb-8">
                    <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="font-headline font-bold text-on-surface dark:text-slate-100">Extra Payment Scenarios</h2>
                        <p className="text-xs text-on-surface-variant dark:text-slate-500 mt-1">What if you add a fixed extra amount every month?</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-surface-container-low dark:bg-slate-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{l('extraMonthly')}</th>
                                    <th className="px-6 py-4 text-right text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">New Term</th>
                                    <th className="px-6 py-4 text-right text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{l('termReduction')}</th>
                                    <th className="px-6 py-4 text-right text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{l('interestSaved')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scenarios.map((sc, i) => (
                                    <tr key={i} className="border-t border-slate-50 dark:border-slate-800 hover:bg-primary-fixed/10 dark:hover:bg-blue-900/10 transition-colors">
                                        <td className="px-6 py-4 font-headline font-bold text-on-surface dark:text-slate-100">
                                            +{symbol}{sc.extraAmt.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right text-on-surface dark:text-slate-300">{sc.months} {l('months')}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400 font-bold px-2 py-1 rounded-lg text-xs">
                                                -{sc.monthsSaved} {l('months')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-headline font-bold text-secondary dark:text-green-400">
                                            {sc.saved > 0 ? symbol + Math.round(sc.saved).toLocaleString() : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-secondary-container dark:bg-green-900/30 p-8 rounded-2xl flex flex-col justify-between h-56">
                        <span className="material-symbols-outlined text-secondary dark:text-green-400 text-4xl">verified</span>
                        <div>
                            <p className="text-on-secondary-container dark:text-green-100 font-black text-xl leading-tight">Lowest APR Guarantee</p>
                            <p className="text-on-secondary-container/70 dark:text-green-300/70 text-sm mt-2">Institutional pricing applied to your loan.</p>
                        </div>
                    </div>
                    <div className="bg-surface-container-highest dark:bg-slate-800 p-8 rounded-2xl flex flex-col justify-between h-56">
                        <span className="material-symbols-outlined text-primary dark:text-blue-400 text-4xl">support_agent</span>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-400 mb-2">Expert Advice</p>
                            <p className="text-on-surface dark:text-slate-100 font-bold">Talk to a Loan Specialist today</p>
                            <button className="mt-3 text-xs font-bold text-primary dark:text-blue-400 hover:underline">Contact us →</button>
                        </div>
                    </div>
                    <div className="bg-primary-fixed dark:bg-blue-950 p-8 rounded-2xl flex flex-col justify-between h-56">
                        <span className="material-symbols-outlined text-primary dark:text-blue-300 text-4xl">trending_up</span>
                        <div>
                            <p className="text-primary dark:text-blue-200 font-black text-xl leading-tight">Market Analytics</p>
                            <p className="text-on-primary-fixed-variant dark:text-blue-400 text-sm mt-2">Real-time interest rate tracking.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
