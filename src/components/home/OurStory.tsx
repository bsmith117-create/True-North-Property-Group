
import React from 'react';
import whoWeAre from '../../../media/OurStory.webp';
import homeData from '../../../edit_content/pages/home.yaml';

const OurStory: React.FC = () => {
  const ourStory = (homeData as any)?.ourStory || {};
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text content from home.json */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{(ourStory as any)?.sectionLabel || 'OUR STORY'}</h3><br></br>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-tn-black">{(ourStory as any)?.heading || 'True North Property Group'}</h2>
            <p className="mt-2 text-lg sm:text-xl text-tn-gray">{(ourStory as any)?.subheading || 'Serving Virginia, Maryland, and Washington D.C.'}</p>
            {((ourStory as any)?.paragraphs || []).map((para: string, idx: number) => (
              <p key={para} className={`text-base sm:text-lg text-tn-gray leading-relaxed ${idx === 0 ? 'mt-6' : 'mt-4'}`}>
                {para}
              </p>
            ))}
          </div>

          {/* Right: Image (hidden on mobile) */}
          <div className="w-full hidden md:block">
            <img src={whoWeAre} alt="Who we are at True North Property Group" className="w-full h-auto rounded-lg shadow-md object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
