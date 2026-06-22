const UserRepo = require("../../repository/repository")

class UserService {
    constructor() {
        this.userRepo = new UserRepo();
    }
}


module.exports = UserService