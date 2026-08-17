import React from 'react';
import aboutData from '../../../edit_content/pages/about.yaml';

const CheckIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

const defaultFeatures = ["Client-First Philosophy", "Unmatched Local Expertise", "Data-Driven Strategies", "A Network of Trusted Professionals", "Commitment to Community", "Transparent Communication"];

const WhyChooseUsSection: React.FC = () => {
    const whyChooseUs = (aboutData as any)?.whyChooseUs || {};
    const reasons = ((whyChooseUs as any)?.reasons || []).length > 0 ? (whyChooseUs as any)?.reasons : defaultFeatures.map(title => ({ title, description: '' }));

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h3 className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{((whyChooseUs as any)?.sectionLabel || 'What Sets Us Apart')}</h3><br></br>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-tn-black">{((whyChooseUs as any)?.heading || 'The True North Difference')}</h2>
                    <p className="mt-4 text-xl text-tn-gray">
                        {((whyChooseUs as any)?.description || 'We are more than just agents; we are your partners in real estate.')}
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason: any) => (
                        <div key={reason.title} className="flex items-start">
                            <div className="shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-tn-teal text-white">
                                    <CheckIcon />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg leading-6 font-medium text-tn-black">{reason.title}</h3>
                                {reason.description && <p className="mt-2 text-sm text-tn-gray">{reason.description}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
