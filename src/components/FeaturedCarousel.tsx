'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DESTINATIONS } from '@/data/destinations';
import { Star, MapPin, ArrowRight, Heart, Calendar, Award } from 'lucide-react';

export default function FeaturedCarousel() {
  const [savedIds, setSavedIds] = useState<{ [key: string]: boolean }>({
    'hoi-an': true,
    'ha-long': true
  });

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="destinations" className="py-24 bg-[#121212] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0F382C]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-3">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Tuyệt Tác Danh Thắng</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Kỳ Quan <span className="gold-gradient-text">Không Thể Bỏ Lỡ</span>
            </h2>
            <p className="mt-3 text-white/70 text-sm sm:text-base max-w-xl font-light">
              6 điểm đến danh giá nhất quyến rũ hàng triệu du khách quốc tế bởi phong cảnh siêu thực và chiều sâu văn hóa truyền thống.
            </p>
          </div>

          <Link
            href="/planner"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFF1B0] hover:text-[#D4AF37] transition-colors self-start md:self-auto group"
          >
            <span>Tự thiết kế chuyến đi</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 High-End Cards Grid with Hover Zoom Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest) => {
            const isSaved = !!savedIds[dest.id];
            return (
              <div
                key={dest.id}
                className="group relative rounded-3xl overflow-hidden bg-[#1E1E1E] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                {/* Image Container with Zoom */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url('${dest.coverImage}')` }}
                  />

                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0F382C]/90 text-[#FFF1B0] backdrop-blur-md border border-[#D4AF37]/30">
                        {dest.region === 'Bắc' ? 'Miền Bắc' : dest.region === 'Trung' ? 'Miền Trung' : 'Miền Nam'}
                      </span>
                      {dest.isUnesco && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#D4AF37] text-[#0F382C]">
                          UNESCO
                        </span>
                      )}
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => toggleSave(e, dest.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition-all ${
                        isSaved
                          ? 'bg-[#E05A47] text-white shadow-lg'
                          : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/70'
                      }`}
                      title={isSaved ? 'Đã lưu vào danh sách' : 'Lưu điểm đến'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      <span className="font-bold">{dest.rating}</span>
                      <span className="text-white/60">({dest.reviewsCount})</span>
                    </div>

                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{dest.essentialInfo.recommendedDuration}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                      {dest.province} • {dest.categoryLabel}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1 group-hover:text-[#FFF1B0] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="mt-2 text-xs text-white/70 line-clamp-2 leading-relaxed">
                      {dest.tagline}
                    </p>
                  </div>

                  {/* Bottom Row: Price & Detail Action */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-white/50 block">Mức chi phí gợi ý:</span>
                      <span className="text-xs font-semibold text-[#FFF1B0]">
                        {dest.essentialInfo.avgBudget}
                      </span>
                    </div>

                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F382C] text-white transition-all duration-300 group-hover:translate-x-1"
                      title="Xem chi tiết"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
