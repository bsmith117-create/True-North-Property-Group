import React from 'react';
import { PageHeader } from '../components/Header';
import SellerAbout from '../components/sellerpage/SellerAbout';
import SellerBenefits from '../components/sellerpage/SellerBenefits';
import SellerJourney from '../components/sellerpage/SellerJourney';
import SellerCosts from '../components/sellerpage/SellerCosts';
import SellerHeaderImg from '../media/SellerHeader.jpg';
import sellersData from '../edit_content/pages/sellers.json';

const SellersPage: React.FC = () => {
  const header = (sellersData as any)?.header || {};
  return (
    <>
      <PageHeader 
        backgroundImage={SellerHeaderImg}
        title={<>{(header as any)?.title || 'Sell Your Home with'} <span className="text-tn-teal">{(header as any)?.titleHighlight || 'Confidence'}</span></>
        }
        subtitle={(header as any)?.subtitle || 'Achieve the best possible outcome with our expert guidance and strategic marketing.'}
      />
      <SellerAbout />
      <SellerJourney />
      <SellerBenefits />
      <SellerCosts />
    </>
  );
};

export default SellersPage;