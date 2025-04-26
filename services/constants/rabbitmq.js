const amqp = require("amqplib");

const connection = async () => {
  try {
    return await amqp.connect("amqp://localhost");
  } catch (error) {
    throw new Error("Failed to connect rabbit mq");
  }
};

const channel = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    return await connection.createChannel();
  } catch (error) {
    throw new Error("Failed to create channel in rabbit mq");
  }
};

const channelQueue = async (queue) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    return await channel.assertQueue(queue);
  } catch (error) {
    throw new Error("Failed to create channelqueue in rabbit mq");
  }
};

const sendQueue = async (queue, payload) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    return channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
  } catch (error) {
    throw new Error("Failed to send queue in rabbit mq");
  }
};

const channelConsume = async (queue) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    return await channel.consume(queue, (msg) => {
      const data = JSON.parse(msg.content.toString());
      console.log(`Queue : ${queue}, Data = ${JSON.stringify(data)}`);
      channel.ack(msg);
    });
  } catch (error) {
    throw new Error("Failed to get channel consume in rabbit mq");
  }
};

module.exports = {
  connection,
  channel,
  channelQueue,
  sendQueue,
  channelConsume,
};
