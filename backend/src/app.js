let express = require("express")
const requestLogger = require("./middleware/requestLogger")
const authRoutes = require("./modules/auth/auth.routes")
const googleAuthMiddleware = require("./middleware/googleOauthMiddleware")


const createApp = () => {
    let app = express()

    app.use(requestLogger())

    googleAuthMiddleware(app)

    app.use("/auth", authRoutes)


    return app
}

module.exports = createApp