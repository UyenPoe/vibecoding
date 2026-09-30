"use client";

import React, { useState, useRef, useEffect } from "react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface HeaderProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  compareList: Product[];
  onOpenCompare: () => void;
  wishlist: Product[];
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectProduct,
  compareList,
  onOpenCompare,
  wishlist,
  onOpenWishlist,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const trendingKeywords = [
    "iPhone 18 Pro Max",
    "Galaxy S24 Ultra",
    "iPhone 16 Pro Max cũ",
    "Google Pixel 9 Pro",
    "Thu cũ đổi mới trợ giá 1.5tr",
    "Điện thoại cũ Like New 99%",
  ];

  const recentSearches = [
    "iPhone 18 Pro Max 256GB",
    "Samsung S24 Ultra cũ",
    "Xiaomi 14 Ultra",
  ];

  // Filter products for quick search preview
  const searchMatches = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.code.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navCategories = [
    { id: "all", label: "Trang chủ", icon: "home" },
    { id: "iphone", label: "iPhone", icon: "phone_iphone" },
    { id: "samsung", label: "Samsung", icon: "smartphone" },
    { id: "xiaomi", label: "Xiaomi", icon: "devices" },
    { id: "google-pixel", label: "Google Pixel", icon: "android" },
    { id: "oppo", label: "OPPO", icon: "phone_android" },
    { id: "used-phone", label: "Điện thoại cũ giá tốt", icon: "verified" },
    { id: "trade-in", label: "Thu cũ đổi mới", icon: "published_with_changes" },
    { id: "installment", label: "Trả góp 0%", icon: "credit_score" },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-surface-pure/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-border-subtle">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-on-primary py-1 px-4 text-center text-[12px] font-medium flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-sm">local_fire_department</span>
        <span>
          Flash Sale Tháng Này: Thu Cũ Đổi Mới trợ giá thêm <strong>1.500.000₫</strong> • Tặng bộ sạc GaN 30W trị giá 590k
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex flex-col justify-between py-2">
        {/* Main Row */}
        <div className="flex items-center justify-between gap-4 lg:gap-6 h-14">
          {/* Logo */}
          <div
            onClick={() => onSelectCategory("all")}
            className="flex items-center gap-2 shrink-0 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-black text-xl shadow-md group-hover:bg-primary-hover transition-colors">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-primary tracking-tight leading-none">
                PhoneX
              </span>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-tight">
                Flagship Store
              </span>
            </div>
          </div>

          {/* Search Box with Live Auto-Suggest */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Tìm smartphone flagship, iPhone 18 Pro Max, Galaxy S24 Ultra, mã IMEI #USED..."
                className="w-full h-11 pl-4 pr-12 rounded-lg bg-surface-container-low text-on-surface placeholder:text-secondary text-[14px] focus:outline-none focus:ring-2 focus:ring-primary-container transition-all border border-transparent focus:bg-surface-pure"
              />
              <button
                type="button"
                className="absolute right-1.5 w-8 h-8 rounded-md bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary-hover transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">search</span>
              </button>
            </div>

            {/* Auto-suggest Dropdown Modal */}
            {isSearchFocused && (
              <div className="absolute top-12 left-0 w-full bg-surface-pure rounded-xl shadow-2xl border border-border-subtle p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchQuery.trim() ? (
                  <div>
                    <div className="text-[12px] font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Kết quả gợi ý ({searchMatches.length})</span>
                      <span className="text-[11px] text-primary">Nhấn để xem chi tiết máy</span>
                    </div>
                    {searchMatches.length > 0 ? (
                      <div className="space-y-2">
                        {searchMatches.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              onSelectProduct(product);
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors"
                          >
                            <img
                              src={product.thumbnail}
                              alt={product.name}
                              className="w-12 h-12 object-contain rounded bg-surface-pure p-1 border border-border-subtle shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-text-main text-[14px] truncate">
                                  {product.name}
                                </span>
                                <span className="text-[10px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">
                                  {product.code}
                                </span>
                              </div>
                              <div className="text-[12px] text-secondary flex items-center gap-2 mt-0.5">
                                <span className="font-bold text-primary">
                                  {formatCurrency(product.price)}
                                </span>
                                <span>•</span>
                                <span className="text-emerald-700 font-medium">
                                  {product.conditionShort}
                                </span>
                                <span>•</span>
                                <span>{product.storeLocation.district}, {product.storeLocation.province}</span>
                              </div>
                            </div>
                            <span className="material-symbols-outlined text-secondary text-sm">
                              arrow_forward
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-secondary text-[14px]">
                        <span className="material-symbols-outlined text-3xl text-secondary/50 mb-1">
                          search_off
                        </span>
                        <p>Không tìm thấy sản phẩm khớp với "{searchQuery}"</p>
                        <p className="text-[12px] text-secondary/80 mt-1">
                          Thử tìm theo từ khóa: iPhone, Samsung, Galaxy, Grade A...
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Recent Searches */}
                    <div>
                      <div className="text-[11px] font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>Lịch sử tìm kiếm</span>
                        <span className="text-[11px] text-secondary hover:text-primary cursor-pointer">
                          Xóa lịch sử
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => onSearchChange(item)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container-high text-[12px] text-on-surface transition-colors"
                          >
                            <span className="material-symbols-outlined text-xs text-secondary">
                              history
                            </span>
                            <span>{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Trending keywords */}
                    <div>
                      <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        <span>Tìm kiếm nổi bật hôm nay</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {trendingKeywords.map((kw, idx) => (
                          <div
                            key={idx}
                            onClick={() => onSearchChange(kw)}
                            className="flex items-center gap-2 p-1.5 rounded hover:bg-surface-container-low cursor-pointer text-[13px] text-on-surface"
                          >
                            <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="truncate">{kw}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons: Compare, Wishlist, Cart, VIP Member */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Compare Button */}
            <button
              type="button"
              onClick={onOpenCompare}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
              title="So sánh điện thoại"
            >
              <span className="material-symbols-outlined text-xl">compare_arrows</span>
              <span className="hidden md:inline font-semibold text-[13px]">So sánh</span>
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-sm">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
              title="Sản phẩm yêu thích"
            >
              <span className="material-symbols-outlined text-xl text-primary">favorite</span>
              <span className="hidden md:inline font-semibold text-[13px]">Yêu thích</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-xl">shopping_cart</span>
              <span className="hidden md:inline font-semibold text-[13px]">Giỏ hàng</span>
              <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-sm">
                1
              </span>
            </button>

            {/* VIP Member Pill */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-border-subtle">
              <div className="text-right">
                <div className="text-[10px] font-extrabold text-primary uppercase tracking-wider">
                  VIP Gold
                </div>
                <div className="text-[13px] font-semibold text-on-surface leading-tight">
                  Minh Quân
                </div>
              </div>
              <img
                alt="Profile Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-container/20"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XUsJG3NZgsn6G146MQGFxxTyRGMyINRRjffqlEQBdRMaoCFXprzq-AKzGGQrmol65AKjAjDhhpExEDs67eUG6VLVFPPOeSNQ-tqyU-jYEYzAIwpaazX71DvbrMC3nIG--DpjcNVhUjVuaYCMyGgzMwg65r5kmoflW1tMJoHtM2MIZcGxWao9aYSqHeqVhc-65ruZ5Aq5kd7wMVZIIuNSrNQTK1bNCyhD2DtTg8D8Hu2-nI_ewMmJOSF6s"
              />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-on-surface hover:bg-surface-container-low rounded-lg"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Categories Bar */}
        <div className="h-10 hidden lg:flex items-center justify-between border-t border-border-subtle/60 pt-1 mt-1">
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {navCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
                    isActive
                      ? "bg-primary-container text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-1 text-[12px] font-bold text-primary shrink-0 pl-2">
            <span className="material-symbols-outlined text-base">verified_user</span>
            <span>Cam kết chính hãng 100% • Bảo hành 1 Đổi 1</span>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border-subtle pt-3 pb-2 space-y-1">
            <div className="grid grid-cols-2 gap-1.5">
              {navCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-[13px] font-medium text-left flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? "bg-primary-container text-on-primary font-bold"
                      : "bg-surface-container-low text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
