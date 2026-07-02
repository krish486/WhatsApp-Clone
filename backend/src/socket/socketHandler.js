const ChatService = require("../modules/chats/chats.service");
const onlineUsers = require("./onlineUsers");
const events = require("./socketEvents");

const chatService = new ChatService();

module.exports = (io) => {

    io.on(events.CONNECTION, (socket) => {

        console.log("Connected :", socket.id);

        socket.on(events.JOIN, (userId) => {
            onlineUsers.set(userId, socket.id);
            io.emit(events.USER_ONLINE, {
                userId
            });
        })

        socket.on(events.SEND_MESSAGE, async (data) => {
            try {

                const { senderId, receiverEmail, message } = data

                const savedMessage = await chatService.storingChatsService(senderId, receiverEmail, message)
                const receiverSocket = onlineUsers.get(savedMessage.friendId.toString());

                if (receiverSocket) {

                    io.to(receiverSocket).emit(

                        events.RECEIVE_MESSAGE,

                        savedMessage

                    );

                }


            } catch (error) {
                console.log("error in event-sendMessage-", error.message)
            }
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