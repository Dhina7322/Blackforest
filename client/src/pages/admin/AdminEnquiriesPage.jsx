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
  Wallet,
  MessageSquare,
  Clock,
  X,
  RefreshCw,
  Globe,
  ExternalLink,
  Send,
  UserCheck,
  Sparkles
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
        showToast('Enquiry deleted successfully', 'info');
        setEnquiries((prev) => prev.filter((e) => e.id !== enquiryId));
        if (selectedEnquiry?.id === enquiryId) setSelectedEnquiry(null);
      }
    } catch (err) {
      showToast('Failed to delete enquiry', 'error');
    }
  };

  const statusConfig = {
    new: {
      label: 'New Lead',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      dot: 'bg-emerald-500'
    },
    contacted: {
      label: 'Contacted',
      badge: 'bg-sky-50 text-sky-700 border-sky-200/80',
      dot: 'bg-sky-500'
    },
    in_progress: {
      label: 'In Progress',
      badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
      dot: 'bg-amber-500'
    },
    quoted: {
      label: 'Quote Sent',
      badge: 'bg-purple-50 text-purple-700 border-purple-200/80',
      dot: 'bg-purple-500'
    },
    converted: {
      label: 'Converted',
      badge: 'bg-teal-50 text-teal-700 border-teal-200/80',
      dot: 'bg-teal-500'
    },
    closed: {
      label: 'Closed',
      badge: 'bg-gray-100 text-gray-600 border-gray-200',
      dot: 'bg-gray-400'
    }
  };

  // Helper to format budget without any dollar sign
  const formatBudget = (budgetStr) => {
    if (!budgetStr) return 'Not Specified';
    // Remove any accidental $ sign from input
    return budgetStr.replace(/\$/g, '').trim();
  };

  // Helper for customer initials
  const getInitials = (name) => {
    if (!name) return 'BF';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const counts = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'new').length,
    inProgress: enquiries.filter(e => e.status === 'in_progress' || e.status === 'contacted').length,
    converted: enquiries.filter(e => e.status === 'converted').length
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* 1. Header & KPI Metric Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Leads & Enquiries CRM</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage incoming guest requests, track booking pipelines, and convert luxury itineraries.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors shadow-xs cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-gray-500' : 'text-gray-400'}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* 2. Minimalist Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Leads</span>
          <div className="text-2xl font-bold text-gray-900 mt-1">{counts.total}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-emerald-100/80 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">New Leads</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{counts.new}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-amber-100/80 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">In Pipeline</span>
          <div className="text-2xl font-bold text-amber-700 mt-1">{counts.inProgress}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-teal-100/80 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600">Converted</span>
          <div className="text-2xl font-bold text-teal-700 mt-1">{counts.converted}</div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, email, destination..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#10221b] cursor-pointer"
          >
            <option value="all">All Statuses ({counts.total})</option>
            <option value="new">New ({counts.new})</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="quoted">Quote Sent</option>
            <option value="converted">Converted (Booked)</option>
            <option value="closed">Closed / Archived</option>
          </select>
        </div>
      </div>

      {/* 4. Enquiries Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/70 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5 font-semibold">Guest / Customer</th>
                <th className="py-3.5 px-5 font-semibold">Destination</th>
                <th className="py-3.5 px-5 font-semibold">Travel Date</th>
                <th className="py-3.5 px-5 font-semibold">Budget (Person)</th>
                <th className="py-3.5 px-5 font-semibold">Status</th>
                <th className="py-3.5 px-5 font-semibold">Submitted</th>
                <th className="py-3.5 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-gray-300" />
                      <span>Loading real-time customer enquiries...</span>
                    </div>
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-gray-400">
                    <div className="max-w-sm mx-auto space-y-2">
                      <MailQuestion className="w-8 h-8 mx-auto text-gray-300" />
                      <p className="font-semibold text-gray-600 text-sm">No Enquiries Found</p>
                      <p className="text-xs text-gray-400">
                        {search || statusFilter !== 'all'
                          ? 'No matching leads match your filter criteria.'
                          : 'New customer submissions from the website contact forms will appear here live.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => {
                  const conf = statusConfig[enq.status] || statusConfig.new;
                  return (
                    <tr
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className={`hover:bg-gray-50/80 transition-colors cursor-pointer ${
                        selectedEnquiry?.id === enq.id ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      {/* Customer */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px] shrink-0">
                            {getInitials(enq.name)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-xs sm:text-[13px]">{enq.name}</div>
                            <div className="text-gray-400 text-[11px] flex items-center gap-1.5">
                              <span>{enq.phone}</span>
                              <span>•</span>
                              <span>{enq.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Destination */}
                      <td className="py-3.5 px-5">
                        <div className="font-medium text-gray-800 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{enq.destination || 'Custom Itinerary'}</span>
                        </div>
                      </td>

                      {/* Travel Date */}
                      <td className="py-3.5 px-5 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{enq.travelDate || 'Flexible'}</span>
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="py-3.5 px-5 font-medium text-gray-700">
                        {formatBudget(enq.budget)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${conf.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${conf.dot}`} />
                          <span>{conf.label}</span>
                        </span>
                      </td>

                      {/* Submitted */}
                      <td className="py-3.5 px-5 text-gray-400 text-[11px]">
                        {new Date(enq.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(enq)}
                            className="p-1.5 text-gray-500 hover:text-[#10221b] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            title="View Lead Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => handleDelete(enq.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Sleek Minimalist Detail Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/90 max-h-[90vh] flex flex-col animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shadow-xs">
                  {getInitials(selectedEnquiry.name)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {selectedEnquiry.name}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                      Lead #{selectedEnquiry.id}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                    <span>Source: {selectedEnquiry.source || 'Website Contact Form'}</span>
                    <span>•</span>
                    <span>{new Date(selectedEnquiry.createdAt).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
              
              {/* Status Pipeline Switcher */}
              <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/80 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                  Lead Pipeline Stage:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['new', 'contacted', 'in_progress', 'quoted', 'converted', 'closed'].map((st) => {
                    const active = selectedEnquiry.status === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        disabled={updatingStatus}
                        onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                          active
                            ? 'bg-[#10221b] text-white border-[#10221b] shadow-xs'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detail Info Grid (6 Minimalist Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Email */}
                <div className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider block">Email Address</span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="font-semibold text-gray-900 flex items-center gap-2 hover:text-emerald-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{selectedEnquiry.email}</span>
                  </a>
                </div>

                {/* Phone */}
                <div className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider block">Phone Number</span>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="font-semibold text-gray-900 flex items-center gap-2 hover:text-emerald-700 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{selectedEnquiry.phone}</span>
                  </a>
                </div>

                {/* Destination */}
                <div className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider block">Desired Destination</span>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{selectedEnquiry.destination || 'Custom Itinerary'}</span>
                  </p>
                </div>

                {/* Travel Dates & Travellers */}
                <div className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider block">Dates & Group Size</span>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{selectedEnquiry.travelDate || 'Flexible'} • {selectedEnquiry.travellers || '2 Adults'}</span>
                  </p>
                </div>

                {/* Budget Per Person (NO DOLLAR SIGN) */}
                <div className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider block">Budget Per Person</span>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{formatBudget(selectedEnquiry.budget)}</span>
                  </p>
                </div>

                {/* Lead Source */}
                <div className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100 space-y-1">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider block">Inquiry Channel</span>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{selectedEnquiry.source || 'Website Contact Form'}</span>
                  </p>
                </div>

              </div>

              {/* Customer Message */}
              <div className="space-y-1.5">
                <span className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                  Customer Message & Preferences
                </span>
                <div className="p-4 bg-gray-50/90 rounded-xl border-l-4 border-emerald-600 border-y border-r border-gray-200/80 text-gray-800 leading-relaxed whitespace-pre-line text-xs sm:text-sm font-normal">
                  {selectedEnquiry.message || 'No additional notes provided.'}
                </div>
              </div>

              {/* Staff CRM Notes */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <span className="text-gray-700 font-bold uppercase text-[11px] flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Internal Staff Notes ({selectedEnquiry.notes?.length || 0})</span>
                </span>

                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {selectedEnquiry.notes && selectedEnquiry.notes.length > 0 ? (
                    selectedEnquiry.notes.map((note, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200/70 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                          <span className="font-bold text-gray-800">{note.author || 'Admin Staff'}</span>
                          <span>{new Date(note.createdAt || note.date || Date.now()).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-700">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs italic py-1">No internal staff notes added yet.</p>
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add follow-up notes (e.g. called client, sent tailored quote)..."
                    className="flex-1 px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#10221b] hover:bg-black text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Add Note
                  </button>
                </form>
              </div>

            </div>

            {/* Modal Footer Quick Actions */}
            <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-semibold text-gray-700 transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Email Client</span>
                </a>
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-semibold text-gray-700 transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Phone</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
