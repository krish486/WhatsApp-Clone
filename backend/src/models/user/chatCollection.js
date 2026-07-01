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
                person: {
                    type: String,
                    enum: ["user", "friend"],
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

chatSchema.pre("save", async function () {
    this.chats.forEach((message) => {
        if (message.chat) {
            message.chat = encryptMessage(message.chat);
        }
    });
});

module.exports = mongoose.model("Chat", chatSchema);