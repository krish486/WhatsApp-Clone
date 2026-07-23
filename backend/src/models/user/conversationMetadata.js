const mongoose = require("mongoose");

const conversationMetaSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        friendId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        unreadCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        lastReadAt: {
            type: Date,
            default: null,
        },

        pinned: {
            type: Boolean,
            default: false,
        },

        muted: {
            type: Boolean,
            default: false,
        },

        archived: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

// Ek user ke liye ek hi metadata document
conversationMetaSchema.index(
    {
        userId: 1,
        friendId: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "ConversationMeta",
    conversationMetaSchema
);