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
            return res.status(200).json({
                success: true,
                buddy
            })
        } catch (error) {
            return res.status(500).json({
                success: true,
                message: error.message
            })
        }
    }
}

module.exports = UserController