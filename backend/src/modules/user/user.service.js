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
            return updateRequest
        }
        const newRequest = await friendRequestCollectionModel.create({
            _id,
            receiverId: id,
            status: "pending",
        })

        return newRequest;

    }
    async friendSearchService(friendMail, res) {
        let existUser = await this.userRepo.userFindEmail(friendMail)
        if (!existUser) {
            return null
        }
        const friend = {
            name: existUser.name,
            email: existUser.email,
            picture: existUser.picture
        }
        return friend
    }
}


module.exports = UserService