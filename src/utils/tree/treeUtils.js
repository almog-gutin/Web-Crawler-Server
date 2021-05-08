const chalk = require('chalk');
const { redisGetTree } = require('../redis/redisUtills');

const getTreeFromDB = async (queueName) => {
    try {
        const tree = await redisGetTree(queueName);
        return tree;
    } catch (err) {
        console.log(chalk.red.inverse('Unable to get tree from database:'), err);
    }
};

module.exports = { getTreeFromDB };
