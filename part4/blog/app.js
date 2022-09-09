//including all the modules taht are required for creating the app
//so that we could use all the functionality that are available to us
const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const logging = require('./utils/logging');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const responseTime = require('response-time');
const testingRouter = require('./controllers/testing');

const app = express();

app.use(responseTime());

//connnecting to mongodb uri so that we could query the database
const mongoUrl = config.MONGODB_URI;
logging.info('connecting to database');
mongoose
    .connect(mongoUrl)
    .then((result) => {
        logging.info('connected to Blog Database');
    })
    .catch((err) => {
        logging.error('connection failed', err.message);
    });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
//handle endpoints that start with /api/blogs
app.use('/api/blogs', blogRouter);
//handle endpoints that start with /api/users because users needs to be routed somewhere
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'test') {
    console.log('in testing...');
    app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
