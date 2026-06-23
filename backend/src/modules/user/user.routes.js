const { Router } = require("express")
const UserController = require("./user.controller")

const userRoutes = Router()

const userController = new UserController();

userRoutes.post("/:senderId/friend/request", userController.friendRequestController.bind(userController))
userRoutes.post("/:senderId/friend/search",userController.friendSearchController.bind(userController))

module.exports = userRoutes