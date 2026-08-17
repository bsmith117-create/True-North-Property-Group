import React from 'react';
import { PageHeader } from '../components/shared/Header';
import MissionSection from '../components/about/MissionSection';
import TeamSection from '../components/about/TeamSection';
import WhyChooseUsSection from '../components/about/WhyChooseUsSection';
import AboutCTA from '../components/about/AboutCTA';
import AboutUsHeaderImg from '../../media/AboutUsHeader.webp';
import aboutData from '../../edit_content/pages/about.yaml';

const AboutUsPage: React.FC = () => {
  const header = (aboutData as any)?.header || {};
  
  return (
    <>
      <PageHeader 
        backgroundImage={AboutUsHeaderImg}
        title={<>{(header as any)?.title || 'About'} <span className="text-tn-teal">{(header as any)?.titleHighlight || 'True North Property Group'}</span></>}
        subtitle={(header as any)?.subtitle || 'Your trusted guides in the journey of real estate.'}
      />
      <MissionSection />
      <TeamSection />
      <WhyChooseUsSection />
      <AboutCTA />
    </>
  );
};

export default AboutUsPage;