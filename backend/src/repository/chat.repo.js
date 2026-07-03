const chatCollection = require("../models/user/chatCollection");

class ChatRepo {
    async storeChat(userId, friendId, chat) {

        let conversation = await chatCollection.findOne({
            $or: [
                {
                    userId,
                    friendId
                },
                {
                    userId: friendId,
                    friendId: userId
                }
            ]
        });

        if (!conversation) {

            conversation = await chatCollection.create({

                userId,

                friendId,

                chats: [
                    {
                        senderId: userId,
                        chat,
                        seen: false
                    }
                ]

            });

        } else {

            conversation.chats.push({

                senderId: userId,

                chat,

                seen: false

            });

            await conversation.save();

        }

        const lastMessage =
            conversation.chats[
            conversation.chats.length - 1
            ];

        return {

            receiverId: friendId,

            message: lastMessage

        };

    }

    async watchChat(userId, friendId) {

        const conversation = await chatCollection.findOne({
            $or: [
                { userId, friendId },
                { userId: friendId, friendId: userId }
            ]
        });

        if (!conversation) return null;

        conversation.chats = conversation.chats.map(msg => ({
            ...msg,
            time: new Date(msg.time).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
        }));

        return conversation;
    }
}

module.exports = ChatRepo