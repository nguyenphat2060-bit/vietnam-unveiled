'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, SavedItinerary } from '@/types/auth';
import { INITIAL_USERS } from '@/data/mockUsers';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isMember: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  quickLogin: (role: 'admin' | 'member') => void;
  logout: () => void;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  saveItinerary: (itinerary: Omit<SavedItinerary, 'id' | 'createdAt'>) => boolean;
  deleteItinerary: (itineraryId: string) => void;
  updateProfile: (data: Partial<User>) => void;
  allUsers: User[];
  updateUserRole: (userId: string, newRole: UserRole) => void;
  deleteUser: (userId: string) => void;
  createUser: (userData: { name: string; email: string; password?: string; role?: UserRole; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (userId: string, newPassword: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const COOKIE_PREFIX = 'vu_auth_';

function setAuthCookies(user: User | null) {
  if (typeof document === 'undefined') return;
  if (user) {
    document.cookie = `${COOKIE_PREFIX}role=${user.role}; path=/; max-age=604800; SameSite=Lax`;
    document.cookie = `${COOKIE_PREFIX}email=${encodeURIComponent(user.email)}; path=/; max-age=604800; SameSite=Lax`;
  } else {
    document.cookie = `${COOKIE_PREFIX}role=guest; path=/; max-age=0; SameSite=Lax`;
    document.cookie = `${COOKIE_PREFIX}email=; path=/; max-age=0; SameSite=Lax`;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('vu_all_users');
      if (stored) {
        try {
          const parsed: User[] = JSON.parse(stored);
          return parsed.map((u) => ({
            ...u,
            password: u.password || (u.role === 'admin' ? 'Admin@2026' : 'Member@2026')
          }));
        } catch (e) { /* ignore */ }
      }
    }
    return INITIAL_USERS;
  });

  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('vu_current_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setAuthCookies(parsed);
      } catch (e) {
        localStorage.removeItem('vu_current_user');
        setAuthCookies(null);
      }
    }
  }, []);

  const saveUsersToStorage = (users: User[]) => {
    setAllUsers(users);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vu_all_users', JSON.stringify(users));
    }
  };

  const login = async (email: string): Promise<{ success: boolean; error?: string }> => {
    const found = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, error: 'Email hoặc mật khẩu không chính xác.' };
    }
    setUser(found);
    localStorage.setItem('vu_current_user', JSON.stringify(found));
    setAuthCookies(found);
    return { success: true };
  };

  const quickLogin = (targetRole: 'admin' | 'member') => {
    const targetUser = allUsers.find((u) => u.role === targetRole) || INITIAL_USERS.find((u) => u.role === targetRole);
    if (targetUser) {
      setUser(targetUser);
      localStorage.setItem('vu_current_user', JSON.stringify(targetUser));
      setAuthCookies(targetUser);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vu_current_user');
      setAuthCookies(null);
    }
  };

  const register = async (name: string, email: string): Promise<{ success: boolean; error?: string }> => {
    const existing = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'Email này đã được đăng ký tài khoản.' };
    }
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'member',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0F382C&textColor=FFF1B0`,
      joinDate: new Date().toLocaleDateString('vi-VN'),
      savedItineraries: []
    };

    const updated = [newUser, ...allUsers];
    saveUsersToStorage(updated);
    setUser(newUser);
    localStorage.setItem('vu_current_user', JSON.stringify(newUser));
    setAuthCookies(newUser);
    return { success: true };
  };

  const saveItinerary = (itineraryData: Omit<SavedItinerary, 'id' | 'createdAt'>): boolean => {
    if (!user) return false;
    const newItinerary: SavedItinerary = {
      ...itineraryData,
      id: `itin-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    const updatedUser = {
      ...user,
      savedItineraries: [newItinerary, ...user.savedItineraries]
    };

    setUser(updatedUser);
    localStorage.setItem('vu_current_user', JSON.stringify(updatedUser));
    setAuthCookies(updatedUser);

    const updatedList = allUsers.map((u) => (u.id === user.id ? updatedUser : u));
    saveUsersToStorage(updatedList);
    return true;
  };

  const deleteItinerary = (itineraryId: string) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      savedItineraries: user.savedItineraries.filter((it) => it.id !== itineraryId)
    };
    setUser(updatedUser);
    localStorage.setItem('vu_current_user', JSON.stringify(updatedUser));
    setAuthCookies(updatedUser);

    const updatedList = allUsers.map((u) => (u.id === user.id ? updatedUser : u));
    saveUsersToStorage(updatedList);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('vu_current_user', JSON.stringify(updatedUser));
    setAuthCookies(updatedUser);

    const updatedList = allUsers.map((u) => (u.id === user.id ? updatedUser : u));
    saveUsersToStorage(updatedList);
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    const updatedList = allUsers.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
    saveUsersToStorage(updatedList);
    if (user && user.id === userId) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem('vu_current_user', JSON.stringify(updatedUser));
      setAuthCookies(updatedUser);
    }
  };

  const deleteUser = (userId: string) => {
    const updatedList = allUsers.filter((u) => u.id !== userId);
    saveUsersToStorage(updatedList);
    if (user && user.id === userId) {
      logout();
    }
  };

  const createUser = async (userData: {
    name: string;
    email: string;
    password?: string;
    role?: UserRole;
    phone?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const existing = allUsers.find((u) => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      return { success: false, error: 'Email này đã tồn tại trên hệ thống.' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      password: userData.password || (userData.role === 'admin' ? 'Admin@2026' : 'Member@2026'),
      role: userData.role || 'admin',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name)}&backgroundColor=0F382C&textColor=FFF1B0`,
      phone: userData.phone || '0901 888 999',
      joinDate: new Date().toLocaleDateString('vi-VN'),
      savedItineraries: []
    };

    const updated = [newUser, ...allUsers];
    saveUsersToStorage(updated);
    return { success: true };
  };

  const resetPassword = (userId: string, newPassword: string) => {
    const updatedList = allUsers.map((u) => (u.id === userId ? { ...u, password: newPassword } : u));
    saveUsersToStorage(updatedList);
    if (user && user.id === userId) {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('vu_current_user', JSON.stringify(updatedUser));
    }
  };

  const role: UserRole = user ? user.role : 'guest';
  const isAuthenticated = !!user;
  const isAdmin = role === 'admin';
  const isMember = role === 'member' || role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isAdmin,
        isMember,
        login,
        quickLogin,
        logout,
        register,
        saveItinerary,
        deleteItinerary,
        updateProfile,
        allUsers,
        updateUserRole,
        deleteUser,
        createUser,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
