const axios = require('axios');
const { deleteQueue, sendMeesageToQueue } = require('../../aws/sqs');
const {} = require('./treeUtils');

const endQueue = async (tree, queueURL) => {
    tree.completed = true;
    await deleteQueue(queueURL);
};

const handleCompletionOfTree = async (tree, queueName) => {
    try {
    } catch (err) {
        console.log(chalk.red.inverse('Error in handleCompletionOfTree function.'), err);
    }
};

module.exports = handleCompletionOfTree;
