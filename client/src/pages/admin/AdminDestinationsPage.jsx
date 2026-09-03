import React, { useState, useEffect } from 'react';
import { MapPin, PlusCircle, Edit, Trash2, Search, ExternalLink, X, Save } from 'lucide-react';
import { destinationService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const initialForm = {
    name: '',
    slug: '',
    region: 'europe',
    country: '',
    shortDescription: '',
    description: '',
    thumbnail: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80',
    isFeatured: false,
    status: 'published'
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const res = await destinationService.getAll({ search: search.trim() });
      if (res.success && res.data) {
        setDestinations(res.data.destinations || []);
      }
    } catch (err) {
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [search]);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (dest) => {
    setEditingId(dest.id);
    setFormData({
      name: dest.name || '',
      slug: dest.slug || '',
      region: dest.region || 'europe',
      country: dest.country || '',
      shortDescription: dest.shortDescription || '',
      description: dest.description || '',
      thumbnail: dest.thumbnail || '',
      heroImage: dest.heroImage || '',
      isFeatured: Boolean(dest.isFeatured),
      status: dest.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Destination name is required', 'error');
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const res = await destinationService.update(editingId, formData);
        if (res.success) {
          showToast('Destination updated!', 'success');
          setModalOpen(false);
          fetchDestinations();
        }
      } else {
        const res = await destinationService.create(formData);
        if (res.success) {
          showToast('New destination added!', 'success');
          setModalOpen(false);
          fetchDestinations();
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Error saving destination', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this destination? Associated packages may need reassignment.')) return;
    try {
      const res = await destinationService.delete(id);
      if (res.success) {
        showToast('Destination removed', 'info');
        setDestinations((prev) => prev.filter((d) => d.id !== id));
      }
    } catch (err) {
      showToast('Error deleting destination', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Destination Portfolio</h2>
          <p className="text-xs text-gray-500">Configure regions, countries, signature itineraries, and imagery.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations..."
              className="pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#f29727] w-52"
            />
          </div>

          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-[#10221b] text-[#f29727] hover:bg-[#1c382e] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Destination</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
          <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
          <span>Loading destinations...</span>
        </div>
      ) : destinations.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-400">
          No destinations recorded.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={d.thumbnail || d.heroImage}
                  alt={d.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 text-[#f29727] text-[10px] font-bold uppercase rounded-full">
                  {d.region.replace('-', ' ')}
                </div>
                {d.isFeatured && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#f29727] text-[#10221b] text-[10px] font-bold uppercase rounded-full">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#10221b] mb-1">{d.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{d.shortDescription}</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 capitalize">{d.country || d.region}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(d)}
                      className="p-1.5 text-gray-400 hover:text-[#10221b] rounded-lg hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Destination Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="bg-[#10221b] text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-white">
                {editingId ? 'Edit Destination' : 'Add New Destination'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Region *</label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="europe">Europe</option>
                    <option value="africa">Africa</option>
                    <option value="america">America</option>
                    <option value="asian-countries">Asian Countries</option>
                    <option value="australia">Australia</option>
                    <option value="indian-ocean">Indian Ocean</option>
                    <option value="middle-east">Middle East</option>
                    <option value="south-asia">South Asia</option>
                    <option value="india">India</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Switzerland"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Thumbnail Photo URL</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Full Editorial Narrative</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-[#f29727] focus:ring-[#f29727]"
                  />
                  <span className="font-semibold text-gray-700">Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-[#10221b] text-[#f29727] rounded-lg font-semibold hover:bg-[#1c382e]"
                >
                  {saving ? 'Saving...' : 'Save Destination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
