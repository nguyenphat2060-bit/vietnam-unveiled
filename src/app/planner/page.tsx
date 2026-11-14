'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { useAuth } from '@/context/AuthContext';
import { DESTINATIONS, Destination } from '@/data/destinations';
import confetti from 'canvas-confetti';
import {
  Sparkles, Calendar, Compass, DollarSign, Users, MapPin,
  Clock, CheckCircle2, ArrowRight, ArrowLeft, Printer, Share2,
  RefreshCw, Utensils, ShieldCheck, Heart, Luggage, Navigation,
  FileDown, Bookmark, BookmarkCheck, UserCheck, AlertCircle, QrCode
} from 'lucide-react';

function PlannerContent() {
  const searchParams = useSearchParams();
  const initialDest = searchParams.get('destination') || 'hoi-an';
  const initialStyle = searchParams.get('style') || 'heritage';
  const initialDays = searchParams.get('days') || '3';
  const initialGroup = searchParams.get('group') || 'couple';

  // Multi-step form state
  const [step, setStep] = useState<number>(1);
  const [selectedDestinationSlug, setSelectedDestinationSlug] = useState(initialDest);
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);
  const [selectedDays, setSelectedDays] = useState(Number(initialDays) || 3);
  const [budgetTier, setBudgetTier] = useState<'budget' | 'standard' | 'luxury'>('luxury');
  const [groupType, setGroupType] = useState(initialGroup);

  // AI Generation animation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('');
  const [itineraryGenerated, setItineraryGenerated] = useState(false);

  // Active day in generated itinerary
  const [activePlanDay, setActivePlanDay] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showGuestNotice, setShowGuestNotice] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const { user, role, saveItinerary } = useAuth();

  const selectedDestination = DESTINATIONS.find((d) => d.slug === selectedDestinationSlug) || DESTINATIONS[0];

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setGenerationProgress(10);
    setGenerationStage('Đang phân tích thời tiết và mùa vàng tại ' + selectedDestination.name + '...');

    setTimeout(() => {
      setGenerationProgress(40);
      setGenerationStage('Đang kết nối danh sách nhà hàng gia truyền & Michelin Selected...');
    }, 900);

    setTimeout(() => {
      setGenerationProgress(75);
      setGenerationStage('Đang tối ưu cung đường di chuyển và trải nghiệm văn hóa bản địa...');
    }, 1800);

    setTimeout(() => {
      setGenerationProgress(100);
      setGenerationStage('Hoàn tất lịch trình độc quyền dành riêng cho bạn!');
      setTimeout(() => {
        setIsGenerating(false);
        setItineraryGenerated(true);
        // Confetti burst for delight!
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#0F382C', '#E05A47', '#FFF1B0']
        });
      }, 600);
    }, 2700);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleSavePlan = () => {
    if (!user) {
      setShowGuestNotice(true);
      return;
    }
    const success = saveItinerary({
      title: `Kỳ nghỉ ${selectedDays} ngày tại ${selectedDestination.name}`,
      destinationName: selectedDestination.name,
      destinationSlug: selectedDestination.slug,
      days: selectedDays,
      budgetTier: budgetTier,
      groupType: groupType === 'couple' ? 'Cặp đôi' : groupType === 'solo' ? 'Đi một mình' : 'Nhóm bạn / Gia đình',
      travelStyle: selectedStyle === 'heritage' ? 'Văn hóa Di sản' : selectedStyle === 'beach' ? 'Biển đảo' : selectedStyle === 'adventure' ? 'Mạo hiểm' : 'Ẩm thực',
      estimatedCost: `~${totalCostEstimate} VNĐ`
    });

    if (success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);
    }
  };

  // Cost estimates based on budget tier and selected days
  const budgetMultiplier = budgetTier === 'budget' ? 1200000 : budgetTier === 'standard' ? 2500000 : 5500000;
  const totalCostEstimate = (budgetMultiplier * selectedDays).toLocaleString('vi-VN');

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121212] pt-24 pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F382C]/10 border border-[#D4AF37]/40 text-[#0F382C] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Trí Tuệ Nhân Tạo Thiết Kế Hành Trình</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#121212]">
            Lên Lịch Trình <span className="text-[#0F382C]">Du Lịch Thông Minh</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-black/70 font-light">
            Tạo kế hoạch du lịch cá nhân hóa từng giờ, tích hợp ẩm thực đặc sản và chỉ dẫn chi tiết chỉ qua 4 bước nhanh chóng.
          </p>
        </div>

        {/* Multi-step Form Wizard (When not yet generated and not generating) */}
        {!itineraryGenerated && !isGenerating && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-black/10 max-w-4xl mx-auto">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/10">
              {[
                { num: 1, label: 'Điểm Đến' },
                { num: 2, label: 'Phong Cách' },
                { num: 3, label: 'Thời Gian & Nhóm' },
                { num: 4, label: 'Ngân Sách' },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      step >= s.num
                        ? 'bg-[#0F382C] text-[#FFF1B0] ring-2 ring-[#D4AF37]/50'
                        : 'bg-black/10 text-black/40'
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className={`text-xs font-medium hidden sm:inline ${step >= s.num ? 'text-[#0F382C] font-bold' : 'text-black/40'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1: Destination Selection */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-serif font-bold text-[#121212] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  <span>Bước 1: Chọn Điểm Đến Của Bạn</span>
                </h3>
                <p className="text-xs text-black/60 -mt-3">
                  Chọn một trong những tuyệt tác danh thắng nổi tiếng nhất Việt Nam.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {DESTINATIONS.map((dest) => {
                    const isSelected = selectedDestinationSlug === dest.slug;
                    return (
                      <div
                        key={dest.slug}
                        onClick={() => setSelectedDestinationSlug(dest.slug)}
                        className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                          isSelected
                            ? 'border-[#0F382C] bg-[#0F382C]/5 shadow-md ring-2 ring-[#0F382C]/30'
                            : 'border-black/10 hover:border-black/30 bg-white'
                        }`}
                      >
                        <div
                          className="h-28 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden"
                          style={{ backgroundImage: `url('${dest.coverImage}')` }}
                        >
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#0F382C] text-[#FFF1B0]">
                            Miền {dest.region}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#121212]">{dest.name}</h4>
                        <p className="text-xs text-black/60 truncate">{dest.province}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-full bg-[#0F382C] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#164e3e] transition-all flex items-center gap-2"
                  >
                    <span>Tiếp Theo: Phong Cách</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Travel Style */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-serif font-bold text-[#121212] flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#D4AF37]" />
                  <span>Bước 2: Phong Cách Du Lịch Mong Muốn</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'heritage', title: 'Di Sản & Văn Hóa Cổ Truyền', desc: 'Thăm di tích, phố cổ, nhà cổ nghìn năm và trải nghiệm làng nghề thủ công.' },
                    { id: 'beach', title: 'Nghỉ Dưỡng Biển & Hoàng Hôn', desc: 'Tận hưởng làn nước xanh ngọc, resort 5 sao bên bờ biển và tiệc cocktail hoàng hôn.' },
                    { id: 'adventure', title: 'Trekking & Mạo Hiểm Hang Động', desc: 'Chinh phục đỉnh núi cao, săn mây bồng bềnh và thám hiểm lòng hang thạch nhũ.' },
                    { id: 'culinary', title: 'Hành Trình Ẩm Thực Đường Phố', desc: 'Thưởng thức ẩm thực gia truyền, chợ đêm bản địa và các quán ăn Michelin.' },
                  ].map((style) => {
                    const isSelected = selectedStyle === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                          isSelected
                            ? 'border-[#0F382C] bg-[#0F382C]/5 shadow-md ring-2 ring-[#0F382C]/30'
                            : 'border-black/10 hover:border-black/30 bg-white'
                        }`}
                      >
                        <h4 className="font-serif font-bold text-base text-[#121212] mb-1">{style.title}</h4>
                        <p className="text-xs text-black/60 leading-relaxed">{style.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-full border border-black/20 text-xs font-semibold hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-full bg-[#0F382C] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#164e3e] transition-all flex items-center gap-2"
                  >
                    <span>Tiếp Theo: Thời Gian & Nhóm</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Duration & Group */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-serif font-bold text-[#121212] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  <span>Bước 3: Thời Lượng & Thành Viên</span>
                </h3>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-black/60 font-semibold mb-2">
                    Số Ngày Dự Kiến
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { days: 2, label: '2 Ngày (Cuối tuần)' },
                      { days: 3, label: '3 Ngày 2 Đêm' },
                      { days: 4, label: '4 Ngày 3 Đêm' },
                      { days: 7, label: '7 Ngày (Xuyên suốt)' },
                    ].map((d) => (
                      <button
                        key={d.days}
                        type="button"
                        onClick={() => setSelectedDays(d.days)}
                        className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all ${
                          selectedDays === d.days
                            ? 'bg-[#0F382C] text-white border-[#0F382C]'
                            : 'bg-white border-black/10 text-black/70 hover:bg-black/5'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-black/60 font-semibold mb-2">
                    Đối Tượng Đi Cùng
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'solo', label: 'Đi một mình' },
                      { id: 'couple', label: 'Cặp đôi lãng mạn' },
                      { id: 'family', label: 'Gia đình' },
                      { id: 'friends', label: 'Nhóm bạn thân' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGroupType(g.id)}
                        className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all ${
                          groupType === g.id
                            ? 'bg-[#0F382C] text-white border-[#0F382C]'
                            : 'bg-white border-black/10 text-black/70 hover:bg-black/5'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-full border border-black/20 text-xs font-semibold hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>

                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-3 rounded-full bg-[#0F382C] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#164e3e] transition-all flex items-center gap-2"
                  >
                    <span>Tiếp Theo: Ngân Sách</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Budget Tier & Final Action */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-serif font-bold text-[#121212] flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                  <span>Bước 4: Mức Ngân Sách Kỳ Nghỉ</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'budget', title: 'Hợp Lý & Tiết Kiệm', price: '~1.200.000đ / ngày', desc: 'Homestay ấm cúng, trải nghiệm ẩm thực hè phố truyền thống.' },
                    { id: 'standard', title: 'Tiêu Chuẩn Thoải Mái', price: '~2.500.000đ / ngày', desc: 'Khách sạn 4 sao boutique, xe đưa đón riêng, thưởng thức đặc sản.' },
                    { id: 'luxury', title: 'Thượng Lưu 5 Sao Luxury', price: '~5.500.000đ+ / ngày', desc: 'Resort/Du thuyền 5*, trải nghiệm ẩm thực fine-dining & hướng dẫn viên riêng.' },
                  ].map((tier) => {
                    const isSelected = budgetTier === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setBudgetTier(tier.id as any)}
                        className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                          isSelected
                            ? 'border-[#0F382C] bg-[#0F382C]/5 shadow-md ring-2 ring-[#0F382C]/30'
                            : 'border-black/10 hover:border-black/30 bg-white'
                        }`}
                      >
                        <h4 className="font-serif font-bold text-base text-[#121212] mb-1">{tier.title}</h4>
                        <div className="text-xs font-bold text-[#0F382C] mb-2">{tier.price}</div>
                        <p className="text-xs text-black/60 leading-relaxed">{tier.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-full border border-black/20 text-xs font-semibold hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>

                  <button
                    onClick={handleStartGeneration}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFF1B0] via-[#D4AF37] to-[#C5A028] text-[#0F382C] font-bold text-sm tracking-wide shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 fill-[#0F382C]" />
                    <span>Khởi Tạo Lịch Trình AI Ngay</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Loading State Animation */}
        {isGenerating && (
          <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl p-10 shadow-2xl border border-[#D4AF37]/30 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#0F382C] flex items-center justify-center mx-auto text-[#D4AF37] shadow-xl animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="font-serif font-bold text-2xl text-[#121212]">
              Trí Tuệ Nhân Tạo Đang Phân Tích...
            </h3>

            <p className="text-sm text-[#0F382C] font-medium min-h-[24px]">
              {generationStage}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-black/5 rounded-full h-3 overflow-hidden p-0.5 border border-black/10">
              <div
                className="bg-gradient-to-r from-[#0F382C] via-[#D4AF37] to-[#0F382C] h-full rounded-full transition-all duration-500"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <span className="text-xs text-black/50 font-mono">{generationProgress}% Hoàn tất</span>
          </div>
        )}

        {/* Dynamic Generated Itinerary Timeline Screen */}
        {itineraryGenerated && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Itinerary Action Banner */}
            <div className="bg-[#0F382C] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#FFF1B0] font-semibold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Lịch trình độc quyền đã được tạo thành công!</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Kỳ Nghỉ {selectedDays} Ngày Tại {selectedDestination.name}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 mt-1">
                  Phong cách: {selectedStyle === 'heritage' ? 'Văn hóa Di sản' : selectedStyle === 'beach' ? 'Biển đảo' : selectedStyle === 'adventure' ? 'Mạo hiểm' : 'Ẩm thực'} • Đối tượng: {groupType === 'couple' ? 'Cặp đôi' : groupType === 'solo' ? 'Đi một mình' : 'Nhóm bạn / Gia đình'}
                </p>
              </div>

              {/* Action Buttons: Save to Profile, Print, Share, Reset */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSavePlan}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg ${
                    savedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                  }`}
                >
                  {savedSuccess ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-emerald-300" />
                      <span>Đã Lưu Vào Hồ Sơ!</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-[#D4AF37]" />
                      <span>Lưu Hồ Sơ</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:brightness-110 text-[#0F382C] text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Đặt Tour (VietQR)</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#D4AF37]" />
                  <span>In / Lưu PDF</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>{copiedLink ? 'Đã chép link!' : 'Chia sẻ'}</span>
                </button>

                <button
                  onClick={() => {
                    setItineraryGenerated(false);
                    setStep(1);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Tùy Biến Lại</span>
                </button>
              </div>
            </div>

            {/* Notification Toast for Saved Itinerary */}
            {savedSuccess && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-[#0F382C] text-white text-xs flex items-center justify-between shadow-xl border border-emerald-500/40 animate-fade-in">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong className="block font-semibold">Đã lưu lịch trình thành công vào tài khoản của bạn!</strong>
                    <span>Bạn có thể xem lại, chỉnh sửa hoặc quản lý mọi lúc trong mục Hồ Sơ Du Lịch.</span>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] text-[#0F382C] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-1 shrink-0"
                >
                  <span>Xem Hồ Sơ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Prompt for Guest Users */}
            {showGuestNotice && !user && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between shadow-sm animate-fade-in">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <strong className="block font-semibold">Cần đăng nhập Thành viên để lưu trữ lịch trình</strong>
                    <span>Đăng nhập hoặc tạo tài khoản miễn phí để lưu giữ vĩnh viễn các kế hoạch AI trên đám mây.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/login?redirect=/planner"
                    className="px-4 py-1.5 rounded-xl bg-[#0F382C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0B2A21] transition-all"
                  >
                    Đăng Nhập Ngay
                  </Link>
                  <button
                    onClick={() => setShowGuestNotice(false)}
                    className="p-1 text-amber-800 hover:text-black"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Quick Metrics Bar: Cost breakdown & weather */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-md border border-black/10">
                <span className="text-[11px] font-bold uppercase text-black/50 block">Dự toán tổng kinh phí</span>
                <span className="text-xl font-serif font-bold text-[#0F382C]">~{totalCostEstimate} VNĐ</span>
                <p className="text-[11px] text-black/60 mt-1">Gói {budgetTier === 'luxury' ? 'Thượng lưu 5*' : budgetTier === 'standard' ? 'Tiêu chuẩn 4*' : 'Tiết kiệm'} cho {selectedDays} ngày</p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-md border border-black/10">
                <span className="text-[11px] font-bold uppercase text-black/50 block">Thời tiết thuận lợi</span>
                <span className="text-xl font-serif font-bold text-[#121212]">{selectedDestination.essentialInfo.weather.temp}</span>
                <p className="text-[11px] text-black/60 mt-1">{selectedDestination.essentialInfo.weather.condition}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-md border border-black/10">
                <span className="text-[11px] font-bold uppercase text-black/50 block">Cung đường đồng bộ</span>
                <span className="text-xl font-serif font-bold text-[#121212]">Tối Ưu Tuyệt Đối</span>
                <p className="text-[11px] text-black/60 mt-1">Giảm thiểu tối đa thời gian chờ xe</p>
              </div>
            </div>

            {/* Day Selector Tabs */}
            <div className="flex gap-2 border-b border-black/10 pb-3 overflow-x-auto">
              {Array.from({ length: selectedDays }).map((_, i) => {
                const dayNum = i + 1;
                const isSelected = activePlanDay === dayNum;
                return (
                  <button
                    key={dayNum}
                    onClick={() => setActivePlanDay(dayNum)}
                    className={`px-6 py-3 rounded-2xl font-serif font-bold text-sm transition-all shrink-0 ${
                      isSelected
                        ? 'bg-[#0F382C] text-white shadow-lg ring-2 ring-[#D4AF37]/40'
                        : 'bg-white border border-black/10 text-black/70 hover:bg-black/5'
                    }`}
                  >
                    Ngày 0{dayNum}
                  </button>
                );
              })}
            </div>

            {/* Timeline Activities for Selected Day */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-black/10 space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <h3 className="font-serif font-bold text-2xl text-[#121212] flex items-center gap-2">
                  <span>Chi Tiết Hoạt Động Ngày {activePlanDay}</span>
                  <span className="text-xs font-sans text-[#0F382C] bg-[#0F382C]/10 px-2.5 py-1 rounded-full font-semibold">
                    Đồng Bộ Bản Đồ Địa Phương
                  </span>
                </h3>
              </div>

              {/* Dynamic Activities Timeline: Morning, Lunch, Afternoon, Evening */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-[#0F382C]/20 before:h-full">
                {/* Morning */}
                <div className="relative pl-8 sm:pl-10 space-y-2">
                  <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-white shadow" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">
                      SÁNG • 07:30 - 11:30
                    </span>
                    <span className="text-xs text-[#0F382C] font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{selectedDestination.name} - Khu Di Tích / Thắng Cảnh Trung Tâm</span>
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#121212]">
                    Khám phá di sản sớm mai & Thưởng thức cà phê sữa đá
                  </h4>
                  <p className="text-sm text-black/70 leading-relaxed font-light">
                    Bắt đầu ngày mới khi phố xá còn trong trẻo. Dạo bộ ngắm nhìn kiến trúc cổ và ghi lại những bức hình lung linh dưới ánh ban mai trước giờ đón khách đông đúc.
                  </p>
                </div>

                {/* Lunch */}
                <div className="relative pl-8 sm:pl-10 space-y-2">
                  <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-[#0F382C] border-2 border-white shadow" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-orange-100 text-orange-900">
                      TRƯA • 12:00 - 14:00
                    </span>
                    <span className="text-xs text-[#0F382C] font-semibold flex items-center gap-1">
                      <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Quán Ăn Gia Truyền Bản Địa</span>
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#121212]">
                    Bữa trưa đặc sản: {selectedDestination.culinaryGuide[0]?.name || 'Ẩm thực truyền thống'}
                  </h4>
                  <p className="text-sm text-black/70 leading-relaxed font-light">
                    {selectedDestination.culinaryGuide[0]?.description || 'Thưởng thức hương vị nguyên bản được chế biến bởi các nghệ nhân ẩm thực lâu năm.'}
                  </p>
                </div>

                {/* Afternoon */}
                <div className="relative pl-8 sm:pl-10 space-y-2">
                  <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-[#E05A47] border-2 border-white shadow" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900">
                      CHIỀU • 14:30 - 17:30
                    </span>
                    <span className="text-xs text-[#0F382C] font-semibold flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Cung Đường Trải Nghiệm Ngoại Ô</span>
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#121212]">
                    Workshop thủ công mỹ nghệ hoặc tham gia chèo thuyền thư giãn
                  </h4>
                  <p className="text-sm text-black/70 leading-relaxed font-light">
                    Hòa mình vào thiên nhiên khoáng đạt, trò chuyện cùng các nghệ nhân bản xứ và tự tay tạo nên món quà lưu niệm độc nhất mang về.
                  </p>
                </div>

                {/* Night */}
                <div className="relative pl-8 sm:pl-10 space-y-2">
                  <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-[#0F382C] border-2 border-white shadow" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-900">
                      TỐI • 18:30 - 21:30
                    </span>
                    <span className="text-xs text-[#0F382C] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Dạ Tiệc Ánh Sáng & Âm Nhạc</span>
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#121212]">
                    Thưởng thức dạ tiệc ẩm thực & Ngắm cảnh đêm lung linh
                  </h4>
                  <p className="text-sm text-black/70 leading-relaxed font-light">
                    Nhâm nhi ly cocktail thượng hạng hoặc trà sen thơm ngát, ngắm phố xá lên đèn và đắm chìm trong giai điệu acoustic êm dịu.
                  </p>
                </div>
              </div>

              {/* Packing Checklist Widget */}
              <div className="mt-8 pt-8 border-t border-black/10">
                <div className="flex items-center gap-2 mb-4">
                  <Luggage className="w-5 h-5 text-[#0F382C]" />
                  <h4 className="font-serif font-bold text-lg text-[#121212]">
                    Gợi Ý Hành Lý Chuẩn Bị Cho {selectedDestination.name}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-black/5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Trang phục mỏng nhẹ, thoáng khí & lịch sự</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-black/5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Giày đi bộ êm chân hoặc giày thể thao mềm</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-black/5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kem chống nắng, kính râm & mũ vành rộng</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-black/5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bình nước cá nhân thân thiện môi trường</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-black/5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sạc dự phòng & túi chống nước điện thoại</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-black/5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Thuốc chống côn trùng thảo dược</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking & VietQR Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        tourTitle={`Kỳ nghỉ ${selectedDays} ngày tại ${selectedDestination.name}`}
        destinationName={selectedDestination.name}
        destinationSlug={selectedDestination.slug}
        daysCount={selectedDays}
      />

      <Footer />
    </div>
  );
}

export default function PlannerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-serif text-lg text-[#0F382C]">Đang tải bộ lập lịch trình AI Vietnam Unveiled...</div>}>
      <PlannerContent />
    </Suspense>
  );
}
