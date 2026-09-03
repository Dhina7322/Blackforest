import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { ToastProvider } from './context/ToastContext';
import ScrollToTop from './components/common/ScrollToTop';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import DestinationsPage from './pages/public/DestinationsPage';
import DestinationDetailPage from './pages/public/DestinationDetailPage';
import ToursPage from './pages/public/ToursPage';
import TourDetailPage from './pages/public/TourDetailPage';
import ExperiencesPage from './pages/public/ExperiencesPage';
import ConciergePage from './pages/public/ConciergePage';
import CorporateTravelPage from './pages/public/CorporateTravelPage';
import CoachTourPage from './pages/public/CoachTourPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import JournalPage from './pages/public/JournalPage';
import ArticleDetailPage from './pages/public/ArticleDetailPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';
import AdminToursPage from './pages/admin/AdminToursPage';
import AdminTourFormPage from './pages/admin/AdminTourFormPage';
import AdminDestinationsPage from './pages/admin/AdminDestinationsPage';
import AdminExperiencesPage from './pages/admin/AdminExperiencesPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminTestimonialsPage from './pages/admin/AdminTestimonialsPage';
import AdminJournalPage from './pages/admin/AdminJournalPage';
import AdminExpertisePage from './pages/admin/AdminExpertisePage';
import AdminMediaPage from './pages/admin/AdminMediaPage';
import AdminNavigationPage from './pages/admin/AdminNavigationPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminSEOPage from './pages/admin/AdminSEOPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminAuditLogsPage from './pages/admin/AdminAuditLogsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteSettingsProvider>
          <ToastProvider>
            <ScrollToTop />
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />

                {/* Destinations */}
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destinations/:slug" element={<DestinationDetailPage />} />

                {/* Tours */}
                <Route path="/international-tours" element={<ToursPage defaultCategory="international" />} />
                <Route path="/india-tours" element={<ToursPage defaultCategory="india" />} />
                <Route path="/tours/:slug" element={<TourDetailPage />} />

                {/* Experiences */}
                <Route path="/experiences" element={<ExperiencesPage />} />
                <Route path="/experiences/:slug" element={<ExperiencesPage />} />

                {/* Concierge & Specialized Services */}
                <Route path="/concierge" element={<ConciergePage />} />
                <Route path="/concierge/flight-booking" element={<ConciergePage />} />
                <Route path="/concierge/visa-assistance" element={<ConciergePage />} />
                <Route path="/concierge/cruises" element={<ConciergePage />} />

                {/* Group & Corporate */}
                <Route path="/corporate-travel" element={<CorporateTravelPage />} />
                <Route path="/coach-tour" element={<CoachTourPage />} />

                {/* Journal / Blog */}
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/journal/:slug" element={<ArticleDetailPage />} />

                {/* Company Pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Catch-all 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin Portal Authentication */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Admin Protected Dashboard Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="enquiries" element={<AdminEnquiriesPage />} />
                <Route path="tours" element={<AdminToursPage />} />
                <Route path="tours/new" element={<AdminTourFormPage />} />
                <Route path="tours/:id/edit" element={<AdminTourFormPage />} />
                <Route path="destinations" element={<AdminDestinationsPage />} />
                <Route path="experiences" element={<AdminExperiencesPage />} />
                <Route path="services" element={<AdminServicesPage />} />
                <Route path="testimonials" element={<AdminTestimonialsPage />} />
                <Route path="journal" element={<AdminJournalPage />} />
                <Route path="expertise" element={<AdminExpertisePage />} />
                <Route path="media" element={<AdminMediaPage />} />
                <Route path="navigation" element={<AdminNavigationPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="seo" element={<AdminSEOPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="audit-logs" element={<AdminAuditLogsPage />} />
              </Route>
            </Routes>
          </ToastProvider>
        </SiteSettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
