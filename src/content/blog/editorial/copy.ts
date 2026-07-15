import type { EditorialLocale } from "./types";

interface EditorialCopy {
  reviewedLabel: string;
  sourcePolicySummary: string;
  bylineLabel: string;
  authorRole: string;
  authorshipBasis: string;
  policyLink: string;
  sourcesHeading: string;
  sourcesIntro: string;
}

const editorialCopy: Record<EditorialLocale, EditorialCopy> = {
  ja: {
    reviewedLabel: "最終確認",
    sourcePolicySummary:
      "厚生労働省・PMDA等の一次情報を確認しています。情報源と編集方針を見る",
    bylineLabel: "執筆・編集責任",
    authorRole: "薬剤師・Rescue Pill運営責任者",
    authorshipBasis:
      "公開一次情報をもとに、薬剤師である運営責任者が一般情報として作成・確認しています。外部の医師・医療機関による医学監修は受けていません。",
    policyLink: "運営者・編集・訂正方針を見る",
    sourcesHeading: "この記事の主な一次情報",
    sourcesIntro:
      "各リンクの内容を記事の根拠として確認しています。出典機関による本サイトの承認・推奨・提携を示すものではありません。",
  },
  en: {
    reviewedLabel: "Last reviewed",
    sourcePolicySummary:
      "Reviewed against primary sources from Japan's MHLW and PMDA. View sources and editorial policy.",
    bylineLabel: "Written and edited by",
    authorRole: "Pharmacist and Rescue Pill site operator",
    authorshipBasis:
      "The pharmacist who operates this site prepared and checked this general information against public primary sources. It has not undergone external medical review by a physician or medical institution.",
    policyLink: "View operator, editorial and correction policies",
    sourcesHeading: "Primary sources for this article",
    sourcesIntro:
      "These links support the statements identified below. Their inclusion does not imply endorsement, recommendation or partnership by the source institutions.",
  },
  zh: {
    reviewedLabel: "最后核对",
    sourcePolicySummary:
      "内容已根据日本厚生劳动省、PMDA等一手资料核对。查看资料来源与编辑方针。",
    bylineLabel: "撰写与编辑责任",
    authorRole: "药剂师、Rescue Pill网站运营负责人",
    authorshipBasis:
      "本一般信息由持有药剂师资格的网站运营负责人依据公开一手资料撰写并核对，未接受外部医生或医疗机构的医学审阅。",
    policyLink: "查看运营者、编辑及更正方针",
    sourcesHeading: "本文的主要一手资料",
    sourcesIntro:
      "以下链接用于支持所标明的内容，并不代表资料发布机构认可、推荐本网站或与本网站存在合作关系。",
  },
  vi: {
    reviewedLabel: "Kiểm tra lần cuối",
    sourcePolicySummary:
      "Nội dung được đối chiếu với nguồn chính thức của MHLW và PMDA Nhật Bản. Xem nguồn và chính sách biên tập.",
    bylineLabel: "Chịu trách nhiệm viết và biên tập",
    authorRole: "Dược sĩ, người vận hành Rescue Pill",
    authorshipBasis:
      "Dược sĩ vận hành trang đã biên soạn và kiểm tra thông tin chung này dựa trên nguồn chính thức công khai. Nội dung chưa được bác sĩ hay cơ sở y tế bên ngoài thẩm định y khoa.",
    policyLink: "Xem chính sách vận hành, biên tập và đính chính",
    sourcesHeading: "Nguồn chính thức của bài viết",
    sourcesIntro:
      "Các liên kết dưới đây làm căn cứ cho nội dung được nêu. Việc dẫn nguồn không có nghĩa các cơ quan đó phê duyệt, khuyến nghị hay hợp tác với trang này.",
  },
  ko: {
    reviewedLabel: "최종 확인",
    sourcePolicySummary:
      "일본 후생노동성·PMDA 등의 1차 자료로 확인했습니다. 출처와 편집 방침을 확인하세요.",
    bylineLabel: "집필·편집 책임",
    authorRole: "약사·Rescue Pill 운영 책임자",
    authorshipBasis:
      "사이트를 운영하는 약사가 공개 1차 자료를 바탕으로 일반 정보를 작성·확인했습니다. 외부 의사나 의료기관의 의학적 감수는 받지 않았습니다.",
    policyLink: "운영자·편집·정정 방침 보기",
    sourcesHeading: "이 글의 주요 1차 자료",
    sourcesIntro:
      "아래 링크를 해당 설명의 근거로 확인했습니다. 출처 기관이 이 사이트를 승인·추천하거나 제휴한다는 뜻은 아닙니다.",
  },
};

export function getEditorialCopy(locale: EditorialLocale): EditorialCopy {
  return editorialCopy[locale] ?? editorialCopy.ja;
}
