const createApp = require("./src/app");

const startServer = () => {
    let app = createApp()


    app.listen(3000, () => {
        console.log("server is running on port 3000")
    })
}

startServer()