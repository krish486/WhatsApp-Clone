const chatCollection = require("../models/user/chatCollection");

class ChatRepo {
    async storeChat(userId, friendId, chat) {

        let conversation = await chatCollection.findOne({
            userId,
            friendId
        });

        if (!conversation) {

            conversation = await chatCollection.create({
                userId,
                friendId,
                chats: [
                    {
                        person: "user",
                        chat,
                        seen: false
                    }
                ]
            });

        } else {

            conversation.chats.push({
                person: "user",
                chat,
                seen: false
            });

            await conversation.save();
        }

        return conversation;
    }
}

module.exports = ChatRepo