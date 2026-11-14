'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Lock, Sparkles, Compass } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectUrl?: string;
}

export default function AuthGuard({
  children,
  allowedRoles,
  redirectUrl = '/login'
}: AuthGuardProps) {
  const { user, role } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if role is allowed
    const isAllowed = allowedRoles.includes(role);
    if (!isAllowed) {
      const timeout = setTimeout(() => {
        router.push(`${redirectUrl}?error=unauthorized`);
      }, 1500);
      return () => clearTimeout(timeout);
    } else {
      setChecking(false);
    }
  }, [role, allowedRoles, redirectUrl, router]);

  const isAllowed = allowedRoles.includes(role);

  if (checking && !isAllowed) {
    return (
      <div className="min-h-screen bg-[#0F382C] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 animate-pulse border border-[#D4AF37]/40 shadow-2xl">
          <Lock className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          Đang Xác Thực Quyền Truy Cập...
        </h2>
        <p className="text-white/70 text-sm max-w-md font-light leading-relaxed mb-6">
          Khu vực này yêu cầu quyền <strong>{allowedRoles.join(' / ')}</strong>. Hệ thống đang kiểm tra thông tin định danh của bạn.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#0F382C] text-xs font-bold tracking-wider uppercase shadow-lg hover:brightness-110 transition-all"
          >
            Đăng Nhập Ngay
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all"
          >
            Về Trang Chủ
          </Link>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#E05A47]/20 flex items-center justify-center mb-6 border border-[#E05A47]/40">
          <ShieldAlert className="w-8 h-8 text-[#E05A47]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          Truy Cập Bị Giới Hạn (403)
        </h2>
        <p className="text-white/70 text-sm max-w-md font-light leading-relaxed mb-6">
          Tài khoản hiện tại ({role}) không có đủ thẩm quyền để truy cập trang này. Vui lòng đăng nhập với tài khoản hợp lệ.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#0F382C] text-xs font-bold uppercase tracking-wider shadow-lg"
          >
            Đổi Tài Khoản
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all"
          >
            Về Trang Chủ
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
