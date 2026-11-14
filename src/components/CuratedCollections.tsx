'use client';

import React from 'react';
import Link from 'next/link';
import { COLLECTIONS } from '@/data/collections';
import { Sparkles, ArrowRight, Compass, Layers } from 'lucide-react';

export default function CuratedCollections() {
  return (
    <section id="collections" className="py-24 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#0F382C] font-bold mb-3">
            <Layers className="w-4 h-4 text-[#D4AF37]" />
            <span>Bộ Sưu Tập Tuyển Chọn</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#121212] tracking-tight">
            Khám Phá Theo <span className="text-[#0F382C]">Mạch Cảm Xúc</span>
          </h2>
          <p className="mt-4 text-base text-[#121212]/70 leading-relaxed font-light">
            Mỗi hành trình là một tác phẩm nghệ thuật riêng biệt được tinh tuyển công phu theo sở thích và gu thẩm mỹ của từng du khách thượng lưu.
          </p>
        </div>

        {/* Editorial Grid: 2 large cards + 2 horizontal cards or 4 balanced magazine cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COLLECTIONS.map((col, idx) => (
            <div
              key={col.id}
              className="group relative rounded-3xl overflow-hidden shadow-xl min-h-[420px] sm:min-h-[460px] flex flex-col justify-end p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Background Image with Zoom on Hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${col.coverImage}')` }}
              />

              {/* Gradient Dark Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
              <div className="absolute inset-0 bg-[#0F382C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top Tag & Count Pill */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/40 text-[#FFF1B0] text-xs font-serif font-bold tracking-wider">
                  0{idx + 1} / Tuyển Tập
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold">
                  {col.destinationCount} Điểm Đến
                </span>
              </div>

              {/* Content Box */}
              <div className="relative z-10 space-y-3">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {col.highlightTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-[#FFF1B0] transition-colors leading-snug">
                  {col.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/80 line-clamp-2 font-light leading-relaxed">
                  {col.description}
                </p>

                {/* Explore Link */}
                <div className="pt-2">
                  <Link
                    href={`/planner?collection=${col.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#FFF1B0] group-hover:text-white transition-colors"
                  >
                    <span>Khám Phá Hành Trình Này</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-[#D4AF37]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
