import express from "express";
import fs from "fs";
import { baseResourcePath } from "./constant";
import bodyParser from "body-parser";

import ejs from "ejs";
import router from "./router/index";

const port = 3999;

const app = express();

app.engine(".html", ejs.__express);
app.set("views", "static/build");
app.set("view engine", "html");
app.use("/", express.static("build"));
app.use(bodyParser.json());

// set cros origin settings
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");

  if (!fs.existsSync(baseResourcePath)) {

    fs.mkdirSync(baseResourcePath)
  }
  next();
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`listen in ${port}`);
});
