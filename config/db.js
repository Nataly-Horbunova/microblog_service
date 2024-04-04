const { storage } = require('config');
const mongoose = require('mongoose');

function connectDB() {
    try {
        mongoose.connect(storage.uri, { dbName: storage.name } );
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;
