const generateQueueName = (title, maxLevel, maxPages) => `${title}_${maxLevel}_${maxPages}`;

module.exports = generateQueueName;
