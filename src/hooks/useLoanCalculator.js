// Custom hook for loan calculation logic
// Returns: { monthlyPayment, totalInterest }
window.useLoanCalculator = (amount, rate, term) => {
    const { useMemo } = React;

    const monthlyPayment = useMemo(() => {
        const r = rate / 100 / 12;
        const n = term;
        if (r === 0) return amount / n;
        return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }, [amount, rate, term]);

    const totalInterest = useMemo(() => {
        return (monthlyPayment * term) - amount;
    }, [monthlyPayment, term, amount]);

    return { monthlyPayment, totalInterest };
};
