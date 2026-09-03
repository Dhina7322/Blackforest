import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MailQuestion,
  Plane,
  MapPin,
  BookOpen,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  PlusCircle,
  Compass,
  Eye
} from 'lucide-react';
import { dashboardService } from '../../services/allServices';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await dashboardService.getStats();
        if (res.success && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-500 gap-2">
        <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
        <span>Loading dashboard analytics...</span>
      </div>
    );
  }

  const statusColors = {
    new: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    contacted: 'bg-blue-100 text-blue-800 border-blue-300',
    in_progress: 'bg-amber-100 text-amber-800 border-amber-300',
    quoted: 'bg-purple-100 text-purple-800 border-purple-300',
    converted: 'bg-teal-100 text-teal-800 border-teal-300',
    closed: 'bg-gray-100 text-gray-700 border-gray-300'
  };

  return (
    <div className="space-y-10 animate-fadeIn font-sans bg-gray-50/30 min-h-screen">
      {/* Quick Action Shortcuts */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#10221b]">Admin Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Live overview of enquiries, tours, and content.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/tours/new"
            className="px-5 py-2.5 bg-[#10221b] text-white hover:bg-[#1c382e] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <PlusCircle className="w-4 h-4 text-[#f29727]" />
            <span>New Tour</span>
          </Link>
          <Link
            to="/admin/enquiries"
            className="px-5 py-2.5 bg-[#f29727] text-[#10221b] hover:bg-[#db841a] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <MailQuestion className="w-4 h-4" />
            <span>Enquiries</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Enquiries</span>
              <h3 className="text-4xl font-serif font-bold text-[#10221b] mt-2">{stats?.enquiries?.total || 0}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#f29727]/10 text-[#f29727] flex items-center justify-center">
              <MailQuestion className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-emerald-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {stats?.enquiries?.new || 0} New Leads
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Tours</span>
              <h3 className="text-4xl font-serif font-bold text-[#10221b] mt-2">{stats?.tours?.total || 0}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#10221b]/5 text-[#10221b] flex items-center justify-center">
              <Plane className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-gray-500">
            {stats?.tours?.published || 0} Published
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Destinations</span>
              <h3 className="text-4xl font-serif font-bold text-[#10221b] mt-2">{stats?.destinations?.total || 0}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#10221b]/5 text-[#10221b] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-gray-500">
            Global catalog
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Articles</span>
              <h3 className="text-4xl font-serif font-bold text-[#10221b] mt-2">{stats?.articles?.total || 0}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#10221b]/5 text-[#10221b] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-gray-500">
            Journal entries
          </div>
        </div>
      </div>

      {/* Enquiry Pipeline Distribution Bar */}
      {stats?.enquiries && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-serif font-bold text-[#10221b]">Pipeline Status</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Object.entries(stats.enquiries.byStatus || {}).map(([st, count]) => (
              <div key={st} className="relative p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors group">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">
                  {st.replace('_', ' ')}
                </span>
                <span className="text-2xl font-serif font-bold text-[#10221b] block">{count}</span>
                {/* Decorative dot */}
                <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity ${
                  st === 'new' ? 'bg-emerald-500' : 
                  st === 'converted' ? 'bg-[#f29727]' : 
                  'bg-gray-300'
                }`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-[#10221b]">Recent Inquiries</h3>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold uppercase tracking-wider text-[#f29727] hover:text-[#db841a] flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
              <tr>
                <th className="py-4 px-8 font-semibold">Traveler</th>
                <th className="py-4 px-8 font-semibold">Destination</th>
                <th className="py-4 px-8 font-semibold">Travel Date</th>
                <th className="py-4 px-8 font-semibold">Status</th>
                <th className="py-4 px-8 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
                stats.recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-8">
                      <div className="font-semibold text-gray-900">{enq.name}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{enq.email}</div>
                    </td>
                    <td className="py-4 px-8 text-gray-600">
                      {enq.destination || 'Custom Journey'}
                    </td>
                    <td className="py-4 px-8 text-gray-500 text-xs">
                      {enq.travelDate || 'Flexible'}
                    </td>
                    <td className="py-4 px-8">
                      <span
                        className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                          statusColors[enq.status] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {enq.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-8 text-right">
                      <Link
                        to="/admin/enquiries"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-gray-400 hover:text-[#f29727] font-medium text-xs rounded transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <span>Review</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-400 text-sm">
                    No recent inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
