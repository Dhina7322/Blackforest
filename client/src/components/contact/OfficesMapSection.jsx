import React, { useState } from 'react';
import { MapPin, ExternalLink, Plus, Minus, ArrowRight } from 'lucide-react';

export default function OfficesMapSection() {
  const [selectedOffice, setSelectedOffice] = useState('bengaluru');
  const [zoomLevel, setZoomLevel] = useState(1);

  const offices = {
    bengaluru: {
      name: 'BENGALURU',
      area: 'Indiranagar',
      cityState: 'Bengaluru, Karnataka, India',
      fullAddress: '737, 3rd Floor, Kheny Plaza CMH Main Road, 2nd Cross Rd, Binnamangala, Indiranagar, Bengaluru, Karnataka 560038',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Black+Forest+Holidays+Indiranagar+Bengaluru+560038',
      embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.026778432321!2d77.6401!3d12.9784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a75f1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka%20560038!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      x: 510,
      y: 175,
    },
    coimbatore: {
      name: 'COIMBATORE',
      area: 'Gandhipuram',
      cityState: 'Coimbatore, Tamil Nadu, India',
      fullAddress: '76, 1st floor, 8th Street, Crosscut Road, Gandhipuram, Coimbatore – 641012',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Black+Forest+Holidays+Crosscut+Road+Gandhipuram+Coimbatore+641012',
      embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1437877209865!2d76.9535091!3d11.0278146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858f69d356885%3A0x6b87611636c7a979!2sSaibaba%20Colony%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      x: 480,
      y: 285,
    },
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.15, 1.45));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.15, 0.9));
  };

  return (
    <section className="bg-[#fbf9f5] py-16 sm:py-20 lg:py-24 border-t border-[#ede8e1] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Header Matching Reference Design */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-block">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.25em] text-[#1c382e] block">
              VISIT US
            </span>
            <div className="w-10 h-[1.5px] bg-[#1c382e] mx-auto mt-2" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#10221b] tracking-tight font-sans mt-4 mb-3">
            Our Offices
          </h2>

          <p className="text-gray-600 text-sm sm:text-base font-light max-w-md mx-auto">
            Connect with our travel experts in person.
          </p>
        </div>

        {/* 2. Panoramic Regional Map Card (South India) */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e4dfd6] shadow-[0_4px_25px_rgba(0,0,0,0.06)] bg-[#bdd5e3] select-none">

          {/* Outer Map SVG Container */}
          <div
            className="w-full h-[360px] sm:h-[420px] md:h-[460px] relative overflow-hidden transition-transform duration-500 ease-out"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: selectedOffice === 'bengaluru' ? '52% 38%' : '48% 60%',
            }}
          >
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full object-cover"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Subtle terrain elevation gradient for Western Ghats */}
                <linearGradient id="westernGhats" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dbe5cf" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#c8d7b8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#d5e0cb" stopOpacity="0.7" />
                </linearGradient>

                {/* Soft land texture gradient */}
                <radialGradient id="landGlow" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#f4f0e6" />
                  <stop offset="70%" stopColor="#ece7dc" />
                  <stop offset="100%" stopColor="#e3ded2" />
                </radialGradient>

                {/* Pin shadow filter */}
                <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
                </filter>
                <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="130%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Water Background (Arabian Sea & Bay of Bengal) */}
              <rect x="0" y="0" width="1000" height="500" fill="#bdd5e3" />

              {/* Landmass of South India (Peninsula) */}
              <path
                d="M 280 0 
                   Q 300 80, 310 130 
                   Q 330 200, 350 250 
                   Q 370 310, 390 380 
                   Q 400 420, 420 480 
                   L 440 500 
                   L 550 500 
                   Q 620 440, 650 360 
                   Q 670 290, 680 230 
                   Q 690 160, 710 100 
                   L 730 0 
                   Z"
                fill="url(#landGlow)"
                stroke="#a6c0ce"
                strokeWidth="1.5"
              />

              {/* Western Ghats Shading & Relief (Lush Green Mountains) */}
              <path
                d="M 315 130
                   Q 345 200, 360 250
                   Q 375 300, 390 360
                   Q 410 410, 418 460
                   Q 440 430, 435 370
                   Q 420 300, 400 240
                   Q 375 180, 350 120
                   Z"
                fill="url(#westernGhats)"
                opacity="0.65"
              />

              {/* Internal State Boundaries (Karnataka & Tamil Nadu Dotted Line) */}
              <path
                d="M 350 210 Q 420 220, 480 235 T 570 230 Q 640 240, 680 230"
                fill="none"
                stroke="#c7bfb3"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <path
                d="M 480 235 Q 490 280, 520 330 Q 560 380, 590 410"
                fill="none"
                stroke="#c7bfb3"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />

              {/* Water Labels */}
              <text
                x="180"
                y="270"
                fill="#486576"
                fontSize="18"
                fontFamily="serif"
                fontStyle="italic"
                letterSpacing="1.5"
                opacity="0.85"
              >
                Arabian
              </text>
              <text
                x="195"
                y="295"
                fill="#486576"
                fontSize="18"
                fontFamily="serif"
                fontStyle="italic"
                letterSpacing="1.5"
                opacity="0.85"
              >
                Sea
              </text>

              <text
                x="760"
                y="220"
                fill="#486576"
                fontSize="18"
                fontFamily="serif"
                fontStyle="italic"
                letterSpacing="1.5"
                opacity="0.85"
              >
                Bay of Bengal
              </text>

              {/* State Labels */}
              <text
                x="365"
                y="135"
                fill="#596a5f"
                fontSize="13"
                fontWeight="700"
                letterSpacing="2.5"
                opacity="0.9"
              >
                KARNATAKA
              </text>

              <text
                x="485"
                y="380"
                fill="#596a5f"
                fontSize="13"
                fontWeight="700"
                letterSpacing="2.5"
                opacity="0.9"
              >
                TAMIL NADU
              </text>

              {/* Reference City Points */}
              {/* Mangaluru */}
              <circle cx="330" cy="195" r="3" fill="#2d3748" />
              <text x="315" y="198" textAnchor="end" fill="#2d3748" fontSize="12" fontWeight="500">
                Mangaluru
              </text>

              {/* Mysuru */}
              <circle cx="415" cy="245" r="3" fill="#2d3748" />
              <text x="425" y="248" fill="#2d3748" fontSize="12" fontWeight="500">
                Mysuru
              </text>

              {/* Kochi */}
              <circle cx="395" cy="390" r="3" fill="#2d3748" />
              <text x="385" y="393" textAnchor="end" fill="#2d3748" fontSize="12" fontWeight="500">
                Kochi
              </text>

              {/* Chennai */}
              <circle cx="670" cy="170" r="3" fill="#2d3748" />
              <text x="682" y="174" fill="#2d3748" fontSize="12" fontWeight="500">
                Chennai
              </text>

              {/* Tiruchirappalli */}
              <circle cx="595" cy="325" r="3" fill="#2d3748" />
              <text x="605" y="328" fill="#2d3748" fontSize="12" fontWeight="500">
                Tiruchirappalli
              </text>

              {/* ── OFFICE PIN 1: BENGALURU ── */}
              <g
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedOffice('bengaluru')}
                filter="url(#pinShadow)"
              >
                {/* Office Label Under Pin (City Label) */}
                <text
                  x={offices.bengaluru.x + 10}
                  y={offices.bengaluru.y + 36}
                  textAnchor="middle"
                  fill="#10221b"
                  fontSize="12.5"
                  fontWeight="600"
                >
                  Bengaluru
                </text>

                {/* Dark Forest Green Teardrop Marker */}
                <path
                  d={`M ${offices.bengaluru.x} ${offices.bengaluru.y}
                     C ${offices.bengaluru.x - 14} ${offices.bengaluru.y - 12}, 
                       ${offices.bengaluru.x - 14} ${offices.bengaluru.y - 30}, 
                       ${offices.bengaluru.x} ${offices.bengaluru.y - 30}
                     C ${offices.bengaluru.x + 14} ${offices.bengaluru.y - 30}, 
                       ${offices.bengaluru.x + 14} ${offices.bengaluru.y - 12}, 
                       ${offices.bengaluru.x} ${offices.bengaluru.y} Z`}
                  fill="#0d281e"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* White Pine Trees Icon Inside Pin */}
                <path
                  d={`M ${offices.bengaluru.x} ${offices.bengaluru.y - 25}
                     L ${offices.bengaluru.x - 4} ${offices.bengaluru.y - 18}
                     L ${offices.bengaluru.x - 2} ${offices.bengaluru.y - 18}
                     L ${offices.bengaluru.x - 5} ${offices.bengaluru.y - 12}
                     L ${offices.bengaluru.x + 5} ${offices.bengaluru.y - 12}
                     L ${offices.bengaluru.x + 2} ${offices.bengaluru.y - 18}
                     L ${offices.bengaluru.x + 4} ${offices.bengaluru.y - 18} Z
                     M ${offices.bengaluru.x - 0.75} ${offices.bengaluru.y - 12}
                     L ${offices.bengaluru.x - 0.75} ${offices.bengaluru.y - 9}
                     L ${offices.bengaluru.x + 0.75} ${offices.bengaluru.y - 9}
                     L ${offices.bengaluru.x + 0.75} ${offices.bengaluru.y - 12} Z`}
                  fill="#ffffff"
                />

                {/* White Pill Badge Attached to Right */}
                <g transform={`translate(${offices.bengaluru.x + 16}, ${offices.bengaluru.y - 32})`} filter="url(#badgeShadow)">
                  <rect
                    width="68"
                    height="24"
                    rx="6"
                    fill="#ffffff"
                    stroke={selectedOffice === 'bengaluru' ? '#0d281e' : '#e2ded5'}
                    strokeWidth={selectedOffice === 'bengaluru' ? '1.5' : '1'}
                  />
                  <text
                    x="34"
                    y="16"
                    textAnchor="middle"
                    fill="#10221b"
                    fontSize="11.5"
                    fontWeight="700"
                  >
                    Bengaluru
                  </text>
                </g>
              </g>

              {/* ── OFFICE PIN 2: COIMBATORE ── */}
              <g
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedOffice('coimbatore')}
                filter="url(#pinShadow)"
              >
                {/* Dark Forest Green Teardrop Marker */}
                <path
                  d={`M ${offices.coimbatore.x} ${offices.coimbatore.y}
                     C ${offices.coimbatore.x - 14} ${offices.coimbatore.y - 12}, 
                       ${offices.coimbatore.x - 14} ${offices.coimbatore.y - 30}, 
                       ${offices.coimbatore.x} ${offices.coimbatore.y - 30}
                     C ${offices.coimbatore.x + 14} ${offices.coimbatore.y - 30}, 
                       ${offices.coimbatore.x + 14} ${offices.coimbatore.y - 12}, 
                       ${offices.coimbatore.x} ${offices.coimbatore.y} Z`}
                  fill="#0d281e"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* White Pine Trees Icon Inside Pin */}
                <path
                  d={`M ${offices.coimbatore.x} ${offices.coimbatore.y - 25}
                     L ${offices.coimbatore.x - 4} ${offices.coimbatore.y - 18}
                     L ${offices.coimbatore.x - 2} ${offices.coimbatore.y - 18}
                     L ${offices.coimbatore.x - 5} ${offices.coimbatore.y - 12}
                     L ${offices.coimbatore.x + 5} ${offices.coimbatore.y - 12}
                     L ${offices.coimbatore.x + 2} ${offices.coimbatore.y - 18}
                     L ${offices.coimbatore.x + 4} ${offices.coimbatore.y - 18} Z
                     M ${offices.coimbatore.x - 0.75} ${offices.coimbatore.y - 12}
                     L ${offices.coimbatore.x - 0.75} ${offices.coimbatore.y - 9}
                     L ${offices.coimbatore.x + 0.75} ${offices.coimbatore.y - 9}
                     L ${offices.coimbatore.x + 0.75} ${offices.coimbatore.y - 12} Z`}
                  fill="#ffffff"
                />

                {/* White Pill Badge Attached to Right */}
                <g transform={`translate(${offices.coimbatore.x + 16}, ${offices.coimbatore.y - 32})`} filter="url(#badgeShadow)">
                  <rect
                    width="76"
                    height="24"
                    rx="6"
                    fill="#ffffff"
                    stroke={selectedOffice === 'coimbatore' ? '#0d281e' : '#e2ded5'}
                    strokeWidth={selectedOffice === 'coimbatore' ? '1.5' : '1'}
                  />
                  <text
                    x="38"
                    y="16"
                    textAnchor="middle"
                    fill="#10221b"
                    fontSize="11.5"
                    fontWeight="700"
                  >
                    Coimbatore
                  </text>
                </g>
              </g>

            </svg>
          </div>

          {/* ── Top-Left: Nautical Compass Rose ── */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 pointer-events-none select-none">
            <svg width="44" height="44" viewBox="0 0 100 100" className="opacity-75">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#4a5568" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="#4a5568" strokeWidth="1" />
              {/* Star points */}
              <polygon points="50,14 54,46 50,42 46,46" fill="#1c382e" />
              <polygon points="50,86 54,54 50,58 46,54" fill="#4a5568" />
              <polygon points="14,50 46,46 42,50 46,54" fill="#4a5568" />
              <polygon points="86,50 54,46 58,50 54,54" fill="#4a5568" />
              {/* Compass Labels */}
              <text x="50" y="10" textAnchor="middle" fill="#1c382e" fontSize="9" fontWeight="bold">N</text>
              <text x="50" y="98" textAnchor="middle" fill="#4a5568" fontSize="9" fontWeight="bold">S</text>
              <text x="96" y="53" textAnchor="start" fill="#4a5568" fontSize="9" fontWeight="bold">E</text>
              <text x="4" y="53" textAnchor="end" fill="#4a5568" fontSize="9" fontWeight="bold">W</text>
            </svg>
          </div>

          {/* ── Bottom-Left: Google Watermark ── */}
          <div className="absolute bottom-3.5 left-4 sm:left-6 pointer-events-none select-none">
            <span className="font-bold text-sm tracking-tight drop-shadow-sm flex items-center">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
          </div>

          {/* ── Bottom-Right: Zoom Controls and Open in Google Maps ── */}
          <div className="absolute bottom-3.5 right-4 sm:right-6 flex items-center gap-3">
            {/* Open in Google Maps Link */}
            <a
              href={offices[selectedOffice].googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-white/95 hover:bg-white text-[#10221b] text-xs font-medium rounded-lg shadow-sm border border-gray-200/80 flex items-center gap-1.5 transition-all hover:shadow cursor-pointer backdrop-blur-xs"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Zoom Controls (+ / -) */}
            <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200/80 overflow-hidden">
              <button
                onClick={handleZoomIn}
                aria-label="Zoom in"
                className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-100 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleZoomOut}
                aria-label="Zoom out"
                className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* 3. Office Location Cards (2 Columns Below the Map) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-6 sm:mt-8">

          {/* Card 1: BENGALURU */}
          <div
            onClick={() => setSelectedOffice('bengaluru')}
            className={`bg-white rounded-2xl border p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 relative overflow-hidden flex items-start justify-between cursor-pointer ${selectedOffice === 'bengaluru'
                ? 'border-[#10221b] ring-1 ring-[#10221b]/20 shadow-md'
                : 'border-[#e8e4dc] hover:border-[#10221b]/40 hover:shadow-md'
              }`}
          >
            <div className="flex items-start gap-4 sm:gap-5 z-10">
              {/* Location Pin Icon in Warm Beige Circle */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#f4ede4] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-[#10221b]" />
              </div>

              {/* Office Details */}
              <div>
                <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#10221b] mb-1.5 font-sans">
                  BENGALURU
                </h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  Indiranagar
                </p>
                <p className="text-gray-600 text-sm font-light leading-relaxed mb-4">
                  Bengaluru, Karnataka, India
                </p>

                <a
                  href={offices.bengaluru.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10221b] hover:text-[#5ba14a] transition-colors uppercase tracking-wider"
                >
                  <span>View Location</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Delicate Pine Trees Watermark on the Right */}
            <div className="absolute right-3 sm:right-5 bottom-3 sm:bottom-4 pointer-events-none opacity-30 select-none">
              <svg width="68" height="74" viewBox="0 0 100 110" fill="none" stroke="#10221b" strokeWidth="1.2">
                {/* Large Pine Tree */}
                <path d="M 50 10 L 40 28 L 44 28 L 34 48 L 39 48 L 28 72 L 46 72 L 46 95 L 54 95 L 54 72 L 72 72 L 61 48 L 66 48 L 56 28 L 60 28 Z" />
                {/* Small Pine Tree on right */}
                <path d="M 78 40 L 71 52 L 74 52 L 66 68 L 70 68 L 60 88 L 74 88 L 74 100 L 80 100 L 80 88 L 94 88 L 84 68 L 88 68 L 80 52 L 83 52 Z" />
              </svg>
            </div>
          </div>

          {/* Card 2: COIMBATORE */}
          <div
            onClick={() => setSelectedOffice('coimbatore')}
            className={`bg-white rounded-2xl border p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 relative overflow-hidden flex items-start justify-between cursor-pointer ${selectedOffice === 'coimbatore'
                ? 'border-[#10221b] ring-1 ring-[#10221b]/20 shadow-md'
                : 'border-[#e8e4dc] hover:border-[#10221b]/40 hover:shadow-md'
              }`}
          >
            <div className="flex items-start gap-4 sm:gap-5 z-10">
              {/* Location Pin Icon in Warm Beige Circle */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#f4ede4] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-[#10221b]" />
              </div>

              {/* Office Details */}
              <div>
                <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#10221b] mb-1.5 font-sans">
                  COIMBATORE
                </h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  Saibaba Colony
                </p>
                <p className="text-gray-600 text-sm font-light leading-relaxed mb-4">
                  Coimbatore, Tamil Nadu, India
                </p>

                <a
                  href={offices.coimbatore.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10221b] hover:text-[#5ba14a] transition-colors uppercase tracking-wider"
                >
                  <span>View Location</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Delicate Pine Trees Watermark on the Right */}
            <div className="absolute right-3 sm:right-5 bottom-3 sm:bottom-4 pointer-events-none opacity-30 select-none">
              <svg width="68" height="74" viewBox="0 0 100 110" fill="none" stroke="#10221b" strokeWidth="1.2">
                {/* Large Pine Tree */}
                <path d="M 50 10 L 40 28 L 44 28 L 34 48 L 39 48 L 28 72 L 46 72 L 46 95 L 54 95 L 54 72 L 72 72 L 61 48 L 66 48 L 56 28 L 60 28 Z" />
                {/* Small Pine Tree on right */}
                <path d="M 78 40 L 71 52 L 74 52 L 66 68 L 70 68 L 60 88 L 74 88 L 74 100 L 80 100 L 80 88 L 94 88 L 84 68 L 88 68 L 80 52 L 83 52 Z" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
