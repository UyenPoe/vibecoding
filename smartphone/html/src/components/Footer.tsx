"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low mt-12 text-on-surface border-t border-border-subtle">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-10">
        {/* Top 4 Assurance Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 pb-8 border-b border-border-subtle/80">
          <div className="flex items-start gap-3 bg-surface-pure p-4 rounded-2xl shadow-sm border border-border-subtle/60">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">sync</span>
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-text-main mb-0.5">1 Đổi 1 Trong 30 Ngày</h4>
              <p className="text-[12px] text-secondary">
                Lỗi phần cứng từ nhà sản xuất đổi mới lập tức không chờ đợi
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-surface-pure p-4 rounded-2xl shadow-sm border border-border-subtle/60">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">security</span>
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-text-main mb-0.5">Bảo Hành 12 - 24 Tháng</h4>
              <p className="text-[12px] text-secondary">
                Hỗ trợ bảo hành toàn diện Nguồn & Màn hình chính hãng toàn quốc
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-surface-pure p-4 rounded-2xl shadow-sm border border-border-subtle/60">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">storefront</span>
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-text-main mb-0.5">128 Showroom Toàn Quốc</h4>
              <p className="text-[12px] text-secondary">
                Trải nghiệm trực tiếp smartphone cao cấp gần bạn nhất
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-surface-pure p-4 rounded-2xl shadow-sm border border-border-subtle/60">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">support_agent</span>
            </div>
            <div>
              <h4 className="font-bold text-[14px] text-text-main mb-0.5">Tổng Đài 1800.6868</h4>
              <p className="text-[12px] text-secondary">
                Tư vấn miễn cước 8:00 - 21:30 hàng ngày
              </p>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-4">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-primary">PhoneX</span>
              <span className="text-[10px] font-bold bg-primary-container text-on-primary px-2 py-0.5 rounded">
                FLAGSHIP
              </span>
            </div>
            <p className="text-[13px] text-secondary leading-relaxed">
              Chuỗi bán lẻ smartphone chính hãng hàng đầu, đối tác ủy quyền của Apple, Samsung, Xiaomi, vivo, OPPO và Google Pixel tại Việt Nam.
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-primary text-[12px] font-bold">
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Đã chứng nhận Bộ Công Thương</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="font-bold text-[14px] text-text-main mb-3">Hệ Thống & Showroom</h5>
            <ul className="space-y-2 text-[13px] text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">Danh sách 128 showroom toàn quốc</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trung tâm bảo hành ủy quyền PhoneX Care</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Showroom trải nghiệm 58 Thái Hà (Hà Nội)</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Showroom 136 Nguyễn Thái Học (TP.HCM)</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Đặt lịch hẹn chuyên viên kỹ thuật</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="font-bold text-[14px] text-text-main mb-3">Chính Sách & Dịch Vụ</h5>
            <ul className="space-y-2 text-[13px] text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">Chính sách đổi trả 1 đổi 1 trong 30 ngày</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Quy chuẩn kiểm định 45 bước Pre-Owned</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Chương trình trả góp 0% duyệt CCCD 5 phút</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Thu cũ đổi mới trợ giá đến 1.500.000₫</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Giao hàng hỏa tốc và kiểm tra trước khi trả tiền</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h5 className="font-bold text-[14px] text-text-main mb-3">Tổng Đài Hỗ Trợ (Miễn Phí)</h5>
            <div className="space-y-2 text-[13px] text-secondary">
              <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                <span>Mua hàng & Tư vấn:</span>
                <a href="tel:18006868" className="font-bold text-primary text-[15px] hover:underline">
                  1800.6868
                </a>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-border-subtle/60">
                <span>Bảo hành & Sửa chữa:</span>
                <a href="tel:18006869" className="font-bold text-on-surface text-[15px] hover:underline">
                  1800.6869
                </a>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Góp ý & Khiếu nại:</span>
                <a href="tel:18006870" className="font-bold text-on-surface text-[15px] hover:underline">
                  1800.6870
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-6 border-t border-border-subtle/80 flex flex-col sm:flex-row items-center justify-between text-[12px] text-secondary gap-2">
          <p>© 2026 PhoneX Vietnam. Đã đăng ký Bản quyền thương hiệu và Bản quyền nội dung.</p>
          <p>Thiết kế giao diện chuẩn Responsive cho Desktop, Tablet và Mobile.</p>
        </div>
      </div>
    </footer>
  );
};
