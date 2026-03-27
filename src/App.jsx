const App = () => {
    const { useState } = React;
    const [language, setLanguage] = useState('EN');

    return (
        <window.LoanProvider>
            <ReactRouterDOM.MemoryRouter>
                <div className="flex flex-col min-h-screen bg-background dark:bg-slate-950 transition-colors duration-300">
                    <Navigation language={language} setLanguage={setLanguage} />
                    <ReactRouterDOM.Routes>
                        <ReactRouterDOM.Route path="/" element={<CalculatorPage language={language} />} />
                        <ReactRouterDOM.Route path="/schedule" element={<SchedulePage language={language} />} />
                        <ReactRouterDOM.Route path="/early" element={<EarlyPage language={language} />} />
                    </ReactRouterDOM.Routes>
                    <Footer language={language} />
                    {/* Mobile FAB — navigate to schedule */}
                    <ReactRouterDOM.Link to="/schedule"
                        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-40">
                        <span className="material-symbols-outlined">calendar_month</span>
                    </ReactRouterDOM.Link>
                </div>
            </ReactRouterDOM.MemoryRouter>
        </window.LoanProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
