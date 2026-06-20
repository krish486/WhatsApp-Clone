const authModel = require("../models/auth.model");


class UserRepo {
    async create(user) {
        await authModel.create(user)
    }
    async findEmail(email) {
        await authModel.findOne({ email }).lean()
    }
}

module.exports = UserRepo