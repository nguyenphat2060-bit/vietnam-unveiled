'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  ShieldCheck,
  UserCheck,
  Compass,
  ArrowRight,
  Mail,
  Lock,
  User as UserIcon,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  KeyRound
} from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '';
  const errorParam = searchParams.get('error');

  const { login, register, quickLogin, user, role, logout } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRedirect = (targetRole?: 'admin' | 'member' | 'guest') => {
    if (redirectPath) {
      router.push(redirectPath);
      return;
    }
    if (targetRole === 'admin') {
      router.push('/admin');
    } else {
      router.push('/profile');
    }
  };

  const handleStandardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email) {
          setErrorMsg('Vui lòng nhập địa chỉ email.');
          setLoading(false);
          return;
        }
        const res = await login(email, password);
        if (res.success) {
          setSuccessMsg('Đăng nhập thành công! Đang chuyển hướng...');
          setTimeout(() => {
            const roleTarget = email.toLowerCase().includes('admin') ? 'admin' : 'member';
            handleRedirect(roleTarget);
          }, 600);
        } else {
          setErrorMsg(res.error || 'Đăng nhập không thành công. Hãy thử tài khoản demo bên dưới.');
        }
      } else {
        if (!name || !email) {
          setErrorMsg('Vui lòng điền họ tên và email đầy đủ.');
          setLoading(false);
          return;
        }
        const res = await register(name, email, password);
        if (res.success) {
          setSuccessMsg('Tạo tài khoản Thành viên thành công! Đang vào hồ sơ...');
          setTimeout(() => {
            handleRedirect('member');
          }, 800);
        } else {
          setErrorMsg(res.error || 'Không thể tạo tài khoản.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuick = (quickRole: 'admin' | 'member') => {
    quickLogin(quickRole);
    setSuccessMsg(`Đã đăng nhập thành công vai trò: ${quickRole === 'admin' ? 'Quản trị viên (Admin)' : 'Thành viên (Member)'}`);
    setTimeout(() => {
      handleRedirect(quickRole);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#121212] pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0F382C]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Side: Brand & Quick Demo RBAC Selectors */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0F382C] via-[#0B2A21] to-[#061813] text-white p-8 sm:p-10 rounded-3xl shadow-2xl flex flex-col justify-between border border-[#D4AF37]/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Hệ Thống Phân Quyền (RBAC)
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3 leading-tight">
              Vietnam <span className="text-[#D4AF37] italic">Unveiled</span>
            </h1>
            <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
              Cổng thông tin du lịch di sản thượng lưu Việt Nam. Trải nghiệm dịch vụ cá nhân hóa theo từng vai trò định danh.
            </p>

            {/* Quick Demo Login Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
                <KeyRound className="w-4 h-4" />
                Đăng Nhập Nhanh (1-Click Demo)
              </div>
              <p className="text-xs text-white/60 mb-4 leading-relaxed">
                Nhấn chọn để trải nghiệm ngay hệ thống phân quyền 3 nhóm người dùng:
              </p>

              <div className="space-y-3">
                {/* Admin Quick Button */}
                <button
                  type="button"
                  onClick={() => handleQuick('admin')}
                  className="w-full group text-left p-3 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F382C] border border-white/15 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 group-hover:bg-[#0F382C]/10 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37] group-hover:text-[#0F382C]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider">Admin (Quản trị viên)</div>
                      <div className="text-[11px] opacity-70">admin@vietnamunveiled.com</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Member Quick Button */}
                <button
                  type="button"
                  onClick={() => handleQuick('member')}
                  className="w-full group text-left p-3 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F382C] border border-white/15 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 group-hover:bg-[#0F382C]/10 flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-emerald-300 group-hover:text-[#0F382C]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider">Thành Viên (Member)</div>
                      <div className="text-[11px] opacity-70">member@vietnamunveiled.com</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          </div>

          {/* Current State or Guest back */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>Vai trò hiện tại: <strong className="text-white capitalize">{role}</strong></span>
            <Link href="/" className="hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
              <Compass className="w-3.5 h-3.5" /> Khách thăm quan
            </Link>
          </div>
        </div>

        {/* Right Side: Login / Register Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-black/5 flex flex-col justify-center">
          
          {/* Notice Banner if redirected by Guard */}
          {errorParam === 'admin_required' && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Yêu cầu quyền Quản Trị Viên (Admin)</strong>
                Trang bạn vừa truy cập được bảo vệ bởi Middleware RBAC. Vui lòng bấm vào ô <strong>Admin</strong> ở cột bên trái hoặc đăng nhập với tài khoản Admin.
              </div>
            </div>
          )}

          {errorParam === 'login_required' && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Yêu cầu đăng nhập Thành Viên</strong>
                Bạn cần đăng nhập để quản lý lịch trình cá nhân và hồ sơ du lịch. Chọn <strong>Thành Viên</strong> ở bên trái để vào ngay.
              </div>
            </div>
          )}

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-black/10 mb-8">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              className={`pb-3 text-sm font-semibold tracking-wide border-b-2 transition-all mr-6 ${
                mode === 'login'
                  ? 'border-[#0F382C] text-[#0F382C]'
                  : 'border-transparent text-black/40 hover:text-black'
              }`}
            >
              Đăng Nhập
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              className={`pb-3 text-sm font-semibold tracking-wide border-b-2 transition-all ${
                mode === 'register'
                  ? 'border-[#0F382C] text-[#0F382C]'
                  : 'border-transparent text-black/40 hover:text-black'
              }`}
            >
              Tạo Tài Khoản Thành Viên
            </button>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleStandardSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                  Họ và tên
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#FAFAF9] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#0F382C] transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                Địa chỉ Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vietnamunveiled.com hoặc email của bạn"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAF9] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#0F382C] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-black/60">
                  Mật khẩu
                </label>
                {mode === 'login' && (
                  <span className="text-[11px] text-black/40 italic">Demo: nhập bất kỳ</span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAF9] border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#0F382C] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#0F382C] hover:bg-[#0B2A21] text-white text-sm font-bold tracking-wide uppercase shadow-lg shadow-[#0F382C]/20 transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer"
            >
              {loading ? (
                <span>Đang xử lý...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Đăng Nhập Ngay' : 'Đăng Ký & Nhận Ưu Đãi'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Guide */}
          <div className="mt-8 pt-6 border-t border-black/5 text-xs text-black/50 leading-relaxed">
            <p className="font-semibold text-black/70 mb-1">Quy định phân quyền hệ thống:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Khách (Guest):</strong> Khám phá danh lam thắng cảnh, dùng thử lịch trình mẫu, đăng ký bản tin di sản.</li>
              <li><strong>Thành viên (Member):</strong> Đăng nhập, lưu giữ các lịch trình AI riêng biệt, cập nhật hồ sơ du lịch.</li>
              <li><strong>Quản trị viên (Admin):</strong> Toàn quyền trang <span className="font-mono bg-black/5 px-1 py-0.5 rounded">/admin</span>, quản lý tài khoản, danh lam thắng cảnh và danh sách email đăng ký nhận tin.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0F382C] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
