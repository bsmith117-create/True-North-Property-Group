import React from 'react';
import sellersData from '../../../edit_content/pages/sellers.yaml';

const defaultBenefits = [
    { title: "Expert Pricing & Strategy", description: "We conduct a comprehensive market analysis to price your home competitively for maximum return." },
    { title: "Professional Marketing Exposure", description: "Our targeted marketing strategies ensure your property reaches a wide audience of qualified buyers." },
    { title: "Skilled Negotiations", description: "We advocate for your best interests, skillfully negotiating offers to achieve your financial goals." },
    { title: "Transaction Management from Start to Finish", description: "Our team manages the entire closing process, ensuring all details are handled for a timely and smooth transaction." }
];

const SellerBenefits: React.FC = () => {
    const benefitsSection = (sellersData as any)?.benefits || {};
    const benefits = ((benefitsSection as any)?.benefits || []).length > 0 ? (benefitsSection as any)?.benefits : defaultBenefits;
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h3 className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{((benefitsSection as any)?.sectionLabel || 'Your Trusted Partner')}</h3><br></br>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-tn-black">{((benefitsSection as any)?.heading || 'Why Work With True North')}</h2>
                    <p className="mt-4 text-xl text-tn-gray">
                        {((benefitsSection as any)?.description || 'The right guide through every phase of your home selling journey')}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit: any) => (
                        <div key={benefit.title} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-tn-brown text-center">
                            <h3 className="text-xl font-bold text-tn-teal">{benefit.title}</h3>
                            <p className="mt-4 text-tn-gray">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SellerBenefits;