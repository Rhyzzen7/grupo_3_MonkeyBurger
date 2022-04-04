const path = require("path");

const usersController = {
  userProfile: function (req, res) {
    res.sendFile(path.join(__dirname, "../views/users/user-profile.html"));
  },
};

module.exports = usersController;
