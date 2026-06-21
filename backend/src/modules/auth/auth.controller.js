const AuthService = require("./auth.service")
let jwt = require("jsonwebtoken")


class AuthController {
    constructor() {
        this.authService = new AuthService();
    }
    async googleCallbackController(req, res) {
        const { accToken, refToken } = await this.authService.createUser(req.user)
        const accessCookieConfig = {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        }
        const refreshCookieConfig = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        }
        res.cookie("accessToken", accToken, accessCookieConfig);
        res.cookie("refreshToken", refToken, refreshCookieConfig);
        res.redirect(process.env.CALLBACK_URL)
    }

    async meController(req, res) {
        return res.status(200).json({
            success: true,
            value: req.user
        })
    }
    async refreshTokenController(req, res) {
        const { accessToken } = await this.authService.refreshTokenService(req, res);
        const accessCookieConfig = {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        }
        res.cookie("accessToken", accessToken, accessCookieConfig);
        return res.status(200).json({
            success: true
        })
    }

}

module.exports = AuthController