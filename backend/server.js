let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let path = require("path");
require("dotenv").config({ path: "../" });

let app = express();
app.use(bodyParser.json()); // Allow express to parse .json requests sent in

app.use(express.static("public"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"), e => console.log(e));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Working"));
