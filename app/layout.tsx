import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-serif-sc',
})

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 这里的 metadata 已经配置好了图标
export const metadata: Metadata = {
  title: "每日禅语",
  description: "每日一句禅语，静心养性",
  icons: {
    icon: "/icon.png",         // 浏览器标签图标
    apple: "/icon.png",        // iOS 桌面图标
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "每日禅语",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning={true}>
      <head>
        {/* 引入你原本需要的外部资源 */}
        <script src="https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSerifSC.variable} ${pacifico.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}