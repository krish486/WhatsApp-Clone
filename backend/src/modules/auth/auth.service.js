const logger = require("../../config/logger")
const authModel = require("../../models/auth.model")
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
    async refreshTokenService(req, res) {
        let refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                message: "refresh token expired"
            })
        }
        let payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
        delete payload.exp;
        delete payload.iat;

        let accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1H" })

        return { accessToken }
    }
    async logOutService(id) {
        const existUser = await authModel.findById(id)
        existUser.refreshToken = null;

        await existUser.save();
    }
}

module.exports = AuthService