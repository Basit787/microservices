import { channelQueue } from "../lib/rabbitmq.js";

const connectRabbitmq = async () => {
  try {
    await channelQueue("USER_QUEUE");
    console.log("Product-Service connected to RabbitMQ");
  } catch (error) {
    console.error("Failed to connect Product-Service", error);
  }
};

export default connectRabbitmq;
