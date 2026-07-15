// Vietnamese blog content
// Nội dung blog tiếng Việt

interface BlogContent {
  title: string;
  description: string;
  date: string;
  category: string;
  content: string;
}

export const blogContents: Record<string, BlogContent> = {
  'what-is-emergency-contraception': {
    title: 'Thuốc tránh thai khẩn cấp là gì? Kiến thức cơ bản và cơ chế hoạt động',
    description: 'Giải thích dễ hiểu về tác dụng, thời điểm uống và tác dụng phụ của thuốc tránh thai khẩn cấp từ góc độ y học.',
    date: '2025-02-01',
    category: 'Kiến thức cơ bản',
    content: `
## Thuốc tránh thai khẩn cấp là gì?

Thuốc tránh thai khẩn cấp (còn gọi là thuốc sau quan hệ) là loại thuốc được sử dụng để ngăn ngừa mang thai sau khi quan hệ tình dục không sử dụng biện pháp tránh thai hoặc khi biện pháp tránh thai thất bại.

## Thành phần chính và các loại

Thành phần chính của thuốc tránh thai khẩn cấp được sử dụng tại Nhật Bản là **Levonorgestrel**. Về lưu ý an toàn và cách xử lý sau khi uống, hãy làm theo tờ hướng dẫn hiện hành của sản phẩm và lời giải thích của dược sĩ.

### Các sản phẩm tiêu biểu
- NorLevo (thuốc cần dược sĩ hướng dẫn và thuốc kê đơn)
- Resoel 72 (thuốc cần dược sĩ hướng dẫn)
- Các chế phẩm levonorgestrel do cơ sở y tế kê đơn

## Cơ chế hoạt động

Thuốc tránh thai khẩn cấp ngăn ngừa mang thai chủ yếu thông qua các cơ chế sau:

1. **Ức chế hoặc trì hoãn rụng trứng** - Nếu uống trước khi rụng trứng, thuốc sẽ ức chế hoặc trì hoãn quá trình rụng trứng
2. **Ngăn cản thụ tinh** - Có thể ngăn cản tinh trùng gặp trứng

**Quan trọng**: Thuốc tránh thai khẩn cấp không có tác dụng với thai kỳ đã làm tổ. Nghĩa là, đây không phải thuốc phá thai.

## Hiệu quả và thời điểm uống

Thuốc tránh thai khẩn cấp levonorgestrel cần được uống **càng sớm càng tốt trong vòng 72 giờ** sau quan hệ. Thuốc không ngăn ngừa mang thai 100%. Ba tuần sau khi uống, hãy dùng que thử thai hoặc đến cơ sở y tế để xác nhận không mang thai.

## Cách uống

Uống 1 viên với nước hoặc nước ấm. Khi mua tại nhà thuốc, chính người sẽ uống thuốc phải nghe dược sĩ giải thích và uống tại nhà thuốc trước mặt dược sĩ.

## Lưu ý

- Thuốc tránh thai khẩn cấp là thuốc dùng cho "trường hợp khẩn cấp". Không nên sử dụng liên tục như biện pháp tránh thai thông thường
- Không thể ngăn ngừa mang thai 100%
- Không có tác dụng phòng ngừa các bệnh lây truyền qua đường tình dục

## Tóm tắt

Thuốc tránh thai khẩn cấp là lựa chọn quan trọng để ngăn ngừa mang thai khi biện pháp tránh thai thất bại. Điều quan trọng là có kiến thức đúng đắn và sử dụng đúng cách khi cần thiết.

Nếu có lo lắng, hãy tham khảo ý kiến dược sĩ hoặc bác sĩ.
    `,
  },
  'how-to-get-morning-after-pill': {
    title: 'Cách mua thuốc tránh thai khẩn cấp: Quy trình tại nhà thuốc và bệnh viện',
    description: 'Giải thích ba lộ trình tại Nhật Bản: mua OTC tại nhà thuốc đủ điều kiện, khám trực tiếp và khám trực tuyến kèm nhận thuốc tại nhà thuốc đủ điều kiện.',
    date: '2025-01-28',
    category: 'Cách mua',
    content: `
## Cách mua thuốc tránh thai khẩn cấp

Tại Nhật Bản, có ba lộ trình riêng: mua không cần đơn tại nhà thuốc OTC đủ điều kiện, khám trực tiếp tại cơ sở y tế, hoặc khám trực tuyến rồi nhận và uống thuốc tại nhà thuốc đủ điều kiện.

## 1. Mua tại nhà thuốc OTC

Từ ngày 2/2/2026, nhà thuốc được chỉ định có thể bán thuốc tránh thai khẩn cấp không cần đơn dưới dạng thuốc cần dược sĩ hướng dẫn. Danh sách nhà thuốc MHLW được cập nhật ngày 1/7/2026.

### Quy trình mua

1. **Tìm nhà thuốc được chỉ định** - Kiểm tra danh sách MHLW mới nhất
2. **Gọi trước khi đến** - Xác nhận còn hàng và có dược sĩ đã hoàn thành đào tạo đang làm việc
3. **Đích thân đến nhà thuốc** - Chính người sẽ uống thuốc nhận kiểm tra và giải thích từ dược sĩ
4. **Uống tại chỗ** - Uống 1 viên tại nhà thuốc trước mặt dược sĩ
5. **Kiểm tra sau 3 tuần** - Dùng que thử thai hoặc đến cơ sở y tế để xác nhận không mang thai

### Chi phí
Giá khác nhau tùy sản phẩm và nhà thuốc. Hãy xác nhận giá và phương thức thanh toán trước khi đến.

### Lưu ý
- Giấy tờ chính thức do chính phủ cấp không phải lúc nào cũng bắt buộc, nhưng dược sĩ sẽ xác nhận tuổi và nhà thuốc có thể yêu cầu xuất trình giấy tờ
- Không giới hạn tuổi, nhưng theo thực hành hiện hành, người dưới 16 tuổi được khuyến nghị tham khảo cơ sở y tế
- Không phải nhà thuốc nào cũng bán được

## 2. Được kê đơn tại khoa sản phụ khoa

Phương pháp khám bác sĩ tại cơ sở y tế và được kê đơn.

### Quy trình khám

1. **Liên hệ cơ sở y tế** - Xác nhận có thể kê đơn thuốc tránh thai khẩn cấp không
2. **Khám** - Hỏi bệnh và khám nếu cần
3. **Nhận đơn thuốc** - Hoặc được cấp thuốc ngay tại bệnh viện
4. **Uống thuốc**

### Chi phí
Phí khám và tiền thuốc khác nhau tùy cơ sở y tế. Trước khi đến, hãy xác nhận khả năng tiếp nhận, giờ đăng ký và chi phí.

### Ưu điểm
- Được kê đơn có xem xét tình trạng sức khỏe và tiền sử bệnh
- Có thể tư vấn nếu lo lắng về tác dụng phụ
- Nhận được lời khuyên về việc tránh thai trong tương lai

## 3. Khám trực tuyến

Một số cơ sở y tế cung cấp khám trực tuyến. Bác sĩ có thể yêu cầu chuyển sang khám trực tiếp nếu cần. Nếu được kê đơn theo lộ trình trực tuyến, bạn vẫn phải đến nhà thuốc đủ điều kiện, nhận hướng dẫn và uống 1 viên trước mặt dược sĩ đã hoàn thành đào tạo; đây không phải lộ trình giao thuốc về nhà.

### Lưu ý
- Không mặc định rằng thuốc sẽ được giao về nhà; hãy xác nhận cơ sở y tế và nhà thuốc được chỉ định
- Xác nhận trước tồn kho, lịch làm việc của dược sĩ đã hoàn thành đào tạo và giờ tiếp nhận tại nhà thuốc được chỉ định

## Nên chọn cách nào?

| Tình huống | Khuyến nghị |
|-----|---------|
| Muốn có ngay | Nhà thuốc OTC hoặc khoa sản gần nhất |
| Có bệnh nền hoặc lo lắng | Khoa sản phụ khoa |
| Đêm hoặc ngày nghỉ | Gọi trước cho nhà thuốc hoặc cơ sở y tế để xác nhận có tiếp nhận và có thuốc |

## Tóm tắt

Thuốc OTC được phê duyệt tại Nhật Bản dùng 1 viên trong vòng 72 giờ sau quan hệ và cần uống càng sớm càng tốt trong khoảng thời gian này. Hãy bình tĩnh gọi trước để chọn lộ trình có thể tiếp nhận bạn sớm nhất.

Với ứng dụng này, bạn có thể dễ dàng tìm kiếm nhà thuốc OTC và cơ sở y tế gần bạn. Hãy tận dụng nhé.
    `,
  },
  'otc-pharmacies-guide': {
    title: 'Cách tìm nhà thuốc OTC và những điều cần biết trước',
    description: 'Hướng dẫn cách tìm nhà thuốc có thể mua thuốc tránh thai khẩn cấp không cần đơn và quy trình mua hàng.',
    date: '2025-01-25',
    category: 'Cách mua',
    content: `
## Nhà thuốc OTC là gì?

Nhà thuốc được chỉ định đáp ứng các điều kiện bán thuốc tránh thai khẩn cấp không cần đơn dưới dạng thuốc cần dược sĩ hướng dẫn. Việc bán chính thức tại nhà thuốc bắt đầu ngày 2/2/2026.

## Cách tìm nhà thuốc OTC

### 1. Sử dụng ứng dụng này
Rescue Pill cho phép tìm nhà thuốc OTC theo tỉnh/thành, tên nhà thuốc hoặc địa chỉ.

### 2. Kiểm tra danh sách của Bộ Y tế
Danh sách nhà thuốc được chỉ định trên toàn quốc được công bố trên trang web MHLW. Danh sách được cập nhật ngày 1/7/2026; vì có thể thêm hoặc xóa, hãy luôn kiểm tra bản mới nhất.

### 3. Gọi điện xác nhận
Trước khi đến, hãy gọi xác nhận còn hàng, có dược sĩ đã hoàn thành đào tạo đang làm việc và giờ tiếp nhận.

## Tiêu chí chọn nhà thuốc

- **Giờ mở cửa** - Có mở vào ban đêm hoặc ngày nghỉ không
- **Cách bảo vệ riêng tư** - Có thể là phòng riêng, vách ngăn, điều chỉnh thời gian hoặc cách nói chuyện; không phải nơi nào cũng có phòng riêng
- **Vị trí** - Có thể đến ngay không
- **Tồn kho và lịch dược sĩ** - Luôn xác nhận qua điện thoại trước khi đến

## Quy trình mua hàng (chi tiết)

### Bước 1: Đến nhà thuốc
Nói với quầy thuốc "Tôi muốn mua thuốc tránh thai khẩn cấp".

### Bước 2: Trao đổi trong môi trường có chú ý đến riêng tư
Dược sĩ phải chú ý đầy đủ đến quyền riêng tư, nhưng cách bố trí khác nhau tùy nơi, chẳng hạn phòng riêng, vách ngăn, điều chỉnh thời gian hoặc âm lượng giọng nói. Việc có tên trong danh sách không đồng nghĩa chắc chắn có phòng riêng.

Những thông tin được xác nhận:
- Ngày kinh cuối
- Ngày giờ quan hệ tình dục
- Tiền sử bệnh và dị ứng
- Thuốc đang dùng hiện tại

### Bước 3: Nhận giải thích
Dược sĩ sẽ giải thích về:
- Tác dụng và cách dùng thuốc
- Về tác dụng phụ
- Cách theo dõi sau đó

### Bước 4: Mua và uống
Chính người sẽ uống thuốc thanh toán và uống 1 viên tại nhà thuốc trước mặt dược sĩ.

### Bước 5: Theo dõi
Ba tuần sau khi uống, hãy dùng que thử thai hoặc đến cơ sở y tế để xác nhận không mang thai.

## Những thứ cần mang theo

- **Những thứ nhà thuốc yêu cầu** (giấy tờ chính thức không phải lúc nào cũng bắt buộc, nhưng dược sĩ sẽ xác nhận tuổi và có thể yêu cầu giấy tờ)
- **Phương thức thanh toán và giá đã xác nhận với nhà thuốc**

## Câu hỏi thường gặp

### Q: Nam giới có thể mua thay không?
A: Không. Nguyên tắc chỉ bản thân mới có thể mua.

### Q: Có thể mua từ mấy tuổi?
A: Không có giới hạn tuổi. Theo thực hành hiện hành, người dưới 16 tuổi được khuyến nghị tham khảo cơ sở y tế.

### Q: Có cần đặt trước không?
A: Yêu cầu khác nhau tùy nhà thuốc. Hãy gọi trước để xác nhận còn hàng, lịch của dược sĩ đã hoàn thành đào tạo và quy trình tiếp nhận.

## Tóm tắt

Nhà thuốc OTC là lựa chọn quan trọng để nhanh chóng có được thuốc tránh thai khẩn cấp. Xác nhận địa điểm trước sẽ giúp bạn không hoảng loạn khi cần thiết.
    `,
  },
  'side-effects-and-safety': {
    title: 'Tác dụng phụ và độ an toàn của thuốc tránh thai khẩn cấp',
    description: 'Tổng hợp các triệu chứng có thể xảy ra sau khi uống, những điều cần lưu ý và các điểm quan trọng để sử dụng an toàn.',
    date: '2025-01-20',
    category: 'An toàn',
    content: `
## Độ an toàn của thuốc tránh thai khẩn cấp

Thuốc tránh thai khẩn cấp levonorgestrel được sử dụng rộng rãi trên thế giới. Khi dùng sản phẩm OTC tại Nhật Bản, hãy ưu tiên làm theo tờ hướng dẫn hiện hành và lời giải thích của dược sĩ đã hoàn thành đào tạo.

Biểu hiện triệu chứng khác nhau tùy người. Trước khi dùng, hãy báo cho dược sĩ nếu bạn đang được điều trị, đã được chẩn đoán mắc bệnh hoặc từng bị dị ứng do thuốc.

## Các tác dụng phụ có thể xảy ra

Các triệu chứng sau có thể xuất hiện sau khi dùng thuốc. Tờ hướng dẫn OTC hiện hành tại Nhật Bản yêu cầu người có các triệu chứng này mang theo tờ hướng dẫn và hỏi bác sĩ hoặc dược sĩ; tờ hướng dẫn không nêu một thời hạn chung để triệu chứng hết.

### Các triệu chứng có thể xuất hiện sau khi dùng
- Buồn nôn, nôn, đau bụng dưới, tiêu chảy hoặc đau bụng
- Đau đầu, buồn ngủ, chóng mặt hoặc lo âu
- Chảy máu âm đạo bất thường hoặc rối loạn kinh nguyệt (kinh nhiều, chậm kinh)
- Thiếu máu, khó chịu hoặc mệt mỏi, cảm giác bồng bềnh, khô miệng, cảm giác nóng, sưng tay chân hoặc đau khi ấn vào vú

### Khi xuất hiện triệu chứng
Không nên tự cho rằng triệu chứng sẽ tự hết. Khi hỏi ý kiến, hãy cho biết tên sản phẩm và thời điểm uống, đồng thời mang theo tờ hướng dẫn để hỏi bác sĩ hoặc dược sĩ.

## Nếu nôn sau khi uống

Nếu nôn trong vòng 2 giờ sau khi uống, có thể thành phần thuốc chưa được hấp thu đầy đủ.

**Cách xử lý**: Liên hệ cơ sở y tế hoặc nhà thuốc để tư vấn xem có cần uống lại không.

## Thay đổi kinh nguyệt và kiểm tra thai

Thời điểm có kinh hoặc lượng máu có thể thay đổi sau khi dùng thuốc. Tờ hướng dẫn OTC hiện hành tại Nhật Bản yêu cầu mang theo tờ hướng dẫn và sớm hỏi bác sĩ hoặc dược sĩ nếu có bất kỳ dấu hiệu nào sau đây:

- Kinh nguyệt muộn hơn thời điểm dự kiến từ 7 ngày trở lên
- Kinh đến sớm hơn dự kiến hoặc lượng máu khác bình thường
- Chảy máu, đau đầu, buồn nôn, mệt mỏi hoặc buồn ngủ có thể gặp quanh kỳ kinh hay đầu thai kỳ kéo dài từ 7 ngày trở lên

Dù không có các dấu hiệu này, không nên chỉ dựa vào việc có ra máu hay không. Ba tuần sau khi uống, hãy dùng que thử thai hoặc đến cơ sở y tế để kiểm tra.

## Lưu ý khi sử dụng

### Người không thể sử dụng
- Người dị ứng với thành phần của thuốc
- Người đã được chẩn đoán mắc bệnh gan
- Người đã có thai kỳ được xác lập, chẳng hạn khi kết quả thử thai dương tính

### Người đang cho con bú
Tờ hướng dẫn OTC hiện hành tại Nhật Bản yêu cầu người đang cho con bú không dùng thuốc này, hoặc tránh cho bú ít nhất 24 giờ sau khi uống. Hãy báo cho dược sĩ trước khi dùng và xác nhận thời điểm có thể cho bú lại.

### Người cần hỏi dược sĩ trước khi dùng
- Người đang được bác sĩ điều trị
- Người có bệnh tim
- Người có bệnh thận
- Người mắc bệnh tiêu hóa nặng

Nếu thuộc các trường hợp trên, hãy tham khảo ý kiến dược sĩ hoặc bác sĩ.

## Tương tác thuốc

Khi dùng đồng thời với các thuốc sau, hiệu quả của thuốc tránh thai khẩn cấp có thể giảm:

- Thuốc chống động kinh (Phenobarbital, Phenytoin, v.v.)
- Thuốc chống lao (Rifampicin)
- Một số thuốc điều trị HIV
- St. John's Wort (thực phẩm chức năng)

Nếu đang dùng các thuốc này, hãy nhớ thông báo cho dược sĩ hoặc bác sĩ.

## Có ảnh hưởng lâu dài không?

WHO cho biết tránh thai khẩn cấp không làm tổn hại khả năng sinh sản trong tương lai và không làm chậm sự trở lại của khả năng sinh sản sau khi dùng.

Việc dùng lặp lại không bị cấm trong mọi trường hợp, nhưng đây không phải là biện pháp tránh thai thường xuyên. Nếu cần dùng nhiều lần, hãy hỏi dược sĩ hoặc bác sĩ về biện pháp tránh thai lâu dài.

## Tóm tắt

Tác dụng phụ vẫn có thể xuất hiện ngay cả khi dùng đúng theo hướng dẫn được phê duyệt. Nếu xuất hiện triệu chứng, hãy mang theo tờ hướng dẫn và hỏi dược sĩ hoặc bác sĩ.

Sử dụng với kiến thức đúng đắn sẽ giúp bạn yên tâm khi cần tránh thai khẩn cấp.
    `,
  },
  'timing-and-effectiveness': {
    title: 'Thời điểm uống và hiệu quả: Tại sao trong vòng 72 giờ là quan trọng',
    description: 'Giải thích cách dùng được phê duyệt tại Nhật Bản, mốc 72 giờ, cơ chế tác dụng và cách kiểm tra sau khi uống.',
    date: '2025-01-15',
    category: 'Kiến thức cơ bản',
    content: `
## Mốc 72 giờ trong hướng dẫn tại Nhật Bản

Đối với thuốc tránh thai khẩn cấp OTC levonorgestrel tại Nhật Bản, cách dùng được phê duyệt là **uống 1 viên một lần, trong vòng 72 giờ sau quan hệ và càng sớm càng tốt**. Đây là giới hạn sử dụng được ghi trong tờ hướng dẫn, không phải lời bảo đảm tránh thai.

## Thời điểm uống và kiểm tra sau đó

Thuốc tránh thai khẩn cấp levonorgestrel cần được uống càng sớm càng tốt trong vòng 72 giờ sau quan hệ. Thuốc không ngăn ngừa mang thai 100%, vì vậy ba tuần sau khi uống hãy dùng que thử thai hoặc đến cơ sở y tế để xác nhận không mang thai.

## Tại sao hiệu quả thay đổi theo thời gian

Tác dụng chính của thuốc tránh thai khẩn cấp là **ức chế hoặc trì hoãn rụng trứng**.

### Khi uống trước khi rụng trứng
Có thể ức chế hoặc trì hoãn rụng trứng, qua đó làm giảm khả năng tinh trùng gặp trứng.

### Khi uống sau khi rụng trứng
Nếu rụng trứng đã xảy ra, không thể có được hiệu quả ức chế rụng trứng. Trong trường hợp này, hiệu quả tránh thai bị hạn chế.

Không thể biết chính xác thời điểm rụng trứng chỉ từ lịch, vì vậy không nên trì hoãn việc liên hệ nhà thuốc hoặc cơ sở y tế trong khoảng 72 giờ.

## Nếu quá 72 giờ thì sao?

Nếu đã quá 72 giờ, đừng tự bỏ cuộc hoặc chờ đợi. Hãy liên hệ cơ sở y tế ngay; lựa chọn phù hợp phụ thuộc vào thời gian đã qua và tình trạng của bạn.

## Nếu đang là ban đêm hoặc ngày nghỉ

Không phải mọi nhà thuốc hoặc cơ sở cấp cứu đều có thuốc hay tiếp nhận trường hợp này. Hãy gọi trước để xác nhận tồn kho, giờ tiếp nhận và người có thể xử lý. Nếu dùng khám trực tuyến, bác sĩ có thể chuyển sang khám trực tiếp; khi được kê đơn theo lộ trình này, bạn đến nhà thuốc đủ điều kiện và uống thuốc trước mặt dược sĩ đã hoàn thành đào tạo, không phải chờ giao thuốc về nhà.

## Chuẩn bị trước

Để không hoảng loạn khi khẩn cấp, khuyến khích xác nhận trước những điều sau:

1. **Vị trí và giờ mở cửa của nhà thuốc OTC gần đó**
2. **Cơ sở y tế hỗ trợ tránh thai khẩn cấp**
3. **Chi phí và phương thức thanh toán khác nhau tùy sản phẩm, nhà thuốc và cơ sở y tế**

## Tóm tắt

Hãy dựa vào cách dùng được phê duyệt: 1 viên một lần trong vòng 72 giờ và càng sớm càng tốt. Thuốc không ngăn ngừa mang thai 100%, vì vậy vẫn cần kiểm tra sau khi uống.

Với ứng dụng này, bạn có thể tìm kiếm ngay nhà thuốc OTC và cơ sở y tế gần đó. Hãy đánh dấu để phòng trường hợp khẩn cấp.
    `,
  },
  'faq-emergency-contraception': {
    title: 'Câu hỏi thường gặp: Giải đáp thắc mắc về thuốc tránh thai khẩn cấp',
    description: 'Trả lời các câu hỏi thường gặp như "Ảnh hưởng đến kinh nguyệt?", "Dùng nhiều lần có sao không?".',
    date: '2025-01-10',
    category: 'FAQ',
    content: `
## Câu hỏi và trả lời thường gặp

Trả lời các câu hỏi được nhiều người hỏi về thuốc tránh thai khẩn cấp.

---

### Q1: Uống thuốc tránh thai khẩn cấp có ngăn ngừa mang thai 100% không?

**A: Không, không phải 100%.**

Thuốc không ngăn ngừa mang thai 100%. Bất kể có ra máu hay không, ba tuần sau khi uống hãy dùng que thử thai hoặc đến cơ sở y tế để xác nhận không mang thai.

---

### Q2: Tác dụng phụ có làm tăng cân không?

**A: Không thể kết luận chung rằng cân nặng sẽ hay sẽ không thay đổi.**

Tờ hướng dẫn OTC hiện hành tại Nhật Bản liệt kê sưng tay hoặc chân là một trong các triệu chứng cần hỏi bác sĩ hoặc dược sĩ. Nếu xuất hiện sưng tay hoặc chân, hãy mang theo tờ hướng dẫn và hỏi bác sĩ hoặc dược sĩ bất kể mức độ hay thời gian kéo dài. Không tự quyết định chỉ dựa vào thay đổi cân nặng; hãy hỏi ý kiến nếu bạn lo lắng.

---

### Q3: Uống nhiều lần có sao không?

**A: Không bị cấm một cách tự động, nhưng đây không phải biện pháp tránh thai thường xuyên.**

WHO cho biết việc dùng lặp lại không có nguy cơ sức khỏe đã biết, nhưng dùng thường xuyên có thể làm tăng tác dụng phụ như rối loạn kinh nguyệt. Hướng dẫn bán thuốc tại Nhật Bản dùng mốc từ 2 lần mua trong 3 tháng để khuyến nghị tư vấn sản phụ khoa hoặc nhi khoa; đây là hướng dẫn tư vấn và chuyển khám, không phải lệnh cấm bán.

---

### Q4: Ảnh hưởng đến kinh nguyệt như thế nào?

**A: Có thể có thay đổi về thời gian và lượng kinh.**

- Kinh nguyệt chưa bắt đầu từ 7 ngày trở lên sau thời điểm dự kiến
- Kinh đến sớm hơn dự kiến hoặc lượng máu khác bình thường
- Chảy máu, đau đầu, buồn nôn, mệt mỏi hoặc buồn ngủ có thể gặp quanh kỳ kinh hay đầu thai kỳ kéo dài từ 7 ngày trở lên

Nếu có bất kỳ dấu hiệu nào trên, hãy mang theo tờ hướng dẫn và sớm hỏi bác sĩ hoặc dược sĩ. Dù không có các dấu hiệu này, vẫn cần thử thai hoặc đến cơ sở y tế 3 tuần sau khi uống.

---

### Q5: Đang cho con bú có thể uống không?

**A: Phải báo cho dược sĩ trước khi uống rằng bạn đang cho con bú.**

Tờ hướng dẫn OTC hiện hành tại Nhật Bản ghi rằng người đang cho con bú không dùng thuốc này, hoặc phải tránh cho bú ít nhất 24 giờ sau khi uống. Không tự quyết định; hãy hỏi dược sĩ hoặc bác sĩ cả về thời điểm có thể cho bú lại.

---

### Q6: Tôi đang uống thuốc tránh thai liều thấp, nếu quên uống có thể dùng thuốc này không?

**A: Không thể quyết định chỉ dựa vào số viên đã quên.**

Cách xử lý phụ thuộc vào loại sản phẩm, vị trí trong vỉ hoặc chu kỳ, số liều và thời gian đã quên, cùng thời điểm quan hệ. Hãy xem tờ hướng dẫn của chính sản phẩm, không tự thay đổi cách dùng và sớm liên hệ bác sĩ kê đơn hoặc dược sĩ.

---

### Q7: Có bị vô sinh trong tương lai không?

**A: WHO cho biết thuốc tránh thai khẩn cấp không làm hại khả năng sinh sản sau này hoặc làm chậm sự trở lại của khả năng sinh sản.**

Tuy nhiên, thuốc không bảo vệ khỏi mang thai do quan hệ sau khi uống. Nếu không muốn mang thai, hãy hỏi dược sĩ hoặc bác sĩ khi nào và cách bắt đầu hoặc tiếp tục biện pháp tránh thai thường xuyên.

---

### Q8: Có phòng ngừa được bệnh lây qua đường tình dục không?

**A: Không, không thể.**

Thuốc tránh thai khẩn cấp không phòng ngừa HIV, Chlamydia, lậu hay các bệnh lây truyền qua đường tình dục khác. Dùng bao cao su đúng cách giúp giảm nhưng không loại bỏ hoàn toàn nguy cơ. Nếu lo ngại đã phơi nhiễm, hãy liên hệ cơ sở y tế.

---

### Q9: Có thể uống khi đã uống rượu không?

**A: Hãy báo cho dược sĩ trước khi uống rằng bạn đã dùng rượu bia.**

Chỉ từ tờ hướng dẫn OTC hiện hành tại Nhật Bản không thể khẳng định chung rằng rượu bia “không ảnh hưởng”. Nếu nôn sau khi uống, không tự uống thêm liều; hãy mang theo tờ hướng dẫn và sớm liên hệ bác sĩ hoặc dược sĩ.

---

### Q10: Khi nào nên tiếp tục tránh thai thông thường sau khi uống?

**A: Hãy hỏi dược sĩ hoặc bác sĩ vì hướng dẫn khác nhau theo phương pháp và sản phẩm.**

Thuốc levonorgestrel tránh thai khẩn cấp không ngăn ngừa mang thai do quan hệ sau liều dùng. Hãy làm theo tờ hướng dẫn và chỉ dẫn chuyên môn khi bắt đầu hoặc tiếp tục biện pháp thường xuyên, đồng thời xác nhận cách tránh thai cho tới khi biện pháp đó có hiệu lực.

---

## Còn thắc mắc nào không?

Nếu bài viết này không giải đáp được thắc mắc của bạn, khuyên nên trực tiếp tham khảo ý kiến dược sĩ hoặc bác sĩ. Với ứng dụng này, bạn cũng có thể tìm kiếm cơ sở y tế để tư vấn.
    `,
  },
  'cost-comparison': {
    title: 'Chi phí thuốc tránh thai khẩn cấp: Những điều cần xác nhận với nhà thuốc và cơ sở y tế',
    description: 'Giải thích vì sao chi phí khác nhau giữa nhà thuốc, cơ sở y tế và khám trực tuyến, cùng những điều cần xác nhận trước.',
    date: '2025-02-05',
    category: 'Chi phí',
    content: `
## Chi phí thuốc tránh thai khẩn cấp có cao không?

Chi phí thuốc tránh thai khẩn cấp khác nhau tùy sản phẩm, nhà thuốc, cơ sở y tế và hình thức khám. Không có một mức giá chuẩn hay cách mua nào luôn rẻ nhất.

## So sánh chi phí theo cách mua

| Cách mua | Điều cần xác nhận trước |
|---------|------------------------|
| Nhà thuốc được chỉ định | Giá sản phẩm, tồn kho, phương thức thanh toán, lịch dược sĩ đã hoàn thành đào tạo |
| Sản phụ khoa/phụ khoa | Phí khám, tiền thuốc, giờ tiếp nhận, phương thức thanh toán |
| Khám trực tuyến | Phí khám, nhà thuốc được chỉ định, tiền thuốc, cách nhận và uống thuốc |
| Cơ sở y tế xác nhận có thể khám ngoài giờ | Khả năng cung cấp tránh thai khẩn cấp trong ngày, phí khám, phí ngoài giờ, tiền thuốc |

## Mua tại nhà thuốc OTC

Theo thông tin được kiểm tra ngày 16/7/2026, giá bán lẻ đề xuất của nhà sản xuất (đã gồm thuế) là **¥7,480 cho 1 viên [NorLevo](https://www.daiichisankyo-hc.co.jp/site_norlevo/product/)** và **¥6,930 cho 1 viên [Resoel 72](https://alinamin-kenko.jp/lesoeru72/column/price/index.html)**. Đây là giá đề xuất, không bảo đảm mức giá bán tại nhà thuốc. Giá thực tế, tồn kho và phương thức thanh toán khác nhau tùy nhà thuốc; hãy xác nhận trước khi đến.

### Ưu điểm
- Không có phí khám tại cơ sở y tế (vẫn phải trả giá thuốc)
- Không cần lấy đơn thuốc trước
- Có thể xác nhận giá và phương thức thanh toán trước khi đến

### Xác nhận chi phí
Giá khác nhau tùy sản phẩm và nhà thuốc. Hãy gọi xác nhận tồn kho, lịch dược sĩ đã hoàn thành đào tạo, giá và phương thức thanh toán.

## Kê đơn tại khoa sản phụ khoa

### Ưu điểm
- Có thể tư vấn với bác sĩ
- Có thể trao đổi những lo lắng về sức khỏe
- Có thể tư vấn về tránh thai trong tương lai

### Xác nhận chi phí
Cách tính phí khám và tiền thuốc khác nhau tùy cơ sở y tế. Hãy xác nhận cách tính tổng chi phí và phương thức thanh toán trước khi đến.

## Khám online

### Ưu điểm
- Có thể khám từ nhà
- Có thể tham khảo bác sĩ trước khi di chuyển

### Xác nhận chi phí và cách uống thuốc
Phí khám và tiền thuốc khác nhau tùy dịch vụ. Theo hướng dẫn hiện hành, sau khi khám bạn đến nhà thuốc được chỉ định, nghe dược sĩ đã hoàn thành đào tạo giải thích và uống thuốc trước mặt dược sĩ. Không mặc định giao thuốc về nhà; hãy xác nhận trước nhà thuốc được chỉ định và chi phí.

## Tìm cơ sở y tế vào ban đêm hoặc ngày nghỉ

Không phải mọi cơ sở y tế, kể cả mọi khoa cấp cứu, đều có thể cung cấp thuốc tránh thai khẩn cấp. Hãy gọi trước khi di chuyển để xác nhận nơi đó có thể khám và kê đơn tại thời điểm đó.

### Xác nhận chi phí
Phí khám, phí ngoài giờ và tiền thuốc khác nhau tùy cơ sở. Hãy xác nhận trước nếu có thể, nhưng đừng trì hoãn chăm sóc khi có triệu chứng khẩn cấp.

## Mẹo tiết kiệm chi phí

### 1. Xác nhận giá trước
Giá khác nhau tùy nhà thuốc và cơ sở y tế. Hãy xác nhận qua điện thoại hoặc trang web chính thức của nơi cung cấp dịch vụ.

### 2. Đồng thời xác nhận khả năng cung cấp dịch vụ
Với nhà thuốc, xác nhận tồn kho và lịch dược sĩ đã hoàn thành đào tạo; với cơ sở y tế, xác nhận giờ tiếp nhận và khả năng khám.

### 3. Không quyết định chỉ dựa trên giá
Levonorgestrel cần được uống càng sớm càng tốt trong vòng 72 giờ. Nếu đã quá 72 giờ, hãy liên hệ cơ sở y tế ngay.

## Phương thức thanh toán

Phương thức thanh toán khác nhau tùy nhà thuốc và cơ sở y tế. Hãy xác nhận trước có thể dùng tiền mặt, thẻ hay thanh toán điện tử hay không.

## Tóm tắt

Không có một mức giá chuẩn cho thuốc tránh thai khẩn cấp. Hãy xác nhận chi phí của sản phẩm và nơi cung cấp, đồng thời chọn cách giúp bạn được tư vấn và uống thuốc càng sớm càng tốt thay vì chỉ quyết định theo giá.

Hãy tìm kiếm nhà thuốc OTC gần bạn bằng ứng dụng này và xác nhận địa điểm trước.
    `,
  },
  'emergency-vs-regular-pill': {
    title: 'Sự khác biệt giữa thuốc tránh thai khẩn cấp và thuốc tránh thai liều thấp',
    description: 'Thuốc sau quan hệ và thuốc tránh thai liều thấp dùng hàng ngày khác nhau như thế nào? So sánh dễ hiểu về thành phần, cách dùng và hiệu quả.',
    date: '2025-02-08',
    category: 'Kiến thức cơ bản',
    content: `
## Hai loại thuốc thường bị nhầm lẫn

Khi nghe từ "thuốc tránh thai", mọi người thường nghĩ đến cùng một loại, nhưng **thuốc tránh thai khẩn cấp (thuốc sau quan hệ)** và **thuốc tránh thai liều thấp** là hai loại thuốc hoàn toàn khác nhau.

Bài viết này sẽ giải thích dễ hiểu sự khác biệt giữa hai loại.

## Sự khác biệt cơ bản

| Mục | Thuốc tránh thai khẩn cấp | Thuốc tránh thai liều thấp |
|------|----------|----------|
| Mục đích | Tránh thai khẩn cấp | Tránh thai hàng ngày |
| Thời điểm uống | Trong 72 giờ sau quan hệ | Uống vào giờ cố định mỗi ngày |
| Tần suất uống | Chỉ 1 lần | Uống liên tục |
| Cách mua | Nhà thuốc hoặc cơ sở y tế | Cơ sở y tế (cần đơn thuốc) |
| Chi phí | Khác nhau tùy sản phẩm và nơi cung cấp | Khác nhau tùy sản phẩm và cơ sở y tế |

## Thuốc tránh thai khẩn cấp là gì

### Đặc điểm
- Dùng "khẩn cấp" khi tránh thai thất bại hoặc không tránh thai
- Hoàn thành chỉ với 1 lần uống
- Một liều levonorgestrel
- Uống càng sớm càng tốt trong vòng 72 giờ

### Thành phần chính
**Levonorgestrel** (progestin)

### Ưu điểm
- Đối phó được trong trường hợp khẩn cấp
- Chỉ cần 1 lần

### Nhược điểm
- Chi phí khác nhau tùy sản phẩm và nơi cung cấp
- Có thể xảy ra tác dụng phụ
- Hiệu quả không phải 100%
- Không phù hợp để dùng thường xuyên

## Thuốc tránh thai liều thấp là gì

### Đặc điểm
- Uống hàng ngày để duy trì hiệu quả tránh thai
- Dùng đều đặn và đúng theo hướng dẫn của từng sản phẩm
- Cần đơn thuốc của bác sĩ

### Thành phần chính
Phối hợp **Estrogen** (hormone nang trứng) và **Progestin** (hormone hoàng thể) liều thấp

### Ưu điểm
- Có thể trao đổi với bác sĩ như một biện pháp tránh thai lâu dài
- Có tác dụng tránh thai liên tục khi dùng đúng theo hướng dẫn của sản phẩm cụ thể

### Nhược điểm
- Cần uống hàng ngày
- Nếu quên uống, hiệu quả giảm
- Tính phù hợp và lưu ý khác nhau tùy sản phẩm, tiền sử bệnh, thuốc đang dùng và tình trạng hút thuốc
- Cần khám và có đơn của bác sĩ

## Nên chọn loại nào?

### Trường hợp phù hợp với thuốc tránh thai khẩn cấp
- Bao cao su bị rách
- Quan hệ tình dục không tránh thai
- Quên uống thuốc tránh thai liều thấp
- Cần tránh thai ngay lập tức

### Trường hợp phù hợp với thuốc tránh thai liều thấp
- Muốn tránh thai lâu dài, có kế hoạch và trao đổi với bác sĩ về sản phẩm cùng cách dùng phù hợp

## Về việc dùng đồng thời

Cách xử lý sau khi quên thuốc tránh thai liều thấp phụ thuộc vào loại sản phẩm, vị trí trong vỉ hoặc chu kỳ, số liều và thời gian đã quên, cùng thời điểm quan hệ.

Hãy xem tờ hướng dẫn của chính sản phẩm, không tự thay đổi cách dùng và sớm liên hệ bác sĩ kê đơn hoặc dược sĩ.

## Hiểu lầm thường gặp

### "Nếu dùng thuốc tránh thai khẩn cấp thường xuyên có thay thế được thuốc tránh thai liều thấp không?"
**Không.** Thuốc tránh thai khẩn cấp dùng cho tình huống khẩn cấp. Hãy hỏi bác sĩ về phương pháp tránh thai liên tục như thuốc tránh thai liều thấp.

### "Nếu có thuốc tránh thai liều thấp thì không cần thuốc tránh thai khẩn cấp?"
**Có thể cần khi quên uống.** Thuốc tránh thai liều thấp phát huy hiệu quả khi uống đúng hàng ngày. Khi quên uống, có thể cần thuốc tránh thai khẩn cấp.

## Tóm tắt

Thuốc tránh thai khẩn cấp và thuốc tránh thai liều thấp đều là những lựa chọn quan trọng.

- **Thuốc tránh thai khẩn cấp** → Nắm kiến thức như "bùa hộ mệnh" cho trường hợp khẩn cấp
- **Thuốc tránh thai liều thấp** → Cân nhắc nếu đang nghĩ đến tránh thai liên tục

Hãy chọn phương pháp phù hợp với lối sống của bạn. Nếu có lo lắng, hãy tư vấn tại khoa phụ sản.
    `,
  },
  'myths-and-facts': {
    title: '7 hiểu lầm và sự thật về thuốc tránh thai khẩn cấp',
    description: 'Giải tỏa các hiểu lầm về thuốc tránh thai khẩn cấp như "Bị tăng cân", "Bị vô sinh", "Không dùng được nhiều lần" cùng với căn cứ y học.',
    date: '2025-02-12',
    category: 'Kiến thức cơ bản',
    content: `
## Thuốc tránh thai khẩn cấp có nhiều hiểu lầm

Về thuốc tránh thai khẩn cấp, có rất nhiều thông tin trên internet. Trong đó có nhiều thông tin sai, đây cũng là nguyên nhân khiến người ta do dự khi cần sử dụng.

Bài viết này sẽ giải tỏa các hiểu lầm thường gặp từ góc độ y học.

## Hiểu lầm 1: Uống thuốc tránh thai khẩn cấp sẽ tăng cân

### Sự thật: Không có cơ sở để khẳng định chung rằng thuốc gây tăng cân kéo dài

Tờ hướng dẫn thuốc OTC hiện hành tại Nhật Bản không liệt kê tăng cân là tác dụng phụ thường gặp. Tuy nhiên, phù tay hoặc chân là một trong những triệu chứng cần hỏi bác sĩ hoặc dược sĩ sau khi dùng thuốc. Không nên tự cho rằng phù sẽ tự hết. Nếu thấy phù, hoặc bất kỳ triệu chứng nào kéo dài hay nặng hơn, hãy mang theo tờ hướng dẫn và hỏi bác sĩ hoặc dược sĩ.

## Hiểu lầm 2: Sẽ không thể mang thai trong tương lai

### Sự thật: Không gây vô sinh

Thuốc tránh thai khẩn cấp không ảnh hưởng đến khả năng mang thai trong tương lai.

Sau khi uống, từ lần rụng trứng tiếp theo, khả năng mang thai trở lại bình thường. Điều này đã được xác nhận trong nhiều nghiên cứu.

## Hiểu lầm 3: Dùng nhiều lần sẽ không còn hiệu quả

### Sự thật: Không có bằng chứng cơ thể tạo ra "kháng thuốc"

Chỉ riêng việc dùng lặp lại không được biết là gây "kháng thuốc". Tuy nhiên, hiệu quả mỗi lần có thể thay đổi tùy thời gian dùng thuốc và các yếu tố khác, đồng thời không bao giờ đạt 100%. Khi cần, hãy liên hệ dược sĩ hoặc cơ sở y tế sớm nhất có thể.

Tuy nhiên, thuốc tránh thai khẩn cấp chỉ dành cho "trường hợp khẩn cấp". Nếu cần sử dụng thường xuyên, hãy cân nhắc các biện pháp tránh thai liên tục như thuốc tránh thai liều thấp.

## Hiểu lầm 4: Giống như phá thai

### Sự thật: Hoàn toàn khác nhau

Thuốc tránh thai khẩn cấp là **thuốc ngăn ngừa mang thai**, không phải thuốc phá thai.

Tác dụng chính là ức chế hoặc trì hoãn rụng trứng; thuốc không chấm dứt thai kỳ đã hình thành. Nếu thai kỳ đã được xác lập, chẳng hạn kết quả thử thai dương tính, thuốc này sẽ không có tác dụng; không dùng thuốc và hãy liên hệ cơ sở y tế. Nếu bạn chỉ lo có thể mang thai do lần quan hệ này, đừng tự loại mình khỏi cơ hội dùng thuốc: trong vòng 72 giờ, hãy liên hệ ngay nhà thuốc trong danh sách hoặc cơ sở y tế và xác nhận với dược sĩ hoặc bác sĩ.

## Hiểu lầm 5: Tác dụng phụ rất nặng

### Sự thật: Loại triệu chứng và diễn biến khác nhau tùy người

Buồn nôn và đau đầu nằm trong các tác dụng phụ được liệt kê trong tờ hướng dẫn OTC hiện hành tại Nhật Bản. Tờ hướng dẫn không nêu một thời hạn chung để triệu chứng hết.

### Ví dụ về triệu chứng được liệt kê trong tờ hướng dẫn
- Buồn nôn
- Đau đầu
- Mệt mỏi
- Chảy máu bất thường

Nếu xuất hiện bất kỳ triệu chứng nào trong số này, hãy mang theo tờ hướng dẫn và hỏi bác sĩ hoặc dược sĩ.

## Hiểu lầm 6: Người trẻ không dùng được

### Sự thật: Không có giới hạn tuổi

Thuốc tránh thai khẩn cấp không có giới hạn tuổi về mặt y học.

Việc bán tại nhà thuốc không áp dụng yêu cầu đồng ý của phụ huynh một cách chung cho mọi trường hợp. Theo thực hành hiện hành, người dưới 16 tuổi được khuyến nghị tham khảo cơ sở y tế.

## Hiểu lầm 7: Nam giới không liên quan

### Sự thật: Có thể tham gia với tư cách là bạn đời

Tránh thai là trách nhiệm của cả hai người. Có nhiều điều bạn trai có thể làm:

- Hiểu tình huống cần thuốc tránh thai khẩn cấp
- Chi trả hoặc chia sẻ chi phí
- Đi cùng đến nhà thuốc hoặc cơ sở y tế (khi bạn gái muốn)
- Hỗ trợ tinh thần
- Cùng suy nghĩ về việc tránh thai trong tương lai

Tuy nhiên, việc mua thuốc tránh thai khẩn cấp chỉ có thể do bản thân người sử dụng thực hiện.

## Để có được thông tin chính xác

Nếu có lo lắng về thuốc tránh thai khẩn cấp, hãy tham khảo các nguồn thông tin sau:

- Trang web của Bộ Y tế, Lao động và Phúc lợi
- Tư vấn với bác sĩ sản phụ khoa hoặc dược sĩ
- Thông tin từ Hội Sản phụ khoa Nhật Bản

Thông tin trên mạng xã hội và diễn đàn không nhất thiết chính xác.

## Tóm tắt

Thuốc tránh thai khẩn cấp là loại thuốc an toàn và hiệu quả nếu sử dụng đúng cách.

Đừng bị lầm lẫn bởi thông tin sai và hãy sử dụng mà không do dự khi cần thiết. Đó là cách bảo vệ cơ thể và tương lai của bạn.

Nếu có lo lắng, hãy tư vấn với dược sĩ hoặc bác sĩ. Với ứng dụng này, bạn cũng có thể tìm kiếm cơ sở y tế để tư vấn.
    `,
  },
};

export default blogContents;
