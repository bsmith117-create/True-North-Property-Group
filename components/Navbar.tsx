import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoFull from '../media/logo_full.png';
import logoSingle from '../media/logo_single.png';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  // Show/hide on scroll state
  const [showNav, setShowNav] = useState(true);
  const lastScrollYRef = useRef(0);
  // Timer to delay closing of the Resources submenu so it doesn't disappear
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = (delay = 250) => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsResourcesOpen(false);
    }, delay);
  };
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);

  // Detect scroll direction to toggle navbar visibility
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      // Always show when near the top
      if (currentY <= 10) {
        setShowNav(true);
      } else {
        // Add a small threshold to avoid jitter
        if (currentY > lastScrollYRef.current + 5) {
          // scrolling down
          setShowNav(false);
        } else if (currentY < lastScrollYRef.current - 5) {
          // scrolling up
          setShowNav(true);
        }
      }
      lastScrollYRef.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
//---------------------------
  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Buyers', path: '/buyers' },
    { name: 'Sellers', path: '/sellers' },
    { name: 'About Us', path: '/about' },
  ];

  const resourceLinks = [
    { name: 'Mortgage Calculator', path: '/mortgage-calculator' },
    { name: 'Closing Cost Estimator', path: '/closing-cost-estimator' },
    { name: 'Financial Assessment', path: '/financial-assessment' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsResourcesOpen(false);
    setIsMobileResourcesOpen(false);
  }

  return (
    <nav className={`bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 transform transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" onClick={handleLinkClick} className="flex-shrink-0 flex items-center space-x-2">
              {/* Mobile logo */}
              <img src={logoSingle} alt="True North Property Group" className="h-10 w-auto md:hidden" />
              {/* Desktop/tablet logo */}
              <img src={logoFull} alt="True North Property Group" className="hidden md:block h-12 md:h-14 w-56 md:w-72 object-contain" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {mainLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={handleLinkClick} className={`${location.pathname === link.path ? 'bg-tn-brown text-white' : 'text-tn-gray'} hover:bg-tn-brown hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300`}>
                  {link.name}
                </Link>
              ))}
              <div
                className="relative"
                onMouseEnter={() => { clearCloseTimer(); setIsResourcesOpen(true); }}
                onMouseLeave={() => scheduleClose(250)}
              >
                <button
                  type="button"
                  className="text-tn-gray hover:bg-tn-brown hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center"
                  aria-haspopup="true"
                  aria-expanded={isResourcesOpen}
                >
                  Resources
                  <svg className={`ml-2 h-5 w-5 transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {isResourcesOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    onMouseEnter={clearCloseTimer}
                    onMouseLeave={() => scheduleClose(200)}
                  >
                    <div className="py-1" role="none">
                      {resourceLinks.map((link) => (
                         <Link key={link.name} to={link.path} onClick={handleLinkClick} className={`${location.pathname === link.path ? 'bg-tn-brown text-white' : 'text-tn-gray'} hover:bg-tn-brown hover:text-white block px-4 py-2 text-sm`} role="menuitem">
                           {link.name}
                         </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link to="/contact" onClick={handleLinkClick} className="bg-tn-brown text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:opacity-90">
                Contact
              </Link>
            </div>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-black border-2 border-black hover:text-white hover:bg-tn-brown hover:border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded={isOpen}>
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {mainLinks.map((link) => (
               <Link key={link.name} to={link.path} onClick={handleLinkClick} className={`${location.pathname === link.path ? 'bg-tn-brown text-white' : 'text-tn-gray'} hover:bg-tn-brown hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300`}>
                {link.name}
              </Link>
            ))}
            <div>
              <button onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)} className="w-full text-left text-tn-gray hover:bg-tn-brown hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 flex justify-between items-center">
                Resources
                <svg className={`h-5 w-5 transition-transform duration-200 ${isMobileResourcesOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isMobileResourcesOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {resourceLinks.map((link) => (
                     <Link key={link.name} to={link.path} onClick={handleLinkClick} className={`${location.pathname === link.path ? 'bg-tn-brown text-white' : 'text-tn-gray'} hover:bg-tn-brown hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300`}>
                       {link.name}
                     </Link>
                  ))}
                </div>
              )}
            </div>
             <Link to="/contact" onClick={handleLinkClick} className="bg-tn-brown text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:opacity-90">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;