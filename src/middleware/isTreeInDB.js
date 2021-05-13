const chalk = require('chalk');
const { redisGetTree } = require('../utils/redis/redisUtills');
const generateQueueName = require('../utils/queue/generateQueueName');

const isTreeInDB = async (req, res, next) => {
    const params = ['url', 'title', 'maxLevel', 'maxPages'];
    const request = req.body.request;

    params.forEach((param) => {
        if (!request[param]) return res.status(404).send({ status: 404, message: 'Bad request!' });
    });

    try {
        const queueName = generateQueueName(request.title, request.maxLevel, request.maxPages);
        const tree = await redisGetTree(queueName);
        if (tree) {
            if (tree.isTreeComplete) return res.send({ status: 200, data: { tree } });
            req.tree = tree;
        }

        request.queueName = queueName;
        req.request = request;
        next();
    } catch (err) {
        console.log(chalk.red.inverse('Error in checkIfTreeExists middleware.'), err);
        res.status(404).send({ status: 404, message: 'Bad request!' });
    }
};

module.exports = isTreeInDB;
