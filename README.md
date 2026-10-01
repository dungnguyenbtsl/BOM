# BOM — Production Material Requirement Calculator

Công cụ web tĩnh dùng để tính toán và trình bày **nhu cầu vật liệu sản xuất theo SKU/model và đơn hàng** từ dữ liệu BOM định mức và danh sách đơn hàng Excel.

Ứng dụng được thiết kế cho quy trình sản xuất, đặc biệt là báo cáo vật liệu theo từng model, từng nhóm vật liệu và từng lệnh sản xuất.

> **Demo:** [Mở BOM Production Material Requirement Calculator](https://dungnguyenbtsl.github.io/BOM/)

## Mục lục

- [Giới thiệu](#bom--production-material-requirement-calculator)
- [Tính năng](#tính-năng)
- [Cách sử dụng](#cách-sử-dụng)
- [Định dạng file đầu vào](#định-dạng-file-đầu-vào)
- [Công thức tính](#công-thức-tính)
- [Luồng xử lý](#luồng-xử-lý)
- [Kiểm tra dữ liệu trước khi tạo báo cáo](#kiểm-tra-dữ-liệu-trước-khi-tạo-báo-cáo)
- [Kết quả đầu ra](#kết-quả-đầu-ra)
- [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)
- [Chạy local](#chạy-local)
- [Triển khai GitHub Pages](#triển-khai-github-pages)
- [Roadmap](#roadmap)
- [Đóng góp](#đóng-góp)

## Tính năng

- Đọc file định mức BOM từ `.xlsx` hoặc `.xls`.
- Đọc danh sách đơn hàng từ `.xlsx` hoặc `.xls`.
- Hỗ trợ lựa chọn thương hiệu:
  - KEEN
  - SAUCONY
  - KOLON
  - BLACKYAK
  - Thương hiệu tùy chỉnh
- Gom nhóm báo cáo theo SKU/model.
- Hiển thị mỗi SKU trên một trang riêng.
- Gom nhóm vật liệu theo mã vật liệu và màu sắc.
- Tính nhu cầu vật liệu dựa trên số lượng đôi và định mức tiêu hao.
- Hiển thị thông tin vật liệu:
  - Mã vật liệu
  - Tên vật liệu
  - Màu sắc
  - Nhà cung cấp
  - Đơn vị tính
  - Bộ phận sử dụng
- In báo cáo theo khổ A4 ngang.
- Xuất báo cáo ra Excel.
- Xuất báo cáo ra Word `.docx`.
- Xử lý dữ liệu trực tiếp trên trình duyệt; file Excel không cần tải lên máy chủ.

## Cách sử dụng

1. Mở [ứng dụng BOM](https://dungnguyenbtsl.github.io/BOM/).
2. Chọn thương hiệu hoặc nhập thương hiệu tùy chỉnh.
3. Tải lên file **định mức BOM**.
4. Tải lên file **đơn hàng**.
5. Nhấn **Generate / 生成報表** để tạo báo cáo.
6. Kiểm tra kết quả theo từng SKU/model.
7. Chọn một trong các thao tác:
   - **Export Excel** để xuất file `.xlsx`.
   - **Export Word** để xuất file `.docx`.
   - **Print** để in báo cáo theo khổ A4 ngang.

Ứng dụng sử dụng sheet đầu tiên trong mỗi workbook Excel.

## Định dạng file đầu vào

### 1. File định mức BOM

Ứng dụng đọc dữ liệu từ dòng thứ hai trở đi; dòng đầu tiên được xem là dòng tiêu đề. Các cột được đọc theo **vị trí cột**, bắt đầu từ cột A:

| Vị trí | Trường | Mô tả |
|---|---|---|
| A | `model` | SKU/model hoặc mã kiểu sản phẩm |
| F | `component` | Bộ phận sử dụng |
| G | `materialCode` | Mã vật liệu |
| H | `materialName` | Tên vật liệu |
| I hoặc J | `unit` | Đơn vị tính; ưu tiên cột J, nếu trống dùng cột I |
| K | `color` | Màu sắc vật liệu |
| M | `vendor` | Nhà cung cấp |
| N | `rate` | Định mức tiêu hao cho một đôi |

Các cột B–E và L hiện không được sử dụng trực tiếp trong quá trình tính toán nhưng vẫn có thể tồn tại trong file nguồn để giữ nguyên cấu trúc dữ liệu doanh nghiệp.

Ví dụ cấu trúc tối thiểu:

```text
| Model | ... | Component | Material Code | Material Name | Unit | Color | ... | Vendor | Rate |
|-------|-----|-----------|---------------|---------------|------|-------|-----|--------|------|
| K001  | ... | Upper     | MAT-001       | Mesh          | Yard | Black | ... | Vendor A | 0.85 |
```

> Lưu ý: do chương trình đọc theo vị trí cột, không nên thay đổi thứ tự các cột đang được sử dụng.

### 2. File đơn hàng

Ứng dụng đọc dữ liệu từ dòng thứ hai trở đi; dòng đầu tiên được xem là dòng tiêu đề.

| Vị trí | Trường | Mô tả |
|---|---|---|
| A | `model` | SKU/model, dùng để liên kết với file BOM |
| B | `order` | Mã đơn hàng hoặc lệnh sản xuất |
| C | `pairs` | Số lượng đôi cần sản xuất |

Ví dụ:

```text
| Model | Production Order | Pairs |
|--------|------------------|-------|
| K001   | PO-2026-0001     | 1200  |
| K001   | PO-2026-0002     | 800   |
| K002   | PO-2026-0003     | 500   |
```

## Công thức tính

Với mỗi vật liệu và mỗi đơn hàng:

```text
Nhu cầu vật liệu = Số lượng đôi × Định mức tiêu hao
```

Tổng nhu cầu của một vật liệu trong một SKU/model được tính bằng tổng nhu cầu từ tất cả các đơn hàng tương ứng.

## Luồng xử lý

```text
File BOM Excel + File đơn hàng Excel
                │
                ▼
       Đọc dữ liệu trên trình duyệt
                │
                ▼
       Ghép theo SKU/model
                │
                ▼
  Gom nhóm theo mã vật liệu và màu sắc
                │
                ▼
      Tính nhu cầu vật liệu
                │
                ▼
   Báo cáo theo SKU / In / Excel / Word
```

## Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript thuần
- [SheetJS](https://github.com/SheetJS/sheetjs) — đọc và xuất file Excel
- [html-docx-js](https://github.com/evidenceprime/html-docx-js) — tạo file Word từ HTML
- GitHub Pages — triển khai ứng dụng tĩnh
- GitHub Actions — tự động deploy nội dung tĩnh

## Quyền riêng tư và bảo mật dữ liệu

Ứng dụng xử lý file Excel bằng JavaScript ngay trên trình duyệt. Không có backend riêng trong repo này và file đầu vào không được gửi lên server của ứng dụng.

Tuy vậy, người dùng vẫn nên:

- Không đưa dữ liệu khách hàng hoặc dữ liệu nhạy cảm vào repo công khai.
- Không commit file Excel thật vào Git.
- Sử dụng dữ liệu mẫu đã ẩn hoặc thay thế thông tin nhạy cảm khi chia sẻ dự án.
- Kiểm tra chính sách bảo mật của các CDN bên ngoài nếu sử dụng trong môi trường doanh nghiệp.

## Giới hạn hiện tại

- Chỉ xử lý sheet đầu tiên của mỗi file Excel.
- Cấu trúc dữ liệu đầu vào phụ thuộc vào vị trí cột.
- Chưa có backend, tài khoản người dùng hoặc phân quyền.
- Chưa có cơ chế lưu lịch sử báo cáo trên máy chủ.
- Kết quả phụ thuộc vào chất lượng và tính nhất quán của dữ liệu BOM/đơn hàng.
- Các thư viện bên ngoài hiện được tải qua CDN nên cần kết nối mạng khi mở ứng dụng lần đầu.
- Đây là công cụ báo cáo vật liệu, không phải hệ thống ERP đầy đủ.

## Chạy local

Vì đây là ứng dụng HTML/CSS/JavaScript tĩnh, có thể chạy bằng một web server đơn giản:

```bash
git clone https://github.com/dungnguyenbtsl/BOM.git
cd BOM
python3 -m http.server 8000
```

Sau đó mở:

```text
http://localhost:8000
```

Mở trực tiếp file `index.html` cũng có thể hoạt động trong nhiều trình duyệt, nhưng chạy qua web server local được khuyến nghị để có môi trường ổn định hơn.

## Cấu trúc repository

```text
BOM/
├── index.html              # Giao diện, CSS và logic xử lý chính
├── assets/logo.jpeg       # Logo local dùng cho giao diện và social preview
├── robots.txt              # Quy tắc crawler và liên kết sitemap
├── sitemap.xml             # Sitemap cho trang public
├── README.md               # Tài liệu dự án
├── LICENSE                # MIT License
├── CONTRIBUTING.md        # Hướng dẫn đóng góp
├── CODE_OF_CONDUCT.md     # Quy tắc ứng xử
├── SECURITY.md            # Chính sách bảo mật
└── .github/
    ├── ISSUE_TEMPLATE/    # Mẫu issue báo lỗi và đề xuất
    ├── scripts/           # Script kiểm tra CI
    └── workflows/         # CI và triển khai GitHub Pages
```

## Đóng góp

Nếu muốn đề xuất cải tiến hoặc báo lỗi:

1. Kiểm tra các issue hiện có.
2. Tạo issue mới với:
   - Mô tả vấn đề.
   - Các bước tái hiện.
   - Cấu trúc dữ liệu mẫu không chứa thông tin nhạy cảm.
   - Ảnh chụp màn hình nếu có.
3. Nếu gửi pull request, vui lòng mô tả rõ thay đổi và ảnh hưởng đến quy trình in/xuất báo cáo.

## License

Dự án được phát hành theo [MIT License](LICENSE). Bạn có thể sử dụng, sao chép, chỉnh sửa, phân phối và cấp phép lại mã nguồn với điều kiện giữ lại thông báo bản quyền và nội dung license.

> Nếu mã nguồn hoặc tài sản thương hiệu thuộc quyền sở hữu của công ty, hãy xác nhận chủ thể bản quyền trước khi phân phối công khai.

## Quản trị dự án

Các tài liệu dành cho cộng đồng và người duy trì dự án:

- [CONTRIBUTING.md](CONTRIBUTING.md) — quy trình branch, commit, kiểm thử và pull request.
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — quy tắc ứng xử trong cộng đồng.
- [SECURITY.md](SECURITY.md) — cách báo cáo vấn đề bảo mật riêng tư.
- [Issue templates](.github/ISSUE_TEMPLATE/) — mẫu báo lỗi và đề xuất tính năng.
- [LICENSE](LICENSE) — quyền sử dụng và phân phối mã nguồn.

## Tác giả

**dungnguyenbtsl**

- Repository: [github.com/dungnguyenbtsl/BOM](https://github.com/dungnguyenbtsl/BOM)
- Demo: [dungnguyenbtsl.github.io/BOM](https://dungnguyenbtsl.github.io/BOM/)


## Trạng thái dự án

[![CI](https://github.com/dungnguyenbtsl/BOM/actions/workflows/ci.yml/badge.svg)](https://github.com/dungnguyenbtsl/BOM/actions/workflows/ci.yml)
![Status](https://img.shields.io/badge/status-active-success)
![Deployment](https://img.shields.io/badge/deployment-GitHub%20Pages-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Language](https://img.shields.io/badge/language-JavaScript-yellow)

> Đây là ứng dụng nội bộ dạng static web app. Chức năng chính hiện tại là đọc dữ liệu Excel, tính nhu cầu vật liệu và xuất báo cáo phục vụ kiểm tra/in ấn.

## Ảnh minh họa

Nên bổ sung ảnh chụp màn hình thực tế vào thư mục `docs/images/`, sau đó cập nhật các đường dẫn dưới đây:

```text
docs/
└── images/
    ├── bom-input-files.png
    ├── bom-generated-report.png
    └── bom-export-options.png
```

Ví dụ chèn ảnh vào README:

```markdown
![Màn hình tạo báo cáo BOM](docs/images/bom-generated-report.png)
```

Khuyến nghị sử dụng ảnh đã che hoặc thay thế các mã đơn hàng, SKU, tên khách hàng và thông tin sản xuất nhạy cảm.

## Quy trình nghiệp vụ đề xuất

### Trước khi tạo báo cáo

1. Xác nhận file BOM là phiên bản mới nhất.
2. Kiểm tra file đơn hàng thuộc đúng thương hiệu và kỳ sản xuất.
3. Kiểm tra mã model trong hai file sử dụng cùng một quy ước viết.
4. Kiểm tra định mức có đơn vị tính và tỷ lệ tiêu hao hợp lệ.
5. Sao lưu file nguồn trước khi xử lý nếu đây là báo cáo chính thức.

### Khi tạo báo cáo

1. Chọn thương hiệu.
2. Tải file BOM.
3. Tải file đơn hàng.
4. Nhấn nút tạo báo cáo.
5. Kiểm tra các model không tìm thấy định mức.
6. Đối chiếu tổng số đôi với file đơn hàng gốc.
7. Kiểm tra một vài vật liệu mẫu bằng phép tính thủ công.

### Sau khi tạo báo cáo

1. Xác nhận mỗi SKU/model nằm trên trang riêng.
2. Kiểm tra tổng nhu cầu theo vật liệu.
3. Xuất Excel để lưu trữ và xử lý tiếp nếu cần.
4. Xuất Word hoặc in PDF từ hộp thoại in nếu cần gửi/xác nhận.
5. Ghi nhận ngày tạo báo cáo và phiên bản file đầu vào trong quy trình nội bộ.

## Kiểm tra dữ liệu trước khi tạo báo cáo

### File BOM

- Dòng đầu tiên là tiêu đề.
- Cột A phải có `model`.
- Cột G nên có mã vật liệu.
- Cột H nên có tên vật liệu.
- Cột N phải là số hoặc có thể chuyển đổi thành số.
- Mỗi model cần có ít nhất một dòng định mức.
- Không nên có khoảng trắng thừa ở đầu/cuối mã model.
- Không nên trộn nhiều quy ước mã model cho cùng một sản phẩm.

### File đơn hàng

- Dòng đầu tiên là tiêu đề.
- Cột A phải khớp với `model` trong file BOM.
- Cột B phải có mã đơn hàng hoặc lệnh sản xuất.
- Cột C phải là số lượng đôi.
- Số lượng âm hoặc giá trị không phải số sẽ không tạo ra kết quả hợp lệ.
- Các dòng trống nên được loại bỏ trước khi tải file.

## Kết quả đầu ra

### Báo cáo trên màn hình

Báo cáo được nhóm theo model/SKU. Mỗi model hiển thị:

- Tên thương hiệu.
- Model/SKU.
- Danh sách các đơn hàng liên quan.
- Số lượng đôi của từng đơn hàng.
- Các nhóm vật liệu.
- Mã, tên, màu và nhà cung cấp vật liệu.
- Định mức tiêu hao.
- Nhu cầu vật liệu theo từng đơn hàng.
- Tổng nhu cầu vật liệu theo model.

### File Excel

File Excel được tạo theo từng trang báo cáo/model. Tên file mặc định:

```text
生產用料明細計算表_按SKU.xlsx
```

Excel phù hợp để:

- Lọc và kiểm tra dữ liệu.
- Gửi cho bộ phận kế hoạch hoặc kho.
- Lưu trữ làm hồ sơ sản xuất.
- Tiếp tục xử lý trong các công cụ bảng tính.

### File Word

File Word được tạo từ nội dung báo cáo HTML. Tên file mặc định:

```text
生產用料明細計算表_按SKU.docx
```

Word phù hợp khi cần chỉnh sửa nhẹ bố cục, thêm ghi chú hoặc gửi báo cáo theo quy trình văn phòng.

### Bản in

Bản in được tối ưu cho:

- Khổ giấy A4 ngang.
- Mỗi SKU/model trên một trang riêng.
- Ẩn khu vực điều khiển khi in.
- Giữ lại bảng vật liệu và thông tin tổng hợp.

Khi in, nên kiểm tra trước:

- Tỷ lệ scale của trình duyệt.
- Khổ giấy A4.
- Hướng giấy ngang.
- Tùy chọn in background nếu cần giữ màu tiêu đề.
- Header/footer mặc định của trình duyệt.

## Xử lý lỗi thường gặp

| Hiện tượng | Nguyên nhân có thể | Cách xử lý |
|---|---|---|
| Không tạo được báo cáo | Chưa tải file BOM | Chọn file BOM rồi thử lại |
| Không có đơn hàng | Chưa tải file đơn hàng hoặc dữ liệu không hợp lệ | Kiểm tra cột A–C của file đơn hàng |
| Model không có định mức | Mã model giữa hai file không khớp | Kiểm tra khoảng trắng, chữ hoa/chữ thường và mã sản phẩm |
| Nhu cầu vật liệu bằng 0 | Định mức ở cột N không phải số | Chuyển định mức sang dạng số trong Excel |
| Không đọc được Excel | File lỗi hoặc định dạng không được hỗ trợ | Mở lại file bằng Excel rồi lưu thành `.xlsx` |
| Không xuất được Word | CDN của `html-docx-js` không truy cập được | Kiểm tra kết nối mạng và tải lại trang |
| Không thấy logo | Link logo ngoài không truy cập được | Kiểm tra kết nối hoặc chuyển logo vào repo hiện tại |
| Bảng in bị tràn | Dữ liệu quá dài hoặc trình duyệt scale không phù hợp | Chọn A4 ngang và điều chỉnh tỷ lệ in |
| Ký tự tiếng Trung bị lỗi | Font không có sẵn trên máy | Cài font phù hợp hoặc bổ sung font dự phòng |

## Kiểm thử thủ công đề xuất

Trước mỗi lần phát hành phiên bản mới, nên kiểm tra tối thiểu các trường hợp sau:

- File BOM có một model và một vật liệu.
- File BOM có một model với nhiều vật liệu.
- Một model có nhiều đơn hàng.
- Nhiều model dùng chung một file đơn hàng.
- Model trong đơn hàng không tồn tại trong BOM.
- Định mức bằng `0`.
- Số lượng đơn hàng lớn.
- Tên vật liệu có ký tự tiếng Trung, tiếng Việt hoặc ký tự đặc biệt.
- Mã vật liệu trùng nhưng khác màu.
- Xuất Excel sau khi tạo báo cáo.
- Xuất Word sau khi tạo báo cáo.
- In báo cáo có nhiều model.
- Mở ứng dụng trên màn hình nhỏ.

## Quy ước phát triển

### Đặt tên commit

Nên sử dụng commit message mô tả rõ thay đổi:

```text
feat: add custom brand input
fix: handle missing BOM model
refactor: separate material grouping logic
style: improve A4 print layout
docs: update Excel input format
chore: update CDN dependency
```

### Quy trình pull request

Một pull request nên bao gồm:

- Mục tiêu của thay đổi.
- Mô tả các file đã chỉnh sửa.
- Ảnh trước/sau nếu thay đổi giao diện.
- Cách kiểm thử.
- Ảnh hưởng đến định dạng Excel hoặc bản in.
- Xác nhận không đưa dữ liệu sản xuất thật vào commit.

## Đa ngôn ngữ

Ứng dụng hỗ trợ chuyển đổi giao diện giữa ba ngôn ngữ:

- **繁體中文** — ngôn ngữ mặc định.
- **Tiếng Việt**.
- **English**.

Chọn ngôn ngữ trong danh sách `Language` ở thanh điều khiển. Lựa chọn được lưu trong trình duyệt bằng `localStorage` và áp dụng cho nhãn giao diện, thông báo lỗi, báo cáo được tạo, tên file Excel/Word và metadata SEO. Dữ liệu BOM và đơn hàng vẫn được xử lý hoàn toàn ở phía trình duyệt.

## SEO và hiệu năng

Trang public sử dụng canonical URL `https://dungnguyenbtsl.github.io/BOM/`, metadata Open Graph/Twitter Card, `robots.txt` và `sitemap.xml`. Logo được lưu local trong `assets/logo.jpeg` để tránh phụ thuộc cross-repository. Các thư viện Excel/Word được tải bằng `defer` để giảm chặn render ban đầu.

Ứng dụng vẫn xử lý dữ liệu Excel ở phía trình duyệt; dữ liệu người dùng không được đưa vào sitemap hoặc metadata public.

## Continuous Integration (CI)

Workflow [CI](.github/workflows/ci.yml) tự động chạy khi có push lên `main`, Pull Request vào `main` hoặc khi được kích hoạt thủ công. CI hiện kiểm tra:

- Các file tài liệu và cấu hình bắt buộc có tồn tại và không rỗng.
- Cấu trúc HTML cơ bản của `index.html`.
- Cú pháp JavaScript inline bằng Node.js.
- Không có file credential hoặc file Excel dữ liệu sản xuất trong repository.
- Các liên kết nội bộ trong README trỏ đến file tồn tại.

Script kiểm tra nằm tại [.github/scripts/validate_repo.py](.github/scripts/validate_repo.py). Workflow CI chỉ kiểm tra mã nguồn; workflow deploy Pages vẫn chịu trách nhiệm triển khai ứng dụng.

## Triển khai GitHub Pages

Repository này có thể được triển khai dưới dạng static site bằng GitHub Pages.

Các bước kiểm tra:

1. Vào **Settings → Pages** trong repository.
2. Kiểm tra source đang dùng branch `main` và thư mục `/root`.
3. Kiểm tra workflow deploy hoàn tất trong tab **Actions**.
4. Mở URL:

```text
https://dungnguyenbtsl.github.io/BOM/
```

Khi cập nhật `index.html` trên branch `main`, GitHub Actions sẽ triển khai lại phiên bản mới theo cấu hình workflow hiện tại.

## Cấu hình CDN

Ứng dụng hiện sử dụng các thư viện bên ngoài:

- SheetJS từ cdnjs.
- html-docx-js từ jsDelivr.
- Logo từ GitHub Pages của repo FULIAO-LABEL.

Đối với môi trường doanh nghiệp hoặc mạng nội bộ, nên cân nhắc:

- Pin phiên bản thư viện rõ ràng.
- Lưu bản thư viện vào thư mục `vendor/`.
- Dùng Subresource Integrity nếu CDN hỗ trợ.
- Đưa logo vào cùng repository.
- Có phương án hoạt động khi không có Internet.

## Roadmap

### Ngắn hạn

- [ ] Bổ sung bản README tiếng Anh nếu cần chia sẻ rộng rãi.
- [ ] Thêm file Excel mẫu đã ẩn dữ liệu nhạy cảm.
- [ ] Thêm ảnh chụp màn hình vào thư mục `docs/images/`.
- [ ] Tách CSS và JavaScript khỏi `index.html`.
- [ ] Hiển thị danh sách model không tìm thấy trong BOM.
- [ ] Thêm kiểm tra rõ ràng cho định mức và số lượng âm.
- [ ] Đưa logo vào repository hiện tại.

### Trung hạn

- [ ] Cho phép chọn sheet Excel thay vì luôn dùng sheet đầu tiên.
- [ ] Cho phép ánh xạ cột bằng giao diện.
- [ ] Thêm xem trước dữ liệu trước khi tạo báo cáo.
- [ ] Thêm tổng hợp vật liệu cho nhiều model.
- [ ] Thêm thông tin ngày tạo và người lập báo cáo.
- [ ] Thêm chế độ xuất PDF ổn định hơn.
- [ ] Thêm bộ test cho các hàm tính toán chính.

### Dài hạn

- [ ] Tách logic tính toán thành module JavaScript riêng.
- [ ] Xây dựng schema dữ liệu chuẩn cho BOM và đơn hàng.
- [ ] Thêm lịch sử phiên bản định mức.
- [ ] Thêm phân quyền nếu chuyển sang mô hình có backend.
- [ ] Tích hợp với hệ thống ERP hoặc cơ sở dữ liệu nội bộ.
- [ ] Thêm audit log cho các báo cáo chính thức.

## Câu hỏi thường gặp

### Ứng dụng có cần cài đặt không?

Không. Ứng dụng chạy trên trình duyệt và có thể dùng trực tiếp từ GitHub Pages.

### Dữ liệu Excel có bị tải lên Internet không?

Theo thiết kế hiện tại, file được đọc và xử lý bằng JavaScript trên trình duyệt. Repository không cung cấp backend để nhận file. Tuy nhiên, người dùng vẫn nên kiểm tra môi trường trình duyệt và chính sách mạng nội bộ trước khi xử lý dữ liệu nhạy cảm.

### Có thể dùng file CSV không?

Phiên bản hiện tại hiển thị bộ chọn file cho `.xlsx` và `.xls`. Khuyến nghị sử dụng Excel workbook đúng định dạng được mô tả trong README.

### Có thể dùng nhiều sheet trong một file không?

Hiện tại ứng dụng chỉ đọc sheet đầu tiên của workbook.

### Có thể thay đổi thứ tự cột không?

Không nên. Logic hiện tại đọc các trường theo vị trí cột cố định. Nếu thay đổi thứ tự cột, kết quả có thể sai.

### Vì sao model không xuất hiện trong báo cáo?

Thông thường do mã model trong file đơn hàng không khớp với mã model trong file BOM, hoặc dòng dữ liệu bị thiếu giá trị bắt buộc.

## Nhật ký thay đổi

Các thay đổi quan trọng nên được ghi theo mẫu sau:

```markdown
## [Unreleased]

### Added
- Mô tả tính năng mới.

### Changed
- Mô tả thay đổi hành vi hoặc giao diện.

### Fixed
- Mô tả lỗi đã sửa.

### Known issues
- Mô tả vấn đề còn tồn tại.
```

## Phiên bản tài liệu

- **README version:** 1.0
- **Cập nhật:** 2026-10-01
- **Phạm vi:** Hướng dẫn sử dụng và vận hành repo BOM hiện tại
