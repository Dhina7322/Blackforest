import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plane,
  PlusCircle,
  Search,
  Copy,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Star,
  ExternalLink
} from 'lucide-react';
import { tourService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { showToast } = useToast();

  const fetchTours = async () => {
    setLoading(true);
    try {
      const params = {};
      if (categoryFilter !== 'all') params.category = categoryFilter;
      if (search.trim()) params.search = search.trim();

      const res = await tourService.getAll(params);
      if (res.success && res.data) {
        setTours(res.data.tours || []);
      }
    } catch (err) {
      console.error('Error loading tours:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [categoryFilter, search]);

  const handleDuplicate = async (tourId) => {
    try {
      const res = await tourService.duplicate(tourId);
      if (res.success) {
        showToast('Tour package duplicated successfully!', 'success');
        fetchTours();
      }
    } catch (err) {
      showToast('Failed to duplicate tour', 'error');
    }
  };

  const handleStatusToggle = async (tour) => {
    const nextStatus = tour.status === 'published' ? 'draft' : 'published';
    try {
      const res = await tourService.updateStatus(tour.id, nextStatus);
      if (res.success) {
        showToast(`Tour set to ${nextStatus}`, 'success');
        setTours((prev) =>
          prev.map((t) => (t.id === tour.id ? { ...t, status: nextStatus } : t))
        );
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (tourId) => {
    if (!window.confirm('Are you sure you want to delete this tour package?')) return;
    try {
      const res = await tourService.delete(tourId);
      if (res.success) {
        showToast('Tour package deleted', 'info');
        setTours((prev) => prev.filter((t) => t.id !== tourId));
      }
    } catch (err) {
      showToast('Failed to delete tour', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Tour Package Catalog</h2>
          <p className="text-xs text-gray-500">Manage, author, duplicate, and publish international and domestic travel packages.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f29727]"
          >
            <option value="all">All Categories</option>
            <option value="international">International</option>
            <option value="india">India</option>
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tours..."
              className="pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#f29727] w-48"
            />
          </div>

          <Link
            to="/admin/tours/new"
            className="px-4 py-2 bg-[#10221b] text-[#f29727] hover:bg-[#1c382e] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Package</span>
          </Link>
        </div>
      </div>

      {/* Tours Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
          <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
          <span>Loading tour packages...</span>
        </div>
      ) : tours.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
          <Plane className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-700">No tour packages found</h3>
          <p className="text-xs text-gray-400 mt-1">Create your first package or adjust filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-[#f29727]/50 transition-all"
            >
              {/* Tour Card Header Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={tour.coverImage || '/images/destinations/destinations-151245397979.webp'}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 text-white text-[10px] font-bold uppercase rounded-full">
                  {tour.category === 'india' ? 'India' : 'International'}
                </div>

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleStatusToggle(tour)}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow border ${
                      tour.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-amber-50 text-amber-700 border-amber-300'
                    }`}
                  >
                    {tour.status}
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 text-xs text-white font-medium flex items-center gap-1.5 drop-shadow">
                  <Clock className="w-3.5 h-3.5 text-[#f29727]" />
                  <span>{tour.duration}</span>
                </div>
              </div>

              {/* Tour Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#10221b] line-clamp-1 mb-1">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                    {tour.shortDescription}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Starting: <strong className="text-sm font-bold text-[#f29727]">${tour.price}</strong></span>
                    <span className="text-[11px] text-gray-400">{tour.itinerary?.length || 0} Itinerary Days</span>
                  </div>
                </div>

                {/* Card Actions Bar */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/tours/${tour.slug}`}
                      target="_blank"
                      className="p-1.5 text-gray-400 hover:text-[#10221b] rounded-lg hover:bg-gray-100"
                      title="View on live site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDuplicate(tour.id)}
                      className="p-1.5 text-gray-400 hover:text-[#f29727] rounded-lg hover:bg-gray-100"
                      title="Duplicate package"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                      title="Delete package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Link
                    to={`/admin/tours/${tour.id}/edit`}
                    className="px-3 py-1.5 bg-[#10221b] hover:bg-[#1c382e] text-[#f29727] text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
