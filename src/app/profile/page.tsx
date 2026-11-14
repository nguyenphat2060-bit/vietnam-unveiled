'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AuthGuard from '@/components/AuthGuard';
import {
  User as UserIcon,
  Calendar,
  MapPin,
  Sparkles,
  Trash2,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  Heart,
  Plus,
  ExternalLink,
  Save,
  Check,
  Luggage,
  LogOut
} from 'lucide-react';

export default function ProfilePage() {
  const { user, role, logout, deleteItinerary, updateProfile } = useAuth();
  const [editingPrefs, setEditingPrefs] = useState(false);
  const [region, setRegion] = useState(user?.travelPreferences?.preferredRegion || 'Miền Trung & Miền Bắc');
  const [style, setStyle] = useState(user?.travelPreferences?.travelStyle || 'Nghỉ dưỡng 5 sao & Di sản UNESCO');
  const [season, setSeason] = useState(user?.travelPreferences?.favoriteSeason || 'Mùa thu - Mùa xuân');
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      travelPreferences: {
        preferredRegion: region,
        travelStyle: style,
        favoriteSeason: season
      }
    });
    setEditingPrefs(false);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  return (
    <AuthGuard allowedRoles={['member', 'admin']}>
      <div className="min-h-screen bg-[#FAFAF9] text-[#121212] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Card: Member Banner */}
          <div className="bg-gradient-to-r from-[#0F382C] via-[#144738] to-[#0A261E] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#D4AF37]/30 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={user?.name || 'User avatar'}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-[#D4AF37]/50 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#D4AF37] text-[#0F382C] shadow-md">
                    {role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-3 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold tracking-widest uppercase">
                      {role === 'admin' ? 'Quản Trị Viên (Admin)' : 'Thành Viên Di Sản (VIP Member)'}
                    </span>
                    <span className="text-white/40 text-xs">• Tham gia từ {user?.joinDate || '2026'}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">
                    {user?.name}
                  </h1>
                  <p className="text-white/70 text-sm font-light">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 self-start md:self-center">
                {role === 'admin' && (
                  <Link
                    href="/admin"
                    className="px-4 py-2.5 rounded-full bg-[#D4AF37] hover:brightness-110 text-[#0F382C] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Trang Quản Trị
                  </Link>
                )}
                <button
                  type="button"
                  onClick={logout}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/10 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng Xuất
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-white">
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-xs text-white/60 block mb-1">Lịch Trình Đã Lưu</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#D4AF37]">
                  {user?.savedItineraries?.length || 0}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-xs text-white/60 block mb-1">Hạng Thành Viên</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {role === 'admin' ? 'Master Admin' : 'Hạng Vàng'}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-xs text-white/60 block mb-1">Điểm Di Sản Tích Lũy</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#D4AF37]">
                  1.250 pts
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-xs text-white/60 block mb-1">Quyền Ưu Tiên</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-emerald-400">
                  Concierge 24/7
                </span>
              </div>
            </div>
          </div>

          {/* Main Grid: Left = Saved Itineraries, Right = Preferences & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (2 Cols): Saved Itineraries */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#0F382C] flex items-center gap-2">
                    <Luggage className="w-5 h-5 text-[#D4AF37]" />
                    Lịch Trình AI Đã Lưu Của Bạn
                  </h2>
                  <p className="text-xs text-black/60 mt-0.5">
                    Quản lý các kế hoạch du lịch đã được AI tạo riêng cho tài khoản thành viên của bạn.
                  </p>
                </div>
                <Link
                  href="/planner"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0F382C] hover:bg-[#0B2A21] text-white text-xs font-semibold transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tạo Thêm Lịch Trình
                </Link>
              </div>

              {/* Itinerary Cards */}
              {(!user?.savedItineraries || user.savedItineraries.length === 0) ? (
                <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-black/15 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#0F382C]/10 text-[#0F382C] flex items-center justify-center mx-auto mb-3">
                    <Compass className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-black mb-1">Chưa có lịch trình nào được lưu</h3>
                  <p className="text-xs text-black/60 max-w-sm mx-auto mb-6">
                    Sử dụng công cụ lập kế hoạch AI để tạo một hành trình độc bản và lưu lại vào hồ sơ của bạn.
                  </p>
                  <Link
                    href="/planner"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0F382C] hover:bg-[#0B2A21] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    Trải Nghiệm Planner AI
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.savedItineraries.map((itinerary) => (
                    <div
                      key={itinerary.id}
                      className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-all group relative"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#0F382C]/10 text-[#0F382C] text-[10px] font-bold uppercase tracking-wider">
                              {itinerary.days} Ngày
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#8F721B] text-[10px] font-bold uppercase tracking-wider capitalize">
                              Hạng {itinerary.budgetTier}
                            </span>
                            <span className="text-[11px] text-black/40">
                              Lưu ngày {itinerary.createdAt}
                            </span>
                          </div>
                          <h3 className="font-serif font-bold text-lg text-[#0F382C] group-hover:text-[#D4AF37] transition-colors">
                            {itinerary.title}
                          </h3>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] text-black/50 block">Dự kiến trọn gói</span>
                          <span className="font-serif font-bold text-base text-[#0F382C]">
                            {itinerary.estimatedCost}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-3 px-4 bg-[#FAFAF9] rounded-xl text-xs text-black/70 mb-4">
                        <div>
                          <span className="text-black/40 block text-[10px]">Điểm Đến:</span>
                          <span className="font-semibold">{itinerary.destinationName}</span>
                        </div>
                        <div>
                          <span className="text-black/40 block text-[10px]">Nhóm Du Khách:</span>
                          <span className="font-semibold">{itinerary.groupType}</span>
                        </div>
                        <div>
                          <span className="text-black/40 block text-[10px]">Phong Cách:</span>
                          <span className="font-semibold">{itinerary.travelStyle}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-black/5">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/destinations/${itinerary.destinationSlug}`}
                            className="inline-flex items-center gap-1 text-xs text-[#0F382C] hover:text-[#D4AF37] font-semibold transition-colors"
                          >
                            <span>Xem Danh Thắng</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                          <span className="text-black/20">•</span>
                          <Link
                            href="/planner"
                            className="inline-flex items-center gap-1 text-xs text-[#0F382C] hover:text-[#D4AF37] font-semibold transition-colors"
                          >
                            <span>Mở Lại Trong Planner</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteItinerary(itinerary.id)}
                          className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 p-1 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                          title="Xóa lịch trình này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column (1 Col): Preferences & Security */}
            <div className="space-y-6">
              
              {/* Preferences Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-base text-[#0F382C] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    Sở Thích Du Lịch
                  </h3>
                  {!editingPrefs && (
                    <button
                      type="button"
                      onClick={() => setEditingPrefs(true)}
                      className="text-xs font-semibold text-[#0F382C] hover:text-[#D4AF37] cursor-pointer"
                    >
                      Chỉnh sửa
                    </button>
                  )}
                </div>

                {savedStatus && (
                  <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Đã cập nhật sở thích thành công!</span>
                  </div>
                )}

                {editingPrefs ? (
                  <form onSubmit={handleSavePreferences} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-black/60 uppercase mb-1">
                        Vùng miền ưa thích
                      </label>
                      <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAFAF9] border border-black/10 rounded-xl focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-black/60 uppercase mb-1">
                        Phong cách du lịch
                      </label>
                      <input
                        type="text"
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAFAF9] border border-black/10 rounded-xl focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-black/60 uppercase mb-1">
                        Mùa du lịch lý tưởng
                      </label>
                      <input
                        type="text"
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAFAF9] border border-black/10 rounded-xl focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-xl bg-[#0F382C] hover:bg-[#0B2A21] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Lưu Thay Đổi
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPrefs(false)}
                        className="px-3 py-2 rounded-xl bg-black/5 hover:bg-black/10 text-xs text-black/70 cursor-pointer"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#FAFAF9] border border-black/5">
                      <span className="text-black/40 block text-[11px] mb-0.5">Vùng Miền Quan Tâm</span>
                      <strong className="text-black/80 font-medium">{region}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAFAF9] border border-black/5">
                      <span className="text-black/40 block text-[11px] mb-0.5">Phong Cách Trải Nghiệm</span>
                      <strong className="text-black/80 font-medium">{style}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAFAF9] border border-black/5">
                      <span className="text-black/40 block text-[11px] mb-0.5">Thời Gian Yêu Thích</span>
                      <strong className="text-black/80 font-medium">{season}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* VIP Concierge Banner */}
              <div className="bg-[#0F382C] text-white rounded-3xl p-6 relative overflow-hidden border border-[#D4AF37]/30">
                <div className="relative z-10">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                    Đặc quyền thành viên
                  </span>
                  <h4 className="font-serif font-bold text-lg mb-2">Trợ Lý Du Lịch Riêng</h4>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    Thành viên có quyền yêu cầu tư vấn lịch trình độc quyền hoặc đặt chỗ du thuyền, resort 5 sao với giá ưu đãi riêng biệt.
                  </p>
                  <a
                    href="mailto:vip@vietnamunveiled.com"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] hover:underline"
                  >
                    <span>Liên Hệ Concierge Desk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </AuthGuard>
  );
}
