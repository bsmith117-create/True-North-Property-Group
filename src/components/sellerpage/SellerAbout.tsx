import React from 'react';
import sellersData from '../../../edit_content/pages/sellers.yaml';

const SellerAbout: React.FC = () => {
  const about = (sellersData as any)?.about || {};
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{(about as any)?.sectionLabel || 'Our Commitment to Sellers'}</h3><br></br>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-tn-black">{(about as any)?.heading || 'Maximize Your Return, Minimize Your Stress'}</h2>
          <div className="mt-6 max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-tn-gray leading-relaxed">
              {(about as any)?.content || 'Selling your home is a major decision. At True North Property Group, we are dedicated to providing you with a seamless, transparent, and profitable selling experience. We combine market expertise with innovative marketing to showcase your property to the right buyers at the right time.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerAbout;