"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductFilter } from "@/components/ProductFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CompareDrawer } from "@/components/CompareDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { Footer } from "@/components/Footer";
import { PRODUCTS_DATA } from "@/data/products";
import { Product, FilterState } from "@/types";

export default function Home() {
  // Category state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Search and Filter state
  const [filter, setFilter] = useState<FilterState>({
    brand: "",
    priceRange: "",
    condition: "",
    storage: "",
    ram: "",
    features: [],
    province: "",
    inStockOnly: false,
    searchQuery: "",
    sortBy: "popular",
  });

  // Active PDP Modal product
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Compare state
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Synchronize category selection with filters
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === "all") {
      setFilter((prev) => ({ ...prev, brand: "", condition: "" }));
    } else if (catId === "iphone") {
      setFilter((prev) => ({ ...prev, brand: "Apple" }));
    } else if (catId === "samsung") {
      setFilter((prev) => ({ ...prev, brand: "Samsung" }));
    } else if (catId === "xiaomi") {
      setFilter((prev) => ({ ...prev, brand: "Xiaomi" }));
    } else if (catId === "google-pixel") {
      setFilter((prev) => ({ ...prev, brand: "Google Pixel" }));
    } else if (catId === "oppo") {
      setFilter((prev) => ({ ...prev, brand: "OPPO" }));
    } else if (catId === "used-phone") {
      setFilter((prev) => ({ ...prev, condition: "Cũ 99%", brand: "" }));
    } else if (catId === "trade-in") {
      // Auto open flagship trade in or filter used
      setFilter((prev) => ({ ...prev, condition: "Cũ 99%" }));
      showToast("Chương trình Thu Cũ Đổi Mới: Trợ giá thêm 1.500.000₫ cho tất cả máy cũ!");
    } else if (catId === "installment") {
      showToast("Tất cả sản phẩm PhoneX đều hỗ trợ trả góp 0% duyệt CCCD trong 5 phút.");
    }
  };

  // Toggle Compare Item
  const handleToggleCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      setCompareList((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Đã xóa ${product.name} khỏi danh sách so sánh`);
    } else {
      if (compareList.length >= 3) {
        showToast("Bạn chỉ có thể so sánh tối đa 3 điện thoại cùng lúc!");
        setIsCompareOpen(true);
        return;
      }
      setCompareList((prev) => [...prev, product]);
      showToast(`Đã thêm ${product.name} vào so sánh`);
    }
  };

  // Toggle Wishlist Item
  const handleToggleWishlist = (product: Product) => {
    if (wishlist.some((p) => p.id === product.id)) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Đã bỏ lưu ${product.name}`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Đã lưu ${product.name} vào danh sách yêu thích ❤️`);
    }
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // Brand filter
      if (filter.brand && product.brand !== filter.brand) {
        return false;
      }

      // Condition filter
      if (filter.condition && !product.condition.includes(filter.condition)) {
        return false;
      }

      // Storage filter
      if (filter.storage && product.storage !== filter.storage) {
        return false;
      }

      // RAM filter
      if (filter.ram && product.ram !== filter.ram) {
        return false;
      }

      // Province filter
      if (
        filter.province &&
        product.storeLocation.province !== filter.province &&
        !product.allStores.some((s) => s.province === filter.province && s.stockCount > 0)
      ) {
        return false;
      }

      // In-stock only
      if (filter.inStockOnly && product.storeLocation.status !== "Còn hàng") {
        return false;
      }

      // Features filter
      if (
        filter.features.length > 0 &&
        !filter.features.every((f) => product.specs.features.includes(f))
      ) {
        return false;
      }

      // Price Range filter
      if (filter.priceRange) {
        if (filter.priceRange === "under-15" && product.price >= 15000000) return false;
        if (
          filter.priceRange === "15-20" &&
          (product.price < 15000000 || product.price > 20000000)
        )
          return false;
        if (
          filter.priceRange === "20-25" &&
          (product.price < 20000000 || product.price > 25000000)
        )
          return false;
        if (
          filter.priceRange === "25-30" &&
          (product.price < 25000000 || product.price > 30000000)
        )
          return false;
        if (filter.priceRange === "above-30" && product.price <= 30000000) return false;
      }

      // Search Query
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCode = product.code.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchImei = product.imei.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchBrand && !matchImei) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === "price-asc") return a.price - b.price;
      if (filter.sortBy === "price-desc") return b.price - a.price;
      if (filter.sortBy === "discount") {
        const discA = (a.originalPrice - a.price) / a.originalPrice;
        const discB = (b.originalPrice - b.price) / b.originalPrice;
        return discB - discA;
      }
      if (filter.sortBy === "rating") return b.rating - a.rating;
      return 0; // Default popular
    });
  }, [filter]);

  // Handle URL hash or direct selection for Flow 01 testing
  useEffect(() => {
    // Optionally open the flagship model on mount if requested or by default for visual demo
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 text-[13px] font-semibold animate-in slide-in-from-top-3 fade-in duration-200">
          <span className="material-symbols-outlined text-primary text-base">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        products={PRODUCTS_DATA}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={filter.searchQuery}
        onSearchChange={(query) => setFilter((prev) => ({ ...prev, searchQuery: query }))}
        onSelectProduct={(p) => setActiveProduct(p)}
        compareList={compareList}
        onOpenCompare={() => setIsCompareOpen(true)}
        wishlist={wishlist}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Content Arena */}
      <main className="flex-1">
        {/* Hero Banner & Brand Discovery (Step 1 in Flow 01) */}
        <HeroBanner
          selectedBrand={filter.brand}
          onSelectBrand={(brand) => setFilter((prev) => ({ ...prev, brand }))}
          onSelectCondition={(condition) => setFilter((prev) => ({ ...prev, condition }))}
        />

        <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-6">
          {/* Multi-Criteria Filter (Step 2 in Flow 01) */}
          <ProductFilter
            filter={filter}
            onFilterChange={(newFilter) => setFilter(newFilter)}
            totalProducts={filteredProducts.length}
          />

          {/* Product Grid & Cards (Step 3 in Flow 01) */}
          <ProductGrid
            products={filteredProducts}
            onSelectProduct={(product) => setActiveProduct(product)}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onResetFilter={() =>
              setFilter({
                brand: "",
                priceRange: "",
                condition: "",
                storage: "",
                ram: "",
                features: [],
                province: "",
                inStockOnly: false,
                searchQuery: "",
                sortBy: "popular",
              })
            }
          />
        </div>
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Interactive PDP Modal (Step 4, 5, 6 in Flow 01) */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />

      {/* Compare Side-by-Side Drawer */}
      <CompareDrawer
        compareList={compareList}
        onRemove={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
        onClear={() => setCompareList([])}
        onSelectProduct={(p) => setActiveProduct(p)}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        wishlist={wishlist}
        onRemove={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onClear={() => setWishlist([])}
        onSelectProduct={(p) => setActiveProduct(p)}
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </div>
  );
}
