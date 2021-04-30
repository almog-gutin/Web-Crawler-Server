const chalk = require('chalk');
const { getTreeFromDB } = require('../utils/tree/treeUtils');
const generateQueueName = require('../utils/queue/generateQueueName');

const checkIfTreeExisits = async (req, res, next) => {
    const params = ['URL', 'title', 'maxLevel', 'maxPages'];
    const request = req.body;
    params.forEach((param) => {
        if (!request[param])
            res.status(404).send({
                status: 404,
                message: 'Bad request!',
            });
    });

    try {
        const queueName = generateQueueName(request.title, request.maxLevel, request.maxPages);
        const tree = await getTreeFromDB(queueName);
        console.log('Tree:', tree);
        if (tree) {
            if (tree.completed) return res.send({ status: 200, tree });
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

module.exports = checkIfTreeExisits;
