const Navigation = ({ language = 'EN', setLanguage }) => {
    const location = ReactRouterDOM.useLocation();

    const linkClass = (path) =>
        `font-manrope font-bold text-lg tracking-tight transition-colors duration-300 ${
            location.pathname === path
            ? 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 pb-1'
            : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
        }`;

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm flex justify-between items-center px-4 md:px-8 h-20">
            <div className="text-xl md:text-2xl font-black text-blue-900 dark:text-blue-100 uppercase tracking-tighter font-headline">
                Editorial Fintech
            </div>
            <div className="hidden md:flex items-center space-x-8">
                <ReactRouterDOM.Link className={linkClass('/')} to="/">{window.t(language, 'navigation', 'calculator')}</ReactRouterDOM.Link>
                <ReactRouterDOM.Link className={linkClass('/schedule')} to="/schedule">{window.t(language, 'navigation', 'schedule')}</ReactRouterDOM.Link>
                <ReactRouterDOM.Link className={linkClass('/early')} to="/early">{window.t(language, 'navigation', 'earlyInfo')}</ReactRouterDOM.Link>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
                    {['AM','RU','EN'].map(lang => (
                        <button key={lang} onClick={() => setLanguage(lang)}
                            className={`px-2 py-1 text-[10px] font-bold rounded ${
                                language === lang ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-high'
                            }`}>{lang}</button>
                    ))}
                </div>
                <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-slate-50 transition-colors rounded-full">notifications</button>
                <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-slate-50 transition-colors rounded-full">account_circle</button>
                <button className="hidden md:block bg-primary text-on-primary px-6 py-2.5 rounded-xl font-headline font-bold scale-95 active:opacity-80 transition-transform">
                    {window.t(language, 'navigation', 'apply')}
                </button>
            </div>
        </nav>
    );
};
