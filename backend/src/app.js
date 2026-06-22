let express = require("express")
const requestLogger = require("./middleware/requestLogger")
const authRoutes = require("./modules/auth/auth.routes")
const googleAuthMiddleware = require("./middleware/googleOauthMiddleware")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const userRoutes = require("./modules/user/user.routes")


const createApp = () => {
    let app = express()

    app.use(requestLogger())

    app.use(cookieParser())
    googleAuthMiddleware(app)
    app.use(cors({
        origin: process.env.CORS_URL,
        credentials: true
    }))

    app.use("/", authRoutes)
    app.use("/user", userRoutes)

    return app
}

module.exports = createApp