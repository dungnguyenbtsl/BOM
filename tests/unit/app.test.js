import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_SOURCE = fs.readFileSync(
  path.resolve(__dirname, '../../assets/js/app.js'),
  'utf8',
);

function createLocalStorage(initial = {}, { quota = Infinity } = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      const serialized = String(value);
      if (serialized.length > quota) throw new Error('QuotaExceededError');
      values.set(key, serialized);
    },
    removeItem(key) {
      values.delete(key);
    },
    snapshot(key) {
      return values.get(key) ?? null;
    },
  };
}

function createDocumentStub() {
  return {
    title: '',
    documentElement: { lang: 'zh-TW' },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    getElementById() { return null; },
  };
}

function loadApp({ browserLanguages = ['en-US'], savedLanguage, storage } = {}) {
  const localStorage = storage || createLocalStorage(
    savedLanguage ? { bomLanguage: savedLanguage } : {},
  );
  const context = {
    console,
    Intl,
    Date,
    JSON,
    Object,
    Array,
    String,
    Error,
    navigator: { languages: browserLanguages, language: browserLanguages[0] || '' },
    localStorage,
    document: createDocumentStub(),
    alert() {},
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(APP_SOURCE, context, { filename: 'assets/js/app.js' });
  return { app: context, storage };
}

function readHistory(storage) {
  return JSON.parse(storage.snapshot('bomExportHistory') || '[]');
}

test('detectBrowserLanguage maps Vietnamese, English, Chinese, and fallback', () => {
  const cases = [
    [['vi-VN', 'en-US'], 'vi'],
    [['en-GB'], 'en'],
    [['zh-CN'], 'zh-TW'],
    [['ja-JP'], 'zh-TW'],
  ];
  for (const [languages, expected] of cases) {
    const { app } = loadApp({ browserLanguages: languages });
    assert.equal(app.detectBrowserLanguage(), expected);
  }
});

test('saved language takes precedence over browser language', () => {
  const { app } = loadApp({ browserLanguages: ['en-US'], savedLanguage: 'vi' });
  assert.equal(app.t('reportTitle'), 'Báo cáo nhu cầu vật liệu sản xuất');
});

test('translation helper interpolates variables and falls back to English keys', () => {
  const { app } = loadApp({ browserLanguages: ['vi-VN'] });
  assert.equal(app.t('missingBom', { model: 'MODEL-01' }), 'Không tìm thấy định mức cho model MODEL-01');
  assert.equal(app.t('unknownKey'), 'unknownKey');
});

test('readExportHistory returns an empty list for malformed localStorage data', () => {
  const storage = createLocalStorage({ bomExportHistory: '{not-json' });
  const { app } = loadApp({ storage });
  assert.deepEqual(Array.from(app.readExportHistory()), []);
});

test('recordExport stores newest files, removes duplicate names, and caps history at ten', () => {
  const storage = createLocalStorage();
  const { app } = loadApp({ storage });
  for (let index = 0; index < 11; index += 1) {
    app.recordExport('excel', `report-${index}.xlsx`, `data:text/plain;base64,${index}`);
  }
  let history = readHistory(storage);
  assert.equal(history.length, 10);
  assert.equal(history[0].filename, 'report-10.xlsx');
  assert.equal(history.at(-1).filename, 'report-1.xlsx');
  assert.equal(history[0].content, 'data:text/plain;base64,10');

  app.recordExport('word', 'report-5.xlsx', 'data:text/plain;base64,replaced');
  history = readHistory(storage);
  assert.equal(history.length, 10);
  assert.equal(history[0].filename, 'report-5.xlsx');
  assert.equal(history[0].type, 'word');
  assert.equal(history[0].content, 'data:text/plain;base64,replaced');
  assert.equal(history.filter((entry) => entry.filename === 'report-5.xlsx').length, 1);
});

test('recordExport preserves metadata when file content exceeds storage quota', () => {
  const storage = createLocalStorage({}, { quota: 200 });
  const { app } = loadApp({ storage });
  app.recordExport('excel', 'large.xlsx', `data:application/octet-stream;base64,${'x'.repeat(1000)}`);
  const history = readHistory(storage);
  assert.equal(history.length, 1);
  assert.equal(history[0].filename, 'large.xlsx');
  assert.equal(history[0].type, 'excel');
  assert.equal(Object.hasOwn(history[0], 'content'), false);
});

test('clearExportHistory removes all stored export records', () => {
  const storage = createLocalStorage({
    bomExportHistory: JSON.stringify([{ type: 'word', filename: 'old.docx' }]),
  });
  const { app } = loadApp({ storage });
  app.clearExportHistory();
  assert.equal(storage.snapshot('bomExportHistory'), null);
  assert.deepEqual(Array.from(app.readExportHistory()), []);
});

test('app.js contains no inline-only dependency and remains valid JavaScript', () => {
  assert.match(APP_SOURCE, /function exportToExcel\(\)/);
  assert.match(APP_SOURCE, /function exportToWord\(\)/);
  assert.match(APP_SOURCE, /function recordExport\(/);
});
