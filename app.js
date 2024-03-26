require('dotenv').config();
const express = require('express');
const { server } = require('config');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authRouter = require('./routes/auth');
const pagesRouter = require('./routes/pages');

const app = express();
const{ port } = server;

// Connect to DB
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan(':method :url :status '));

app.use(express.static('./public'));

// Template engine
app.set('view engine', 'ejs');

// Routes
app.use('/auth', authRouter);
app.use('/', pagesRouter);

app.listen(port, console.log(`Server is running on port ${port}`));