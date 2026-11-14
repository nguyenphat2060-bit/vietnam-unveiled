'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Calendar, Compass, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DESTINATIONS } from '@/data/destinations';

export default function AITeaserWidget() {
  const router = useRouter();
  const [dest, setDest] = useState('hoi-an');
  const [style, setStyle] = useState('heritage');
  const [days, setDays] = useState('3');
  const [group, setGroup] = useState('couple');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/planner?destination=${dest}&style=${style}&days=${days}&group=${group}`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#121212] to-[#0A1A14] text-white relative overflow-hidden">
      {/* Visual decorative accents */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#0F382C] rounded-full blur-[130px] opacity-70 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-black/80 via-[#0F382C]/60 to-black/80 border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#FFF1B0] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                <span>Trợ Lý Trí Tuệ Nhân Tạo</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Thiết Kế Kỳ Nghỉ <br />
                <span className="gold-gradient-text">Đo Ni Đóng Giày</span>
              </h2>

              <p className="text-sm text-white/75 font-light leading-relaxed">
                Chỉ trong 30 giây, AI của Vietnam Unveiled sẽ tự động tối ưu hóa lộ trình từng buổi sáng - trưa - chiều - tối đồng bộ cùng bản đồ địa phương và gợi ý ẩm thực chuẩn bản địa.
              </p>

              <div className="space-y-2 pt-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Cá nhân hóa theo sở thích & số lượng thành viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Dự toán kinh phí chi tiết theo ngày</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Đồng bộ lộ trình trực quan lên bản đồ</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Form Box */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Destination */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" /> Điểm Đến Mục Tiêu
                    </label>
                    <select
                      value={dest}
                      onChange={(e) => setDest(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      {DESTINATIONS.map((d) => (
                        <option key={d.slug} value={d.slug}>
                          {d.name} ({d.province})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Travel Style */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Phong Cách Chuyến Đi
                    </label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="heritage">Văn Hóa Di Sản & Lịch Sử</option>
                      <option value="beach">Nghỉ Dưỡng Biển & Hoàng Hôn</option>
                      <option value="adventure">Trekking & Mạo Hiểm Hang Động</option>
                      <option value="culinary">Hành Trình Ẩm Thực Đường Phố</option>
                    </select>
                  </div>

                  {/* Days */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Số Ngày Dự Kiến
                    </label>
                    <select
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="2">2 Ngày 1 Đêm (Trải nghiệm nhanh)</option>
                      <option value="3">3 Ngày 2 Đêm (Lý tưởng nhất)</option>
                      <option value="4">4 Ngày 3 Đêm (Trọn vẹn)</option>
                      <option value="7">7 Ngày (Khám phá chuyên sâu)</option>
                    </select>
                  </div>

                  {/* Group */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Đối Tượng Đi Cùng
                    </label>
                    <select
                      value={group}
                      onChange={(e) => setGroup(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="couple">Cặp Đôi Lãng Mạn</option>
                      <option value="solo">Đi Một Mình (Solo Traveler)</option>
                      <option value="family">Gia Đình Có Trẻ Nhỏ / Người Cao Tuổi</option>
                      <option value="friends">Nhóm Bạn Thân</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FFF1B0] via-[#D4AF37] to-[#C5A028] text-[#0F382C] font-bold text-sm tracking-wide shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 group"
                  >
                    <Sparkles className="w-4 h-4 fill-[#0F382C]" />
                    <span>Tạo Lịch Trình Thông Minh Ngay</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
