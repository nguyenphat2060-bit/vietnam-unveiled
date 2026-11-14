import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Vietnam Unveiled | Cổng Thông Tin Du Lịch & Khám Phá Việt Nam Thượng Lưu",
  description: "Trải nghiệm vẻ đẹp bất tận của Việt Nam - Từ kỳ quan Hạ Long, phố cổ Hội An đến những thung lũng Sa Pa huyền ảo và hang động Sơn Đoòng kỳ vĩ.",
  keywords: ["du lịch việt nam", "vietnam travel", "hội an", "hạ long", "phú quốc", "sa pa", "vietnam luxury tour", "lên lịch trình du lịch"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#121212] selection:bg-[#D4AF37]/30 selection:text-[#0F382C]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
