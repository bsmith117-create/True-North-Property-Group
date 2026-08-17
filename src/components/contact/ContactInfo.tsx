import React from 'react';
import ContactForm from './ContactForm';
import contactData from '../../../edit_content/pages/contact.yaml';

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tn-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tn-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tn-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

const ContactInfo: React.FC = () => {
  const contactInfo = (contactData as any)?.contactInfo || {};

  return (
    <div className="bg-white py-12 px-4 sm:py-16 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <div>
          <h2 className="text-2xl font-extrabold text-tn-black sm:text-3xl">{(contactInfo as any)?.heading || 'Contact Us'}</h2>
          <div className="mt-3">
            <p className="text-lg text-tn-gray">
              {(contactInfo as any)?.description || 'Reach out by phone or email and our team will respond within 24 hours.'}
            </p>
          </div>
          <div className="mt-9">
            <div className="flex">
              <div className="shrink-0">
                <PhoneIcon />
              </div>
              <div className="ml-3 text-base text-tn-gray">
                <p>{((contactInfo as any)?.phone?.value || '(703) 672-0374')}</p>
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="shrink-0">
                <MailIcon />
              </div>
              <div className="ml-3 text-base text-tn-gray">
                {((contactInfo as any)?.email?.value || 'Bsmith@tnpghomes.com | Tsmith@tnpghomes.com').split(' | ').map((email: string) => (
                  <p key={email}>{email}</p>
                ))}
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="shrink-0">
                <LocationIcon />
              </div>
              <div className="ml-3 text-base text-tn-gray">
                <p>{((contactInfo as any)?.office?.address || '4391 Ridgewood Center Dr, Woodbridge, VA 22192')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 lg:mt-0">
          <div className="lg:pl-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ContactInfo;
