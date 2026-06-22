const UserService = require("./user.service")

class UserController {
    constructor() {
        this.authService = new UserService();
    }
}

module.exports = UserController