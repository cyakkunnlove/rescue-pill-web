import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (relativePath) =>
  readFileSync(new URL(relativePath, root), "utf8");

const expectedConsentAnswer = {
  ja: "「はい」",
  en: "'Yes'",
  zh: "「是」",
  vi: "'Có'",
  ko: "'예'",
};

const expectedClinicMarker = {
  ja: "医療機関",
  en: "Clinic",
  zh: "医疗机构",
  vi: "cơ sở",
  ko: "의료기관",
};

for (const [locale, yesMarker] of Object.entries(expectedConsentAnswer)) {
  const messages = JSON.parse(read(`src/locales/${locale}.json`));
  assert.ok(
    messages.questions.q3Hint.includes(yesMarker),
    `${locale} consent hint must direct an affected user to the affirmative answer`
  );
  assert.ok(
    messages.hospitals.link2Title.includes(expectedClinicMarker[locale]),
    `${locale} MHLW clinic link must be labelled as a medical-institution list`
  );
}

const liveNamespaces = [
  "actions",
  "artifact",
  "checklist",
  "pdf",
  "questions",
  "qr",
];
const flattenKeys = (value, prefix = "") =>
  Object.entries(value).flatMap(([key, nested]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return nested && typeof nested === "object"
      ? flattenKeys(nested, path)
      : [path];
  });
const hasPath = (value, path) =>
  path.split(".").every((key) => {
    if (!value || typeof value !== "object" || !(key in value)) return false;
    value = value[key];
    return true;
  });
const japaneseMessages = JSON.parse(read("src/locales/ja.json"));

for (const locale of ["en", "zh", "vi", "ko"]) {
  const messages = JSON.parse(read(`src/locales/${locale}.json`));
  for (const namespace of liveNamespaces) {
    for (const key of flattenKeys(japaneseMessages[namespace], namespace)) {
      assert.ok(hasPath(messages, key), `${locale} is missing live translation: ${key}`);
    }
  }
}

const dataText = read("public/data/otc_pharmacies.json");
const pharmacies = JSON.parse(dataText);
const metadata = JSON.parse(read("public/data/otc_pharmacies.meta.json"));
const dataHash = createHash("sha256").update(dataText).digest("hex");
const pdfScreen = read("src/components/screens/PDFScreen.tsx");
const qrScreen = read("src/components/screens/QRScreen.tsx");
const pharmacyImporter = read("scripts/fetch_pharmacy_data.py");
const blogText = ["ja", "en", "zh", "vi", "ko"]
  .map((locale) => read(`src/content/blog/${locale}.ts`))
  .join("\n");

assert.doesNotMatch(
  pdfScreen,
  /その性行為はあなたの意思によるものでしたか/,
  "PDF consent wording must not reverse the meaning of nonConsensual=yes"
);
assert.match(
  pdfScreen,
  /`Q4 \$\{t\("questions\.q3"\)\}`/,
  "PDF consent wording must reuse the live question polarity"
);
assert.match(
  pdfScreen,
  /\/fonts\/NotoSansCJKjp-Regular\.otf/,
  "PDF generation must use the bundled same-origin font"
);
assert.doesNotMatch(
  pdfScreen,
  /fonts\.gstatic\.com/,
  "PDF generation must not depend on a cross-origin font"
);
assert.doesNotMatch(
  qrScreen,
  /expiresAt/,
  "QR payload and UI must not claim an unenforced expiry"
);
assert.match(
  pharmacyImporter,
  /discover_current_source/,
  "pharmacy updater must discover the current workbook from the official page"
);
assert.doesNotMatch(
  pharmacyImporter,
  /001717498\.xlsx|SOURCE_UPDATED_AT\s*=\s*["']2026-07-01/,
  "pharmacy updater must not pin the current workbook URL or update date"
);
assert.ok(
  statSync(new URL("public/fonts/NotoSansCJKjp-Regular.otf", root)).size > 10_000_000,
  "bundled PDF font is missing or unexpectedly small"
);
assert.match(
  read("public/fonts/OFL-NotoSansCJK.txt"),
  /SIL OPEN FONT LICENSE Version 1\.1/,
  "bundled PDF font license is missing"
);
for (const staleClaim of [
  "重篤な肝障害のある人",
  "Those with severe liver disease",
  "有严重肝功能障碍的人",
  "Người có bệnh gan nặng",
  "중증 간장애가 있는 사람",
  "妊娠中に服用しても胎児への悪影響は報告されていません",
  "if taken during pregnancy, no adverse effects on the fetus have been reported",
  "即使在怀孕期间服用，也没有报告对胎儿有不良影响",
  "không có báo cáo về ảnh hưởng xấu đến thai nhi khi uống trong khi mang thai",
  "임신 중에 복용해도 태아에 대한 악영향은 보고되지 않았습니다",
  "位置情報をもとに",
  "uses your location",
  "根据您的位置",
  "dựa trên vị trí",
  "위치 정보를 바탕으로",
  "何度使用しても、その都度同じ効果",
  "equally effective each time you use it",
  "每次都有相同的效果",
  "có hiệu quả tương tự mỗi lần",
  "매번 같은 효과",
  "副作用（10%以上）",
  "Side Effects (more than 10%)",
  "副作用（10%以上）",
  "Tác dụng phụ thường gặp (trên 10%)",
  "부작용 (10% 이상)",
  "妊婦または妊娠していると思われる人",
  "pregnant or may be pregnant",
  "已怀孕或可能怀孕",
  "đang hoặc có thể đang mang thai",
  "임신 중이거나 임신했을 가능성이",
]) {
  assert.ok(
    !blogText.includes(staleClaim),
    `stale safety claim remains in blog content: ${staleClaim}`
  );
}

assert.equal(pharmacies.length, metadata.total, "pharmacy count must match metadata");
assert.ok(pharmacies.length >= 10_000, "pharmacy list is unexpectedly small");
assert.equal(new Set(pharmacies.map((item) => item.i)).size, pharmacies.length);
assert.equal(new Set(pharmacies.map((item) => item.p)).size, 47);
assert.equal(dataHash, metadata.dataSha256, "pharmacy JSON hash must match metadata");
assert.match(metadata.sourceSha256, /^[a-f0-9]{64}$/);
assert.ok(
  pharmacies.every((item) => Object.hasOwn(item, "x")),
  "every pharmacy row must preserve the official after-hours phone field"
);
const afterHoursPhones = pharmacies.filter((item) => item.e === 1 && item.x);
assert.ok(
  afterHoursPhones.length >= 2_500,
  "official after-hours phone coverage is unexpectedly small"
);
const phoneDigits = (value) =>
  String(value ?? "").normalize("NFKC").replace(/\D/g, "");
assert.ok(
  afterHoursPhones.filter((item) => phoneDigits(item.x) !== phoneDigits(item.t))
    .length >= 1_000,
  "distinct after-hours phone coverage is unexpectedly small"
);

console.log(
  `content/data verification: 5-language safety copy and ${pharmacies.length.toLocaleString()} pharmacies (${afterHoursPhones.length.toLocaleString()} after-hours phones) passed`
);
