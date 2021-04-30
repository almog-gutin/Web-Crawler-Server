const chalk = require('chalk');
const initQueue = require('../utils/queue/initQueue');
const { getQueueURL } = require('../aws/sqs');
const handleCompletionOfTree = require('../utils/tree/treeHandler');

const newQueue = async (req, res) => {
    try {
        if (req.tree) return res.send({ status: 200, data: req.tree });
        const queue = await initQueue(req.request);
        if (!queue) throw 'initQueue function did not work.';
        res.status(201).send({ status: 201, data: { queue } });
    } catch (err) {
        console.log(chalk.red.inverse('Error in the newQueue controller.', err));
        res.status(500).send({ status: 500, message: 'Internal Server Error' });
    }
};

const tree = async (req, res) => {
    try {
        const tree = req.tree;
        if (tree) {
            const queueURL = await getQueueURL(req.request.queueName);
            tree = await handleCompletionOfTree(tree, queueURL);
            res.send({ status: 200, data: { tree } });
        }
        res.status(404).send({ status: 404, message: 'Queue was not found.' });
    } catch {
        console.log(chalk.red.inverse('Error in the tree controller.', err));
        res.status(500).send({ status: 500, message: 'Internal Server Error' });
    }
};

module.exports = { newQueue, tree };
