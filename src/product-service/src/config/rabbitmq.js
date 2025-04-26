import { AssertQueue, ConnectionRabbitMq } from "../lib/rabbitmq.js";

const connectRabbitmq = async () => {
  try {
    await ConnectionRabbitMq();
    await AssertQueue("PRODUCT_QUEUE");
  } catch (error) {
    console.error("Failed to connect Product-Service", error);
  }
};

export default connectRabbitmq;
