# Buổi 2: Đa luồng và bất đồng bộ với RabbitMQ (90 phút)

## 1. Mục tiêu buổi học
- Hiểu được sự khác nhau giữa đồng bộ và bất đồng bộ.
- Hiểu được vì sao cần hàng đợi (queue) khi hệ thống eCommerce có tải cao.
- Biết mô hình Producer - Queue - Consumer với RabbitMQ.
- Chạy được demo thực tế: tạo job xử lý đơn hàng bất đồng bộ.

## 2. Khái niệm cốt lõi

### 2.1 Đồng bộ (synchronous)
- API nhận request, xử lý toàn bộ trong một luồng, trả kết quả sau khi xong.
- Ưu điểm: đơn giản, dễ debug.
- Nhược điểm: dễ chậm khi xử lý tác vụ nặng (gửi email, tạo hóa đơn, cập nhật kho, gọi dịch vụ thanh toán).

### 2.2 Bất đồng bộ (asynchronous)
- API nhận request nhanh, đẩy việc nặng vào queue.
- Worker xử lý ở phía sau và cập nhật kết quả sau.
- Ưu điểm: giảm thời gian phản hồi, tăng khả năng chịu tải.
- Nhược điểm: cần thiết kế retry, idempotency, theo dõi trạng thái job.

### 2.3 RabbitMQ là gì?
- RabbitMQ là message broker.
- Vai trò: trung gian chuyển message từ Producer sang Consumer.
- Thành phần cơ bản:
  - Producer: nơi gửi message.
  - Queue: nơi lưu message chờ xử lý.
  - Consumer/Worker: nơi nhận và xử lý message.

## 3. Liên hệ với dự án eCommerce
- Tác vụ nên đưa vào queue:
  - Gửi email xác nhận đơn.
  - Đồng bộ trạng thái đơn sang CRM.
  - Ghi log phân tích hành vi.
  - Xử lý ảnh sản phẩm nền (resize/watermark).
- Tác vụ không nên đưa vào queue (vì cần phản hồi ngay):
  - Validate dữ liệu đầu vào bắt buộc.
  - Kiểm tra quyền truy cập.
  - Trả thông tin giỏ hàng đang hiển thị cho người dùng.

## 4. Timeline dạy 90 phút
1. 15 phút: Giải thích đồng bộ vs bất đồng bộ bằng ví dụ đời thường.
2. 20 phút: Giải thích mô hình Producer - Queue - Worker.
3. 25 phút: Chạy demo RabbitMQ thực tế.
4. 20 phút: Bài tập thực hành (gửi 10 job, quan sát worker xử lý).
5. 10 phút: Tổng kết và checklist đạt.

## 5. Bài tập tại lớp
- Bài tập 1: chạy producer gửi 10 job tạo đơn.
- Bài tập 2: worker xử lý chậm 2 giây/job để nhìn rõ bất đồng bộ.
- Bài tập 3: thêm trường priority vào payload và in log ra.

## 6. Checklist đạt cuối buổi
- [ ] Giải thích được khác nhau giữa đồng bộ và bất đồng bộ.
- [ ] Nói được khi nào nên dùng queue trong eCommerce.
- [ ] Chạy được RabbitMQ container.
- [ ] Gửi được message từ producer.
- [ ] Worker nhận và xử lý được message.
- [ ] Nêu được ít nhất 2 rủi ro khi dùng queue (trùng message, mất kết nối, retry).

## 7. Câu hỏi kiểm tra nhanh
1. Vì sao checkout không nên đợi gửi email xong mới trả về cho người dùng?
2. Nếu worker chết giữa chừng thì message có mất không?
3. Tại sao cần idempotency khi xử lý message thanh toán?

## 8. Gợi ý mở rộng buổi sau
- Retry + dead-letter queue.
- Message ordering và partition.
- Theo dõi queue metrics để cảnh báo sớm.
