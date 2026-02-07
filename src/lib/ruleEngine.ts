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
  const hasSupplementRisk =
    answers.interactionRisk && answers.interactionRisk !== "特に飲んでいない";

  // 緊急症状チェック
  if (answers.dangerSymptoms === true) {
    return {
      route: "emergency",
      headline: "急いで医療機関へ連絡してください",
      detail: "強い症状があるため、自己判断は避けて受診を優先してください。",
      reasons: ["強い症状があり、まず安全確認が必要です。"],
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
      reasons: ["同意がない、または同意を確認しづらい状況の可能性があります。"],
      notes: ["一人で抱えず、医療機関や相談窓口（#8891・#8008）も利用できます。"],
      elapsedHours: hours,
    };
  }

  // 妊娠陽性チェック
  if (answers.pregnancyTest === "yes") {
    return {
      route: "medical",
      headline: "医療機関での相談をおすすめします",
      detail: "妊娠検査が陽性の場合、医療機関での確認が必要です。",
      reasons: ["妊娠検査で陽性の結果が出ています。"],
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
      reasons: ["持病や体質により、薬の選択を医師が確認する必要があります。"],
      notes: [],
      elapsedHours: hours,
    };
  }

  // 時間不明
  if (hours === null) {
    return {
      route: "pharmacy",
      headline: "まずは薬局で相談し、必要に応じて医療機関へ",
      detail:
        "性行為の日時により薬局で対応できる場合と、医療機関での対応が必要な場合があります。",
      reasons: [
        "性行為の日時が不明のため、薬局対応の可否が事前に確定できない状態です。",
      ],
      notes: [
        ...(hasSupplementRisk
          ? [
              "サプリメントは一時中止が必要になる場合があります。薬剤師に服用中の内容を必ず伝えてください。",
            ]
          : []),
        "薬剤師の判断により、医療機関の受診を案内される可能性があります。",
      ],
      elapsedHours: null,
    };
  }

  // 72時間以内
  if (hours <= 72) {
    reasons.push("性行為から72時間以内です。");

    if (answers.breastfeeding === "yes") {
      notes.push("授乳中の方は、服用可否を医療者に確認してください。");
    }
    if (answers.pregnancyTest === "unknown") {
      notes.push("未検査の場合は、必要に応じて妊娠検査を検討してください。");
    }
    if (hasUnknownContra) {
      notes.push(
        "持病や禁忌の情報が不明な場合、薬剤師の判断で医療機関の受診を案内される可能性があります。"
      );
    }
    if (bmiValue && bmiValue >= 30) {
      notes.push("体格（BMI）によっては、薬の効果が下がる可能性があります。");
    }
    if (hasSupplementRisk) {
      notes.push(
        "サプリメントは一時中止が必要になる場合があります。薬剤師に服用中の内容を必ず伝えてください。"
      );
      notes.push(
        "薬剤師の判断により、医療機関の受診を案内される可能性があります。"
      );
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
    reasons.push("性行為から72時間を超えており、医療機関での相談が適しています（120時間以内）。");
  } else {
    reasons.push("性行為から120時間を超えており、医療機関での相談が必要です。");
  }

  const medicalNotes: string[] = [];
  if (hasSupplementRisk) {
    medicalNotes.push(
      "サプリメントは一時中止が必要になる場合があります。医師・薬剤師に服用中の内容を必ず伝えてください。"
    );
  }
  if (hasUnknownContra) {
    medicalNotes.push(
      "薬局での相談は可能ですが、持病や禁忌が不明な場合は薬剤師の判断で医療機関受診を案内される可能性があります。"
    );
  }

  return {
    route: "medical",
    headline: "医療機関での相談をおすすめします",
    detail: "時間経過により医療機関での対応が安心です。",
    reasons,
    notes: medicalNotes,
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
