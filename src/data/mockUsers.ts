import { User } from '@/types/auth';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-01',
    name: 'Hoàng Thảo My',
    email: 'admin@vietnamunveiled.com',
    password: 'Admin@2026',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    phone: '0901 888 999',
    joinDate: '15/01/2026',
    travelPreferences: {
      preferredRegion: 'Miền Trung & Miền Bắc',
      travelStyle: 'Nghỉ dưỡng 5 sao & Di sản UNESCO',
      favoriteSeason: 'Mùa thu - Mùa xuân'
    },
    savedItineraries: [
      {
        id: 'itin-01',
        title: 'Hành trình di sản 3 ngày tại Hội An',
        destinationName: 'Hội An',
        destinationSlug: 'hoi-an',
        days: 3,
        budgetTier: 'luxury',
        groupType: 'Cặp đôi',
        travelStyle: 'Văn hóa di sản',
        estimatedCost: '16.500.000 VNĐ',
        createdAt: '28/10/2026'
      },
      {
        id: 'itin-02',
        title: 'Kỳ nghỉ du thuyền vịnh Hạ Long',
        destinationName: 'Vịnh Hạ Long',
        destinationSlug: 'ha-long',
        days: 2,
        budgetTier: 'luxury',
        groupType: 'Gia đình',
        travelStyle: 'Nghỉ dưỡng thượng lưu',
        estimatedCost: '15.000.000 VNĐ',
        createdAt: '01/11/2026'
      }
    ]
  },
  {
    id: 'usr-member-01',
    name: 'Nguyễn Văn Hùng',
    email: 'member@vietnamunveiled.com',
    password: 'Member@2026',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    phone: '0912 345 678',
    joinDate: '02/03/2026',
    travelPreferences: {
      preferredRegion: 'Miền Bắc',
      travelStyle: 'Trekking & Mạo hiểm hang động',
      favoriteSeason: 'Tháng 10 - Tháng 12'
    },
    savedItineraries: [
      {
        id: 'itin-03',
        title: 'Chinh phục Đỉnh Fansipan & Săn mây Sa Pa',
        destinationName: 'Sa Pa',
        destinationSlug: 'sa-pa',
        days: 3,
        budgetTier: 'standard',
        groupType: 'Nhóm bạn thân',
        travelStyle: 'Trekking & Khám phá',
        estimatedCost: '7.500.000 VNĐ',
        createdAt: '03/11/2026'
      }
    ]
  },
  {
    id: 'usr-member-02',
    name: 'Lê Trần Mai Phương',
    email: 'maiphuong.travel@gmail.com',
    password: 'MaiPhuong@2026',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    phone: '0988 777 666',
    joinDate: '20/05/2026',
    travelPreferences: {
      preferredRegion: 'Miền Nam',
      travelStyle: 'Biển đảo nhiệt đới & Lặn san hô',
      favoriteSeason: 'Tháng 12 - Tháng 4'
    },
    savedItineraries: [
      {
        id: 'itin-04',
        title: 'Nghỉ dưỡng biển Bãi Khem Phú Quốc',
        destinationName: 'Phú Quốc',
        destinationSlug: 'phu-quoc',
        days: 4,
        budgetTier: 'luxury',
        groupType: 'Cặp đôi',
        travelStyle: 'Nghỉ dưỡng biển',
        estimatedCost: '26.000.000 VNĐ',
        createdAt: '05/11/2026'
      }
    ]
  }
];
