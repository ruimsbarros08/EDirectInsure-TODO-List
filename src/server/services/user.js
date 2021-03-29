
const User = require("../models/user");
const authenticationService = require("../services/authentication");

module.exports = {
  create: async (email, password, name) => {
    const user = new User();
    user.email = email;
    user.password = authenticationService.hashString(password);
    user.name = name;

    return user.save();
  },
  findByEmailAndPassword: async (email, password) => {
    let hashedPwd = authenticationService.hashString(password);
    return User.findOne({email: email, password: hashedPwd});
  },
}
