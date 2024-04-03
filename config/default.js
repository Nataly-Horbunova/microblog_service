module.exports = {
    server: {
        port: process.env.PORT || 3000
    },
    storage: {
        uri: process.env.MONGO_DB_URI || '',
        name: process.env.MONGO_DB_NAME || ''
    },
    auth: {
        jwtSecret: process.env.REFRESH_TOKEN_SECRET || ''
    }
}