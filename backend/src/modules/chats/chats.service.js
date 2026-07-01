const ChatRepo = require("../../repository/chat.repo");
const UserRepo = require("../../repository/repository");
const { encryptMessage } = require("../../utils/chatEncryption");

class ChatService {
    constructor() {
        this.userRepo = new UserRepo()
        this.chatRepo = new ChatRepo()
    }

    async storingChatsService(userId, friendEmail, chat) {

        const friend = await this.userRepo.findEmail(friendEmail);

        if (!friend) {
            throw new Error("User not found");
        }

        const encryptedChat = encryptMessage(chat);

        return await this.chatRepo.storeChat(
            userId,
            friend._id,
            encryptedChat
        );
    }
}

module.exports = ChatService