import { Answers, Result, ResultRoute } from "@/types";

function elapsedHours(date: Date | null): number | null {
  if (!date) return null;
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 0) return null;
  return Math.floor(diff / (1000 * 60 * 60));
}

function calculateBMI(
  heightCm: number | null,
  weightKg: number | null
): number | null {
  if (!heightCm || !weightKg || heightCm <= 0) return null;
  const meters = heightCm / 100;
  return weightKg / (meters * meters);
}

export function evaluate(answers: Answers): Result {
  const reasons: string[] = [];
  const notes: string[] = [];
  const hours = elapsedHours(answers.lastSexDate);
  const bmiValue = calculateBMI(answers.heightCm, answers.weight);
  const hasUnknownContra = answers.contraindications.includes("わからない");

  // 緊急症状チェック
  if (answers.dangerSymptoms === true) {
    return {
      route: "emergency",
      headline: "急いで医療機関へ連絡してください",
      detail: "強い症状があるため、自己判断は避けて受診を優先してください。",
      reasons: ["強い腹痛・大量出血などの症状がある"],
      notes: ["救急相談や夜間対応の医療機関も検討してください。"],
      elapsedHours: hours,
    };
  }

  // 非同意チェック
  if (answers.nonConsensual === "yes") {
    return {
      route: "medical",
      headline: "医療機関での相談をおすすめします",
      detail: "安心のため、医療機関でのサポートを優先してください。",
      reasons: ["同意が確認できない状況が含まれる可能性"],
      notes: ["必要に応じて支援先の相談も検討してください。"],
      elapsedHours: hours,
    };
  }

  // 妊娠陽性チェック
  if (answers.pregnancyTest === "yes") {
    return {
      route: "medical",
      headline: "医療機関での相談をおすすめします",
      detail: "妊娠検査が陽性の場合、医療機関での確認が必要です。",
      reasons: ["妊娠検査が陽性"],
      notes: [],
      elapsedHours: hours,
    };
  }

  // 禁忌チェック
  const contraindications = answers.contraindications.filter(
    (c) => c !== "わからない" && c !== "特にない"
  );
  if (contraindications.length > 0) {
    return {
      route: "medical",
      headline: "医療機関での相談をおすすめします",
      detail: "持病や禁忌の可能性があるため、医療機関での確認が安心です。",
      reasons: ["禁忌に該当する可能性がある"],
      notes: [],
      elapsedHours: hours,
    };
  }

  // 相互作用リスク
  if (answers.interactionRisk === true) {
    return {
      route: "medical",
      headline: "医療機関での相談をおすすめします",
      detail: "相互作用の可能性があるため、医療機関での確認が安心です。",
      reasons: ["相互作用の可能性がある薬・サプリの服用がある"],
      notes: [],
      elapsedHours: hours,
    };
  }

  // 時間不明
  if (hours === null) {
    return {
      route: "medical",
      headline: "医療機関での相談をおすすめします",
      detail: "時間が不明なため、医療機関での確認が安心です。",
      reasons: ["性交日時が未入力"],
      notes: [],
      elapsedHours: null,
    };
  }

  // 72時間以内
  if (hours <= 72) {
    reasons.push("性交から72時間以内");

    if (answers.breastfeeding === "yes") {
      notes.push("授乳中の場合は医療者に相談してください。");
    }
    if (answers.pregnancyTest === "unknown") {
      notes.push("必要に応じて妊娠検査を検討してください。");
    }
    if (hasUnknownContra) {
      notes.push("禁忌の有無が不明な場合は医療者に相談してください。");
    }
    if (bmiValue && bmiValue >= 30) {
      notes.push("BMIが高い場合、効果が低下する可能性があります。");
    }

    return {
      route: "pharmacy",
      headline: "薬局での対応が可能な可能性が高いです",
      detail: "時間内で禁忌が見られないため、薬局で相談できます。",
      reasons,
      notes,
      elapsedHours: hours,
    };
  }

  // 72-120時間
  if (hours <= 120) {
    reasons.push("性交から72時間を超過（120時間以内）");
  } else {
    reasons.push("性交から120時間を超過");
  }

  return {
    route: "medical",
    headline: "医療機関での相談をおすすめします",
    detail: "時間経過により医療機関での対応が安心です。",
    reasons,
    notes: hasUnknownContra
      ? ["禁忌の有無が不明な場合は医療者に相談してください。"]
      : [],
    elapsedHours: hours,
  };
}

export function getRouteInfo(route: ResultRoute): {
  badge: string;
  color: string;
  guidance: string;
  detail: string;
} {
  switch (route) {
    case "pharmacy":
      return {
        badge: "推奨: 薬局で対応できます",
        color: "primary",
        guidance: "薬局での相談が中心になります",
        detail:
          "薬局で対応できる可能性が高い状態です。不安が強い場合は医療機関に相談しても問題ありません。",
      };
    case "medical":
      return {
        badge: "推奨: 医療機関の受診が必要です",
        color: "warning",
        guidance: "医療機関での確認がより安全です",
        detail:
          "医療機関の受診を推奨します。薬局での相談も可能ですが、可能なら医療機関が安心です。",
      };
    case "emergency":
      return {
        badge: "緊急: 早急に受診してください",
        color: "danger",
        guidance: "早急な受診が必要です",
        detail:
          "時間が重要です。できるだけ早く医療機関へ向かってください。",
      };
  }
}
