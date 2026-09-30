# 01 - Quy trình Đặt hàng trực tuyến

Quy trình này cho phép khách hàng mua sắm nhanh chóng mà không cần bắt buộc tạo tài khoản (Guest Checkout).

1. **Khách hàng thêm sản phẩm vào giỏ hàng:** Chọn màu sắc, dung lượng và số lượng.
2. **Nhập thông tin giao hàng:** Họ tên, Số điện thoại, Địa chỉ nhận hàng.
3. **Chọn phương thức nhận hàng:** Giao hàng tận nhà (Hỏa tốc / Tiêu chuẩn) hoặc Nhận tại Showroom.
4. **Chọn phương thức thanh toán:** Tiền mặt (COD), Chuyển khoản, Thẻ tín dụng, Ví điện tử hoặc Trả góp.
5. **Hệ thống tạo đơn hàng:** Chuyển đơn về CRM nội bộ và hiển thị thông báo thành công cho khách hàng.
6. **Nhân viên xử lý đơn (CRM):** Tiếp nhận, xác nhận cọc, chuẩn bị hàng và xuất kho.
7. **Giao hàng và Hoàn tất:** Khách hàng nhận máy và hệ thống cập nhật trạng thái hoàn tất.


## Sơ đồ Quy trình

```mermaid
graph TD
    A[Khách hàng thêm sản phẩm vào giỏ] --> B[Nhập thông tin cá nhân & Địa chỉ]
    B --> C[Chọn phương thức nhận hàng]
    C --> D[Chọn phương thức thanh toán]
    D --> E[Hệ thống tạo Đơn hàng]
    E --> F[Nhân viên CRM tiếp nhận & Chuẩn bị hàng]
    F --> G[Giao hàng cho khách]
    G --> H((Hoàn tất))
    
    style A fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style E fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
    style F fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style H fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px

```
