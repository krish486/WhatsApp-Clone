const { default: mongoose } = require("mongoose");

const friendRequestCollectionSchema = new mongoose.Schema(
    {
        senderId: ObjectId,
        receiverId: ObjectId,
        status: {
            enum: ["pending", "accepted", "rejected"]
        },
        createdAt: Date
    }
    ,
    {
        timestamps: true
    }
)

let friendRequestCollectionModel = mongoose.model("friendCollection", friendRequestCollectionSchema)

module.exports = friendRequestCollectionModel