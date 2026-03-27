const SchedulePage = ({ language }) => {
    const { schedule, loanState, monthlyPayment, totalInterest, addExtraPayment, extraPayments } = React.useContext(window.LoanContext);
    const [extraAmount, setExtraAmount] = React.useState('');
    const [extraMonth, setExtraMonth]   = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const rowsPerPage = 12;
    const symbol = '֏';

    // Calculate savings vs no extra payments
    const baseSchedule = React.useMemo(() => {
        return window.generateAmortization(loanState.amount, loanState.rate, loanState.term, []).schedule;
    }, [loanState]);

    const monthsSaved = baseSchedule.length - schedule.length;
    const baseInterest = baseSchedule.reduce((s, r) => s + r.interest, 0);
    const interestSaved = baseInterest - totalInterest;

    const totalPages = Math.ceil(schedule.length / rowsPerPage);
    const pageRows   = schedule.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleAddExtra = () => {
        if (!extraAmount || Number(extraAmount) <= 0) return;
        addExtraPayment(Number(extraMonth), Number(extraAmount));
        setExtraAmount('');
    };

    // SVG amortization chart (balance over time)
    const chartPoints = React.useMemo(() => {
        if (!schedule.length) return '';
        const maxB = loanState.amount;
        const w = 400, h = 100;
        return schedule.map((row, i) => {
            const x = (i / (schedule.length - 1)) * w;
            const y = h - (row.balance / maxB) * h;
            return `${x},${y}`;
        }).join(' ');
    }, [schedule, loanState.amount]);

    const baseChartPoints = React.useMemo(() => {
        if (!baseSchedule.length) return '';
        const maxB = loanState.amount;
        const w = 400, h = 100;
        return baseSchedule.map((row, i) => {
            const x = (i / (baseSchedule.length - 1)) * w;
            const y = h - (row.balance / maxB) * h;
            return `${x},${y}`;
        }).join(' ');
    }, [baseSchedule, loanState.amount]);

    return (
        <div className="flex pt-20 min-h-screen">
            <Sidebar language={language} />
            <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto overflow-x-hidden">
                <header className="mb-10">
                    <h1 className="font-headline text-4xl font-extrabold text-on-surface dark:text-slate-100 tracking-tight mb-2">
                        {window.t(language, 'schedule', 'title')}
                    </h1>
                    <p className="font-body text-lg text-on-surface-variant dark:text-slate-400 max-w-2xl">{window.t(language, 'schedule', 'desc')}</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
                    {/* Early Payment Input */}
                    <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary text-3xl">speed</span>
                            <h2 className="font-headline text-xl font-bold text-on-surface dark:text-slate-100">{window.t(language, 'schedule', 'addEarly')}</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Month #</label>
                                <input
                                    type="number" min="1" max={loanState.term}
                                    value={extraMonth}
                                    onChange={e => setExtraMonth(e.target.value)}
                                    className="w-full bg-surface-container-low dark:bg-slate-800 border-none rounded-xl px-4 py-3 font-headline font-bold text-lg text-on-surface dark:text-white focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                                    {window.t(language, 'schedule', 'amount')}
                                </label>
                                <div className="flex items-center bg-surface-container-low dark:bg-slate-800 rounded-xl px-4 gap-2">
                                    <span className="text-on-surface-variant text-lg font-medium">{symbol}</span>
                                    <input
                                        type="number" min="1"
                                        value={extraAmount}
                                        onChange={e => setExtraAmount(e.target.value)}
                                        placeholder="500,000"
                                        className="flex-1 bg-transparent border-none focus:ring-0 font-headline font-bold text-xl text-on-surface dark:text-white py-3 outline-none"
                                    />
                                </div>
                            </div>
                            <button onClick={handleAddExtra}
                                className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline font-bold text-base hover:brightness-110 active:scale-[0.98] transition-all">
                                {window.t(language, 'schedule', 'apply')}
                            </button>
                            {extraPayments.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Applied Extra Payments</p>
                                    {extraPayments.map(ep => (
                                        <div key={ep.month} className="flex justify-between text-sm bg-secondary-container/30 dark:bg-green-900/20 rounded-lg px-3 py-2">
                                            <span className="text-on-surface dark:text-slate-300">Month {ep.month}</span>
                                            <span className="font-bold text-secondary dark:text-green-400">{symbol}{ep.amount.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Savings Forecast */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
                        <h2 className="font-headline text-xl font-bold text-on-surface dark:text-slate-100 mb-5">Savings Forecast</h2>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-primary/10 dark:bg-blue-900/20 p-4 rounded-xl">
                                <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Months Saved</div>
                                <div className="text-3xl font-headline font-extrabold text-primary dark:text-blue-400">
                                    {monthsSaved > 0 ? monthsSaved : '—'}
                                </div>
                            </div>
                            <div className="bg-secondary-container/30 dark:bg-green-900/20 p-4 rounded-xl">
                                <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Interest Saved</div>
                                <div className="text-2xl font-headline font-extrabold text-secondary dark:text-green-400">
                                    {interestSaved > 0 ? symbol + Math.round(interestSaved).toLocaleString() : '—'}
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <svg className="w-full" height="120" viewBox="0 0 400 100" preserveAspectRatio="none">
                                <polyline points={baseChartPoints} fill="none" stroke="#c3c6d6" strokeWidth="2" strokeDasharray="5"/>
                                <polyline points={chartPoints} fill="none" stroke="#003d9b" strokeWidth="3"/>
                            </svg>
                            <div className="flex gap-4 mt-2 text-[10px] text-on-surface-variant">
                                <div className="flex items-center gap-1"><span className="w-5 h-0.5 bg-slate-300 inline-block"></span> Original</div>
                                <div className="flex items-center gap-1"><span className="w-5 h-0.5 bg-primary inline-block"></span> With extra payments</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Amortization Table */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                        <h2 className="font-headline font-bold text-on-surface dark:text-slate-100">Full Amortization Schedule</h2>
                        <span className="text-xs text-on-surface-variant dark:text-slate-500 bg-surface-container-low dark:bg-slate-800 px-3 py-1 rounded-full">
                            {schedule.length} {window.t(language, 'schedule', 'month').toLowerCase()}s total
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-surface-container-low dark:bg-slate-800">
                                <tr>
                                    <th className="px-5 py-4 text-left text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">#</th>
                                    <th className="px-5 py-4 text-left text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{window.t(language, 'schedule', 'month')}</th>
                                    <th className="px-5 py-4 text-right text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{window.t(language, 'schedule', 'payment')}</th>
                                    <th className="px-5 py-4 text-right text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Principal</th>
                                    <th className="px-5 py-4 text-right text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Interest</th>
                                    <th className="px-5 py-4 text-right text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{window.t(language, 'schedule', 'balance')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageRows.map((row, i) => (
                                    <tr key={row.month}
                                        className={`border-t border-slate-50 dark:border-slate-800 hover:bg-primary-fixed/10 dark:hover:bg-blue-900/10 transition-colors ${
                                            row.extra > 0 ? 'bg-secondary-container/20 dark:bg-green-900/10' : ''
                                        }`}>
                                        <td className="px-5 py-4 font-bold text-primary dark:text-blue-400 text-xs">{row.month}</td>
                                        <td className="px-5 py-4 text-on-surface-variant dark:text-slate-400">{row.label}</td>
                                        <td className="px-5 py-4 text-right font-mono text-on-surface dark:text-slate-200">{symbol}{Math.round(row.payment).toLocaleString()}</td>
                                        <td className="px-5 py-4 text-right font-mono text-primary dark:text-blue-400">{symbol}{Math.round(row.principal).toLocaleString()}</td>
                                        <td className="px-5 py-4 text-right font-mono text-secondary dark:text-green-400">{symbol}{Math.round(row.interest).toLocaleString()}</td>
                                        <td className="px-5 py-4 text-right font-mono font-bold text-on-surface dark:text-white">{symbol}{Math.round(row.balance).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <button disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="flex items-center gap-1 text-sm font-bold text-primary disabled:opacity-30 hover:underline">
                                <span className="material-symbols-outlined text-sm">chevron_left</span> Prev
                            </button>
                            <span className="text-xs text-on-surface-variant dark:text-slate-500">
                                Page {currentPage} / {totalPages}
                            </span>
                            <button disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="flex items-center gap-1 text-sm font-bold text-primary disabled:opacity-30 hover:underline">
                                Next <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
