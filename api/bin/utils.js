const utils = {
    verifyToken: (req, res, next) => {
        const token = req.headers['authorization'];
        if (typeof token !== 'undefined') {
            req.token = token;
            next();
        } else {
            res.sendStatus(403)
        }
    }
}

module.exports = utils;