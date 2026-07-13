import type { Locale } from "@/lib/i18n";

type NonJapaneseLocale = Exclude<Locale, "ja">;

const resultLineTranslations: Record<
  string,
  Record<NonJapaneseLocale, string>
> = {
  "生命に関わる症状なら119番へ": {
    en: "For potentially life-threatening symptoms in Japan, call 119",
    zh: "在日本，如出现可能危及生命的症状，请拨打119",
    vi: "Tại Nhật Bản, nếu có triệu chứng có thể đe dọa tính mạng, hãy gọi 119",
    ko: "일본에서 생명을 위협할 수 있는 증상이 있으면 119로 전화하세요",
  },
  "医療機関と支援窓口へ、できるだけ早く相談を": {
    en: "Contact a medical institution and support service as soon as possible",
    zh: "请尽快联系医疗机构和支援窗口",
    vi: "Hãy liên hệ cơ sở y tế và dịch vụ hỗ trợ càng sớm càng tốt",
    ko: "의료기관과 지원 창구에 가능한 한 빨리 상담하세요",
  },
  "医療機関へ、できるだけ早く相談を": {
    en: "Contact a medical institution as soon as possible",
    zh: "请尽快联系医疗机构",
    vi: "Hãy liên hệ cơ sở y tế càng sớm càng tốt",
    ko: "의료기관에 가능한 한 빨리 상담하세요",
  },
  "薬局または医療機関へ、今すぐ相談を": {
    en: "Contact a pharmacy or medical institution now",
    zh: "请立即联系药店或医疗机构",
    vi: "Hãy liên hệ nhà thuốc hoặc cơ sở y tế ngay",
    ko: "지금 바로 약국 또는 의료기관에 상담하세요",
  },
  "薬局または医療機関へ、できるだけ早く相談を": {
    en: "Contact a pharmacy or medical institution as soon as possible",
    zh: "请尽快联系药店或医疗机构",
    vi: "Hãy liên hệ nhà thuốc hoặc cơ sở y tế càng sớm càng tốt",
    ko: "약국 또는 의료기관에 가능한 한 빨리 상담하세요",
  },
  "医療機関へ、今すぐ相談を": {
    en: "Contact a medical institution now",
    zh: "请立即联系医疗机构",
    vi: "Hãy liên hệ cơ sở y tế ngay",
    ko: "지금 바로 의료기관에 상담하세요",
  },
  "突然または持続する激しい腹痛、意識障害、呼吸困難などがある場合は119番へ。判断に迷う場合は、対応地域の#7119または医療機関へ相談してください。": {
    en: "In Japan, call 119 if you have symptoms such as sudden or persistent severe abdominal pain, impaired consciousness, or difficulty breathing. If you are unsure, call #7119 where available or contact a medical provider.",
    zh: "在日本，如出现突发或持续的剧烈腹痛、意识障碍、呼吸困难等症状，请拨打119。如难以判断，请在服务开通地区拨打#7119，或联系医疗机构。",
    vi: "Tại Nhật Bản, nếu có các triệu chứng như đau bụng dữ dội đột ngột hoặc kéo dài, rối loạn ý thức hay khó thở, hãy gọi 119. Nếu không chắc, hãy gọi #7119 tại khu vực có hỗ trợ dịch vụ này hoặc liên hệ cơ sở y tế.",
    ko: "일본에서 갑자기 또는 지속적으로 심한 복통, 의식장애, 호흡곤란 등의 증상이 있으면 119로 전화하세요. 판단하기 어려운 경우에는 이용 가능 지역의 #7119로 전화하거나 의료기관에 상담하세요.",
  },
  "緊急避妊だけでなく、けが・性感染症・心身のケアを含む支援を受けられます。警察への届出は支援を受ける条件ではありません。": {
    en: "Support is available not only for emergency contraception but also for injuries, sexually transmitted infections, and physical and emotional care. Reporting to the police is not required to receive support.",
    zh: "除了紧急避孕外，还可获得伤情、性传播感染及身心照护等支援。向警方报案不是获得支援的前提。",
    vi: "Bạn có thể nhận hỗ trợ không chỉ về tránh thai khẩn cấp mà còn về thương tích, bệnh lây truyền qua đường tình dục và chăm sóc thể chất, tinh thần. Không cần trình báo cảnh sát để được hỗ trợ.",
    ko: "긴급 피임뿐 아니라 부상, 성매개감염, 신체적·정서적 돌봄을 포함한 지원을 받을 수 있습니다. 경찰 신고는 지원을 받기 위한 조건이 아닙니다.",
  },
  "緊急避妊薬は、すでに成立した妊娠を中断する薬ではありません。妊娠検査が陽性の場合は医療機関で確認してください。": {
    en: "Emergency contraception does not end an established pregnancy. If your pregnancy test is positive, contact a medical institution for confirmation.",
    zh: "紧急避孕药不能终止已经成立的妊娠。验孕结果为阳性时，请到医疗机构确认。",
    vi: "Thuốc tránh thai khẩn cấp không chấm dứt thai kỳ đã hình thành. Nếu que thử thai dương tính, hãy đến cơ sở y tế để xác nhận.",
    ko: "응급피임약은 이미 성립된 임신을 중단하는 약이 아닙니다. 임신 검사 결과가 양성이면 의료기관에서 확인하세요.",
  },
  "一般用の緊急避妊薬は、肝臓病がある方は服用しないこととされています。自己判断せず、医師または薬剤師に相談してください。": {
    en: "The instructions for nonprescription emergency contraception state that people with liver disease should not take it. Do not decide on your own; consult a doctor or pharmacist.",
    zh: "非处方紧急避孕药的说明规定，患有肝脏疾病者不得服用。请勿自行判断，并咨询医生或药剂师。",
    vi: "Hướng dẫn của thuốc tránh thai khẩn cấp không kê đơn nêu rằng người mắc bệnh gan không được dùng thuốc. Không tự quyết định; hãy hỏi bác sĩ hoặc dược sĩ.",
    ko: "일반의약품 응급피임약 설명서에는 간 질환이 있는 사람은 복용하지 않도록 되어 있습니다. 스스로 판단하지 말고 의사 또는 약사와 상담하세요.",
  },
  "性交からの時間が確認できません。時間が重要なため、日時がわかる範囲で伝え、厚生労働省掲載の薬局または医療機関へすぐに相談してください。": {
    en: "The time since sexual intercourse cannot be determined. Because timing matters, share the date and time as accurately as you can and immediately contact a pharmacy listed by Japan's Ministry of Health, Labour and Welfare or a medical provider.",
    zh: "无法确认距性交已过多长时间。由于时间很重要，请尽可能说明您记得的日期和时间，并立即联系日本厚生劳动省名单中的药店或医疗机构。",
    vi: "Không xác định được đã bao lâu kể từ khi quan hệ tình dục. Vì thời gian rất quan trọng, hãy cung cấp ngày giờ trong phạm vi bạn nhớ được và liên hệ ngay với nhà thuốc có tên trong danh sách của Bộ Y tế, Lao động và Phúc lợi Nhật Bản hoặc cơ sở y tế.",
    ko: "성관계 후 경과 시간을 확인할 수 없습니다. 시간이 중요하므로 기억나는 범위에서 날짜와 시간을 알리고, 일본 후생노동성 목록에 있는 약국 또는 의료기관에 즉시 상담하세요.",
  },
  "厚生労働省の一覧にある店舗では、処方箋なしの対面販売を利用できる場合があります。来店前に在庫・研修修了薬剤師の勤務・営業時間を電話で確認してください。": {
    en: "At outlets listed by Japan's Ministry of Health, Labour and Welfare, emergency contraception may be available through in-person sales without a prescription. Before visiting, call to confirm stock, whether a pharmacist who has completed the required training is on duty, and opening hours.",
    zh: "在日本厚生劳动省名单所列的门店，可能可以当面购买无需处方的紧急避孕药。到店前，请致电确认库存、完成规定培训的药剂师是否在岗以及营业时间。",
    vi: "Tại các điểm bán có trong danh sách của Bộ Y tế, Lao động và Phúc lợi Nhật Bản, thuốc tránh thai khẩn cấp có thể được bán trực tiếp mà không cần đơn. Trước khi đến, hãy gọi để xác nhận còn hàng, dược sĩ đã hoàn thành khóa đào tạo có đang làm việc hay không và giờ mở cửa.",
    ko: "일본 후생노동성 목록에 있는 판매처에서는 긴급피임약을 처방전 없이 대면 구매할 수 있는 경우가 있습니다. 방문 전에 재고, 교육을 이수한 약사의 근무 여부, 영업시간을 전화로 확인하세요.",
  },
  "薬局で販売される緊急避妊薬の承認された用法は性交後72時間以内です。72時間を過ぎても自己判断であきらめず、利用できる対応について医療機関へ直ちに相談してください。": {
    en: "The approved directions for emergency contraception sold at pharmacies specify use within 72 hours after sexual intercourse. Even after 72 hours, do not give up based on your own judgment; contact a medical institution immediately about available options.",
    zh: "药店销售的紧急避孕药，其获批用法为在性交后72小时内服用。即使已超过72小时，也不要自行放弃，请立即向医疗机构咨询可采取的措施。",
    vi: "Hướng dẫn được phê duyệt của thuốc tránh thai khẩn cấp bán tại nhà thuốc quy định dùng trong vòng 72 giờ sau khi quan hệ tình dục. Dù đã quá 72 giờ, đừng tự cho rằng không còn cách; hãy liên hệ ngay cơ sở y tế về các lựa chọn hiện có.",
    ko: "약국에서 판매되는 응급피임약의 승인된 용법은 성관계 후 72시간 이내 복용입니다. 72시간이 지났더라도 스스로 포기하지 말고, 가능한 대응에 대해 즉시 의료기관에 상담하세요.",
  },
  "強い症状について、緊急性の確認を優先する必要があります。": {
    en: "For severe symptoms, assessing urgency needs to take priority.",
    zh: "对于严重症状，需要优先确认是否具有紧急性。",
    vi: "Cần ưu tiên đánh giá mức độ khẩn cấp của các triệu chứng nặng.",
    ko: "심한 증상에 대해서는 긴급성 확인을 우선해야 합니다.",
  },
  "下腹部痛や通常と異なる出血がある場合も、自己判断せず速やかに医療機関へ相談してください。": {
    en: "If you have lower abdominal pain or bleeding that is different from usual, do not rely on self-assessment; contact a medical facility promptly.",
    zh: "即使出现下腹部疼痛或与平时不同的出血，也请勿自行判断，并尽快咨询医疗机构。",
    vi: "Ngay cả khi bị đau bụng dưới hoặc chảy máu khác với bình thường, vui lòng không tự phán đoán và hãy sớm liên hệ cơ sở y tế để được tư vấn.",
    ko: "하복부 통증이나 평소와 다른 출혈이 있는 경우에도 스스로 판단하지 말고 신속히 의료기관에 상담하십시오.",
  },
  "同意のない、または同意を確認しづらい状況が示されています。": {
    en: "The information provided suggests a situation where consent was not given or was difficult to confirm.",
    zh: "所提供的信息显示，可能存在未获得同意或难以确认是否获得同意的情况。",
    vi: "Thông tin đã cung cấp cho thấy có thể đã có tình huống không có sự đồng thuận hoặc khó xác nhận sự đồng thuận.",
    ko: "제공된 내용상 동의가 없었거나 동의 여부를 확인하기 어려운 상황일 가능성이 있습니다.",
  },
  "性犯罪・性暴力被害者のためのワンストップ支援センターは #8891 です。今まさに危険がある場合は110番へ連絡してください。": {
    en: "#8891 is Japan's nationwide short-dial number for the One-Stop Support Centers for victims/survivors of sexual crime and sexual violence. If you are in immediate danger, call 110.",
    zh: "#8891 是日本全国用于联系性犯罪、性暴力受害者/幸存者一站式支援中心的短号。如果您此刻正处于危险之中，请拨打 110。",
    vi: "#8891 là số gọi nhanh toàn quốc tại Nhật Bản để kết nối với Trung tâm hỗ trợ một cửa dành cho nạn nhân/người sống sót của tội phạm tình dục và bạo lực tình dục. Nếu bạn đang gặp nguy hiểm ngay lúc này, hãy gọi 110.",
    ko: "#8891은 일본의 성범죄·성폭력 피해자/생존자를 위한 원스톱 지원센터 전국 단축번호입니다. 지금 당장 위험한 상황이라면 110번으로 연락하십시오.",
  },
  "妊娠検査で陽性の結果が示されています。": {
    en: "The information provided indicates a positive pregnancy test result.",
    zh: "所提供的信息显示，妊娠检测结果为阳性。",
    vi: "Thông tin đã cung cấp cho thấy kết quả thử thai là dương tính.",
    ko: "제공된 내용상 임신 검사 결과가 양성입니다.",
  },
  "肝臓病に関する回答があります。": {
    en: "Your answers include information related to liver disease.",
    zh: "您的回答中包含与肝脏疾病有关的信息。",
    vi: "Câu trả lời của bạn có thông tin liên quan đến bệnh gan.",
    ko: "답변에 간 질환과 관련된 내용이 있습니다.",
  },
  "緊急避妊薬は100%妊娠を防ぐものではなく、性感染症も防ぎません。": {
    en: "Emergency contraception does not prevent pregnancy 100% and does not prevent sexually transmitted infections.",
    zh: "紧急避孕药并不能百分之百防止怀孕，也不能预防性传播感染。",
    vi: "Thuốc tránh thai khẩn cấp không ngăn ngừa mang thai 100% và cũng không phòng ngừa các bệnh lây truyền qua đường tình dục.",
    ko: "응급피임약이 임신을 100% 예방하는 것은 아니며 성매개감염도 예방하지 않습니다.",
  },
  "服用した場合は約3週間後に妊娠検査薬または産婦人科で妊娠の有無を確認してください。": {
    en: "If you take the medicine, check whether you are pregnant about three weeks later using a pregnancy test or by visiting an obstetrics and gynecology clinic.",
    zh: "如果已服药，请在约3周后使用验孕棒或到妇产科确认是否怀孕。",
    vi: "Nếu đã dùng thuốc, hãy kiểm tra có mang thai hay không sau khoảng 3 tuần bằng que thử thai hoặc tại cơ sở sản phụ khoa.",
    ko: "약을 복용한 경우 약 3주 후에 임신테스트기 또는 산부인과에서 임신 여부를 확인하십시오.",
  },
  "医師の治療を受けている方や、使用中の薬・サプリメント・アレルギー歴がある方は、購入前に薬剤師へ伝えてください。": {
    en: "Before purchase, tell the pharmacist if you are under a doctor's care or use any medicines or supplements, or if you have a history of allergies.",
    zh: "如正在接受医生治疗、正在使用药物或保健品，或有过敏史，请在购买前告知药剂师。",
    vi: "Trước khi mua thuốc, hãy cho dược sĩ biết nếu bạn đang được bác sĩ điều trị, đang dùng thuốc hoặc thực phẩm bổ sung, hoặc có tiền sử dị ứng.",
    ko: "의사의 치료를 받고 있거나 사용 중인 약·보충제 또는 알레르기 병력이 있다면 구매 전에 약사에게 알리십시오.",
  },
  "授乳中は、服用後少なくとも24時間は授乳を避ける必要があります。薬剤師または医師に相談してください。": {
    en: "If you are breastfeeding, you need to avoid breastfeeding for at least 24 hours after taking the medicine. Consult a pharmacist or doctor.",
    zh: "如果正在哺乳，服药后至少24小时内需要避免哺乳。请咨询药剂师或医生。",
    vi: "Nếu đang cho con bú, cần tránh cho con bú trong ít nhất 24 giờ sau khi dùng thuốc. Hãy tham khảo ý kiến dược sĩ hoặc bác sĩ.",
    ko: "수유 중이라면 약을 복용한 후 최소 24시간 동안 수유를 피해야 합니다. 약사 또는 의사와 상담하십시오.",
  },
  "購入に一律の年齢制限や保護者同意の要件はありませんが、16歳未満の方には産婦人科・小児科等への相談を勧める運用です。年齢を薬剤師に伝えてください。": {
    en: "There is no blanket age restriction or parental consent requirement for purchasing it. However, current practice recommends that people under 16 consult an obstetrics and gynecology or pediatric service. Please tell the pharmacist your age.",
    zh: "购买时没有统一适用的年龄限制，也不要求监护人同意；但在实际操作中，建议未满16岁者咨询妇产科、儿科等。请告知药剂师您的年龄。",
    vi: "Không có giới hạn tuổi áp dụng chung hoặc yêu cầu phải có sự đồng ý của cha mẹ/người giám hộ khi mua thuốc. Tuy nhiên, theo quy trình hiện hành, người dưới 16 tuổi được khuyến nghị tham khảo ý kiến cơ sở sản phụ khoa, nhi khoa hoặc cơ sở tương tự. Hãy cho dược sĩ biết tuổi của bạn.",
    ko: "구매에 일률적인 연령 제한이나 보호자 동의 요건은 없습니다. 다만 현행 운영상 16세 미만에게는 산부인과·소아과 등에 상담할 것을 권장합니다. 약사에게 나이를 알려 주십시오.",
  },
  "持病についてわからない点がある場合は、そのことを薬剤師または医師に伝えてください。": {
    en: "If there is anything you are unsure about regarding an underlying medical condition, tell the pharmacist or doctor.",
    zh: "如果对自己的既往疾病有不清楚之处，请将这一情况告知药剂师或医生。",
    vi: "Nếu có điều gì chưa rõ về bệnh nền của mình, hãy thông báo điều đó cho dược sĩ hoặc bác sĩ.",
    ko: "지병에 관해 잘 모르는 부분이 있다면 그 사실을 약사 또는 의사에게 알리십시오.",
  },
  "心臓病・腎臓病・重い消化器疾患・アレルギー歴などがある場合は、購入前に薬剤師へ伝えてください。": {
    en: "If you have heart disease, kidney disease, a severe gastrointestinal condition, a history of allergies, or a similar condition, tell the pharmacist before purchase.",
    zh: "如果有心脏病、肾脏病、严重的消化系统疾病、过敏史等，请在购买前告知药剂师。",
    vi: "Nếu mắc bệnh tim, bệnh thận, bệnh tiêu hóa nặng, có tiền sử dị ứng hoặc tình trạng tương tự, hãy thông báo cho dược sĩ trước khi mua thuốc.",
    ko: "심장병·신장병·중증 소화기 질환·알레르기 병력 등이 있다면 구매 전에 약사에게 알리십시오.",
  },
  "セイヨウオトギリソウは薬の作用に影響することがあります。自己判断で中止せず、使用中であることを薬剤師または医師へ必ず伝えてください。": {
    en: "St. John's Wort may affect how the medicine works. Do not stop using St. John's Wort on your own, and be sure to tell a pharmacist or doctor that you are using it.",
    zh: "贯叶连翘（圣约翰草）可能会影响药物的作用。请勿自行停用，并务必告知药剂师或医生您正在使用贯叶连翘（圣约翰草）。",
    vi: "St. John's Wort có thể ảnh hưởng đến tác dụng của thuốc. Không tự ý ngừng sử dụng St. John's Wort và hãy bảo đảm thông báo cho dược sĩ hoặc bác sĩ rằng bạn đang sử dụng sản phẩm này.",
    ko: "세인트존스워트는 약의 작용에 영향을 줄 수 있습니다. 임의로 사용을 중단하지 말고, 사용 중이라는 사실을 약사 또는 의사에게 반드시 알리십시오.",
  },
  "使用中のサプリメント名を、購入前に薬剤師へ伝えてください。": {
    en: "Before purchase, tell the pharmacist the names of any supplements you are using.",
    zh: "请在购买前将正在使用的保健品名称告知药剂师。",
    vi: "Trước khi mua thuốc, hãy cho dược sĩ biết tên các thực phẩm bổ sung bạn đang sử dụng.",
    ko: "구매 전에 사용 중인 보충제의 이름을 약사에게 알리십시오.",
  },
  "性交の日時が不明なため、案内先を一つに確定できません。": {
    en: "Because the date and time of sexual intercourse are unknown, we cannot determine one specific service to direct you to.",
    zh: "由于无法确定性交的日期和时间，目前无法确定一个明确的咨询去处。",
    vi: "Vì không xác định được ngày giờ quan hệ tình dục, không thể xác định một nơi tư vấn cụ thể duy nhất.",
    ko: "성관계 일시를 알 수 없어 안내할 곳을 하나로 확정할 수 없습니다.",
  },
  "性交から72時間以内です。服用は早いほど望ましいとされています。": {
    en: "It has been 72 hours or less since sexual intercourse. Taking the medicine sooner is considered preferable.",
    zh: "距性交时间不超过72小时。一般认为越早服用越好。",
    vi: "Chưa quá 72 giờ kể từ khi quan hệ tình dục. Việc dùng thuốc càng sớm càng được xem là tốt hơn.",
    ko: "성관계 후 72시간 이내입니다. 약은 빨리 복용할수록 바람직한 것으로 여겨집니다.",
  },
  "性交から72時間を超えています。": {
    en: "It has been more than 72 hours since sexual intercourse.",
    zh: "距性交时间已超过72小时。",
    vi: "Đã quá 72 giờ kể từ khi quan hệ tình dục.",
    ko: "성관계 후 72시간이 지났습니다.",
  },
};

export function translateResultLine(line: string, locale: Locale): string {
  if (locale === "ja") return line;
  return resultLineTranslations[line]?.[locale] ?? line;
}
