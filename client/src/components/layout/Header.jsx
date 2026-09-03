import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Phone,
  CalendarCheck,
  Compass,
  MapPin,
  Palmtree,
  ShieldCheck,
  Plane
} from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileAccordions, setMobileAccordions] = useState({
    destinations: false,
    experiences: false,
    concierge: false
  });

  const { settings, openEnquiryModal, openSearchModal } = useSettings();
  const location = useLocation();

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleMobileAccordion = (key) => {
    setMobileAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const destinationsList = [
    { name: 'Europe & Alps', slug: 'europe', desc: 'Switzerland, France, Italy, Greece' },
    { name: 'Africa Safari', slug: 'africa', desc: 'Kenya, Serengeti, South Africa' },
    { name: 'America Explorer', slug: 'america', desc: 'USA West Coast, California, Rockies' },
    { name: 'Asian Countries', slug: 'asian-countries', desc: 'Japan, Thailand, Vietnam, Bali' },
    { name: 'Australia & NZ', slug: 'australia', desc: 'Sydney, Melbourne, Great Barrier Reef' },
    { name: 'Indian Ocean', slug: 'indian-ocean', desc: 'Maldives, Mauritius, Seychelles' },
    { name: 'Middle East', slug: 'middle-east', desc: 'Dubai, Abu Dhabi, Oman Deserts' },
    { name: 'South Asia', slug: 'south-asia', desc: 'Sri Lanka, Bhutan, Himalayas' },
    { name: 'India Tours', slug: 'kerala', desc: 'Kerala, Andaman, Nilgiris, Kashmir' }
  ];

  const experiencesList = [
    { name: 'Adventure & Nature', slug: 'adventure-nature', desc: 'Alpine treks, wildlife tracking, expeditions' },
    { name: 'Island Holidays', slug: 'island-holidays', desc: 'Overwater villas, coral lagoons, private atolls' },
    { name: 'Family Holidays', slug: 'family-holidays', desc: 'Carefully paced multi-generational escapes' },
    { name: 'Honeymoon Escapes', slug: 'honeymoon-escapes', desc: 'Romantic secluded retreats & candlelit beaches' },
    { name: 'Luxury Escapes', slug: 'luxury-escapes', desc: '5-star heritage palaces & private chauffeurs' }
  ];

  const conciergeList = [
    { name: 'Flight Booking', slug: 'flight-booking', desc: 'First & Business class itinerary optimization' },
    { name: 'Visa Assistance', slug: 'visa-assistance', desc: 'End-to-end documentation and embassy appointments' },
    { name: 'Luxury Cruises', slug: 'cruises', desc: 'Mediterranean, Caribbean & Alaskan sea voyages' }
  ];

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-[#10221b] text-white shadow-xl py-3 border-b border-white/10'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={settings.logo || 'https://blackforestholidays.com/wp-content/uploads/2021/07/white_logo.png'}
              alt={settings.siteName || 'Blackforest Holidays'}
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-3 text-xs tracking-widest font-semibold uppercase">
            {/* Destinations Mega Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown('destinations')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#f29727] transition-colors py-1">
                Destinations
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'destinations' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[#10221b] border border-[#f29727]/30 rounded-2xl shadow-2xl p-6 text-white animate-fadeIn backdrop-blur-md">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="text-xs uppercase font-bold text-[#f29727] tracking-wider">
                      Global & Indian Destinations
                    </span>
                    <Link
                      to="/destinations"
                      className="text-[11px] text-gray-300 hover:text-[#f29727] underline tracking-normal"
                    >
                      View All Destinations →
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {destinationsList.map((d) => (
                      <Link
                        key={d.slug}
                        to={`/destinations/${d.slug}`}
                        className="p-2.5 rounded-xl hover:bg-white/10 transition-colors group/item block"
                      >
                        <span className="block font-medium text-sm text-white group-hover/item:text-[#f29727] normal-case tracking-normal">
                          {d.name}
                        </span>
                        <span className="block text-[11px] text-gray-400 normal-case tracking-normal line-clamp-1 mt-0.5">
                          {d.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Experiences Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown('experiences')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#f29727] transition-colors py-1">
                Experiences
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'experiences' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] bg-[#10221b] border border-[#f29727]/30 rounded-2xl shadow-2xl p-5 text-white animate-fadeIn">
                  <div className="space-y-2">
                    {experiencesList.map((exp) => (
                      <Link
                        key={exp.slug}
                        to={`/experiences/${exp.slug}`}
                        className="p-3 rounded-xl hover:bg-white/10 transition-colors block group/exp"
                      >
                        <span className="block font-medium text-sm text-white group-hover/exp:text-[#f29727] normal-case tracking-normal">
                          {exp.name}
                        </span>
                        <span className="block text-[11px] text-gray-400 normal-case tracking-normal mt-0.5">
                          {exp.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Concierge Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown('concierge')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#f29727] transition-colors py-1">
                Concierge
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'concierge' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] bg-[#10221b] border border-[#f29727]/30 rounded-2xl shadow-2xl p-4 text-white animate-fadeIn">
                  <div className="space-y-2">
                    {conciergeList.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/concierge/${c.slug}`}
                        className="p-2.5 rounded-xl hover:bg-white/10 transition-colors block group/c"
                      >
                        <span className="block font-medium text-sm text-white group-hover/c:text-[#f29727] normal-case tracking-normal">
                          {c.name}
                        </span>
                        <span className="block text-[11px] text-gray-400 normal-case tracking-normal mt-0.5">
                          {c.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/corporate-travel" className="hover:text-[#f29727] transition-colors py-1">
              Corporate Travel
            </Link>

            <Link to="/coach-tour" className="hover:text-[#f29727] transition-colors py-1">
              Coach Tour
            </Link>

            <Link to="/journal" className="hover:text-[#f29727] transition-colors py-1">
              Journal
            </Link>

            <Link to="/about" className="hover:text-[#f29727] transition-colors py-1">
              About
            </Link>

            <Link to="/contact" className="hover:text-[#f29727] transition-colors py-1">
              Contact
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={openSearchModal}
              aria-label="Search"
              className="p-2 rounded-full hover:bg-white/10 text-white/90 hover:text-[#f29727] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Direct Phone CTA */}
            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="hidden 2xl:flex items-center gap-1.5 text-xs text-gray-200 hover:text-[#f29727] font-semibold tracking-wider transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#f29727]" />
                <span>{settings.phone}</span>
              </a>
            )}

            {/* Plan Journey Modal Trigger */}
            <button
              onClick={() => openEnquiryModal({ source: 'Header Nav CTA' })}
              className="px-5 py-2.5 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs uppercase font-bold tracking-widest rounded-full shadow-lg transition-all transform hover:scale-105"
            >
              Plan Your Trip
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={openSearchModal}
              aria-label="Search"
              className="p-2 text-white/90 hover:text-[#f29727]"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-2 text-white hover:text-[#f29727]"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#10221b] text-white p-6 overflow-y-auto shadow-2xl flex flex-col justify-between border-l border-white/10 animate-slideInRight">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <img
                  src={settings.logo || 'https://blackforestholidays.com/wp-content/uploads/2021/07/white_logo.png'}
                  alt={settings.siteName}
                  className="h-9 w-auto"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links with Accordions */}
              <div className="space-y-4 text-sm font-semibold tracking-wider uppercase">
                {/* Destinations Accordion */}
                <div className="border-b border-white/10 pb-3">
                  <button
                    onClick={() => toggleMobileAccordion('destinations')}
                    className="flex items-center justify-between w-full py-2 text-left hover:text-[#f29727]"
                  >
                    <span>Destinations</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileAccordions.destinations ? 'rotate-180 text-[#f29727]' : ''
                      }`}
                    />
                  </button>
                  {mobileAccordions.destinations && (
                    <div className="pl-4 pt-2 space-y-2 normal-case tracking-normal text-gray-300">
                      {destinationsList.map((d) => (
                        <Link
                          key={d.slug}
                          to={`/destinations/${d.slug}`}
                          className="block py-1 hover:text-[#f29727] text-sm"
                        >
                          {d.name}
                        </Link>
                      ))}
                      <Link
                        to="/destinations"
                        className="block py-1 text-xs text-[#f29727] font-semibold uppercase tracking-wider"
                      >
                        All Destinations Overview →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Experiences Accordion */}
                <div className="border-b border-white/10 pb-3">
                  <button
                    onClick={() => toggleMobileAccordion('experiences')}
                    className="flex items-center justify-between w-full py-2 text-left hover:text-[#f29727]"
                  >
                    <span>Experiences</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileAccordions.experiences ? 'rotate-180 text-[#f29727]' : ''
                      }`}
                    />
                  </button>
                  {mobileAccordions.experiences && (
                    <div className="pl-4 pt-2 space-y-2 normal-case tracking-normal text-gray-300">
                      {experiencesList.map((exp) => (
                        <Link
                          key={exp.slug}
                          to={`/experiences/${exp.slug}`}
                          className="block py-1 hover:text-[#f29727] text-sm"
                        >
                          {exp.name}
                        </Link>
                      ))}
                      <Link
                        to="/experiences"
                        className="block py-1 text-xs text-[#f29727] font-semibold uppercase tracking-wider"
                      >
                        All Experiences →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Concierge Accordion */}
                <div className="border-b border-white/10 pb-3">
                  <button
                    onClick={() => toggleMobileAccordion('concierge')}
                    className="flex items-center justify-between w-full py-2 text-left hover:text-[#f29727]"
                  >
                    <span>Concierge</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileAccordions.concierge ? 'rotate-180 text-[#f29727]' : ''
                      }`}
                    />
                  </button>
                  {mobileAccordions.concierge && (
                    <div className="pl-4 pt-2 space-y-2 normal-case tracking-normal text-gray-300">
                      {conciergeList.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/concierge/${c.slug}`}
                          className="block py-1 hover:text-[#f29727] text-sm"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/international-tours" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  International Tours
                </Link>

                <Link to="/india-tours" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  India Tours
                </Link>

                <Link to="/corporate-travel" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  Corporate Travel
                </Link>

                <Link to="/coach-tour" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  Coach Tour
                </Link>

                <Link to="/journal" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  Travel Journal
                </Link>

                <Link to="/about" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  About Us
                </Link>

                <Link to="/contact" className="block py-2 border-b border-white/10 hover:text-[#f29727]">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="pt-8 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal({ source: 'Mobile Drawer CTA' });
                }}
                className="w-full py-3.5 bg-[#f29727] text-[#10221b] font-bold text-xs uppercase tracking-widest rounded-full shadow-lg"
              >
                Plan Your Trip
              </button>

              {settings.phone && (
                <div className="text-center">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="text-xs text-gray-300 hover:text-[#f29727] flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#f29727]" />
                    <span>Direct Concierge: {settings.phone}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
