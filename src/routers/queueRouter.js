const express = require('express');
const isTreeInDB = require('../middleware/isTreeInDB');
const { newQueue, tree } = require('../controllers/queueController');

const router = new express.Router();

router.post('/new-queue', isTreeInDB, newQueue);

router.post('/tree', isTreeInDB, tree);

module.exports = router;
