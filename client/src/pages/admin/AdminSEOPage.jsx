import React, { useState, useEffect } from 'react';
import { Globe, Save, CheckCircle2 } from 'lucide-react';
import { settingsService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminSEOPage() {
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    defaultSeoTitle: '',
    defaultSeoDescription: '',
    defaultSeoKeywords: '',
    googleAnalyticsId: '',
    facebookPixelId: ''
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await settingsService.get();
        if (res.success && res.data) {
          setFormData({
            defaultSeoTitle: res.data.defaultSeoTitle || 'Black Forest Holidays – Luxury Travel & Customized Holidays',
            defaultSeoDescription: res.data.defaultSeoDescription || 'Discover unforgettable travel experiences with customized holiday packages, honeymoon tours, family vacations, and international travel.',
            defaultSeoKeywords: res.data.defaultSeoKeywords || 'luxury travel, kerala tours, switzerland packages, bespoke honeymoon, blackforest holidays',
            googleAnalyticsId: res.data.googleAnalyticsId || '',
            facebookPixelId: res.data.facebookPixelId || ''
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsService.update(formData);
      showToast('SEO & Analytics settings saved', 'success');
    } catch {
      showToast('Error updating SEO', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">SEO & Meta Configuration</h2>
          <p className="text-xs text-gray-500">Configure global metadata, search rankings, OpenGraph defaults, and tracking tags.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-[#10221b] text-[#f29727] text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 shadow"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Meta Data'}</span>
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6 max-w-3xl text-xs">
        <div>
          <label className="block font-bold text-gray-700 uppercase mb-1">Default Meta Title *</label>
          <input
            type="text"
            required
            value={formData.defaultSeoTitle}
            onChange={(e) => setFormData({ ...formData, defaultSeoTitle: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm"
          />
          <span className="text-[10px] text-gray-400 mt-1 block">Optimal length: 50–60 characters.</span>
        </div>

        <div>
          <label className="block font-bold text-gray-700 uppercase mb-1">Default Meta Description *</label>
          <textarea
            rows={3}
            required
            value={formData.defaultSeoDescription}
            onChange={(e) => setFormData({ ...formData, defaultSeoDescription: e.target.value })}
            className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm"
          />
          <span className="text-[10px] text-gray-400 mt-1 block">Optimal length: 150–160 characters.</span>
        </div>

        <div>
          <label className="block font-bold text-gray-700 uppercase mb-1">Keywords & Meta Tags</label>
          <input
            type="text"
            value={formData.defaultSeoKeywords}
            onChange={(e) => setFormData({ ...formData, defaultSeoKeywords: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm"
          />
        </div>

        <div className="pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">Google Analytics ID (G-XXXXX)</label>
            <input
              type="text"
              value={formData.googleAnalyticsId}
              onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
              placeholder="G-ABC123XYZ"
              className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">Meta / Facebook Pixel ID</label>
            <input
              type="text"
              value={formData.facebookPixelId}
              onChange={(e) => setFormData({ ...formData, facebookPixelId: e.target.value })}
              placeholder="1234567890"
              className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
