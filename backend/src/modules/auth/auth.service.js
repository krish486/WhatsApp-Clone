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
    async refreshTokenService(req) {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new Error("Refresh token expired");
        }

        const payload = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET
        );

        delete payload.exp;
        delete payload.iat;

        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return { accessToken };
    }
    async logOutService(id) {
        const existUser = await authModel.findById(id)
        existUser.refreshToken = null;

        await existUser.save();
    }
    async meService(email) {
        const existUser = await authModel.findOne({ email })
        return {
            name: existUser.name,
            email: existUser.email,
            picture: existUser.picture,
            id: existUser._id
        }
    }
}

module.exports = AuthService