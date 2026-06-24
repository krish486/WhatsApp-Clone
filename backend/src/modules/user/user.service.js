const friendRequestCollectionModel = require("../../models/user/friendRequestCollection.model");
const UserRepo = require("../../repository/repository")

class UserService {
    constructor() {
        this.userRepo = new UserRepo();
    }
    async friendRequestService(_id, email, status) {
        const senders = await this.userRepo.findEmail(email)
        const id = await senders._id;
        const existRequest = await friendRequestCollectionModel.findOne({
            $or: [
                { senderId: _id, receiverId: id }
                ,
                { senderId: id, receiverId: _id }
            ]
        })
        if (existRequest && existRequest.status === "pending") {
            let updatedRequest = await friendRequestCollectionModel.findByIdAndUpdate(existRequest._id, { status: status }, { new: true })
            return updatedRequest
        }
        const newRequest = await friendRequestCollectionModel.create({
            senderId: _id,
            receiverId: id,
            status: "pending",
        })

        return newRequest;

    }
    async friendSearchService(friendMail, senderId) {
        let existUser = await this.userRepo.userFindEmail(friendMail)
        if (!existUser) {
            return null
        }
        const receiverId = existUser._id

        const existRequest = await friendRequestCollectionModel.findOne({
            $or: [
                { senderId: senderId, receiverId: receiverId }
                ,
                { senderId: receiverId, receiverId: senderId }
            ]
        })
        if (!existRequest) {
            const friend = {
                name: existUser.name,
                email: existUser.email,
                picture: existUser.picture
            }
            return friend
        }
        const visitedFriend = {
            name: existUser.name,
            email: existUser.email,
            picture: existUser.picture,
            status: existRequest.status
        }

        return visitedFriend
    }
}


module.exports = UserService