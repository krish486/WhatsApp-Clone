require("dotenv").config();
const createApp = require("./src/app");
const logger = require("./src/config/logger");

const startServer = () => {
    let app = createApp()


    app.listen(3000, () => {
        logger.info("server is running on port 3000")
    })
}

startServer()