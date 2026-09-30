# 07 - Quy trình Phê duyệt tập trung

Quản lý các nghiệp vụ nhạy cảm hoặc vượt khung quy định tiêu chuẩn, đòi hỏi cấp quản lý can thiệp.

1. **Phát sinh ngoại lệ:** 
   - Khách VIP đòi chiết khấu cao hơn quy định.
   - Thu mua máy cũ giá cao hơn trần hệ thống do máy quá đẹp.
   - Yêu cầu hoàn tiền mặt giá trị lớn.
2. **Nhân viên tạo Đề xuất:** Điền lý do, đính kèm hình ảnh minh chứng trên CRM.
3. **Hệ thống điều phối (Workflow):** Đẩy thông báo duyệt lên cấp Quản lý hoặc Giám đốc tùy theo hạn mức.
4. **Kiểm duyệt:** Cấp quản lý xem xét hồ sơ và quyết định Duyệt hoặc Từ chối.
5. **Thực thi:** Nếu được duyệt, hệ thống mở khóa tính năng để nhân viên hoàn tất giao dịch. Mọi thao tác được lưu vết vào Audit Log.


## Sơ đồ Quy trình

```mermaid
graph TD
    A[Phát sinh yêu cầu vượt khung quy định] --> B[Nhân viên tạo phiếu Đề xuất trên CRM]
    B --> C{Điều phối theo Hạn mức}
    C -- Dưới 1 triệu --> D[Quản lý chi nhánh duyệt]
    C -- Trên 1 triệu --> E[Ban Giám Đốc duyệt]
    D --> F{Quyết định?}
    E --> F
    F -- Từ chối --> G[Hệ thống đóng băng giao dịch]
    F -- Đồng ý --> H[Mở khóa giao dịch & Ghi Audit Log]
    H --> I((Hoàn tất nghiệp vụ ngoại lệ))
    
    style A fill:#ffebee,stroke:#c62828,stroke-width:2px
    style B fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
    style H fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style I fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px

```
