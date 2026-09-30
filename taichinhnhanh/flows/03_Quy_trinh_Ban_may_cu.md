# 03 - Quy trình Bán máy cũ lấy tiền mặt

Sau khi định giá xong, khách hàng muốn bán lại máy cũ cho cửa hàng để lấy tiền mặt.

1. **Gửi yêu cầu bán máy:** Khách hàng để lại thông tin từ kết quả định giá.
2. **Tiếp nhận & Đặt lịch (CRM):** Nhân viên xác nhận lịch hẹn (tại cửa hàng hoặc thu mua tận nơi).
3. **Kỹ thuật viên kiểm định:** Đánh giá thực tế 32 tiêu chí (Ngoại hình, chức năng, phần cứng).
4. **Hệ thống chốt giá chính thức:** Tính toán lại mức giá dựa trên kết quả kiểm định thực tế.
5. **Khách hàng duyệt giá:** Khách hàng đồng ý với mức giá thu mua cuối cùng.
6. **Giải ngân & Nhập kho:** Kế toán thanh toán tiền cho khách, hệ thống tự động tạo mã IMEI và nhập kho máy cũ.


## Sơ đồ Quy trình

```mermaid
graph TD
    A[Khách gửi yêu cầu Bán máy] --> B[Nhân viên CRM đặt lịch hẹn]
    B --> C[Kỹ thuật viên kiểm định thực tế 32 tiêu chí]
    C --> D{Hệ thống chốt giá chính thức}
    D --> E{Khách hàng duyệt giá?}
    E -- Đồng ý --> F[Kế toán giải ngân thanh toán]
    E -- Từ chối --> G[Trả máy cho khách]
    F --> H((Nhập kho thiết bị cũ))
    
    style A fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style C fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
    style F fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style H fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px

```
