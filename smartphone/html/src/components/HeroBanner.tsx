"use client";

import React, { useState } from "react";

interface HeroBannerProps {
  onSelectBrand: (brand: string) => void;
  selectedBrand: string;
  onSelectCondition: (condition: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectBrand,
  selectedBrand,
  onSelectCondition,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      badge: "ĐỘC BẢN DUY NHẤT • LIKE NEW 99%",
      title: "iPhone 18 Pro Max Titan Sa Mạc",
      highlight: "Grade A 99% • Pin 98% Zin Apple",
      price: "28.490.000₫",
      oldPrice: "33.490.000₫",
      tag: "Tiết kiệm 5.000.000₫",
      desc: "Mỗi máy cũ tại PhoneX được định danh duy nhất bằng 1 số IMEI & Serial, chụp ảnh thật 6 góc độ và kiểm định 45 bước chuyên sâu.",
      ctaText: "Xem Máy Độc Bản",
      ctaAction: () => onSelectBrand("Apple"),
      bgGradient: "from-neutral-900 via-neutral-800 to-zinc-900",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAkbjljTwob0RNu9bztrkbjwaNrp7Ut1nJbkUMTdLz2T20K1-9mUppdQr2n7bip_wEkWDrQEGokz28Qsln-OsNWUWimLxmwG1MKCNc8SMUolTdJ-zzBt6WoeeDc5gqfsEuyqXg8wpoO9_2ZOpMbMnZbDg3ttvIsH-2ZYL_C4y6QRe4vPddIOaVjXdLaUpdfpleHDFz1WCHNeBv8ASzrQ79BXf0Exa4FBd2pzyqA4dDXrdbhzBDB-n70",
    },
    {
      badge: "TRỢ GIÁ THU CŨ ĐỔI MỚI 2026",
      title: "Thu Cũ Đổi Mới — Trợ Giá Đến 1.500.000₫",
      highlight: "Định giá online 60s • Bù tiền trả góp 0%",
      price: "Trợ giá +1.500.000₫",
      oldPrice: "",
      tag: "Thu mua mọi tình trạng",
      desc: "Lên đời flagship dễ dàng không cần bù tiền mặt ngay. Hỗ trợ tất cả dòng máy cũ với quy trình kiểm định minh bạch tại chỗ.",
      ctaText: "Khám Phá Chương Trình",
      ctaAction: () => onSelectCondition("Cũ 99%"),
      bgGradient: "from-red-950 via-neutral-900 to-red-900",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
    },
  ];

  const brands = [
    { name: "Tất cả", key: "all", count: "128+ máy", icon: "devices" },
    { name: "Apple", key: "Apple", count: "45 máy", icon: "phone_iphone" },
    { name: "Samsung", key: "Samsung", count: "38 máy", icon: "smartphone" },
    { name: "Xiaomi", key: "Xiaomi", count: "24 máy", icon: "phonelink_ring" },
    { name: "Google Pixel", key: "Google Pixel", count: "16 máy", icon: "android" },
    { name: "OPPO", key: "OPPO", count: "12 máy", icon: "phone_android" },
  ];

  return (
    <div className="w-full bg-surface">
      {/* Main Hero Slider */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 pt-4 pb-2">
        <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-zinc-900 text-white min-h-[380px] lg:min-h-[420px] flex items-center">
          {/* Slide Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e60012_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-primary-fixed border border-primary-container/30 text-[11px] font-extrabold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                <span>{slides[activeSlide].badge}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                {slides[activeSlide].title}
              </h1>

              <div className="text-primary-fixed-dim text-[15px] font-semibold">
                {slides[activeSlide].highlight}
              </div>

              <p className="text-neutral-300 text-[14px] leading-relaxed max-w-xl">
                {slides[activeSlide].desc}
              </p>

              {/* Price Row */}
              <div className="flex flex-wrap items-baseline gap-3 pt-2">
                <span className="text-3xl lg:text-4xl font-black text-primary-container">
                  {slides[activeSlide].price}
                </span>
                {slides[activeSlide].oldPrice && (
                  <span className="text-neutral-400 line-through text-base">
                    {slides[activeSlide].oldPrice}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary text-[11px] font-bold">
                  {slides[activeSlide].tag}
                </span>
              </div>

              {/* Action CTA */}
              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  onClick={slides[activeSlide].ctaAction}
                  className="px-6 py-3 rounded-xl bg-primary-container hover:bg-primary-hover text-on-primary font-bold text-[14px] shadow-lg transition-all flex items-center gap-2 active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">search</span>
                  <span>{slides[activeSlide].ctaText}</span>
                </button>
                <button
                  onClick={() => onSelectCondition("Cũ 99%")}
                  className="px-5 py-3 rounded-xl bg-surface-pure/10 hover:bg-surface-pure/20 text-white font-semibold text-[14px] border border-white/20 transition-colors backdrop-blur-sm"
                >
                  Xem Bảng Giá Máy Cũ 99%
                </button>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 p-4 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-2xl">
                <img
                  src={slides[activeSlide].image}
                  alt={slides[activeSlide].title}
                  className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md rounded-lg p-2 text-center text-[11px] text-neutral-200 border border-white/10">
                  Ảnh chụp thực tế tại Showroom 58 Thái Hà
                </div>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === idx ? "w-8 bg-primary-container" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Brand Badges Strip */}
        <div className="mt-4 pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-extrabold text-secondary uppercase tracking-wider">
              Khám Phá Theo Thương Hiệu
            </span>
            <span className="text-[12px] text-primary font-semibold hover:underline cursor-pointer">
              Xem tất cả 8 thương hiệu →
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {brands.map((b) => {
              const isSelected =
                (b.key === "all" && selectedBrand === "") || selectedBrand === b.key;
              return (
                <button
                  key={b.key}
                  onClick={() => onSelectBrand(b.key === "all" ? "" : b.key)}
                  className={`p-3 rounded-xl flex items-center gap-3 transition-all text-left border ${
                    isSelected
                      ? "bg-surface-pure border-primary-container shadow-md ring-2 ring-primary-container/20"
                      : "bg-surface-pure border-border-subtle hover:border-primary-container/40 hover:bg-surface-container-low"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-primary-container text-on-primary"
                        : "bg-surface-container-low text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{b.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[14px] text-text-main truncate">
                      {b.name}
                    </div>
                    <div className="text-[11px] text-secondary">{b.count}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust Badges 4 Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-3 border-t border-border-subtle/80">
          <div className="flex items-center gap-3 bg-surface-pure p-3 rounded-xl border border-border-subtle shadow-2xl/5">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">token</span>
            </div>
            <div>
              <div className="font-bold text-[13px] text-text-main">Độc Bản 1 Máy 1 Serial</div>
              <div className="text-[11px] text-secondary">Ảnh thật 6 góc độ từng chiếc</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-surface-pure p-3 rounded-xl border border-border-subtle shadow-2xl/5">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">fact_check</span>
            </div>
            <div>
              <div className="font-bold text-[13px] text-text-main">Kiểm Định 45 Bước</div>
              <div className="text-[11px] text-secondary">Chuyên viên Apple Certified</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-surface-pure p-3 rounded-xl border border-border-subtle shadow-2xl/5">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">shield</span>
            </div>
            <div>
              <div className="font-bold text-[13px] text-text-main">Bảo Hành 12T 1 Đổi 1</div>
              <div className="text-[11px] text-secondary">Bảo hành cả Nguồn & Màn hình</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-surface-pure p-3 rounded-xl border border-border-subtle shadow-2xl/5">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">sync_alt</span>
            </div>
            <div>
              <div className="font-bold text-[13px] text-text-main">Thu Cũ Trợ Giá 1.5Tr</div>
              <div className="text-[11px] text-secondary">Định giá online trong 60 giây</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
