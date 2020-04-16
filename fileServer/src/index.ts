import express from "express";
import multer from "multer";
import fs from "fs";
import { getNewFileName, isEmptyFolder } from "./util";
import bodyParser from "body-parser";
import moment from "moment";
import ejs from 'ejs';

const port = 3999;

const app = express();
const upload = multer({ dest: "\\uploads" });

const baseUploadPath = "static/uploads/images";

app.engine('.html', ejs.__express);
app.set('views', "static/build");
app.set('view engine', 'html');
app.use("/static", express.static("static"));
app.use(bodyParser.json());


app.all("*", function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


// upload.single(<form fieldName>)
app.post("/uploadFile", upload.single("img"), function (req, res) {
  const prePath = req.file.path;

  const newName = getNewFileName(prePath.split("\\"), req.file.originalname);
  const currentDay = moment();
  const newPath = `static\\uploads\\images\\${currentDay.format("YYYY-MM-DD")}`;
  const result = newPath + "\\" + newName;
  if (!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath);
  }

  try {
    const value = fs.readFileSync(prePath);
    fs.writeFileSync(result, value);
  } catch (e) {
    console.log(e);
  }

  res.send({
    status: 1,
    msg: "success",
    path: `/${baseUploadPath}/${currentDay.format("YYYY-MM-DD")}/${newName}`,
  });
});

app.get("/hello", (req, res) => {
  res.send("hello ");
});

app.get("/imageDirs", (req, res) => {
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

app.get("/fileList/:package", (req, res) => {
  const packageName = req.params.package;
  const packagePath = baseUploadPath + "/" + packageName;
  const files = fs.readdirSync(packagePath);
  const result: string[] = [];
  files.forEach(function (item) {
    let stat = fs.lstatSync(packagePath + "/" + item);
    if (stat.isFile()) {
      result.push(`${packagePath}/${item}`);
    }
  });
  res.send(result);
});

app.post("/delete", (req, res) => {
  const filePath = req.body.filePath;

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  res.send({
    status:1,
    message:'success'
  })
});

app.get('/home',(req,res)=>{
  res.type("html")
  res.render("index.html")
})


app.listen(port, () => {
  console.log(`listen in ${port}`);
});
