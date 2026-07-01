const ChatService = require("./chats.service")


class ChatController {
    constructor() {
        this.chatService = new ChatService();
    }

    async storingChatsController(req, res) {
        try {

            const { id } = req.user;
            const { email, chat } = req.body;

            const response = await this.chatService.storingChatsService(
                id,
                email,
                chat
            );

            return res.status(201).json({
                success: true,
                data: response
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async watchingChatController(req, res) {
        try {

            const { id } = req.user;
            const { friendId } = req.params;

            const response = await this.chatService.watchingChatService(
                id,
                friendId
            );

            return res.status(200).json({
                success: true,
                data: response
            });

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }
    }
}

module.exports = ChatController