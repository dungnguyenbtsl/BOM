# Security Policy

## Phạm vi

Tài liệu này áp dụng cho repository **BOM — Production Material Requirement Calculator** và phiên bản đang được triển khai tại:

- Repository: https://github.com/dungnguyenbtsl/BOM
- Demo: https://dungnguyenbtsl.github.io/BOM/

BOM hiện là một static web app xử lý dữ liệu Excel trực tiếp trên trình duyệt. Repository không cung cấp backend riêng để lưu trữ file BOM hoặc file đơn hàng.

## Các phiên bản được hỗ trợ

| Phiên bản | Trạng thái hỗ trợ |
|---|---|
| `main` | Được ưu tiên xử lý |
| GitHub Pages đang triển khai | Được kiểm tra khi có sự cố ảnh hưởng người dùng |
| Các commit hoặc fork cũ | Không đảm bảo hỗ trợ |

## Những vấn đề nên báo cáo riêng

Vui lòng báo cáo riêng nếu phát hiện:

- Lỗ hổng cho phép thực thi mã ngoài ý muốn.
- XSS hoặc HTML injection trong quá trình hiển thị dữ liệu Excel.
- Khả năng làm lộ dữ liệu file người dùng.
- Thư viện CDN bị khai thác hoặc bị thay thế.
- Thông tin đăng nhập, token, khóa API hoặc dữ liệu nhạy cảm bị commit.
- Cấu hình GitHub Actions hoặc GitHub Pages có thể bị lợi dụng.
- Cách gây lỗi nghiêm trọng cho ứng dụng thông qua file Excel độc hại.

## Những vấn đề không nên đăng công khai ngay

Không đăng chi tiết khai thác, file độc hại, dữ liệu khách hàng hoặc dữ liệu sản xuất thật trong issue công khai. Những nội dung này có thể khiến người dùng khác gặp rủi ro trước khi có bản sửa.

## Cách báo cáo

### Kênh ưu tiên

Nếu repository đã bật GitHub Security Advisories, hãy sử dụng:

**Repository → Security → Advisories → Report a vulnerability**

Kênh này phù hợp để trao đổi riêng với maintainer.

### Nếu chưa bật Security Advisories

Hãy liên hệ riêng với maintainer thông qua kênh được cung cấp trong hồ sơ GitHub hoặc trong quy trình nội bộ của dự án. Không đưa chi tiết lỗ hổng vào issue công khai.

Nếu không tìm được kênh liên hệ riêng, có thể mở một issue tối thiểu với nội dung:

```text
Security issue detected. Please contact me privately before public disclosure.
```

Không đưa payload, dữ liệu thật, thông tin khai thác hoặc hướng dẫn tái hiện chi tiết vào issue này.

## Nội dung nên cung cấp

Trong báo cáo riêng, nếu an toàn để chia sẻ, hãy cung cấp:

- Mô tả ngắn gọn vấn đề.
- Phiên bản, commit hoặc URL bị ảnh hưởng.
- Trình duyệt và hệ điều hành.
- Các bước tái hiện ở mức tối thiểu cần thiết.
- Tác động dự kiến.
- Ảnh chụp màn hình đã loại bỏ dữ liệu nhạy cảm.
- Đề xuất giảm thiểu hoặc bản vá nếu có.

Không gửi mật khẩu, token, khóa API hoặc file sản xuất thật.

## Quy trình xử lý dự kiến

Maintainer sẽ cố gắng:

1. Xác nhận đã nhận báo cáo trong thời gian hợp lý.
2. Kiểm tra và đánh giá mức độ ảnh hưởng.
3. Xác định phiên bản hoặc commit bị ảnh hưởng.
4. Chuẩn bị bản sửa hoặc biện pháp giảm thiểu.
5. Triển khai bản sửa khi phù hợp.
6. Thông báo kết quả và ghi nhận người báo cáo nếu họ đồng ý.

Thời gian xử lý có thể thay đổi tùy theo mức độ nghiêm trọng, khả năng tái hiện và phạm vi ảnh hưởng.

## Công bố lỗ hổng

Vui lòng không công bố chi tiết lỗ hổng trước khi maintainer có cơ hội đánh giá và phát hành bản sửa phù hợp.

Sau khi vấn đề được xử lý, maintainer có thể công bố thông tin ở mức cần thiết, đồng thời tránh tiết lộ dữ liệu cá nhân, dữ liệu sản xuất hoặc chi tiết có thể tiếp tục tạo rủi ro.

## Dữ liệu nhạy cảm bị commit

Nếu phát hiện file Excel thật, token, mật khẩu hoặc dữ liệu nhạy cảm trong Git:

1. Không tiếp tục chia sẻ link đến file đó.
2. Báo riêng cho maintainer.
3. Thu hồi hoặc thay thế thông tin truy cập bị lộ.
4. Đánh giá việc xóa dữ liệu khỏi lịch sử Git.
5. Kiểm tra các bản deploy, artifact và fork có thể đã chứa dữ liệu.

Chỉ xóa file ở commit mới là chưa đủ nếu dữ liệu vẫn còn trong lịch sử Git.

## Ghi nhận

Dự án cảm ơn những người báo cáo vấn đề bảo mật có trách nhiệm và cho maintainer thời gian xử lý trước khi công bố.

**Ngày cập nhật:** 2026-10-01
