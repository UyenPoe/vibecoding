"use client";

import React, { useState } from "react";
import { FilterState } from "@/types";

interface ProductFilterProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  totalProducts: number;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filter,
  onFilterChange,
  totalProducts,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const brands = [
    { label: "Tất cả", value: "" },
    { label: "Apple", value: "Apple" },
    { label: "Samsung", value: "Samsung" },
    { label: "Xiaomi", value: "Xiaomi" },
    { label: "Google Pixel", value: "Google Pixel" },
    { label: "OPPO", value: "OPPO" },
  ];

  const priceRanges = [
    { label: "Tất cả mức giá", value: "" },
    { label: "Dưới 15 triệu", value: "under-15" },
    { label: "15 - 20 triệu", value: "15-20" },
    { label: "20 - 25 triệu", value: "20-25" },
    { label: "25 - 30 triệu", value: "25-30" },
    { label: "Trên 30 triệu", value: "above-30" },
  ];

  const conditions = [
    { label: "Tất cả tình trạng", value: "" },
    { label: "Độc Bản Cũ 99% Like New", value: "Cũ 99%" },
    { label: "Mới 100% Fullbox Nguyên Seal", value: "Mới 100%" },
    { label: "Cũ 98% Giá Tốt", value: "Cũ 98%" },
  ];

  const storages = [
    { label: "Tất cả", value: "" },
    { label: "128GB", value: "128GB" },
    { label: "256GB", value: "256GB" },
    { label: "512GB", value: "512GB" },
    { label: "1TB", value: "1TB" },
  ];

  const rams = [
    { label: "Tất cả", value: "" },
    { label: "8GB", value: "8GB" },
    { label: "12GB", value: "12GB" },
    { label: "16GB", value: "16GB" },
  ];

  const featuresList = [
    { label: "Màn hình 120Hz", value: "Màn hình 120Hz" },
    { label: "Hỗ trợ 5G", value: "Hỗ trợ 5G" },
    { label: "Sạc không dây", value: "Sạc không dây" },
    { label: "Chống nước IP68", value: "Chống nước IP68" },
    { label: "Pin > 5000mAh", value: "Pin trâu >5000mAh" },
  ];

  const provinces = [
    { label: "Toàn quốc (Tất cả)", value: "" },
    { label: "Hà Nội (58 Thái Hà, 182 Cầu Giấy...)", value: "Hà Nội" },
    { label: "TP. Hồ Chí Minh (136 Nguyễn Thái Học...)", value: "TP. Hồ Chí Minh" },
    { label: "Đà Nẵng (240 Nguyễn Văn Linh)", value: "Đà Nẵng" },
  ];

  const sortOptions = [
    { label: "Nổi bật nhất", value: "popular" },
    { label: "Giá: Thấp đến Cao", value: "price-asc" },
    { label: "Giá: Cao đến Thấp", value: "price-desc" },
    { label: "Giảm giá nhiều nhất", value: "discount" },
    { label: "Đánh giá cao nhất", value: "rating" },
  ];

  const handleFeatureToggle = (featureVal: string) => {
    const nextFeatures = filter.features.includes(featureVal)
      ? filter.features.filter((f) => f !== featureVal)
      : [...filter.features, featureVal];
    onFilterChange({ ...filter, features: nextFeatures });
  };

  const handleResetFilters = () => {
    onFilterChange({
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
  };

  // Count active filters
  const activeFilterCount =
    (filter.brand ? 1 : 0) +
    (filter.priceRange ? 1 : 0) +
    (filter.condition ? 1 : 0) +
    (filter.storage ? 1 : 0) +
    (filter.ram ? 1 : 0) +
    filter.features.length +
    (filter.province ? 1 : 0) +
    (filter.inStockOnly ? 1 : 0);

  return (
    <div className="w-full bg-surface-pure rounded-2xl p-4 lg:p-6 shadow-sm border border-border-subtle my-4">
      {/* Header of Filter Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-fixed text-primary flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-xl">tune</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-[17px] text-text-main">Bộ Lọc Đa Tiêu Chí</h2>
              {activeFilterCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary text-[11px] font-bold">
                  {activeFilterCount} bộ lọc đang chọn
                </span>
              )}
            </div>
            <p className="text-[12px] text-secondary">
              Tìm thấy <strong className="text-primary font-bold">{totalProducts}</strong> điện thoại phù hợp
            </p>
          </div>
        </div>

        {/* Sort and Collapse controls */}
        <div className="flex items-center gap-3">
          {activeFilterCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-[12px] text-primary hover:text-primary-hover font-semibold flex items-center gap-1 transition-colors px-2 py-1 rounded bg-primary/5"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              <span>Xóa tất cả</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-secondary font-medium hidden sm:inline">
              Sắp xếp theo:
            </span>
            <select
              value={filter.sortBy}
              onChange={(e) =>
                onFilterChange({ ...filter, sortBy: e.target.value as FilterState["sortBy"] })
              }
              className="h-9 px-3 bg-surface-container-low rounded-lg text-[13px] font-semibold text-on-surface border border-border-subtle focus:border-primary-container focus:outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface text-sm transition-colors"
            title={isExpanded ? "Thu gọn bộ lọc" : "Mở rộng bộ lọc"}
          >
            <span className="material-symbols-outlined">
              {isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
          </button>
        </div>
      </div>

      {/* Filter Body */}
      {isExpanded && (
        <div className="pt-4 space-y-4">
          {/* Row 1: Brand & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand Pills */}
            <div>
              <label className="block text-[12px] font-bold text-secondary uppercase tracking-wider mb-2">
                Hãng sản xuất
              </label>
              <div className="flex flex-wrap gap-1.5">
                {brands.map((b) => {
                  const isSelected = filter.brand === b.value;
                  return (
                    <button
                      key={b.value}
                      onClick={() => onFilterChange({ ...filter, brand: b.value })}
                      className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
                        isSelected
                          ? "bg-primary-container text-on-primary shadow-sm"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Condition Pills */}
            <div>
              <label className="block text-[12px] font-bold text-secondary uppercase tracking-wider mb-2">
                Tình trạng máy
              </label>
              <div className="flex flex-wrap gap-1.5">
                {conditions.map((c) => {
                  const isSelected = filter.condition === c.value;
                  return (
                    <button
                      key={c.value}
                      onClick={() => onFilterChange({ ...filter, condition: c.value })}
                      className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
                        isSelected
                          ? "bg-primary-container text-on-primary shadow-sm"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 2: Price Range & Storage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price Ranges */}
            <div>
              <label className="block text-[12px] font-bold text-secondary uppercase tracking-wider mb-2">
                Mức giá ngân sách
              </label>
              <div className="flex flex-wrap gap-1.5">
                {priceRanges.map((p) => {
                  const isSelected = filter.priceRange === p.value;
                  return (
                    <button
                      key={p.value}
                      onClick={() => onFilterChange({ ...filter, priceRange: p.value })}
                      className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
                        isSelected
                          ? "bg-primary-container text-on-primary shadow-sm"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Storage & RAM */}
            <div>
              <label className="block text-[12px] font-bold text-secondary uppercase tracking-wider mb-2">
                Dung lượng bộ nhớ & RAM
              </label>
              <div className="flex flex-wrap gap-1.5">
                {storages.map((s) => {
                  const isSelected = filter.storage === s.value;
                  return (
                    <button
                      key={s.value}
                      onClick={() => onFilterChange({ ...filter, storage: s.value })}
                      className={`px-2.5 py-1 rounded-md text-[12px] font-bold transition-all ${
                        isSelected
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
                <span className="text-secondary/40 self-center">|</span>
                {rams.map((r) => {
                  const isSelected = filter.ram === r.value;
                  return (
                    <button
                      key={r.value}
                      onClick={() => onFilterChange({ ...filter, ram: r.value })}
                      className={`px-2.5 py-1 rounded-md text-[12px] font-bold transition-all ${
                        isSelected
                          ? "bg-secondary text-white"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      RAM {r.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 3: Special Features & Showroom Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border-subtle/60">
            {/* Features check pills */}
            <div>
              <label className="block text-[12px] font-bold text-secondary uppercase tracking-wider mb-2">
                Tính năng cao cấp
              </label>
              <div className="flex flex-wrap gap-1.5">
                {featuresList.map((feat) => {
                  const isChecked = filter.features.includes(feat.value);
                  return (
                    <button
                      key={feat.value}
                      onClick={() => handleFeatureToggle(feat.value)}
                      className={`px-2.5 py-1 rounded-lg text-[12px] font-medium transition-all flex items-center gap-1 border ${
                        isChecked
                          ? "bg-primary/10 text-primary border-primary font-semibold"
                          : "bg-surface-pure text-secondary border-border-subtle hover:border-secondary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isChecked ? "check_box" : "check_box_outline_blank"}
                      </span>
                      <span>{feat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Showroom Availability */}
            <div>
              <label className="block text-[12px] font-bold text-secondary uppercase tracking-wider mb-2">
                Kiểm tra còn hàng tại Showroom
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={filter.province}
                  onChange={(e) => onFilterChange({ ...filter, province: e.target.value })}
                  className="flex-1 h-9 px-3 bg-surface-container-low rounded-lg text-[13px] text-on-surface border border-border-subtle focus:border-primary-container focus:outline-none"
                >
                  {provinces.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>

                <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low px-3 py-1.5 rounded-lg border border-border-subtle">
                  <input
                    type="checkbox"
                    checked={filter.inStockOnly}
                    onChange={(e) =>
                      onFilterChange({ ...filter, inStockOnly: e.target.checked })
                    }
                    className="w-4 h-4 text-primary-container rounded focus:ring-primary-container"
                  />
                  <span className="text-[12px] font-semibold text-text-main">
                    Chỉ hiện máy Sẵn hàng
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
