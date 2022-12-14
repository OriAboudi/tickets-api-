const jwt = require('jsonwebtoken');
const { config } = require('../config/secret');
exports.auth = async (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "You Need Token!" });
    }
    try {
        let decodedToken = jwt.verify(token, config.tokenSecret)
        req.tokenData = decodedToken;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}