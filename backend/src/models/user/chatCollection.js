const mongoose = require("mongoose");
const { encryptMessage } = require("../../utils/chatEncryption");

const chatSchema = new mongoose.Schema(
    {
        friendId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        chats: [
            {
                senderId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                chat: {
                    type: String,
                },
                time: {
                    type: Date,
                    default: Date.now,
                },
                seen: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Chat", chatSchema);