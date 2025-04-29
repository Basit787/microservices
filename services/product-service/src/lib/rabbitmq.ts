import amqp, { Channel } from "amqplib";
import "dotenv/config";

let channel: Channel;

const url = process.env.RABBIT_MQ_URL as string;

export const ConnectionRabbitMq = async () => {
  try {
    const connection = await amqp.connect(url);
    channel = await connection.createChannel();
    console.log("Rabbit-mq connection established");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect rabbit mq");
  }
};

export const AssertQueue = async (queue: string) => {
  try {
    if (!channel) throw new Error("Channel is not established");
    return await channel.assertQueue(queue);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create channelqueue in rabbit mq");
  }
};

export const SendQueue = async (queue: string, payload: object) => {
  try {
    if (!channel) throw new Error("Channel is not established");
    return channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send queue in rabbit mq");
  }
};
