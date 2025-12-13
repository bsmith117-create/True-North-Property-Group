
import React from 'react';
import { PageHeader } from '../components/Header';
import BuyerAbout from '../components/buyerpage/BuyerAbout';
import BuyerJourney from '../components/buyerpage/BuyerJourney';
import BuyerPartner from '../components/buyerpage/BuyerPartner';
import BuyerPricing from '../components/buyerpage/BuyerPricing';
import BuyerHeaderImg from '../media/BuyerHeader.jpg';
import buyersData from '../edit_content/pages/buyers.json';

const BuyersPage: React.FC = () => {
  const header = (buyersData as any)?.header || {};
  return (
    <>
      <PageHeader 
        backgroundImage={BuyerHeaderImg}
        title={<>{(header as any)?.title || 'Buy a Home in'} <span className="text-tn-teal">{(header as any)?.titleHighlight || 'VA/DC/MD'}</span></>
        }
        subtitle={(header as any)?.subtitle || 'Your journey to homeownership starts here. Let us guide you every step of the way.'}
      />
      <BuyerAbout />
      <BuyerJourney />
      <BuyerPartner />
      <BuyerPricing />
    </>
  );
};

export default BuyersPage;
