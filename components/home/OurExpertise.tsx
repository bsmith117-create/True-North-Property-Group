
import React, { useState } from 'react';
import resultsBG from '../../media/resultsBG.jpg';
import homeData from '../../edit_content/pages/home.json';

const OurExpertise: React.FC = () => {
  const expertise = (homeData as any)?.ourExpertise || {};
  
  const defaultTestimonials = [
    {
      quote:
        "Tony and Brandon did an incredible job as our realtors. They worked with us for over a year as we constructed a new home. Since we lived out of the area it was difficult for us to visit the site. Tony and Brandon served as our representatives in nearly every phase of the project and updated us with text, calls, and videos. They even recorded meetings so that we could go back and review the information. I was so impressed with their assistance that I recommended them to my daughter. She is currently using them to facilitate the sale of her home and the purchase of a new home. If you're looking for a realtor team, you should definitely reach out to them. 5 stars!!",
      author: 'Dr. Mike Williams',
    },
    {
      quote:
        "Thanks again Tony Smith! It's crazy how an international move ended up being one of the most stress free relocations that we have had in over 20 years of globetrotting. The care and attention you put into ensuring we got into the best home for us was priceless. Even more impressive was the attention that you paid to us AFTER the ink was dry. You had no more obligations but you treated us as if we were your own family. We'll never forget all that you, Brandon and Tonja (and the Lyles family) did to help streamline our home buying process and dim our anxiety. You will forever be an important player for Team Reese!",
      author: 'Reese Family',
    },
    {
      quote:
        'Tony is the most professional person and agent I have ever met. He is very knowledgeable and care for his clients.',
      author: 'James Williams',
    },
    {
      quote:
        'Brandon is amazing. I purchased an investment property under appraised value through Brandon, an extraordinary feat in this market. As an investor, I am picky/ disciplined with the purchase, so have strict limit on how much I am willing to pay. Brandon was patient with me even though several bids fell short. Brandon also did all the virtual walkthrus for me, as I am not based in DC area, pointing out details both positive and negative about the different properties. Highly appreciate all the local expertise in the search/ walkthru process.',
      author: 'Shang Koo',
    },
  ];
  
  const testimonials = ((expertise as any)?.testimonials?.length > 0) ? (expertise as any)?.testimonials : defaultTestimonials;

  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const t = testimonials[index];

  return (
    <section className="relative py-20">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${resultsBG})` }}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-0 relative bg-white rounded-lg shadow p-8 sm:p-10">
          <div className="text-center">
            <h3 className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{(expertise as any)?.sectionLabel || 'OUR EXPERTISE'}</h3><br></br>
            <h2 className="mt-2 text-3xl font-extrabold text-tn-black sm:text-4xl">{(expertise as any)?.heading || 'Results You Can Trust'}</h2>
          </div>
          
          {/* Mobile: clamped and smaller text to fit without long scrolling */}
          <div className="mt-6 md:hidden">
            <blockquote
              className="text-base text-tn-gray leading-relaxed"
              style={{ display: '-webkit-box', WebkitLineClamp: 6 as any, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              "{t.quote}"
            </blockquote>
            <p className="mt-4 text-center font-semibold text-tn-black">— {t.author}</p>
          </div>

          {/* Tablet/Desktop: full text */}
          <div className="mt-6 hidden md:block">
            <blockquote className="text-xl text-tn-gray leading-relaxed">
              "{t.quote}"
            </blockquote>
            <p className="mt-6 text-center font-semibold text-tn-black">— {t.author}</p>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-tn-gray text-tn-gray hover:bg-tn-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="text-sm text-tn-gray">{index + 1} / {total}</div>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-tn-gray text-tn-gray hover:bg-tn-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L14 9.586a1 1 0 010 1.414l-5.293 5.293a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurExpertise;
