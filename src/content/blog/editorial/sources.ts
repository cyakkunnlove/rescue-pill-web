import type { EditorialLocale } from "./types";

type LocalizedText = Record<EditorialLocale, string>;

interface SourceDefinition {
  href: string;
  title: LocalizedText;
  supports: LocalizedText;
}

export interface ArticleSource {
  href: string;
  title: string;
  supports: string;
}

const sources = {
  mhlwOverview: {
    href: "https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku.html",
    title: {
      ja: "厚生労働省｜緊急避妊薬の調剤・販売について",
      en: "MHLW | Dispensing and sale of emergency contraceptives",
      zh: "日本厚生劳动省｜紧急避孕药的调剂与销售",
      vi: "MHLW Nhật Bản | Cấp phát và bán thuốc tránh thai khẩn cấp",
      ko: "일본 후생노동성 | 긴급피임약 조제·판매 안내",
    },
    supports: {
      ja: "OTC購入・対面診療・オンライン診療の経路と事前電話確認",
      en: "OTC, in-person and online-care routes, including calling ahead",
      zh: "OTC购买、线下面诊、在线诊疗路径及到店前电话确认",
      vi: "Các lộ trình OTC, khám trực tiếp, khám trực tuyến và việc gọi trước",
      ko: "OTC 구매·대면 진료·온라인 진료 경로와 사전 전화 확인",
    },
  },
  otcList: {
    href: "https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku_00005.html",
    title: {
      ja: "厚生労働省｜販売可能な薬局・店舗一覧（2026年7月1日更新）",
      en: "MHLW | Pharmacies and stores permitted to sell OTC emergency contraception",
      zh: "日本厚生劳动省｜可销售OTC紧急避孕药的药店与店铺名单",
      vi: "MHLW Nhật Bản | Danh sách nhà thuốc/cửa hàng được phép bán OTC",
      ko: "일본 후생노동성 | OTC 긴급피임약 판매 가능 약국·점포 목록",
    },
    supports: {
      ja: "掲載店舗、一覧の更新・削除、在庫と販売可能薬剤師の事前確認",
      en: "Eligible locations, list updates/removals, and stock/pharmacist checks",
      zh: "名单更新与删除，以及库存和可销售药剂师的事前确认",
      vi: "Cơ sở đủ điều kiện, cập nhật/xóa danh sách và xác nhận tồn kho/dược sĩ",
      ko: "등록 점포, 목록 갱신·삭제, 재고와 판매 가능 약사 사전 확인",
    },
  },
  careLists: {
    href: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000186912_00002.html",
    title: {
      ja: "厚生労働省｜緊急避妊の対面・オンライン診療と調剤対応一覧",
      en: "MHLW | In-person/online emergency-contraception care and dispensing lists",
      zh: "日本厚生劳动省｜紧急避孕线下/在线诊疗及调剂名单",
      vi: "MHLW Nhật Bản | Danh sách khám trực tiếp/trực tuyến và cấp phát thuốc",
      ko: "일본 후생노동성 | 긴급피임 대면·온라인 진료 및 조제 목록",
    },
    supports: {
      ja: "医療機関・オンライン診療・対応薬局が別の経路であること",
      en: "Distinct routes for medical institutions, online care and dispensing pharmacies",
      zh: "医疗机构、在线诊疗和调剂药店属于不同路径",
      vi: "Các lộ trình riêng cho cơ sở y tế, khám trực tuyến và nhà thuốc cấp phát",
      ko: "의료기관·온라인 진료·조제 약국이 서로 다른 경로임을 설명",
    },
  },
  saleRequirements: {
    href: "https://www.mhlw.go.jp/web/t_doc?dataId=00tc9940&dataType=1&pageNo=1",
    title: {
      ja: "厚生労働省｜販売体制に関する2026年3月31日改正通知",
      en: "MHLW | Revised OTC sale requirements (31 March 2026)",
      zh: "日本厚生劳动省｜2026年3月31日修订的销售要求",
      vi: "MHLW Nhật Bản | Yêu cầu bán OTC sửa đổi ngày 31/3/2026",
      ko: "일본 후생노동성 | 2026년 3월 31일 개정 판매 요건",
    },
    supports: {
      ja: "プライバシー配慮、販売記録、受診勧奨などの販売要件",
      en: "Privacy safeguards, sales records and recommendations to seek care",
      zh: "隐私保护、销售记录及就医建议等销售要求",
      vi: "Bảo vệ riêng tư, hồ sơ bán thuốc và khuyến nghị đi khám",
      ko: "사생활 보호, 판매 기록, 진료 권고 등 판매 요건",
    },
  },
  norlevoLeaflet: {
    href: "https://www.info.pmda.go.jp/downfiles/otc/PDF/J2501000152_01_A.pdf",
    title: {
      ja: "PMDA｜ノルレボ 一般用医薬品説明文書",
      en: "PMDA | NorLevo OTC medicine information leaflet",
      zh: "PMDA｜NorLevo非处方药说明书",
      vi: "PMDA | Tờ hướng dẫn thuốc OTC NorLevo",
      ko: "PMDA | 노레보 일반용의약품 설명문서",
    },
    supports: {
      ja: "72時間以内・できるだけ早い服用、服用後の確認事項",
      en: "Use within 72 hours as soon as possible and follow-up precautions",
      zh: "72小时内尽快服用及服药后的确认事项",
      vi: "Uống càng sớm càng tốt trong 72 giờ và lưu ý theo dõi sau dùng",
      ko: "72시간 이내 가능한 한 빠른 복용과 복용 후 확인 사항",
    },
  },
  resoelLeaflet: {
    href: "https://www.info.pmda.go.jp/downfiles/otc/PDF/K2601000014_02_A.pdf",
    title: {
      ja: "PMDA｜レソエル72 一般用医薬品説明文書",
      en: "PMDA | Resoel 72 OTC medicine information leaflet",
      zh: "PMDA｜Resoel 72非处方药说明书",
      vi: "PMDA | Tờ hướng dẫn thuốc OTC Resoel 72",
      ko: "PMDA | 레소엘72 일반용의약품 설명문서",
    },
    supports: {
      ja: "承認用法、性交前の予防効果がないこと、受診が必要な兆候",
      en: "Approved use, no pre-sex preventive effect, and signs requiring consultation",
      zh: "获批用法、不能在性交前预防以及需要咨询的征兆",
      vi: "Cách dùng được phê duyệt, không phòng ngừa trước quan hệ và dấu hiệu cần tư vấn",
      ko: "승인 용법, 성교 전 예방 효과 없음, 상담이 필요한 징후",
    },
  },
  norlevoPrice: {
    href: "https://www.daiichisankyo-hc.co.jp/site_norlevo/product/",
    title: {
      ja: "第一三共ヘルスケア｜ノルレボ製品情報・価格",
      en: "Daiichi Sankyo Healthcare | NorLevo product and price information",
      zh: "第一三共健康护理｜NorLevo产品与价格信息",
      vi: "Daiichi Sankyo Healthcare | Thông tin sản phẩm và giá NorLevo",
      ko: "다이이찌산쿄헬스케어 | 노레보 제품·가격 정보",
    },
    supports: {
      ja: "ノルレボ1錠のメーカー希望小売価格（税込7,480円）",
      en: "NorLevo one-tablet manufacturer suggested retail price (¥7,480 including tax)",
      zh: "NorLevo 1片的厂家建议零售价（含税7,480日元）",
      vi: "Giá bán lẻ đề xuất của nhà sản xuất cho 1 viên NorLevo (¥7,480, đã gồm thuế)",
      ko: "노레보 1정의 제조사 권장소비자가격(세금 포함 7,480엔)",
    },
  },
  resoelPrice: {
    href: "https://alinamin-kenko.jp/lesoeru72/column/price/index.html",
    title: {
      ja: "アリナミン製薬｜レソエル72の価格情報",
      en: "Alinamin Pharmaceutical | Resoel 72 price information",
      zh: "Alinamin制药｜Resoel 72价格信息",
      vi: "Alinamin Pharmaceutical | Thông tin giá Resoel 72",
      ko: "아리나민제약 | 레소엘72 가격 정보",
    },
    supports: {
      ja: "レソエル72 1錠のメーカー希望小売価格（税込6,930円）",
      en: "Resoel 72 one-tablet manufacturer suggested retail price (¥6,930 including tax)",
      zh: "Resoel 72 1片的厂家建议零售价（含税6,930日元）",
      vi: "Giá bán lẻ đề xuất của nhà sản xuất cho 1 viên Resoel 72 (¥6,930, đã gồm thuế)",
      ko: "레소엘72 1정의 제조사 권장소비자가격(세금 포함 6,930엔)",
    },
  },
  whoEmergencyContraception: {
    href: "https://www.who.int/news-room/fact-sheets/detail/emergency-contraception",
    title: {
      ja: "WHO｜Emergency contraception（緊急避妊）",
      en: "WHO | Emergency contraception",
      zh: "WHO｜紧急避孕",
      vi: "WHO | Tránh thai khẩn cấp",
      ko: "WHO | 응급 피임",
    },
    supports: {
      ja: "反復使用、将来の妊孕性、通常の避妊方法への移行に関する国際的情報",
      en: "Repeated use, future fertility and transition to regular contraception",
      zh: "重复使用、未来生育能力及转为常规避孕的国际信息",
      vi: "Dùng lặp lại, khả năng sinh sản sau này và chuyển sang tránh thai thường xuyên",
      ko: "반복 사용, 향후 임신 능력, 일반 피임법 전환에 관한 국제 정보",
    },
  },
} satisfies Record<string, SourceDefinition>;

type SourceKey = keyof typeof sources;

const sourceKeysBySlug: Record<string, SourceKey[]> = {
  "what-is-emergency-contraception": ["norlevoLeaflet", "resoelLeaflet"],
  "how-to-get-morning-after-pill": [
    "mhlwOverview",
    "otcList",
    "careLists",
    "norlevoLeaflet",
  ],
  "otc-pharmacies-guide": [
    "otcList",
    "saleRequirements",
    "norlevoLeaflet",
  ],
  "side-effects-and-safety": [
    "norlevoLeaflet",
    "resoelLeaflet",
    "whoEmergencyContraception",
  ],
  "timing-and-effectiveness": [
    "norlevoLeaflet",
    "resoelLeaflet",
    "careLists",
  ],
  "faq-emergency-contraception": [
    "mhlwOverview",
    "saleRequirements",
    "norlevoLeaflet",
    "resoelLeaflet",
    "whoEmergencyContraception",
  ],
  "cost-comparison": [
    "norlevoPrice",
    "resoelPrice",
    "mhlwOverview",
    "otcList",
    "careLists",
  ],
  "emergency-vs-regular-pill": ["norlevoLeaflet", "resoelLeaflet"],
  "myths-and-facts": [
    "norlevoLeaflet",
    "resoelLeaflet",
    "whoEmergencyContraception",
  ],
};

export function getArticleSources(
  slug: string,
  locale: EditorialLocale,
): ArticleSource[] {
  const keys = sourceKeysBySlug[slug] ?? [];

  return keys.map((key) => ({
    href: sources[key].href,
    title: sources[key].title[locale],
    supports: sources[key].supports[locale],
  }));
}
