const logger = require("../../config/logger")
const UserRepo = require("../../repository/repository")
const jwt = require("jsonwebtoken")

class AuthService {
    constructor() {
        this.userRepo = new UserRepo
    }

    async createUser(user) {
        let existUser = await this.userRepo.findEmail(user.emails[0].value)
        let result = existUser

        if (!existUser) {
            result = await this.userRepo.create({
                name: user.displayName,
                picture: user.photos[0].value,
                email: user.emails[0].value
            })
        }
        let tokenData = {
            id: result._id,
            name: result.name,
            picture: result.picture,
            email: result.email
        }
        let accToken = jwt.sign(tokenData, process.env.ACCESS_SECRET, { expiresIn: "1H" })
        let refToken = jwt.sign(tokenData, process.env.REFRESH_SECRET, { expiresIn: "24H" })

        result.refToken = refToken
        await result.save()

        return { accToken, refToken }
    }
}

module.exports = AuthService