'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { BankSettings } from '@/lib/bankSettings';
import confetti from 'canvas-confetti';
import {
  X,
  QrCode,
  Copy,
  Check,
  Download,
  ShieldCheck,
  CreditCard,
  Building,
  User as UserIcon,
  Phone,
  Mail,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Luggage
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourTitle: string;
  destinationName: string;
  destinationSlug?: string;
  estimatedPrice?: string;
  daysCount?: number;
}

export default function BookingModal({
  isOpen,
  onClose,
  tourTitle,
  destinationName,
  destinationSlug = 'hoi-an',
  estimatedPrice = '15.500.000 VNĐ',
  daysCount = 3
}: BookingModalProps) {
  const { user } = useAuth();

  // Multi-step: 'info' -> 'payment' -> 'confirmed'
  const [step, setStep] = useState<'info' | 'payment' | 'confirmed'>('info');

  // Customer details form
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '0901 888 999');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [guestsCount, setGuestsCount] = useState(2);
  const [packageTier, setPackageTier] = useState<'standard' | 'luxury' | 'vip'>('luxury');
  const [specialRequests, setSpecialRequests] = useState('');

  // Bank settings & generated order
  const [bankSettings, setBankSettings] = useState<BankSettings>({
    bankId: 'MB',
    bankName: 'MBBank (Ngân hàng TMCP Quân Đội)',
    accountNo: '0901888999',
    accountName: 'VIETNAM UNVEILED TRAVEL CORP',
    branch: 'Chi nhánh Hà Nội - Hội sở chính',
    memoPrefix: 'VU-TOUR',
    supportHotline: '1900 8888 (24/7 Concierge)',
    updatedAt: ''
  });

  const [bookingCode, setBookingCode] = useState('');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [downloadingQr, setDownloadingQr] = useState(false);

  // Sync user defaults when modal opens
  useEffect(() => {
    if (user) {
      if (!customerName) setCustomerName(user.name);
      if (!customerEmail) setCustomerEmail(user.email);
      if (user.phone && customerPhone === '0901 888 999') setCustomerPhone(user.phone);
    }
  }, [user, isOpen]);

  // Fetch live bank settings on mount
  useEffect(() => {
    async function loadBankSettings() {
      try {
        const res = await fetch('/api/admin/bank-settings');
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            setBankSettings(data.settings);
          }
        }
      } catch (e) {
        // use default fallback
      }
    }
    if (isOpen) {
      loadBankSettings();
    }
  }, [isOpen]);

  // Generate unique booking code when opening payment step
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const prefix = bankSettings.memoPrefix || 'VU-TOUR';
    setBookingCode(`${prefix}-${randomSuffix}`);
    setStep('payment');
  };

  // Pricing calculation
  const basePricePerPerson =
    packageTier === 'standard' ? 4500000 : packageTier === 'luxury' ? 7800000 : 13500000;
  const totalPriceNumber = basePricePerPerson * guestsCount;
  const totalPriceFormatted = totalPriceNumber.toLocaleString('vi-VN') + ' VNĐ';

  // Official VietQR URL
  const vietQrUrl = `https://img.vietqr.io/image/${bankSettings.bankId}-${bankSettings.accountNo}-compact2.png?amount=${totalPriceNumber}&addInfo=${encodeURIComponent(
    bookingCode
  )}&accountName=${encodeURIComponent(bankSettings.accountName)}`;

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2500);
    }
  };

  const handleCopyAll = () => {
    const fullText = `[VIETNAM UNVEILED - THÔNG TIN CHUYỂN KHOẢN TOUR]
- Ngân hàng: ${bankSettings.bankName} (${bankSettings.bankId})
- Số tài khoản: ${bankSettings.accountNo}
- Chủ tài khoản: ${bankSettings.accountName}
- Số tiền: ${totalPriceFormatted}
- Nội dung chuyển khoản: ${bookingCode}
- Hotline hỗ trợ 24/7: ${bankSettings.supportHotline}`;
    handleCopy(fullText, 'all');
  };

  const handleDownloadQr = async () => {
    setDownloadingQr(true);
    try {
      const response = await fetch(vietQrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VietQR-${bookingCode}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setCopiedItem('qr_downloaded');
      setTimeout(() => setCopiedItem(null), 2500);
    } catch (err) {
      // Fallback open in new tab
      window.open(vietQrUrl, '_blank');
    } finally {
      setDownloadingQr(false);
    }
  };

  const handleConfirmPayment = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#0F382C', '#E05A47', '#FFF1B0']
    });
    setStep('confirmed');
  };

  const handleResetAndClose = () => {
    setStep('info');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#FAFAF9] rounded-3xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#121212]">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#0F382C] via-[#0B2A21] to-[#061813] text-white p-6 sm:p-7 relative border-b border-[#D4AF37]/30 flex-shrink-0">
          <button
            type="button"
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vietnam Unveiled Concierge Desk</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white pr-8">
            {step === 'info' && 'Đặt Tour & Trải Nghiệm Lịch Trình'}
            {step === 'payment' && 'Thanh Toán Chuyển Khoản Nhanh VietQR'}
            {step === 'confirmed' && 'Xác Nhận Đặt Chỗ Thành Công'}
          </h2>

          <p className="text-white/70 text-xs mt-1">
            {tourTitle} • {destinationName} ({daysCount} Ngày)
          </p>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
            <div className={`flex items-center gap-1.5 ${step === 'info' ? 'text-[#D4AF37] font-bold' : 'text-white/60'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'info' ? 'bg-[#D4AF37] text-[#0F382C]' : 'bg-white/20'}`}>1</span>
              <span>Thông tin tour</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-[#D4AF37] font-bold' : 'text-white/60'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-[#D4AF37] text-[#0F382C]' : 'bg-white/20'}`}>2</span>
              <span>Mã QR VietQR</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <div className={`flex items-center gap-1.5 ${step === 'confirmed' ? 'text-[#D4AF37] font-bold' : 'text-white/60'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'confirmed' ? 'bg-[#D4AF37] text-[#0F382C]' : 'bg-white/20'}`}>3</span>
              <span>Hoàn tất</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* STEP 1: CUSTOMER & TOUR INFO FORM */}
          {step === 'info' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              <div className="bg-[#0F382C]/5 rounded-2xl p-4 border border-[#0F382C]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-black/50 uppercase font-bold block">Chuyến Đi Đã Chọn</span>
                  <span className="font-serif font-bold text-base text-[#0F382C]">{tourTitle}</span>
                  <span className="text-xs text-black/60 block mt-0.5">Điểm đến: {destinationName} • Lịch trình {daysCount} ngày</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[11px] text-black/50 uppercase font-bold block">Dự Tính Trọn Gói</span>
                  <span className="text-lg font-serif font-bold text-[#0F382C]">{totalPriceFormatted}</span>
                </div>
              </div>

              {/* Package Tier Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                  Chọn Hạng Dịch Vụ
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPackageTier('standard')}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      packageTier === 'standard'
                        ? 'border-[#0F382C] bg-[#0F382C]/5 shadow-sm ring-1 ring-[#0F382C]'
                        : 'border-black/10 bg-white hover:bg-black/[0.02]'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#0F382C] block">Tiêu Chuẩn 4*</span>
                    <span className="text-sm font-serif font-bold block text-black/80 mt-0.5">4.500.000 VNĐ / khách</span>
                    <span className="text-[11px] text-black/50 mt-1 block leading-tight">Khách sạn 4 sao & Hướng dẫn viên bản địa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageTier('luxury')}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      packageTier === 'luxury'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-sm ring-2 ring-[#D4AF37]'
                        : 'border-black/10 bg-white hover:bg-black/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#D4AF37] uppercase">Thượng Lưu 5* (Gợi ý)</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </div>
                    <span className="text-sm font-serif font-bold block text-[#0F382C] mt-0.5">7.800.000 VNĐ / khách</span>
                    <span className="text-[11px] text-black/60 mt-1 block leading-tight">Resort 5 sao, Du thuyền & Ẩm thực Michelin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageTier('vip')}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      packageTier === 'vip'
                        ? 'border-[#0F382C] bg-[#0F382C]/5 shadow-sm ring-1 ring-[#0F382C]'
                        : 'border-black/10 bg-white hover:bg-black/[0.02]'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#0F382C] block">Ultra VIP Concierge</span>
                    <span className="text-sm font-serif font-bold block text-black/80 mt-0.5">13.500.000 VNĐ / khách</span>
                    <span className="text-[11px] text-black/50 mt-1 block leading-tight">Xe đưa đón riêng, Biệt thự VIP & Trợ lý riêng 24/7</span>
                  </button>
                </div>
              </div>

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                    Họ và tên khách đại diện *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nguyễn Văn Hùng"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                    Số điện thoại nhận xác nhận *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0912 345 678"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                    Email nhận vé điện tử *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30" />
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="traveler@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                    Ngày khởi hành dự kiến *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30" />
                    <input
                      type="date"
                      required
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                    Số lượng khách
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30" />
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0F382C]"
                    >
                      <option value={1}>1 Khách (Đi một mình)</option>
                      <option value={2}>2 Khách (Cặp đôi / Bạn thân)</option>
                      <option value={3}>3 Khách</option>
                      <option value={4}>4 Khách (Gia đình)</option>
                      <option value={5}>5 Khách</option>
                      <option value={6}>6+ Khách (Đoàn riêng)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black/60 mb-1.5">
                    Ghi chú đặc biệt (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Ăn chay, phòng tầng cao, đón tại sân bay..."
                    className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0F382C]"
                  />
                </div>
              </div>

              {/* Price Summary & Submit */}
              <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-black/50 block">Tổng thanh toán dự kiến ({guestsCount} khách):</span>
                  <span className="text-2xl font-serif font-bold text-[#0F382C]">{totalPriceFormatted}</span>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-[#0F382C] hover:bg-[#0B2A21] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#0F382C]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-[#D4AF37]" />
                  <span>Tiếp Tục Thanh Toán VietQR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: VIETQR PAYMENT SCREEN */}
          {step === 'payment' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Vui lòng quét mã QR hoặc chuyển khoản trong vòng 15:00 phút:</strong> Hệ thống ngân hàng kết nối tự động nhận diện theo mã <strong>{bookingCode}</strong>.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Side: VietQR Code Card */}
                <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-black/10 shadow-md flex flex-col items-center justify-between text-center relative overflow-hidden">
                  <div className="w-full flex items-center justify-between pb-3 border-b border-black/5">
                    <span className="text-[11px] font-bold uppercase text-[#0F382C] tracking-wider flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                      VietQR Chuẩn NAPAS 24/7
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      Tự Động Điền
                    </span>
                  </div>

                  {/* QR Image Display */}
                  <div className="my-4 p-2 bg-white rounded-2xl border border-black/10 shadow-sm relative group">
                    <img
                      src={vietQrUrl}
                      alt={`Mã VietQR thanh toán ${bookingCode}`}
                      className="w-56 h-56 sm:w-60 sm:h-60 object-contain rounded-xl"
                    />
                  </div>

                  <p className="text-[11px] text-black/50 mb-4">
                    Mở ứng dụng Mobile Banking (VCB, MB, Techcom, BIDV, MoMo...) và chọn <strong>Quét QR</strong>.
                  </p>

                  {/* Download QR Button */}
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    disabled={downloadingQr}
                    className="w-full py-2.5 px-4 rounded-xl bg-black/5 hover:bg-black/10 text-xs font-semibold text-black/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadingQr ? 'Đang chuẩn bị ảnh...' : 'Tải Mã QR Về Máy'}</span>
                  </button>
                </div>

                {/* Right Side: Banking Transfer Card & Copy fields */}
                <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-black/10 shadow-md flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif font-bold text-base text-[#0F382C] flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#D4AF37]" />
                        Thông Tin Chuyển Khoản Thủ Công
                      </h3>
                      <button
                        type="button"
                        onClick={handleCopyAll}
                        className="text-[11px] font-semibold text-[#0F382C] hover:text-[#D4AF37] flex items-center gap-1 cursor-pointer"
                      >
                        {copiedItem === 'all' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedItem === 'all' ? 'Đã sao chép tất cả!' : 'Sao chép tất cả'}</span>
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      {/* Bank Name */}
                      <div className="p-3 bg-[#FAFAF9] rounded-xl border border-black/5 flex items-center justify-between">
                        <div>
                          <span className="text-black/40 block text-[10px] uppercase font-bold">Ngân Hàng Thụ Hưởng</span>
                          <span className="font-semibold text-black/90">{bankSettings.bankName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(bankSettings.bankName, 'bank')}
                          className="p-1.5 rounded-lg hover:bg-black/5 text-black/60 transition-colors"
                          title="Sao chép tên ngân hàng"
                        >
                          {copiedItem === 'bank' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Account Number */}
                      <div className="p-3 bg-[#FAFAF9] rounded-xl border border-black/5 flex items-center justify-between">
                        <div>
                          <span className="text-black/40 block text-[10px] uppercase font-bold">Số Tài Khoản</span>
                          <span className="font-mono font-bold text-sm text-[#0F382C] tracking-wider">{bankSettings.accountNo}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(bankSettings.accountNo, 'accountNo')}
                          className="px-2.5 py-1 rounded-lg bg-[#0F382C]/10 text-[#0F382C] hover:bg-[#0F382C] hover:text-white transition-all text-[11px] font-semibold flex items-center gap-1"
                        >
                          {copiedItem === 'accountNo' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedItem === 'accountNo' ? 'Đã chép' : 'Sao chép số TK'}</span>
                        </button>
                      </div>

                      {/* Account Name */}
                      <div className="p-3 bg-[#FAFAF9] rounded-xl border border-black/5 flex items-center justify-between">
                        <div>
                          <span className="text-black/40 block text-[10px] uppercase font-bold">Chủ Tài Khoản</span>
                          <span className="font-semibold text-black/90 uppercase">{bankSettings.accountName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(bankSettings.accountName, 'accountName')}
                          className="p-1.5 rounded-lg hover:bg-black/5 text-black/60 transition-colors"
                        >
                          {copiedItem === 'accountName' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Amount */}
                      <div className="p-3 bg-[#FAFAF9] rounded-xl border border-black/5 flex items-center justify-between">
                        <div>
                          <span className="text-black/40 block text-[10px] uppercase font-bold">Số Tiền Cần Chuyển</span>
                          <span className="font-serif font-bold text-base text-[#0F382C]">{totalPriceFormatted}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(totalPriceNumber.toString(), 'amount')}
                          className="px-2.5 py-1 rounded-lg bg-[#0F382C]/10 text-[#0F382C] hover:bg-[#0F382C] hover:text-white transition-all text-[11px] font-semibold flex items-center gap-1"
                        >
                          {copiedItem === 'amount' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedItem === 'amount' ? 'Đã chép' : 'Sao chép tiền'}</span>
                        </button>
                      </div>

                      {/* Transfer Memo (Very Important) */}
                      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-center justify-between">
                        <div>
                          <span className="text-amber-800 block text-[10px] uppercase font-bold">
                            Nội Dung Chuyển Khoản (Bắt Buộc Đúng)
                          </span>
                          <span className="font-mono font-bold text-sm text-[#0F382C] tracking-wider">{bookingCode}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(bookingCode, 'memo')}
                          className="px-3 py-1 rounded-lg bg-[#D4AF37] text-[#0F382C] hover:brightness-110 font-bold transition-all text-[11px] flex items-center gap-1 shadow-sm"
                        >
                          {copiedItem === 'memo' ? <Check className="w-3 h-3 text-emerald-900" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedItem === 'memo' ? 'Đã chép!' : 'Sao Chép Mã'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Back & Confirm */}
                  <div className="pt-3 border-t border-black/10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('info')}
                      className="px-4 py-2.5 rounded-xl border border-black/20 text-xs font-semibold hover:bg-black/5 flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Quay lại</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirmPayment}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89222] text-[#0F382C] text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:brightness-110 flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tôi Đã Chuyển Khoản Thành Công</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMATION RECEIPT */}
          {step === 'confirmed' && (
            <div className="text-center py-6 sm:py-8 space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase block mb-1">
                  Đã Tiếp Nhận Yêu Cầu Đặt Chỗ
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F382C]">
                  Cảm Ơn Quý Khách, {customerName}!
                </h3>
                <p className="text-xs sm:text-sm text-black/60 max-w-md mx-auto mt-2 leading-relaxed">
                  Giao dịch chuyển khoản cho chuyến đi <strong>{tourTitle}</strong> đang được bộ phận Concierge xác thực tự động.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="max-w-md mx-auto bg-white rounded-2xl p-5 border border-black/10 shadow-sm text-left text-xs space-y-2.5">
                <div className="flex justify-between pb-2 border-b border-black/5">
                  <span className="text-black/50">Mã Đặt Chỗ (Booking Code):</span>
                  <span className="font-mono font-bold text-[#0F382C]">{bookingCode}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-black/5">
                  <span className="text-black/50">Điểm Đến & Thời Lượng:</span>
                  <span className="font-semibold">{destinationName} ({daysCount} Ngày)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-black/5">
                  <span className="text-black/50">Ngày Khởi Hành:</span>
                  <span className="font-semibold">{departureDate}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-black/5">
                  <span className="text-black/50">Số Lượng Khách:</span>
                  <span className="font-semibold">{guestsCount} người lớn ({packageTier.toUpperCase()})</span>
                </div>
                <div className="flex justify-between pt-1 text-sm">
                  <span className="font-bold text-black/70">Tổng Tiền Đã Thanh Toán:</span>
                  <span className="font-serif font-bold text-[#0F382C]">{totalPriceFormatted}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F382C]/5 border border-[#0F382C]/10 max-w-md mx-auto text-xs text-[#0F382C]/80 leading-relaxed text-center">
                Vé điện tử và lịch trình hành trình chi tiết sẽ được gửi tới hòm thư <strong>{customerEmail}</strong> trong vòng 10 phút.
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-full bg-[#0F382C] hover:bg-[#0B2A21] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  Hoàn Tất & Đóng
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
