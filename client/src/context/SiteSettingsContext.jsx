import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { settingsService, navigationService } from '../services/allServices';

const SiteSettingsContext = createContext(null);

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    siteName: 'Black Forest Holidays',
    logo: 'https://blackforestholidays.com/wp-content/uploads/2021/07/white_logo.png',
    darkLogo: 'https://blackforestholidays.com/wp-content/uploads/2021/07/white_logo.png',
    phone: '+91 94470 12345',
    email: 'info@blackforestholidays.com',
    whatsapp: '+919447012345',
    address: 'Black Forest Holidays, Premium Travel Lounge, Cochin, Kerala, India',
    socialLinks: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    footerText: 'Blackforest Holidays is your trusted partner in creating unforgettable travel experiences. We believe that every journey should be more than just a trip—it should be a collection of wonderful memories.',
    copyright: '© 2026 Black Forest Holidays. All Rights Reserved.',
    defaultSeoTitle: 'Black Forest Holidays – Luxury Travel & Customized Holidays',
    defaultSeoDescription: 'Discover unforgettable travel experiences with customized holiday packages, honeymoon tours, family vacations, and international travel.'
  });

  const [navigation, setNavigation] = useState([]);
  const [loading, setLoading] = useState(true);

  // Global Enquiry Modal State
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryPrefill, setEnquiryPrefill] = useState({});

  // Global Search Modal State
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const fetchSettingsAndNav = useCallback(async () => {
    try {
      const [settingsRes, navRes] = await Promise.all([
        settingsService.get().catch(() => null),
        navigationService.getAll({ type: 'header' }).catch(() => null)
      ]);

      if (settingsRes?.success && settingsRes.data) {
        setSettings((prev) => ({ ...prev, ...settingsRes.data }));
      }
      if (navRes?.success && navRes.data) {
        setNavigation(navRes.data);
      }
    } catch (err) {
      console.warn('Could not fetch dynamic settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettingsAndNav();
  }, [fetchSettingsAndNav]);

  const openEnquiryModal = (prefill = {}) => {
    setEnquiryPrefill(prefill);
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryPrefill({});
  };

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        navigation,
        loading,
        refreshSettings: fetchSettingsAndNav,
        isEnquiryModalOpen,
        enquiryPrefill,
        openEnquiryModal,
        closeEnquiryModal,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
