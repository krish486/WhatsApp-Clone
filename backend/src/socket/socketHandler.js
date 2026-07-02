const onlineUsers = require("./onlineUsers");
const events = require("./socketEvents");


module.exports = (io) => {

    io.on(events.CONNECTION, (socket) => {

        console.log("Connected :", socket.id);

        socket.on(events.JOIN, (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log("----------------------------");
            console.log("User Joined");
            console.log("User :", userId);
            console.log("Socket :", socket.id);
            console.log("Online :", onlineUsers.size);
            console.log("----------------------------");
            io.emit(events.USER_ONLINE, {
                userId
            });
        })

        socket.on("disconnect", () => {

            let disconnectedUser = null;

            for (const [userId, socketId] of onlineUsers.entries()) {

                if (socketId === socket.id) {

                    disconnectedUser = userId;

                    onlineUsers.delete(userId);

                    break;

                }

            }
            if (disconnectedUser) {

                io.emit(events.USER_OFFLINE, {
                    userId: disconnectedUser
                });

                console.log("----------------------------");
                console.log("User Left");
                console.log("User :", disconnectedUser);
                console.log("Online :", onlineUsers.size);
                console.log("----------------------------");

            }
            console.log("Socket Disconnected :", socket.id);

        });

    });

};