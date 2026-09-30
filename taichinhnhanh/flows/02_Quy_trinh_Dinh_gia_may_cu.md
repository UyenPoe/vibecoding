# 02 - Quy trình Định giá máy cũ trực tuyến

Khách hàng tự đánh giá tình trạng thiết bị cũ của mình để xem mức giá thu mua dự kiến từ hệ thống.

1. **Khách hàng chọn cấu hình máy:** Chọn Hãng, Dòng máy, Phiên bản dung lượng.
2. **Khảo sát ngoại hình:** Chọn mức độ mới của máy (Đẹp 99%, Cấn nhẹ, Trầy xước...).
3. **Khảo sát chức năng & Pin:** Khai báo tình trạng Camera, Màn hình, FaceID, Tỷ lệ Pin.
4. **Hệ thống tính toán giá:** Dựa trên bảng giá gốc và tỷ lệ trừ lỗi, hệ thống hiển thị khoảng giá thu dự kiến.
5. **Lựa chọn tiếp theo:** Khách hàng có thể chọn Bán lấy tiền mặt hoặc Thu cũ đổi mới lên đời.


## Sơ đồ Quy trình

```mermaid
graph TD
    A[Chọn Thương hiệu & Cấu hình máy] --> B[Khảo sát ngoại hình thiết bị]
    B --> C[Khảo sát chức năng & Tình trạng Pin]
    C --> D{Hệ thống tính toán giá}
    D --> E[Hiển thị khoảng giá thu dự kiến]
    E --> F[Chọn: Bán lấy tiền mặt]
    E --> G[Chọn: Thu cũ lên đời]
    
    style A fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style D fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
    style E fill:#e8f5e9,stroke:#388e3c,stroke-width:2px

```
