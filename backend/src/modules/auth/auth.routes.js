const { Router } = require("express");
const AuthController = require("./auth.controller");
const passport = require("passport");
const { authMiddleware } = require("../../middleware/authMiddleware");

const authRoutes = Router()

let authController = new AuthController();

authRoutes.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

authRoutes.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    authController.googleCallbackController.bind(authController)
);

authRoutes.get("/me", authMiddleware, authController.meController.bind(authController))


module.exports = authRoutes