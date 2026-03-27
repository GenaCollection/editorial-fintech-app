const Footer = ({ language }) => {
    return (
        <footer className="w-full py-12 px-8 bg-slate-100 border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <div className="font-manrope font-extrabold text-slate-400 mb-4">EDITORIAL FINTECH</div>
                    <p className="font-inter text-xs text-slate-500 uppercase tracking-widest leading-loose">
                        {window.t(language, 'footer', 'rights')}
                    </p>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
                    {['privacy','terms','disclosures','support'].map(key => (
                        <a key={key} className="font-inter text-xs text-slate-400 hover:text-blue-500 uppercase tracking-widest transition-opacity opacity-80" href="#">
                            {window.t(language, 'footer', key)}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};
