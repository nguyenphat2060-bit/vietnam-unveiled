'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Compass, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function UnauthorizedPage() {
  const { role, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0F382C] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-lg bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-md shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#E05A47]/20 border border-[#E05A47]/40 text-[#E05A47] flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase block mb-2">
          Lỗi Phân Quyền (HTTP 403)
        </span>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
          Truy Cập Bị Giới Hạn
        </h1>

        <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed mb-6">
          Tài khoản của bạn hiện có vai trò là <strong className="text-white capitalize">"{role}"</strong>. Khu vực bạn đang cố gắng truy cập chỉ dành riêng cho quyền quản trị viên hoặc thành viên đặc quyền.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#D4AF37] hover:brightness-110 text-[#0F382C] text-xs font-bold uppercase tracking-wider transition-all shadow-md text-center"
          >
            Đăng Nhập Tài Khoản Khác
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/10 text-center"
          >
            Về Trang Chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
