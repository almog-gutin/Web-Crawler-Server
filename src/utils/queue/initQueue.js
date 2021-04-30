const axios = require('axios');
const chalk = require('chalk');
const createQueueAndSendMessage = require('./createQueueAndSendMessage');

const initQueue = async (request) => {
    try {
        request.id = '0';
        request.level = '1';
        request.nodesInLevel = '1';
        request.currentNodeInLevel = '1';
        const { messageID, queueURL } = await createQueueAndSendMessage(request);
        await axios.post('http://localhost:8080/worker', { queueURL });
        return { messageID, queueURL, queueName: request.queueName };
    } catch (err) {
        console.log(chalk.red.inverse('Error while initiating a queue.'), err);
    }
};

module.exports = initQueue;
