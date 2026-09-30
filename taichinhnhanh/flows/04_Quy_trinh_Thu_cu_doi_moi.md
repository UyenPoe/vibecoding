# 04 - Quy trình Thu cũ đổi mới (Trade-in)

Kết hợp giữa việc khách hàng bán máy cũ và mua máy mới, kèm theo các ưu đãi trợ giá đặc quyền.

1. **Khách hàng chọn Combo:** Chọn máy mới muốn mua và máy cũ muốn bán.
2. **Xem dự toán chi phí:** Hệ thống tính toán Số tiền bù = [Giá máy mới] - [Giá thu máy cũ] - [Trợ giá Trade-in].
3. **Bàn giao máy cũ:** Khách hàng mang máy cũ đến cửa hàng để kiểm định thực tế.
4. **Chốt mức giá cuối cùng (CRM):** Kỹ thuật viên kiểm tra xong, chốt giá máy cũ và số tiền bù thực tế.
5. **Thanh toán phần chênh lệch:** Khách hàng thanh toán số tiền còn lại (Tiền mặt hoặc Trả góp).
6. **Bàn giao máy mới:** Nhân viên giao máy mới cho khách, kết thúc quy trình Trade-in.


## Sơ đồ Quy trình

```mermaid
graph TD
    A[Chọn Máy mới + Máy cũ cần bán] --> B[Hệ thống tạm tính Số tiền cần bù]
    B --> C[Mang máy cũ đến Showroom kiểm định]
    C --> D[Kỹ thuật chốt giá thu máy cũ thực tế]
    D --> E[Hệ thống tính lại số tiền bù chính xác]
    E --> F[Khách thanh toán phần chênh lệch]
    F --> G((Bàn giao máy mới cho khách))
    
    style A fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style C fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
    style F fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style G fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px

```
