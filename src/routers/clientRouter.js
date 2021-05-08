const express = require('express');
const isTreeInDB = require('../middleware/isTreeInDB');
const { newQueue, stream } = require('../controllers/clientController');

const router = new express.Router();

router.post('/new-queue', isTreeInDB, newQueue);

router.post('/stream', isTreeInDB, stream);

module.exports = router;
