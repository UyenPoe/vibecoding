"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface CompareDrawerProps {
  compareList: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  onSelectProduct: (product: Product) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  compareList,
  onRemove,
  onClear,
  onSelectProduct,
  isOpen,
  onClose,
}) => {
  const [showFullMatrix, setShowFullMatrix] = useState(false);

  if (compareList.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Quick Bar when drawer is minimized */}
      {!isOpen && !showFullMatrix && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-neutral-950/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">compare_arrows</span>
            <span className="text-[13px] font-bold">
              Đang so sánh ({compareList.length}/3 máy)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {compareList.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg text-[11px]"
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-5 h-5 object-contain rounded"
                />
                <span className="max-w-[80px] truncate">{item.name}</span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-white/60 hover:text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowFullMatrix(true)}
            className="px-3 py-1.5 rounded-xl bg-primary-container hover:bg-primary-hover text-on-primary text-[12px] font-bold shadow transition-colors"
          >
            So sánh ngay
          </button>
        </div>
      )}

      {/* Full Comparison Matrix Modal */}
      {(isOpen || showFullMatrix) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-surface-pure rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-border-subtle">
            {/* Header */}
            <div className="p-6 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">compare_arrows</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-main">
                    So Sánh Điện Thoại Song Song
                  </h2>
                  <p className="text-[12px] text-secondary">
                    Đối chiếu trực tiếp thông số kỹ thuật, tình trạng pin, camera và mức giá
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClear}
                  className="text-[12px] text-secondary hover:text-primary px-3 py-1.5 rounded-lg hover:bg-surface-container-low"
                >
                  Xóa tất cả
                </button>
                <button
                  onClick={() => {
                    setShowFullMatrix(false);
                    onClose();
                  }}
                  className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            {/* Comparison Matrix Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div
                className={`grid gap-4 ${
                  compareList.length === 1
                    ? "grid-cols-1 max-w-sm mx-auto"
                    : compareList.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                }`}
              >
                {compareList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-surface rounded-2xl p-4 border border-border-subtle space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-primary/10 text-primary font-bold text-[10px] px-2 py-0.5 rounded">
                          {item.code}
                        </span>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-secondary hover:text-primary"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>

                      <div className="w-full aspect-[4/3] bg-surface-pure rounded-xl p-2 flex items-center justify-center mb-3">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <h3 className="font-bold text-[14px] text-text-main line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="text-xl font-black text-primary-container mt-1">
                        {formatCurrency(item.price)}
                      </div>
                    </div>

                    {/* Spec List */}
                    <div className="space-y-2 text-[12px] border-t border-border-subtle pt-3">
                      <div>
                        <span className="text-secondary block">Tình trạng:</span>
                        <strong className="text-text-main">{item.condition}</strong>
                      </div>
                      <div>
                        <span className="text-secondary block">Pin & Sạc:</span>
                        <strong className="text-text-main">
                          {item.batteryHealth}% ({item.chargeCycles} lần sạc)
                        </strong>
                      </div>
                      <div>
                        <span className="text-secondary block">Màn hình:</span>
                        <span className="text-text-main font-medium">{item.specs.screen}</span>
                      </div>
                      <div>
                        <span className="text-secondary block">Vi xử lý:</span>
                        <span className="text-text-main font-medium">{item.specs.chipset}</span>
                      </div>
                      <div>
                        <span className="text-secondary block">Camera:</span>
                        <span className="text-text-main font-medium">{item.specs.camera}</span>
                      </div>
                      <div>
                        <span className="text-secondary block">Điểm thẩm định:</span>
                        <strong className="text-primary font-black">
                          {item.inspectionReport.overallScore}/100đ
                        </strong>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowFullMatrix(false);
                        onClose();
                        onSelectProduct(item);
                      }}
                      className="w-full py-2 bg-primary-container text-on-primary rounded-xl text-[12px] font-bold shadow hover:bg-primary-hover transition-colors"
                    >
                      Xem chi tiết máy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
