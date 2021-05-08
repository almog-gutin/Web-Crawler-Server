const express = require('express');
const cors = require('cors');
const clientRouter = require('./routers/clientRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => res.send());
app.use(clientRouter);

module.exports = app;
