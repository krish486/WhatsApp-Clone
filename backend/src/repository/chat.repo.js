const chatCollection = require("../models/user/chatCollection");
const conversationMetadata = require("../models/user/conversationMetadata");

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

        const conversationMetaData = await conversationMetadata.findOneAndUpdate(
            {
                userId: friendId,
                friendId: userId
            },
            {
                $inc: {
                    unreadCount: 1
                }
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );


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

            message: lastMessage,

            unreadCount: conversationMetaData.unreadCount

        };

    }

    async watchChat(userId, friendId) {

        const conversation = await chatCollection.findOne({
            $or: [
                { userId, friendId },
                { userId: friendId, friendId: userId }
            ]
        });
        const conversationMetaData = await conversationMetadata.findOneAndUpdate(
            {
                userId,
                friendId
            },
            {

                $set: {
                    unreadCount: 0
                }
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );

        if (!conversation) return null;

        const conversationObject = conversation.toObject();

        conversationObject.chats = conversationObject.chats.map(msg => ({
            ...msg,
            time: new Date(msg.time).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
        }));

        return {
            ...conversationObject,
            unreadCount: conversationMetaData.unreadCount
        };
    }
}

module.exports = ChatRepo