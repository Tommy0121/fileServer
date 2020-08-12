import express from "express";
import fs from "fs";
import { baseResourceDiskPath, baseUploadDiskPath } from "./constant";
import bodyParser from "body-parser";

import ejs from "ejs";
import router from "./router/index";

const port = 3999;

const app = express();

app.engine(".html", ejs.__express);
app.set("views", "static/build");
// 使用view engine让html文件render
app.set("view engine", "html");
app.use("/", express.static("resource"));
app.use(bodyParser.json());

// 
app.all("*", function (req, res, next) {
  if (!fs.existsSync(baseResourceDiskPath)) {

    fs.mkdirSync(baseResourceDiskPath)
    fs.mkdirSync(baseUploadDiskPath);
  }
  next();
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`listen in ${port}`);
});
