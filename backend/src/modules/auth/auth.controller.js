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
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000,
        };
        const refreshCookieConfig = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        };
        res.cookie("accessToken", accToken, accessCookieConfig);
        res.cookie("refreshToken", refToken, refreshCookieConfig);
        res.redirect(process.env.CALLBACK_URL)
    }

    async meController(req, res) {
        const { email } = req.user
        const existUser = await this.authService.meService(email)
        return res.status(200).json({
            success: true,
            value: existUser
        })
    }
    async refreshTokenController(req, res) {
        try {
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
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            })
        }

    }
    async logOutController(req, res) {
        try {
            const { id } = req.user
            await this.authService.logOutService(id);

            const accessCookieConfig = {
                httpOnly: false,
                secure: false,
                sameSite: "lax",
            }
            const refreshCookieConfig = {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            }

            res.clearCookie("refreshToken", refreshCookieConfig)
            res.clearCookie("accessToken", accessCookieConfig)

            return res.status(204).json({
                success: true
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

}

module.exports = AuthController