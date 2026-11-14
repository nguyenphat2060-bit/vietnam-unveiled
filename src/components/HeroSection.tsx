'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, Compass, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { DESTINATIONS } from '@/data/destinations';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85',
    title: 'Vịnh Hạ Long',
    subtitle: 'Kỳ quan thạch nhũ triệu năm sừng sững giữa ngọc bích trùng dương',
    slug: 'ha-long'
  },
  {
    image: 'https://images.unsplash.com/photo-1714073619248-b52d0b51ac89?auto=format&fit=crop&w=2000&q=85',
    title: 'Phố Cổ Hội An',
    subtitle: 'Nơi thời gian ngưng đọng trên từng mái ngói rêu phong và ánh đèn lồng',
    slug: 'hoi-an'
  },
  {
    image: 'https://images.unsplash.com/photo-1571406252288-cc9c25bb4a44?auto=format&fit=crop&w=2000&q=85',
    title: 'Tràng An Ninh Bình',
    subtitle: 'Bản hòa ca của non xanh nước biếc và cố đô ngàn năm trầm mặc',
    slug: 'ninh-binh'
  },
  {
    image: 'https://images.unsplash.com/photo-1570366583862-f91883984fde?auto=format&fit=crop&w=2000&q=85',
    title: 'Sa Pa & Mường Hoa',
    subtitle: 'Những bậc thang lên trời bồng bềnh giữa đại ngàn mây trắng Hoàng Liên Sơn',
    slug: 'sa-pa'
  },
  {
    image: 'https://images.unsplash.com/photo-1638793774283-8a7b52165430?auto=format&fit=crop&w=2000&q=85',
    title: 'Sơn Đoòng & Phong Nha',
    subtitle: 'Kỳ quan ngầm vĩ đại đưa bạn vào lòng trái đất với hố sụt ánh sáng siêu thực',
    slug: 'son-doong'
  }
];

export default function HeroSection() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  // Auto rotate slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDestination) {
      router.push(`/destinations/${selectedDestination}`);
    } else {
      router.push(`/planner?style=${encodeURIComponent(selectedStyle)}&duration=${encodeURIComponent(selectedDuration)}`);
    }
  };

  return (
    <div className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Slides with Crossfade */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 1.2s ease-in-out, transform 8s ease-out'
          }}
        />
      ))}

      {/* Cinematic Overlays: Top and Bottom Vignette & Emerald Tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0F382C]/30 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/40 mb-6 shadow-2xl animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#FFF1B0] font-medium">
            DISCOVER THE TIMELESS CHARM
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-[11px] sm:text-xs text-white/80 font-serif italic">Khám Phá Việt Nam</span>
        </div>

        {/* Main Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md">
          Chạm Vào Vẻ Đẹp <br className="hidden sm:block" />
          <span className="gold-gradient-text drop-shadow-lg">Di Sản & Thiên Nhiên</span> Bất Tận
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow">
          Từ vịnh đá ngọc huyền ảo, kinh kỳ vàng son nghìn năm đến những cung đèo mây trắng uốn lượn bên bờ đại dương rực nắng.
        </p>

        {/* Smart Quick Search Bar (Magazine Glassmorphic Card) */}
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleQuickSearch}
            className="p-3 sm:p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl grid grid-cols-1 sm:grid-cols-4 gap-3 text-left"
          >
            {/* Col 1: Destination */}
            <div className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors">
              <label className="block text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Điểm Đến
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-[#181818] text-white">Chọn điểm đến...</option>
                {DESTINATIONS.map((d) => (
                  <option key={d.slug} value={d.slug} className="bg-[#181818] text-white">
                    {d.name} ({d.province})
                  </option>
                ))}
              </select>
            </div>

            {/* Col 2: Style */}
            <div className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors">
              <label className="block text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1 flex items-center gap-1">
                <Compass className="w-3 h-3" /> Phong Cách
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-[#181818] text-white">Tất cả phong cách</option>
                <option value="heritage" className="bg-[#181818] text-white">Di sản văn hóa</option>
                <option value="beach" className="bg-[#181818] text-white">Nghỉ dưỡng biển</option>
                <option value="adventure" className="bg-[#181818] text-white">Trekking & Mạo hiểm</option>
                <option value="culinary" className="bg-[#181818] text-white">Ẩm thực sành sỏi</option>
              </select>
            </div>

            {/* Col 3: Duration */}
            <div className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors">
              <label className="block text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Thời Lượng
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-[#181818] text-white">Linh hoạt</option>
                <option value="short" className="bg-[#181818] text-white">2 - 3 Ngày (Cuối tuần)</option>
                <option value="medium" className="bg-[#181818] text-white">4 - 6 Ngày</option>
                <option value="long" className="bg-[#181818] text-white">1 - 2 Tuần (Xuyên Việt)</option>
              </select>
            </div>

            {/* Col 4: Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#FFF1B0] via-[#D4AF37] to-[#C5A028] text-[#0F382C] font-semibold text-sm hover:shadow-lg hover:shadow-[#D4AF37]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Khám Phá</span>
            </button>
          </form>
        </div>

        {/* Slide Indicators & Destination Quick Preview */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-6 text-white/70 text-xs">
          {/* Slide Indicator Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#D4AF37]">
              0{currentSlide + 1} / 0{HERO_SLIDES.length}
            </span>
            <div className="flex gap-1.5 ml-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Current Slide Highlight */}
          <div className="flex items-center gap-2">
            <span className="text-white/50">Đang hiển thị:</span>
            <Link
              href={`/destinations/${HERO_SLIDES[currentSlide].slug}`}
              className="text-white font-serif font-bold hover:text-[#D4AF37] transition-colors flex items-center gap-1 group"
            >
              <span>{HERO_SLIDES[currentSlide].title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* National Highlights */}
          <div className="hidden lg:flex items-center gap-6 text-white/80 font-medium">
            <span>🏛️ 8 Di sản UNESCO</span>
            <span>🌊 3.260 km Bờ biển</span>
            <span>🏮 54 Nét Văn hóa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
