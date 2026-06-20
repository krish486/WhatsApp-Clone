const mongoose = require("mongoose")

let authSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    }
}, { timestamps: true })

let authModel = mongoose.model("auth", authSchema)

module.exports = authModel