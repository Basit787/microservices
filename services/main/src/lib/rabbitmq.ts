import amqplib, { Channel } from "amqplib";
import ENV from "./env.js";

export let channel: Channel;

const url = ENV.RABBIT_MQ_URL;

export const ConnectionRabbitMq = async () => {
  try {
    let connection = await amqplib.connect(url);
    channel = await connection.createChannel();
    console.log("Rabbit-mq connection established");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect rabbit mq");
  }
};

export const ChannelConsume = async (queue: string, callback: (data: Object) => void) => {
  try {
    if (!channel) throw new Error("Channel is not established");
    return await channel.consume(queue, (msg: any) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        callback(data);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get channel consume in rabbit mq");
  }
};
