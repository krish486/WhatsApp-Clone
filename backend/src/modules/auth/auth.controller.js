const AuthService = require("./auth.service")


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
        res.cookie("access-token", accToken, accessCookieConfig);
        res.cookie("refresh-token", refToken, refreshCookieConfig);
        res.redirect(process.env.CALLBACK_URL)
    }

}

module.exports = AuthController