const SchedulePage = ({ language }) => {
    const symbol = '֏';

    return (
        <div className="flex pt-20 min-h-screen">
            <Sidebar language={language} />
            <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2">
                        {window.t(language, 'schedule', 'title')}
                    </h1>
                    <p className="font-body text-lg text-on-surface-variant max-w-2xl">{window.t(language, 'schedule', 'desc')}</p>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    {/* Early Payment Input */}
                    <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/20">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary text-3xl">speed</span>
                            <h2 className="font-headline text-xl font-bold text-on-surface">{window.t(language, 'schedule', 'addEarly')}</h2>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">
                                    {window.t(language, 'schedule', 'amount')}
                                </label>
                                <div className="relative flex items-center bg-surface-container-low rounded-lg p-1">
                                    <span className="pl-4 pr-2 font-body font-medium text-on-surface-variant text-lg">{symbol}</span>
                                    <input className="w-full bg-transparent border-none focus:ring-0 font-headline font-bold text-2xl text-on-surface py-3"
                                        placeholder="5,000" type="number"/>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all">
                                {window.t(language, 'schedule', 'apply')}
                            </button>
                        </div>
                    </div>
                    {/* Savings Forecast */}
                    <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-8 relative overflow-hidden">
                        <h2 className="font-headline text-xl font-bold text-on-surface mb-4">Savings Forecast</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/40 glass-effect p-4 rounded-xl">
                                <div className="text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-widest mb-1">Time Saved</div>
                                <div className="text-2xl font-headline font-extrabold text-primary">4 Years</div>
                            </div>
                            <div className="bg-secondary-container/30 glass-effect p-4 rounded-xl">
                                <div className="text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-widest mb-1">Interest Saved</div>
                                <div className="text-2xl font-headline font-extrabold text-secondary">{symbol}14,208</div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <svg className="w-full h-32" preserveAspectRatio="none" viewBox="0 0 400 100">
                                <path d="M0 20 Q 200 40, 400 90" fill="none" stroke="#737685" strokeDasharray="6" strokeWidth="2"></path>
                                <path d="M0 20 Q 150 40, 300 90" fill="none" stroke="#003d9b" strokeWidth="4"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                {/* Amortization Table */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low">
                                <th className="px-8 py-5 font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{window.t(language, 'schedule', 'month')}</th>
                                <th className="px-8 py-5 font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{window.t(language, 'schedule', 'payment')}</th>
                                <th className="px-8 py-5 font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">{window.t(language, 'schedule', 'balance')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-primary-fixed/10 transition-colors">
                                <td className="px-8 py-6 font-headline font-bold">Mar 2024</td>
                                <td className="px-8 py-6 font-body">{symbol}2,450.00</td>
                                <td className="px-8 py-6 font-headline font-bold text-right">{symbol}343,879.55</td>
                            </tr>
                            <tr className="bg-surface-container-low/30 hover:bg-primary-fixed/10 transition-colors">
                                <td className="px-8 py-6 font-headline font-bold">Apr 2024</td>
                                <td className="px-8 py-6 font-body">{symbol}2,450.00</td>
                                <td className="px-8 py-6 font-headline font-bold text-right">{symbol}342,744.35</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};
