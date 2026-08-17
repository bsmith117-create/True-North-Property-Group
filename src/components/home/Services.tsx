import React from 'react';
import { Link } from 'react-router-dom';
import homeData from '../../../edit_content/pages/home.yaml';

const Services: React.FC = () => {
  const services = (homeData as any)?.services || {};
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{(services as any)?.sectionLabel || 'OUR SERVICES'}</h3><br></br>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-tn-black">{(services as any)?.heading || 'Finding Your Perfect Match'}</h2>
          <p className="mt-2 text-lg sm:text-xl text-tn-gray max-w-3xl mx-auto">
            {(services as any)?.subheading || "Whether you're buying your dream home or selling your property, we're here to guide you every step of the way."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Buyers Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-tn-brown text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-tn-black mb-3">{(services as any)?.buyers?.title || 'For Buyers'}</h3>
              <p className="text-base sm:text-lg text-tn-gray leading-relaxed mb-6">
                {(services as any)?.buyers?.description || "Finding your perfect home is a journey, and we're here to make it smooth and enjoyable. Our buyer services include personalized property searches, neighborhood insights, and guidance through every step of the closing process."}
              </p>
              <ul className="mb-8 space-y-3 text-tn-gray">
                {((services as any)?.buyers?.features || []).map((feature: string) => (
                  <li key={feature} className="flex items-center">
                    <svg className="h-5 w-5 text-tn-brown mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/buyers" className="inline-block px-6 py-3 bg-tn-brown text-white font-medium rounded-md hover:bg-tn-brown/90 transition-colors duration-300">
                Learn More
              </Link>
            </div>
          </div>

          {/* Sellers Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-tn-teal text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-tn-black mb-3">{(services as any)?.sellers?.title || 'For Sellers'}</h3>
              <p className="text-base sm:text-lg text-tn-gray leading-relaxed mb-6">
                {(services as any)?.sellers?.description || "Selling your home should be a rewarding experience. We provide comprehensive marketing strategies, professional staging advice, and skilled negotiation to ensure you get the best possible value for your property."}
              </p>
              <ul className="mb-8 space-y-3 text-tn-gray">
                {((services as any)?.sellers?.features || []).map((feature: string) => (
                  <li key={feature} className="flex items-center">
                    <svg className="h-5 w-5 text-tn-teal mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/sellers" className="inline-block px-6 py-3 bg-tn-teal text-white font-medium rounded-md hover:bg-tn-teal/90 transition-colors duration-300">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
