const generateQueueName = (title, maxLevel, maxPages) => {
    const convertedTitle = title.replaceAll(' ', '-');
    return `${convertedTitle}_${maxLevel}_${maxPages}`;
};
module.exports = generateQueueName;
