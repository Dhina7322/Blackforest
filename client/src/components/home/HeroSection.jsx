import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function HeroSection() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true); // start muted for autoplay, user can unmute

  // Autoplay on mount — browsers require muted for autoplay without interaction
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Silently ignore if browser blocks autoplay
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] md:h-[95vh] min-h-[520px] sm:min-h-[620px] max-h-[1050px] overflow-hidden bg-black flex items-center justify-center">

      {/* ── Full-screen Autoplay Background Video ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/hero-video-1080p60.mp4"
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          style={{
            display: 'block',
            filter: 'contrast(1.08) saturate(1.15) brightness(1.04)',
          }}
        />
        {/* Very light vignette only — no heavy dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.18) 100%)',
          }}
        />
      </div>

      {/* Top gradient for nav legibility — kept light so video stays vivid */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none z-10" />

      

      {/* ── Mute / Unmute Button (bottom-right) ── */}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        title={muted ? 'Click to unmute' : 'Click to mute'}
        className="absolute bottom-24 right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-white/30 text-white backdrop-blur-sm hover:bg-black/70 transition-all duration-200 cursor-pointer"
      >
        {muted
          ? <VolumeX className="w-5 h-5" />
          : <Volume2 className="w-5 h-5" />
        }
      </button>

      {/* ── Organic wave cutout at bottom ── */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          className="relative block w-full h-[60px] sm:h-[100px] md:h-[140px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <path
            d="M0,220 L1440,220 L1440,95 C1360,165 1270,35 1160,55 C1030,80 940,185 820,130 C710,75 620,20 500,55 C380,95 295,190 170,135 C95,95 45,150 0,110 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
