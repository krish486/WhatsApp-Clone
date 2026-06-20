const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");


const googleAuthMiddleware = (app) => {
    app.use(passport.initialize())

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CLIENT_CALLBACK
    },
        function (accessToken, refreshToken, profile, cb) {

            return cb(null, user);
        }
    ));
}

module.exports = googleAuthMiddleware