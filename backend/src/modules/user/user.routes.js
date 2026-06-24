const { Router } = require("express")
const UserController = require("./user.controller");
const { authMiddleware } = require("../../middleware/authMiddleware");

const userRoutes = Router()

const userController = new UserController();

userRoutes.post("/friend/request", authMiddleware, userController.friendRequestController.bind(userController))
userRoutes.post("/friend/search", authMiddleware, userController.friendSearchController.bind(userController))

module.exports = userRoutes