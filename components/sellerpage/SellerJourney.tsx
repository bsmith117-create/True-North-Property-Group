import React from 'react';
import sellersData from '../../edit_content/pages/sellers.json';

const SellerJourney: React.FC = () => {
    const journey = (sellersData as any)?.journey || {};
    const defaultPhases = [
        {
            title: "Phase 1: Walkthrough & Pricing",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            steps: [
                "In-home consultation to evaluate your property.",
                "Discuss pricing strategies and timing for listing.",
                "Build a personalized selling plan."
            ]
        },
        {
            title: "Phase 2: Preparing Your Home",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            steps: [
                "Declutter and stage key spaces.",
                "Improve curb appeal and touch up paint.",
                "Deep clean kitchens, bathrooms, and windows.",
                "Have professional photos taken of your home."
            ]
        },
        {
            title: "Phase 3: Marketing Your Home",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
            ),
            steps: [
                "Publish listing on MLS in \"Coming Soon\" and then \"Active\" Status",
                "Market on social media",
                "Make virtual tours available",
                "Conduct open houses"
            ]
        },
        {
            title: "Phase 4: Showings & Offers",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
            steps: [
                "Manage showings and collect buyer feedback.",
                "Review, negotiate, and accept the strongest offer.",
                "Ratify contract and move toward settlement."
            ]
        },
        {
            title: "Phase 5: Under Contract & Closing",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            steps: [
                "Coordinate inspections, appraisal, HOA documents, and title company.",
                "Manage contingencies and loan approval process.",
                "Final buyer walkthrough, utilities transfer, and closing day."
            ]
        }
    ];
    
    const phases = ((journey as any)?.phases || []).length > 0 ? (journey as any)?.phases.map((p: any) => ({
        ...p,
        icon: defaultPhases.find(dp => dp.title === p.title)?.icon || defaultPhases[0].icon
    })) : defaultPhases;

    return (
        <section className="py-20 bg-[#8B4513] bg-opacity-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h3 className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{((journey as any)?.sectionLabel || 'Your Path to a Successful Sale')}</h3><br></br>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-tn-black">{((journey as any)?.heading || 'The Home Selling Journey')}</h2>
                    <p className="mt-4 text-xl text-tn-gray">
                        {((journey as any)?.subheading || 'We guide you through every step of the process')}
                    </p>
                </div>
                
                <div className="relative">
                    {/* Timeline line */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-tn-teal"></div>
                    
                    {/* Timeline items */}
                    <div className="space-y-12">
                        {phases.map((phase, index) => (
                            <div key={index} className={`relative flex items-start md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                {/* Timeline dot */}
                                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-tn-teal"></div>
                                
                                {/* Content */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <div className="flex items-center mb-4">
                                            <div className="flex-shrink-0 mr-3 p-2 rounded-full bg-tn-brown bg-opacity-10 text-tn-brown">
                                                {phase.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-tn-teal">{phase.title}</h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {phase.steps.map((step, stepIndex) => (
                                                <li key={stepIndex} className="flex items-start">
                                                    <span className="text-tn-teal mr-2">•</span>
                                                    <span className="text-tn-gray">{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-16 bg-white border-l-4 border-tn-brown p-4 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-tn-brown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-tn-gray">
                                <strong>Important:</strong> The first 30 days are the most important — we'll make them count.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellerJourney;
