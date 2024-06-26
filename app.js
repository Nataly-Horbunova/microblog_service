require('dotenv').config();
const express = require('express');
const { server } = require('config');
const connectDB = require('./config/db');
const rfs = require("rotating-file-stream");
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const { errorHandler, notFoundHandler} = require('./middleware/errorHandlers');
const { jwtParser } = require('./middleware/auth');

const authRouter = require('./routes/auth');
const pagesRouter = require('./routes/pages');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const usersRouter = require('./routes/users');

const app = express();
const{ port } = server;

// Connect to DB
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Morgan logging
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', 
    path: path.join(__dirname, 'logs')
    });
app.use(morgan('dev', { skip: function (_req, res) { return res.statusCode < 400 }}));
app.use(morgan(':date[iso] :method :url :status :res[content-length] :response-time ms', { stream: accessLogStream }));

// Static files serving
app.use(express.static('./public'));

// Template engine
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(jwtParser);

// Routes
app.use('/auth', authRouter);
app.use('/', pagesRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);

// Error handling
app.all('*', notFoundHandler);
app.use(errorHandler);

app.listen(port, console.log(`Server is running on port ${port}`));