'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Mail, ShieldCheck, Heart, Award, ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Sparkles, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');
    setPreviewUrl(null);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Đăng ký thành công! Vui lòng kiểm tra hộp thư email của bạn.');
        if (data.previewUrl) {
          setPreviewUrl(data.previewUrl);
        }
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage('Không thể kết nối máy chủ gửi email. Vui lòng thử lại sau.');
    }
  };

  return (
    <footer className="bg-[#121212] text-white border-t border-[#D4AF37]/20 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#0F382C]/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] p-[1.5px]">
                <div className="w-full h-full bg-[#0F382C] rounded-full flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-wider text-white">
                  VIETNAM <span className="text-[#D4AF37]">UNVEILED</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/80 -mt-1">
                  The Timeless Charm
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Cổng thông tin du lịch và trải nghiệm cao cấp được kiến tạo nhằm tôn vinh vẻ đẹp di sản văn hóa, danh thắng kỳ vĩ và chiều sâu ẩm thực của dải đất hình chữ S.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#D4AF37]">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Thành viên Mạng lưới Du lịch Bền vững Quốc gia</span>
            </div>
          </div>

          {/* Quick Links 1: Điểm đến */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#D4AF37] tracking-wider uppercase mb-4">
              Điểm Đến Nổi Bật
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/destinations/hoi-an" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                  <span>Phố Cổ Hội An</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                </Link>
              </li>
              <li>
                <Link href="/destinations/ha-long" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                  <span>Vịnh Hạ Long</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                </Link>
              </li>
              <li>
                <Link href="/destinations/ninh-binh" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                  <span>Tràng An - Tam Cốc</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                </Link>
              </li>
              <li>
                <Link href="/destinations/phu-quoc" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                  <span>Đảo Ngọc Phú Quốc</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                </Link>
              </li>
              <li>
                <Link href="/destinations/sa-pa" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                  <span>Sa Pa & Fansipan</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                </Link>
              </li>
              <li>
                <Link href="/destinations/son-doong" className="hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                  <span>Hang Sơn Đoòng</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 2: Trải nghiệm & Công cụ */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#D4AF37] tracking-wider uppercase mb-4">
              Trải Nghiệm & Công Cụ
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/planner" className="hover:text-[#D4AF37] transition-colors text-[#FFF1B0] font-medium">
                  ✦ Lên Lịch Trình AI
                </Link>
              </li>
              <li>
                <Link href="/#interactive-map" className="hover:text-[#D4AF37] transition-colors">
                  Bản Đồ Tương Tác 3 Miền
                </Link>
              </li>
              <li>
                <Link href="/#collections" className="hover:text-[#D4AF37] transition-colors">
                  Bộ Sưu Tập Chủ Đề
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-[#D4AF37] transition-colors">
                  Hồ Sơ & Lịch Trình Đã Lưu
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#D4AF37] transition-colors">
                  Cổng Quản Trị (Admin Portal)
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#D4AF37] tracking-wider uppercase">
              Bản Tin Di Sản
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Nhận thông tin về các lễ hội độc quyền, mùa ngắm lúa chín vàng và ưu đãi du thuyền mới nhất.
            </p>

            {/* Subscription Form */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn..."
                  disabled={status === 'loading'}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-2.5 px-4 bg-[#0F382C] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-[#0F382C] text-white text-xs font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang gửi email...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Đăng Ký Nhận Tin</span>
                  </>
                )}
              </button>
            </form>

            {/* Notification Toast / Banner */}
            {status === 'success' && (
              <div className="p-3 rounded-xl bg-[#0F382C]/90 border border-[#D4AF37]/50 text-xs text-white shadow-xl animate-fade-in space-y-1.5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="font-medium text-[#FFF1B0]">{message}</span>
                </div>
                <div className="text-[11px] text-white/80 pl-6">
                  Mã ưu đãi chào mừng <strong>UNVEILED-VIP2026</strong> đã được chuyển đến hộp thư của bạn!
                </div>
                {previewUrl && (
                  <div className="pl-6 pt-1">
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#D4AF37] underline hover:text-[#FFF1B0]"
                    >
                      <span>Xem bản xem trước email (Ethereal Preview)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {status === 'error' && (
              <div className="p-3 rounded-xl bg-[#E05A47]/20 border border-[#E05A47]/50 text-xs text-white shadow-xl animate-fade-in flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#E05A47] shrink-0 mt-0.5" />
                <span className="text-[#FFC0B8]">{message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Vietnam Unveiled. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Kiến tạo với tình yêu đất Việt <Heart className="w-3.5 h-3.5 text-[#E05A47] fill-current" />
            </span>
            <span className="border-l border-white/20 pl-6">Tiêu chuẩn UNESCO Heritage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
