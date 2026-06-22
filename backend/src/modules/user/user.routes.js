const { Router } = require("express")
const UserController = require("./user.controller")

const userRoutes = Router()

const userController = new UserController();

userRoutes.get("/:id/friends",)

module.exports = userRoutes