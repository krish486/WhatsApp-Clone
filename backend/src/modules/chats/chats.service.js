const ChatRepo = require("../../repository/chat.repo");
const UserRepo = require("../../repository/repository");
const { encryptMessage, decryptMessage } = require("../../utils/chatEncryption");

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

        const saved = await this.chatRepo.storeChat(
            userId,
            friend._id,
            encryptedChat
        );


        saved.message.chat = decryptMessage(saved.message.chat);

        return saved;
    }

    async watchingChatService(userId, friendId) {

        const conversation = await this.chatRepo.watchChat(
            userId,
            friendId
        );

        if (!conversation) {
            return [];
        }

        conversation.chats = conversation.chats.map((msg) => ({
            ...msg.toObject(),
            chat: decryptMessage(msg.chat)
        }));

        return conversation;
    }
}

module.exports = ChatService