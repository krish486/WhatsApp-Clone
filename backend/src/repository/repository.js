const authModel = require("../models/auth.model");
const userProfileModel = require("../models/user/profile.model");


class UserRepo {
    async create(user) {
        const data = await authModel.create(user)
        return data
    }
    async findEmail(email) {
        await authModel.findOne({ email }).lean()
    }
    async userFindEmail(email) {
        let user = await userProfileModel.findOne({ email }).lean()
        return user
    }
}

module.exports = UserRepo