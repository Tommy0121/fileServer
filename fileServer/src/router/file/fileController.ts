import express from "express";
import fs from "fs";
import { getNewFileName, isEmptyFolder } from "../../util";
import { baseUploadPath } from "../../constant";
import multer from "multer";
import moment from "moment";

const upload = multer({ dest: "\\uploads" });

const fileRouter = express.Router();

// upload.single(<form fieldName>)

fileRouter.post("/uploadFile", upload.single("img"), function (req, res) {
  const prePath = req.file.path;
  const newFileName = getNewFileName(prePath.split("/"), req.file.originalname);
  const newFileFolder = `${baseUploadPath}/${moment().format("YYYY-MM-DD")}`;
  const newFilePath = newFileFolder + "/" + newFileName;

  if (!fs.existsSync(newFileFolder)) {
    console.log("upload folder not exists create folder:");
    console.log(newFileFolder);
    fs.mkdirSync(newFileFolder);
  }

  try {
    const value = fs.readFileSync(prePath);
    fs.writeFile(newFilePath, value, (e) => {
      if (e) {
        console.log(e);
      }
      console.log("file write finished");
      fs.readdirSync("\\uploads").map((file) => {
        fs.unlinkSync(`\\uploads/${file}`);
        console.log("temp file delete finished");
      });
    });
  } catch (e) {
    console.log(e);
  }

  res.send({
    status: 1,
    msg: "success",
    path: `/${newFilePath}`,
  });
});

fileRouter.get("/imageDirs", (req, res) => {
  let fileDir: string[] = [];
  const files = fs.readdirSync(baseUploadPath);
  files.forEach(function (item, index) {
    let stat = fs.lstatSync(`${baseUploadPath}/${item}`);
    if (
      stat.isDirectory() === true &&
      !isEmptyFolder(`${baseUploadPath}/${item}`)
    ) {
      fileDir.push(item);
    }
  });

  res.send(fileDir);
});

fileRouter.get("/fileList/:package", (req, res) => {
  const packageName = req.params.package;
  const packagePath = baseUploadPath + "/" + packageName;
  const files = fs.readdirSync(packagePath);
  const result: string[] = [];
  files.forEach((item) => {
    let stat = fs.lstatSync(packagePath + "/" + item);
    if (stat.isFile()) {
      result.push(`${packagePath}/${item}`);
    }
  });
  res.send(result);
});

fileRouter.get("/fileHello", (req, res) => {
  res.send(" hello file router ");
});

// do not delete any file case i have not any backup
// fileRouter.post("/delete", (req, res) => {
//   const filePath = req.body.filePath;

//   if (fs.existsSync(filePath)) {
//     fs.unlinkSync(filePath);
//   }
//   res.send({
//     status: 1,
//     message: "success",
//   });
// });

export default fileRouter;
