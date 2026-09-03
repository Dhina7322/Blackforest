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
    <div className="space-y-8 animate-fadeIn">
      {/* Quick Action Shortcuts */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Blackforest Control Center</h2>
          <p className="text-xs text-gray-500">Live operational overview of travel leads, tours, and destination CMS.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/tours/new"
            className="px-4 py-2 bg-[#10221b] text-[#f29727] hover:bg-[#1c382e] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Tour</span>
          </Link>
          <Link
            to="/admin/enquiries"
            className="px-4 py-2 bg-[#f29727] text-[#10221b] hover:bg-[#db841a] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow"
          >
            <MailQuestion className="w-4 h-4" />
            <span>Manage Enquiries</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Enquiries</span>
            <h3 className="text-3xl font-bold text-[#10221b] mt-1">{stats?.enquiries?.total || 0}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
              {stats?.enquiries?.new || 0} New Unhandled Leads
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#f29727] flex items-center justify-center">
            <MailQuestion className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Tour Packages</span>
            <h3 className="text-3xl font-bold text-[#10221b] mt-1">{stats?.tours?.total || 0}</h3>
            <span className="text-[11px] text-gray-500 mt-1 inline-block">
              {stats?.tours?.published || 0} active on website
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Plane className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Destinations</span>
            <h3 className="text-3xl font-bold text-[#10221b] mt-1">{stats?.destinations?.total || 0}</h3>
            <span className="text-[11px] text-gray-500 mt-1 inline-block">
              Global & India catalog
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Travel Journal</span>
            <h3 className="text-3xl font-bold text-[#10221b] mt-1">{stats?.articles?.total || 0}</h3>
            <span className="text-[11px] text-gray-500 mt-1 inline-block">
              Published articles
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Enquiry Pipeline Distribution Bar */}
      {stats?.enquiries && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">Enquiry Status Pipeline</h3>
            <Link to="/admin/enquiries" className="text-xs text-[#f29727] font-semibold hover:underline">
              View All Leads →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
            {Object.entries(stats.enquiries.byStatus || {}).map(([st, count]) => (
              <div key={st} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold block">
                  {st.replace('_', ' ')}
                </span>
                <span className="text-xl font-bold text-gray-900 mt-1 block">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">Recent Customer Inquiries</h3>
            <p className="text-xs text-gray-500">Latest vacation and concierge requests submitted from the website.</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-semibold text-[#f29727] hover:text-[#db841a] flex items-center gap-1"
          >
            <span>Complete CRM Pipeline</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6 font-semibold">Traveler</th>
                <th className="py-3.5 px-6 font-semibold">Destination / Title</th>
                <th className="py-3.5 px-6 font-semibold">Travel Date</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold">Received</th>
                <th className="py-3.5 px-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
                stats.recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50 transition-colors">
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
                      <Link
                        to="/admin/enquiries"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-[#10221b] hover:text-[#f29727] text-gray-700 font-semibold rounded-lg transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400">
                    No customer inquiries received yet.
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
