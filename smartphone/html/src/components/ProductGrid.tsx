"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  compareList: Product[];
  onToggleCompare: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onResetFilter: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  compareList,
  onToggleCompare,
  wishlist,
  onToggleWishlist,
  onResetFilter,
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "dense">("grid");

  if (products.length === 0) {
    return (
      <div className="w-full bg-surface-pure rounded-2xl border border-border-subtle p-12 text-center my-6 space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-surface-container-low text-secondary flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-3xl">inventory_2</span>
        </div>
        <h3 className="text-xl font-bold text-text-main">
          Không tìm thấy điện thoại phù hợp
        </h3>
        <p className="text-secondary text-[14px] max-w-md mx-auto">
          Hãy thử điều chỉnh lại bộ lọc giá, dung lượng, thương hiệu hoặc tìm kiếm bằng từ khóa chung hơn.
        </p>
        <button
          onClick={onResetFilter}
          className="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-[14px] shadow-md hover:bg-primary-hover transition-colors"
        >
          Xóa tất cả bộ lọc
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Grid Toolbar */}
      <div className="flex items-center justify-between px-1">
        <div className="text-[13px] text-secondary">
          Hiển thị <strong className="text-text-main font-bold">{products.length}</strong> sản phẩm sẵn sàng giao dịch
        </div>

        <div className="hidden sm:flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-border-subtle">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-surface-pure text-primary shadow-sm"
                : "text-secondary hover:text-on-surface"
            }`}
            title="Lưới 4 cột tiêu chuẩn"
          >
            <span className="material-symbols-outlined text-lg">grid_view</span>
          </button>
          <button
            onClick={() => setViewMode("dense")}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === "dense"
                ? "bg-surface-pure text-primary shadow-sm"
                : "text-secondary hover:text-on-surface"
            }`}
            title="Lưới dày đặc"
          >
            <span className="material-symbols-outlined text-lg">view_module</span>
          </button>
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div
        className={`grid gap-4 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        }`}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
            isCompare={compareList.some((p) => p.id === product.id)}
            onToggleCompare={onToggleCompare}
            isWishlist={wishlist.some((p) => p.id === product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </div>
  );
};
