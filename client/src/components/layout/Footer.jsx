import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Globe, ChevronUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0c1c16] text-white pt-16 pb-8 relative border-t border-[#1a382b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Header Logo */}
        <div className="mb-12">
          <Link to="/" className="inline-block group">
            <img
              src="/white_logo.png"
              alt="Blackforest Holidays - We are the artist of Travel"
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://blackforestholidays.com/wp-content/uploads/2021/07/white_logo.png';
              }}
            />
          </Link>
        </div>

        {/* 3 Columns Layout (Exact match to Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16">
          
          {/* Column 1: Reach Us (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <h3 className="text-2xl font-bold text-white font-sans tracking-wide">
              Reach Us
            </h3>
            
            {/* Address */}
            <div className="flex items-start gap-3.5 text-sm sm:text-[15px] text-gray-300 leading-relaxed max-w-md">
              <MapPin className="w-5 h-5 text-white shrink-0 mt-1" />
              <span>
                737, 3rd Floor, Kheny Plaza CMH Main Road, 2nd Cross Rd, Binnamangala, Indiranagar, Bengaluru, Karnataka 560038
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3.5 text-sm sm:text-[15px] text-gray-300">
              <Mail className="w-4 h-4 text-white shrink-0" />
              <a 
                href="mailto:info@blackforestholidays.com" 
                className="hover:text-[#f29727] transition-colors"
              >
                info@blackforestholidays.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3.5 text-sm sm:text-[15px] text-gray-300">
              <Phone className="w-4 h-4 text-white shrink-0" />
              <a 
                href="tel:+919742877700" 
                className="hover:text-[#f29727] transition-colors"
              >
                +91 9742877700 / 9742977700
              </a>
            </div>

            {/* 4 Social Icon Buttons in White Rounded Squares */}
            <div className="flex items-center gap-3 pt-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-md bg-white text-[#0c1c16] flex items-center justify-center font-bold text-base hover:bg-[#f29727] hover:text-white transition-all shadow-md font-sans"
              >
                f
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-md bg-white text-[#0c1c16] flex items-center justify-center hover:bg-[#f29727] hover:text-white transition-all shadow-md group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-md bg-white text-[#0c1c16] flex items-center justify-center hover:bg-[#f29727] hover:text-white transition-all shadow-md group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-md bg-white text-[#0c1c16] flex items-center justify-center hover:bg-[#f29727] hover:text-white transition-all shadow-md group"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Head Office (4 cols) */}
          <div className="md:col-span-4 space-y-5">
            <h3 className="text-2xl font-bold text-white font-sans tracking-wide">
              Head Office
            </h3>
            <div className="flex items-start gap-3.5 text-sm sm:text-[15px] text-gray-300 leading-relaxed max-w-sm">
              <MapPin className="w-5 h-5 text-white shrink-0 mt-1" />
              <span>
                76, 1st floor, 8th Street, Crosscut Road, Gandhipuram, Coimbatore – 641012
              </span>
            </div>
          </div>

          {/* Column 3: Useful Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-2xl font-bold text-white font-sans tracking-wide">
              Useful Links
            </h3>
            <ul className="space-y-2.5 text-sm sm:text-[15px] text-gray-300">
              <li>
                <Link to="/about" className="hover:text-[#f29727] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#f29727] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#f29727] transition-colors">
                  Work With Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#f29727] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-[#f29727] transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#f29727] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#f29727] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Dotted Rule and Centered Copyright */}
        <div className="border-t border-dotted border-gray-600/70 pt-6 text-center text-xs sm:text-sm text-gray-400">
          <p>
            &copy; 2026 Blackforest Holidays. Designed by Trioticz
          </p>
        </div>

      </div>
    </footer>
  );
}
