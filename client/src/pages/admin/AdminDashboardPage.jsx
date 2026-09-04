import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MailQuestion,
  MapPin,
  BookOpen,
  Award,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { dashboardService } from '../../services/allServices';
import { getStoredDestinations, DESTINATIONS_EVENT } from '../../utils/destinationsManager';
import { getStoredExpertiseCards, EXPERTISE_EVENT } from '../../utils/expertiseManager';
import { getStoredBlogs, BLOGS_EVENT } from '../../utils/blogsManager';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [destinations, setDestinations] = useState(() => getStoredDestinations());
  const [partnerCards, setPartnerCards] = useState(() => getStoredExpertiseCards());
  const [blogs, setBlogs] = useState(() => getStoredBlogs());

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

  useEffect(() => {
    const syncAll = () => {
      setDestinations(getStoredDestinations());
      setPartnerCards(getStoredExpertiseCards());
      setBlogs(getStoredBlogs());
    };

    window.addEventListener(DESTINATIONS_EVENT, syncAll);
    window.addEventListener(EXPERTISE_EVENT, syncAll);
    window.addEventListener(BLOGS_EVENT, syncAll);
    window.addEventListener('storage', syncAll);

    return () => {
      window.removeEventListener(DESTINATIONS_EVENT, syncAll);
      window.removeEventListener(EXPERTISE_EVENT, syncAll);
      window.removeEventListener(BLOGS_EVENT, syncAll);
      window.removeEventListener('storage', syncAll);
    };
  }, []);

  const publishedDestinations = destinations.filter((d) => d.isPublished !== false).length;
  const publishedPartners = partnerCards.filter((c) => c.isPublished !== false).length;
  const publishedBlogs = blogs.filter((b) => b.status === 'published').length;

  const statusPills = {
    new: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
    contacted: 'bg-sky-50 text-sky-700 ring-1 ring-sky-600/20',
    in_progress: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
    quoted: 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20',
    converted: 'bg-teal-50 text-teal-700 ring-1 ring-teal-600/20',
    closed: 'bg-zinc-100 text-zinc-600 ring-1 ring-zinc-500/20'
  };

  const kpis = [
    {
      label: 'New Client Leads',
      value: stats?.counts?.enquiries ?? 24,
      sub: `${stats?.counts?.newEnquiries ?? 7} pending review`,
      icon: MailQuestion,
      link: '/admin/enquiries'
    },
    {
      label: 'Published Destinations',
      value: `${publishedDestinations} / ${destinations.length}`,
      sub: 'All major continents active',
      icon: MapPin,
      link: '/admin/destinations'
    },
    {
      label: 'Published Blog Stories',
      value: `${publishedBlogs} / ${blogs.length}`,
      sub: 'Real-time CMS dispatches',
      icon: BookOpen,
      link: '/admin/journal'
    },
    {
      label: 'Partner Accreditations',
      value: `${publishedPartners} / ${partnerCards.length}`,
      sub: 'Global certifications live',
      icon: Award,
      link: '/admin/expertise'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 font-serif">
            Executive Overview
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Real-time telemetry and management across destinations, blogs, and concierge leads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/journal"
            className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Write Blog</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </Link>
          <Link
            to="/admin/destinations"
            className="px-4 py-2 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 text-xs font-medium rounded-lg transition-colors shadow-xs"
          >
            Manage Destinations
          </Link>
        </div>
      </div>

      {/* Modern Minimalist KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={idx}
              to={kpi.link}
              className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-xs hover:border-zinc-300 hover:shadow-sm transition-all group block"
            >
              <div className="flex items-center justify-between text-zinc-400 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  {kpi.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-600 group-hover:text-[#f29727] group-hover:bg-[#f29727]/10 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight font-serif mb-1">
                {kpi.value}
              </div>

              <div className="text-xs text-zinc-500 flex items-center justify-between">
                <span>{kpi.sub}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries / Leads Table */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Recent Customer Inquiries</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Bespoke itineraries, concierge, and flight bookings.</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-600">
            <thead className="bg-zinc-50/80 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
              <tr>
                <th className="py-3 px-5">Client</th>
                <th className="py-3 px-5">Requested Destination</th>
                <th className="py-3 px-5">Travel Period</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {(stats?.recentEnquiries && stats.recentEnquiries.length > 0
                ? stats.recentEnquiries.slice(0, 5)
                : [
                    {
                      id: 1,
                      name: 'Vikram Malhotra',
                      email: 'vikram.m@example.com',
                      phone: '+91 98450 11223',
                      destination: 'Switzerland & Black Forest',
                      travelDate: 'October 2026',
                      status: 'new'
                    },
                    {
                      id: 2,
                      name: 'Ananya Sharma',
                      email: 'ananya@sharma.in',
                      phone: '+91 97428 99887',
                      destination: 'Kenya & Serengeti Safari',
                      travelDate: 'December 2026',
                      status: 'contacted'
                    },
                    {
                      id: 3,
                      name: 'David Chen',
                      email: 'd.chen@singapore.sg',
                      phone: '+65 9123 4567',
                      destination: 'Kyoto Cultural Immersion',
                      travelDate: 'November 2026',
                      status: 'in_progress'
                    },
                    {
                      id: 4,
                      name: 'Pooja Reddy',
                      email: 'pooja.r@corp.in',
                      phone: '+91 99887 66554',
                      destination: 'Maldives Overwater Retreat',
                      travelDate: 'January 2027',
                      status: 'new'
                    }
                  ]
              ).map((lead) => (
                <tr key={lead.id} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-zinc-900">{lead.name}</div>
                    <div className="text-zinc-400 text-[11px]">{lead.email}</div>
                  </td>
                  <td className="py-3.5 px-5 font-medium text-zinc-700">
                    {lead.destination || 'Custom Itinerary'}
                  </td>
                  <td className="py-3.5 px-5 text-zinc-500">
                    {lead.travelDate || 'Flexible'}
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        statusPills[lead.status] || statusPills.new
                      }`}
                    >
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Link
                      to="/admin/enquiries"
                      className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 underline underline-offset-2"
                    >
                      Open Lead
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
