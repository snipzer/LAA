const jwt = require('jsonwebtoken');
const MessageUtil = require('../util/MessageUtil');

class AccessGranted {
    static public(req, res, next) {
        next();
    }

    static restricted(req, res, next) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.API_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).json(MessageUtil.getErrors().NOT_CONNECTED.fr);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }

    static generateToken(objectId) {
        return jwt.sign({ id: objectId }, process.env.API_TOKEN_SECRET, { expiresIn: 60 * 60 });
    }
}

module.exports = AccessGranted;
