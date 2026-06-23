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
}

module.exports = UserController