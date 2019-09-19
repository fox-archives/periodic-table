const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: "../" });

const app = express();
app.use(bodyParser.json()); // Allow express to parse .json requests sent in

app.use(express.static("public"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"), e => console.log(e));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Working"));
