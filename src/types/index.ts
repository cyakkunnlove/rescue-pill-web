export type TriChoice = "yes" | "no" | "unknown";

export interface Answers {
  dangerSymptoms: boolean | null;
  lastSexDate: Date | null;
  contraceptionIssues: string[];
  nonConsensual: TriChoice | null;
  pregnancyTest: TriChoice | null;
  contraindications: string[];
  interactionRisk: boolean | null;
  breastfeeding: TriChoice | null;
  lastPeriodDate: Date | null;
  birthDate: Date | null;
  heightCm: number | null;
  weight: number | null;
  cycleLengthDays: number | null;
  locationText: string | null;
  conditionTags: string[];
  medicationTags: string[];
  supplementTags: string[];
  consultPreference: string | null;
}

export type ResultRoute = "pharmacy" | "medical" | "emergency";

export interface Result {
  route: ResultRoute;
  headline: string;
  detail: string;
  reasons: string[];
  notes: string[];
  elapsedHours: number | null;
}

export interface CaseMeta {
  caseId: string;
  createdAt: Date;
  expiresAt: Date;
}

export type FlowStep =
  | "landing"
  | "entry"
  | "precheck"
  | "questions"
  | "result"
  | "actions"
  | "checklist"
  | "qr"
  | "pdf";

export interface QuestionConfig {
  id: string;
  title: string;
  type:
    | "datetime"
    | "multi"
    | "tri"
    | "bool"
    | "date"
    | "number"
    | "text"
    | "single"
    | "tags";
  options?: string[];
  unknownLabel?: string;
  optional?: boolean;
  unit?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  hint?: string;
  categories?: TagCategory[];
}

export interface TagCategory {
  title: string;
  tags: string[];
}

export const CONDITION_CATEGORIES: TagCategory[] = [
  {
    title: "循環器",
    tags: ["高血圧", "心疾患", "不整脈", "血栓症既往"],
  },
  { title: "内分泌・代謝", tags: ["糖尿病", "脂質異常症", "甲状腺疾患"] },
  { title: "肝・腎", tags: ["肝機能障害", "腎機能障害"] },
  { title: "神経", tags: ["てんかん", "片頭痛"] },
  { title: "呼吸器", tags: ["喘息"] },
  { title: "血液", tags: ["貧血"] },
  { title: "精神・アレルギー", tags: ["精神疾患・不安", "アレルギー体質"] },
];

export const MEDICATION_CATEGORIES: TagCategory[] = [
  {
    title: "降圧薬",
    tags: [
      "アムロジピン",
      "ニフェジピン",
      "ロサルタン",
      "バルサルタン",
      "アジルサルタン",
      "オルメサルタン",
      "ビソプロロール",
      "カルベジロール",
      "エナラプリル",
      "カプトプリル",
    ],
  },
  {
    title: "抗凝固・抗血小板",
    tags: [
      "ワルファリン",
      "アピキサバン",
      "リバーロキサバン",
      "ダビガトラン",
      "エドキサバン",
      "アスピリン",
      "クロピドグレル",
      "シロスタゾール",
    ],
  },
  {
    title: "糖尿病",
    tags: [
      "メトホルミン",
      "シタグリプチン",
      "リナグリプチン",
      "アログリプチン",
      "ダパグリフロジン",
      "エンパグリフロジン",
      "グリメピリド",
      "インスリン",
    ],
  },
  {
    title: "脂質異常",
    tags: [
      "アトルバスタチン",
      "ロスバスタチン",
      "ピタバスタチン",
      "プラバスタチン",
      "エゼチミブ",
    ],
  },
  {
    title: "抗てんかん",
    tags: ["バルプロ酸", "カルバマゼピン", "ラモトリギン", "レベチラセタム"],
  },
  {
    title: "抗菌薬・抗ウイルス",
    tags: [
      "リファンピシン",
      "クラリスロマイシン",
      "アモキシシリン",
      "抗HIV薬",
    ],
  },
  {
    title: "胃腸・胃酸抑制",
    tags: [
      "ランソプラゾール",
      "オメプラゾール",
      "エソメプラゾール",
      "ファモチジン",
    ],
  },
  {
    title: "鎮痛・解熱",
    tags: [
      "ロキソプロフェン（ロキソニン）",
      "アセトアミノフェン（カロナール）",
      "イブプロフェン",
      "セレコキシブ",
    ],
  },
  {
    title: "抗アレルギー",
    tags: [
      "フェキソフェナジン（アレグラ）",
      "ロラタジン（クラリチン）",
      "セチリジン",
      "レボセチリジン",
    ],
  },
  {
    title: "抗うつ・精神",
    tags: [
      "セルトラリン",
      "パロキセチン",
      "エスシタロプラム",
      "デュロキセチン",
      "トラゾドン",
    ],
  },
  {
    title: "ホルモン・ピル",
    tags: ["低用量ピル", "黄体ホルモン製剤", "レボチロキシン"],
  },
  { title: "その他", tags: ["ステロイド", "漢方薬"] },
];

export const SUPPLEMENT_TAGS = [
  "セイヨウオトギリソウ",
  "鉄",
  "葉酸",
  "ビタミンC",
  "マルチビタミン",
  "DHA・EPA",
  "プロバイオティクス",
];

export const CONTRAINDICATION_OPTIONS = [
  "血栓症の既往",
  "重度の肝障害",
  "ポルフィリン症",
  "その他の禁忌",
  "わからない",
  "特にない",
];

export const CONTRACEPTION_OPTIONS = [
  "コンドーム破損/外れ",
  "膣外射精の失敗",
  "避妊なし",
  "その他",
];

export const CONSULT_OPTIONS = ["薬局", "医療機関", "未定"];
