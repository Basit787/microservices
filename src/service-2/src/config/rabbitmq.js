const { channelQueue } = require("../../../constants/rabbitmq");

const connectRabbitmq = async () => {
  try {
    await channelQueue("PRODUCT_QUEUE");
    console.log("Product-Service connected to RabbitMQ");
  } catch (error) {
    console.error("Failed to connect Product-Service", error);
  }
};

module.exports = connectRabbitmq;
