import type { Answers, Result } from "@/types";

function elapsedHours(date: Date | null, now: Date): number | null {
  if (!date) return null;
  const timestamp = date.getTime();
  const nowTimestamp = now.getTime();
  if (!Number.isFinite(timestamp) || !Number.isFinite(nowTimestamp)) return null;
  const diff = nowTimestamp - timestamp;
  if (diff < 0) return null;
  return diff / (1000 * 60 * 60);
}

function ageOn(date: Date, birthDate: Date | null): number | null {
  if (!birthDate) return null;
  if (!Number.isFinite(date.getTime()) || !Number.isFinite(birthDate.getTime())) {
    return null;
  }
  let age = date.getFullYear() - birthDate.getFullYear();
  const beforeBirthday =
    date.getMonth() < birthDate.getMonth() ||
    (date.getMonth() === birthDate.getMonth() &&
      date.getDate() < birthDate.getDate());
  if (beforeBirthday) age -= 1;
  return age >= 0 ? age : null;
}

const ST_JOHNS_WORT = "セイヨウオトギリソウ（セントジョーンズワート）";

export function evaluate(answers: Answers, now = new Date()): Result {
  const hours = elapsedHours(answers.lastSexDate, now);
  const completedHours = hours === null ? null : Math.floor(hours);
  const age = ageOn(now, answers.birthDate);
  const hasUnknownCondition = answers.contraindications.includes("わからない");
  const hasLiverDisease = answers.contraindications.includes("肝臓病");
  const hasConditionToDiscuss = answers.contraindications.some(
    (condition) =>
      !["わからない", "特にない", "肝臓病"].includes(condition)
  );
  const hasStJohnsWort =
    answers.interactionRisk === ST_JOHNS_WORT ||
    answers.supplementTags.includes("セイヨウオトギリソウ");

  if (answers.dangerSymptoms === true) {
    return {
      route: "emergency",
      headline: "生命に関わる症状なら119番へ",
      detail:
        "突然または持続する激しい腹痛、意識障害、呼吸困難などがある場合は119番へ。判断に迷う場合は、対応地域の#7119または医療機関へ相談してください。",
      reasons: ["強い症状について、緊急性の確認を優先する必要があります。"],
      notes: [
        "下腹部痛や通常と異なる出血がある場合も、自己判断せず速やかに医療機関へ相談してください。",
      ],
      elapsedHours: completedHours,
    };
  }

  if (answers.nonConsensual === "yes") {
    return {
      route: "medical",
      headline: "医療機関と支援窓口へ、できるだけ早く相談を",
      detail:
        "緊急避妊だけでなく、けが・性感染症・心身のケアを含む支援を受けられます。警察への届出は支援を受ける条件ではありません。",
      reasons: ["同意のない、または同意を確認しづらい状況が示されています。"],
      notes: [
        "性犯罪・性暴力被害者のためのワンストップ支援センターは #8891 です。今まさに危険がある場合は110番へ連絡してください。",
      ],
      elapsedHours: completedHours,
    };
  }

  if (answers.pregnancyTest === "yes") {
    return {
      route: "medical",
      headline: "医療機関へ、できるだけ早く相談を",
      detail:
        "緊急避妊薬は、すでに成立した妊娠を中断する薬ではありません。妊娠検査が陽性の場合は医療機関で確認してください。",
      reasons: ["妊娠検査で陽性の結果が示されています。"],
      notes: [],
      elapsedHours: completedHours,
    };
  }

  if (hasLiverDisease) {
    return {
      route: "medical",
      headline: "医療機関へ、できるだけ早く相談を",
      detail:
        "一般用の緊急避妊薬は、肝臓病がある方は服用しないこととされています。自己判断せず、医師または薬剤師に相談してください。",
      reasons: ["肝臓病に関する回答があります。"],
      notes: [],
      elapsedHours: completedHours,
    };
  }

  const commonNotes: string[] = [
    "緊急避妊薬は100%妊娠を防ぐものではなく、性感染症も防ぎません。",
    "服用した場合は約3週間後に妊娠検査薬または産婦人科で妊娠の有無を確認してください。",
    "医師の治療を受けている方や、使用中の薬・サプリメント・アレルギー歴がある方は、購入前に薬剤師へ伝えてください。",
  ];
  if (answers.breastfeeding === "yes") {
    commonNotes.push(
      "授乳中は、服用後少なくとも24時間は授乳を避ける必要があります。薬剤師または医師に相談してください。"
    );
  }
  if (age !== null && age < 16) {
    commonNotes.push(
      "購入に一律の年齢制限や保護者同意の要件はありませんが、16歳未満の方には産婦人科・小児科等への相談を勧める運用です。年齢を薬剤師に伝えてください。"
    );
  }
  if (hasUnknownCondition) {
    commonNotes.push(
      "持病についてわからない点がある場合は、そのことを薬剤師または医師に伝えてください。"
    );
  }
  if (hasConditionToDiscuss) {
    commonNotes.push(
      "心臓病・腎臓病・重い消化器疾患・アレルギー歴などがある場合は、購入前に薬剤師へ伝えてください。"
    );
  }
  if (hasStJohnsWort) {
    commonNotes.push(
      "セイヨウオトギリソウは薬の作用に影響することがあります。自己判断で中止せず、使用中であることを薬剤師または医師へ必ず伝えてください。"
    );
  }

  if (hours === null) {
    return {
      route: "pharmacy",
      headline: "薬局または医療機関へ、今すぐ相談を",
      detail:
        "性交からの時間が確認できません。時間が重要なため、日時がわかる範囲で伝え、厚生労働省掲載の薬局または医療機関へすぐに相談してください。",
      reasons: ["性交の日時が不明なため、案内先を一つに確定できません。"],
      notes: commonNotes,
      elapsedHours: null,
    };
  }

  if (hours <= 72) {
    return {
      route: "pharmacy",
      headline: "薬局または医療機関へ、できるだけ早く相談を",
      detail:
        "厚生労働省の一覧にある店舗では、処方箋なしの対面販売を利用できる場合があります。来店前に在庫・研修修了薬剤師の勤務・営業時間を電話で確認してください。",
      reasons: ["性交から72時間以内です。服用は早いほど望ましいとされています。"],
      notes: commonNotes,
      elapsedHours: completedHours,
    };
  }

  return {
    route: "medical",
    headline: "医療機関へ、今すぐ相談を",
    detail:
      "薬局で販売される緊急避妊薬の承認された用法は性交後72時間以内です。72時間を過ぎても自己判断であきらめず、利用できる対応について医療機関へ直ちに相談してください。",
    reasons: ["性交から72時間を超えています。"],
    notes: commonNotes,
    elapsedHours: completedHours,
  };
}
