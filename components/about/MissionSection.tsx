import React from 'react';
import aboutData from '../../edit_content/pages/about.json';

const MissionSection: React.FC = () => {
  const mission = (aboutData as any)?.mission || {};
  return (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{(mission as any)?.sectionLabel || 'Our Mission & Values'}</h3><br></br>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-tn-black">
          {(mission as any)?.heading || 'Integrity, Service, and Excellence'}
        </h2>
        <div className="mt-6 max-w-3xl mx-auto">
          <p className="text-base sm:text-lg text-tn-gray leading-relaxed">
            {(mission as any)?.content || 'Our mission is to provide an unparalleled real estate experience built on a foundation of trust, comprehensive market knowledge, and an unwavering commitment to our clients\' success. We are dedicated to navigating every transaction with the highest level of professionalism and care, ensuring you always find your way home.'}
          </p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default MissionSection;
