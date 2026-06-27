const friendRequestCollectionModel = require("../../models/user/friendRequestCollection.model");
const UserService = require("./user.service")

class UserController {
    constructor() {
        this.authService = new UserService();
    }
    async friendRequestController(req, res) {
        try {
            const { id } = req.user
            const { email, status } = req.body
            let request = await this.authService.friendRequestService(id, email, status);
            return res.status(200).json({
                success: true,
                status
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    async friendSearchController(req, res) {
        try {
            const { friend } = req.body;
            const { id } = req.user;
            const buddy = await this.authService.friendSearchService(friend, id);
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

    async getPendingRequestController(req, res) {
        try {
            const { id } = req.user
            const reqList = await this.authService.getPendingRequestService(id)
            if (!reqList) {
                return res.status(200).json({
                    success: true,
                    message: "no request"
                })
            }
            return res.status(200).json({
                success: true,
                reqList
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async getAcceptedRequestController(req, res) {
        try {

            const { id } = req.user;
            const reqList = await this.authService.getAcceptedRequestService(id)
            if (!reqList) {
                return res.status(200).json({
                    success: true,
                    message: "no request"
                })
            }
            return res.status(200).json({
                success: true,
                reqList
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async deleteRejectedRequestController(req, res) {
        try {
            const { id } = req.user
            await this.authService.deleteRejectedService(id);

            return res.status(200).json({
                success: true
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