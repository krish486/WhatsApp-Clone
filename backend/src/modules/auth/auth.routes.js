const { Router } = require("express");
const AuthController = require("./auth.controller");

const authRoutes = Router()

let authController = new AuthController();

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    authController.googleCallbackController.bind(authController)
);

module.exports = authRoutes