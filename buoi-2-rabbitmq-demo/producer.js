import amqp from "amqplib";

const QUEUE_NAME = "order_jobs";

async function runProducer() {
  const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, { durable: true });

  for (let i = 1; i <= 10; i += 1) {
    const payload = {
      orderId: `ORD-${1000 + i}`,
      action: "send_order_confirmation",
      priority: i % 2 === 0 ? "high" : "normal",
      createdAt: new Date().toISOString()
    };

    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(payload)), {
      persistent: true
    });

    console.log(`[Producer] Đã gửi job: ${payload.orderId}`);
  }

  setTimeout(async () => {
    await channel.close();
    await connection.close();
    console.log("[Producer] Hoàn tất gửi message.");
  }, 500);
}

runProducer().catch((error) => {
  console.error("[Producer] Lỗi:", error.message);
  process.exit(1);
});
