const EarlyPage = ({ language }) => {
    const symbol = '֏';
    const isAm = language === 'AM';
    const isRu = language === 'RU';

    return (
        <div className="flex pt-20 min-h-screen">
            <Sidebar language={language} />
            <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2">
                        {isAm ? 'Վաղաժամկետ մարման տեղեկատվություն' : isRu ? 'Информация о досрочном погашении' : 'Early Repayment Intelligence'}
                    </h1>
                    <p className="text-on-surface-variant text-lg">Understand how every extra payment accelerates your loan maturity.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-secondary-container p-8 rounded-xl flex flex-col justify-between h-64">
                        <span className="material-symbols-outlined text-secondary text-4xl">verified</span>
                        <div>
                            <p className="text-on-secondary-container font-black text-xl leading-tight">Lowest APR Guarantee</p>
                            <p className="text-on-secondary-container/70 text-sm mt-2">Institutional pricing applied.</p>
                        </div>
                    </div>
                    <div className="bg-surface-container-highest p-8 rounded-xl flex flex-col justify-between h-64 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Expert Advice</p>
                            <p className="text-on-surface font-bold">Talk to a Loan Specialist today</p>
                        </div>
                        <div className="flex -space-x-3 mt-4 relative z-10">
                            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByavrB0JBDe-QiqpOocx9d2zgCPopu8OLkAU_OIt1yzyhei_lm98QiF2ycUZwG85VolzP7ZtjJ5TKQtEKcB5MN8ZzxfAv8kpgMUWhIskYTqwpqnA1TkQH1riKeJyiP0wUm-EkTKkDxU5oLhXXq8CyLmKW7nvzsx_a-WfF9I5gwjqqa2mCY32m7KfKuW724hlNUQannTemm82dH4YhZZFtWxK6M8PMXvx2SDuCntWIzH4zm1lXt5KUj5zHYneDkTyLjX7bTwKct26A" alt="Specialist 1" />
                            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJD4Y3b9x88ptBhMGimg-6XzLuBW2ygwGdqQHw4auko-2w1jF6hFcZxu-bemFEegygA4Rewu-S_1mtM9wk4Ibw3zUg-xA6rzRXXS92o8pswzmx9ktSTrVAAByWX97NfEmm_p7pMkNRwKJgLm4h3hdt2bD7QHQyfWYQ2ZUR3bmMvmP251TLH3APLcn4a5JKpbiZeiJRxIuq8Di42bsa5n8U_J7tqX8dq0i5pck2TXryhH6mlEw34CiJwP59PZLxmtpjbnTyLb5tDaM" alt="Specialist 2" />
                        </div>
                    </div>
                    <div className="bg-primary-fixed p-8 rounded-xl flex flex-col justify-between h-64">
                        <span className="material-symbols-outlined text-primary text-4xl">trending_up</span>
                        <div>
                            <p className="text-primary font-black text-xl leading-tight">Market Analytics</p>
                            <p className="text-on-primary-fixed-variant text-sm mt-2">Real-time interest rate tracking.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
