import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhoneX — Hệ Thống Bán Lẻ Smartphone Flagship & Điện Thoại Cũ Độc Bản",
  description:
    "Khám phá và tìm kiếm điện thoại chính hãng, iPhone 18 Pro Max, Galaxy S24 Ultra và điện thoại cũ Grade A 99% kiểm định 45 bước độc bản duy nhất 1 máy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-sans text-on-surface antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
