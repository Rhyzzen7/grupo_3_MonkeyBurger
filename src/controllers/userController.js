const path = require("path");

const usersController = {
  userProfile: function (req, res) {
    res.render("./users/user-profile");
  },
};

module.exports = usersController;
