# Demo bất đồng bộ với RabbitMQ

## 1. Mục tiêu
- Mô phỏng API gửi job vào queue.
- Worker xử lý job nền theo thứ tự.
- Quan sát rõ cách hệ thống bất đồng bộ hoạt động.

## 2. Chuẩn bị
1. Cài Docker.
2. Cài Node.js 18+.

## 3. Chạy RabbitMQ
```bash
docker compose up -d
```

Dashboard RabbitMQ:
- URL: http://localhost:15672
- User: guest
- Pass: guest

## 4. Cài package
```bash
npm install
```

## 5. Chạy worker (terminal 1)
```bash
npm run worker
```

## 6. Chạy producer (terminal 2)
```bash
npm run producer
```

## 7. Kỳ vọng kết quả
- Producer gửi 10 message rất nhanh.
- Worker xử lý từng message, mỗi job mất ~2 giây.
- Điều này cho thấy phần gửi và phần xử lý đã tách bất đồng bộ.

## 8. Bài tập mở rộng
1. Tạo thêm worker thứ 2 để tăng tốc xử lý.
2. Thử cho worker throw lỗi với 1 orderId cụ thể.
3. Quan sát hành vi retry khi dùng `nack`.
