const { default: mongoose } = require("mongoose");

const friendRequestCollectionSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    }
    ,
    {
        timestamps: true
    }
)

let friendRequestCollectionModel = mongoose.model("friendCollection", friendRequestCollectionSchema)

module.exports = friendRequestCollectionModel