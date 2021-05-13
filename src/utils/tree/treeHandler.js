const axios = require('axios');
const chalk = require('chalk');
const { deleteQueue } = require('../../aws/sqs');
const { redisSetTree } = require('../redis/redisUtills');

const endQueue = async (tree, queueURL) => {
    tree.isTreeComplete = true;
    await deleteQueue(queueURL);
};

const handleCompletionOfTree = async (tree, queueURL, queueName) => {
    try {
        if (
            !tree.isTreeComplete &&
            (tree.numOfNodes >= parseInt(tree.maxPages) || tree.countLevels >= parseInt(tree.maxLevel))
        ) {
            await endQueue(tree, queueURL);
            await redisSetTree(queueName, tree);
        }

        return tree;
    } catch (err) {
        console.log(chalk.red.inverse('Error in handleCompletionOfTree function:'), err);
    }
};

module.exports = handleCompletionOfTree;
