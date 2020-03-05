import path from "path";
import express from "express";
import graphqlHTTP from "express-graphql";
import morgan from "morgan";
import dotenv from "dotenv";

import { rootSchema } from "./schema";

dotenv.config({ path: "../" });

const app = express();
app.set("json spaces", 2);
app.disable("strict routing");
app.disable("'x-powered-by");

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: rootSchema,
    graphiql: process.env.NODE_ENV === "development"
  })
);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"), err =>
    console.log(err)
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`working on port ${port}`));
