require('dotenv').config()
exports.config = {
    userDB: process.env.USER_DB,
    passDB:process.env.PASS_DB,
    tokenSecret:process.env.TOKEN_SECRET
}