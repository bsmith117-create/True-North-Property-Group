import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/Header';
import ResourcesHeaderImg from '../media/ResourcesHeader.jpg';

const MortgageCalculatorPage: React.FC = () => {
  const [homePrice, setHomePrice] = useState<number | undefined>(undefined);
  const [downPayment, setDownPayment] = useState<number | undefined>(undefined);
  const [interestRate, setInterestRate] = useState<number | undefined>(undefined);
  const [loanTerm, setLoanTerm] = useState<number>(30); // Keep default loan term
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const calculatePayment = () => {
      // Handle undefined values with safe defaults
      const safeHomePrice = homePrice || 0;
      const safeDownPayment = downPayment || 0;
      const safeInterestRate = interestRate || 0;
      
      const principal = safeHomePrice - safeDownPayment;
      const monthlyInterestRate = (safeInterestRate / 100) / 12;
      const numberOfPayments = loanTerm * 12;

      if (principal > 0 && monthlyInterestRate > 0) {
        const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
        const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
        const payment = principal * (numerator / denominator);
        setMonthlyPayment(payment);
      } else {
        setMonthlyPayment(0);
      }
    };
    calculatePayment();
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatPayment = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  return (
    <>
        <PageHeader
            backgroundImage={ResourcesHeaderImg}
            title={<>Mortgage <span className="text-tn-teal">Calculator</span></>}
            subtitle="Estimate your monthly mortgage payment and discover your buying power."
        />

        <section className="py-20 bg-tn-light">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-tn-teal mb-6">Payment Calculator</h2>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="homePrice" className="block text-sm font-medium text-tn-gray">Home Price</label>
                                <input type="number" id="homePrice" value={homePrice || ''} onChange={(e) => setHomePrice(e.target.value ? Number(e.target.value) : undefined)} placeholder="Enter home price" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="downPayment" className="block text-sm font-medium text-tn-gray">Down Payment</label>
                                <input type="number" id="downPayment" value={downPayment || ''} onChange={(e) => setDownPayment(e.target.value ? Number(e.target.value) : undefined)} placeholder="Enter down payment" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="interestRate" className="block text-sm font-medium text-tn-gray">Interest Rate (%)</label>
                                <input type="number" step="0.01" id="interestRate" value={interestRate || ''} onChange={(e) => setInterestRate(e.target.value ? Number(e.target.value) : undefined)} placeholder="e.g., 6.5" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="loanTerm" className="block text-sm font-medium text-tn-gray">Loan Term (Years)</label>
                                <select id="loanTerm" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm">
                                    <option>30</option>
                                    <option>20</option>
                                    <option>15</option>
                                    <option>10</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="text-center p-8 bg-tn-teal text-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-white">Estimated Monthly Payment</h3>
                        <p className="text-5xl font-bold text-tn-brown my-4">{formatPayment(monthlyPayment)}</p>
                        <div className="space-y-2 text-left mt-6 pt-6 border-t border-white/30">
                           <div className="flex justify-between"><span className="font-semibold">Principal & Interest:</span> <span>{formatPayment(monthlyPayment)}</span></div>
                           <div className="flex justify-between"><span className="font-semibold">Loan Amount:</span> <span>{formatCurrency(homePrice - downPayment)}</span></div>
                        </div>
                        <p className="text-xs text-gray-100 mt-6">* This is an estimate and does not include taxes, insurance, or PMI. Please consult a lender for an official quote.</p>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default MortgageCalculatorPage;