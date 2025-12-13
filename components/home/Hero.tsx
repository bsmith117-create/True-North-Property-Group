
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroVideo1 from '../../media/herovid1.mp4';
import heroVideo2 from '../../media/herovid2.mp4';
import heroVideo3 from '../../media/herovid3.mp4';
import homeData from '../../edit_content/pages/home.json';

interface HeroProps {
  videoSrc?: string; // optional video source URL
}

const Hero: React.FC<HeroProps> = ({ videoSrc }) => {
  const hero = (homeData as any)?.hero || {};
  const callouts = (hero as any)?.callouts || ['Buyers', 'Sellers'];
  
  // Prepare the rotating list of sources (use the three local files)
  const sources = useMemo(() => [heroVideo1, heroVideo2, heroVideo3], []);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0); // which video element is visible
  const activeLayerRef = useRef<0 | 1>(0);
  const videoRefs = [useRef<HTMLVideoElement | null>(null), useRef<HTMLVideoElement | null>(null)];

  useEffect(() => {
    let currentIndex = 0;
    const visible = videoRefs[0].current;
    const hidden = videoRefs[1].current;

    const tryPlay = (el: HTMLVideoElement | null) => {
      if (!el) return;
      const p = el.play();
      if (p && typeof (p as any).catch === 'function') {
        (p as Promise<void>).catch(() => {/* ignore autoplay block */});
      }
    };

    // Initialize first visible video
    if (visible) {
      visible.src = sources[currentIndex];
      visible.currentTime = 0;
      visible.muted = true;
      (visible as any).playsInline = true;
      tryPlay(visible);
    }

    // Preload next video in the hidden layer
    if (hidden) {
      hidden.src = sources[(currentIndex + 1) % sources.length];
      hidden.muted = true;
      (hidden as any).playsInline = true;
      hidden.load();
    }

    const FADE_MS = 900; // must match the Tailwind duration-700 below
    const SLIDE_MS = 5000; // each video displays for 4.5 seconds

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % sources.length;
      const showLayer = (activeLayerRef.current === 0 ? 1 : 0) as 0 | 1;
      const showEl = videoRefs[showLayer].current;
      const hideEl = videoRefs[activeLayerRef.current].current;

      if (showEl) {
        showEl.src = sources[nextIndex];
        showEl.currentTime = 0;
        showEl.muted = true;
        (showEl as any).playsInline = true;
        tryPlay(showEl);
      }

      // Trigger cross-fade by swapping the active layer
      setActiveLayer(showLayer);
      activeLayerRef.current = showLayer;

      // Optionally pause the now-hidden video after fade completes
      setTimeout(() => {
        if (hideEl) hideEl.pause();
      }, FADE_MS + 50);

      currentIndex = nextIndex;
    }, SLIDE_MS);

    return () => clearInterval(interval);
  }, [sources]);

  return (
    <section className="relative h-[calc(100vh-5rem)]">
      {/* Video background with crossfade */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Layer 0 */}
        <video
          ref={videoRefs[0]}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeLayer === 0 ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          playsInline
          preload="auto"
          loop
          crossOrigin="anonymous"
        />
        {/* Layer 1 */}
        <video
          ref={videoRefs[1]}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${activeLayer === 1 ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          playsInline
          preload="auto"
          loop
          crossOrigin="anonymous"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-tn-dark bg-opacity-60 z-10"></div>

      {/* Foreground content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center z-20">
        <div className="text-left w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {(hero as any)?.title || 'Find Your Way Home with'} <span className="text-tn-teal">{(hero as any)?.titleHighlight || 'True North'}</span>
          </h1>
          <p className="mt-6 text-xl text-tn-white max-w-3xl">
            {(hero as any)?.subtitle || 'Helping clients buy and sell homes in Virginia, Maryland, and Washington D.C.'}
          </p>
          <div className="mt-10 flex items-center gap-4">
            {callouts.length > 0 && callouts[0] && (
              <Link
                to="/buyers"
                className="inline-block bg-tn-brown text-white font-bold py-4 px-10 rounded-lg text-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {callouts[0]}
              </Link>
            )}
            {callouts.length > 1 && callouts[1] && (
              <Link
                to="/sellers"
                className="inline-block border border-white text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-white hover:text-tn-teal transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {callouts[1]}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
