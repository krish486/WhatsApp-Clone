const { Server } = require("socket.io")

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CORS_URL,
            credentials: true
        },
        transports: ["websocket", "polling"]
    })
    return io
}

const getIO = () => io

module.exports = {
    initSocket,
    getIO
};