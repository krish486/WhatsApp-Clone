let morgan = require("morgan")
const logger = require("../config/logger")


const requestLogger = () => {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === "developement") {
        return morgan("dev");
    }
    return (req, res, next) => {
        logger.info({
            method: req.method,
            url: req.url,
            ip: req.ip
        })
        next();
    }
}

module.exports = requestLogger