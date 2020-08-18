import express from "express";
import fs from "fs";
import { baseResourceDiskPath, baseUploadDiskPath } from "./constant";
import bodyParser from "body-parser";
import http from 'http';

import ejs from "ejs";
import socketio from 'socket.io';



import router from "./router/index";

const port = 3999;

const app = express();
const server = http.createServer(app);

const socket = socketio(server);

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


socket.on('connection',(socket) => {
  const socketId = socket.id
  console.log('a user connected');
})

server.listen(port, () => {
  console.log(`listen in ${port}`);
});
