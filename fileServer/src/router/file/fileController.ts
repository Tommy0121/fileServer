import express from "express";
import fs from "fs";
import os from 'os';
import { getNewFileName, isEmptyFolder } from "../../util";
import {
  baseUploadDiskPath,
  baseHttpRequestUploadResourcePath,
} from "../../constant";
import { FileListResponseModel } from "file-server-models";
import multer from "multer";
import moment from "moment";

const upload = multer({ dest: "\\resource\\uploads" });

const fileRouter = express.Router();

// upload.single(<form fieldName>)

fileRouter.post("/uploadFile", upload.single("img"), function (req, res) {
  const prePath = req.file.path;
  const newFileName = getNewFileName(prePath.split("\\"), req.file.originalname);
  const uploadDate = moment().format("YYYY-MM-DD");
  const newFileFolder = `${baseUploadDiskPath}/${uploadDate}`;
  const newFilePath = newFileFolder + "/" + newFileName;

  const result =
    baseHttpRequestUploadResourcePath + uploadDate + "/" + newFileName;

    fs.exists(newFileFolder,(exits)=>{
      if(!exits){
        console.log("upload folder not exists create folder:"+newFileFolder);
        fs.mkdir(newFileFolder,err=>{
          if (err) {
            console.log(err.message)
          }
        })
      }
    })

    fs.readFile(prePath,(err,buffer)=>{
      if (err) {
        console.log(err)
      }
      fs.writeFile(newFilePath,buffer,e=>{
        if (e) {
          console.log(e);
        }
        console.log("file wirte finished");
      })
    })
   

  res.send({
    status: 1,
    msg: "success",
    path: `/${result}`,
  });
});

fileRouter.get("/imageDirs", (req, res) => {
  let fileDir: string[] = [];
  const files = fs.readdirSync(baseUploadDiskPath);
  files.forEach(function (item, index) {
    let stat = fs.lstatSync(`${baseUploadDiskPath}/${item}`);
    if (
      stat.isDirectory() === true &&
      !isEmptyFolder(`${baseUploadDiskPath}/${item}`)
    ) {
      fileDir.push(item);
    }
  });

  res.send(fileDir);
});

fileRouter.get("/fileList/:package", (req, res) => {
  const packageName = req.params.package;
  const packagePath = baseUploadDiskPath + "/" + packageName;
  const files = fs.readdirSync(packagePath);
  const result: FileListResponseModel[] = [];
  files.forEach((item) => {
    let stat = fs.lstatSync(packagePath + "/" + item);
    if (stat.isFile()) {
      stat.size;
      result.push({
        data:{
          url: `${baseHttpRequestUploadResourcePath + "/" + packageName}/${item}`,
          size: stat.size,
        }
       
      });
    }
  });
  res.send(result);
});

fileRouter.get("/fileHello", (req, res) => {
  res.send(" hello file router ");
});

export default fileRouter;
