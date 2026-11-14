export interface Destination {
  id: string;
  slug: string;
  name: string;
  title: string;
  vietnameseTitle: string;
  region: 'Bắc' | 'Trung' | 'Nam';
  province: string;
  tagline: string;
  description: string;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  gallery: {
    url: string;
    caption: string;
  }[];
  coordinates: [number, number]; // [lat, lng]
  category: 'heritage' | 'beach' | 'culinary' | 'adventure';
  categoryLabel: string;
  isFeatured?: boolean;
  isUnesco?: boolean;
  essentialInfo: {
    bestSeason: string;
    weather: {
      temp: string;
      condition: string;
      humidity: string;
      rainfall: string;
    };
    recommendedDuration: string;
    avgBudget: string;
    idealFor: string[];
    airportNearest: string;
  };
  itinerary: {
    day: number;
    title: string;
    theme: string;
    periods: {
      period: 'Sáng' | 'Trưa' | 'Chiều' | 'Tối';
      time: string;
      title: string;
      description: string;
      location: string;
      tip?: string;
    }[];
  }[];
  culinaryGuide: {
    name: string;
    description: string;
    price: string;
    mustTryPlace: string;
    image: string;
    tags: string[];
  }[];
  culturalEtiquette: {
    title: string;
    detail: string;
    type: 'do' | 'dont';
  }[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'hoi-an',
    slug: 'hoi-an',
    name: 'Hội An',
    title: 'Hội An - Bản Hòa Ca Ánh Sáng & Hoài Niệm',
    vietnameseTitle: 'Phố Cổ Hội An',
    region: 'Trung',
    province: 'Quảng Nam',
    tagline: 'Nơi thời gian ngưng đọng trên từng mái ngói rêu phong và đèn lồng lung linh',
    description: 'Hội An từng là thương cảng quốc tế sầm uất bậc nhất Đông Nam Á từ thế kỷ 16 đến 19. Ngày nay, nơi đây lưu giữ gần như nguyên vẹn quần thể kiến trúc cổ kính với hơn 1.000 di tích nhà cổ, hội quán, chùa miếu và nhịp sống thanh bình bên dòng sông Hoài thơ mộng.',
    rating: 4.95,
    reviewsCount: 3840,
    coverImage: 'https://images.unsplash.com/photo-1714073619248-b52d0b51ac89?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1714073619248-b52d0b51ac89?auto=format&fit=crop&w=1200&q=80',
        caption: 'Phố cổ Hội An đặc trưng với tường vàng hoài niệm và đèn lồng lụa treo cao'
      },
      {
        url: 'https://images.unsplash.com/photo-1755709986407-f72e45084ff2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Phố đèn lồng lung linh huyền ảo rực sáng trong đêm phố cổ'
      },
      {
        url: 'https://images.unsplash.com/photo-1722706202511-8743d7b34794?auto=format&fit=crop&w=1200&q=80',
        caption: 'Những mái ngói âm dương rêu phong cổ kính và dãy nhà vàng truyền thống'
      },
      {
        url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
        caption: 'Góc ngõ nhỏ yên bình với tường vàng và giàn hoa giấy rực rỡ'
      },
      {
        url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
        caption: 'Thuyền hoa đăng thả đèn lung linh trên dòng sông Hoài thơ mộng'
      },
      {
        url: 'https://images.unsplash.com/photo-1790955385043-bd5608e23b56?auto=format&fit=crop&w=1200&q=80',
        caption: 'Ban công gỗ cổ kính điểm xuyết sắc hoa và lồng đèn Hội An'
      }
    ],
    coordinates: [15.8801, 108.3380],
    category: 'heritage',
    categoryLabel: 'Di sản Văn hóa',
    isFeatured: true,
    isUnesco: true,
    essentialInfo: {
      bestSeason: 'Tháng 2 - Tháng 7',
      weather: {
        temp: '26°C - 31°C',
        condition: 'Nắng ấm trong trẻo',
        humidity: '72%',
        rainfall: 'Thấp (Mùa khô)'
      },
      recommendedDuration: '3 Ngày 2 Đêm',
      avgBudget: '2.200.000đ - 4.800.000đ / ngày',
      idealFor: ['Cặp đôi', 'Yêu nhiếp ảnh', 'Thưởng thức ẩm thực', 'Văn hóa cổ truyền'],
      airportNearest: 'Sân bay Quốc tế Đà Nẵng (DAD, cách 30km)'
    },
    itinerary: [
      {
        day: 1,
        title: 'Chạm Vào Di Sản Cổ Kính',
        theme: 'Khám phá kiến trúc thương cảng và dạ tiệc đèn lồng sông Hoài',
        periods: [
          {
            period: 'Sáng',
            time: '07:30 - 11:30',
            title: 'Dạo bước phố cổ sớm & Ghé thăm Chùa Cầu',
            description: 'Thức dậy cùng không khí trong lành trước khi phố đông đúc. Thưởng thức cà phê sữa đá ven sông, tham quan Nhà cổ Tấn Ký, Hội quán Phúc Kiến và Chùa Cầu biểu tượng.',
            location: 'Đường Trần Phú & Nguyễn Thị Minh Khai',
            tip: 'Mua vé trọn gói 120.000đ tại quầy du lịch để được vào thăm 5 điểm di tích tùy chọn.'
          },
          {
            period: 'Trưa',
            time: '12:00 - 14:00',
            title: 'Thưởng thức Cơm gà Bà Buội & Trà thảo mộc Mót',
            description: 'Thưởng thức đĩa cơm gà xé vàng ươm trứ danh, hạt cơm dẻo nấu từ nước luộc gà béo ngậy. Tráng miệng với ly trà thảo mộc Nước Mót cánh sen thơm mát.',
            location: '22 Phan Chu Trinh & 150 Trần Phú'
          },
          {
            period: 'Chiều',
            time: '15:00 - 17:30',
            title: 'Đạp xe len lỏi qua Cánh đồng lúa Cẩm Châu đến Làng gốm',
            description: 'Trải nghiệm nhịp sống ngoại ô thanh bình, thử tài chuốt gốm tại làng gốm Thanh Hà có tuổi đời hơn 500 năm.',
            location: 'Làng gốm Thanh Hà'
          },
          {
            period: 'Tối',
            time: '18:30 - 21:30',
            title: 'Du thuyền thả hoa đăng & Thưởng thức Cao Lầu',
            description: 'Bước lên chiếc thuyền gỗ mộc mạc trôi theo dòng sông Hoài, thả chiếc đèn hoa đăng cầu an lành. Ăn tối với món Cao Lầu truyền thống bên ban công gỗ.',
            location: 'Bến Bạch Đằng & Sông Hoài'
          }
        ]
      },
      {
        day: 2,
        title: 'Thiên Nhiên & Làng Nghề Trù Phú',
        theme: 'Chèo thuyền thúng rừng dừa và hoàng hôn biển An Bàng',
        periods: [
          {
            period: 'Sáng',
            time: '08:00 - 11:30',
            title: 'Chèo thuyền thúng khám phá Rừng dừa Bảy Mẫu',
            description: 'Len lỏi giữa mê cung dừa nước xanh biếc, xem các nghệ nhân địa phương biểu diễn múa thúng xoay tròn độc nhất vô nhị.',
            location: 'Xã Cẩm Thanh'
          },
          {
            period: 'Trưa',
            time: '12:00 - 14:30',
            title: 'Hải sản tươi sống bên bờ biển An Bàng',
            description: 'Nghỉ trưa tại các nhà hàng beachfront ven biển An Bàng - một trong những bãi biển đẹp nhất châu Á.',
            location: 'Bãi biển An Bàng'
          },
          {
            period: 'Chiều',
            time: '15:30 - 18:00',
            title: 'Workshop làm lồng đèn Hội An thủ công',
            description: 'Tự tay chọn khung tre, vuốt vải lụa Hà Đông và trang trí chiếc đèn lồng mang dấu ấn cá nhân làm kỷ niệm.',
            location: 'Xưởng thủ công mỹ nghệ đường Nguyễn Thái Học'
          },
          {
            period: 'Tối',
            time: '19:30 - 21:30',
            title: 'Thưởng thức show diễn thực cảnh "Ký Ức Hội An"',
            description: 'Show diễn thực cảnh ngoài trời quy mô 500 diễn viên tái hiện sinh động 400 năm lịch sử Hội An trên sân khấu nổi.',
            location: 'Công viên Ấn tượng Hội An'
          }
        ]
      },
      {
        day: 3,
        title: 'Nông Nghiệp Hữu Cơ & Thư Giãn',
        theme: 'Làng rau Trà Quế & Chuyến dạo chơi cà phê cổ',
        periods: [
          {
            period: 'Sáng',
            time: '08:00 - 11:00',
            title: 'Làm nông dân tại Làng rau Trà Quế',
            description: 'Tham gia tưới nước đôi, xới đất và thưởng thức món tôm hữu đặc sản làng rau, ngâm chân thảo dược thư giãn.',
            location: 'Làng rau Trà Quế'
          },
          {
            period: 'Trưa',
            time: '11:30 - 13:30',
            title: 'Bánh mì Madam Khánh - The Banh Mi Queen',
            description: 'Cắn ngập ổ bánh mì giòn rụm với pa-tê thủ công thơm nức, thịt xá xíu đậm đà và đồ chua thanh mát.',
            location: '115 Trần Cao Vân'
          },
          {
            period: 'Chiều',
            time: '14:00 - 16:30',
            title: 'Cà phê tầng thượng Faifo & Mua quà lưu niệm lụa tơ tằm',
            description: 'Ngắm toàn cảnh mái ngói âm dương rêu phong từ sân thượng Faifo Coffee trước khi tạm biệt phố cổ.',
            location: '130 Trần Phú'
          }
        ]
      }
    ],
    culinaryGuide: [
      {
        name: 'Cao Lầu Hội An',
        description: 'Món mì sợi đục dai giòn đặc trưng chỉ nấu bằng nước giếng Bá Lễ nghìn năm, ăn kèm thịt xá xíu, tóp mỡ chiên giòn và rau thơm Trà Quế.',
        price: '35.000đ - 55.000đ / tô',
        mustTryPlace: 'Cao Lầu Thanh (26 Thái Phiên) hoặc Quán Không Gian Xanh',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        tags: ['Đặc sản độc quyền', 'Mì sợi truyền thống', 'Vị đậm đà']
      },
      {
        name: 'Cơm Gà Xé Hội An',
        description: 'Hạt cơm nấu với nước luộc gà ngả màu vàng óng ả, phủ đầy thịt gà ta xé bóp hành tây rau răm và nước mắm ớt gừng cay nồng.',
        price: '45.000đ - 70.000đ / đĩa',
        mustTryPlace: 'Cơm gà Bà Buội (22 Phan Chu Trinh) hoặc Cơm gà Nga',
        image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80',
        tags: ['Gà ta thả vườn', 'Cơm vàng dẻo thơm', 'Món chính']
      },
      {
        name: 'Bánh Mì Phượng & Madam Khánh',
        description: 'Được cố đầu bếp huyền thoại Anthony Bourdain ca ngợi là "bản giao hưởng bên trong ổ bánh mì" với pa-tê béo ngậy và sốt bí truyền.',
        price: '25.000đ - 40.000đ / ổ',
        mustTryPlace: 'Madam Khánh (115 Trần Cao Vân) & Bánh Mì Phượng (2B Phan Chu Trinh)',
        image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
        tags: ['Đường phố nổi tiếng', 'Vang danh thế giới', 'Ăn sáng / Ăn xế']
      },
      {
        name: 'Nước Mót Thảo Mộc Cánh Sen',
        description: 'Thức uống thanh tao từ trà thảo mộc, quế hồi, gừng, sả và chanh, được điểm xuyết một cánh sen hồng tươi tắn.',
        price: '15.000đ / ly',
        mustTryPlace: 'Mót Hội An (150 Trần Phú)',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
        tags: ['Thảo mộc thanh mát', 'Check-in nổi bật', 'Giải nhiệt']
      }
    ],
    culturalEtiquette: [
      {
        title: 'Trang phục lịch sự khi vào đình, chùa, nhà cổ',
        detail: 'Hội An có rất nhiều không gian thờ tự tâm linh. Du khách nên mặc áo có tay, quần hoặc váy dài qua gối khi tham quan di tích.',
        type: 'do'
      },
      {
        title: 'Giữ âm lượng vừa phải trong ngõ nhỏ và nhà cổ',
        detail: 'Nhiều ngôi nhà cổ vẫn là nơi sinh sống của các thế hệ gia đình người dân địa phương. Hãy tôn trọng sự yên tĩnh và xin phép trước khi chụp ảnh chân dung.',
        type: 'do'
      },
      {
        title: 'Không chạm vào đồ cổ trưng bày trong bảo tàng & nhà cổ',
        detail: 'Các hiện vật bằng gỗ mun, gốm sứ và hoành phi câu đối có niên đại hàng trăm năm rất dễ bị tổn hại bởi mồ hôi tay.',
        type: 'dont'
      },
      {
        title: 'Không đi xe máy trong phố cổ vào khung giờ đi bộ',
        detail: 'Phố cổ áp dụng phố đi bộ từ 09:00 - 11:00 và 15:00 - 21:30 hàng ngày để giữ gìn không gian an toàn cho du khách.',
        type: 'dont'
      }
    ]
  },
  {
    id: 'ha-long',
    slug: 'ha-long',
    name: 'Vịnh Hạ Long',
    title: 'Vịnh Hạ Long - Kỳ Quan Thạch Nhũ Giữa Biển Ngọc',
    vietnameseTitle: 'Vịnh Hạ Long & Bái Tử Long',
    region: 'Bắc',
    province: 'Quảng Ninh',
    tagline: 'Gần 2.000 hòn đảo đá vôi kỳ vĩ vươn lên giữa làn nước xanh màu ngọc bích',
    description: 'Hai lần được UNESCO vinh danh là Di sản Thiên nhiên Thế giới, Vịnh Hạ Long là một trong những cảnh quan karst biển ngoạn mục nhất hành tinh. Những khối đá vôi hình thành qua 500 triệu năm, hệ thống hang động thạch nhũ huyền bí và du thuyền sang trọng tạo nên chuyến phiêu lưu đẳng cấp.',
    rating: 4.92,
    reviewsCount: 5210,
    coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hàng ngàn hòn đảo đá vôi soi bóng trên làn nước xanh ngọc biếc'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Du thuyền gỗ sang trọng đưa du khách bồng bềnh giữa vịnh'
      },
      {
        url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
        caption: 'Chèo thuyền kayak len lỏi qua các hang luồn kỳ bí'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hang Sửng Sốt với vòm thạch nhũ lung linh tráng lệ'
      },
      {
        url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
        caption: 'Ngắm bình minh đỏ ửng trên boong sundeck lộng gió'
      }
    ],
    coordinates: [20.9101, 107.1839],
    category: 'heritage',
    categoryLabel: 'Kỳ Quan Thiên Nhiên',
    isFeatured: true,
    isUnesco: true,
    essentialInfo: {
      bestSeason: 'Tháng 10 - Tháng 4',
      weather: {
        temp: '19°C - 25°C',
        condition: 'Mát mẻ, trời quang đãng',
        humidity: '68%',
        rainfall: 'Rất ít'
      },
      recommendedDuration: '2 Ngày 1 Đêm (Trên Du Thuyền)',
      avgBudget: '3.500.000đ - 7.500.000đ / ngày',
      idealFor: ['Du thuyền cao cấp', 'Kỳ quan thế giới', 'Chèo kayak biển', 'Nghỉ dưỡng thượng lưu'],
      airportNearest: 'Sân bay Quốc tế Vân Đồn (VDO, 50km) / Cát Bi (HPH, 45km)'
    },
    itinerary: [
      {
        day: 1,
        title: 'Hành Trình Rẽ Sóng Vịnh Ngọc',
        theme: 'Check-in du thuyền 5 sao, khám phá Hang Sửng Sốt & Chèo Kayak',
        periods: [
          {
            period: 'Sáng',
            time: '08:30 - 11:30',
            title: 'Khởi hành từ Hà Nội qua cao tốc đến Cảng Quốc tế Tuần Châu',
            description: 'Di chuyển êm ái bằng xe limousine sang trọng qua vùng đồng bằng sông Hồng xanh ngát để đến nhà chờ du thuyền.',
            location: 'Cảng Tuần Châu'
          },
          {
            period: 'Trưa',
            time: '12:15 - 14:00',
            title: 'Welcome Drink & Buffet Hải Sản trên Du Thuyền',
            description: 'Nhận phòng ban công hướng biển riêng tư. Thưởng thức bữa trưa hải sản tươi sống trong khi du thuyền bắt đầu lướt êm qua Hòn Đỉnh Hương và Hòn Trống Mái.',
            location: 'Trên Vịnh Hạ Long'
          },
          {
            period: 'Chiều',
            time: '14:30 - 17:00',
            title: 'Thám hiểm Hang Sửng Sốt & Chèo Kayak Hang Luồn',
            description: 'Đi bộ qua các vòm hang kỳ vĩ với vô vàn măng đá lấp lánh như cung điện dưới lòng biển. Sau đó tự tay chèo thuyền kayak khám phá hồ nước phẳng lặng.',
            location: 'Đảo Bồ Hòn'
          },
          {
            period: 'Tối',
            time: '18:00 - 21:30',
            title: 'Sunset Party, Lớp học cuốn chả giò & Câu mực đêm',
            description: 'Nhâm nhi ly cocktail ngắm mặt trời lặn dát vàng mặt biển. Thưởng thức bữa tối fine-dining và thử tài câu mực đêm trên boong tàu cùng thủy thủ đoàn.',
            location: 'Khu vực ngủ đêm Vịnh'
          }
        ]
      },
      {
        day: 2,
        title: 'Bình Minh Trên Đảo Ti Tốp',
        theme: 'Tập Thái Cực Quyền đón sớm mai & Tắm biển Ti Tốp',
        periods: [
          {
            period: 'Sáng',
            time: '06:15 - 08:30',
            title: 'Tập Tai Chi trên Sundeck & Leo đỉnh đảo Ti Tốp',
            description: 'Hít căng lồng ngực bầu không khí trong lành với bài tập Thái Cực Quyền nhẹ nhàng. Thuyền nan đưa sang đảo Ti Tốp để leo hơn 400 bậc đá ngắm toàn cảnh 360 độ vịnh.',
            location: 'Đảo Ti Tốp'
          },
          {
            period: 'Trưa',
            time: '09:30 - 11:30',
            title: 'Brunch thảnh thơi trên đường về bến cảng',
            description: 'Thưởng thức bữa trưa nhẹ kiểu Âu - Á trong khi du thuyền từ từ quay về bến. Check-out và xe đưa về Hà Nội hoặc tiếp tục khám phá vịnh Bái Tử Long.',
            location: 'Cảng Tuần Châu'
          }
        ]
      }
    ],
    culinaryGuide: [
      {
        name: 'Chả Mực Giã Tay Hạ Long',
        description: 'Mực mai tươi rói đánh bắt trong vịnh được giã bằng cối đá thủ công cho sợi mực giòn sừn sựt, chiên vàng ươm ăn kèm xôi trắng nóng hổi hoặc bánh cuốn.',
        price: '380.000đ - 450.000đ / kg',
        mustTryPlace: 'Chả mực Thoan (Chợ Hạ Long 1) hoặc Chả mực Quang Phong',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        tags: ['Đặc sản kỷ lục', 'Giã tay thủ công', 'Món quà biếu']
      },
      {
        name: 'Bún Bề Bề (Tôm Tít) Chua Cay',
        description: 'Nước dùng ninh từ tôm, cua biển và xương ngọt đậm đà, bên trên xếp đầy những con bề bề bóc nõn béo ngậy, tôm nõn và rau cần tây thơm nức.',
        price: '40.000đ - 65.000đ / bát',
        mustTryPlace: 'Quán Bún bề bề Bãi Cháy hoặc Huy Chiên (Khu cột 5)',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        tags: ['Hải sản tươi ngọt', 'Bữa sáng hoàn hảo', 'Hương vị biển']
      }
    ],
    culturalEtiquette: [
      {
        title: 'Tuyệt đối không vứt rác hoặc túi nilon xuống vịnh',
        detail: 'Hạ Long áp dụng chính sách nghiêm ngặt không sử dụng đồ nhựa dùng một lần trên các du thuyền tham quan để bảo tồn rạn san hô và sinh quyển.',
        type: 'dont'
      },
      {
        title: 'Mặc áo phao khi tham gia chèo thuyền Kayak và đò nan',
        detail: 'Quy định an toàn hàng hải bắt buộc mọi du khách phải cài áo phao đúng quy cách khi di chuyển trên mặt nước.',
        type: 'do'
      }
    ]
  },
  {
    id: 'ninh-binh',
    slug: 'ninh-binh',
    name: 'Ninh Bình',
    title: 'Ninh Bình - Vịnh Hạ Long Trên Cạn Tuyệt Sắc',
    vietnameseTitle: 'Quần Thể Danh Thắng Tràng An - Tam Cốc',
    region: 'Bắc',
    province: 'Ninh Bình',
    tagline: 'Mê cung thung lũng đá vôi, dòng sông uốn lượn và cố đô ngàn năm trầm mặc',
    description: 'Ninh Bình sở hữu Quần thể danh thắng Tràng An - Di sản kép (Văn hóa và Thiên nhiên) duy nhất tại Đông Nam Á được UNESCO công nhận. Nơi đây quyến rũ du khách bằng những chuyến thuyền nan xuyên qua hang động thạch nhũ, cánh đồng lúa chín vàng Tam Cốc và đỉnh Ngọa Long hùng vĩ nhìn từ Hang Múa.',
    rating: 4.90,
    reviewsCount: 3120,
    coverImage: 'https://images.unsplash.com/photo-1571406252288-cc9c25bb4a44?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1571406252288-cc9c25bb4a44?auto=format&fit=crop&w=1200&q=80',
        caption: 'Dòng sông Tràng An xanh biếc uốn lượn qua thung lũng đá vôi trùng điệp'
      },
      {
        url: 'https://images.unsplash.com/photo-1567528316734-7655a2357283?auto=format&fit=crop&w=1200&q=80',
        caption: 'Đỉnh Ngọa Long Hang Múa nhìn toàn cảnh thung lũng Tam Cốc mùa lúa rực rỡ'
      },
      {
        url: 'https://images.unsplash.com/photo-1560550356-3cdd74bca5e8?auto=format&fit=crop&w=1200&q=80',
        caption: 'Thủy đình cổ kính và cảnh quan sông nước huyền ảo danh thắng Tràng An'
      },
      {
        url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
        caption: 'Quần thể non nước hùng vĩ và cố đô Hoa Lư ngàn năm lịch sử'
      }
    ],
    coordinates: [20.2506, 105.9745],
    category: 'heritage',
    categoryLabel: 'Di Sản Kép UNESCO',
    isFeatured: true,
    isUnesco: true,
    essentialInfo: {
      bestSeason: 'Tháng 1 - Tháng 5 & Tháng 9 - 11',
      weather: {
        temp: '20°C - 26°C',
        condition: 'Thời tiết trong lành, mát rượi',
        humidity: '75%',
        rainfall: 'Thấp'
      },
      recommendedDuration: '2 Ngày 1 Đêm',
      avgBudget: '1.500.000đ - 3.200.000đ / ngày',
      idealFor: ['Chèo thuyền thư giãn', 'Chụp ảnh phong cảnh', 'Du lịch tâm linh', 'Đạp xe đồng quê'],
      airportNearest: 'Sân bay Quốc tế Nội Bài (HAN, cách 100km theo cao tốc)'
    },
    itinerary: [
      {
        day: 1,
        title: 'Khám Phá Di Sản Kép Tràng An',
        theme: 'Hành trình xuyên thủy động và chinh phục đỉnh Ngọa Long Hang Múa',
        periods: [
          {
            period: 'Sáng',
            time: '08:00 - 11:30',
            title: 'Đi thuyền nan ngắm Tràng An (Tuyến 3 hoặc Tuyến 2)',
            description: 'Trải nghiệm 3 giờ lướt nhẹ trên mặt nước trong vắt nhìn thấy cả rong rêu đáy sông, luồn qua hang Đột dài 1.000m và viếng thăm Đền Suối Tiên linh thiêng.',
            location: 'Khu du lịch sinh thái Tràng An'
          },
          {
            period: 'Trưa',
            time: '12:00 - 13:30',
            title: 'Thưởng thức Cơm cháy & Thịt dê núi Ninh Bình',
            description: 'Dê núi chăn thả tự nhiên trên vách đá nên thịt săn chắc, thơm ngọt, ăn cùng cơm cháy giòn rụm chấm nước sốt đậm đà.',
            location: 'Nhà hàng Thăng Long hoặc Hoàng Giang'
          },
          {
            period: 'Chiều',
            time: '15:00 - 17:30',
            title: 'Chinh phục 486 bậc đá Hang Múa ngắm hoàng hôn',
            description: 'Leo lên đỉnh núi ngắm tượng rồng đá uốn lượn và phóng tầm mắt bao trọn thung lũng Tam Cốc mùa lúa rực rỡ.',
            location: 'Hang Múa - Khê Hạ'
          }
        ]
      }
    ],
    culinaryGuide: [
      {
        name: 'Dê Núi Tái Chanh & Dê Nướng Bản Gang',
        description: 'Dê Ninh Bình nổi tiếng nhờ ăn thảo dược trên núi đá vôi, thịt ngọt mềm không có mùi hôi, bóp cùng thính gạo, chanh, gừng và chấm tương bần truyền thống.',
        price: '150.000đ - 220.000đ / đĩa',
        mustTryPlace: 'Nhà hàng Dê Chính Thư (Hoa Lư) hoặc Đức Dê',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        tags: ['Đặc sản số 1', 'Dê chăn thả tự nhiên', 'Vị thanh ngọt']
      },
      {
        name: 'Cơm Cháy Chà Bông Sốt Tim Cật',
        description: 'Cơm nếp nướng đáy nồi vàng giòn rụm, rắc ruốc thịt heo và chan nước sốt nóng hổi thơm lừng từ hành phi và gia vị quê.',
        price: '50.000đ - 100.000đ / gói',
        mustTryPlace: 'Cơm cháy Hoa Lư hoặc các cơ sở làng nghề',
        image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
        tags: ['Giòn rụm', 'Món quà cố đô', 'Ăn vặt khoái khẩu']
      }
    ],
    culturalEtiquette: [
      {
        title: 'Tặng tiền bồi dưỡng (tip) cho các cô bác chèo đò',
        detail: 'Những người lái đò Tràng An, Tam Cốc chèo bằng tay/chân liên tục suốt 2.5 - 3 tiếng. Một khoản tiền tip 50.000đ - 100.000đ là cách trân trọng công sức của họ.',
        type: 'do'
      }
    ]
  },
  {
    id: 'phu-quoc',
    slug: 'phu-quoc',
    name: 'Phú Quốc',
    title: 'Phú Quốc - Đảo Ngọc Hoàng Hôn Vịnh Thái Lan',
    vietnameseTitle: 'Đảo Ngọc Phú Quốc',
    region: 'Nam',
    province: 'Kiên Giang',
    tagline: 'Bãi cát trắng mịn như kem, biển xanh màu ngọc bích và hoàng hôn rực lửa đẹp nhất Việt Nam',
    description: 'Là hòn đảo lớn nhất Việt Nam, Phú Quốc hội tụ vẻ đẹp hoang sơ của vườn quốc gia nguyên sinh cùng hệ thống resort 5 sao quốc tế, cáp treo vượt biển dài nhất thế giới và những làng chài cổ đậm đà phong vị biển khơi.',
    rating: 4.88,
    reviewsCount: 4620,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bãi Sao với dải cát trắng mịn thoai thoải bên rặng dừa nghiêng'
      },
      {
        url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cảnh hoàng hôn tím rực rỡ buông xuống bờ biển Bãi Trường'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cáp treo Hòn Thơm bay qua những hòn đảo hoang sơ phía Nam'
      }
    ],
    coordinates: [10.2899, 103.9840],
    category: 'beach',
    categoryLabel: 'Biển Đảo Nghỉ Dưỡng',
    isFeatured: true,
    essentialInfo: {
      bestSeason: 'Tháng 11 - Tháng 4',
      weather: {
        temp: '27°C - 32°C',
        condition: 'Biển êm sóng lặng, trời trong',
        humidity: '70%',
        rainfall: 'Rất ít (Mùa khô)'
      },
      recommendedDuration: '4 Ngày 3 Đêm',
      avgBudget: '3.000.000đ - 6.500.000đ / ngày',
      idealFor: ['Nghỉ dưỡng 5 sao', 'Lặn biển san hô', 'Gia đình nghỉ dưỡng', 'Ngắm hoàng hôn'],
      airportNearest: 'Sân bay Quốc tế Phú Quốc (PQC, nằm ngay trung tâm đảo)'
    },
    itinerary: [
      {
        day: 1,
        title: 'Chạm Vào Thiên Đường Biển Ngọc',
        theme: 'Check-in resort bãi biển, tắm biển Bãi Sao & Săn hoàng hôn',
        periods: [
          {
            period: 'Sáng',
            time: '09:00 - 12:00',
            title: 'Hạ cánh sân bay Phú Quốc & Check-in Resort',
            description: 'Nhận phòng hướng biển tại resort bên bờ Bãi Trường hoặc Bãi Khem yên bình.',
            location: 'Dương Tơ / An Thới'
          },
          {
            period: 'Trưa',
            time: '12:30 - 14:30',
            title: 'Thưởng thức Gỏi cá trích & Bún quậy Kiến Xây',
            description: 'Món bún tươi làm tại chỗ với nước dùng tôm mực ngọt tự nhiên và bát nước chấm tự pha độc đáo.',
            location: 'Đường Bạch Đằng, Dương Đông'
          },
          {
            period: 'Chiều',
            time: '15:30 - 18:30',
            title: 'Thả mình trong làn nước Bãi Sao & Sunset Sanato',
            description: 'Tắm biển trên bãi cát trắng mịn như bột, sau đó thưởng thức cocktail ngắm hoàng hôn đỏ cam huyền diệu.',
            location: 'Bãi Sao & Bãi Trường'
          }
        ]
      }
    ],
    culinaryGuide: [
      {
        name: 'Bún Quậy Kiến Xây Phú Quốc',
        description: 'Sợi bún tươi ép từ bột gạo luộc ngay tại chỗ, chả cá thu và mực tươi quết nhuyễn bám quanh đáy tô, tự tay du khách quậy nước chấm chua cay.',
        price: '40.000đ - 65.000đ / tô',
        mustTryPlace: 'Bún quậy Kiến Xây (28 Bạch Đằng hoặc 222 Trần Phú)',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        tags: ['Món ăn sáng tạo', 'Hải sản tươi sống', 'Độc nhất vô nhị']
      },
      {
        name: 'Gỏi Cá Trích Rừng Sim',
        description: 'Cá trích tươi lọc phi lê mỏng tang, bóp gỏi với dừa nạo sợi, đậu phộng rang, ớt đỏ và cuốn bánh tráng rau rừng chấm nước mắm nhĩ Phú Quốc.',
        price: '120.000đ - 180.000đ / đĩa',
        mustTryPlace: 'Nhà hàng Ra Khơi (131 Đường 30 Tháng 4) hoặc Quán Việt',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        tags: ['Đặc sản số 1 Phú Quốc', 'Vị ngọt thanh biển', 'Ăn kèm rượu sim']
      }
    ],
    culturalEtiquette: [
      {
        title: 'Không giẫm đạp hoặc bẻ san hô khi lặn biển',
        detail: 'Rạn san hô quần đảo An Thới đang được bảo tồn nghiêm ngặt để phục hồi sinh thái biển.',
        type: 'dont'
      }
    ]
  },
  {
    id: 'sa-pa',
    slug: 'sa-pa',
    name: 'Sa Pa',
    title: 'Sa Pa - Thị Trấn Trong Mây & Nóc Nhà Đông Dương',
    vietnameseTitle: 'Thị Xã Sa Pa - Đỉnh Fansipan',
    region: 'Bắc',
    province: 'Lào Cai',
    tagline: 'Bồng bềnh giữa biển mây, ruộng bậc thang nghìn lớp và sắc màu thổ cẩm vùng cao',
    description: 'Nằm ở độ cao 1.600m trên dãy Hoàng Liên Sơn hùng vĩ, Sa Pa là nơi hội tụ khí hậu ôn đới mát mẻ quanh năm, những thửa ruộng bậc thang đẹp mê hồn từng lọt top kỳ quan thế giới và nền văn hóa đa dạng của đồng bào H\'Mông, Dao Đỏ, Tày, Giáy.',
    rating: 4.91,
    reviewsCount: 3950,
    coverImage: 'https://images.unsplash.com/photo-1570366583862-f91883984fde?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1570366583862-f91883984fde?auto=format&fit=crop&w=1200&q=80',
        caption: 'Thung lũng ruộng bậc thang Mường Hoa kỳ vĩ giữa núi đồi Sa Pa'
      },
      {
        url: 'https://images.unsplash.com/photo-1787367897847-830be2c1b9d1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Đỉnh Fansipan 3.143m bồng bềnh giữa biển mây dãy Hoàng Liên Sơn'
      },
      {
        url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bản làng Cát Cát và Tả Van thanh bình bên dòng suối nhỏ rì rào'
      },
      {
        url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sắc màu thổ cẩm và cuộc sống sinh hoạt mộc mạc của đồng bào vùng cao'
      }
    ],
    coordinates: [22.3364, 103.8438],
    category: 'adventure',
    categoryLabel: 'Trekking & Núi Cao',
    isFeatured: true,
    essentialInfo: {
      bestSeason: 'Tháng 9 - Tháng 11 & Tháng 3 - Tháng 5',
      weather: {
        temp: '14°C - 21°C',
        condition: 'Se se lạnh, sương mù lãng đãng',
        humidity: '82%',
        rainfall: 'Thấp'
      },
      recommendedDuration: '3 Ngày 2 Đêm',
      avgBudget: '1.800.000đ - 3.800.000đ / ngày',
      idealFor: ['Chinh phục Fansipan', 'Trekking bản làng', 'Săn mây', 'Trải nghiệm văn hóa Dao/H\'Mông'],
      airportNearest: 'Sân bay Quốc tế Nội Bài (HAN, 5 giờ đi cao tốc Hà Nội - Lào Cai)'
    },
    itinerary: [
      {
        day: 1,
        title: 'Chạm Vào Nóc Nhà Đông Dương',
        theme: 'Cáp treo Fansipan Legend & Dạo phố ngắm nhà thờ đá cổ',
        periods: [
          {
            period: 'Sáng',
            time: '08:30 - 12:00',
            title: 'Chinh phục Đỉnh Fansipan 3.143m',
            description: 'Trải nghiệm tàu hỏa leo núi Mường Hoa và tuyến cáp treo 3 dây đạt kỷ lục thế giới bay qua thung lũng mây để chạm tay vào chóp inox thiêng liêng.',
            location: 'Sun World Fansipan Legend'
          },
          {
            period: 'Trưa',
            time: '12:30 - 14:00',
            title: 'Lẩu Cá Tầm & Rau ngọn su su Sa Pa',
            description: 'Thưởng thức món lẩu cá tầm ngọt lịm với nước dùng chua cay ấm bụng trong tiết trời se lạnh vùng cao.',
            location: 'Nhà hàng Ô Quý Hồ hoặc A Phủ'
          },
          {
            period: 'Chiều',
            time: '15:00 - 17:30',
            title: 'Dạo chơi Bản Cát Cát & Check-in Nhà thờ Đá',
            description: 'Ngắm những guồng nước gỗ khổng lồ, xem dệt thổ cẩm lanh và mua những món quà bạc thủ công tinh xảo của người H\'Mông.',
            location: 'Bản Cát Cát & Trung tâm thị xã'
          }
        ]
      }
    ],
    culinaryGuide: [
      {
        name: 'Lẩu Cá Hồi & Cá Tầm Sa Pa',
        description: 'Cá hồi vân và cá tầm được nuôi trong làn nước suối lạnh tự nhiên của dãy Hoàng Liên Sơn, thịt chắc giòn, béo ngọt ăn kèm cải mèo đắng nhẹ.',
        price: '400.000đ - 650.000đ / nồi',
        mustTryPlace: 'Nhà hàng A Phủ (15 Fansipan) hoặc Hotpot Center',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        tags: ['Ấm lòng ngày lạnh', 'Nuôi tự nhiên', 'Đặc sản vùng cao']
      },
      {
        name: 'Thịt Heo Cắp Nách Nướng Mắc Khén',
        description: 'Heo đồng bào thả rông thịt thơm lừng, bì giòn sần sật, ướp cùng hạt dổi và hạt mắc khén thơm nồng của núi rừng Tây Bắc.',
        price: '180.000đ - 250.000đ / đĩa',
        mustTryPlace: 'Khu ẩm thực nướng phố Cầu Mây',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        tags: ['Gia vị Tây Bắc', 'Món nướng đêm', 'Thơm lừng']
      }
    ],
    culturalEtiquette: [
      {
        title: 'Hỏi ý kiến trước khi chụp ảnh người dân bản địa',
        detail: 'Nhiều người dân vùng cao rất thân thiện nhưng hãy xin phép nhã nhặn trước khi giơ máy ảnh chụp họ hoặc con trẻ của họ.',
        type: 'do'
      },
      {
        title: 'Không cho kẹo hoặc tiền cho trẻ em lang thang trên đường',
        detail: 'Hãy ủng hộ bằng cách mua đồ thủ công từ cha mẹ các em hoặc đóng góp cho các quỹ giáo dục địa phương để khuyến khích trẻ tới trường.',
        type: 'dont'
      }
    ]
  },
  {
    id: 'son-doong',
    slug: 'son-doong',
    name: 'Sơn Đoòng & Phong Nha',
    title: 'Sơn Đoòng - Hang Động Tự Nhiên Lớn Nhất Thế Giới',
    vietnameseTitle: 'Vườn Quốc Gia Phong Nha - Kẻ Bàng',
    region: 'Trung',
    province: 'Quảng Bình',
    tagline: 'Chuyến thám hiểm vĩ đại đưa bạn vào lòng trái đất với cánh rừng nguyên sinh và vi khí hậu riêng biệt',
    description: 'Sơn Đoòng có thể chứa vừa cả một tòa nhà chọc trời 40 tầng hoặc cả khu phố Manhattan. Nơi đây sở hữu hệ thống hố sụt khổng lồ đón ánh sáng tự nhiên, thảm thực vật nhiệt đới độc nhất vô nhị dưới lòng đất, những bức tường thạch nhũ cao gần 80m và "Bức tường Việt Nam" huyền thoại.',
    rating: 4.99,
    reviewsCount: 1450,
    coverImage: 'https://images.unsplash.com/photo-1638793774283-8a7b52165430?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1638793774283-8a7b52165430?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hố sụt số 1 Vọng Khủng Long - Ánh mặt trời rọi thẳng xuống lòng hang Sơn Đoòng khổng lồ'
      },
      {
        url: 'https://images.unsplash.com/photo-1719461208300-e9d199bc59f7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Vườn Địa Đàng - Khu rừng nguyên sinh nhiệt đới xanh tốt ẩn mình 300m dưới lòng đất'
      },
      {
        url: 'https://images.unsplash.com/photo-1554285859-6ac081ea54b9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hệ thống thạch nhũ triệu năm tráng lệ và dòng sông ngầm Vườn Quốc Gia Phong Nha - Kẻ Bàng'
      },
      {
        url: 'https://plus.unsplash.com/premium_photo-1661897264411-9d1915616451?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bãi cắm trại thám hiểm độc nhất vô nhị trên bãi cát trắng mịn trong lòng hang Động'
      }
    ],
    coordinates: [17.4890, 106.2870],
    category: 'adventure',
    categoryLabel: 'Thám Hiểm Ngoạn Mục',
    isFeatured: true,
    isUnesco: true,
    essentialInfo: {
      bestSeason: 'Tháng 1 - Tháng 8 (Đóng cửa mùa mưa lũ)',
      weather: {
        temp: '22°C - 26°C (Bên trong hang)',
        condition: 'Mát lạnh quanh năm',
        humidity: '85%',
        rainfall: 'Kiểm soát chặt chẽ'
      },
      recommendedDuration: '4 Ngày 3 Đêm (Tour Thám Hiểm)',
      avgBudget: '72.000.000đ / tour thám hiểm trọn gói',
      idealFor: ['Chuyên gia thám hiểm', 'Yêu thiên nhiên nguyên bản', 'Sức khỏe dẻo dai', 'Trải nghiệm đỉnh cao'],
      airportNearest: 'Sân bay Đồng Hới (VDH, 45km)'
    },
    itinerary: [
      {
        day: 1,
        title: 'Tiến Vào Lõi Rừng Nguyên Sinh Phong Nha',
        theme: 'Băng qua Bản Đoòng và đặt chân vào Hang Én kỳ vĩ',
        periods: [
          {
            period: 'Sáng',
            time: '08:00 - 12:30',
            title: 'Trekking qua rừng nguyên sinh & Bản làng Đoòng',
            description: 'Bắt đầu hành trình đi bộ leo dốc qua những tán cây cổ thụ, dừng chân giao lưu cùng đồng bào Bru-Vân Kiều tại Bản Đoòng hiếu khách.',
            location: 'Vườn quốc gia Phong Nha - Kẻ Bàng'
          },
          {
            period: 'Trưa',
            time: '13:00 - 14:00',
            title: 'Ăn trưa dã ngoại bên bờ suối Rào Thương',
            description: 'Thưởng thức cơm nắm muối vừng, gà đồi nướng và trái cây mát lạnh cùng đội ngũ porter bản địa.',
            location: 'Thung lũng Rào Thương'
          },
          {
            period: 'Chiều',
            time: '15:00 - 18:00',
            title: 'Cắm trại tại Hang Én - Hang động lớn thứ 3 thế giới',
            description: 'Hạ trại trên bãi cát trắng mịn bên hồ nước ngầm xanh biếc trong vòm hang khổng lồ nơi hàng triệu chú chim én trú ngụ.',
            location: 'Hang Én'
          }
        ]
      }
    ],
    culinaryGuide: [
      {
        name: 'Gà Đồi Nướng Chấm Muối Cheo',
        description: 'Gà nuôi thả trên đồi đá vôi Phong Nha thịt chắc ngọt tự nhiên, nướng than hoa vàng giòn chấm cùng muối cheo giã từ lá é, ớt xanh và muối hột thơm nức.',
        price: '250.000đ - 350.000đ / con',
        mustTryPlace: 'Quán Gà nướng East Hill hoặc Phong Nha Farmstay',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        tags: ['Gia vị độc quyền muối cheo', 'Gà nướng than', 'Đậm đà hương rừng']
      }
    ],
    culturalEtiquette: [
      {
        title: 'Tuân thủ nguyên tắc "Không lấy gì ngoài những bức ảnh, không để lại gì ngoài những dấu chân"',
        detail: 'Mọi chất thải và rác trong tour Sơn Đoòng đều được đội ngũ porter gùi ngược ra ngoài để giữ gìn nguyên vẹn hệ sinh thái mỏng manh.',
        type: 'do'
      }
    ]
  }
];

export const REGIONS = [
  { id: 'all', label: 'Tất cả Vùng miền', count: DESTINATIONS.length },
  { id: 'Bắc', label: 'Miền Bắc', count: DESTINATIONS.filter(d => d.region === 'Bắc').length },
  { id: 'Trung', label: 'Miền Trung', count: DESTINATIONS.filter(d => d.region === 'Trung').length },
  { id: 'Nam', label: 'Miền Nam', count: DESTINATIONS.filter(d => d.region === 'Nam').length },
];
