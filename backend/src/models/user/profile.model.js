const mongoose = require("mongoose")

const userProfileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        picture: {
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
    },
    {
        timestamps: true
    }
)

const userProfileModel = mongoose.model("Profile", userProfileSchema)
module.exports = userProfileModel