const { Router } = require("express")
const UserController = require("./user.controller")

const userRoutes = Router()

const userController = new UserController();

userRoutes.post("/:senderId/friend/request", userController.friendRequestController.bind(friendRequestController))
userRoutes.post("/:senderId/friend/search",)

module.exports = userRoutes