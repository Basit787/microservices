const { channelConsume } = require("../../../constants/rabbitmq");

const connectRabbitMq = async () => {
  try {
    await channelConsume("USER_QUEUE");
    await channelConsume("PRODUCT_QUEUE");
  } catch (error) {
    console.error("Failed to connect API-Gateway", error);
  }
};

module.exports = connectRabbitMq;
