import React from 'react';

export default function ExpertiseSection() {
  const partners = [
    { id: 1, name: 'IATA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/IATA_logo.svg/512px-IATA_logo.svg.png' },
    { id: 2, name: 'ATOL', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/ATOL_logo.svg/200px-ATOL_logo.svg.png' },
    { id: 3, name: 'ABTA', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/ABTA_logo.svg/200px-ABTA_logo.svg.png' },
    { id: 4, name: 'Travel Trust Association', logo: 'https://www.traveltrust.co.uk/Images/TTA-Logo.png' },
    { id: 5, name: 'CLIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/CLIA_logo.svg/200px-CLIA_logo.svg.png' },
    { id: 6, name: 'AITO', logo: 'https://www.aito.com/img/aito-logo.png' },
    { id: 7, name: 'British Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/British_Airways_Logo.svg/200px-British_Airways_Logo.svg.png' },
    { id: 8, name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png' },
    { id: 9, name: 'Virgin Atlantic', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Virgin_Atlantic_logo.svg/200px-Virgin_Atlantic_logo.svg.png' },
    { id: 10, name: 'Qatar Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/200px-Qatar_Airways_Logo.svg.png' }
  ];

  return (
    <section className="pt-20 pb-10 bg-[#f7f9f8] text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12">
          <span className="text-[#c7a456] font-semibold text-xs uppercase tracking-widest block mb-2">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#10221b] mb-4">
            Knowledge Behind Every Journey
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto italic">
            We collaborate with the world's finest travel networks and luxury partners to ensure an unparalleled standard of excellence.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="bg-white border border-gray-200 p-6 flex flex-col items-center justify-center min-h-[120px] rounded hover:shadow-md transition-shadow"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/100x50?text='+partner.name;
                }}
              />
              <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-3 font-semibold text-center leading-tight">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
