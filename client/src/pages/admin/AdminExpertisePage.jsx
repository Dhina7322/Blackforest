import React, { useState, useEffect } from 'react';
import { Award, PlusCircle, Edit, Trash2, X, ExternalLink } from 'lucide-react';
import { expertiseService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminExpertisePage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    logo: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=100&q=80',
    link: 'https://blackforestholidays.com',
    order: 0,
    status: 'published'
  });

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await expertiseService.getAll();
      if (res.success && res.data) {
        setPartners(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({ name: '', logo: '', link: '', order: 0, status: 'published' });
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setFormData({
      name: p.name || '',
      logo: p.logo || '',
      link: p.link || '',
      order: p.order || 0,
      status: p.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await expertiseService.update(editingId, formData);
        showToast('Partner updated', 'success');
      } else {
        await expertiseService.create(formData);
        showToast('Partner added', 'success');
      }
      setModalOpen(false);
      fetchPartners();
    } catch {
      showToast('Error saving partner', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this partner accreditation?')) return;
    try {
      await expertiseService.delete(id);
      showToast('Partner deleted', 'info');
      setPartners((prev) => prev.filter((p) => p.id !== id));
    } catch {
      showToast('Error deleting', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Partner & Tourism Board Expertise</h2>
          <p className="text-xs text-gray-500">Official certifications (IATA, Peru, Korea, Greece, Japan, Portugal, Spain).</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#10221b] text-[#f29727] text-xs font-bold uppercase rounded-xl flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Partner</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {partners.map((p) => (
          <div key={p.id} className="bg-white p-5 rounded-2xl border border-gray-200 text-center space-y-3 flex flex-col justify-between">
            <div>
              <img src={p.logo} alt={p.name} className="w-16 h-16 rounded-full object-cover mx-auto border" />
              <h3 className="font-bold text-sm text-gray-900 mt-2">{p.name}</h3>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" className="text-[10px] text-[#f29727] flex items-center justify-center gap-1 mt-1 hover:underline">
                  <span>Visit Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-center gap-2">
              <button onClick={() => openEdit(p)} className="p-1 text-gray-400 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(p.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden border">
            <div className="p-5 bg-[#10221b] text-white flex justify-between">
              <h3 className="font-bold text-base">{editingId ? 'Edit Partner' : 'Add Partner'}</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Board / Partner Name *</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Logo URL *</label>
                <input required type="text" value={formData.logo} onChange={(e) => setFormData({ ...formData, logo: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Official Website Link</label>
                <input type="text" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#10221b] text-[#f29727] font-bold rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
