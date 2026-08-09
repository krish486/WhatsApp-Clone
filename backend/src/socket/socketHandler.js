const ChatService = require("../modules/chats/chats.service");
const { emailToSocketMapping, socketToEmailMapping } = require("./emailToSocketMapping");
const onlineUsers = require("./onlineUsers");
const events = require("./socketEvents");

const chatService = new ChatService();

module.exports = (io) => {

    io.on(events.CONNECTION, (socket) => {

        socket.on(events.JOIN, ({ userId, userEmail }) => {
            console.log("========== JOIN ==========");
            console.log("JOIN userId:", userId);
            console.log("JOIN socket:", socket.id);

            onlineUsers.set(userId, socket.id);
            emailToSocketMapping.set(userEmail, socket.id);
            socketToEmailMapping.set(socket.id, userEmail);

            console.log("emailToSocketMapping:", emailToSocketMapping);
            console.log("==========================");

            io.emit(events.USER_ONLINE, {
                userId
            });
        })

        socket.on(events.SEND_MESSAGE, async (data) => {
            try {

                const { senderId, receiverEmail, message } = data

                const savedMessage = await chatService.storingChatsService(senderId, receiverEmail, message)

                const receiverSocket = onlineUsers.get(savedMessage.receiverId.toString());

                if (receiverSocket) {
                    io.to(receiverSocket).emit(
                        events.RECEIVE_MESSAGE,
                        savedMessage.message
                    );

                    io.to(receiverSocket).emit(events.UNREAD_COUNT_UPDATED, {
                        friendId: senderId,
                        unreadCount: savedMessage.unreadCount
                    })

                }


            } catch (error) {
                console.log("error in event-sendMessage-", error.message)
            }
        })

        socket.on(events.CREATE_VC, (data) => {
            const { recieverEmail, senderEmail, roomId } = data;

            const receiverSocket = emailToSocketMapping.get(recieverEmail);
            const senderSocket = emailToSocketMapping.get(senderEmail)

            console.log("senderSocket:", senderSocket)
            console.log("Caller:", senderEmail);
            console.log("Receiver:", recieverEmail);
            console.log("Receiver socket:", receiverSocket);
            console.log("Room:", roomId);

            if (!receiverSocket) {
                console.log("Receiver is offline");
                return;
            }

            // Caller joins room
            socket.join(roomId);

            // Tell caller that room has been created
            socket.emit(events.CREATED_VC, { roomId });

            // Tell receiver about incoming call
            io.to(receiverSocket).emit(events.INCOMING_VC, {
                from: senderEmail,
                roomId
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
                emailToSocketMapping.delete(disconnectedUser);
                socketToEmailMapping.delete(socket.id);

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