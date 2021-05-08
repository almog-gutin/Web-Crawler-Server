const axios = require('axios');
const chalk = require('chalk');
const { deleteQueue } = require('../../aws/sqs');
const { redisSetTree } = require('../redis/redisUtills');
// const {} = require('./treeUtils');

const endQueue = async (tree, queueURL) => {
    tree.isTreeComplete = true;
    await deleteQueue(queueURL);
};

const handleCompletionOfTree = async (tree, queueURL, queueName) => {
    try {
        if ((!tree.isTreeComplete && tree.numOfNodes >= tree.maxPages) || tree.countLevels >= tree.maxPages) {
            await endQueue(tree, queueURL);
            await redisSetTree(queueName, tree);
        }

        return tree;
    } catch (err) {
        console.log(chalk.red.inverse('Error in handleCompletionOfTree function:'), err);
    }
};

module.exports = handleCompletionOfTree;
