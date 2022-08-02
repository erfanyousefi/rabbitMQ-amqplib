const amqp = require("amqplib");
const queueName = "task"
async function receiveFromProducer(){
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {durable: true});
    console.log("i wait for receive new message");
    let index = 0;
    await channel.consume(queueName, msg => {
        const random = Math.floor(Math.random() * 10)
        const timeOut = 1000 * random
        setTimeout(() => {
            console.log(timeOut);
            console.log(`${index}: `, msg.content.toString());
            index++;
            channel.ack(msg)
        }, timeOut)
    })
}
receiveFromProducer()

//