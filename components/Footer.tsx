import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../media/logo_full.png';
import partnerLogo1 from '../media/PartnerLogo_1.jpg';
import partnerLogo2 from '../media/PartnerLogo_2.jpg';

const SocialIcon: React.FC<{ href: string; path: string }> = ({ href, path }) => (
    <a href={href} className="text-tn-gray hover:text-white transition-colors duration-300">
        <span className="sr-only">Social Media</span>
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d={path} />
        </svg>
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-tn-black text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-24 lg:gap-32">
                    <div className="space-y-2 lg:col-span-2">
                        {/* Top: Brand logo (fills container width to reduce right-side empty space) */}
                        <div className="flex items-center w-full">
                            <img src={logo} alt="True North Logo" className="w-full h-auto max-h-24 md:max-h-20 object-contain" />
                        </div>
                        {/* Bottom: Partner logos (flex and wrap, adjust within container) */}
                        <div className="flex flex-wrap items-center justify-center gap-6 w-full">
                            <img src={partnerLogo1} alt="Partner 1" className="h-auto max-h-12 md:max-h-14 max-w-52 w-auto object-contain" />
                            <img src={partnerLogo2} alt="Partner 2" className="h-auto max-h-12 md:max-h-14 max-w-52 w-auto object-contain" />
                        </div>
                        
                    </div>
                    <div className="mt-12 lg:mt-0 lg:col-span-2">
                        <div className="flex w-full flex-row items-start justify-center gap-8 lg:gap-12">
                            <div className="text-left">
                                <h3 className="text-sm font-semibold text-white tracking-wider uppercase pb-2 border-b-2 border-tn-brown inline-block">Services</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    <li><Link to="/buyers" className="text-base text-tn-white hover:text-white">Home Buying</Link></li>
                                    <li><Link to="/sellers" className="text-base text-tn-white hover:text-white">Home Selling</Link></li>
                                </ul>
                            </div>
                            <div className="text-left">
                                <h3 className="text-sm font-semibold text-white tracking-wider uppercase pb-2 border-b-2 border-tn-brown inline-block">Company</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    <li><Link to="/about" className="text-base text-tn-white hover:text-white">About Us</Link></li>
                                    <li><Link to="/contact" className="text-base text-tn-white hover:text-white">Contact Us</Link></li>
                                </ul>
                            </div>
                            <div className="text-left">
                                <h3 className="text-sm font-semibold text-white tracking-wider uppercase pb-2 border-b-2 border-tn-brown inline-block">Resources</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    <li><Link to="/mortgage-calculator" className="text-base text-tn-white hover:text-white">Mortgage Calculator</Link></li>
                                    <li><Link to="/closing-cost-estimator" className="text-base text-tn-white hover:text-white">Closing Cost Estimator</Link></li>
                                    <li><Link to="/financial-assessment" className="text-base text-tn-white hover:text-white">Financial Assessment</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-tn-brown pt-8">
                    <p className="text-base text-tn-white text-center">&copy; {new Date().getFullYear()} True North Property Group. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;