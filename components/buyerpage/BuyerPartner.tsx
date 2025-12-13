import React from 'react';
import buyersData from '../../edit_content/pages/buyers.json';

const BuyerPartner: React.FC = () => {
    const defaultServices = [
        { title: "Exclusive Access", description: "Get access to on- and off-market properties that match your criteria, giving you a competitive edge." },
        { title: "Expert Negotiation", description: "Our agents are skilled negotiators who work to get you the best price and terms possible." },
        { title: "Seamless Process", description: "We handle the complexities, from paperwork to inspections, ensuring a stress-free experience." },
        { title: "Local Knowledge", description: "Leverage our deep understanding of local markets in VA, MD, and DC to find the perfect community for you." }
    ];
    const partner = (buyersData as any)?.partner || {};
    const services = ((partner as any)?.services || []).length > 0 ? (partner as any)?.services : defaultServices;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h3 className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{((partner as any)?.sectionLabel || 'Your Trusted Partner')}</h3><br></br>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-tn-black">{((partner as any)?.heading || 'Why Work With True North')}</h2>
                    <p className="mt-4 text-xl text-tn-gray">
                        {((partner as any)?.subheading || 'The right guide through every phase of your homebuying journey')}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map(service => (
                        <div key={service.title} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-tn-brown text-center">
                            <h3 className="text-xl font-bold text-tn-teal">{service.title}</h3>
                            <p className="mt-4 text-tn-gray">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BuyerPartner;