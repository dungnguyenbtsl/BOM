const translations = {
  'zh-TW': {
    languageLabel: '語言:', brandLabel: '品牌:', otherBrand: '其他',
    customBrandPlaceholder: '輸入品牌', masterLabel: '定額庫 (BOM):', orderLabel: '訂單文件 (Orders):',
    notSelected: '(未選)', generateButton: '生成報表', exportExcelButton: '導出 Excel',
    exportWordButton: '導出 Word', printButton: '打印', pageHeading: 'BOM 生產用料明細計算表',
    noscriptMessage: '此工具需要啟用 JavaScript，才能讀取 BOM 與訂單 Excel 檔案並產生物料需求報表。',
    reportTitle: '生產用料明細計算表', uploadFiles: '請上傳文件',
    uploadInstruction: '請上傳定額庫與訂單文件後點擊「生成報表」...',
    masterLoaded: '(已載入 {count} 筆)', orderLoaded: '(已載入 {count} 單)',
    masterError: '讀取定額庫錯誤: {message}', orderError: '讀取訂單文件錯誤: {message}',
    uploadMasterFirst: '請先上傳定額庫！', uploadOrderFirst: '請先上傳訂單文件！',
    noValidData: '未找到有效數據！', missingBom: '型體 {model} 找不到對應的定額數據 (BOM Missing)',
    componentDefault: '部件', modelLabel: '型體', materialCodeLabel: '料號 (Code)', materialNameLabel: '名稱 (Name)', colorLabel: '顏色 (Color)', vendorLabel: '供應商 (Vendor)', unitLabel: '單位 (Unit)', itemLabel: '項次', productionOrderLabel: '生產訂單號', pairsLabel: '數量 (雙)', componentLabel: '部件', usageLabel: '用量', totalUsageLabel: '總用量', subtotalLabel: '小計 (Total)', reportSuccess: '報表生成成功！每個 SKU 已分隔成獨立頁面，各物料獨立成區塊。',
    generateFirst: '請先生成有效的報表！', brandOtherFallback: '未命名',
    historyTitle: '最近匯出記錄', historyEmpty: '尚未匯出任何檔案。', clearHistory: '清除記錄', downloadAgain: '再次下載', historyExcel: 'Excel', historyWord: 'Word',
    metaDescription: 'BOM 生產用料計算工具：從 BOM 與訂單 Excel 計算 SKU 物料需求，並產生可列印及可匯出的報表。',
    excelFilename: 'BOM_生產用料明細計算表.xlsx', wordFilename: 'BOM_生產用料明細計算表.docx', metaTitle: 'BOM 生產用料明細計算表｜SKU 物料需求報表', metaOgDescription: '從 BOM 與訂單 Excel 計算 SKU 物料需求，產生可列印、Excel 及 Word 報表。'
  },
  vi: {
    languageLabel: 'Ngôn ngữ:', brandLabel: 'Thương hiệu:', otherBrand: 'Khác',
    customBrandPlaceholder: 'Nhập thương hiệu', masterLabel: 'File định mức (BOM):', orderLabel: 'File đơn hàng:',
    notSelected: '(Chưa chọn)', generateButton: 'Tạo báo cáo', exportExcelButton: 'Xuất Excel',
    exportWordButton: 'Xuất Word', printButton: 'In', pageHeading: 'Bảng tính nhu cầu vật liệu BOM',
    noscriptMessage: 'Công cụ cần JavaScript để đọc file BOM, file đơn hàng Excel và tạo báo cáo nhu cầu vật liệu.',
    reportTitle: 'Báo cáo nhu cầu vật liệu sản xuất', uploadFiles: 'Chưa có file',
    uploadInstruction: 'Tải file định mức và file đơn hàng, sau đó nhấn “Tạo báo cáo”.',
    masterLoaded: '(Đã tải {count} dòng)', orderLoaded: '(Đã tải {count} đơn)',
    masterError: 'Lỗi đọc file định mức: {message}', orderError: 'Lỗi đọc file đơn hàng: {message}',
    uploadMasterFirst: 'Vui lòng tải file định mức trước!', uploadOrderFirst: 'Vui lòng tải file đơn hàng trước!',
    noValidData: 'Không tìm thấy dữ liệu hợp lệ!', missingBom: 'Không tìm thấy định mức cho model {model}',
    componentDefault: 'Bộ phận', modelLabel: 'Model', materialCodeLabel: 'Mã', materialNameLabel: 'Tên', colorLabel: 'Màu', vendorLabel: 'Nhà cung cấp', unitLabel: 'Đơn vị', itemLabel: 'STT', productionOrderLabel: 'Lệnh sản xuất', pairsLabel: 'Số đôi', componentLabel: 'Bộ phận', usageLabel: 'Định mức', totalUsageLabel: 'Tổng nhu cầu', subtotalLabel: 'Tổng', reportSuccess: 'Đã tạo báo cáo! Mỗi SKU nằm trên một trang và mỗi vật liệu là một nhóm riêng.',
    generateFirst: 'Vui lòng tạo báo cáo hợp lệ trước!', brandOtherFallback: 'Chưa đặt tên',
    historyTitle: 'Lịch sử xuất gần đây', historyEmpty: 'Chưa có file nào được xuất.', clearHistory: 'Xóa lịch sử', downloadAgain: 'Tải lại', historyExcel: 'Excel', historyWord: 'Word',
    metaDescription: 'Công cụ BOM tính nhu cầu vật liệu theo SKU từ file định mức và đơn hàng Excel, hỗ trợ xuất báo cáo và in A4.',
    excelFilename: 'BOM_bao-cao-nhu-cau-vat-lieu.xlsx', wordFilename: 'BOM_bao-cao-nhu-cau-vat-lieu.docx', metaTitle: 'BOM — Báo cáo nhu cầu vật liệu theo SKU', metaOgDescription: 'Tính nhu cầu vật liệu sản xuất từ BOM và đơn hàng Excel, xuất Excel, Word hoặc in A4.'
  },
  en: {
    languageLabel: 'Language:', brandLabel: 'Brand:', otherBrand: 'Other',
    customBrandPlaceholder: 'Enter brand', masterLabel: 'BOM master file:', orderLabel: 'Order file:',
    notSelected: '(Not selected)', generateButton: 'Generate report', exportExcelButton: 'Export Excel',
    exportWordButton: 'Export Word', printButton: 'Print', pageHeading: 'BOM Production Material Requirement Calculator',
    noscriptMessage: 'JavaScript is required to read BOM and order Excel files and generate the material requirement report.',
    reportTitle: 'Production Material Requirement Report', uploadFiles: 'Upload files',
    uploadInstruction: 'Upload the BOM master and order files, then select “Generate report”.',
    masterLoaded: '({count} rows loaded)', orderLoaded: '({count} orders loaded)',
    masterError: 'Error reading BOM master: {message}', orderError: 'Error reading order file: {message}',
    uploadMasterFirst: 'Please upload the BOM master file first!', uploadOrderFirst: 'Please upload the order file first!',
    noValidData: 'No valid data found!', missingBom: 'No BOM definition found for model {model}',
    componentDefault: 'Component', modelLabel: 'Model', materialCodeLabel: 'Code', materialNameLabel: 'Name', colorLabel: 'Color', vendorLabel: 'Vendor', unitLabel: 'Unit', itemLabel: 'No.', productionOrderLabel: 'Production order', pairsLabel: 'Pairs', componentLabel: 'Component', usageLabel: 'Usage', totalUsageLabel: 'Total usage', subtotalLabel: 'Subtotal', reportSuccess: 'Report generated! Each SKU is on a separate page and each material is grouped.',
    generateFirst: 'Please generate a valid report first!', brandOtherFallback: 'Unnamed',
    historyTitle: 'Recent exports', historyEmpty: 'No files have been exported yet.', clearHistory: 'Clear history', downloadAgain: 'Download again', historyExcel: 'Excel', historyWord: 'Word',
    metaDescription: 'Calculate SKU-level production material requirements from BOM and order Excel files, then export or print reports.',
    excelFilename: 'BOM_SKU_material_report.xlsx', wordFilename: 'BOM_SKU_material_report.docx', metaTitle: 'BOM — SKU Production Material Requirement Report', metaOgDescription: 'Calculate material requirements from BOM and order Excel files, then export Excel, Word or print-ready reports.'
  }
};
function detectBrowserLanguage() {
  const languages = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || ''];
  for (const language of languages) {
    const normalized = language.toLowerCase();
    if (normalized.startsWith('vi')) return 'vi';
    if (normalized.startsWith('en')) return 'en';
    if (normalized.startsWith('zh')) return 'zh-TW';
  }
  return 'zh-TW';
}
const savedLanguage = localStorage.getItem('bomLanguage');
let currentLanguage = savedLanguage || detectBrowserLanguage();
function t(key, variables = {}) {
  let text = (translations[currentLanguage] && translations[currentLanguage][key]) || translations['en'][key] || key;
  Object.entries(variables).forEach(([name, value]) => { text = text.replaceAll(`{${name}}`, String(value)); });
  return text;
}
function refreshStatuses() {
  const masterStatus = document.getElementById('masterStatus');
  const orderStatus = document.getElementById('orderStatus');
  if (masterStatus) masterStatus.innerText = masterRowCount ? t('masterLoaded', {count: masterRowCount}) : t('notSelected');
  if (orderStatus) orderStatus.innerText = orderCount ? t('orderLoaded', {count: orderCount}) : t('notSelected');
}
const EXPORT_HISTORY_KEY = 'bomExportHistory';
const EXPORT_HISTORY_LIMIT = 10;
function readExportHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(EXPORT_HISTORY_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}
function renderExportHistory() {
  const list = document.getElementById('exportHistoryList');
  if (!list) return;
  list.innerHTML = '';
  const history = readExportHistory();
  if (!history.length) {
    const empty = document.createElement('li');
    empty.textContent = t('historyEmpty');
    list.appendChild(empty);
    return;
  }
  history.forEach(entry => {
    const item = document.createElement('li');
    const name = document.createElement('span');
    name.textContent = `${entry.type === 'excel' ? t('historyExcel') : t('historyWord')}: ${entry.filename}`;
    const time = document.createElement('time');
    time.dateTime = entry.timestamp;
    time.textContent = new Intl.DateTimeFormat(currentLanguage, {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(entry.timestamp));
    const download = document.createElement('button');
    download.type = 'button';
    download.className = 'history-download';
    download.textContent = t('downloadAgain');
    download.disabled = !entry.content;
    download.onclick = () => downloadStoredExport(history.indexOf(entry));
    item.append(name, time, download);
    list.appendChild(item);
  });
}
function downloadStoredExport(index) {
  const entry = readExportHistory()[index];
  if (!entry || !entry.content) return;
  const link = document.createElement('a');
  link.href = entry.content;
  link.download = entry.filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
function persistExportHistory(history) {
  const limited = history.slice(0, EXPORT_HISTORY_LIMIT);
  for (let count = limited.length; count > 0; count--) {
    try {
      localStorage.removeItem(EXPORT_HISTORY_KEY);
      localStorage.setItem(EXPORT_HISTORY_KEY, JSON.stringify(limited.slice(0, count)));
      return true;
    } catch (error) {}
  }
  return false;
}
function recordExport(type, filename, content) {
  const history = readExportHistory().filter(entry => entry.filename !== filename);
  history.unshift({type, filename, content, timestamp: new Date().toISOString()});
  if (!persistExportHistory(history)) {
    // Keep metadata if the browser quota cannot fit the file content.
    persistExportHistory(history.map(({content: savedContent, ...entry}) => entry));
  }
  renderExportHistory();
}
function clearExportHistory() {
  try { localStorage.removeItem(EXPORT_HISTORY_KEY); } catch (error) {}
  renderExportHistory();
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === 'vi' ? 'vi' : currentLanguage;
  document.title = t('metaTitle');
  document.querySelectorAll('[data-i18n]').forEach(el => { el.innerText = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  const description = document.querySelector('meta[name="description"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const title = document.querySelector('meta[property="og:title"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (description) description.content = t('metaDescription');
  if (ogDescription) ogDescription.content = t('metaOgDescription');
  if (title) title.content = t('metaTitle');
  if (twitterTitle) twitterTitle.content = t('metaTitle');
  if (twitterDescription) twitterDescription.content = t('metaOgDescription');
  const selector = document.getElementById('languageSelect');
  if (selector) selector.value = currentLanguage;
  refreshStatuses();
  renderExportHistory();
}
function changeLanguage() {
  currentLanguage = document.getElementById('languageSelect').value;
  localStorage.setItem('bomLanguage', currentLanguage);
  applyLanguage();
  if (Object.keys(masterDB).length && orderRowsData.length) processOrderList(false);
}
let masterDB = {};
let orderRowsData = [];
let masterRowCount = 0;
let orderCount = 0;
function updateBrandTitle() {
let select = document.getElementById('brandSelect');
let customInput = document.getElementById('customBrandInput');
let brandName = select.value;
if (brandName === "OTHER") {
customInput.style.display = "inline-block";
brandName = customInput.value.trim() || t('brandOtherFallback');
} else {
customInput.style.display = "none";
}
let brandEls = document.querySelectorAll('.subtitle-brand');
brandEls.forEach(el => el.innerText = brandName);
let mainTitle = document.getElementById('brandTitle');
if(mainTitle) mainTitle.innerText = brandName;
}
function loadMasterDB(e) {
const file = e.target.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = function(e) {
try {
const data = new Uint8Array(e.target.result);
const workbook = XLSX.read(data, {type: 'array'});
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, {header: 1});
masterDB = {};
let count = 0;
for (let i = 1; i < rows.length; i++) {
let r = rows[i];
if (!r || r.length < 14) continue;
let model = r[0] ? String(r[0]).trim() : '';
let component = r[5] ? String(r[5]).trim() : t('componentDefault');
let matCode = r[6] ? String(r[6]).trim() : '';
let matName = r[7] ? String(r[7]).trim() : '';
let unit = r[9] ? String(r[9]).trim() : (r[8] ? String(r[8]).trim() : 'Yard');
let color = r[10] ? String(r[10]).trim() : '';
let vendor = r[12] ? String(r[12]).trim() : '';
let rate = parseFloat(r[13]) || 0;
if (model) {
if (!masterDB[model]) {
masterDB[model] = [];
}
masterDB[model].push({
component: component,
materialCode: matCode,
materialName: matName,
materialUnit: unit,
materialColor: color,
vendor: vendor,
rate: rate
});
count++;
}
}
masterRowCount = count;
refreshStatuses();
document.getElementById('masterStatus').style.color = 'green';
} catch (err) {
alert(t('masterError', {message: err.message}));
}
};
reader.readAsArrayBuffer(file);
}
function loadOrderFile(e) {
const file = e.target.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = function(e) {
try {
const data = new Uint8Array(e.target.result);
const workbook = XLSX.read(data, {type: 'array'});
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, {header: 1});
orderRowsData = [];
for (let i = 1; i < rows.length; i++) {
let r = rows[i];
if (!r || r.length < 3) continue;
let hasVal = r.some(cell => cell !== undefined && cell !== null && String(cell).trim() !== "");
if (!hasVal) continue;
let model = r[0] ? String(r[0]).trim() : '';
let order = r[1] ? String(r[1]).trim() : '';
let pairs = parseFloat(r[2]) || 0;
if (model && order) {
orderRowsData.push({model, order, pairs});
}
}
orderCount = orderRowsData.length;
refreshStatuses();
document.getElementById('orderStatus').style.color = 'green';
} catch (err) {
alert(t('orderError', {message: err.message}));
}
};
reader.readAsArrayBuffer(file);
}
function processOrderList(showSuccess = true) {
if (Object.keys(masterDB).length === 0) {
alert(t('uploadMasterFirst'));
return;
}
if (orderRowsData.length === 0) {
alert(t('uploadOrderFirst'));
return;
}
let brandSelect = document.getElementById('brandSelect');
let customInput = document.getElementById('customBrandInput');
let brandName = brandSelect.value === "OTHER" ? (customInput.value.trim() || t('brandOtherFallback')) : brandSelect.value;
// Gom nhóm đơn hàng theo SKU (Model)
let skuMap = {};
for (let row of orderRowsData) {
let model = row.model;
if (!skuMap[model]) {
skuMap[model] = [];
}
skuMap[model].push(row);
}
let container = document.getElementById('pagesContainer');
container.innerHTML = '';
let skuKeys = Object.keys(skuMap);
if (skuKeys.length === 0) {
container.innerHTML = `<div class="page"><div class="missing-data">${t('noValidData')}</div></div>`;
return;
}
for (let model of skuKeys) {
let ordersOfSku = skuMap[model];
let bomList = masterDB[model];
let pageDiv = document.createElement('div');
pageDiv.className = 'page';
let headerHTML = `<div class="header-container"> <div class="logo-box"> <img src="assets/logo.jpeg" width="100" height="40" alt="BOM company logo" decoding="async"> </div> <div class="title-box"> <h2>${t('reportTitle')}</h2> <div class="subtitle subtitle-brand">${brandName}</div> </div> <div class="sku-title">${t('modelLabel')}: ${model}</div> </div>`;
if (!bomList) {
pageDiv.innerHTML = headerHTML + `<div class="missing-data">${t('missingBom', {model})}</div>`;
container.appendChild(pageDiv);
continue;
}
// Gom nhóm theo từng vật liệu riêng biệt (Material Code + Color)
let materialGroups = {};
for (let bom of bomList) {
let matKey = (bom.materialCode || "UNKNOWN") + "_" + (bom.materialColor || "DEFAULT");
if (!materialGroups[matKey]) {
materialGroups[matKey] = {
materialCode: bom.materialCode,
materialName: bom.materialName,
materialColor: bom.materialColor,
vendor: bom.vendor,
materialUnit: bom.materialUnit || 'Yard',
components: {}
};
}
materialGroups[matKey].components[bom.component] = bom.rate;
}
let bodyContent = headerHTML;
// Duyệt qua từng vật liệu riêng biệt để tạo một bảng riêng biệt
for (let mKey in materialGroups) {
let mat = materialGroups[mKey];
bodyContent += `<div class="material-section"> <div class="material-header"> <div>${t('materialCodeLabel')}: <b>${mat.materialCode}</b> | ${t('materialNameLabel')}: <b>${mat.materialName}</b></div> <div>${t('colorLabel')}: <b>${mat.materialColor}</b> | ${t('vendorLabel')}: <b>${mat.vendor}</b> | ${t('unitLabel')}: <b>${mat.materialUnit}</b></div> </div> <table> <thead> <tr> <th style="width: 5%;">${t('itemLabel')}</th> <th style="width: 15%;">${t('productionOrderLabel')}</th> <th style="width: 10%;">${t('pairsLabel')}</th>`;
// Tạo tiêu đề cột cho từng 部件 (Component) của vật liệu này
let compNames = Object.keys(mat.components);
for (let cName of compNames) {
bodyContent += `<th>${t('componentLabel')}: ${cName} (${t('usageLabel')})</th>`;
}
bodyContent += `<th style="width: 12%;">${t('totalUsageLabel')}</th> </tr> </thead> <tbody>`;
let stt = 1;
let totalMatForSku = 0;
let totalPairsForSku = 0;
let compTotals = {};
compNames.forEach(c => compTotals[c] = 0);
for (let ord of ordersOfSku) {
let orderPairs = ord.pairs;
totalPairsForSku += orderPairs;
let rowSum = 0;
bodyContent += `<tr> <td>${stt++}</td> <td class="left"><b>${ord.order}</b></td> <td class="right">${orderPairs.toLocaleString()}</td>`;
for (let cName of compNames) {
let rate = mat.components[cName];
let subVal = orderPairs * rate;
rowSum += subVal;
compTotals[cName] += subVal;
bodyContent += `<td class="right">${subVal.toFixed(2)}</td>`;
}
totalMatForSku += rowSum;
bodyContent += `<td class="right"><b>${rowSum.toFixed(2)}</b></td> </tr>`;
}
// Dòng tổng kết cho vật liệu này
bodyContent += `<tr style="background-color: #fafafa; font-weight: bold;"> <td colspan="2">${t('subtotalLabel')}</td> <td class="right">${totalPairsForSku.toLocaleString()}</td>`;
for (let cName of compNames) {
bodyContent += `<td class="right">${compTotals[cName].toFixed(2)}</td>`;
}
bodyContent += `<td class="right" style="color: #c0392b;">${totalMatForSku.toFixed(2)} ${mat.materialUnit}</td> </tr> </tbody> </table> </div>`;
}
pageDiv.innerHTML = bodyContent;
container.appendChild(pageDiv);
}
if (showSuccess) alert(t('reportSuccess'));
}
function exportToExcel() {
let pages = document.querySelectorAll('.page');
if (pages.length === 0 || document.querySelector('.missing-data')) {
alert(t('generateFirst'));
return;
}
let wb = XLSX.utils.book_new();
pages.forEach((page, idx) => {
let skuTitle = page.querySelector('.sku-title') ? page.querySelector('.sku-title').innerText : `Sheet_${idx+1}`;
let tables = page.querySelectorAll('table');
// Gộp dữ liệu trang thành 1 sheet hoặc xuất gộp
let ws = XLSX.utils.table_to_sheet(page);
XLSX.utils.book_append_sheet(wb, ws, skuTitle.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 31));
});
const filename = t('excelFilename');
const base64 = XLSX.write(wb, {bookType: 'xlsx', type: 'base64'});
const content = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
XLSX.writeFile(wb, filename);
recordExport('excel', filename, content);
}
function exportToWord() {
let containerHTML = document.getElementById('pagesContainer').innerHTML;
let wrappedHTML = `<!DOCTYPE html> <html> <head> <meta charset="utf-8"> <style> body { font-family: 'Microsoft YaHei', Arial, sans-serif; } .page { page-break-after: always; margin-bottom: 20px; } .header-container { display: flex; justify-content: space-between; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 10px; } .material-section { margin-top: 10px; margin-bottom: 10px; border: 1px solid #0066cc; } .material-header { background-color: #e6f2ff; padding: 5px; font-weight: bold; font-size: 10px; } table { width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 5px; } th, td { border: 1px solid #333; padding: 3px; text-align: center; } th { background-color: #eaecef; } .left { text-align: left; } .right { text-align: right; } h2 { font-size: 14px; margin: 0; text-align: center; } .subtitle { font-size: 10px; color: #c0392b; text-align: center; font-weight: bold; } .sku-title { font-size: 11px; font-weight: bold; color: #0066cc; text-align: right; } </style> </head> <body> ${containerHTML} </body> </html>`;
let converted = htmlDocx.asBlob(wrappedHTML, {
orientation: 'landscape',
margins: { top: 720, bottom: 720, left: 720, right: 720 }
});
let url = URL.createObjectURL(converted);
let a = document.createElement('a');
a.href = url;
a.download = t('wordFilename');
document.body.appendChild(a);
const filename = a.download;
a.click();
document.body.removeChild(a);
const reader = new FileReader();
reader.onload = () => recordExport('word', filename, reader.result);
reader.readAsDataURL(converted);
URL.revokeObjectURL(url);
}
applyLanguage();
