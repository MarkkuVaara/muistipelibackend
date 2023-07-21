const config = require('./utils/config');

const express = require('express');
const app = express();
const cors = require('cors');

const imagesRouter = require('./controllers/images');
const highscoresRouter = require('./controllers/highscores');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use('/images', imagesRouter);
app.use('/highscores', highscoresRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
