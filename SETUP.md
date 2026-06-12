# ⚽ WC 2026 App — Hướng dẫn setup

## Dùng ngay (không cần setup)

Mở file `wc2026.html` trên trình duyệt là chạy được luôn với dữ liệu mẫu.
Dự đoán được lưu vào **localStorage** của trình duyệt.

---

## Kết nối Google Sheets (để dữ liệu dùng chung)

### Bước 1 — Tạo Google Sheets

Tạo file mới tại [sheets.google.com](https://sheets.google.com) với **3 sheet tabs**:

| Tab | Cột |
|-----|-----|
| `matches` | id, group, round, home, away, date, time, venue, homeScore, awayScore, status |
| `standings` | group, team, p, w, d, l, gf, ga, pts |
| `predictions` | (tự tạo bởi Apps Script) |

### Bước 2 — Publish CSV (để app đọc lịch thi đấu)

1. File → Share → Publish to web
2. Chọn tab `matches` → **Comma-separated values (.csv)**
3. Publish → Copy URL
4. Làm tương tự với tab `standings`
5. Dán 2 URL vào `wc2026.html`:
   ```javascript
   MATCHES_CSV_URL: 'https://docs.google.com/spreadsheets/d/...',
   STANDINGS_CSV_URL: 'https://docs.google.com/spreadsheets/d/...',
   USE_SAMPLE_DATA: false,  // Đổi thành false
   ```

### Bước 3 — Apps Script (để lưu dự đoán)

1. Mở Google Sheets → **Extensions → Apps Script**
2. Xóa code mặc định, dán nội dung file `google-apps-script.js`
3. **Deploy → New deployment**
   - Type: Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click Deploy → Copy **Web app URL**
5. Dán vào `wc2026.html`:
   ```javascript
   PREDICTIONS_SCRIPT_URL: 'https://script.google.com/macros/s/...',
   ```

### Bước 4 — Chia sẻ cho team

Đặt file `wc2026.html` lên:
- **GitHub Pages** (miễn phí, chỉ cần push lên repo public/private)
- **Netlify Drop**: kéo thả file vào [app.netlify.com/drop](https://app.netlify.com/drop)
- **Google Drive**: Share link, mở bằng Chrome

---

## Cập nhật kết quả trận đấu

Admin chỉ cần **cập nhật trực tiếp trên Google Sheets** cột `homeScore`, `awayScore`, `status`:
- `status`: `upcoming` | `live` | `finished`
- App tự reload dữ liệu mỗi lần refresh

---

## Tính năng hiện có

- 📅 **Lịch thi đấu** — 48 trận vòng bảng + knockout, lọc theo vòng đấu
- 📊 **BXH 12 bảng** (A–L) — tính tự động từ kết quả trận
- 🎯 **Dự đoán tỉ số** — lưu local, đồng bộ Google Sheets
- 🏆 Chấm điểm: đúng tỉ số = +3, đúng kết quả = +1
- Dark mode, mobile-first, PWA-ready
