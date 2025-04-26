import amqp from "amqplib";

export const connection = async () => {
  try {
    return await amqp.connect("amqp://localhost");
  } catch (error) {
    throw new Error("Failed to connect rabbit mq");
  }
};

export const channel = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    return await connection.createChannel();
  } catch (error) {
    throw new Error("Failed to create channel in rabbit mq");
  }
};

export const channelQueue = async (queue) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    return await channel.assertQueue(queue);
  } catch (error) {
    throw new Error("Failed to create channelqueue in rabbit mq");
  }
};

export const sendQueue = async (queue, payload) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    return channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
  } catch (error) {
    throw new Error("Failed to send queue in rabbit mq");
  }
};

export const channelConsume = async (queue) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    return await channel.consume(queue, (msg) => {
      const data = JSON.parse(msg.content.toString());
      console.log(queue, data);
      channel.ack(msg);
    });
  } catch (error) {
    throw new Error("Failed to get channel consume in rabbit mq");
  }
};
