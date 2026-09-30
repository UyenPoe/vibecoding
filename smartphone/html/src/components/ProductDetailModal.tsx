"use client";

import React, { useState } from "react";
import { Product, StoreStock } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { TRADE_IN_MODELS, REVIEWS_DATA } from "@/data/products";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  if (!product) return null;

  // Image angle selection
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Dynamic Variant state
  const [selectedStorage, setSelectedStorage] = useState(product.storage);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedCondition, setSelectedCondition] = useState(
    product.variants.conditions[0]?.grade || "Grade A 99%"
  );

  // Store stock location state
  const [selectedProvince, setSelectedProvince] = useState(product.storeLocation.province);

  // Trade-in calculator state
  const [tradeInModelVal, setTradeInModelVal] = useState(17500000);
  const [tradeInConditionMult, setTradeInConditionMult] = useState(1.0);

  // Bundle accessories state
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([1]);

  // Calculate current price based on selected storage and condition delta
  const currentStorageVariant =
    product.variants.storages.find((s) => s.size === selectedStorage) ||
    product.variants.storages[0];
  const currentConditionVariant =
    product.variants.conditions.find((c) => c.grade === selectedCondition) ||
    product.variants.conditions[0];

  const basePrice = currentStorageVariant?.price || product.price;
  const conditionDelta = currentConditionVariant?.priceDelta || 0;
  const finalPrice = Math.max(0, basePrice + conditionDelta);

  // Calculate trade-in estimate
  const estimatedTradeVal = Math.round(tradeInModelVal * tradeInConditionMult);
  const subsidyAmount = 1500000;
  const totalTradeRebate = estimatedTradeVal + subsidyAmount;
  const tradeGapAmount = Math.max(0, finalPrice - totalTradeRebate);

  // Accessories bundle
  const accessories = [
    {
      id: 1,
      name: "Pin Dự Phòng MagSafe 10.000mAh",
      price: 690000,
      oldPrice: 1190000,
      discount: "-42%",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAaTpmEDLZHIgDTwIfqETv1nz-WdDcg36lxcA1TDf3GZrswtCovyafPQ9_sPE14jZ5_Cw64CDCFsVrwbfcnK5H1eW16VNFbGCXhYzoIG1HGuUCLMzYh4rvVmlcTg1lgdeLzE-S9KALaHe0pl2vEe00f4IWgRdMVCDgQQ-prnx1-MZ8jhIZuqJ4LyOjLp7jYoOItAN1LaISjOWdjetZitX-5MRfGSumg49pB3S4EPom2FoNJ5A7ZMfVC",
    },
    {
      id: 2,
      name: "AirPods 3 Like New Chính Hãng",
      price: 1890000,
      oldPrice: 2890000,
      discount: "-35%",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAFEFFDJAO-cg7kJIS8KYkYyvmLHS-AVJxdFmYxN6SLrDG8fJ16npoY8-St0ot7Ad7Og4YwjnqoRU978bnAodkuWxA7yexuMcCVgDNrWb-9EBaGJvhWf7gojuepDKk66msM4gSSBmN02viXAUAaBgGVLBt8f7gNZXd6xfCfMbn7jEvSTgp_sCZe4v_diy3I0xZhDaQkSbcpq8UkBj1TN3KuV0NGn98fabNoUliC0ktAu2tNezK03MjI",
    },
    {
      id: 3,
      name: "Củ sạc 35W Dual Type-C Apple",
      price: 590000,
      oldPrice: 990000,
      discount: "-40%",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCEnDU1dRQI4SvGMCZ9bHuctqoPwWRrTcF2huPDA14fETNdExfd8PXoVM9qCuvPu71KeavjRuvfd_BrQgOL9dLh6e5gZh_2h0yWdnj_iuEkQ4Jv4A__iRtrgGvcCmTQtqmt9rqz28LJeNtBrlpqm82QtnflCd4QU7-jUXomBgefsBO8hWghY_wWO8_WKS8AhAOGhw8amOfQpdd_WB-8aQpwP5nFYQ-xlm2y_fPHE0pxJxfX2inQ5cEj",
    },
  ];

  const toggleAccessory = (id: number) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalAccessoryCost = accessories
    .filter((a) => selectedAccessories.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  // Filter stores by selected province
  const filteredStores: StoreStock[] = product.allStores.filter(
    (s) => !selectedProvince || s.province === selectedProvince
  );

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex justify-center p-0 md:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-7xl bg-surface rounded-none md:rounded-3xl shadow-2xl overflow-hidden min-h-screen md:min-h-0 my-auto flex flex-col border border-border-subtle">
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="fixed md:absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-surface-pure/90 hover:bg-surface-pure text-on-surface flex items-center justify-center shadow-lg transition-transform hover:scale-110 border border-border-subtle"
          title="Đóng chi tiết sản phẩm"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* BREADCRUMB & METADATA BAR */}
        <section className="w-full bg-surface-pure border-b border-border-subtle py-2 px-4 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
            <nav className="flex items-center gap-1.5 text-secondary">
              <span className="hover:text-primary cursor-pointer" onClick={onClose}>Trang chủ</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="hover:text-primary cursor-pointer">{product.brand}</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-on-surface font-semibold truncate max-w-xs md:max-w-md">
                {product.name}
              </span>
            </nav>
            <div className="hidden lg:flex items-center gap-3 text-secondary text-[12px]">
              <span className="flex items-center gap-1 font-mono bg-surface-container-low px-2 py-0.5 rounded">
                <span className="material-symbols-outlined text-sm text-primary">fingerprint</span>
                IMEI: {product.imei}
              </span>
              <span className="flex items-center gap-1 font-mono bg-surface-container-low px-2 py-0.5 rounded">
                Serial: {product.serial}
              </span>
              <span className="inline-flex items-center gap-1 text-primary font-bold uppercase tracking-wider bg-primary-fixed px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                Đang sẵn hàng tại {product.storeLocation.address}
              </span>
            </div>
          </div>
        </section>

        {/* TRUST BADGES STRIP */}
        <div className="w-full bg-gradient-to-r from-surface-container-low via-surface-pure to-surface-container-low py-2 px-4 lg:px-10 border-b border-border-subtle">
          <div className="flex flex-wrap items-center justify-between gap-y-2 text-[12px]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">token</span>
              <span className="font-extrabold text-primary uppercase bg-primary-container/10 px-2 py-0.5 rounded">
                {product.isUnique ? "ĐỘC BẢN DUY NHẤT 1 MÁY TẠI SHOWROOM" : "MÁY MỚI CHÍNH HÃNG 100%"}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-on-surface font-semibold">
              <span className="inline-flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-base">verified</span>
                {product.condition}
              </span>
              <span className="text-secondary/40">•</span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-base">
                  battery_charging_full
                </span>
                PIN ZIN {product.batteryHealth}% - SẠC {product.chargeCycles} LẦN
              </span>
              <span className="text-secondary/40">•</span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-base">memory</span>
                ZIN ALL 100% NGUYÊN BẢN
              </span>
              <span className="text-secondary/40">•</span>
              <span className="inline-flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-base">shield</span>
                BẢO HÀNH VIP 12 THÁNG 1 ĐỔI 1
              </span>
            </div>
          </div>
        </div>

        {/* MAIN PRODUCT ARENA: 2 COLUMNS */}
        <div className="p-4 lg:p-10 space-y-8">
          <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* LEFT COLUMN: REAL PHOTOS & INSPECTION REPORT */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
              {/* Main Photo Viewer */}
              <div className="relative bg-surface-pure rounded-2xl p-6 shadow-sm border border-border-subtle group">
                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="bg-primary-container text-on-primary font-bold text-[11px] uppercase px-2.5 py-1 rounded shadow-sm inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    {product.code}
                  </span>
                  <span className="bg-neutral-900/85 backdrop-blur-md text-white font-mono text-[11px] px-2 py-0.5 rounded">
                    Ảnh chụp độ phân giải thực 48MP
                  </span>
                </div>

                {/* Location Watermark */}
                <div className="absolute bottom-4 right-4 z-10 bg-neutral-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg flex items-center gap-2 pointer-events-none">
                  <span className="material-symbols-outlined text-base text-primary">
                    photo_camera
                  </span>
                  <span className="text-[12px]">
                    Ảnh thực tế tại PhoneX {product.storeLocation.district}
                  </span>
                </div>

                {/* Stage Image */}
                <div className="w-full aspect-[4/3] bg-surface-container-low rounded-xl overflow-hidden flex items-center justify-center relative">
                  <img
                    src={product.gallery[activePhotoIdx]?.url || product.thumbnail}
                    alt={product.gallery[activePhotoIdx]?.alt || product.name}
                    className="w-full h-full object-contain p-4 transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Inspection Zoom Hint */}
                <div className="flex flex-wrap items-center justify-between mt-3 text-secondary text-[12px]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">zoom_in</span>
                    Góc chụp: <strong>{product.gallery[activePhotoIdx]?.label || "Toàn cảnh"}</strong>
                  </span>
                  <span className="text-primary font-semibold uppercase tracking-wide">
                    KTV kiểm tra: {product.inspectionReport.technician} ({product.inspectionReport.technicianId})
                  </span>
                </div>
              </div>

              {/* 6 Angles Gallery Thumbnails */}
              <div className="grid grid-cols-6 gap-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative aspect-square rounded-xl bg-surface-pure p-1 shadow-sm transition-all border ${
                      activePhotoIdx === idx
                        ? "ring-2 ring-primary border-primary bg-primary/5"
                        : "border-border-subtle hover:bg-surface-container-low"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-center bg-black/75 text-white rounded leading-tight py-0.5 truncate">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Guarantee Banner */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-surface-pure p-4 rounded-2xl border border-primary/20 flex items-start gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[14px] text-text-main mb-0.5">
                    Cam Kết Hình Ảnh & Serial Thực Tế 100%
                  </h4>
                  <p className="text-[13px] text-secondary leading-relaxed">
                    Chiếc máy bạn đặt mua chính là sản phẩm xuất hiện trong hình ảnh và thông số này. Nếu máy bạn nhận được không đúng với số serial{" "}
                    <strong className="text-on-surface">{product.serial}</strong> hoặc sai lệch ngoại hình, PhoneX{" "}
                    <strong className="text-primary">hoàn tiền 100% lập tức và đền bù 1.000.000₫</strong> tiền mặt.
                  </p>
                </div>
              </div>

              {/* 45-Step Inspection Summary Widget */}
              <div className="bg-surface-pure rounded-2xl p-6 shadow-sm border border-border-subtle space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      fact_check
                    </span>
                    <div>
                      <h3 className="font-bold text-[16px] text-text-main">
                        Hồ Sơ Thẩm Định Chất Lượng Chuyên Sâu
                      </h3>
                      <p className="text-[12px] text-secondary">
                        Chứng nhận kiểm định độc lập cấp ngày {product.inspectionReport.date}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-primary-container text-on-primary px-3 py-1 rounded-full uppercase">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    ĐẠT {product.inspectionReport.totalPassed} TIÊU CHUẨN
                  </span>
                </div>

                {/* Score Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-on-surface font-semibold">
                      Điểm chất lượng phần cứng tổng thể:
                    </span>
                    <span className="text-xl font-black text-primary">
                      {product.inspectionReport.overallScore} / 100 Điểm
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-primary-container rounded-full transition-all duration-1000"
                      style={{ width: `${product.inspectionReport.overallScore}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[12px] text-secondary">
                    <div className="bg-surface-container-low p-2 rounded-xl">
                      <div className="font-semibold text-text-main">Ngoại hình máy</div>
                      <div className="text-primary font-bold">{product.condition}</div>
                    </div>
                    <div className="bg-surface-container-low p-2 rounded-xl">
                      <div className="font-semibold text-text-main">Tình trạng pin</div>
                      <div className="text-primary font-bold">{product.batteryHealth}% Zin Apple</div>
                    </div>
                    <div className="bg-surface-container-low p-2 rounded-xl">
                      <div className="font-semibold text-text-main">Linh kiện thay thế</div>
                      <div className="text-primary font-bold">0 linh kiện (Zin 100%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PRICING, VARIANTS, STORE STOCK & CTA */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              <div className="bg-surface-pure rounded-2xl p-6 shadow-sm border border-border-subtle space-y-4">
                {/* Header Title */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-primary-container/10 text-primary font-bold text-[11px] px-2.5 py-0.5 rounded uppercase">
                      {product.code}
                    </span>
                    <span className="inline-flex items-center gap-1 text-secondary text-[12px]">
                      <span className="material-symbols-outlined text-sm text-primary">
                        visibility
                      </span>
                      18 khách đang xem máy này
                    </span>
                  </div>
                  <h1 className="text-2xl font-black text-text-main leading-snug">
                    {product.name}
                  </h1>
                  <p className="text-secondary text-[13px] mt-1">
                    Phân loại: {product.condition} • Bản VN/A chính hãng • Pin zin {product.batteryHealth}%
                  </p>
                </div>

                {/* Price Stack */}
                <div className="pt-3 border-t border-border-subtle">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-primary-container">
                      {formatCurrency(finalPrice)}
                    </span>
                    {product.originalPrice > finalPrice && (
                      <span className="text-secondary line-through text-[15px]">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                    <span className="bg-primary-fixed text-primary font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                      Tiết kiệm {formatCurrency(product.originalPrice - finalPrice)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[12px] bg-surface-container-low px-3 py-2 rounded-xl">
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <span className="material-symbols-outlined text-primary text-base">
                        credit_card
                      </span>
                      <span>Trả góp 0% chỉ từ:</span>
                      <strong className="text-primary font-bold">
                        {formatCurrency(Math.round(finalPrice / 12))}/tháng
                      </strong>
                    </div>
                    <span className="text-secondary">CCCD duyệt 5 phút</span>
                  </div>
                </div>

                {/* DYNAMIC VARIANT SELECTORS (Step 5 in Flow 01) */}
                <div className="space-y-3 pt-2">
                  {/* Storage Selector */}
                  <div>
                    <label className="block text-[12px] font-bold text-secondary uppercase tracking-wider mb-1.5">
                      1. Chọn Dung lượng lưu trữ:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {product.variants.storages.map((s) => {
                        const isSelected = selectedStorage === s.size;
                        return (
                          <button
                            key={s.size}
                            type="button"
                            onClick={() => setSelectedStorage(s.size)}
                            className={`p-2.5 rounded-xl text-center transition-all border ${
                              isSelected
                                ? "border-primary-container bg-primary/5 text-primary ring-2 ring-primary-container/20 font-bold"
                                : "border-border-subtle bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                            }`}
                          >
                            <div className="text-[13px]">{s.size}</div>
                            <div className="text-[11px] opacity-80">{formatCurrency(s.price)}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Color Selector */}
                  <div>
                    <label className="block text-[12px] font-bold text-secondary uppercase tracking-wider mb-1.5">
                      2. Chọn Màu sắc: <strong className="text-text-main">{selectedColor}</strong>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.colors.map((c) => {
                        const isSelected = selectedColor === c.name;
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setSelectedColor(c.name)}
                            className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all flex items-center gap-2 border ${
                              isSelected
                                ? "border-primary-container bg-primary/5 text-primary ring-2 ring-primary-container/20 font-bold"
                                : "border-border-subtle bg-surface-container-low text-on-surface"
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/20"
                              style={{ backgroundColor: c.colorCode }}
                            />
                            <span>{c.name}</span>
                            {!c.inStock && (
                              <span className="text-[10px] text-secondary">(Đặt trước)</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Condition Selector */}
                  <div>
                    <label className="block text-[12px] font-bold text-secondary uppercase tracking-wider mb-1.5">
                      3. Chọn Tình trạng phân loại:
                    </label>
                    <div className="space-y-1.5">
                      {product.variants.conditions.map((cond) => {
                        const isSelected = selectedCondition === cond.grade;
                        return (
                          <div
                            key={cond.grade}
                            onClick={() => setSelectedCondition(cond.grade)}
                            className={`p-2.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between text-[13px] ${
                              isSelected
                                ? "border-primary-container bg-primary/5 text-primary font-bold ring-2 ring-primary-container/20"
                                : "border-border-subtle bg-surface-container-low text-on-surface"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">
                                {isSelected ? "radio_button_checked" : "radio_button_unchecked"}
                              </span>
                              <span>{cond.label}</span>
                            </div>
                            <span className="text-[12px]">
                              {cond.priceDelta === 0
                                ? "Chuẩn giá"
                                : `${formatCurrency(cond.priceDelta)}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* REAL CONDITION MATRIX DETAILS */}
                <div className="space-y-2 pt-2 border-t border-border-subtle text-[13px]">
                  <div className="flex justify-between py-1 border-b border-border-subtle/60">
                    <span className="text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-primary">
                        phone_iphone
                      </span>
                      Ngoại hình thực tế:
                    </span>
                    <span className="font-semibold text-text-main text-right">
                      {selectedCondition} (Không cấn móp)
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border-subtle/60">
                    <span className="text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-primary">
                        battery_charging_full
                      </span>
                      Dung lượng Pin & Chu kỳ:
                    </span>
                    <span className="font-semibold text-text-main text-right">
                      {product.batteryHealth}% Pin Zin • {product.chargeCycles} lần sạc
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border-subtle/60">
                    <span className="text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-primary">
                        verified
                      </span>
                      Màn hình:
                    </span>
                    <span className="font-semibold text-text-main text-right">
                      Zin TrueTone • 120Hz ProMotion
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-primary">
                        package_2
                      </span>
                      Bộ phụ kiện bàn giao:
                    </span>
                    <span className="font-semibold text-text-main text-right">
                      Fullbox trùng IMEI + Cáp C
                    </span>
                  </div>
                </div>

                {/* STORE INVENTORY CHECKER (Step 5 in Flow 01) */}
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-subtle space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-[13px] text-text-main">
                      <span className="material-symbols-outlined text-primary text-base">
                        storefront
                      </span>
                      <span>Kiểm Tra Tồn Kho Showroom</span>
                    </div>
                    <select
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      className="h-8 px-2 bg-surface-pure rounded-lg text-[12px] font-semibold text-on-surface border border-border-subtle focus:outline-none"
                    >
                      <option value="">Tất cả khu vực</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto pt-1">
                    {filteredStores.map((store) => (
                      <div
                        key={store.storeId}
                        className="p-2 bg-surface-pure rounded-lg border border-border-subtle text-[12px] flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-text-main">{store.storeName}</div>
                          <div className="text-secondary text-[11px] truncate max-w-[200px]">
                            {store.address}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${
                            store.status === "Còn hàng"
                              ? "bg-emerald-50 text-emerald-700"
                              : store.status === "Đang giữ"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {store.status} ({store.stockCount})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="space-y-2 pt-2">
                  {bookingSuccess ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center space-y-1 animate-in zoom-in-95">
                      <div className="font-bold text-[15px] flex items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        Đã Khóa Giữ Máy Độc Bản Thành Công!
                      </div>
                      <p className="text-[12px]">
                        Mã máy <strong>{product.code}</strong> đã được giữ trong 48h tại{" "}
                        {product.storeLocation.storeName}. Nhân viên tư vấn sẽ liên hệ ngay.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleBooking}
                      className="w-full bg-primary-container hover:bg-primary-hover text-on-primary py-3.5 px-4 rounded-xl font-bold text-[15px] shadow-lg transition-all flex flex-col items-center justify-center gap-0.5 active:scale-98 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl">lock_clock</span>
                        <span>ĐẶT CỌC & GIỮ MÁY ĐỘC BẢN NGAY</span>
                      </div>
                      <span className="text-[11px] font-normal text-on-primary/90">
                        Chỉ cần cọc 500k giữ máy 48h hoặc Giao tận nơi kiểm tra trước
                      </span>
                    </button>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleBooking}
                      className="bg-surface-pure hover:bg-primary/5 text-primary-container border-2 border-primary-container/80 py-2.5 px-2 rounded-xl text-[13px] text-center font-bold transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-base">credit_score</span>
                      <span>TRẢ GÓP 0% CCCD</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("tradein-section");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-surface-pure hover:bg-surface-container-low text-text-main border border-border-subtle py-2.5 px-2 rounded-xl text-[13px] text-center font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-base text-primary">
                        published_with_changes
                      </span>
                      <span>THU CŨ BÙ TIỀN</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: TRADE-IN VALUATION WIDGET */}
          <div id="tradein-section" className="bg-surface-pure rounded-3xl p-6 lg:p-8 shadow-md border border-border-subtle">
            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-12 lg:col-span-5 space-y-3">
                <span className="bg-primary-fixed text-primary text-[11px] font-bold px-3 py-1 rounded-full uppercase inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">sync_alt</span>
                  Trợ giá cao nhất thị trường
                </span>
                <h3 className="text-2xl font-black text-text-main">
                  Thu Cũ Đổi Mới Lên Đời Chiếc Máy Này
                </h3>
                <p className="text-secondary text-[14px] leading-relaxed">
                  Định giá máy cũ của bạn trong 60 giây. Nhận thêm khoản{" "}
                  <strong className="text-primary">trợ giá đặc biệt 1.500.000₫</strong> khi lên đời{" "}
                  {product.name} ({product.code}) hôm nay.
                </p>
                <div className="p-3 bg-surface-container-low rounded-xl space-y-1.5 text-[12px] text-secondary">
                  <div className="flex items-center gap-2 text-on-surface font-medium">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    Thu mua mọi dòng máy (iPhone, Samsung, Xiaomi...)
                  </div>
                  <div className="flex items-center gap-2 text-on-surface font-medium">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    Không cần phụ kiện, không phân biệt nơi mua
                  </div>
                  <div className="flex items-center gap-2 text-on-surface font-medium">
                    <span className="material-symbols-outlined text-primary text-base">check</span>
                    Số tiền bù thêm có thể trả góp 0%
                  </div>
                </div>
              </div>

              {/* Interactive Calculator */}
              <div className="col-span-12 lg:col-span-7 bg-surface-container-low rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-bold text-text-main mb-1">
                      Chọn thiết bị bạn đang dùng:
                    </label>
                    <select
                      value={tradeInModelVal}
                      onChange={(e) => setTradeInModelVal(Number(e.target.value))}
                      className="w-full h-11 px-3 bg-surface-pure rounded-xl text-[13px] text-on-surface border border-border-subtle focus:outline-none"
                    >
                      {TRADE_IN_MODELS.map((item, idx) => (
                        <option key={idx} value={item.baseValue}>
                          {item.model}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-text-main mb-1">
                      Tình trạng máy hiện tại:
                    </label>
                    <select
                      value={tradeInConditionMult}
                      onChange={(e) => setTradeInConditionMult(Number(e.target.value))}
                      className="w-full h-11 px-3 bg-surface-pure rounded-xl text-[13px] text-on-surface border border-border-subtle focus:outline-none"
                    >
                      <option value={1.0}>Loại 1: Thân đẹp keng, màn zin, pin &gt; 85%</option>
                      <option value={0.9}>Loại 2: Thân xước nhẹ viền, màn đẹp không trầy</option>
                      <option value={0.8}>Loại 3: Thân cấn góc hoặc pin đã bảo trì</option>
                    </select>
                  </div>
                </div>

                {/* Price Breakdown Calculation */}
                <div className="bg-surface-pure rounded-xl p-4 space-y-2 border border-border-subtle text-[13px]">
                  <div className="flex justify-between items-center text-secondary">
                    <span>Giá ước tính thu lại máy cũ của bạn:</span>
                    <span className="font-bold text-text-main text-[16px]">
                      {formatCurrency(estimatedTradeVal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-primary">
                    <span className="flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-sm">add_circle</span>
                      Trợ giá độc quyền PhoneX:
                    </span>
                    <span className="font-bold">+{formatCurrency(subsidyAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-border-subtle pt-2">
                    <span className="font-semibold text-on-surface">Tổng khấu trừ khi lên đời:</span>
                    <span className="font-black text-primary text-[17px]">
                      {formatCurrency(totalTradeRebate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-primary-container/10 p-3 rounded-xl">
                    <span className="font-bold text-text-main">Số tiền bạn chỉ cần bù thêm:</span>
                    <span className="text-2xl font-black text-primary-container">
                      {formatCurrency(tradeGapAmount)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full bg-primary-container hover:bg-primary-hover text-on-primary py-3 rounded-xl font-bold text-[14px] transition-colors text-center"
                >
                  Đăng Ký Thu Cũ Đổi Chiếc Máy Này
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 5: RECOMMENDED BUNDLE ACCESSORIES */}
          <div className="bg-surface-pure rounded-3xl p-6 lg:p-8 shadow-sm border border-border-subtle">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xl font-black text-text-main">
                  Phụ Kiện Khuyên Mua Cùng Với Giá Ưu Đãi
                </h3>
                <p className="text-[13px] text-secondary">
                  Được trợ giá sốc khi mua kèm cùng máy {product.code}
                </p>
              </div>
              <span className="text-[11px] font-bold text-primary bg-primary-container/10 px-3 py-1 rounded-full uppercase">
                Giảm đến 45%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {accessories.map((acc) => {
                const isSelected = selectedAccessories.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => toggleAccessory(acc.id)}
                    className={`bg-surface rounded-2xl p-4 flex items-center gap-3 shadow-sm border cursor-pointer transition-all ${
                      isSelected
                        ? "border-primary-container bg-primary/5 ring-1 ring-primary-container"
                        : "border-border-subtle hover:border-secondary"
                    }`}
                  >
                    <div className="w-20 h-20 bg-surface-pure rounded-xl p-2 shrink-0 flex items-center justify-center">
                      <img
                        src={acc.image}
                        alt={acc.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold bg-primary-fixed text-primary px-1.5 py-0.5 rounded uppercase">
                        {acc.discount}
                      </span>
                      <h4 className="font-bold text-[13px] text-text-main truncate mt-1">
                        {acc.name}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="font-bold text-primary text-[15px]">
                          {formatCurrency(acc.price)}
                        </span>
                        <span className="text-[11px] text-secondary line-through">
                          {formatCurrency(acc.oldPrice)}
                        </span>
                      </div>
                      <label className="mt-2 inline-flex items-center gap-2 cursor-pointer text-[12px] text-on-surface">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-primary-container focus:ring-primary-container"
                        />
                        <span className="font-semibold">Mua kèm theo máy</span>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedAccessories.length > 0 && (
              <div className="mt-4 p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-[13px]">
                <span className="text-secondary">
                  Đã chọn {selectedAccessories.length} phụ kiện mua kèm:
                </span>
                <span className="font-black text-primary text-[16px]">
                  +{formatCurrency(totalAccessoryCost)}
                </span>
              </div>
            )}
          </div>

          {/* SECTION 6: REVIEWS */}
          <div className="bg-surface-pure rounded-3xl p-6 lg:p-8 shadow-sm border border-border-subtle">
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-border-subtle gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-text-main">
                    Đánh Giá Từ Khách Hàng Đã Mua Máy Tại PhoneX
                  </h3>
                  <span className="bg-primary/10 text-primary font-bold text-xs px-2 py-0.5 rounded">
                    4.9/5 ⭐
                  </span>
                </div>
                <p className="text-[13px] text-secondary mt-0.5">
                  Dựa trên 3.824 lượt khách hàng thực tế mua máy Pre-Owned tại 128 Showroom toàn quốc
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {REVIEWS_DATA.map((rev) => (
                <div key={rev.id} className="space-y-2 bg-surface p-4 rounded-2xl border border-border-subtle">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center text-xs">
                        {rev.avatarText}
                      </div>
                      <div>
                        <div className="font-bold text-[13px] text-text-main">{rev.author}</div>
                        <div className="text-[11px] text-secondary">{rev.location}</div>
                      </div>
                    </div>
                    <span className="text-amber-500 text-xs font-bold">★★★★★</span>
                  </div>
                  <p className="text-[13px] text-on-surface italic leading-relaxed">
                    "{rev.content}"
                  </p>
                  <div className="text-[11px] text-secondary">{rev.productName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STICKY BOTTOM SUB-DOCK */}
        <aside className="sticky bottom-0 z-40 w-full bg-surface-pure/95 backdrop-blur-md border-t border-border-subtle py-3 px-4 lg:px-10 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-10 h-10 object-contain rounded-lg bg-surface-container-low p-1 hidden sm:block shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[14px] text-text-main truncate">
                    {product.name} ({selectedStorage})
                  </span>
                  <span className="bg-primary/10 text-primary text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0">
                    {product.code}
                  </span>
                </div>
                <div className="text-secondary text-[12px] truncate">
                  Tình trạng: <span className="text-primary font-semibold">{selectedCondition}</span> • Sẵn hàng tại {product.storeLocation.district}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-xl font-black text-primary-container leading-none">
                  {formatCurrency(finalPrice + totalAccessoryCost)}
                </div>
                <div className="text-[11px] text-secondary mt-0.5 hidden sm:block">
                  Tiết kiệm {formatCurrency(product.originalPrice - finalPrice)}
                </div>
              </div>
              <button
                type="button"
                onClick={handleBooking}
                className="bg-primary-container hover:bg-primary-hover text-on-primary px-5 py-2.5 rounded-xl font-bold text-[13px] shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">lock_clock</span>
                <span className="hidden sm:inline">ĐẶT CỌC GIỮ MÁY NGAY</span>
                <span className="sm:hidden">ĐẶT CỌC</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
