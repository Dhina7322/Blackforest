import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-24 px-4 bg-[#fbfaf8] text-center animate-fadeIn">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 bg-amber-50 text-[#f29727] rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-10 h-10 animate-spin duration-10000" />
        </div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block">
          404 Error
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#10221b]">
          Off The Map
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          The travel destination or itinerary page you are seeking does not exist or has been relocated in our catalog.
        </p>
        <div className="pt-2 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-[#10221b] text-[#f29727] hover:bg-[#1c382e] text-xs uppercase font-bold tracking-wider rounded-full shadow-lg transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/destinations"
            className="px-6 py-3 bg-white text-gray-800 hover:bg-gray-100 text-xs uppercase font-bold tracking-wider rounded-full border border-gray-200 transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#f29727]" />
            <span>Destinations</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
