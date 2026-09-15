# Trạm Micro:bit – Bài tập về nhà

Ứng dụng React + TypeScript + Vite chạy hoàn toàn ở phía trình duyệt. Không có backend, tài khoản, API dữ liệu hay database.

## Chạy local

```powershell
$nodeDir = (Resolve-Path '.tools\node-v24.21.0-win-x64').Path
$env:Path = "$nodeDir;$env:Path"
npm run dev
```

Mở `http://127.0.0.1:5173`.

## Cho máy khác trong cùng Wi-Fi truy cập

Máy đang chứa dự án chạy lệnh sau và cần được giữ bật:

```powershell
$nodeDir = (Resolve-Path '.tools\node-v24.21.0-win-x64').Path
$env:Path = "$nodeDir;$env:Path"
npm run dev:lan
```

Máy còn lại không cần cài công cụ build; chỉ mở địa chỉ `http://<IP-máy-chủ>:5173` bằng trình duyệt. Hai máy phải ở cùng mạng và Windows Firewall phải cho phép kết nối Private network tới Node.js/cổng 5173.

Nếu chép dự án sang một máy Windows không có Node/npm, hãy chép **nguyên thư mục** (gồm `.tools` và `node_modules`) rồi nhấp đúp `START_WEBSITE.cmd`. Không cần cài đặt thêm.

## Kiểm tra

```powershell
$nodeDir = (Resolve-Path '.tools\node-v24.21.0-win-x64').Path
$env:Path = "$nodeDir;$env:Path"
npm test
npm run build
npm run test:e2e
```

Node LTS portable đã được đặt trong `.tools` vì máy hiện không có Node trong `PATH`. Dependencies cũng đã được cài sẵn; chỉ cần chạy lại `npm install` khi `package.json` thay đổi.

MakeCode được nhúng bằng iframe controller chính thức của PXT và cần Internet. Nếu mạng hoặc chính sách trình duyệt chặn iframe, dùng nút mở MakeCode ở tab mới.

## Tự động đăng lên GitHub Pages

Workflow `.github/workflows/deploy-pages.yml` sẽ tự test, build và cập nhật Pages sau mỗi lần push lên nhánh `main`. Trong repository GitHub, vào **Settings → Pages → Build and deployment → Source** và chọn **GitHub Actions**. Link mặc định có dạng `https://TEN-TAI-KHOAN.github.io/TEN-REPOSITORY/`.
# testHomework
