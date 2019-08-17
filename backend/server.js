let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let fs = require("fs");
let path = require("path");

let app = express();
app.use(bodyParser.json()); // Allow express to parse .json requests sent in
app.use(logger("common")); // Use Morgan log generator
app.use(
  logger("common", {
    stream: fs.createWriteStream("./morgan.log", {
      flags: "a"
    })
  })
);

app.use(express.static("public"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"), e => console.log(e));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Working"));
