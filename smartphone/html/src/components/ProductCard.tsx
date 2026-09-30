"use client";

import React from "react";
import { Product } from "@/types";
import { formatCurrency, calculateDiscountPercent } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isCompare: boolean;
  onToggleCompare: (product: Product) => void;
  isWishlist: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isCompare,
  onToggleCompare,
  isWishlist,
  onToggleWishlist,
}) => {
  const discountPercent = calculateDiscountPercent(product.price, product.originalPrice);

  return (
    <div className="bg-surface-pure rounded-2xl border border-border-subtle p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative">
      {/* Top Badges & Actions */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          {/* Unique & Condition Badges */}
          <div className="flex flex-col gap-1">
            {product.isUnique ? (
              <span className="bg-primary-container/10 text-primary font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                <span>{product.code}</span>
              </span>
            ) : (
              <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">inventory_2</span>
                <span>MỚI 100% NGUYÊN SEAL</span>
              </span>
            )}
            <span className="bg-surface-container-low text-text-main font-semibold text-[11px] px-2 py-0.5 rounded">
              {product.condition}
            </span>
          </div>

          {/* Quick Actions: Wishlist & Compare */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(product);
              }}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                isCompare
                  ? "bg-primary-container text-on-primary"
                  : "bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container-high"
              }`}
              title={isCompare ? "Đã thêm vào so sánh" : "Thêm vào so sánh"}
            >
              <span className="material-symbols-outlined text-sm">compare_arrows</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product);
              }}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                isWishlist
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-low text-secondary hover:text-primary hover:bg-surface-container-high"
              }`}
              title={isWishlist ? "Đã lưu vào yêu thích" : "Lưu vào yêu thích"}
            >
              <span
                className={`material-symbols-outlined text-sm ${
                  isWishlist ? "font-fill" : ""
                }`}
              >
                favorite
              </span>
            </button>
          </div>
        </div>

        {/* Thumbnail Image Arena */}
        <div
          onClick={() => onSelect(product)}
          className="w-full aspect-[4/3] bg-surface-container-low rounded-xl overflow-hidden p-3 flex items-center justify-center relative cursor-pointer group-hover:bg-surface-container transition-colors"
        >
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount Pill Overlay */}
          {discountPercent > 0 && (
            <span className="absolute bottom-2 left-2 bg-primary-container text-on-primary font-bold text-[11px] px-2 py-0.5 rounded-full shadow-sm">
              -{discountPercent}%
            </span>
          )}

          {/* Inspection Score Pill */}
          {product.conditionScore && (
            <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md text-white font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] text-amber-400">
                fact_check
              </span>
              <span>{product.conditionScore}đ</span>
            </span>
          )}
        </div>

        {/* Product Title & Model */}
        <div className="mt-3 cursor-pointer" onClick={() => onSelect(product)}>
          <h3 className="font-bold text-[15px] text-text-main line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Spec Badges Row */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] font-semibold bg-surface-container-low text-secondary px-2 py-0.5 rounded">
              {product.storage}
            </span>
            <span className="text-[11px] font-semibold bg-surface-container-low text-secondary px-2 py-0.5 rounded">
              RAM {product.ram}
            </span>
            {product.batteryHealth && (
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[12px]">battery_charging_full</span>
                Pin {product.batteryHealth}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Price & CTA Section */}
      <div className="mt-3 pt-3 border-t border-border-subtle/80 space-y-2">
        {/* Pricing */}
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-primary-container">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[12px] text-secondary line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Installment Badge */}
          <div className="text-[11px] text-secondary flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-primary text-[14px]">
              credit_card
            </span>
            <span>Trả góp 0% chỉ từ</span>
            <strong className="text-text-main font-semibold">
              {formatCurrency(product.installmentMonthly)}/th
            </strong>
          </div>
        </div>

        {/* Location Availability */}
        <div className="flex items-center gap-1 text-[11px] text-secondary bg-surface-container-low p-1.5 rounded-lg">
          <span className="material-symbols-outlined text-primary text-[14px] shrink-0">
            location_on
          </span>
          <span className="truncate">
            {product.storeLocation.status === "Còn hàng" ? (
              <span className="text-emerald-700 font-semibold">
                Sẵn hàng tại {product.storeLocation.district} ({product.storeLocation.province})
              </span>
            ) : (
              <span className="text-amber-700 font-medium">
                {product.storeLocation.status} tại {product.storeLocation.district}
              </span>
            )}
          </span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="w-full py-2.5 rounded-xl bg-surface-container-low hover:bg-primary-container hover:text-on-primary text-text-main font-bold text-[13px] transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
        >
          <span className="material-symbols-outlined text-base">visibility</span>
          <span>Xem chi tiết & Thẩm định</span>
        </button>
      </div>
    </div>
  );
};
