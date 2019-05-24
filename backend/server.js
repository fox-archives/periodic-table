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

// Serve files built for prod
app.use(express.static(path.join(__dirname, "prod")));

// app.use(express.static('public')); // This replaces the bottom two lines
app.use("/old", express.static(path.join(__dirname, "public/old")));
app.use(
  "/element-data",
  express.static(path.join(__dirname, "public/element-data"))
);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// // Respond with 'Working' on get request to the home page
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/index.html"), err => {});
// });

// app.get("/bundle.js", (req, res) => {
//   res.sendFile(path.join(__dirname, "/bundle.js"), err => {});
// });

// app.get("/bundle.css", (req, res) => {
//   res.sendFile(path.join(__dirname, "/bundle.css"), err => {});
// });

// Catch-all request (if user goes to a URL that only the client can resolve (AKA vue-router),
// send the user the .html file, rather than trying to resolve the URL server-side
// If this is disabled, would get something like 'Cannot GET /orbitals, if client navigates to /orbitals tab'
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"), err => {});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Working"));
