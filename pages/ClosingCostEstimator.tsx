import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '../components/Header';
import ResourcesHeaderImg from '../media/ResourcesHeader.jpg';

const ClosingCostEstimator: React.FC = () => {
  // Inputs
  const [purchasePrice, setPurchasePrice] = useState<number | undefined>(undefined);
  const [downPaymentPct, setDownPaymentPct] = useState<number | undefined>(undefined); // %
  const [propertyTaxRatePct, setPropertyTaxRatePct] = useState<number | undefined>(undefined); // % of purchase price annually
  const [insuranceAnnual, setInsuranceAnnual] = useState<number | undefined>(undefined); // $/year
  const [transferTaxRatePct, setTransferTaxRatePct] = useState<number | undefined>(undefined); // % of purchase price
  const [lenderFees, setLenderFees] = useState<number | undefined>(undefined);
  const [titleEscrow, setTitleEscrow] = useState<number | undefined>(undefined);
  const [recordingFees, setRecordingFees] = useState<number | undefined>(undefined);
  const [hoaInitiation, setHoaInitiation] = useState<number | undefined>(undefined);

  // Derived
  const downPayment = useMemo(() => {
    if (purchasePrice === undefined || downPaymentPct === undefined) return 0;
    return purchasePrice * (downPaymentPct / 100);
  }, [purchasePrice, downPaymentPct]);
  
  const loanAmount = useMemo(() => {
    if (purchasePrice === undefined || downPayment === undefined) return 0;
    return Math.max(purchasePrice - downPayment, 0);
  }, [purchasePrice, downPayment]);

  // Prepaids/escrows (simple assumptions)
  const propertyTaxAnnual = useMemo(() => {
    if (purchasePrice === undefined || propertyTaxRatePct === undefined) return 0;
    return purchasePrice * (propertyTaxRatePct / 100);
  }, [purchasePrice, propertyTaxRatePct]);
  
  const propertyTaxEscrow = useMemo(() => {
    if (propertyTaxAnnual === undefined) return 0;
    return (propertyTaxAnnual / 12) * 6; // collect ~6 months
  }, [propertyTaxAnnual]);
  
  const insurancePrepaid = useMemo(() => insuranceAnnual || 0, [insuranceAnnual]); // 12 months upfront
  
  const transferTax = useMemo(() => {
    if (purchasePrice === undefined || transferTaxRatePct === undefined) return 0;
    return purchasePrice * (transferTaxRatePct / 100);
  }, [purchasePrice, transferTaxRatePct]);

  const estimatedClosingCosts = useMemo(() => {
    const sum = (lenderFees || 0) + (titleEscrow || 0) + (recordingFees || 0) + transferTax + propertyTaxEscrow + insurancePrepaid + (hoaInitiation || 0);
    return Math.max(sum, 0);
  }, [lenderFees, titleEscrow, recordingFees, transferTax, propertyTaxEscrow, insurancePrepaid, hoaInitiation]);

  const cashToClose = useMemo(() => downPayment + estimatedClosingCosts, [downPayment, estimatedClosingCosts]);

  const fmtMoney = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(isFinite(v) ? v : 0);

  return (
    <>
      <PageHeader
        backgroundImage={ResourcesHeaderImg}
        title={<>Closing Cost <span className="text-tn-teal">Estimator</span></>}
        subtitle="Estimate your closing costs and see an approximate cash-to-close based on your purchase details."
      />

      {/* Tool */}
      <section className="py-20 bg-tn-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left: Inputs */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-tn-teal mb-6">Enter Details</h2>
              <form className="space-y-5">
                <div>
                  <label htmlFor="purchasePrice" className="block text-sm font-medium text-tn-gray">Purchase Price</label>
                  <input id="purchasePrice" type="number" value={purchasePrice || ''} onChange={(e) => setPurchasePrice(e.target.value ? Number(e.target.value) : undefined)} placeholder="Enter purchase price" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="downPaymentPct" className="block text-sm font-medium text-tn-gray">Down Payment (%)</label>
                  <input id="downPaymentPct" type="number" step="0.1" value={downPaymentPct || ''} onChange={(e) => setDownPaymentPct(e.target.value ? Number(e.target.value) : undefined)} placeholder="Enter percentage" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="propertyTaxRatePct" className="block text-sm font-medium text-tn-gray">Property Tax Rate (%/yr)</label>
                    <input id="propertyTaxRatePct" type="number" step="0.01" value={propertyTaxRatePct || ''} onChange={(e) => setPropertyTaxRatePct(e.target.value ? Number(e.target.value) : undefined)} placeholder="e.g., 1.0" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="insuranceAnnual" className="block text-sm font-medium text-tn-gray">Homeowners Insurance ($/yr)</label>
                    <input id="insuranceAnnual" type="number" value={insuranceAnnual || ''} onChange={(e) => setInsuranceAnnual(e.target.value ? Number(e.target.value) : undefined)} placeholder="e.g., 1200" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="transferTaxRatePct" className="block text-sm font-medium text-tn-gray">Transfer/Grant Tax (% of price)</label>
                    <input id="transferTaxRatePct" type="number" step="0.01" value={transferTaxRatePct || ''} onChange={(e) => setTransferTaxRatePct(e.target.value ? Number(e.target.value) : undefined)} placeholder="e.g., 0.5" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="lenderFees" className="block text-sm font-medium text-tn-gray">Lender Fees ($)</label>
                    <input id="lenderFees" type="number" value={lenderFees || ''} onChange={(e) => setLenderFees(e.target.value ? Number(e.target.value) : undefined)} placeholder="e.g., 1500" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="titleEscrow" className="block text-sm font-medium text-tn-gray">Title/Escrow ($)</label>
                    <input id="titleEscrow" type="number" value={titleEscrow || ''} onChange={(e) => setTitleEscrow(e.target.value ? Number(e.target.value) : undefined)} placeholder="e.g., 1200" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="recordingFees" className="block text-sm font-medium text-tn-gray">Recording Fees ($)</label>
                    <input id="recordingFees" type="number" value={recordingFees || ''} onChange={(e) => setRecordingFees(e.target.value ? Number(e.target.value) : undefined)} placeholder="e.g., 300" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="hoaInitiation" className="block text-sm font-medium text-tn-gray">HOA Initiation ($)</label>
                    <input id="hoaInitiation" type="number" value={hoaInitiation || ''} onChange={(e) => setHoaInitiation(e.target.value ? Number(e.target.value) : undefined)} placeholder="If applicable" className="mt-1 block w-full py-2 px-3 border border-tn-gray bg-white rounded-md shadow-sm focus:outline-none focus:ring-tn-teal focus:border-tn-teal sm:text-sm" />
                  </div>
                </div>
              </form>
            </div>

            {/* Right: Results */}
            <div className="text-center p-8 bg-tn-teal text-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold">Estimated Closing Summary</h3>
              <div className="mt-6 grid grid-cols-1 gap-4 text-left">
                <div className="flex justify-between"><span className="font-semibold">Purchase Price:</span> <span>{fmtMoney(purchasePrice)}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Down Payment ({downPaymentPct}%):</span> <span>{fmtMoney(downPayment)}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Estimated Loan Amount:</span> <span>{fmtMoney(loanAmount)}</span></div>
                <hr className="border-white/30 my-2" />
                <div className="flex justify-between"><span className="font-semibold">Lender Fees:</span> <span>{fmtMoney(lenderFees)}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Title & Escrow:</span> <span>{fmtMoney(titleEscrow)}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Recording Fees:</span> <span>{fmtMoney(recordingFees)}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Transfer/Grant Tax:</span> <span>{fmtMoney(transferTax)}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Property Tax Escrow (≈6 mo):</span> <span>{fmtMoney(propertyTaxEscrow)}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Homeowners Insurance (12 mo):</span> <span>{fmtMoney(insurancePrepaid)}</span></div>
                {hoaInitiation > 0 && (
                  <div className="flex justify-between"><span className="font-semibold">HOA Initiation:</span> <span>{fmtMoney(hoaInitiation)}</span></div>
                )}
                <hr className="border-white/30 my-2" />
                <div className="flex justify-between text-lg"><span className="font-bold">Estimated Closing Costs:</span> <span className="font-bold text-tn-brown">{fmtMoney(estimatedClosingCosts)}</span></div>
                <div className="flex justify-between text-xl mt-2"><span className="font-extrabold">Estimated Cash to Close:</span> <span className="font-extrabold text-tn-brown">{fmtMoney(cashToClose)}</span></div>
              </div>
              <p className="text-xs text-gray-100 mt-6">
                Estimates are for planning purposes only. Actual costs vary by jurisdiction, lender, and property. Consult your lender and title company for a formal quote.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClosingCostEstimator;

