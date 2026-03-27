const App = () => {
    const { useState } = React;
    const [language, setLanguage] = useState('EN');

    return (
        <ReactRouterDOM.MemoryRouter>
            <div className="flex flex-col min-h-screen">
                <Navigation language={language} setLanguage={setLanguage} />
                <ReactRouterDOM.Routes>
                    <ReactRouterDOM.Route path="/" element={<CalculatorPage language={language} />} />
                    <ReactRouterDOM.Route path="/schedule" element={<SchedulePage language={language} />} />
                    <ReactRouterDOM.Route path="/early" element={<EarlyPage language={language} />} />
                </ReactRouterDOM.Routes>
                <Footer language={language} />
                {/* Mobile FAB */}
                <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center scale-95 active:opacity-80 transition-transform z-40">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </div>
        </ReactRouterDOM.MemoryRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
