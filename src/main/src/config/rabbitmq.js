import { channelConsume } from "../lib/rabbitmq.js";

const connectRabbitMq = async () => {
  try {
    await channelConsume("USER_QUEUE");
    await channelConsume("PRODUCT_QUEUE");
  } catch (error) {
    console.error("Failed to connect API-Gateway", error);
  }
};

export default connectRabbitMq;
