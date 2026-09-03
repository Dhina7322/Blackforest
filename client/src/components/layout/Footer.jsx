import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-[#192b23] text-white">
      
      {/* Top Banner section (overlapping with light background from previous section) */}
      <div className="bg-[#f7f9f8] pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#10221b] rounded-xl p-8 border border-[#234033] shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#c7a456] text-[#c7a456] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-gray-400 text-xs block mb-1">Call us</span>
                  <a href="tel:02089403388" className="text-sm font-semibold hover:text-[#c7a456]">
                    {settings.phone || '020 8940 3388'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#c7a456] text-[#c7a456] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-gray-400 text-xs block mb-1">Email address</span>
                  <a href="mailto:info@blackforest.com" className="text-sm font-semibold hover:text-[#c7a456]">
                    {settings.email || 'info@blackforest.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#c7a456] text-[#c7a456] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-gray-400 text-xs block mb-1">Office hours</span>
                  <span className="text-sm font-semibold">Mon-Fri 09:00 - 18:00</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#c7a456] text-[#c7a456] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-gray-400 text-xs block mb-1">Location</span>
                  <span className="text-sm font-semibold">{settings.address || 'London, UK'}</span>
                </div>
              </div>

            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-[#10221b] text-xs italic">
              "A guide for your travel and adventure, creating memories for a lifetime."
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Col 1: Contact Us */}
            <div>
              <Link to="/">
                <img 
                  src={settings.logo || 'https://blackforestholidays.com/wp-content/uploads/2021/07/white_logo.png'} 
                  alt="Blackforest Holidays" 
                  className="h-10 w-auto mb-6 opacity-90"
                />
              </Link>
              <h4 className="text-lg font-serif font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2">
                  <span className="font-semibold text-white min-w-[60px]">Address:</span>
                  <span>{settings.address || 'London, United Kingdom'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-white min-w-[60px]">Phone:</span>
                  <span>{settings.phone || '020 8940 3388'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-white min-w-[60px]">Email:</span>
                  <span>{settings.email || 'info@blackforest.com'}</span>
                </li>
              </ul>
            </div>

            {/* Col 2: Head Office */}
            <div>
              <h4 className="text-lg font-serif font-bold mb-4">Head Office</h4>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                We invite you to our central office to discuss your bespoke travel plans in person.
              </p>
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 mt-1 text-[#f29727]" />
                <span>
                  {settings.address || '123 Travel Street, London, UK, SW1A 1AA'}
                </span>
              </div>
            </div>

            {/* Col 3: Useful Links */}
            <div>
              <h4 className="text-lg font-serif font-bold mb-4">Useful Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/about" className="hover:text-[#f29727] transition-colors">About Us</Link></li>
                <li><Link to="/destinations" className="hover:text-[#f29727] transition-colors">Destinations</Link></li>
                <li><Link to="/experiences" className="hover:text-[#f29727] transition-colors">Experiences</Link></li>
                <li><Link to="/corporate-travel" className="hover:text-[#f29727] transition-colors">Corporate Travel</Link></li>
                <li><Link to="/contact" className="hover:text-[#f29727] transition-colors">Contact Us</Link></li>
                <li><Link to="/journal" className="hover:text-[#f29727] transition-colors">Travel Journal</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#234033] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <p>{settings.copyright || '© 2026 Black Forest Holidays. All Rights Reserved.'}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
