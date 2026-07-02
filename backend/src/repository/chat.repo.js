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

        return conversation;
    }

    async watchChat(userId, friendId) {

        const conversation = await chatCollection.findOne({
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

        return conversation;
    }
}

module.exports = ChatRepo