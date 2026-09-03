import React from 'react';
import { MessageCircle, Phone, CalendarCheck } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function FloatingActions() {
  const { settings, openEnquiryModal } = useSettings();

  const cleanWhatsApp = (settings.whatsapp || '+919447012345').replace(/[^0-9]/g, '');
  const cleanPhone = settings.phone || '+91 94470 12345';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Plan My Trip Button */}
      <button
        onClick={() => openEnquiryModal({ source: 'Floating Action Button' })}
        className="group flex items-center gap-2 px-4 py-2.5 bg-[#10221b] text-[#f29727] hover:text-white rounded-full shadow-2xl border border-[#f29727]/30 hover:bg-[#1c382e] hover:border-[#f29727] transition-all duration-300 transform hover:-translate-y-0.5"
      >
        <CalendarCheck className="w-4 h-4 text-[#f29727] group-hover:scale-110 transition-transform" />
        <span className="text-xs font-semibold tracking-wider uppercase pr-1">Plan Your Trip</span>
      </button>

      <div className="flex items-center gap-2">
        {/* Phone Call */}
        <a
          href={`tel:${cleanPhone.replace(/\s+/g, '')}`}
          aria-label="Call Blackforest Holidays"
          className="w-12 h-12 bg-white text-[#10221b] hover:bg-[#10221b] hover:text-[#f29727] rounded-full shadow-xl border border-gray-100 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Blackforest%20Holidays%2C%20I%20would%20like%20to%20plan%20a%20customized%20travel%20experience.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Blackforest Holidays on WhatsApp"
          className="w-12 h-12 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-[#20ba59]"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>
      </div>
    </div>
  );
}
