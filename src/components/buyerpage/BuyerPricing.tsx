import React from 'react';
import buyersData from '../../../edit_content/pages/buyers.yaml';

const BuyerPricing: React.FC = () => {
    const pricing = (buyersData as any)?.pricing || {};
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h3 className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{((pricing as any)?.sectionLabel || 'Financial Clarity')}</h3><br></br>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-tn-black">{((pricing as any)?.heading || 'Understanding Your Budget')}</h2>
                </div>
                
                <div className="max-w-4xl mx-auto bg-tn-brown/10 p-8 rounded-lg shadow-md border border-tn-brown/20">
                    <p className="text-base sm:text-lg text-tn-gray leading-relaxed">
                        {((pricing as any)?.description || 'We\'ll help familiarize you on all the costs associated with buying a home, from the earnest money deposit to closing costs, so when you talk to a lender you are better prepared to go into details to obtain your pre-approval letter and ultimately, your loan.')}
                    </p>
                    
                    <div className="mt-8 text-center">
                        <a
                            href={(pricing as any)?.lenderLink || 'https://www.atlanticcoastmortgage.com/lo/mike-schumacher/'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-tn-teal text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-colors duration-300 shadow-md"
                        >
                            {((pricing as any)?.buttonText || 'Connect with a Lender')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuyerPricing;