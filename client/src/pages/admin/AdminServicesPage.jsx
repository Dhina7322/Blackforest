import React, { useState, useEffect } from 'react';
import { Sparkles, PlusCircle, Edit, Trash2, X } from 'lucide-react';
import { serviceService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    icon: 'Compass',
    description: '',
    order: 0,
    status: 'published'
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await serviceService.getAll();
      if (res.success && res.data) {
        setServices(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({ title: '', slug: '', icon: 'Compass', description: '', order: 0, status: 'published' });
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditingId(s.id);
    setFormData({
      title: s.title || '',
      slug: s.slug || '',
      icon: s.icon || 'Compass',
      description: s.description || '',
      order: s.order || 0,
      status: s.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await serviceService.update(editingId, formData);
        showToast('Service updated', 'success');
      } else {
        await serviceService.create(formData);
        showToast('Service created', 'success');
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      showToast('Error saving service', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service value prop?')) return;
    try {
      await serviceService.delete(id);
      showToast('Service deleted', 'info');
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Value Propositions & Services</h2>
          <p className="text-xs text-gray-500">"We Offer the Best" signature cards on homepage and service directories.</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#10221b] text-[#f29727] text-xs font-bold uppercase rounded-xl flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div key={srv.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#10221b] text-[#f29727] flex items-center justify-center font-bold text-xs mb-3">
                {srv.icon?.charAt(0) || 'S'}
              </div>
              <h3 className="font-serif font-bold text-base text-[#10221b]">{srv.title}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{srv.description}</p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-400">Order: {srv.order}</span>
              <div className="flex gap-1">
                <button onClick={() => openEdit(srv)} className="p-1.5 text-gray-400 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(srv.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden border">
            <div className="p-5 bg-[#10221b] text-white flex justify-between">
              <h3 className="font-bold text-base">{editingId ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Icon Name</label>
                <select value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg">
                  <option value="Compass">Compass</option>
                  <option value="MapPin">MapPin</option>
                  <option value="Calendar">Calendar</option>
                  <option value="Sparkles">Sparkles</option>
                  <option value="HeartHandshake">HeartHandshake</option>
                  <option value="ShieldCheck">ShieldCheck</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea rows={3} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 bg-gray-50 border rounded-lg" />
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
