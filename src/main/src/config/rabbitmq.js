import { ChannelConsume, ConnectionRabbitMq } from "../lib/rabbitmq.js";

const connectRabbitMq = async () => {
  try {
    await ConnectionRabbitMq();

    await ChannelConsume("USER_QUEUE", (data) => {
      console.log(data);
    });

    await ChannelConsume("PRODUCT_QUEUE", (data) => {
      console.log(data);
    });
  } catch (error) {
    console.error("Failed to connect API-Gateway", error);
  }
};

export default connectRabbitMq;
