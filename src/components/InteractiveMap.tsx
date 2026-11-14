'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { DESTINATIONS, REGIONS, Destination } from '@/data/destinations';
import { MapPin, Star, ArrowRight, Compass, Sun, Wind, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

export default function InteractiveMap() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activeDestination, setActiveDestination] = useState<Destination>(DESTINATIONS[0]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [mapLoaded, setMapLoaded] = useState(false);

  // Filtered destinations
  const filteredDestinations = selectedRegion === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.region === selectedRegion);

  // Initialize Leaflet Map dynamically on Client
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      
      const L = (await import('leaflet')).default;

      if (!isMounted) return;

      // Clean up previous map instance if re-initializing
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }

      // Vietnam geographical center roughly 16.0, 107.5
      const map = L.map(mapContainerRef.current, {
        center: [16.0544, 107.5],
        zoom: 6,
        scrollWheelZoom: false,
        attributionControl: false
      });

      // Luxurious Dark CartoDB Voyager or Dark Matter tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        subdomains: 'abcd',
      }).addTo(map);

      // Create Custom SVG Gold Marker Icon
      const createCustomIcon = (isActive: boolean) => {
        return L.divIcon({
          className: 'custom-leaflet-marker',
          html: `
            <div style="
              width: ${isActive ? '34px' : '26px'};
              height: ${isActive ? '34px' : '26px'};
              background: ${isActive ? '#D4AF37' : '#0F382C'};
              border: 2px solid ${isActive ? '#FFFFFF' : '#D4AF37'};
              border-radius: 50%;
              box-shadow: 0 4px 12px rgba(0,0,0,0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${isActive ? '#0F382C' : '#D4AF37'};
              font-weight: bold;
              transition: all 0.3s ease;
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          `,
          iconSize: [isActive ? 34 : 26, isActive ? 34 : 26],
          iconAnchor: [isActive ? 17 : 13, isActive ? 17 : 13],
        });
      };

      // Add markers
      const markers: { [key: string]: any } = {};
      DESTINATIONS.forEach((dest) => {
        const marker = L.marker(dest.coordinates, {
          icon: createCustomIcon(dest.id === activeDestination.id)
        }).addTo(map);

        marker.on('click', () => {
          setActiveDestination(dest);
          map.flyTo(dest.coordinates, 8, { duration: 1.2 });
        });

        markers[dest.id] = marker;
      });

      markersRef.current = markers;
      leafletMapRef.current = map;
      setMapLoaded(true);
    }

    initMap();

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Center and fly to destination when active destination changes
  const handleSelectDestination = (dest: Destination) => {
    setActiveDestination(dest);
    if (leafletMapRef.current) {
      leafletMapRef.current.flyTo(dest.coordinates, 8, { duration: 1.2 });
    }
  };

  return (
    <section id="interactive-map" className="py-20 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#0F382C] font-bold mb-2">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>Bản Đồ Trực Quan Tương Tác</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#121212]">
              Khám Phá Danh Thắng <span className="text-[#0F382C]">Dọc Miền Đất Nước</span>
            </h2>
            <p className="text-[#121212]/70 mt-2 text-sm sm:text-base max-w-xl">
              Chọn vùng miền hoặc nhấp trực tiếp vào các điểm ghim trên bản đồ để xem trước thông tin di sản, thời tiết và gợi ý trải nghiệm độc quyền.
            </p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-black/5 rounded-2xl border border-black/10">
            {REGIONS.map((region) => {
              const isActive = selectedRegion === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => {
                    setSelectedRegion(region.id);
                    // If current active destination is not in filtered list, set first
                    const list = region.id === 'all' ? DESTINATIONS : DESTINATIONS.filter(d => d.region === region.id);
                    if (list.length > 0 && !list.find(d => d.id === activeDestination.id)) {
                      handleSelectDestination(list[0]);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#0F382C] text-white shadow-md'
                      : 'text-[#121212]/70 hover:text-[#0F382C] hover:bg-white/60'
                  }`}
                >
                  {region.label} ({region.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Map Layout: Left Side List / Right Interactive Map & Floating Preview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Destination Tabs (4 cols) */}
          <div className="lg:col-span-4 space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredDestinations.map((dest) => {
              const isSelected = activeDestination.id === dest.id;
              return (
                <div
                  key={dest.id}
                  onClick={() => handleSelectDestination(dest)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex items-center gap-4 ${
                    isSelected
                      ? 'bg-white border-[#D4AF37] shadow-xl ring-2 ring-[#D4AF37]/20 scale-[1.01]'
                      : 'bg-white/80 border-black/5 hover:border-[#0F382C]/30 hover:bg-white'
                  }`}
                >
                  {/* Thumbnail */}
                  <div
                    className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0 shadow-sm relative overflow-hidden"
                    style={{ backgroundImage: `url('${dest.coverImage}')` }}
                  >
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#0F382C]/90 text-[#FFF1B0]">
                      {dest.region}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="font-serif font-bold text-base text-[#121212] truncate">
                        {dest.name}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-[#0F382C] font-semibold shrink-0">
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                        <span>{dest.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-black/60 truncate mb-1">
                      {dest.province} • {dest.categoryLabel}
                    </p>
                    <div className="text-[11px] text-[#0F382C] font-medium flex items-center gap-1">
                      <Sun className="w-3 h-3 text-[#D4AF37]" />
                      <span>{dest.essentialInfo.weather.temp}</span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#D4AF37] translate-x-1' : 'text-black/30'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Leaflet Map Container & Active Preview Overlay (8 cols) */}
          <div className="lg:col-span-8 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-black/10 relative h-[520px] sm:h-[640px] bg-[#E8ECE9]">
              {/* The Leaflet Div */}
              <div ref={mapContainerRef} className="w-full h-full z-10" />

              {/* Floating Active Destination Preview Card (Glassmorphic) */}
              {activeDestination && (
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-20">
                  <div className="bg-[#121212]/92 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-5 shadow-2xl text-white">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37] text-[#0F382C]">
                            Miền {activeDestination.region}
                          </span>
                          <span className="text-[11px] text-white/60">
                            {activeDestination.categoryLabel}
                          </span>
                        </div>
                        <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                          {activeDestination.name}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-sm font-bold text-[#FFF1B0]">
                          <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                          <span>{activeDestination.rating}</span>
                        </div>
                        <span className="text-[10px] text-white/50">({activeDestination.reviewsCount} đánh giá)</span>
                      </div>
                    </div>

                    <p className="text-xs text-white/75 line-clamp-2 mb-3 leading-relaxed">
                      {activeDestination.tagline}
                    </p>

                    {/* Quick stats pills */}
                    <div className="grid grid-cols-2 gap-2 py-2 border-y border-white/10 mb-3 text-[11px]">
                      <div>
                        <span className="text-white/50 block">Thời điểm lý tưởng:</span>
                        <span className="text-white font-medium">{activeDestination.essentialInfo.bestSeason}</span>
                      </div>
                      <div>
                        <span className="text-white/50 block">Thời lượng khuyên dùng:</span>
                        <span className="text-white font-medium">{activeDestination.essentialInfo.recommendedDuration}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/destinations/${activeDestination.slug}`}
                        className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#FFF1B0] to-[#D4AF37] text-[#0F382C] text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 shadow-md hover:brightness-105 transition-all"
                      >
                        <span>Xem Chi Tiết Điểm Đến</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/planner?destination=${activeDestination.slug}`}
                        className="py-2.5 px-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold rounded-xl text-center transition-all"
                        title="Lên lịch trình tới đây"
                      >
                        Lên Lịch Trình
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
