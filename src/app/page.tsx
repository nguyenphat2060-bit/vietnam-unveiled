'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InteractiveMap from '@/components/InteractiveMap';
import CuratedCollections from '@/components/CuratedCollections';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import AITeaserWidget from '@/components/AITeaserWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Compass, Sparkles, Award, Quote, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Navigation */}
      <Navbar />

      {/* 1. Cinematic Hero Section with Smart Search */}
      <HeroSection />

      {/* 2. Interactive Map Section */}
      <InteractiveMap />

      {/* 3. Curated Collections Section */}
      <CuratedCollections />

      {/* 4. Featured Destinations (Ha Long, Hoi An, Ninh Binh, Phu Quoc, Sa Pa, Son Doong) */}
      <FeaturedCarousel />

      {/* 5. Editorial Story & Cultural Manifesto */}
      <section className="py-24 bg-[#0F382C] text-white relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Quote className="w-12 h-12 text-[#D4AF37] mx-auto mb-6 opacity-60" />
          
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FFF1B0] leading-tight mb-8">
            "Việt Nam không chỉ là một điểm đến trên bản đồ địa lý,<br className="hidden sm:block" />
            đó là một trạng thái của tâm hồn."
          </h2>

          <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Nơi hương quế hồi quyện cùng hơi sương sớm trên những đỉnh đèo Tây Bắc, nơi tiếng mái chèo khua nước nhẹ tênh trên dòng sông Hoài đưa ta về những thương cảng cổ tích, và nơi lòng đất cất giữ những kỳ quan hang động vĩ đại vượt ngoài sức tưởng tượng của nhân loại.
          </p>

          <div className="inline-flex items-center gap-4 text-xs tracking-widest uppercase text-[#D4AF37]">
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="font-serif italic font-bold">Ban Biên Tập Vietnam Unveiled</span>
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
          </div>
        </div>
      </section>

      {/* 6. AI Trip Planner Teaser Widget */}
      <AITeaserWidget />

      {/* Footer */}
      <Footer />
    </main>
  );
}
