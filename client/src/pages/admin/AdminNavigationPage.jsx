import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, PlusCircle, Edit, Trash2, X } from 'lucide-react';
import { navigationService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminNavigationPage() {
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    path: '/',
    type: 'header',
    order: 0,
    isActive: true
  });

  const fetchNav = async () => {
    setLoading(true);
    try {
      const res = await navigationService.getAll();
      if (res.success && res.data) {
        setNavItems(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNav();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({ title: '', path: '/', type: 'header', order: navItems.length, isActive: true });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      path: item.path,
      type: item.type || 'header',
      order: item.order || 0,
      isActive: Boolean(item.isActive)
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await navigationService.update(editingId, formData);
        showToast('Menu item updated', 'success');
      } else {
        await navigationService.create(formData);
        showToast('Menu item added', 'success');
      }
      setModalOpen(false);
      fetchNav();
    } catch {
      showToast('Error saving navigation', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await navigationService.delete(id);
      showToast('Menu item deleted', 'info');
      setNavItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Navigation Menus</h2>
          <p className="text-xs text-gray-500">Configure global website header & footer navigation paths.</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#10221b] text-[#f29727] text-xs font-bold uppercase rounded-xl flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Menu Item</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase">
            <tr>
              <th className="py-3 px-6">Label</th>
              <th className="py-3 px-6">Destination Path</th>
              <th className="py-3 px-6">Menu Position</th>
              <th className="py-3 px-6">Order</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {navItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3.5 px-6 font-bold text-gray-900">{item.title}</td>
                <td className="py-3.5 px-6 text-gray-500 font-mono text-[11px]">{item.path}</td>
                <td className="py-3.5 px-6 uppercase text-[10px] font-bold text-gray-600">{item.type}</td>
                <td className="py-3.5 px-6 text-gray-500">{item.order}</td>
                <td className="py-3.5 px-6">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                    {item.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="py-3.5 px-6 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden border">
            <div className="p-5 bg-[#10221b] text-white flex justify-between">
              <h3 className="font-bold text-base">{editingId ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Title *</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Path *</label>
                <input required type="text" value={formData.path} onChange={(e) => setFormData({ ...formData, path: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg">
                    <option value="header">Header</option>
                    <option value="footer">Footer</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Display Order</label>
                  <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
                </div>
              </div>
              <div className="pt-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                  <span className="font-semibold">Active in Navigation</span>
                </label>
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
