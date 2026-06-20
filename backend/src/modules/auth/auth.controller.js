const AuthService = require("./auth.service")


class AuthController {
    constructor() {
        this.authService = new AuthService();
    }
    async googleCallbackController(req, res) {
        const { accToken, refToken } = await this.authService.createUser(req.user)
        accessCookieConfig = {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        }
        refreshCookieConfig = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        }
        res.cookie("access-token", accToken, accessCookieConfig);
        res.cookie("refresh-token", refToken, refreshCookieConfig);
        return res.status(200).json({
            success: true
        })
    }

}

module.exports = AuthController