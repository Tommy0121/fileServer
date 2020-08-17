import axios from "axios";
import { fileListMockData } from "../mock/MockData";

export const getFileDirsMock = (packageName: string) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fileListMockData);
    }, 20);
  });