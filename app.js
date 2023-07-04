const config = require('./utils/config');

const express = require('express');
const app = express();
const cors = require('cors');

const imagesRouter = require('./controllers/images');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use('/images', imagesRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
