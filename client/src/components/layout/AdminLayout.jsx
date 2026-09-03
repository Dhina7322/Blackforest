import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MailQuestion,
  Plane,
  MapPin,
  Compass,
  Star,
  BookOpen,
  Award,
  Image as ImageIcon,
  Menu as MenuIcon,
  Settings,
  Globe,
  Users,
  History,
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLayout() {
  const { user, isAuthenticated, logout, isSuperAdmin, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate('/admin/login', { replace: true });
    return null;
  }

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Enquiries / Leads', path: '/admin/enquiries', icon: MailQuestion, badge: 'Leads' },
    { label: 'Tour Packages', path: '/admin/tours', icon: Plane },
    { label: 'Destinations', path: '/admin/destinations', icon: MapPin },
    { label: 'Experiences', path: '/admin/experiences', icon: Compass },
    { label: 'Value Propositions', path: '/admin/services', icon: Sparkles },
    { label: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { label: 'Travel Journal', path: '/admin/journal', icon: BookOpen },
    { label: 'Partner Expertise', path: '/admin/expertise', icon: Award },
    { label: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { label: 'Navigation Menu', path: '/admin/navigation', icon: MenuIcon },
    { label: 'Website Settings', path: '/admin/settings', icon: Settings },
    { label: 'SEO Management', path: '/admin/seo', icon: Globe },
    ...(isAdmin ? [{ label: 'User Accounts', path: '/admin/users', icon: Users }] : []),
    { label: 'Audit Trail', path: '/admin/audit-logs', icon: History }
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#10221b] text-white flex flex-col justify-between transition-transform duration-300 transform lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg tracking-wider text-[#f29727]">
                BLACKFOREST
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-gray-300 font-mono">
                ADMIN
              </span>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#f29727] text-[#10221b] font-bold shadow-md'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#10221b]' : 'text-[#f29727]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#10221b] text-[#f29727]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Badge & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#f29727] text-[#10221b] flex items-center justify-center font-bold text-xs">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="truncate flex-1">
              <p className="text-xs font-bold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">{user?.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] font-medium transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 text-[11px] font-medium transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 capitalize">
              {location.pathname.replace('/admin/', '').replace(/-/g, ' ') || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-gray-500">
              Signed in as <strong className="text-gray-900">{user?.email}</strong>
            </span>
            <div className="h-4 w-px bg-gray-200 hidden sm:block" />
            <Link
              to="/"
              target="_blank"
              className="px-3 py-1.5 bg-[#10221b] hover:bg-[#1c382e] text-[#f29727] text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow"
            >
              <span>View Public Portal</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
