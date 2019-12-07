import path from "path";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config({ path: "../" });

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"), e => console.log(e));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`working on port ${port}`));
