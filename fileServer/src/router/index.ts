import express from "express";
import fileRouter from './file/fileController'


const router = express.Router();



router.use("/file",fileRouter);
export default router;