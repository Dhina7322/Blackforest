import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Calendar, Users, MapPin, DollarSign, Mail, Phone, User } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';
import { useToast } from '../../context/ToastContext';
import { enquiryService } from '../../services/allServices';

export default function EnquiryModal() {
  const { isEnquiryModalOpen, closeEnquiryModal, enquiryPrefill } = useSettings();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    destination: '',
    travelDate: '',
    returnDate: '',
    travellers: '2 Adults',
    budget: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEnquiryModalOpen) {
      setFormData((prev) => ({
        ...prev,
        destination: enquiryPrefill.destination || enquiryPrefill.title || '',
        message: enquiryPrefill.message || (enquiryPrefill.title ? `I would like to inquire about the "${enquiryPrefill.title}" package.` : '')
      }));
      setSubmitted(false);
      setErrors({});
    }
  }, [isEnquiryModalOpen, enquiryPrefill]);

  if (!isEnquiryModalOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please provide a message (minimum 5 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await enquiryService.create({
        ...formData,
        source: enquiryPrefill.source || 'Website Enquiry Modal'
      });

      if (res.success) {
        setSubmitted(true);
        showToast('Thank you! Our travel specialist will contact you shortly.', 'success');
      } else {
        showToast(res.message || 'Failed to submit enquiry', 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Server error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white text-[#10221b] rounded-2xl shadow-2xl overflow-hidden border border-[#e6eee5]">
        {/* Modal Header */}
        <div className="bg-[#10221b] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#f29727] font-semibold">Bespoke Travel Planning</span>
            <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
              {enquiryPrefill.title ? `Inquire: ${enquiryPrefill.title}` : 'Plan Your Journey'}
            </h3>
          </div>
          <button
            onClick={closeEnquiryModal}
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-serif font-bold text-[#10221b] mb-2">Thank You!</h4>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Thank you. Our travel specialist will review your preferences and contact you shortly with a personalized itinerary.
            </p>
            <button
              onClick={closeEnquiryModal}
              className="px-6 py-2.5 bg-[#10221b] text-[#f29727] font-medium rounded-full hover:bg-[#1c382e] transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className={`w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      errors.name ? 'border-red-400 ring-red-200' : 'border-gray-200 focus:ring-[#f29727]/30 focus:border-[#f29727]'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className={`w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-400 ring-red-200' : 'border-gray-200 focus:ring-[#f29727]/30 focus:border-[#f29727]'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      errors.phone ? 'border-red-400 ring-red-200' : 'border-gray-200 focus:ring-[#f29727]/30 focus:border-[#f29727]'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Preferred Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Switzerland, Kerala, Maldives"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f29727]/30 focus:border-[#f29727]"
                  />
                </div>
              </div>

              {/* Travel Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Approx Travel Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f29727]/30 focus:border-[#f29727]"
                  />
                </div>
              </div>

              {/* Number of Travellers */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Travellers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <select
                    value={formData.travellers}
                    onChange={(e) => setFormData({ ...formData, travellers: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f29727]/30 focus:border-[#f29727]"
                  >
                    <option value="Solo Traveler">Solo Traveler</option>
                    <option value="Couple (2 Adults)">Couple (2 Adults)</option>
                    <option value="Family (2 Adults, 1-2 Kids)">Family (2 Adults, 1-2 Kids)</option>
                    <option value="Small Group (3-5 Adults)">Small Group (3-5 Adults)</option>
                    <option value="Large Group (6+ Adults)">Large Group (6+ Adults)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Approximate Budget per Person (Optional)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g. $1,500 - $3,000 / person"
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f29727]/30 focus:border-[#f29727]"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Your Travel Wishlist & Details *
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about special occasions, preferred hotels, activities, or pacing..."
                className={`w-full p-3 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  errors.message ? 'border-red-400 ring-red-200' : 'border-gray-200 focus:ring-[#f29727]/30 focus:border-[#f29727]'
                }`}
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#10221b] text-[#f29727] hover:bg-[#1c382e] font-semibold text-sm tracking-widest uppercase rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
                    Submitting Enquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Travel Request
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-gray-500 mt-2">
                🔒 We respect your privacy. Your information is strictly used for itinerary planning.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
