import { dest, src } from "gulp";
import jsonminify from "gulp-jsonminify";
import del from "del";

async function transferWolfram() {
  const from = "wolfram/dist/*.json",
  const to = "backend/public/data/*";
  
  del.sync([to + "/**", "!" + to]);
  src(from)
    .pipe(jsonminify())
    .pipe(dest(to));
}

async function transferFrontend() {
  const from = "frontend/dist/{*.js,*.css,*.html,assets/*}";
  const to = "backend/public";

  del.sync(["backend/public/**", "!backend/public/", "!backend/public/data"]);
  src(from)
    .pipe(dest(to));
}

export { transferWolfram, transferFrontend }
