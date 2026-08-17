import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoFull from '../../../media/LogoFull.webp';
import logoSingle from '../../../media/LogoSingle.webp';
import resourcesData from '../../../edit_content/pages/resources.yaml';

const mainLinks = [
  { name: 'Home', path: '/' },
  { name: 'Buyers', path: '/buyers' },
  { name: 'Sellers', path: '/sellers' },
  { name: 'About Us', path: '/about' },
];


const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  // Show/hide on scroll state
  const [showNav, setShowNav] = useState(true);
  const lastScrollYRef = useRef(0);


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
  const handleLinkClick = () => {
    setIsOpen(false);
  }

  const resourcesEnabled = !!(resourcesData && (resourcesData as any).enabled);
  const resourcePaths = ['/mortgage-calculator', '/closing-cost-estimator', '/financial-assessment'];
  const isResourcesActive = resourcePaths.includes(location.pathname);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape — keeps it mounted during link clicks
  useEffect(() => {
    if (!resourcesOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setResourcesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [resourcesOpen]);

  return (
    <nav className={`bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 transform transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" onClick={handleLinkClick} className="shrink-0 flex items-center space-x-2">
              {/* Mobile logo */}
              <img src={logoSingle} alt="True North Property Group" className="h-10 w-auto md:hidden" />
              {/* Desktop/tablet logo */}
              <img src={logoFull} alt="True North Property Group" className="hidden md:block h-12 md:h-14 w-56 md:w-72 object-contain" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-6">
              {mainLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`relative pb-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-tn-brown' : 'text-tn-gray hover:text-tn-brown'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-tn-brown rounded-full" />
                    )}
                  </Link>
                );
              })}
{resourcesEnabled && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setResourcesOpen((s) => !s)}
                    aria-haspopup="true"
                    aria-expanded={resourcesOpen}
                    className={`relative pb-2 text-sm font-medium transition-colors duration-200 ${
                      isResourcesActive ? 'text-tn-brown' : 'text-tn-gray hover:text-tn-brown'
                    }`}
                  >
                    Resources
                    {isResourcesActive && (
                      <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-tn-brown rounded-full" />
                    )}
                  </button>
                  {resourcesOpen && (
                    <div className="absolute mt-2 right-0 w-56 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-50">
                      <div className="py-1">
                        <Link to="/mortgage-calculator" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-tn-gray hover:bg-tn-light hover:text-tn-brown hover:underline underline-offset-4 decoration-2 decoration-tn-brown">Mortgage Calculator</Link>
                        <Link to="/closing-cost-estimator" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-tn-gray hover:bg-tn-light hover:text-tn-brown hover:underline underline-offset-4 decoration-2 decoration-tn-brown">Closing Cost Estimator</Link>
                        <Link to="/financial-assessment" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-tn-gray hover:bg-tn-light hover:text-tn-brown hover:underline underline-offset-4 decoration-2 decoration-tn-brown">Financial Assessment</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
               <Link to="/contact" onClick={handleLinkClick} className="bg-tn-brown text-white px-4 py-2 rounded-md text-sm font-medium transition-opacity duration-300 hover:opacity-90 shadow-sm">
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
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`relative block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive ? 'text-tn-brown' : 'text-tn-gray hover:text-tn-brown'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    {link.name}
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-tn-brown" />}
                  </span>
                </Link>
              );
            })}
{resourcesEnabled && (
              <div className="px-3 py-2">
                <div className="text-base font-medium text-tn-gray">Resources</div>
                <div className="mt-2 space-y-1">
                  <Link to="/mortgage-calculator" onClick={handleLinkClick} className="block px-3 py-2 text-base text-tn-gray hover:text-tn-brown">Mortgage Calculator</Link>
                  <Link to="/closing-cost-estimator" onClick={handleLinkClick} className="block px-3 py-2 text-base text-tn-gray hover:text-tn-brown">Closing Cost Estimator</Link>
                  <Link to="/financial-assessment" onClick={handleLinkClick} className="block px-3 py-2 text-base text-tn-gray hover:text-tn-brown">Financial Assessment</Link>
                </div>
              </div>
            )}
            <Link to="/contact" onClick={handleLinkClick} className="bg-tn-brown text-white block px-3 py-2 rounded-md text-base font-medium transition-opacity duration-300 hover:opacity-90 mt-2">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};


export default Navbar;
