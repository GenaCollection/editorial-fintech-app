const Sidebar = ({ language }) => {
    const linkClass = "flex items-center px-4 py-3 mx-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-transform duration-200 hover:translate-x-1";

    return (
        <aside className="hidden lg:flex flex-col py-6 space-y-2 h-[calc(100vh-5rem)] w-64 border-r border-slate-200 bg-slate-50 sticky top-20">
            <div className="px-6 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary">
                        <span className="material-symbols-outlined">account_balance</span>
                    </div>
                    <div>
                        <div className="font-inter text-sm font-bold tracking-wide text-on-surface">{window.t(language, 'sidebar', 'planner')}</div>
                        <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">{window.t(language, 'sidebar', 'access')}</div>
                    </div>
                </div>
            </div>
            <nav className="flex-1 space-y-1">
                <ReactRouterDOM.Link to="/" className={linkClass}>
                    <span className="material-symbols-outlined mr-3">add_chart</span>
                    <span className="font-inter text-sm font-medium tracking-wide">{window.t(language, 'sidebar', 'newCalc')}</span>
                </ReactRouterDOM.Link>
                <a href="#" className={linkClass}><span className="material-symbols-outlined mr-3">history</span><span className="font-inter text-sm font-medium">{window.t(language, 'sidebar', 'history')}</span></a>
                <a href="#" className={linkClass}><span className="material-symbols-outlined mr-3">bookmark</span><span className="font-inter text-sm font-medium">{window.t(language, 'sidebar', 'saved')}</span></a>
                <a href="#" className={linkClass}><span className="material-symbols-outlined mr-3">settings</span><span className="font-inter text-sm font-medium">{window.t(language, 'sidebar', 'settings')}</span></a>
            </nav>
            <div className="px-6 py-4">
                <button className="w-full py-3 bg-secondary text-on-secondary rounded-xl font-bold text-sm tracking-wide shadow-lg active:scale-95 transition-all">
                    {window.t(language, 'sidebar', 'apply')}
                </button>
            </div>
            <div className="mt-auto border-t border-slate-200 pt-4">
                <a className={linkClass} href="#">
                    <span className="material-symbols-outlined mr-3">help</span>
                    <span className="font-inter text-sm font-medium">{window.t(language, 'sidebar', 'help')}</span>
                </a>
            </div>
        </aside>
    );
};
