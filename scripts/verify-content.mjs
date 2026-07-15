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
const pharmaciesPage = read("src/app/pharmacies/page.tsx");
const hospitalsLayout = read("src/app/hospitals/layout.tsx");
const sitemap = read("public/sitemap.xml");
const blogByLocale = Object.fromEntries(
  ["ja", "en", "zh", "vi", "ko"].map((locale) => [
    locale,
    read(`src/content/blog/${locale}.ts`),
  ])
);
const blogText = Object.values(blogByLocale).join("\n");
const editorialSources = read("src/content/blog/editorial/sources.ts");
const editorialText = ["ja", "en", "zh", "vi", "ko"]
  .map((locale) => read(`src/content/blog/editorial/${locale}.ts`))
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
assert.match(
  pharmaciesPage,
  /metadata\.total\.toLocaleString\(\)/,
  "pharmacy SSR must show the verified total instead of an initial zero"
);
assert.doesNotMatch(
  pharmaciesPage,
  /pharmacies\.length\.toLocaleString\(\)\}\{t\("common\.results"\)\}/,
  "pharmacy SSR must not render the unloaded client-array count"
);
assert.match(
  hospitalsLayout,
  /robots:\s*\{[\s\S]*?index:\s*false/,
  "thin hospital directory must stay noindex until it has original directory content"
);
assert.doesNotMatch(
  sitemap,
  /https:\/\/rescue-pill\.com\/(?:hospitals|partners)/,
  "noindex utility pages must not appear in the sitemap"
);
for (const [locale, articleText] of Object.entries(blogByLocale)) {
  assert.match(
    articleText,
    /7,480/,
    `${locale} cost comparison must state the verified NorLevo MSRP`
  );
  assert.match(
    articleText,
    /6,930/,
    `${locale} cost comparison must state the verified Resoel 72 MSRP`
  );
  assert.match(
    articleText,
    /https:\/\/www\.daiichisankyo-hc\.co\.jp\/site_norlevo\/product\//,
    `${locale} cost comparison must link to the NorLevo manufacturer source`
  );
  assert.match(
    articleText,
    /https:\/\/alinamin-kenko\.jp\/lesoeru72\/column\/price\/index\.html/,
    `${locale} cost comparison must link to the Resoel 72 manufacturer source`
  );
}
assert.match(
  editorialSources,
  /"cost-comparison": \[[\s\S]*?"norlevoPrice"[\s\S]*?"resoelPrice"/,
  "cost-comparison source cards must include both manufacturer price sources"
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
  "低用量ピルを2日以上連続で飲み忘れ",
  "miss birth control pills for 2 or more consecutive days",
  "连续漏服短效避孕药2天以上",
  "quên uống thuốc tránh thai liều thấp 2 ngày liên tiếp trở lên",
  "저용량 피임약을 2일 이상 연속으로 깜빡",
  "緊急避妊薬で太ることはありません",
  "Emergency contraception will not cause weight gain",
  "不会因紧急避孕药而发胖",
  "Thuốc tránh thai khẩn cấp không làm tăng cân",
  "응급 피임약으로 살이 찌지 않습니다",
  "アルコールが緊急避妊薬の効果に影響を与えることはありません",
  "Alcohol does not affect the effectiveness of emergency contraception",
  "酒精不会影响紧急避孕药的效果",
  "Rượu không ảnh hưởng đến hiệu quả của thuốc tránh thai khẩn cấp",
  "알코올이 응급 피임약의 효과에 영향을 미치지 않습니다",
  "### 真実：太りません",
  "数日で解消されます。脂肪が増えるわけではありません",
  "### Fact: It Does Not Cause Weight Gain",
  "this resolves within a few days. It does not cause fat gain",
  "### 真相：不会发胖",
  "几天后就会消除。不会增加脂肪",
  "### Sự thật: Không tăng cân",
  "sẽ giảm trong vài ngày. Không phải tăng mỡ",
  "### 진실: 살찌지 않습니다",
  "며칠이면 해소됩니다. 지방이 늘어나는 것은 아닙니다",
  "通常は一時的なもので、数日以内に治まります",
  "usually temporary and resolve within a few days",
  "通常是暂时性的，会在几天内消失",
  "thường chỉ là tạm thời và sẽ giảm trong vòng vài ngày",
  "보통 일시적이며 며칠 내에 사라집니다",
  "### 真実：多くの人は軽い症状のみ",
  "### Fact: Most People Have Only Mild Symptoms",
  "### 真相：大多数人只有轻微症状",
  "### Sự thật: Hầu hết chỉ có triệu chứng nhẹ",
  "### 진실: 대부분의 사람은 가벼운 증상만",
  "重篤な副作用は非常にまれです",
  "Serious side effects are very rare",
  "严重副作用极为罕见",
  "Tác dụng phụ nghiêm trọng rất hiếm",
  "중대한 부작용은 매우 드뭅니다",
  "数日〜1週間程度早く来ることがある",
  "数日〜1週間程度遅れることがある",
  "May come a few days to a week early",
  "May be delayed by a few days to a week",
  "可能提前几天到1周",
  "可能推迟几天到1周",
  "Có thể đến sớm hơn vài ngày〜1 tuần",
  "Có thể muộn hơn vài ngày〜1 tuần",
  "며칠~1주일 정도 일찍 올 수 있음",
  "며칠~1주일 정도 늦어질 수 있음",
  "気になるむくみや体重変化が続く場合",
  "If swelling or a weight change concerns you or continues",
  "如果浮肿或体重变化令您担心或持续存在",
  "Nếu tình trạng sưng hoặc thay đổi cân nặng làm bạn lo lắng hay kéo dài",
  "부종이나 체중 변화가 걱정되거나 계속되면",
  "WHO（世界保健機関）の必須医薬品リストにも掲載されている安全性の高い薬剤",
  "listed on the WHO (World Health Organization) Essential Medicines List and has a well-established safety profile",
  "被列入世界卫生组织（WHO）的基本药物目录，是一种安全性很高的药物",
  "nằm trong Danh sách thuốc thiết yếu của WHO (Tổ chức Y tế Thế giới), là một loại thuốc có độ an toàn cao",
  "WHO(세계보건기구)의 필수 의약품 목록에도 등재된 안전성이 높은 약제",
  "生理痛やPMSの改善効果も",
  "Also helps with menstrual cramps and PMS",
  "还可改善痛经和经前综合征",
  "Có tác dụng cải thiện đau bụng kinh và PMS",
  "생리통이나 PMS 개선 효과도",
  "肌荒れ改善効果も",
  "Can improve skin",
  "还可改善皮肤问题",
  "Có tác dụng cải thiện da",
  "피부 트러블 개선 효과도",
  "Q5: 授乳中でも服用できますか？\n\n**A: はい、服用できます。**",
  "Q5: Can I take it while breastfeeding?\n\n**A: Yes, you can take it while breastfeeding.**",
  "Q5: 哺乳期可以服用吗？\n\n**A: 可以服用。**",
  "Q5: Đang cho con bú có thể uống không?\n\n**A: Có, có thể uống.**",
  "Q5: 수유 중에도 복용할 수 있나요?\n\n**A: 네, 복용할 수 있습니다.**",
  "**A: 健康上の問題はないとされていますが、推奨はしません。**",
  "**A: There are no known health problems, but it's not recommended for regular use.**",
  "**A: 健康方面没有问题，但不推荐。**",
  "**A: Không có vấn đề sức khỏe, nhưng không khuyến khích.**",
  "**A: 건강상의 문제는 없다고 하지만, 권장하지 않습니다.**",
  "**A: すぐに再開してください。**",
  "**A: Resume immediately.**",
  "**A: 应该立即恢复。**",
  "**A: Hãy tiếp tục ngay lập tức.**",
  "**A: 바로 재개해 주세요.**",
]) {
  assert.ok(
    !blogText.includes(staleClaim),
    `stale safety claim remains in blog content: ${staleClaim}`
  );
}

assert.match(
  editorialSources,
  /"myths-and-facts": \[[\s\S]*?"whoEmergencyContraception"/,
  "myths-and-facts source cards must include WHO for fertility and repeated-use claims"
);
assert.match(
  editorialSources,
  /"side-effects-and-safety": \[[\s\S]*?"whoEmergencyContraception"/,
  "side-effects-and-safety source cards must include WHO for fertility claims"
);
assert.doesNotMatch(
  `${blogText}\n${editorialText}`,
  /24\s*[〜～~–-]\s*48/,
  "blog content must not promise a fixed 24-to-48-hour side-effect recovery window"
);
assert.doesNotMatch(
  `${blogText}\n${editorialText}`,
  /7日を超えて|more than seven days late|超过7天|trên 7 ngày|7일 넘게/,
  "menstrual consultation threshold must include the seventh day"
);

const requiredSafetyCopy = {
  ja: [
    "予定される時期から7日以上生理が来ない",
    "生理が予定より早く来た、または出血量がいつもと異なる",
    "授乳中は本剤を使用しないか、服用後少なくとも24時間は授乳を避ける",
    "手足のむくみが現れた場合は、程度や持続時間にかかわらず",
    "頭痛、眠気、めまい、不安",
    "貧血、倦怠感・疲労、浮遊感、口のかわき、熱感、手足のむくみ",
  ],
  en: [
    "seven days or more after the expected date",
    "starts earlier than expected or the bleeding amount differs from usual",
    "avoid breastfeeding for at least 24 hours",
    "regardless of its severity or duration",
    "Headache, drowsiness, dizziness, or anxiety",
    "dry mouth, a feeling of heat, swelling of the hands or feet",
  ],
  zh: [
    "预计月经时间已过7天以上仍未来潮",
    "月经比预计更早，或出血量与平时不同",
    "服药后至少24小时内避免哺乳",
    "无论程度或持续时间如何",
    "头痛、嗜睡、头晕或焦虑",
    "口干、发热感、手脚浮肿",
  ],
  vi: [
    "muộn hơn thời điểm dự kiến từ 7 ngày trở lên",
    "Kinh đến sớm hơn dự kiến hoặc lượng máu khác bình thường",
    "tránh cho bú ít nhất 24 giờ sau khi uống",
    "bất kể mức độ hay thời gian kéo dài",
    "Đau đầu, buồn ngủ, chóng mặt hoặc lo âu",
    "khô miệng, cảm giác nóng, sưng tay chân",
  ],
  ko: [
    "예정일보다 생리가 7일 이상 늦음",
    "생리가 예정보다 일찍 시작되거나 출혈량이 평소와 다름",
    "복용 후 최소 24시간 동안 수유를 피하도록",
    "정도나 지속 시간과 관계없이",
    "두통, 졸림, 어지러움 또는 불안",
    "입 마름, 열감, 손발 부종",
  ],
};

for (const [locale, markers] of Object.entries(requiredSafetyCopy)) {
  for (const marker of markers) {
    assert.ok(
      blogByLocale[locale].includes(marker),
      `${locale} safety guidance is missing: ${marker}`
    );
  }
}

assert.match(
  read("src/content/blog/editorial/vi.ts"),
  /Kinh đến sớm hơn dự kiến hoặc lượng máu khác bình thường/,
  "Vietnamese timing guidance must include early periods and any unusual bleeding amount"
);
assert.match(
  read("src/content/blog/editorial/ko.ts"),
  /생리가 예정보다 일찍 시작되거나 출혈량이 평소와 다른 경우/,
  "Korean timing guidance must include early periods and any unusual bleeding amount"
);

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
