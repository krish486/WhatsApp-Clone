const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.accessToken
        let data = jwt.verify(token, process.env.ACCESS_SECRET)
        req.user = data
        next()
    }
    catch (err) {
        return res.status(401).json({
            message: "access token expired"
        })
    }
}


module.exports = { authMiddleware }