import amqp from "amqplib";

let connection;
let channel;

export const ConnectionRabbitMq = async () => {
  try {
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    console.log("Rabbit-mq connection established");
  } catch (error) {
    throw new Error("Failed to connect rabbit mq");
  }
};

export const AssertQueue = async (queue) => {
  try {
    if (!channel) throw new Error("Channel is not established");
    return await channel.assertQueue(queue);
  } catch (error) {
    throw new Error("Failed to create channelqueue in rabbit mq");
  }
};

export const SendQueue = async (queue, payload) => {
  try {
    if (!channel) throw new Error("Channel is not established");
    return channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
  } catch (error) {
    throw new Error("Failed to send queue in rabbit mq");
  }
};
