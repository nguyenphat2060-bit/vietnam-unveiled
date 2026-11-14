'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AuthGuard from '@/components/AuthGuard';
import { DESTINATIONS } from '@/data/destinations';
import { Subscriber, UserRole, User } from '@/types/auth';
import { BankSettings } from '@/lib/bankSettings';
import {
  ShieldCheck,
  Users,
  Mail,
  MapPin,
  FileText,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Trash2,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
  Send,
  Eye,
  EyeOff,
  Check,
  Filter,
  BarChart3,
  Calendar,
  AlertTriangle,
  QrCode,
  Building,
  Save,
  RotateCcw,
  KeyRound,
  Copy,
  Plus,
  Phone,
  Lock,
  X,
  CreditCard,
  Download,
  DollarSign
} from 'lucide-react';

const POPULAR_BANKS = [
  { id: 'MB', name: 'MBBank (Ngân hàng TMCP Quân Đội)' },
  { id: 'VCB', name: 'Vietcombank (Ngân hàng Ngoại Thương Việt Nam)' },
  { id: 'TCB', name: 'Techcombank (Ngân hàng Kỹ Thương Việt Nam)' },
  { id: 'VPB', name: 'VPBank (Ngân hàng Việt Nam Thịnh Vượng)' },
  { id: 'ACB', name: 'ACB (Ngân hàng TMCP Á Châu)' },
  { id: 'BIDV', name: 'BIDV (Ngân hàng Đầu tư và Phát triển Việt Nam)' },
  { id: 'ICB', name: 'VietinBank (Ngân hàng TMCP Công Thương Việt Nam)' },
  { id: 'TPB', name: 'TPBank (Ngân hàng Tiên Phong)' },
];

export default function AdminDashboardPage() {
  const { user, allUsers, updateUserRole, deleteUser, createUser, resetPassword } = useAuth();

  const [activeTab, setActiveTab] = useState<'users' | 'destinations' | 'subscribers' | 'vietqr'>('users');
  const [userSearch, setUserSearch] = useState('');
  const [subscriberSearch, setSubscriberSearch] = useState('');

  // Password visibility map: { [userId]: boolean }
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

  // Create User Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('Admin@2026');
  const [createRole, setCreateRole] = useState<UserRole>('admin');
  const [createPhone, setCreatePhone] = useState('0901 888 999');
  const [creatingUser, setCreatingUser] = useState(false);
  const [createError, setCreateError] = useState('');

  // Reset Password Modal state
  const [resetModalUser, setResetModalUser] = useState<User | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');

  // Subscribers state fetched from API
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);
  const [subscribersError, setSubscribersError] = useState('');

  // Bank Settings State
  const [bankSettings, setBankSettings] = useState<BankSettings>({
    bankId: 'MB',
    bankName: 'MBBank (Ngân hàng TMCP Quân Đội)',
    accountNo: '0901888999',
    accountName: 'VIETNAM UNVEILED TRAVEL CORP',
    branch: 'Chi nhánh Hà Nội - Hội sở chính',
    memoPrefix: 'VU-TOUR',
    customQrUrl: '',
    supportHotline: '1900 8888 (24/7 Concierge)',
    updatedAt: ''
  });
  const [loadingBank, setLoadingBank] = useState(false);
  const [savingBank, setSavingBank] = useState(false);

  // Amount Mode & Test Amount for VietQR
  const [amountMode, setAmountMode] = useState<'fixed' | 'flexible'>('fixed');
  const [testAmount, setTestAmount] = useState<number>(15500000);
  const [testAmountInput, setTestAmountInput] = useState<string>('15.500.000');

  // Handle amount change with auto thousand formatting
  const handleAmountInputChange = (val: string) => {
    const cleanDigits = val.replace(/\D/g, '');
    if (!cleanDigits) {
      setTestAmount(0);
      setTestAmountInput('');
      return;
    }
    const num = parseInt(cleanDigits, 10);
    setTestAmount(num);
    setTestAmountInput(num.toLocaleString('vi-VN'));
  };

  const handleSelectPresetAmount = (presetVal: number) => {
    setTestAmount(presetVal);
    setTestAmountInput(presetVal.toLocaleString('vi-VN'));
    setAmountMode('fixed');
  };

  // Destination status state
  const [destList, setDestList] = useState(
    DESTINATIONS.map((d) => ({
      ...d,
      published: true
    }))
  );

  const [notification, setNotification] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Fetch subscribers from API
  const fetchSubscribers = async () => {
    setLoadingSubscribers(true);
    setSubscribersError('');
    try {
      const res = await fetch('/api/admin/subscribers');
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
      } else {
        setSubscribersError('Không thể tải danh sách email đăng ký.');
      }
    } catch (err) {
      setSubscribersError('Lỗi kết nối khi tải danh sách.');
    } finally {
      setLoadingSubscribers(false);
    }
  };

  // Fetch bank settings
  const fetchBankSettings = async () => {
    setLoadingBank(true);
    try {
      const res = await fetch('/api/admin/bank-settings');
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setBankSettings(data.settings);
          if (data.settings.amountMode) {
            setAmountMode(data.settings.amountMode);
          }
          if (data.settings.defaultAmount) {
            setTestAmount(Number(data.settings.defaultAmount));
            setTestAmountInput(Number(data.settings.defaultAmount).toLocaleString('vi-VN'));
          }
        }
      }
    } catch (e) {
      // ignore
    } finally {
      setLoadingBank(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
    fetchBankSettings();
  }, []);

  // Toggle reveal password for user row
  const toggleRevealPassword = (userId: string) => {
    setRevealedPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Copy password helper
  const handleCopyPassword = (pass: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pass);
      showNotice('Đã sao chép mật khẩu vào bộ nhớ tạm (Clipboard)!');
    }
  };

  // Handle Create User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    if (!createName || !createEmail || !createPassword) {
      setCreateError('Vui lòng điền đầy đủ thông tin Họ tên, Email và Mật khẩu.');
      return;
    }

    setCreatingUser(true);
    try {
      const res = await createUser({
        name: createName,
        email: createEmail,
        password: createPassword,
        role: createRole,
        phone: createPhone
      });

      if (res.success) {
        showNotice(`Đã tạo thành công tài khoản ${createRole === 'admin' ? 'Quản Trị Viên (Admin)' : 'Thành Viên'}: ${createName}`);
        setShowCreateModal(false);
        setCreateName('');
        setCreateEmail('');
        setCreatePassword('Admin@2026');
      } else {
        setCreateError(res.error || 'Không thể tạo tài khoản.');
      }
    } finally {
      setCreatingUser(false);
    }
  };

  // Handle Reset Password Submit
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalUser || !newPasswordInput) return;
    resetPassword(resetModalUser.id, newPasswordInput);
    showNotice(`Đã đặt lại mật khẩu mới cho tài khoản "${resetModalUser.name}"!`);
    setResetModalUser(null);
    setNewPasswordInput('');
  };

  // Handle Save Bank Settings
  const handleSaveBankSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBank(true);
    try {
      const res = await fetch('/api/admin/bank-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bankSettings,
          amountMode,
          defaultAmount: testAmount
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotice('Đã lưu cấu hình tài khoản ngân hàng & VietQR thành công!');
        if (data.settings) setBankSettings(data.settings);
      } else {
        showNotice(data.message || 'Lỗi khi lưu cấu hình ngân hàng.');
      }
    } catch (e) {
      showNotice('Không thể lưu thông tin ngân hàng. Vui lòng thử lại.');
    } finally {
      setSavingBank(false);
    }
  };

  const handleToggleRole = (userId: string, currentRole: UserRole) => {
    const newRole: UserRole = currentRole === 'admin' ? 'member' : 'admin';
    updateUserRole(userId, newRole);
    showNotice(`Đã chuyển vai trò người dùng thành: ${newRole.toUpperCase()}`);
  };

  const handleDeleteUser = (userId: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa tài khoản "${name}"?`)) {
      deleteUser(userId);
      showNotice(`Đã xóa tài khoản "${name}" thành công.`);
    }
  };

  const handleTogglePublish = (destId: string) => {
    setDestList((prev) =>
      prev.map((d) => (d.id === destId ? { ...d, published: !d.published } : d))
    );
    showNotice('Đã cập nhật trạng thái xuất bản danh thắng.');
  };

  // Filtered users
  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Filtered subscribers
  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(subscriberSearch.toLowerCase())
  );

  // Sample live VietQR preview url for admin test (realtime reactive to amountMode & testAmount)
  const sampleMemo = (bankSettings.memoPrefix || 'VU-TOUR') + '-SAMPLE';
  const sampleVietQrUrl =
    amountMode === 'fixed' && testAmount > 0
      ? `https://img.vietqr.io/image/${bankSettings.bankId}-${bankSettings.accountNo}-compact2.png?amount=${testAmount}&addInfo=${encodeURIComponent(
          sampleMemo
        )}&accountName=${encodeURIComponent(bankSettings.accountName)}`
      : `https://img.vietqr.io/image/${bankSettings.bankId}-${bankSettings.accountNo}-compact2.png?addInfo=${encodeURIComponent(
          sampleMemo
        )}&accountName=${encodeURIComponent(bankSettings.accountName)}`;

  return (
    <AuthGuard allowedRoles={['admin']}>
      <div className="min-h-screen bg-[#FAFAF9] text-[#121212] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Admin Header */}
          <div className="bg-gradient-to-r from-[#0F382C] via-[#0B2A21] to-[#04140F] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#D4AF37]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  Trung Tâm Quản Trị Hệ Thống (Master Admin)
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
                  Bảng Điều Khiển Quản Trị
                </h1>
                <p className="text-white/70 text-sm font-light max-w-2xl">
                  Quản lý tài khoản quản trị & bảo mật (RBAC), cấu hình thanh toán chuyển khoản VietQR, và theo dõi danh bạ khách hàng toàn hệ thống.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/10"
                >
                  Hồ Sơ Admin
                </Link>
                <Link
                  href="/"
                  className="px-4 py-2.5 rounded-full bg-[#D4AF37] hover:brightness-110 text-[#0F382C] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Xem Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-white">
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/60">Tài Khoản Hệ Thống</span>
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="text-2xl font-serif font-bold text-white">
                  {allUsers.length}
                </span>
                <span className="text-[11px] text-emerald-400 block mt-1">
                  {allUsers.filter((u) => u.role === 'admin').length} Quản trị viên • {allUsers.filter((u) => u.role === 'member').length} Thành viên
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/60">Cổng Thanh Toán VietQR</span>
                  <QrCode className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="text-2xl font-serif font-bold text-[#D4AF37]">
                  {bankSettings.bankId}
                </span>
                <span className="text-[11px] text-white/50 block mt-1">STK: {bankSettings.accountNo}</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/60">Email Bản Tin Di Sản</span>
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="text-2xl font-serif font-bold text-white">
                  {subscribers.length}
                </span>
                <span className="text-[11px] text-emerald-400 block mt-1">Gửi thư chào mừng 100%</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/60">Danh Thắng Quản Lý</span>
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="text-2xl font-serif font-bold text-white">
                  {destList.length}
                </span>
                <span className="text-[11px] text-[#D4AF37] block mt-1">100% Ảnh thực tế chuẩn</span>
              </div>
            </div>
          </div>

          {/* Floating Action Notice Toast */}
          {notification && (
            <div className="p-4 rounded-2xl bg-[#0F382C] text-white text-xs font-semibold flex items-center justify-between shadow-2xl border border-[#D4AF37]/50 animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>{notification}</span>
              </div>
              <button onClick={() => setNotification(null)} className="text-white/60 hover:text-white">✕</button>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-3 border-b border-black/10 pb-4">
            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'bg-white hover:bg-black/5 text-black/70 border border-black/5'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Quản Lý Tài Khoản & Bảo Mật</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">
                {allUsers.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('vietqr')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'vietqr'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'bg-white hover:bg-black/5 text-black/70 border border-black/5'
              }`}
            >
              <QrCode className="w-4 h-4 text-[#D4AF37]" />
              <span>Cấu Hình Thanh Toán VietQR</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('destinations')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'destinations'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'bg-white hover:bg-black/5 text-black/70 border border-black/5'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Quản Lý Danh Thắng & Bài Viết</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">
                {destList.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('subscribers')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'subscribers'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'bg-white hover:bg-black/5 text-black/70 border border-black/5'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Danh Sách Email Bản Tin</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">
                {subscribers.length}
              </span>
            </button>
          </div>

          {/* TAB 1: USER & RBAC MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#0F382C] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                    Quản Lý Tài Khoản Quản Trị & Thành Viên
                  </h2>
                  <p className="text-xs text-black/60 mt-0.5">
                    Xem mật khẩu thử nghiệm, đặt lại mật khẩu cho từng tài khoản và cấp quyền quản trị mới trực tiếp.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Tìm theo tên hoặc email..."
                      className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAFAF9] border border-black/10 rounded-xl focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 rounded-xl bg-[#0F382C] hover:bg-[#0B2A21] text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4 text-[#D4AF37]" />
                    <span>Tạo Tài Khoản Mới</span>
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto rounded-2xl border border-black/10">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAF9] text-black/60 uppercase tracking-wider font-semibold border-b border-black/10">
                      <th className="py-3 px-4">Người Dùng</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Vai Trò (Role)</th>
                      <th className="py-3 px-4">Mật Khẩu (Bảo Mật)</th>
                      <th className="py-3 px-4">Ngày Tham Gia</th>
                      <th className="py-3 px-4 text-right">Thao Tác Bảo Mật</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {filteredUsers.map((u) => {
                      const isRevealed = !!revealedPasswords[u.id];
                      const currentPassword = u.password || (u.role === 'admin' ? 'Admin@2026' : 'Member@2026');

                      return (
                        <tr key={u.id} className="hover:bg-black/[0.02] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={u.avatar}
                                alt={u.name}
                                className="w-8 h-8 rounded-full object-cover ring-1 ring-black/10"
                              />
                              <div>
                                <span className="font-semibold text-black block">{u.name}</span>
                                <span className="text-[10px] text-black/40 font-mono">{u.id}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-black/70 font-mono text-[11px]">
                            {u.email}
                          </td>

                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                u.role === 'admin'
                                  ? 'bg-[#0F382C] text-[#D4AF37] border border-[#D4AF37]/30'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}
                            >
                              {u.role === 'admin' ? (
                                <>
                                  <ShieldCheck className="w-3 h-3" />
                                  Admin
                                </>
                              ) : (
                                <>
                                  <Users className="w-3 h-3" />
                                  Member
                                </>
                              )}
                            </span>
                          </td>

                          {/* Password Column with Eye Icon & Copy */}
                          <td className="py-3 px-4">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAFAF9] border border-black/10">
                              <span className="font-mono text-xs text-black/80 font-medium">
                                {isRevealed ? currentPassword : '••••••••'}
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleRevealPassword(u.id)}
                                className="p-1 text-black/50 hover:text-black transition-colors"
                                title={isRevealed ? 'Ẩn mật khẩu' : 'Xem mật khẩu'}
                              >
                                {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleCopyPassword(currentPassword)}
                                className="p-1 text-black/50 hover:text-[#0F382C] transition-colors"
                                title="Sao chép mật khẩu"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-black/60">
                            {u.joinDate}
                          </td>

                          <td className="py-3 px-4 text-right space-x-1.5">
                            {/* Reset Password Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setResetModalUser(u);
                                setNewPasswordInput('');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-[11px] font-semibold text-amber-900 border border-amber-200 transition-all cursor-pointer inline-flex items-center gap-1"
                              title="Đặt lại mật khẩu cho tài khoản này"
                            >
                              <KeyRound className="w-3 h-3" />
                              <span>Đặt lại MK</span>
                            </button>

                            {/* Toggle Role Button */}
                            <button
                              type="button"
                              onClick={() => handleToggleRole(u.id, u.role)}
                              className="px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black/10 text-[11px] font-semibold text-black/80 transition-all cursor-pointer"
                              title="Chuyển quyền Admin / Member"
                            >
                              Đổi thành {u.role === 'admin' ? 'Member' : 'Admin'}
                            </button>
                            
                            {/* Delete User */}
                            {u.id !== user?.id && (
                              <button
                                type="button"
                                onClick={() => handleDeleteUser(u.id, u.name)}
                                className="p-1 rounded-lg hover:bg-red-50 text-red-500 transition-all cursor-pointer"
                                title="Xóa tài khoản này"
                              >
                                <Trash2 className="w-4 h-4 inline" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: VIETQR PAYMENT CONFIGURATION */}
          {activeTab === 'vietqr' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#0F382C] flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#D4AF37]" />
                    Cấu Hình Thanh Toán Chuyển Khoản VietQR (NAPAS 24/7)
                  </h2>
                  <p className="text-xs text-black/60 mt-0.5">
                    Tùy biến tài khoản ngân hàng thụ hưởng, cú pháp nội dung chuyển khoản và kiểm tra hiển thị mã QR trực tiếp.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Cổng VietQR Hoạt Động 24/7</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Form Side */}
                <form onSubmit={handleSaveBankSettings} className="lg:col-span-7 space-y-5">
                  
                  {/* Mode & Flexible Amount Input Section */}
                  <div className="bg-[#FAFAF9] p-4 sm:p-5 rounded-2xl border border-black/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#0F382C] flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                        <span>Hình Thức & Số Tiền Thanh Toán VietQR</span>
                      </label>
                      <span className="text-[10px] text-black/40 font-mono">Real-time Sync</span>
                    </div>

                    {/* Radio/Toggle Option for Amount Mode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAmountMode('fixed')}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          amountMode === 'fixed'
                            ? 'bg-[#0F382C] text-white border-[#0F382C] shadow-md ring-1 ring-[#D4AF37]/50'
                            : 'bg-white text-black/70 border-black/10 hover:border-black/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">Số Tiền Cố Định Theo Tour</span>
                          <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                            amountMode === 'fixed' ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-black/30'
                          }`}>
                            {amountMode === 'fixed' && <span className="w-1.5 h-1.5 rounded-full bg-[#0F382C]" />}
                          </span>
                        </div>
                        <p className={`text-[11px] leading-tight ${amountMode === 'fixed' ? 'text-white/80' : 'text-black/50'}`}>
                          Mã QR chứa sẵn số tiền chính xác, khách quét là thanh toán ngay.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAmountMode('flexible')}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          amountMode === 'flexible'
                            ? 'bg-[#0F382C] text-white border-[#0F382C] shadow-md ring-1 ring-[#D4AF37]/50'
                            : 'bg-white text-black/70 border-black/10 hover:border-black/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">Số Tiền Linh Hoạt (Tự Nhập)</span>
                          <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                            amountMode === 'flexible' ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-black/30'
                          }`}>
                            {amountMode === 'flexible' && <span className="w-1.5 h-1.5 rounded-full bg-[#0F382C]" />}
                          </span>
                        </div>
                        <p className={`text-[11px] leading-tight ${amountMode === 'flexible' ? 'text-white/80' : 'text-black/50'}`}>
                          Khách tự nhập số tiền tùy ý trên App Ngân Hàng khi quét mã.
                        </p>
                      </button>
                    </div>

                    {/* Input Field: SỐ TIỀN THỬ NHIỆM / MẶC ĐỊNH (VNĐ) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-black/70">
                          SỐ TIỀN THỬ NHIỆM / MẶC ĐỊNH (VNĐ) *
                        </label>
                        {amountMode === 'flexible' && (
                          <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Chế độ linh hoạt đang kích hoạt
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          value={testAmountInput}
                          onChange={(e) => handleAmountInputChange(e.target.value)}
                          placeholder="15.500.000"
                          className="w-full pl-4 pr-16 py-3 bg-white border border-black/15 rounded-xl font-mono text-base font-bold text-[#0F382C] focus:outline-none focus:border-[#0F382C] focus:ring-1 focus:ring-[#0F382C] shadow-sm transition-all"
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-[#0F382C]/10 text-[#0F382C] font-bold text-xs tracking-wider">
                          VNĐ
                        </div>
                      </div>

                      {/* Quick Presets */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-black/50 font-medium mr-1">Gợi ý nhanh:</span>
                        {[
                          { label: '500.000 đ', val: 500000 },
                          { label: '1.500.000 đ', val: 1500000 },
                          { label: '5.000.000 đ', val: 5000000 },
                          { label: '15.500.000 đ', val: 15500000 },
                          { label: '25.000.000 đ', val: 25000000 },
                          { label: '50.000.000 đ', val: 50000000 }
                        ].map((p) => (
                          <button
                            key={p.val}
                            type="button"
                            onClick={() => handleSelectPresetAmount(p.val)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer border ${
                              testAmount === p.val && amountMode === 'fixed'
                                ? 'bg-[#D4AF37] text-[#0F382C] border-[#D4AF37] shadow-sm'
                                : 'bg-white hover:bg-black/5 text-black/70 border-black/10'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-1">
                        Ngân Hàng Thụ Hưởng *
                      </label>
                      <select
                        value={bankSettings.bankId}
                        onChange={(e) => {
                          const selected = POPULAR_BANKS.find((b) => b.id === e.target.value);
                          setBankSettings((prev) => ({
                            ...prev,
                            bankId: e.target.value,
                            bankName: selected ? selected.name : prev.bankName
                          }));
                        }}
                        className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F382C]"
                      >
                        {POPULAR_BANKS.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.id} - {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-1">
                        Tên Đầy Đủ Ngân Hàng
                      </label>
                      <input
                        type="text"
                        value={bankSettings.bankName}
                        onChange={(e) => setBankSettings((prev) => ({ ...prev, bankName: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl text-xs focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-1">
                        Số Tài Khoản Ngân Hàng *
                      </label>
                      <input
                        type="text"
                        required
                        value={bankSettings.accountNo}
                        onChange={(e) => setBankSettings((prev) => ({ ...prev, accountNo: e.target.value.trim() }))}
                        placeholder="0901888999"
                        className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl font-mono text-xs font-bold text-[#0F382C] focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-1">
                        Chủ Tài Khoản (In hoa không dấu) *
                      </label>
                      <input
                        type="text"
                        required
                        value={bankSettings.accountName}
                        onChange={(e) => setBankSettings((prev) => ({ ...prev, accountName: e.target.value.toUpperCase() }))}
                        placeholder="VIETNAM UNVEILED TRAVEL CORP"
                        className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl text-xs font-bold uppercase focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-1">
                        Chi Nhánh / Hội Sở
                      </label>
                      <input
                        type="text"
                        value={bankSettings.branch}
                        onChange={(e) => setBankSettings((prev) => ({ ...prev, branch: e.target.value }))}
                        placeholder="Chi nhánh Hà Nội"
                        className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl text-xs focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-1">
                        Tiền Tố Nội Dung Chuyển Khoản
                      </label>
                      <input
                        type="text"
                        value={bankSettings.memoPrefix}
                        onChange={(e) => setBankSettings((prev) => ({ ...prev, memoPrefix: e.target.value.toUpperCase().trim() }))}
                        placeholder="VU-TOUR"
                        className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl font-mono text-xs font-bold focus:outline-none focus:border-[#0F382C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-1">
                      Hotline Hỗ Trợ Khách Hàng Chuyển Khoản
                    </label>
                    <input
                      type="text"
                      value={bankSettings.supportHotline}
                      onChange={(e) => setBankSettings((prev) => ({ ...prev, supportHotline: e.target.value }))}
                      placeholder="1900 8888 (24/7 Concierge)"
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl text-xs focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={savingBank}
                      className="px-6 py-3 rounded-xl bg-[#0F382C] hover:bg-[#0B2A21] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 text-[#D4AF37]" />
                      <span>{savingBank ? 'Đang Lưu...' : 'Lưu Cấu Hình Thanh Toán VietQR'}</span>
                    </button>
                  </div>
                </form>

                {/* Preview Side */}
                <div className="lg:col-span-5 bg-[#FAFAF9] rounded-3xl p-6 border border-black/10 text-center space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-black/10">
                    <span className="text-xs font-bold text-[#0F382C] uppercase tracking-wider flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-[#D4AF37]" />
                      Bản Xem Trước Mã VietQR
                    </span>
                    {amountMode === 'fixed' ? (
                      <span className="text-[11px] font-bold text-[#0F382C] bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full font-mono transition-all animate-fade-in">
                        Demo: {testAmount.toLocaleString('vi-VN')} VNĐ
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full transition-all animate-fade-in">
                        Demo: Linh Hoạt (Khách Tự Nhập)
                      </span>
                    )}
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-black/10 shadow-sm inline-block relative group">
                    <img
                      key={sampleVietQrUrl}
                      src={sampleVietQrUrl}
                      alt="VietQR Sample Live Preview"
                      className="w-56 h-56 object-contain mx-auto rounded-xl transition-all duration-300"
                    />
                    <div className="mt-2 text-[10px] text-black/50 font-mono">
                      {amountMode === 'fixed'
                        ? `✓ Mã NAPAS 247 • Đã gán sẵn ${testAmount.toLocaleString('vi-VN')} VNĐ`
                        : '✓ Mã NAPAS 247 • Khách tự gõ số tiền trên Mobile Banking'}
                    </div>
                  </div>

                  <div className="text-left text-xs bg-white p-4 rounded-xl border border-black/5 space-y-2">
                    <div className="flex justify-between items-center pb-1.5 border-b border-black/5">
                      <span className="text-black/50">Ngân hàng:</span>
                      <strong className="text-black/80">{bankSettings.bankName}</strong>
                    </div>
                    <div className="flex justify-between items-center pb-1.5 border-b border-black/5">
                      <span className="text-black/50">Số tài khoản:</span>
                      <strong className="font-mono text-[#0F382C] font-bold">{bankSettings.accountNo}</strong>
                    </div>
                    <div className="flex justify-between items-center pb-1.5 border-b border-black/5">
                      <span className="text-black/50">Chủ tài khoản:</span>
                      <strong className="text-black/80 uppercase font-bold">{bankSettings.accountName}</strong>
                    </div>
                    <div className="flex justify-between items-center pb-1.5 border-b border-black/5">
                      <span className="text-black/50">Số tiền QR:</span>
                      {amountMode === 'fixed' ? (
                        <strong className="font-serif font-bold text-base text-[#0F382C]">
                          {testAmount.toLocaleString('vi-VN')} VNĐ
                        </strong>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase">
                          Linh Hoạt (Khách Tự Nhập)
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-black/50">Nội dung chuyển khoản:</span>
                      <strong className="font-mono text-[#D4AF37] font-bold">{sampleMemo}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={sampleVietQrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-black/5 hover:bg-black/10 text-xs font-semibold text-black/70 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Mở Ảnh QR Gốc</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(sampleVietQrUrl);
                          showNotice('Đã sao chép đường link ảnh VietQR API!');
                        }
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#0F382C]/10 hover:bg-[#0F382C] hover:text-white text-[#0F382C] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao Chép Link QR</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-black/50 leading-relaxed">
                    Mã QR trên thay đổi thời gian thực tương ứng theo cấu hình số tiền và thông tin tài khoản bên trái.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: DESTINATIONS & ARTICLES MANAGEMENT */}
          {activeTab === 'destinations' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#0F382C]">
                    Quản Lý Danh Thắng & Bài Viết Du Lịch
                  </h2>
                  <p className="text-xs text-black/60 mt-0.5">
                    Kiểm duyệt nội dung, trạng thái hiển thị và xem trước trang bài viết chi tiết.
                  </p>
                </div>
              </div>

              {/* Destination Table */}
              <div className="overflow-x-auto rounded-2xl border border-black/10">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAF9] text-black/60 uppercase tracking-wider font-semibold border-b border-black/10">
                      <th className="py-3 px-4">Danh Thắng</th>
                      <th className="py-3 px-4">Vùng Miền</th>
                      <th className="py-3 px-4">Danh Hiệu</th>
                      <th className="py-3 px-4">Đánh Giá</th>
                      <th className="py-3 px-4">Trạng Thái</th>
                      <th className="py-3 px-4 text-right">Xem & Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {destList.map((dest) => (
                      <tr key={dest.id} className="hover:bg-black/[0.02] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={dest.coverImage}
                              alt={dest.name}
                              className="w-12 h-10 rounded-lg object-cover ring-1 ring-black/10"
                            />
                            <div>
                              <span className="font-semibold text-black block text-sm">{dest.name}</span>
                              <span className="text-[11px] text-black/50">{dest.province}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-black/5 text-black/70 font-semibold text-[10px]">
                            Miền {dest.region}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          {dest.isUnesco ? (
                            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#8F721B] text-[10px] font-bold uppercase">
                              Di sản UNESCO
                            </span>
                          ) : (
                            <span className="text-black/40 text-[11px]">Danh thắng quốc gia</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-amber-600 font-semibold">
                            <span>★ {dest.rating}</span>
                            <span className="text-black/40 font-normal">({dest.reviewsCount})</span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(dest.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase cursor-pointer transition-all ${
                              dest.published
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
                            }`}
                          >
                            {dest.published ? (
                              <>
                                <Check className="w-3 h-3" /> Đã Xuất Bản
                              </>
                            ) : (
                              <>Bản Nháp</>
                            )}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/destinations/${dest.slug}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0F382C] text-[#D4AF37] hover:brightness-110 text-xs font-semibold transition-all"
                          >
                            <span>Xem Trang</span>
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: NEWSLETTER SUBSCRIBERS */}
          {activeTab === 'subscribers' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#0F382C] flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                    Danh Sách Email Đăng Ký Bản Tin Di Sản
                  </h2>
                  <p className="text-xs text-black/60 mt-0.5">
                    Hệ thống tự động gửi email chào mừng kèm mã ưu đãi độc quyền tới từng địa chỉ khi người dùng bấm gửi ở Footer.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                    <input
                      type="text"
                      value={subscriberSearch}
                      onChange={(e) => setSubscriberSearch(e.target.value)}
                      placeholder="Tìm kiếm email..."
                      className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAFAF9] border border-black/10 rounded-xl focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={fetchSubscribers}
                    disabled={loadingSubscribers}
                    className="p-2 rounded-xl bg-black/5 hover:bg-black/10 text-black/70 transition-all cursor-pointer"
                    title="Tải lại danh sách"
                  >
                    <RefreshCw className={`w-4 h-4 ${loadingSubscribers ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {subscribersError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{subscribersError}</span>
                </div>
              )}

              {/* Subscribers Table */}
              <div className="overflow-x-auto rounded-2xl border border-black/10">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAF9] text-black/60 uppercase tracking-wider font-semibold border-b border-black/10">
                      <th className="py-3 px-4"># ID</th>
                      <th className="py-3 px-4">Địa Chỉ Email</th>
                      <th className="py-3 px-4">Thời Điểm Đăng Ký</th>
                      <th className="py-3 px-4">Email Chào Mừng (Nodemailer)</th>
                      <th className="py-3 px-4">Trạng Thái Đăng Ký</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {filteredSubscribers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-black/40 text-xs">
                          {loadingSubscribers ? 'Đang tải dữ liệu...' : 'Chưa có email nào trong danh sách.'}
                        </td>
                      </tr>
                    ) : (
                      filteredSubscribers.map((sub, idx) => (
                        <tr key={sub.id || idx} className="hover:bg-black/[0.02] transition-colors">
                          <td className="py-3 px-4 text-black/40 font-mono text-[11px]">
                            {sub.id}
                          </td>

                          <td className="py-3 px-4 font-mono font-semibold text-black/90">
                            {sub.email}
                          </td>

                          <td className="py-3 px-4 text-black/60">
                            {sub.subscribedAt}
                          </td>

                          <td className="py-3 px-4">
                            {sub.welcomeEmailSent ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Đã gửi thành công (Mã UNVEILED-VIP2026)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                                Chờ gửi lại
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0F382C]/10 text-[#0F382C] text-[10px] font-bold uppercase tracking-wider">
                              Hoạt Động
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL 1: TẠO TÀI KHOẢN ADMIN / THÀNH VIÊN MỚI */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-black/40 hover:text-black transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0F382C]/10 text-[#0F382C] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0F382C]">Tạo Tài Khoản Mới</h3>
                <p className="text-xs text-black/60">Cấp quyền Quản trị viên (Admin) hoặc Thành viên (Member)</p>
              </div>
            </div>

            {createError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{createError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-black/60 mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  placeholder="Lê Hoàng Long"
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-black/60 mb-1">
                  Địa chỉ Email *
                </label>
                <input
                  type="email"
                  required
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                  placeholder="admin.long@vietnamunveiled.com"
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-black/60 mb-1">
                    Mật khẩu khởi tạo *
                  </label>
                  <input
                    type="text"
                    required
                    value={createPassword}
                    onChange={(e) => setCreatePassword(e.target.value)}
                    placeholder="Admin@2026"
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl font-mono text-xs focus:outline-none focus:border-[#0F382C]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-black/60 mb-1">
                    Vai Trò (Phân Quyền) *
                  </label>
                  <select
                    value={createRole}
                    onChange={(e) => setCreateRole(e.target.value as UserRole)}
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F382C]"
                  >
                    <option value="admin">Quản Trị Viên (Admin)</option>
                    <option value="member">Thành Viên (Member)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-black/60 mb-1">
                  Số điện thoại liên hệ
                </label>
                <input
                  type="text"
                  value={createPhone}
                  onChange={(e) => setCreatePhone(e.target.value)}
                  placeholder="0901 888 999"
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-black/5 hover:bg-black/10 text-xs font-semibold text-black/70 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={creatingUser}
                  className="px-5 py-2.5 rounded-xl bg-[#0F382C] hover:bg-[#0B2A21] text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer disabled:opacity-50"
                >
                  {creatingUser ? 'Đang tạo...' : 'Tạo Tài Khoản Ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ĐẶT LẠI MẬT KHẨU (RESET PASSWORD) */}
      {resetModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-black/10">
            <button
              type="button"
              onClick={() => setResetModalUser(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-black/40 hover:text-black transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#0F382C]">Đặt Lại Mật Khẩu</h3>
                <p className="text-xs text-black/60">Tài khoản: <strong>{resetModalUser.name}</strong> ({resetModalUser.email})</p>
              </div>
            </div>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-black/60 mb-1">
                  Mật khẩu mới
                </label>
                <input
                  type="text"
                  required
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Nhập mật khẩu mới (VD: Vietnam@2026)"
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-black/10 rounded-xl font-mono text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNewPasswordInput('Unveiled@' + Math.floor(1000 + Math.random() * 9000))}
                  className="text-[11px] text-[#0F382C] font-semibold underline hover:text-[#D4AF37]"
                >
                  ⚡ Gợi ý mật khẩu ngẫu nhiên
                </button>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setResetModalUser(null)}
                  className="px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 text-xs font-semibold text-black/70 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F382C] hover:bg-[#0B2A21] text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Lưu Mật Khẩu Mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuthGuard>
  );
}
