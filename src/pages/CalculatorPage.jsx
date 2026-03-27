const CalculatorPage = ({ language }) => {
    const { useState } = React;
    const navigate = ReactRouterDOM.useNavigate();
    const [amount, setAmount] = useState(5000000);
    const [rate, setRate]     = useState(12);
    const [term, setTerm]     = useState(24);
    const { monthlyPayment, totalInterest } = window.useLoanCalculator(amount, rate, term);
    const symbol = '֏';

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto w-full pt-28">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-2 font-headline">
                        {window.t(language, 'calculator', 'title')}
                    </h1>
                    <p className="text-xl text-on-surface-variant font-body">{window.t(language, 'calculator', 'desc')}</p>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Parameters Panel */}
                    <section className="lg:col-span-5 space-y-10">
                        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
                            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">
                                {window.t(language, 'calculator', 'param')}
                            </label>
                            {/* Loan Amount */}
                            <div className="mb-10">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-sm font-semibold text-on-surface">{window.t(language, 'calculator', 'loanAmt')}</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-headline font-bold text-on-surface">{amount.toLocaleString()}</span>
                                        <span className="text-on-surface-variant text-lg ml-1">{symbol}</span>
                                    </div>
                                </div>
                                <input className="w-full h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                                    max="100000000" min="100000" type="range" value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}/>
                            </div>
                            {/* Interest Rate */}
                            <div className="mb-10">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-sm font-semibold text-on-surface">{window.t(language, 'calculator', 'intRate')}</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-headline font-bold text-on-surface">{rate}</span>
                                        <span className="text-on-surface-variant text-xs ml-1">%</span>
                                    </div>
                                </div>
                                <input className="w-full h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                                    max="100" min="1" step="0.1" type="range" value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}/>
                            </div>
                            {/* Loan Term */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-sm font-semibold text-on-surface">{window.t(language, 'calculator', 'term')}</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-headline font-bold text-on-surface">{term}</span>
                                        <span className="text-on-surface-variant text-xs ml-1">{window.t(language, 'calculator', 'months')}</span>
                                    </div>
                                </div>
                                <input className="w-full h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary mb-4"
                                    max="100" min="1" type="range" value={term}
                                    onChange={(e) => setTerm(Number(e.target.value))}/>
                                <div className="grid grid-cols-3 gap-2">
                                    {[12, 24, 36].map(t => (
                                        <button key={t} onClick={() => setTerm(t)}
                                            className={`py-2 text-xs font-bold rounded-lg transition-colors ${
                                                term === t ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-variant'
                                            }`}>{t} {window.t(language, 'calculator', 'months')}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Results Panel */}
                    <section className="lg:col-span-7 space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-primary text-on-primary p-8 rounded-xl shadow-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <p className="text-xs uppercase tracking-widest opacity-70 mb-2">{window.t(language, 'calculator', 'monthly')}</p>
                                    <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter">
                                        {symbol}{Math.round(monthlyPayment).toLocaleString()}
                                    </h2>
                                </div>
                                <div className="absolute -right-10 -bottom-10 opacity-10">
                                    <span className="material-symbols-outlined text-[12rem]">account_balance</span>
                                </div>
                            </div>
                            <div className="bg-surface-container-highest p-8 rounded-xl">
                                <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2 font-bold">{window.t(language, 'calculator', 'totalInt')}</p>
                                <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-on-surface">
                                    {symbol}{Math.round(totalInterest).toLocaleString()}
                                </h2>
                                <div className="mt-6 flex items-center text-secondary font-bold text-sm">
                                    <span className="material-symbols-outlined mr-1">trending_down</span>
                                    <span>Institutional pricing applied</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate('/schedule')}
                                className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-headline font-bold text-lg hover:shadow-xl transition-all scale-95 active:scale-90 flex items-center justify-center space-x-3">
                                <span className="material-symbols-outlined">calendar_month</span>
                                <span>{window.t(language, 'calculator', 'scheduleBtn')}</span>
                            </button>
                            <button className="sm:w-1/3 bg-surface-container-high text-primary py-4 rounded-xl font-headline font-bold text-lg hover:bg-surface-variant transition-colors flex items-center justify-center space-x-2">
                                <span className="material-symbols-outlined">download</span>
                                <span>PDF</span>
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};
