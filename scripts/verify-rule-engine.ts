import assert from "node:assert/strict";

import { evaluate } from "../src/lib/ruleEngine";
import { translateResultLine } from "../src/lib/resultTranslations";
import type { Answers, ResultRoute } from "../src/types";
import type { Locale } from "../src/lib/i18n";

const REFERENCE_NOW = new Date("2026-07-13T12:00:00.000Z");

function hoursAgo(hours: number): Date {
  return new Date(REFERENCE_NOW.getTime() - hours * 60 * 60 * 1000);
}

function evaluateAt(answers: Answers) {
  return evaluate(answers, REFERENCE_NOW);
}

function baseAnswers(overrides: Partial<Answers> = {}): Answers {
  return {
    dangerSymptoms: false,
    lastSexDate: hoursAgo(24),
    contraceptionIssues: ["避妊なし"],
    nonConsensual: "no",
    pregnancyTest: "no",
    contraindications: ["特にない"],
    interactionRisk: "特に飲んでいない",
    breastfeeding: "no",
    lastPeriodDate: null,
    birthDate: new Date("2000-01-01T00:00:00+09:00"),
    heightCm: null,
    weight: null,
    cycleLengthDays: null,
    locationText: null,
    conditionTags: [],
    medicationTags: [],
    supplementTags: [],
    consultPreference: null,
    ...overrides,
  };
}

function expectRoute(route: ResultRoute, overrides: Partial<Answers>): void {
  assert.equal(evaluateAt(baseAnswers(overrides)).route, route);
}

expectRoute("emergency", { dangerSymptoms: true });
expectRoute("medical", { nonConsensual: "yes" });
assert.match(evaluateAt(baseAnswers({ nonConsensual: "yes" })).notes.join(" "), /#8891/);
expectRoute("medical", { pregnancyTest: "yes" });
expectRoute("medical", { contraindications: ["肝臓病"] });
expectRoute("pharmacy", { lastSexDate: hoursAgo(71.999) });
expectRoute("pharmacy", { lastSexDate: hoursAgo(72) });
expectRoute("medical", { lastSexDate: hoursAgo(72.001) });
expectRoute("pharmacy", { lastSexDate: null });
const invalidDate = evaluateAt(baseAnswers({ lastSexDate: new Date(Number.NaN) }));
assert.equal(invalidDate.route, "pharmacy");
assert.equal(invalidDate.elapsedHours, null);

const breastfeeding = evaluateAt(baseAnswers({ breastfeeding: "yes" }));
assert.match(breastfeeding.notes.join(" "), /24時間/);

const interaction = evaluateAt(
  baseAnswers({
    interactionRisk: "セイヨウオトギリソウ（セントジョーンズワート）",
  })
);
assert.match(interaction.notes.join(" "), /セイヨウオトギリソウ/);

const under16 = evaluateAt(
  baseAnswers({ birthDate: new Date(REFERENCE_NOW.getTime() - 15 * 365.25 * 24 * 60 * 60 * 1000) })
);
assert.match(under16.notes.join(" "), /一律の年齢制限や保護者同意の要件はありません/);

const general = evaluateAt(baseAnswers());
assert.match(general.notes.join(" "), /100%妊娠を防ぐものではなく/);
assert.match(general.notes.join(" "), /約3週間後/);
assert.doesNotMatch(general.detail + general.notes.join(" "), /120時間/);

const translatedScenarios = [
  evaluateAt(baseAnswers({ dangerSymptoms: true })),
  evaluateAt(baseAnswers({ nonConsensual: "yes" })),
  evaluateAt(baseAnswers({ pregnancyTest: "yes" })),
  evaluateAt(baseAnswers({ contraindications: ["肝臓病"] })),
  evaluateAt(baseAnswers({ lastSexDate: null })),
  evaluateAt(baseAnswers({ lastSexDate: hoursAgo(24) })),
  evaluateAt(baseAnswers({ lastSexDate: hoursAgo(73) })),
];
const dynamicLines = new Set(
  translatedScenarios.flatMap((result) => [
    result.headline,
    result.detail,
    ...result.reasons,
    ...result.notes,
  ])
);

for (const locale of ["en", "zh", "vi", "ko"] satisfies Locale[]) {
  for (const line of dynamicLines) {
    assert.notEqual(
      translateResultLine(line, locale),
      line,
      `missing ${locale} translation: ${line}`
    );
  }
}

console.log(
  `rule engine verification: 14 safety scenarios (including exact 72-hour boundaries) and ${dynamicLines.size} dynamic lines passed`
);
