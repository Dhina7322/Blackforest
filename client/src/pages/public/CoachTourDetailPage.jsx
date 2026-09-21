import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroWave from '../../components/common/HeroWave';
import { Bus, Loader2 } from 'lucide-react';

export default function CoachTourDetailPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const iframe = document.getElementById('frame_cmp');
    let intervalId = null;

    // Listen for resize messages sent by Europamundo
    const handleMessage = (event) => {
      if (event.origin === 'https://www.europamundo.com' && iframe && event.data) {
        const heightVal = typeof event.data === 'number' ? `${event.data}px` : event.data;
        iframe.style.height = heightVal;
      }
    };

    // Poll Europamundo for content height
    const setupPostMessage = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage('getSize', 'https://www.europamundo.com');
          } catch (e) {
            // cross-origin protection
          }
        }
      }, 1000);
    };

    if (iframe) {
      iframe.addEventListener('load', setupPostMessage);
      window.addEventListener('message', handleMessage);

      // In case iframe has already loaded
      try {
        if (iframe.contentWindow) {
          setupPostMessage();
        }
      } catch (e) {
        // cross-origin
      }

      // Notify Europamundo telemetry
      try {
        const opeId = iframe.getAttribute('data-opeid');
        const ageId = iframe.getAttribute('data-ageid');
        fetch('https://appeuropamundo.europamundo.com/DataProviderEM.asmx/saveIFrame', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: 'Ad231@dsdd|#',
            url: window.location.href,
            opeID: opeId,
            ageID: ageId,
          }),
        }).catch(() => {});
      } catch (err) {
        // ignore network error
      }
    }

    // Load Europamundo's official resize script
    const script = document.createElement('script');
    script.src = 'https://www.europamundo.com/embed_v2/assets/scripts/iframeResizeHeight.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (iframe) {
        iframe.removeEventListener('load', setupPostMessage);
      }
      window.removeEventListener('message', handleMessage);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="animate-fadeIn bg-[#fbfaf8] font-sans text-gray-800 overflow-x-hidden min-h-screen">
      
      {/* 1. Hero Section matching Blackforest theme */}
      <section className="relative h-[50vh] min-h-[420px] flex flex-col justify-end">
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="/assets/images/backpacker_bg.jpg"
            alt="Coach Tour Details"
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/corporate-travel.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-[#10221b]/40 to-black/60"></div>
        </div>
        
        {/* Content with breadcrumb */}
        <div className="relative z-10 text-white mt-16 flex flex-col items-center pb-28 text-center px-4">
          <span className="text-[#27B8B1] text-xs uppercase font-bold tracking-[0.25em] mb-2 drop-shadow">
            Multi-Search Escorted Tours
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-wider mb-4 drop-shadow-xl font-serif">
            Coach Tour Details
          </h1>
          <div className="flex items-center justify-center gap-2.5 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-[#27B8B1] transition-colors">Home</Link>
            <span className="text-gray-300 text-xs">▾</span>
            <Link to="/coach-tour" className="hover:text-[#27B8B1] transition-colors">Coach Tour</Link>
            <span className="text-gray-300 text-xs">▾</span>
            <span className="text-[#27B8B1] font-medium">Coach Tour Details</span>
          </div>
        </div>

        {/* Curved Wave Mask */}
        <HeroWave />
      </section>

      {/* 2. Europamundo MultiSearch Embed Section */}
      <section className="relative z-10 bg-white py-4 min-h-[800px]">
        {/* Loading placeholder while iframe loads */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
            <div className="w-12 h-12 rounded-full bg-[#27B8B1]/10 flex items-center justify-center text-[#27B8B1] animate-pulse">
              <Bus className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin text-[#27B8B1]" />
              <span>Loading Europamundo Tour Search...</span>
            </div>
          </div>
        )}

        <div className="europamundo-wrapper w-full overflow-hidden">
          <iframe
            id="frame_cmp"
            src="https://www.europamundo.com/eng/embed/multisearch.aspx?opeIP=499&ageKEY=44220"
            frameBorder="0"
            scrolling="auto"
            style={{
              width: '100%',
              minWidth: '100%',
              border: 0,
              minHeight: '100vh',
              display: isLoading ? 'none' : 'block',
            }}
            data-opeid="499"
            data-ageid="44220"
            onLoad={() => setIsLoading(false)}
            title="Europamundo Multi Search"
          />
        </div>
      </section>

    </div>
  );
}
