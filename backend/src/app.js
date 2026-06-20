let express = require("express")
const requestLogger = require("./middleware/requestLogger")
const authRoutes = require("./modules/auth/auth.routes")


const createApp = () => {
    let app = express()

    app.use(requestLogger())

    app.use("/auth", authRoutes)


    return app
}

module.exports = createApp