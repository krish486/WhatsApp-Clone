const friendRequestCollectionModel = require("../../models/user/friendRequestCollection.model");
const UserRepo = require("../../repository/repository")

class UserService {
    constructor() {
        this.userRepo = new UserRepo();
    }
    async friendRequestService(req, res) {
        try {
            const { _id } = req.user
            const { id, status, createdAt } = req.body;

            const existRequest = await friendRequestCollectionModel.findOne({
                $or: [
                    { senderId: _id, receiverId: id }
                    ,
                    { senderId: id, receiverId: _id }
                ]
            })
            if (existRequest && existRequest.status === "pending") {
                return await friendRequestCollectionModel.findByIdAndUpdate(existRequest._id, { status: status }, { new: true })
            }
            const newRequest = await friendRequestCollectionModel.create({
                _id,
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
    async friendSearchService(friendMail, res) {
        let existUser = await this.userRepo.userFindEmail(friendMail)
        console.log("exist-user-->", existUser)
        if (!existUser) {
            return null
        }
        const friend = {
            name: existUser.name,
            email: existUser.email,
            picture: existUser.picture
        }
        console.log("this is check point............")
        return friend
    }
}


module.exports = UserService