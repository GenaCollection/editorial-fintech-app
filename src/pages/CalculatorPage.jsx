const CalculatorPage = ({ language }) => {
    const { loanState, setLoanState, monthlyPayment, totalInterest, schedule } = React.useContext(window.LoanContext);
    const { amount, rate, term } = loanState;
    const navigate = ReactRouterDOM.useNavigate();
    const symbol = '֏';

    const setAmount = (v) => setLoanState(prev => ({ ...prev, amount: Number(v) }));
    const setRate   = (v) => setLoanState(prev => ({ ...prev, rate: Number(v) }));
    const setTerm   = (v) => setLoanState(prev => ({ ...prev, term: Number(v) }));

    // Validation helpers
    const handleAmountInput = (e) => {
        const v = Math.max(100000, Math.min(100000000, Number(e.target.value) || 100000));
        setAmount(v);
    };
    const handleRateInput = (e) => {
        const v = Math.max(0.1, Math.min(100, Number(e.target.value) || 0.1));
        setRate(v);
    };
    const handleTermInput = (e) => {
        const v = Math.max(1, Math.min(360, Number(e.target.value) || 1));
        setTerm(v);
    };

    const totalPayable = monthlyPayment * term;
    const principalPct = Math.round((amount / totalPayable) * 100);
    const interestPct  = 100 - principalPct;

    const handlePrint = () => window.print();

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full pt-28">
                <header className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface dark:text-slate-100 tracking-tight mb-2 font-headline">
                        {window.t(language, 'calculator', 'title')}
                    </h1>
                    <p className="text-xl text-on-surface-variant dark:text-slate-400 font-body">{window.t(language, 'calculator', 'desc')}</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* === Parameters Panel === */}
                    <section className="lg:col-span-5 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-500 mb-8">
                                {window.t(language, 'calculator', 'param')}
                            </p>

                            {/* Loan Amount */}
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-sm font-semibold text-on-surface dark:text-slate-300">{window.t(language, 'calculator', 'loanAmt')}</span>
                                    <div className="flex items-baseline gap-1">
                                        <input
                                            type="number" min="100000" max="100000000"
                                            value={amount}
                                            onChange={handleAmountInput}
                                            className="w-36 text-right text-2xl font-headline font-bold text-on-surface dark:text-white bg-transparent border-none outline-none focus:ring-0 p-0"
                                        />
                                        <span className="text-on-surface-variant text-lg">{symbol}</span>
                                    </div>
                                </div>
                                <input className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
                                    type="range" min="100000" max="100000000" step="100000"
                                    value={amount} onChange={(e) => setAmount(e.target.value)}/>
                                <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                                    <span>100K</span><span>100M {symbol}</span>
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-sm font-semibold text-on-surface dark:text-slate-300">{window.t(language, 'calculator', 'intRate')}</span>
                                    <div className="flex items-baseline gap-1">
                                        <input
                                            type="number" min="0.1" max="100" step="0.1"
                                            value={rate}
                                            onChange={handleRateInput}
                                            className="w-16 text-right text-2xl font-headline font-bold text-on-surface dark:text-white bg-transparent border-none outline-none focus:ring-0 p-0"
                                        />
                                        <span className="text-on-surface-variant text-sm">%</span>
                                    </div>
                                </div>
                                <input className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
                                    type="range" min="0.1" max="100" step="0.1"
                                    value={rate} onChange={(e) => setRate(e.target.value)}/>
                                <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                                    <span>0.1%</span><span>100%</span>
                                </div>
                            </div>

                            {/* Loan Term */}
                            <div>
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-sm font-semibold text-on-surface dark:text-slate-300">{window.t(language, 'calculator', 'term')}</span>
                                    <div className="flex items-baseline gap-1">
                                        <input
                                            type="number" min="1" max="360"
                                            value={term}
                                            onChange={handleTermInput}
                                            className="w-16 text-right text-2xl font-headline font-bold text-on-surface dark:text-white bg-transparent border-none outline-none focus:ring-0 p-0"
                                        />
                                        <span className="text-on-surface-variant text-xs">{window.t(language, 'calculator', 'months')}</span>
                                    </div>
                                </div>
                                <input className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary mb-4"
                                    type="range" min="1" max="360"
                                    value={term} onChange={(e) => setTerm(e.target.value)}/>
                                <div className="grid grid-cols-5 gap-2">
                                    {[6, 12, 24, 36, 60].map(t => (
                                        <button key={t} onClick={() => setTerm(t)}
                                            className={`py-2 text-xs font-bold rounded-lg transition-colors ${
                                                term === t
                                                ? 'bg-primary text-on-primary'
                                                : 'bg-surface-container-low dark:bg-slate-800 text-on-surface-variant hover:bg-surface-variant dark:hover:bg-slate-700'
                                            }`}>{t}</button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Principal vs Interest Bar */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-500 mb-4">Loan Breakdown</p>
                            <div className="flex rounded-full overflow-hidden h-3 mb-3">
                                <div className="bg-primary transition-all duration-500" style={{width: principalPct+'%'}}></div>
                                <div className="bg-secondary transition-all duration-500" style={{width: interestPct+'%'}}></div>
                            </div>
                            <div className="flex justify-between text-xs">
                                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span><span className="text-on-surface-variant dark:text-slate-400">Principal {principalPct}%</span></div>
                                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span><span className="text-on-surface-variant dark:text-slate-400">Interest {interestPct}%</span></div>
                            </div>
                        </div>
                    </section>

                    {/* === Results Panel === */}
                    <section className="lg:col-span-7 space-y-6">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="bg-primary text-on-primary p-8 rounded-2xl shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <p className="text-xs uppercase tracking-widest opacity-70 mb-2">{window.t(language, 'calculator', 'monthly')}</p>
                                    <h2 className="text-4xl font-black font-headline tracking-tighter">
                                        {symbol}{Math.round(monthlyPayment).toLocaleString()}
                                    </h2>
                                    <p className="text-xs opacity-60 mt-2">{window.t(language, 'calculator', 'months')}: {term}</p>
                                </div>
                                <div className="absolute -right-8 -bottom-8 opacity-10">
                                    <span className="material-symbols-outlined" style={{fontSize:'9rem'}}>account_balance</span>
                                </div>
                            </div>
                            <div className="bg-surface-container-highest dark:bg-slate-800 p-8 rounded-2xl">
                                <p className="text-xs uppercase tracking-widest text-on-surface-variant dark:text-slate-400 mb-2 font-bold">{window.t(language, 'calculator', 'totalInt')}</p>
                                <h2 className="text-3xl font-extrabold font-headline text-on-surface dark:text-white">
                                    {symbol}{Math.round(totalInterest).toLocaleString()}
                                </h2>
                                <div className="mt-4 flex items-center text-secondary font-bold text-sm">
                                    <span className="material-symbols-outlined mr-1 text-sm">trending_down</span>
                                    <span>Total payable: {symbol}{Math.round(totalPayable).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Amortization Mini Preview */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <span className="font-headline font-bold text-on-surface dark:text-slate-100">Schedule Preview</span>
                                <span className="text-xs text-on-surface-variant dark:text-slate-500">{schedule.length} payments</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-surface-container-low dark:bg-slate-800">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">#</th>
                                            <th className="px-6 py-3 text-left text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Date</th>
                                            <th className="px-6 py-3 text-right text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Payment</th>
                                            <th className="px-6 py-3 text-right text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedule.slice(0, 3).map((row, i) => (
                                            <tr key={i} className="border-t border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="px-6 py-3 font-bold text-primary dark:text-blue-400">{row.month}</td>
                                                <td className="px-6 py-3 text-on-surface-variant dark:text-slate-400">{row.label}</td>
                                                <td className="px-6 py-3 text-right font-mono text-on-surface dark:text-slate-200">{symbol}{Math.round(row.payment).toLocaleString()}</td>
                                                <td className="px-6 py-3 text-right font-mono font-bold text-on-surface dark:text-slate-100">{symbol}{Math.round(row.balance).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate('/schedule')}
                                className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-headline font-bold text-base hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-3">
                                <span className="material-symbols-outlined">calendar_month</span>
                                <span>{window.t(language, 'calculator', 'scheduleBtn')}</span>
                            </button>
                            <button onClick={handlePrint}
                                className="sm:w-40 bg-surface-container-high dark:bg-slate-800 text-primary dark:text-blue-400 py-4 rounded-xl font-headline font-bold hover:bg-surface-variant dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">print</span>
                                <span>Print / PDF</span>
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};
