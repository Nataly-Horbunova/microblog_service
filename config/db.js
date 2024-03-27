const { storage } = require('config'); 
const mongoose = require('mongoose');
const morgan = require('morgan');

const DATABASE_URI = storage.uri;
const DATABASE_NAME = storage.name;


function connectDB() {
    try {
        mongoose.connect(DATABASE_URI, { dbName: DATABASE_NAME} );
        console.log("MongoDB connected"); 
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;
