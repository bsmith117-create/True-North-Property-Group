import React from 'react';
import { PageHeader } from '../components/shared/Header';
import ContactInfo from '../components/contact/ContactInfo';
import ContactHeaderImg from '../../media/ContactHeader.webp';
import contactData from '../../edit_content/pages/contact.yaml';

const ContactPage: React.FC = () => {
  const header = (contactData as any)?.header || {};
  return (
    <>
      <PageHeader
        backgroundImage={ContactHeaderImg}
        title={<>{(header as any)?.title || 'Get in'} <span className="text-tn-teal">{(header as any)?.titleHighlight || 'Touch'}</span></>
        }
        subtitle={(header as any)?.subtitle || 'We\'re here to answer your questions and help you with all your real estate needs.'}
      />
      <ContactInfo />
    </>
  );
};

export default ContactPage;