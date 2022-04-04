const path = require("path");

const contactController = {
  contact: function (req, res) {
    res.sendFile(path.join(__dirname, "../views/main/contact.html"));
  },
};

module.exports = contactController;
