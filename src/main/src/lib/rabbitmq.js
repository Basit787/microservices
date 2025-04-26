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

export const ChannelConsume = async (queue, callback) => {
  try {
    if (!channel) throw new Error("Channel is not established");
    return await channel.consume(queue, (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        callback(data);
        channel.ack(msg);
      }
    });
  } catch (error) {
    throw new Error("Failed to get channel consume in rabbit mq");
  }
};
