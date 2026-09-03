import React from 'react';
import { MessageCircle, Phone, CalendarCheck } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function FloatingActions() {
  const { settings, openEnquiryModal } = useSettings();

  const cleanWhatsApp = (settings.whatsapp || '+919447012345').replace(/[^0-9]/g, '');
  const cleanPhone = settings.phone || '+91 94470 12345';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
     

      <div className="flex items-center gap-2 mt-2">
        {/* Scroll to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="w-12 h-12 bg-[#f29727] text-white hover:bg-[#db841a] rounded-full shadow-xl border border-transparent flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
