import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { serviceService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';

const iconMap = {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  HeartHandshake,
  ShieldCheck
};

export default function ValuePropsSection() {
  const [services, setServices] = useState([]);
  const { openEnquiryModal } = useSettings();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceService.getAll({ status: 'published' });
        if (res.success && res.data) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Error loading services:', err);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-24 bg-[#fbfaf8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#f29727] font-bold block mb-2">
            Value before business
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#10221b] leading-tight">
            We Offer the best
          </h2>
          <p className="text-gray-600 text-sm mt-3">
            Our unwavering commitment to high-touch hospitality, rigorous safety standards, and bespoke destination expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => {
            const IconComponent = iconMap[srv.icon] || Compass;
            return (
              <div
                key={srv.id}
                className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#f29727]/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#10221b] text-[#f29727] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#f29727] group-hover:text-[#10221b] transition-all duration-300 shadow-md">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#10221b] group-hover:text-[#f29727] transition-colors mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <button
                    onClick={() => openEnquiryModal({ title: srv.title })}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10221b] group-hover:text-[#f29727] transition-colors"
                  >
                    <span>Inquire Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
