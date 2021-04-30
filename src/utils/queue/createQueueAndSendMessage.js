const chalk = require('chalk');
const { createQueue, sendMeesageToQueue } = require('../../aws/sqs');

const createQueueAndSendMessage = async (request) => {
    try {
        const queueURL = await createQueue(request.queueName);
        if (queueURL) {
            const messageID = await sendMeesageToQueue(queueURL, request);
            return { messageID, queueURL };
        }
    } catch (err) {
        console.log(chalk.red.inverse('Error while creating a queue and sending a message.'), err);
    }
};

module.exports = createQueueAndSendMessage;
