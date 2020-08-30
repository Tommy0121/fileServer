import express from "express";
import fs from "fs";
import { getNewFileName, isEmptyFolder } from "../../util";
import {
  baseUploadDiskPath,
  baseHttpRequestUploadResourcePath,
} from "../../constant";
import {
  FileListResponseModel,
  uploadFileResponseModel,
} from "file-server-models";
import multer from "multer";
import moment from "moment";

const upload = multer({ dest: "\\resource\\uploads" });

const fileRouter = express.Router();

// upload.single(<form fieldName>)

fileRouter.post("/uploadFile", upload.single("img"), async function (req, res) {
  const prePath = req.file.path;
  const newFileName = getNewFileName(
    prePath.split("\\"),
    req.file.originalname
  );
  const uploadDate = moment().format("YYYY-MM-DD");
  const newFileFolder = `${baseUploadDiskPath}/${uploadDate}`;
  const newFilePath = newFileFolder + "/" + newFileName;

  const result: uploadFileResponseModel = {
    status: -1,
    message: "fail",
    data: "",
  };
  const uri =
    baseHttpRequestUploadResourcePath + uploadDate + "/" + newFileName;

  const newFileStat = await fs.stat.__promisify__(newFileFolder);
  if (!newFileStat.isDirectory()) {
    fs.mkdir(newFileFolder, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }

  const buffer = await fs.readFile.__promisify__(prePath);
  fs.writeFile(newFilePath, buffer, (e) => {
    if (e) {
      console.log(e);
    }
    console.log("file wirte finished");
  });

  res.send({
    ...result,
    status: 1,
    message: "success",
    data: `/${uri}`,
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
  let result: FileListResponseModel = {
    status: -1,
    message: "failure",
    data: [],
  };
  files.forEach((item) => {
    let stat = fs.lstatSync(packagePath + "/" + item);
    if (stat.isFile()) {
      stat.size;
      result.data.push({
        url: `${baseHttpRequestUploadResourcePath + "/" + packageName}/${item}`,
        size: stat.size,
      });
    }
  });
  res.send({ ...result, status: 1, message: "success" });
});

fileRouter.get("/fileHello", (req, res) => {
  res.send(" hello file router ");
});

export default fileRouter;
