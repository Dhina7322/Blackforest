import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function ContactPage() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelers: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Submit logic goes here
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-20 bg-white animate-fadeIn">
      {/* Hero Header */}
      <div className="relative bg-[#10221b] text-white py-24 px-4 sm:px-6 lg:px-8 mb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=1920&q=80" 
            alt="Contact Blackforest Holidays" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-6 uppercase tracking-widest drop-shadow-md">
            Contact
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#f29727]">Talk to us</h3>
          <h2 className="text-4xl font-serif font-bold text-[#10221b]">Get in Touch</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-12 bg-[#fbfaf8] p-8 md:p-12 rounded-2xl border border-gray-100 shadow-sm">
              
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold text-[#10221b] border-b pb-4">YOUR DETAILS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f29727] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f29727] transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f29727] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold text-[#10221b] border-b pb-4">YOUR TRIP</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Destination</label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f29727] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">No. of Travelers</label>
                    <input
                      type="number"
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f29727] transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f29727] transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#f29727] hover:bg-[#db841a] text-white font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Column: Info & Offices */}
          <div className="lg:col-span-5 space-y-12">
            
            <div className="space-y-6">
              <h4 className="text-2xl font-serif font-bold text-[#10221b]">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#f29727] mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Call Us</p>
                    <a href={`tel:${(settings.phone || '+91 94470 12345').replace(/\s+/g, '')}`} className="text-gray-600 hover:text-[#f29727]">
                      {settings.phone || '+91 94470 12345'}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#f29727] mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Email Us</p>
                    <a href={`mailto:${settings.email || 'info@blackforestholidays.com'}`} className="text-gray-600 hover:text-[#f29727]">
                      {settings.email || 'info@blackforestholidays.com'}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-serif font-bold text-[#10221b]">Business hours:</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#f29727] mt-1 shrink-0" />
                  <div>
                    <p className="text-gray-600 text-sm">Monday to Saturday: 10:00 AM - 6:30 PM</p>
                    <p className="text-gray-600 text-sm">Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-8 pt-8 border-t border-gray-100">
              <div className="space-y-3">
                <h2 className="text-xl font-serif font-bold text-[#10221b]">Bangalore Office:</h2>
                <div className="flex items-start gap-3 text-gray-600 text-sm">
                  <MapPin className="w-5 h-5 text-[#f29727] shrink-0" />
                  <p>1st Floor, No 20, 1st Main Rd, near Wipro Park, 1st Block Koramangala, Bengaluru, Karnataka 560034</p>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-serif font-bold text-[#10221b]">Coimbatore Office:</h2>
                <div className="flex items-start gap-3 text-gray-600 text-sm">
                  <MapPin className="w-5 h-5 text-[#f29727] shrink-0" />
                  <p>No 11, 1st Floor, 1st Cross, Bharathi Park Road, Saibaba Colony, Coimbatore, Tamil Nadu 641043</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-gray-100">
              <h4 className="text-lg font-serif font-bold text-[#10221b]">#ventura</h4>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#f29727] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="text-sm font-bold tracking-wider">Follow us on Instagram</span>
              </a>
            </div>

          </div>
        </div>

        {/* Knowledge Base */}
        <div className="mt-24 text-center space-y-12">
          <h2 className="text-3xl font-serif font-bold text-[#10221b]">Knowledge Behind Every Journey</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://www.peru.travel/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:border-[#f29727] transition-all font-bold text-[#10221b]">Peru</a>
            <a href="https://english.visitkorea.or.kr/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:border-[#f29727] transition-all font-bold text-[#10221b]">Korea</a>
            <a href="https://www.visitgreece.gr/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:border-[#f29727] transition-all font-bold text-[#10221b]">Greece</a>
            <a href="https://www.japan.travel/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:border-[#f29727] transition-all font-bold text-[#10221b]">Japan</a>
            <a href="https://www.iata.org/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:border-[#f29727] transition-all font-bold text-[#10221b]">IATA</a>
            <a href="https://www.visitportugal.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:border-[#f29727] transition-all font-bold text-[#10221b]">Portugal</a>
            <a href="https://www.visitalgarve.pt/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:border-[#f29727] transition-all font-bold text-[#10221b]">Algarve</a>
            <a href="https://www.spain.info/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:border-[#f29727] transition-all font-bold text-[#10221b]">Spain</a>
          </div>
        </div>

      </div>
    </div>
  );
}
