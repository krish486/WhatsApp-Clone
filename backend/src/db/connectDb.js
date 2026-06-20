const mongoose = require("mongoose")
const logger = require("../config/logger")

const connectDb = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    logger.info("Db connected successfull")
}

module.exports = connectDb