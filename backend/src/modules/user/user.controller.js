const friendRequestCollectionModel = require("../../models/user/friendRequestCollection.model");
const UserService = require("./user.service")

class UserController {
    constructor() {
        this.authService = new UserService();
    }
    async friendRequestController(req, res) {
        await this.authService.friendRequestService(req, res);
        return res.status(200).json({
            success: true
        })
    }
    async friendSearchController(req, res) {
        try {
            const { friend } = req.body;
            const buddy = await this.authService.friendSearchService(friend);
            if (!buddy) {
                return res.status(404).json({
                    success: false,
                    message: "user not found"
                })
            }
            return res.status(200).json({
                success: true,
                buddy
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

module.exports = UserController