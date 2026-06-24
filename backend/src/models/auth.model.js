const mongoose = require("mongoose")

let authSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    picture: {
        type: String,
    },
    refToken: {
        type: String,
    },
    friendList: [{
        friendName: {
            type: String
        },
        friendPicture: {
            type: String
        }
    }]
}, { timestamps: true })

let authModel = mongoose.model("auth", authSchema)

module.exports = authModel