const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/router");

app.use(express.static(path.join(__dirname, "../public")));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`));

app.use("/", router);
