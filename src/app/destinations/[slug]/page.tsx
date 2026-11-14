'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DESTINATIONS } from '@/data/destinations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LightboxModal from '@/components/LightboxModal';
import BookingModal from '@/components/BookingModal';
import {
  MapPin, Star, Calendar, Sun, CloudRain, Wind, DollarSign,
  Clock, Heart, Share2, Compass, CheckCircle2, XCircle,
  Utensils, BookOpen, ArrowRight, Sparkles, ChevronRight, QrCode
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DestinationDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const destination = DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  // State for active itinerary day tab
  const [activeDay, setActiveDay] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Other destinations for "Khám phá thêm"
  const nearbyDestinations = DESTINATIONS.filter((d) => d.id !== destination.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121212]">
      <Navbar />

      {/* 1. Hero Header */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-end pb-16 pt-32 overflow-hidden bg-black">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${destination.coverImage}')` }}
        />
        {/* Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-[#0F382C]/30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/80 mb-4">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Trang Chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link href="/#destinations" className="hover:text-[#D4AF37] transition-colors">Điểm Đến</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#D4AF37] font-semibold">{destination.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0F382C] text-[#FFF1B0] border border-[#D4AF37]/40 shadow-lg">
                  Miền {destination.region}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white">
                  {destination.province}
                </span>
                {destination.isUnesco && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37] text-[#0F382C]">
                    Di Sản Thế Giới UNESCO
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                {destination.vietnameseTitle}
              </h1>

              <p className="text-base sm:text-xl text-white/90 max-w-3xl font-light italic">
                "{destination.tagline}"
              </p>
            </div>

            {/* Action Buttons: Save & Share */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all shadow-md ${
                  isSaved
                    ? 'bg-[#E05A47] text-white'
                    : 'bg-black/40 text-white hover:bg-black/60 border border-white/20'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Đã Lưu' : 'Lưu Điểm Đến'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-black/40 text-white hover:bg-black/60 border border-white/20 backdrop-blur-md transition-all shadow-md"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? 'Đã Sao Chép Link!' : 'Chia Sẻ'}</span>
              </button>

              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#D4AF37] hover:brightness-110 text-[#0F382C] shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Đặt Tour (VietQR)</span>
              </button>

              <Link
                href={`/planner?destination=${destination.slug}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Tùy Biến AI</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating Essential Travel Info Bar */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-black/10 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-black/10">
          {/* Best Season */}
          <div className="pt-2 md:pt-0 md:px-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F382C] uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Thời Điểm Vàng</span>
            </div>
            <p className="font-serif font-bold text-lg text-[#121212]">
              {destination.essentialInfo.bestSeason}
            </p>
            <p className="text-xs text-black/60">Khí hậu thuận lợi, phong cảnh đẹp nhất</p>
          </div>

          {/* Live Mock Weather */}
          <div className="pt-2 md:pt-0 md:px-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F382C] uppercase tracking-wider">
              <Sun className="w-4 h-4 text-[#D4AF37]" />
              <span>Thời Tiết Hiện Tại</span>
            </div>
            <p className="font-serif font-bold text-lg text-[#121212]">
              {destination.essentialInfo.weather.temp}
            </p>
            <p className="text-xs text-black/60">
              {destination.essentialInfo.weather.condition} • Ẩm: {destination.essentialInfo.weather.humidity}
            </p>
          </div>

          {/* Recommended Duration */}
          <div className="pt-4 md:pt-0 md:px-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F382C] uppercase tracking-wider">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Thời Lượng Khuyên Dùng</span>
            </div>
            <p className="font-serif font-bold text-lg text-[#121212]">
              {destination.essentialInfo.recommendedDuration}
            </p>
            <p className="text-xs text-black/60">Để trải nghiệm trọn vẹn văn hóa</p>
          </div>

          {/* Estimated Budget */}
          <div className="pt-4 md:pt-0 md:px-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F382C] uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-[#D4AF37]" />
              <span>Chi Phí Dự Kiến</span>
            </div>
            <p className="font-serif font-bold text-lg text-[#0F382C]">
              {destination.essentialInfo.avgBudget}
            </p>
            <p className="text-xs text-black/60">Bao gồm lưu trú, ẩm thực & di chuyển</p>
          </div>
        </div>
      </section>

      {/* 3. Overview & High-Res Masonry Photo Gallery */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F382C] block mb-2">
            Tổng Quan Danh Thắng
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#121212] mb-4">
            {destination.title}
          </h2>
          <p className="text-[#121212]/80 leading-relaxed text-base sm:text-lg font-light">
            {destination.description}
          </p>
        </div>

        {/* Masonry Gallery Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-serif font-bold text-2xl text-[#121212] flex items-center gap-2">
            <span>Bộ Sưu Tập Hình Ảnh Ấn Tượng</span>
            <span className="text-xs font-sans text-black/50 font-normal">
              ({destination.gallery.length} hình ảnh độ phân giải cao)
            </span>
          </h3>
          <span className="text-xs text-[#0F382C] font-semibold hidden sm:block">
            *Nhấp vào bất kỳ ảnh nào để xem toàn màn hình (Lightbox)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destination.gallery.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md border border-black/5"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${img.url}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-xs font-medium line-clamp-2">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Day-by-Day Experience Itinerary */}
      <section className="py-20 bg-white border-y border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F382C] block mb-2">
              Lộ Trình Hoàn Hảo
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#121212]">
              Lịch Trình Trải Nghiệm {destination.essentialInfo.recommendedDuration}
            </h2>
            <p className="mt-2 text-sm text-black/60">
              Được nghiên cứu và thiết kế bởi các chuyên gia du lịch địa phương, tối ưu hóa thời gian di chuyển và trải nghiệm văn hóa.
            </p>
          </div>

          {/* Day Tabs */}
          <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-2">
            {destination.itinerary.map((dayPlan) => {
              const isActive = activeDay === dayPlan.day;
              return (
                <button
                  key={dayPlan.day}
                  onClick={() => setActiveDay(dayPlan.day)}
                  className={`px-6 py-3 rounded-2xl font-serif font-bold text-sm transition-all duration-300 shrink-0 ${
                    isActive
                      ? 'bg-[#0F382C] text-white shadow-xl ring-2 ring-[#D4AF37]/50'
                      : 'bg-black/5 text-[#121212]/70 hover:bg-black/10'
                  }`}
                >
                  <span>Ngày {dayPlan.day}</span>
                  <span className="block text-[11px] font-sans font-normal opacity-80 truncate max-w-[140px]">
                    {dayPlan.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Day Content */}
          {destination.itinerary
            .filter((d) => d.day === activeDay)
            .map((dayPlan) => (
              <div key={dayPlan.day} className="max-w-4xl mx-auto space-y-6">
                <div className="p-4 rounded-2xl bg-[#0F382C]/5 border border-[#0F382C]/20 mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0F382C] text-[#FFF1B0]">
                      Chủ đề ngày {dayPlan.day}
                    </span>
                    <span className="text-sm font-semibold text-[#0F382C]">
                      {dayPlan.theme}
                    </span>
                  </div>
                </div>

                {/* Periods: Sáng, Trưa, Chiều, Tối */}
                <div className="space-y-6">
                  {dayPlan.periods.map((period, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-6 rounded-2xl bg-[#FAF9F6] border border-black/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-black/5">
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            period.period === 'Sáng'
                              ? 'bg-amber-100 text-amber-900'
                              : period.period === 'Trưa'
                              ? 'bg-orange-100 text-orange-900'
                              : period.period === 'Chiều'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-purple-100 text-purple-900'
                          }`}>
                            {period.period}
                          </span>
                          <span className="text-xs font-mono text-black/60 font-medium">
                            {period.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#0F382C] font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{period.location}</span>
                        </div>
                      </div>

                      <h4 className="font-serif font-bold text-lg text-[#121212] mb-2">
                        {period.title}
                      </h4>

                      <p className="text-sm text-black/75 leading-relaxed font-light">
                        {period.description}
                      </p>

                      {period.tip && (
                        <div className="mt-3 p-3 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs text-[#0F382C] font-medium flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span><strong>Mách nhỏ:</strong> {period.tip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* Booking CTA Banner */}
          <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-[#0F382C] via-[#144738] to-[#0A261E] rounded-3xl p-6 sm:p-8 text-white border border-[#D4AF37]/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                Trải Nghiệm Thượng Lưu Trọn Gói
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
                Đặt Tour Lịch Trình Này Với Mã VietQR
              </h3>
              <p className="text-xs text-white/70 max-w-lg leading-relaxed">
                Thanh toán chuyển khoản bảo đảm 24/7. Hỗ trợ xe riêng, phòng resort 5 sao và vé thắng cảnh không cần xếp hàng.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="px-6 py-3 rounded-full bg-[#D4AF37] hover:brightness-110 text-[#0F382C] text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Đặt Chỗ & Quét VietQR</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Culinary & Street Food Guide */}
      <section id="culinary" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#0F382C] font-bold mb-2">
            <Utensils className="w-4 h-4 text-[#D4AF37]" />
            <span>Tinh Hoa Ẩm Thực Bản Địa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#121212]">
            Món Ngon Phải Thử Tại {destination.name}
          </h2>
          <p className="mt-2 text-sm text-black/60">
            Hương vị nguyên bản được truyền đời qua bao thế hệ người bản địa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destination.culinaryGuide.map((food, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-lg border border-black/5 hover:border-[#D4AF37]/40 transition-all flex flex-col sm:flex-row gap-6 items-center"
            >
              <div
                className="w-full sm:w-44 h-44 rounded-2xl bg-cover bg-center shrink-0 shadow-sm"
                style={{ backgroundImage: `url('${food.image}')` }}
              />

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap gap-1.5 mb-1">
                  {food.tags.map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-[#FAF9F6] text-[#0F382C] rounded-full border border-black/5">
                      {t}
                    </span>
                  ))}
                </div>

                <h4 className="font-serif font-bold text-xl text-[#121212]">
                  {food.name}
                </h4>

                <p className="text-xs text-black/70 leading-relaxed">
                  {food.description}
                </p>

                <div className="pt-2 text-xs border-t border-black/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-black/50">Mức giá:</span>
                    <span className="font-bold text-[#0F382C]">{food.price}</span>
                  </div>
                  <div className="text-[11px] text-[#0F382C] font-medium truncate">
                    📍 {food.mustTryPlace}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Cultural Etiquettes & Dos/Don'ts */}
      <section id="etiquette" className="py-20 bg-[#121212] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold block mb-2">
              Văn Hóa Ứng Xử
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Cẩm Nang Du Lịch Văn Minh & Tôn Trọng
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Những điều nên làm và nên tránh để có trải nghiệm hòa nhập văn hóa trọn vẹn nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.culturalEtiquette.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#1E1E1E] border border-white/10 flex items-start gap-4"
              >
                {item.type === 'do' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-[#E05A47] shrink-0 mt-1" />
                )}
                <div>
                  <h4 className="font-serif font-bold text-base text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Nearby Destinations Carousel */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-serif font-bold text-2xl text-[#121212]">
            Khám Phá Các Danh Thắng Khác
          </h3>
          <Link href="/#destinations" className="text-xs font-semibold text-[#0F382C] hover:text-[#D4AF37] flex items-center gap-1">
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {nearbyDestinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group rounded-2xl overflow-hidden bg-white shadow-md border border-black/5 hover:shadow-xl transition-all"
            >
              <div
                className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${dest.coverImage}')` }}
              />
              <div className="p-4">
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] block mb-1">
                  Miền {dest.region} • {dest.categoryLabel}
                </span>
                <h4 className="font-serif font-bold text-lg text-[#121212] group-hover:text-[#0F382C] transition-colors">
                  {dest.name}
                </h4>
                <p className="text-xs text-black/60 line-clamp-1 mt-1">
                  {dest.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={destination.gallery}
        currentIndex={currentPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setCurrentPhotoIndex((prev) => (prev + 1) % destination.gallery.length)}
        onPrev={() => setCurrentPhotoIndex((prev) => (prev - 1 + destination.gallery.length) % destination.gallery.length)}
      />

      {/* Booking & VietQR Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        tourTitle={`Hành trình khám phá ${destination.vietnameseTitle}`}
        destinationName={destination.name}
        destinationSlug={destination.slug}
        daysCount={destination.itinerary.length}
      />

      <Footer />
    </div>
  );
}
