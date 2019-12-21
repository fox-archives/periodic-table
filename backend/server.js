import path from "path";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config({ path: "../" });

const app = express();
app.set('json spaces', 2)
app.disable("strict routing")
app.disable("'x-powered-by");

app.use(morgan('tiny'));
app.use(express.static("public"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"), err => console.log(err));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`working on port ${port}`));
