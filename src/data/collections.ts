export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  destinationCount: number;
  highlightTags: string[];
  featuredDestinations: string[]; // slugs
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'di-san-van-hoa',
    slug: 'di-san-van-hoa',
    title: 'Di Sản Văn Hóa Ngàn Năm',
    subtitle: 'Nét Trầm Mặc Cổ Kính & Dấu Ấn Lịch Sử Hoàng Triều',
    description: 'Ngược dòng thời gian qua những thương cảng cổ kính rực rỡ đèn lồng, kinh thành Huế vàng son và quần thể di sản kép Tràng An mang đậm bản sắc văn hóa ngàn năm của dân tộc Việt.',
    coverImage: 'https://images.unsplash.com/photo-1714073619248-b52d0b51ac89?auto=format&fit=crop&w=1200&q=80',
    destinationCount: 8,
    highlightTags: ['Di sản UNESCO', 'Kiến trúc cổ', 'Làng nghề truyền thống'],
    featuredDestinations: ['hoi-an', 'ninh-binh']
  },
  {
    id: 'bien-dao-nhiet-doi',
    slug: 'bien-dao-nhiet-doi',
    title: 'Biển Đảo & Vịnh Ngọc Nhiệt Đới',
    subtitle: 'Làn Nước Xanh Pha Lê & Hoàng Hôn Dát Vàng Bờ Biển',
    description: 'Thả mình theo những con sóng ngọc bích của vịnh biển đẹp nhất thế giới, bãi cát trắng mịn màng như kem tại đảo ngọc Phú Quốc và những vịnh đảo nguyên sơ chưa từng vướng bụi trần.',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    destinationCount: 12,
    highlightTags: ['Resort 5 Sao', 'Du thuyền riêng', 'Lặn ngắm san hô'],
    featuredDestinations: ['ha-long', 'phu-quoc']
  },
  {
    id: 'hanh-trinh-am-thuc',
    slug: 'hanh-trinh-am-thuc',
    title: 'Hành Trình Ẩm Thực Bản Địa',
    subtitle: 'Bản Hòa Âm Của Ngũ Vị Hương & Tinh Hoa Đường Phố',
    description: 'Từ bát phở gánh Hà Nội ngạt ngào mùi hồi quế, tô cao lầu giếng cổ Hội An đến sự trù phú ngọt lành của hải sản đảo ngọc - một hành trình đánh thức trọn vẹn mọi giác quan người sành ăn.',
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    destinationCount: 15,
    highlightTags: ['Michelin Selected', 'Street Food Tour', 'Gia vị truyền thống'],
    featuredDestinations: ['hoi-an', 'ha-long']
  },
  {
    id: 'trekking-kham-pha',
    slug: 'trekking-kham-pha',
    title: 'Trekking & Thám Hiểm Hùng Vĩ',
    subtitle: 'Chinh Phục Đỉnh Cao & Lạc Vào Lòng Trái Đất',
    description: 'Thử thách giới hạn bản thân giữa mê cung thạch nhũ kỳ ảo của hang Sơn Đoòng, rảo bước trên ruộng bậc thang Sa Pa bồng bềnh mây núi hay băng qua những đèo dốc hiểm trở miền biên viễn.',
    coverImage: 'https://images.unsplash.com/photo-1638793774283-8a7b52165430?auto=format&fit=crop&w=1200&q=80',
    destinationCount: 6,
    highlightTags: ['Kỳ quan thế giới', 'Vườn quốc gia', 'Săn mây Fansipan'],
    featuredDestinations: ['son-doong', 'sa-pa']
  }
];
