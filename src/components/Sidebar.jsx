const Sidebar = ({ language }) => {
    const linkClass = "flex items-center px-4 py-3 mx-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 hover:translate-x-1";
    const location = ReactRouterDOM.useLocation();
    const activeLinkClass = "flex items-center px-4 py-3 mx-2 text-primary dark:text-blue-400 bg-primary-fixed/60 dark:bg-blue-900/30 rounded-lg font-semibold";

    const getClass = (path) => location.pathname === path ? activeLinkClass : linkClass;

    return (
        <aside className="hidden lg:flex flex-col py-6 space-y-2 h-[calc(100vh-5rem)] w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 sticky top-20 shrink-0">
            <div className="px-6 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xl">account_balance</span>
                    </div>
                    <div>
                        <div className="text-sm font-bold tracking-wide text-on-surface dark:text-slate-100">{window.t(language, 'sidebar', 'planner')}</div>
                        <div className="text-[10px] text-on-surface-variant dark:text-slate-500 uppercase tracking-widest">{window.t(language, 'sidebar', 'access')}</div>
                    </div>
                </div>
            </div>
            <nav className="flex-1 space-y-1">
                <ReactRouterDOM.Link to="/" className={getClass('/')}>
                    <span className="material-symbols-outlined mr-3 text-xl">add_chart</span>
                    <span className="text-sm font-medium">{window.t(language, 'sidebar', 'newCalc')}</span>
                </ReactRouterDOM.Link>
                <ReactRouterDOM.Link to="/schedule" className={getClass('/schedule')}>
                    <span className="material-symbols-outlined mr-3 text-xl">calendar_month</span>
                    <span className="text-sm font-medium">{window.t(language, 'sidebar', 'history')}</span>
                </ReactRouterDOM.Link>
                <a href="#" className={linkClass}>
                    <span className="material-symbols-outlined mr-3 text-xl">bookmark</span>
                    <span className="text-sm font-medium">{window.t(language, 'sidebar', 'saved')}</span>
                </a>
                <a href="#" className={linkClass}>
                    <span className="material-symbols-outlined mr-3 text-xl">settings</span>
                    <span className="text-sm font-medium">{window.t(language, 'sidebar', 'settings')}</span>
                </a>
            </nav>
            <div className="px-6 py-4">
                <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-primary/20 active:scale-95 transition-all hover:brightness-110">
                    {window.t(language, 'sidebar', 'apply')}
                </button>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                <a className={linkClass} href="#">
                    <span className="material-symbols-outlined mr-3 text-xl">help</span>
                    <span className="text-sm font-medium">{window.t(language, 'sidebar', 'help')}</span>
                </a>
            </div>
        </aside>
    );
};
