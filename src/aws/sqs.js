const chalk = require('chalk');
const sqs = require('./aws');

const createQueue = async (queueName) => {
    const params = {
        QueueName: `${queueName}.fifo`,
        Attributes: {
            'FifoQueue': 'true',
            'ContentBasedDeduplication': 'true',
        },
    };

    try {
        const { QueueUrl } = await sqs.createQueue(params).promise();
        console.log(chalk.blue(`Queue ${queueName} has been successfully created!`));
        return QueueUrl;
    } catch (err) {
        console.log(chalk.red.inverse('Error while creating a queue:'), err);
    }
};

const getQueueURL = async (queueName) => {
    const params = { QueueName: `${queueName}.fifo` };

    try {
        const { QueueUrl } = await sqs.getQueueUrl(params).promise();
        return QueueUrl;
    } catch (err) {
        console.log(chalk.red.inverse('Error fetching queue URL:'), err);
    }
};

const sendMeesageToQueue = async (queueURL, data) => {
    const params = {
        QueueUrl: queueURL,
        MessageAttributes: {
            'queueName': {
                DataType: 'String',
                StringValue: data.queueName,
            },
            'id': {
                DataType: 'String',
                StringValue: data.id,
            },
            'url': {
                DataType: 'String',
                StringValue: data.url,
            },
            'level': {
                DataType: 'String',
                StringValue: data.level,
            },
            'maxLevel': {
                DataType: 'String',
                StringValue: data.maxLevel,
            },
            'maxPages': {
                DataType: 'String',
                StringValue: data.maxPages,
            },
        },
        MessageBody: `${data.URL}:${data.id}`,
        MessageDeduplicationId: data.id,
        MessageGroupId: `Group${data.maxLevel}`,
    };

    try {
        const { MessageId } = await sqs.sendMessage(params).promise();
        console.log(chalk.blue(`Message ${chalk.bold(data.id)} was added to queue, ${chalk.bold(data.queueName)}!`));
        return MessageId;
    } catch (err) {
        console.log(chalk.red.inverse('Error while creating a message on sqs:'), err);
    }
};

const deleteQueue = async (queueURL) => {
    const params = { QueueUrl: queueURL };

    try {
        await sqs.deleteQueue(params).promise();
        console.log(chalk.blue(`Queue was deleted!`));
    } catch (err) {
        console.log(chalk.red.inverse('Error while deleting a queue:'), err);
    }
};

module.exports = {
    createQueue,
    getQueueURL,
    sendMeesageToQueue,
    deleteQueue,
};
