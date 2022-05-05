const path = require("path");
const fs = require("fs");
let contact = require("../../models/contact");

const contactController = {
  contact: function (req, res) {
    res.render("./main/contact");
  },
  send: function (req, res) {
    console.log("Datos de contacto enviados");
    let data = fs.readFileSync(
      path.join(__dirname, "../../data/contacts.json"),
      "utf-8"
    );
    if (data === "") {
      contact.push({ id: contact.length + 1, ...req.body });
    } else {
      contact = JSON.parse(data);
      contact.push({ id: contact.length + 1, ...req.body });
    }
    console.log("valor: " + contact.length);
    fs.writeFileSync(
      path.join(__dirname, "../../data/contacts.json"),
      JSON.stringify(contact),
      "utf8"
    );

    res.redirect("/");
  },
};

module.exports = contactController;
