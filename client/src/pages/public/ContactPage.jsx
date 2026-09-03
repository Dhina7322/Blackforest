import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';
import { useToast } from '../../context/ToastContext';
import { enquiryService } from '../../services/allServices';

export default function ContactPage() {
  const { settings } = useSettings();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await enquiryService.create({
        ...formData,
        source: 'Contact Us Page'
      });
      if (res.success) {
        setSubmitted(true);
        showToast('Thank you. Our travel specialist will contact you shortly.', 'success');
        setFormData({ name: '', email: '', phone: '', destination: '', message: '' });
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Error submitting message', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#fbfaf8] animate-fadeIn">
      {/* Header */}
      <div className="bg-[#10221b] text-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            Contact Our Travel Specialists
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Whether inquiring about a customized itinerary, private airfare, or seasonal group departures, our concierge team is at your service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office details & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-2xl font-serif font-bold text-[#10221b]">
                Blackforest Holidays Lounge
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Connect directly with our dedicated travel planners via phone, email, or WhatsApp.
              </p>

              <div className="space-y-4 pt-2">
                {settings.phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-[#f29727] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Phone Concierge</span>
                      <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-[#10221b] hover:text-[#f29727]">
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings.whatsapp && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">WhatsApp Desk</span>
                      <a
                        href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#10221b] hover:text-[#25D366]"
                      >
                        {settings.whatsapp}
                      </a>
                    </div>
                  </div>
                )}

                {settings.email && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Direct Inquiries</span>
                      <a href={`mailto:${settings.email}`} className="text-sm font-semibold text-[#10221b] hover:text-[#f29727]">
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                {settings.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 text-[#10221b] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Office Address</span>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {settings.address}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Concierge Hours</span>
                    <p className="text-sm text-gray-700">
                      Mon – Sat: 9:00 AM – 7:30 PM IST <br />
                      <span className="text-xs text-[#f29727] font-semibold">24/7 Emergency Support for Travelers on Tour</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-[#10221b] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-gray-500 mb-8">
                Fill out the form below, and our travel specialists will respond within 4 business hours.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="text-xl font-serif font-bold text-emerald-900 mb-2">Message Sent!</h4>
                  <p className="text-xs text-emerald-800 mb-6">
                    Thank you. Our travel specialist will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#10221b] text-[#f29727] text-xs font-semibold uppercase tracking-wider rounded-full"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f29727]/30 focus:border-[#f29727]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f29727]/30 focus:border-[#f29727]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 94470 12345"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f29727]/30 focus:border-[#f29727]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Destination of Interest
                      </label>
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="e.g. Switzerland, Kerala, Maldives"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f29727]/30 focus:border-[#f29727]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Your Message / Travel Request *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share travel dates, number of guests, and any specific preferences..."
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f29727]/30 focus:border-[#f29727]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#10221b] hover:bg-[#1c382e] text-[#f29727] text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Travel Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
