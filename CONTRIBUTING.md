# Contributing to BOM

Cảm ơn bạn đã quan tâm và muốn đóng góp cho **BOM — Production Material Requirement Calculator**.

BOM là một ứng dụng web tĩnh hỗ trợ đọc dữ liệu định mức, danh sách đơn hàng, tính nhu cầu vật liệu và tạo báo cáo theo SKU/model. Mọi đóng góp nên ưu tiên tính chính xác của dữ liệu, khả năng in ấn và sự ổn định của quy trình sản xuất.

## Mục lục

- [Nguyên tắc đóng góp](#nguyên-tắc-đóng-góp)
- [Bắt đầu phát triển](#bắt-đầu-phát-triển)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Tạo branch](#tạo-branch)
- [Quy ước commit](#quy-ước-commit)
- [Báo lỗi](#báo-lỗi)
- [Đề xuất tính năng](#đề-xuất-tính-năng)
- [Pull request](#pull-request)
- [Kiểm thử](#kiểm-thử)
- [Dữ liệu và quyền riêng tư](#dữ-liệu-và-quyền-riêng-tư)
- [Checklist trước khi gửi](#checklist-trước-khi-gửi)

## Nguyên tắc đóng góp

Khi đóng góp cho repository, vui lòng ưu tiên:

1. **Tính chính xác:** Không làm sai công thức tính hoặc tổng nhu cầu vật liệu.
2. **Khả năng truy vết:** Thay đổi quan trọng phải có commit message và mô tả rõ ràng.
3. **Tương thích dữ liệu:** Không tự ý thay đổi vị trí các cột Excel đang được sử dụng.
4. **Khả năng in:** Kiểm tra lại khổ A4 ngang và bố cục nhiều trang.
5. **Bảo mật:** Không đưa dữ liệu sản xuất thật, thông tin khách hàng hoặc thông tin nhạy cảm vào repository.
6. **Đơn giản:** Ưu tiên giải pháp dễ vận hành trên trình duyệt, không thêm phụ thuộc không cần thiết.

## Bắt đầu phát triển

### Yêu cầu

- Git
- Python 3 hoặc một web server tĩnh tương đương
- Trình duyệt hiện đại như Chrome, Edge, Firefox hoặc Safari

### Clone repository

```bash
git clone https://github.com/dungnguyenbtsl/BOM.git
cd BOM
```

### Chạy local

```bash
python3 -m http.server 8000
```

Mở trình duyệt tại:

```text
http://localhost:8000
```

Không cần cài đặt backend hoặc cơ sở dữ liệu để chạy phiên bản hiện tại.

## Cấu trúc dự án

Phiên bản hiện tại là static web app đơn giản:

```text
BOM/
├── index.html       # Giao diện, CSS và logic xử lý chính
├── README.md        # Tài liệu dự án
├── CONTRIBUTING.md  # Hướng dẫn đóng góp
├── CODE_OF_CONDUCT.md
└── .github/
    └── workflows/   # Cấu hình triển khai GitHub Pages
```

Nếu tách mã nguồn trong tương lai, nên ưu tiên cấu trúc:

```text
src/
├── css/
├── js/
└── templates/
assets/
docs/
tests/
```

## Tạo branch

Không nên phát triển trực tiếp trên branch `main`. Tạo branch mới từ `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/ten-tinh-nang
```

Quy ước đặt tên branch:

| Loại thay đổi | Prefix | Ví dụ |
|---|---|---|
| Tính năng mới | `feat/` | `feat/excel-column-mapping` |
| Sửa lỗi | `fix/` | `fix/missing-model-warning` |
| Refactor | `refactor/` | `refactor/material-calculation` |
| Giao diện | `style/` | `style/improve-print-layout` |
| Tài liệu | `docs/` | `docs/update-input-format` |
| Công việc bảo trì | `chore/` | `chore/update-dependencies` |

Tên branch nên ngắn, viết bằng tiếng Anh và mô tả đúng phạm vi thay đổi.

## Quy ước commit

Sử dụng commit message ngắn, ở thể mệnh lệnh và mô tả đúng thay đổi:

```text
feat: add custom brand input
fix: handle missing BOM model
refactor: separate material grouping logic
style: improve A4 print layout
docs: update Excel input format
chore: update CDN dependency
```

Mỗi commit nên tập trung vào một mục đích. Tránh các message quá chung chung như:

```text
Update index.html
Fix stuff
Changes
Final version
```

Nếu thay đổi ảnh hưởng đến công thức hoặc schema Excel, commit message và pull request cần nêu rõ ảnh hưởng đó.

## Báo lỗi

Trước khi tạo issue, hãy kiểm tra:

- Issue tương tự đã tồn tại chưa.
- Lỗi có tái hiện được trên phiên bản mới nhất không.
- Lỗi có liên quan đến file Excel đầu vào hoặc trình duyệt cụ thể không.

Một issue tốt nên bao gồm:

- Tiêu đề ngắn gọn.
- Mô tả kết quả thực tế.
- Kết quả mong đợi.
- Các bước tái hiện.
- Trình duyệt và hệ điều hành.
- Phiên bản hoặc commit đang sử dụng.
- Ảnh chụp màn hình nếu lỗi liên quan đến giao diện/in ấn.
- File mẫu đã ẩn dữ liệu nhạy cảm nếu cần.

Không đính kèm file Excel thật chứa dữ liệu sản xuất, khách hàng, giá, nhà cung cấp hoặc thông tin nội bộ.

## Đề xuất tính năng

Một đề xuất tính năng nên giải thích:

1. Vấn đề nghiệp vụ cần giải quyết.
2. Người dùng nào sẽ hưởng lợi.
3. Luồng sử dụng dự kiến.
4. Ảnh hưởng đến file BOM, file đơn hàng và báo cáo hiện tại.
5. Ảnh hưởng đến bản in hoặc xuất Excel/Word.
6. Có cần thay đổi cấu trúc dữ liệu hay không.

Các đề xuất làm thay đổi công thức tính hoặc vị trí cột Excel cần được xem xét đặc biệt để tránh ảnh hưởng đến quy trình đang sử dụng.

## Pull request

### Trước khi mở pull request

- Đồng bộ branch với `main`.
- Kiểm tra thay đổi trên trình duyệt.
- Kiểm tra ít nhất một file BOM mẫu và một file đơn hàng mẫu.
- Kiểm tra kết quả trên màn hình.
- Kiểm tra Excel, Word và thao tác in nếu thay đổi ảnh hưởng đến đầu ra.
- Cập nhật README hoặc tài liệu liên quan nếu hành vi sử dụng thay đổi.
- Xóa dữ liệu thật, file tạm và thông tin nhạy cảm.

### Nội dung pull request

Pull request nên có:

- Tóm tắt thay đổi.
- Lý do thay đổi.
- Các bước kiểm thử.
- Ảnh chụp trước/sau nếu có thay đổi UI.
- Tác động đến schema Excel hoặc công thức tính.
- Danh sách issue liên quan nếu có.
- Các giới hạn hoặc việc cần làm tiếp theo.

Mẫu mô tả:

```markdown
## Mục tiêu
Mô tả vấn đề cần giải quyết.

## Thay đổi
- Thay đổi 1
- Thay đổi 2

## Kiểm thử
- [ ] Tạo báo cáo với một model
- [ ] Tạo báo cáo với nhiều model
- [ ] Kiểm tra model không có trong BOM
- [ ] Xuất Excel
- [ ] Xuất Word
- [ ] In A4 ngang

## Ảnh hưởng dữ liệu
Mô tả thay đổi đối với cấu trúc file đầu vào, nếu có.

## Ghi chú
Các giới hạn hoặc công việc tiếp theo.
```

Maintainer có thể yêu cầu chỉnh sửa trước khi merge nếu thay đổi chưa đủ rõ, chưa kiểm thử hoặc có nguy cơ ảnh hưởng đến báo cáo sản xuất.

## Kiểm thử

Hiện tại dự án chủ yếu sử dụng kiểm thử thủ công trên trình duyệt.

### Các trường hợp tối thiểu

- File BOM hợp lệ với một model.
- File BOM có nhiều vật liệu.
- Một model có nhiều đơn hàng.
- Nhiều model trong cùng một file đơn hàng.
- Model trong đơn hàng không tồn tại trong BOM.
- Định mức bằng 0 hoặc bị thiếu.
- Số lượng đôi lớn.
- Vật liệu có ký tự tiếng Việt, tiếng Trung và ký tự đặc biệt.
- Mã vật liệu giống nhau nhưng khác màu.
- Xuất Excel.
- Xuất Word.
- In nhiều trang A4 ngang.
- Mở trên màn hình nhỏ.

### Kiểm tra công thức

Với dữ liệu mẫu, hãy kiểm tra thủ công:

```text
Nhu cầu vật liệu = Số đôi × Định mức
```

Ví dụ:

```text
800 đôi × 0,85 yard/đôi = 680 yard
```

Kết quả trên ứng dụng phải khớp với phép tính kiểm tra độc lập.

## Dữ liệu và quyền riêng tư

Repository công khai không được chứa:

- File BOM thật.
- File đơn hàng thật.
- Tên khách hàng hoặc nhà cung cấp nhạy cảm.
- Giá thành, định mức nội bộ hoặc thông tin thương mại mật.
- Ảnh chụp màn hình có dữ liệu sản xuất thật.
- Khóa API, token, mật khẩu hoặc thông tin đăng nhập.

Khi cần chia sẻ dữ liệu để tái hiện lỗi:

1. Tạo file mẫu tối thiểu.
2. Thay mã sản phẩm bằng dữ liệu giả lập.
3. Xóa hoặc thay tên công ty, khách hàng và nhà cung cấp.
4. Kiểm tra lại nội dung trước khi commit hoặc đính kèm issue.

Nếu phát hiện thông tin nhạy cảm đã bị commit, không chỉ xóa file ở commit mới. Hãy báo ngay cho maintainer để đánh giá việc xóa khỏi lịch sử Git và thay đổi thông tin truy cập nếu cần.

## Phụ thuộc bên ngoài

Ứng dụng hiện sử dụng thư viện từ CDN. Khi thay đổi thư viện:

- Ghi rõ tên và phiên bản.
- Kiểm tra khả năng tương thích với trình duyệt mục tiêu.
- Kiểm tra đọc và xuất Excel.
- Kiểm tra xuất Word.
- Cân nhắc tác động khi môi trường không có Internet.
- Cập nhật README nếu cách triển khai thay đổi.

## Checklist trước khi gửi

- [ ] Branch được tạo từ `main` mới nhất.
- [ ] Branch có tên theo quy ước.
- [ ] Commit message mô tả đúng thay đổi.
- [ ] Không có dữ liệu nhạy cảm trong thay đổi.
- [ ] Không có file tạm hoặc file Excel thật được commit.
- [ ] Đã kiểm tra trên trình duyệt hiện đại.
- [ ] Đã kiểm tra với file BOM mẫu.
- [ ] Đã kiểm tra với file đơn hàng mẫu.
- [ ] Đã kiểm tra model không có định mức.
- [ ] Đã kiểm tra kết quả tính toán.
- [ ] Đã kiểm tra bố cục in nếu có thay đổi UI/CSS.
- [ ] Đã cập nhật tài liệu nếu cần.
- [ ] Pull request có mô tả và bước kiểm thử rõ ràng.

## Liên hệ

Nếu vấn đề liên quan đến dữ liệu sản xuất hoặc quy trình vận hành, hãy trao đổi với maintainer trước khi thay đổi công thức, schema Excel hoặc bố cục báo cáo.

Repository: [github.com/dungnguyenbtsl/BOM](https://github.com/dungnguyenbtsl/BOM)
