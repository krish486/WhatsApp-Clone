const authModel = require("../models/auth.model");


class UserRepo {
    async create(user) {
        const data = await authModel.create(user)
        return data
    }
    async findEmail(email) {
        await authModel.findOne({ email }).lean()
    }
}

module.exports = UserRepo