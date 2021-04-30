const express = require('express');
const cors = require('cors');
const queueRouter = require('./routers/queueRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => res.send());
app.use(queueRouter);

module.exports = app;
