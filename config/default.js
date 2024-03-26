module.exports = {
    server: {
        port: process.env.PORT || 3000
    },
    storage: {
        uri: process.env.MONGO_DB_URI
    }
}