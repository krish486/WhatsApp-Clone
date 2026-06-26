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
    async findById(id) {
        const res = await authModel.findById(id)
        const data = {
            name: res.name,
            email: res.email,
            picture: res.picture
        }
        return data
    }
    async userFindEmail(email) {
        let user = await authModel.findOne({ email })
        return user
    }
}

module.exports = UserRepo