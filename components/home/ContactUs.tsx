
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IMG1 from '../../media/IMG_1.jpg';
import IMG2 from '../../media/IMG_2.jpg';
import IMG3 from '../../media/IMG_3.jpeg';
import IMG4 from '../../media/IMG_4.jpeg';
import IMG5 from '../../media/IMG_5.jpg';
import homeData from '../../edit_content/pages/home.json';

const ContactUs: React.FC = () => {
  const contactUs = (homeData as any)?.contactUs || {};
  const images = [IMG1, IMG2, IMG3, IMG4, IMG5];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          {/* Left: Auto-playing slideshow (no controls) */}
          <div className="relative w-full h-96 sm:h-[30rem] md:h-[36rem] rounded-lg overflow-hidden shadow md:col-span-3">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
              />)
            )}
          </div>

          {/* Right: Content from home.json */}
          <div className="md:col-span-2">
            <div className="text-left">
              <p className="text-sm font-semibold tracking-widest text-tn-gray uppercase">{(contactUs as any)?.sectionLabel || 'Contact us'}</p>
              <h2 className="mt-2 text-3xl font-extrabold text-tn-black sm:text-4xl">{(contactUs as any)?.heading || 'Leading You Home with Trust and Care.'}</h2>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-block bg-tn-brown text-white font-bold py-4 px-10 rounded-lg text-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg uppercase tracking-wider text-center w-full sm:w-auto">{(contactUs as any)?.primaryButtonText || 'Get in touch'}</Link>
              <Link to="/about" className="inline-block border border-white text-tn-black font-bold py-4 px-10 rounded-lg text-lg hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300 shadow-lg uppercase tracking-wider text-center w-full sm:w-auto">{(contactUs as any)?.secondaryButtonText || 'Learn more'}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
