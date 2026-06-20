let express = require("express")
const requestLogger = require("./middleware/requestLogger")


const createApp = () => {
    let app = express()

    app.use(requestLogger())


    return app
}

module.exports = createApp