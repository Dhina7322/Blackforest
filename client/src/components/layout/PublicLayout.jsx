import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import EnquiryModal from '../forms/EnquiryModal';
import SearchModal from '../forms/SearchModal';
import FloatingActions from '../common/FloatingActions';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf8] text-[#10221b] selection:bg-[#f29727] selection:text-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <EnquiryModal />
      <SearchModal />
      <FloatingActions />
    </div>
  );
}
