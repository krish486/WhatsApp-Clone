const friendRequestCollectionModel = require("../../models/user/friendRequestCollection.model");
const UserRepo = require("../../repository/repository")

class UserService {
    constructor() {
        this.userRepo = new UserRepo();
    }
    async friendRequestService(req, res) {
        try {
            const { senderId } = req.params;
            const { id, status, createdAt } = req.body;

            const existRequest = await friendRequestCollectionModel.findOne({
                $or: [
                    { senderId: senderId, receiverId: id }
                    ,
                    { senderId: id, receiverId: senderId }
                ]
            })
            if (existRequest && existRequest.status === "pending") {
                return await friendRequestCollectionModel.findByIdAndUpdate(existRequest._id, { status: status }, { new: true })
            }
            const newRequest = await friendRequestCollectionModel.create({
                senderId,
                receiverId: id,
                status: "pending",
                createdAt
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
    async friendSearchService(friendMail) {
        let existUser = await this.userRepo.userFindEmail(friendMail)
        if (!existUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
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