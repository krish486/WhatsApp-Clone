const { Router } = require("express")
const ChatController = require("./chats.controller");
const { authMiddleware } = require("../../middleware/authMiddleware");

const chatRoutes = Router()

const chatController = new ChatController();

chatRoutes.post("/storing", authMiddleware, chatController.storingChatsController.bind(chatController))

chatRoutes.get("/watch/:friendId", authMiddleware, chatController.watchingChatController.bind(chatController))

module.exports = chatRoutes