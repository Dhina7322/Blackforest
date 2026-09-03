import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        showToast('Welcome back to Blackforest Admin Portal!', 'success');
        navigate('/admin/dashboard');
      } else {
        showToast(res.message || 'Invalid credentials', 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const prefill = (adminEmail, adminPassword) => {
    setEmail(adminEmail);
    setPassword(adminPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#10221b] p-4 relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f29727]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1c382e] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#10221b] text-[#f29727] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-1">
            Secure Management
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#10221b]">
            Admin & Staff Portal
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Access leads, tour itineraries, CMS content, and analytics.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Account Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@blackforestholidays.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f29727]/30 focus:border-[#f29727]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f29727]/30 focus:border-[#f29727]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#10221b] hover:bg-[#1c382e] text-[#f29727] text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Seed Accounts Quick-Fill Helper */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 text-center">
            Demo Credentials
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => prefill('admin@blackforestholidays.com', 'Admin@123456')}
              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-xs border border-gray-200 transition-colors"
            >
              <span className="font-bold text-[#10221b] block">Super Admin</span>
              <span className="text-[10px] text-gray-400">admin@blackforest...</span>
            </button>
            <button
              type="button"
              onClick={() => prefill('editor@blackforestholidays.com', 'Editor@123456')}
              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left text-xs border border-gray-200 transition-colors"
            >
              <span className="font-bold text-[#10221b] block">Editor Staff</span>
              <span className="text-[10px] text-gray-400">editor@blackforest...</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-gray-500 hover:text-[#10221b] underline">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
