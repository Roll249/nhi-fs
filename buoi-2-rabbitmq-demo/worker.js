import amqp from "amqplib";

const QUEUE_NAME = "order_jobs";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processJob(payload) {
  console.log(`[Worker] Bắt đầu xử lý ${payload.orderId} (${payload.priority})`);
  await wait(2000);
  console.log(`[Worker] Xử lý xong ${payload.orderId}`);
}

async function runWorker() {
  const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, { durable: true });
  channel.prefetch(1);

  console.log("[Worker] Đang chờ message...");

  channel.consume(QUEUE_NAME, async (msg) => {
    if (!msg) {
      return;
    }

    try {
      const payload = JSON.parse(msg.content.toString());
      await processJob(payload);
      channel.ack(msg);
    } catch (error) {
      console.error("[Worker] Lỗi xử lý:", error.message);
      channel.nack(msg, false, true);
    }
  });
}

runWorker().catch((error) => {
  console.error("[Worker] Lỗi kết nối:", error.message);
  process.exit(1);
});
