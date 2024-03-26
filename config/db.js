require('dotenv').config();
const { storage } = require('config'); 
const mongoose = require('mongoose');
const morgan = require('morgan');

const DATABASE_URI = storage.uri;

function connectDB() {
    try {
        mongoose.connect(DATABASE_URI);
        console.log("MongoDB connected"); 
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;
