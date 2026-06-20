require("dotenv").config();
const createApp = require("./src/app");
const logger = require("./src/config/logger");
const connectDb = require("./src/db/connectDb");

const startServer = () => {
    let app = createApp()
    connectDb().then(() => {
        app.listen(3000, () => {
            logger.info("server is running on port 3000")
        })
    })
        .catch((err) => logger.error(err.message))
}

startServer()