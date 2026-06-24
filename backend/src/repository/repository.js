const authModel = require("../models/auth.model");


class UserRepo {
    async create(user) {
        const data = await authModel.create(user)
        return data
    }
    async findEmail(email) {
        const data = await authModel.findOne({ email })
        return data
    }
    async userFindEmail(email) {
        let user = await authModel.findOne({ email })
        return user
    }
}

module.exports = UserRepo