import React from 'react';
import { Link } from 'react-router-dom';
import sellersData from '../../edit_content/pages/sellers.json';

const SellerCosts: React.FC = () => {
    const defaultCosts = [
        { item: "Mortgage Payoff", description: "Current loan(s) and liens cleared at closing." },
        { item: "Commissions", description: "(3% listing, 3% buyer), fully negotiable." },
        { item: "Seller Subsidy", description: "Optional credit to buyer (1–3%) to help with closing costs." },
        { item: "Taxes & Fees", description: "Transfer taxes, title company fees, deed prep, etc." },
        { item: "HOA/Condo Fees", description: "Disclosure/resale packages, prorated dues, capital contributions (if required)." },
        { item: "Other Costs", description: "Repairs, moving company, and any admin fees." }
    ];
    const costsSection = (sellersData as any)?.costs || {};
    const costs = ((costsSection as any)?.costItems || []).length > 0 ? (costsSection as any)?.costItems : defaultCosts;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h3 className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{((costsSection as any)?.sectionLabel || 'Financial Clarity')}</h3><br></br>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-tn-black">{((costsSection as any)?.heading || 'Understanding Seller Costs')}</h2>
                </div>
                
                <div className="max-w-4xl mx-auto bg-tn-brown bg-opacity-10 p-8 rounded-lg shadow-md border border-tn-brown border-opacity-20">
                    <p className="text-base sm:text-lg text-tn-gray leading-relaxed mb-8">
                        {((costsSection as any)?.description || 'We\'ll walk you through every dollar so there are no surprises at the closing table.')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {costs.map((cost, index) => (
                            <div key={index} className="flex flex-col">
                                <h3 className="text-lg font-bold text-tn-teal">{cost.item || cost.title}</h3>
                                <p className="text-tn-gray">{cost.description}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                        <Link
                            to="/contact"
                            className="inline-block bg-tn-teal text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-colors duration-300 shadow-md"
                        >
                            {((costsSection as any)?.buttonText || 'Get Your Free Home Valuation')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellerCosts;
