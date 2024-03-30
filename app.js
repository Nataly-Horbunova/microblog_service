require('dotenv').config();
const express = require('express');
const { server } = require('config');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { errorHandler, notFoundHandler} = require('./middleware/errorHandlers');
const { jwtParser } = require('./middleware/auth');

const authRouter = require('./routes/auth');
const pagesRouter = require('./routes/pages');
const postsRouter = require('./routes/posts');

const app = express();
const{ port } = server;

// Connect to DB
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan(':method :url :status '));

app.use(express.static('./public'));

// Template engine
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(jwtParser);

// Routes
app.use('/auth', authRouter);
app.use('/', pagesRouter);
app.use('/api/posts', postsRouter);



app.all('*', notFoundHandler);
app.use(errorHandler);

app.listen(port, console.log(`Server is running on port ${port}`));