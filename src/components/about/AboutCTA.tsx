import React from 'react';
import { Link } from 'react-router-dom';
import aboutData from '../../../edit_content/pages/about.yaml';

const AboutCTA: React.FC = () => {
  const cta = (aboutData as any)?.cta || {};
  return (
  <section className="bg-tn-teal">
    <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
        <span className="block">{(cta as any)?.heading || 'Ready to work with a team that cares?'}</span>
        <span className="block text-tn-black">{(cta as any)?.description || 'Let\'s start the conversation.'}</span>
      </h2>
      <Link
        to="/contact"
        className="mt-8 w-full inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-md shadow-sm text-base font-medium text-tn-black bg-tn-white hover:opacity-90 transition-opacity duration-300 sm:w-auto"
      >
        {(cta as any)?.buttonText || 'Contact Us'}
      </Link>
    </div>
  </section>
  );
};

export default AboutCTA;
