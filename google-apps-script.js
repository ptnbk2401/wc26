/**
 * WC 2026 — Google Apps Script
 * Dán code này vào Google Apps Script để nhận dự đoán từ app
 *
 * Cách setup:
 * 1. Mở Google Sheets của bạn
 * 2. Extensions → Apps Script
 * 3. Xóa code cũ, dán code này vào
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy URL và dán vào CONFIG.PREDICTIONS_SCRIPT_URL trong wc2026.html
 */

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('predictions');

    // Tạo sheet predictions nếu chưa có
    if (!sheet) {
      sheet = ss.insertSheet('predictions');
      sheet.appendRow(['Thời gian', 'Tên', 'Match ID', 'Trận đấu', 'Dự đoán nhà', 'Dự đoán khách']);
      sheet.setFrozenRows(1);
      // Format header
      const header = sheet.getRange(1, 1, 1, 6);
      header.setBackground('#1a2035').setFontColor('#d4a017').setFontWeight('bold');
    }

    const data = JSON.parse(e.postData.contents);

    // Kiểm tra nếu đã dự đoán trận này rồi thì cập nhật
    const allData = sheet.getDataRange().getValues();
    let updated = false;
    for (let i = 1; i < allData.length; i++) {
      if (allData[i][1] === data.name && allData[i][2] === data.matchId) {
        sheet.getRange(i + 1, 1, 1, 6).setValues([[
          new Date(data.ts), data.name, data.matchId,
          data.match, data.hs, data.as
        ]]);
        updated = true;
        break;
      }
    }

    if (!updated) {
      sheet.appendRow([
        new Date(data.ts), data.name, data.matchId,
        data.match, data.hs, data.as
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function
function doGet(e) {
  return ContentService
    .createTextOutput('WC 2026 Prediction API is running ✅')
    .setMimeType(ContentService.MimeType.TEXT);
}
