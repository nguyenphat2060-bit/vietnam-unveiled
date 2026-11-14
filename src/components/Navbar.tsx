'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Compass, Sparkles, Menu, X, Heart, Globe, ArrowRight, User as UserIcon, Shield, LogOut, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, isAdmin, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currency, setCurrency] = useState<'VND' | 'USD'>('VND');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', href: '/' },
    { name: 'Điểm Đến', href: '/#destinations' },
    { name: 'Bản Đồ Khám Phá', href: '/#interactive-map' },
    { name: 'Bộ Sưu Tập', href: '/#collections' },
    { name: 'Lên Kế Hoạch AI', href: '/planner', highlight: true },
    ...(isAdmin ? [{ name: 'Quản Trị', href: '/admin', adminOnly: true }] : []),
  ];

  const savedCount = user ? user.savedItineraries.length : 2;

  const handleLogout = () => {
    setUserDropdownOpen(false);
    logout();
    router.push('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0F382C]/95 backdrop-blur-md shadow-xl py-3 border-b border-[#D4AF37]/20'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] p-[1.5px] shadow-lg transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0F382C] rounded-full flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#D4AF37] transition-transform duration-500 group-hover:rotate-45" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">
                VIETNAM <span className="text-[#D4AF37]">UNVEILED</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/90 -mt-1 font-sans font-medium">
                The Timeless Charm
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-1 ${
                    link.adminOnly
                      ? 'text-[#FFF1B0] bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full hover:bg-[#D4AF37] hover:text-[#0F382C] font-semibold'
                      : link.highlight
                      ? 'text-[#D4AF37] flex items-center gap-1.5 font-semibold hover:text-[#FFF1B0]'
                      : isActive
                      ? 'text-white font-semibold'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />}
                  {link.name}
                  {isActive && !link.adminOnly && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & User Account */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Currency toggle */}
            <button
              onClick={() => setCurrency(currency === 'VND' ? 'USD' : 'VND')}
              className="text-xs px-2.5 py-1 rounded-full border border-white/20 text-white/90 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center gap-1.5"
              title="Đổi tiền tệ"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currency}</span>
            </button>

            {/* Saved Wishlist / Itineraries */}
            <Link
              href={isAuthenticated ? '/profile' : '/planner'}
              className="relative p-2 rounded-full text-white/90 hover:text-[#D4AF37] hover:bg-white/10 transition-all"
              title={isAuthenticated ? 'Lịch trình cá nhân đã lưu' : 'Điểm đến yêu thích'}
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E05A47] text-[10px] font-bold text-white flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* User Account / Role Badge */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-left"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-white truncate max-w-[110px]">
                      {user.name.split(' ').slice(-1)[0]}
                    </span>
                    <span className={`text-[9px] uppercase tracking-wider font-bold ${
                      isAdmin ? 'text-[#FFF1B0]' : 'text-emerald-300'
                    }`}>
                      {isAdmin ? 'Quản Trị' : 'Thành Viên'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-white/60 ml-0.5" />
                </button>

                {/* Account Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#181818] border border-[#D4AF37]/30 rounded-2xl shadow-2xl py-2 z-50 text-white animate-fade-in backdrop-blur-xl">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-white/60 truncate">{user.email}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        isAdmin ? 'bg-[#D4AF37] text-[#0F382C]' : 'bg-[#0F382C] text-[#FFF1B0] border border-[#D4AF37]/30'
                      }`}>
                        Vai trò: {isAdmin ? 'Quản Trị Viên (Admin)' : 'Thành Viên (Member)'}
                      </span>
                    </div>

                    <div className="py-1 text-xs">
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-white/10 text-[#FFF1B0] transition-colors"
                        >
                          <Shield className="w-4 h-4 text-[#D4AF37]" />
                          <span>Trang Quản Trị (Admin)</span>
                        </Link>
                      )}

                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-white/10 text-white/90 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-[#D4AF37]" />
                        <span>Hồ Sơ & Lịch Trình Lưu</span>
                      </Link>

                      <Link
                        href="/planner"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-white/10 text-white/90 transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span>Tạo Lịch Trình Mới</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-red-500/20 text-[#E05A47] transition-colors border-t border-white/10 mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng Xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D4AF37]/40 text-xs font-semibold text-white hover:bg-white/10 hover:border-[#D4AF37] transition-all"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Đăng Nhập</span>
              </Link>
            )}

            {/* CTA Button */}
            <Link
              href="/planner"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-widest font-semibold text-[#0F382C] bg-gradient-to-r from-[#FFF1B0] via-[#D4AF37] to-[#C5A028] rounded-full shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group"
            >
              <span>Lên Kế Hoạch</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-3">
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]"
              >
                <img src={user?.avatar} alt="User" className="w-full h-full object-cover" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs px-2.5 py-1 bg-white/10 text-white rounded-full border border-white/20"
              >
                Đăng nhập
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#D4AF37] transition-colors"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F382C]/98 backdrop-blur-xl border-b border-[#D4AF37]/30 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            {isAuthenticated && user && (
              <div className="p-3 rounded-xl bg-white/10 border border-white/10 mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-[#D4AF37]" />
                  <div>
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <span className="text-[10px] text-[#FFF1B0] uppercase">{user.role}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs text-[#E05A47] hover:underline"
                >
                  Đăng xuất
                </button>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-white/90 hover:text-[#D4AF37] py-2 border-b border-white/10 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-white/90 hover:text-[#D4AF37] py-2 border-b border-white/10 flex items-center justify-between"
              >
                <span>Hồ Sơ & Lịch Trình Đã Lưu</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            )}

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-white/60">Tiền tệ: {currency}</span>
              <button
                onClick={() => setCurrency(currency === 'VND' ? 'USD' : 'VND')}
                className="text-xs text-[#D4AF37] underline"
              >
                Chuyển sang {currency === 'VND' ? 'USD' : 'VND'}
              </button>
            </div>

            <Link
              href="/planner"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full mt-2 py-3 text-center text-sm font-semibold text-[#0F382C] bg-gradient-to-r from-[#FFF1B0] to-[#D4AF37] rounded-xl shadow-md"
            >
              Bắt Đầu Tạo Lịch Trình AI
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
