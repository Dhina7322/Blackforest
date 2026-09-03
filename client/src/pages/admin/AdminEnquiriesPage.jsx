import React, { useState, useEffect } from 'react';
import {
  MailQuestion,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle2,
  Calendar,
  Users,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  MessageSquare,
  Clock,
  X
} from 'lucide-react';
import { enquiryService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const { showToast } = useToast();
  const { isAdmin } = useAuth();

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (search.trim()) params.search = search.trim();

      const res = await enquiryService.getAll(params);
      if (res.success && res.data) {
        setEnquiries(res.data.enquiries || []);
      }
    } catch (err) {
      console.error('Error loading enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, search]);

  const handleStatusChange = async (enquiryId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const res = await enquiryService.updateStatus(enquiryId, newStatus);
      if (res.success) {
        showToast(`Status updated to ${newStatus.replace('_', ' ')}`, 'success');
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
          setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      showToast('Failed to update enquiry status', 'error');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedEnquiry) return;

    try {
      const res = await enquiryService.addNote(selectedEnquiry.id, newNote.trim());
      if (res.success && res.data) {
        showToast('Staff note added', 'success');
        setSelectedEnquiry(res.data);
        setEnquiries((prev) =>
          prev.map((item) => (item.id === res.data.id ? res.data : item))
        );
        setNewNote('');
      }
    } catch (err) {
      showToast('Error adding note', 'error');
    }
  };

  const handleDelete = async (enquiryId) => {
    if (!window.confirm('Are you sure you want to permanently delete this customer lead?')) return;

    try {
      const res = await enquiryService.delete(enquiryId);
      if (res.success) {
        showToast('Enquiry deleted', 'info');
        setEnquiries((prev) => prev.filter((e) => e.id !== enquiryId));
        if (selectedEnquiry?.id === enquiryId) setSelectedEnquiry(null);
      }
    } catch (err) {
      showToast('Failed to delete enquiry', 'error');
    }
  };

  const statusColors = {
    new: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    contacted: 'bg-blue-100 text-blue-800 border-blue-300',
    in_progress: 'bg-amber-100 text-amber-800 border-amber-300',
    quoted: 'bg-purple-100 text-purple-800 border-purple-300',
    converted: 'bg-teal-100 text-teal-800 border-teal-300',
    closed: 'bg-gray-100 text-gray-700 border-gray-300'
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Enquiry CRM Management</h2>
          <p className="text-xs text-gray-500">Track and convert incoming customer leads into booked luxury itineraries.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f29727]"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="quoted">Quoted</option>
            <option value="converted">Converted (Booked)</option>
            <option value="closed">Closed / Archived</option>
          </select>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, email..."
              className="pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#f29727] w-60"
            />
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6 font-semibold">Customer</th>
                <th className="py-3.5 px-6 font-semibold">Destination / Title</th>
                <th className="py-3.5 px-6 font-semibold">Travel Dates</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold">Submitted</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    Loading enquiries...
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    No matching customer enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedEnquiry?.id === enq.id ? 'bg-amber-50/40' : ''
                    }`}
                    onClick={() => setSelectedEnquiry(enq)}
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900">{enq.name}</div>
                      <div className="text-gray-400 text-[11px]">{enq.phone} • {enq.email}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {enq.destination || 'Custom Journey'}
                    </td>
                    <td className="py-4 px-6 text-gray-500">
                      {enq.travelDate || 'Flexible'}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                          statusColors[enq.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {enq.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400 text-[11px]">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 text-gray-500 hover:text-[#10221b] rounded-lg hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(enq.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Enquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#10221b] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#f29727]">
                  Lead #{selectedEnquiry.id} • {selectedEnquiry.source || 'Website Form'}
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Status Selector */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-bold text-gray-700 uppercase tracking-wider">
                  Update Lead Status:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['new', 'contacted', 'in_progress', 'quoted', 'converted', 'closed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={updatingStatus}
                      onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                        selectedEnquiry.status === st
                          ? 'bg-[#10221b] text-[#f29727] border-[#10221b]'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact & Travel Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px]">Email</span>
                  <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#f29727]" />
                    <a href={`mailto:${selectedEnquiry.email}`} className="hover:underline">{selectedEnquiry.email}</a>
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px]">Phone</span>
                  <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#f29727]" />
                    <a href={`tel:${selectedEnquiry.phone}`} className="hover:underline">{selectedEnquiry.phone}</a>
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px]">Destination</span>
                  <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#f29727]" />
                    <span>{selectedEnquiry.destination || 'Unspecified'}</span>
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px]">Dates & Guests</span>
                  <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#f29727]" />
                    <span>{selectedEnquiry.travelDate || 'Flexible'} • {selectedEnquiry.travellers || '2 Adults'}</span>
                  </p>
                </div>
              </div>

              {/* Message */}
              <div>
                <span className="text-gray-400 font-bold uppercase text-[10px] block mb-1">Customer Message</span>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 leading-relaxed whitespace-pre-line text-xs">
                  {selectedEnquiry.message || 'No specific notes provided.'}
                </div>
              </div>

              {/* Staff Notes History */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <span className="text-gray-700 font-bold uppercase text-[11px] flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#f29727]" />
                  <span>Internal Staff Notes ({selectedEnquiry.notes?.length || 0})</span>
                </span>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedEnquiry.notes && selectedEnquiry.notes.length > 0 ? (
                    selectedEnquiry.notes.map((note, idx) => (
                      <div key={idx} className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-200/60 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                          <span className="font-bold text-[#10221b]">{note.author || 'Staff'}</span>
                          <span>{new Date(note.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-700">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs italic">No internal notes added yet.</p>
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add an internal note or update (e.g. called traveler, sent custom quote)..."
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#f29727]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#10221b] text-[#f29727] font-semibold text-xs rounded-lg hover:bg-[#1c382e]"
                  >
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
