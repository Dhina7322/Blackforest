import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe,
  Lock
} from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const { settings, openEnquiryModal } = useSettings();
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Thank you for subscribing to our luxury travel dispatches!', 'success');
    setNewsletterEmail('');
  };

  const destinations = [
    { name: 'Europe & Switzerland', path: '/destinations/europe' },
    { name: 'Africa Safari', path: '/destinations/africa' },
    { name: 'America Explorer', path: '/destinations/america' },
    { name: 'Asian Countries', path: '/destinations/asian-countries' },
    { name: 'Australia & New Zealand', path: '/destinations/australia' },
    { name: 'Indian Ocean & Maldives', path: '/destinations/indian-ocean' },
    { name: 'Middle East & Dubai', path: '/destinations/middle-east' },
    { name: 'South Asia & Sri Lanka', path: '/destinations/south-asia' },
    { name: 'Kerala Backwaters', path: '/destinations/kerala' }
  ];

  const experiences = [
    { name: 'Adventure & Nature', path: '/experiences/adventure-nature' },
    { name: 'Island Holidays', path: '/experiences/island-holidays' },
    { name: 'Family Holidays', path: '/experiences/family-holidays' },
    { name: 'Honeymoon Escapes', path: '/experiences/honeymoon-escapes' },
    { name: 'Luxury Escapes', path: '/experiences/luxury-escapes' }
  ];

  const quickLinks = [
    { name: 'International Tours', path: '/international-tours' },
    { name: 'India Tour Packages', path: '/india-tours' },
    { name: 'Corporate Travel', path: '/corporate-travel' },
    { name: 'Coach Tours', path: '/coach-tour' },
    { name: 'Flight Booking Concierge', path: '/concierge/flight-booking' },
    { name: 'Visa Assistance', path: '/concierge/visa-assistance' },
    { name: 'Luxury Cruises', path: '/concierge/cruises' },
    { name: 'Travel Journal', path: '/journal' },
    { name: 'About Blackforest', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <footer className="bg-[#10221b] text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Background Accent Graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f29727]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1c382e]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter & Consultation Banner */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 mb-16 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-[#f29727] text-xs uppercase font-bold tracking-widest block mb-2">
                Stay Inspired
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                Receive Curated Journeys & Private Travel Offers
              </h3>
              <p className="text-gray-300 text-sm max-w-xl">
                Subscribe to receive seasonal itineraries, off-the-beaten-track discoveries, and exclusive private charter privileges directly in your inbox.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#f29727] focus:ring-1 focus:ring-[#f29727]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs uppercase font-bold tracking-wider rounded-full flex items-center gap-1.5 transition-all flex-shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16 text-sm">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="block">
              <img
                src={settings.logo || 'https://blackforestholidays.com/wp-content/uploads/2021/07/white_logo.png'}
                alt={settings.siteName}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed">
              {settings.footerText ||
                'BLACKFOREST HOLIDAYS is your trusted partner in creating unforgettable travel experiences, bespoke international itineraries, and luxury escapes.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#f29727]" />
                IATA Accredited
              </span>
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#f29727] mb-4">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {destinations.map((d) => (
                <li key={d.path}>
                  <Link to={d.path} className="hover:text-[#f29727] transition-colors flex items-center gap-1">
                    <span>{d.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#f29727] mb-4">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {experiences.map((exp) => (
                <li key={exp.path}>
                  <Link to={exp.path} className="hover:text-[#f29727] transition-colors">
                    {exp.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links & Concierge */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#f29727] mb-4">
              Concierge & Tours
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {quickLinks.slice(0, 8).map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-[#f29727] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Information */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#f29727] mb-4">
              Connect With Us
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              {settings.address && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#f29727] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{settings.address}</span>
                </div>
              )}

              {settings.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#f29727] flex-shrink-0" />
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-[#f29727]">
                    {settings.phone}
                  </a>
                </div>
              )}

              {settings.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#f29727] flex-shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-[#f29727]">
                    {settings.email}
                  </a>
                </div>
              )}

              {settings.whatsapp && (
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366]"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => openEnquiryModal({ source: 'Footer Plan CTA' })}
                  className="w-full py-2 px-4 bg-white/10 hover:bg-[#f29727] hover:text-[#10221b] text-white text-xs uppercase font-semibold rounded-lg tracking-wider border border-white/20 transition-all"
                >
                  Plan Custom Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>{settings.copyright || '© 2026 Black Forest Holidays. All Rights Reserved.'}</div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/admin/login"
              className="flex items-center gap-1 text-gray-500 hover:text-[#f29727] transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
