"use client";

import React from "react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface WishlistDrawerProps {
  wishlist: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  onSelectProduct: (product: Product) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  wishlist,
  onRemove,
  onClear,
  onSelectProduct,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-surface-pure h-full shadow-2xl flex flex-col border-l border-border-subtle animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">favorite</span>
            <h2 className="text-lg font-bold text-text-main">
              Sản Phẩm Đã Lưu ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-secondary space-y-3">
              <span className="material-symbols-outlined text-4xl text-secondary/40">
                favorite_border
              </span>
              <div className="font-bold text-text-main">Danh sách yêu thích trống</div>
              <p className="text-[13px]">
                Nhấn vào biểu tượng trái tim trên bất kỳ chiếc điện thoại nào để lưu lại xem sau.
              </p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-surface rounded-xl border border-border-subtle flex items-center gap-3 hover:border-primary-container transition-all"
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded-lg bg-surface-pure p-1 border border-border-subtle shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-mono text-primary font-bold">{item.code}</div>
                  <h4 className="font-bold text-[13px] text-text-main truncate">{item.name}</h4>
                  <div className="font-black text-primary text-[14px]">
                    {formatCurrency(item.price)}
                  </div>
                  <div className="text-[11px] text-secondary">{item.condition}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProduct(item);
                    }}
                    className="p-1.5 bg-primary-container text-on-primary rounded-lg text-xs font-bold hover:bg-primary-hover shadow-sm"
                    title="Xem chi tiết"
                  >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1.5 bg-surface-container-low text-secondary hover:text-primary rounded-lg"
                    title="Xóa khỏi yêu thích"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-border-subtle flex gap-2">
            <button
              onClick={onClear}
              className="flex-1 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-secondary text-[13px] font-semibold"
            >
              Xóa tất cả
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-primary-container text-on-primary text-[13px] font-bold shadow-md hover:bg-primary-hover"
            >
              Tiếp tục xem
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
