require("dotenv").config();

const http = require("http");

const createApp = require("./src/app");
const logger = require("./src/config/logger");
const connectDb = require("./src/db/connectDb");

const { initSocket } = require("./src/socket/socket");
const socketHandler = require("./src/socket/socketHandler");

const startServer = async () => {

    try {

        const app = createApp();

        await connectDb();

        const server = http.createServer(app);

        const io = initSocket(server);

        socketHandler(io);

        server.listen(3000, () => {

            logger.info("Server Running On Port 3000");

        });

    }
    catch (err) {

        logger.error(err.message);

    }

}

startServer();