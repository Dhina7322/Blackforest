import React, { useState, useEffect } from 'react';
import { Users, PlusCircle, Trash2, Edit, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { authService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();
  const { user: currentUser, isSuperAdmin } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor'
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await authService.getUsers();
      if (res.success && res.data) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.createUser(formData);
      if (res.success) {
        showToast('New user created successfully', 'success');
        setModalOpen(false);
        fetchUsers();
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Error creating user', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (id === currentUser.id) {
      showToast('Cannot delete your own active session account', 'warning');
      return;
    }
    if (!window.confirm('Permanently delete this user account?')) return;

    try {
      await authService.deleteUser(id);
      showToast('User account deleted', 'info');
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      showToast('Failed to delete user', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Staff & Administrator Accounts</h2>
          <p className="text-xs text-gray-500">Manage role-based privileges (superadmin, admin, editor).</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-[#10221b] text-[#f29727] text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 shadow"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase">
            <tr>
              <th className="py-3.5 px-6 font-semibold">User</th>
              <th className="py-3.5 px-6 font-semibold">Email</th>
              <th className="py-3.5 px-6 font-semibold">Assigned Role</th>
              <th className="py-3.5 px-6 font-semibold">Status</th>
              <th className="py-3.5 px-6 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 font-bold text-gray-900">{u.name}</td>
                <td className="py-4 px-6 text-gray-600 font-mono text-[11px]">{u.email}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      u.role === 'superadmin'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : u.role === 'admin'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {u.isActive ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  {isSuperAdmin && u.id !== currentUser.id && (
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
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
              <h3 className="font-bold text-base">Provision New Staff Account</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Full Name *</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Email Address *</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Temporary Password *</label>
                <input required type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Security Role</label>
                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg">
                  <option value="editor">Editor (CMS & Blogs)</option>
                  <option value="admin">Administrator (Tours & Enquiries)</option>
                  {isSuperAdmin && <option value="superadmin">Super Administrator (Full Rights)</option>}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#10221b] text-[#f29727] font-bold rounded-lg">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
