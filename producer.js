const amqp = require("amqplib");
const queueName = "task"
async function sendMsgToTask(){
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {durable: true});
    channel.sendToQueue(queueName, Buffer.from("Hello RabbitMQ"), {persistent: true})
    console.log("message send to service 1");
}
for (let index = 0; index < 15; index++) {
    sendMsgToTask();
}