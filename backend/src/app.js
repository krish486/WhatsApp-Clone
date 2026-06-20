let express = require("express")
const requestLogger = require("./middleware/requestLogger")
const authRoutes = require("./modules/auth/auth.routes")
const googleAuthMiddleware = require("./middleware/googleOauthMiddleware")
const cookieParser = require("cookie-parser")


const createApp = () => {
    let app = express()

    app.use(requestLogger())

    app.use(cookieParser())
    googleAuthMiddleware(app)

    app.use("/auth", authRoutes)


    return app
}

module.exports = createApp