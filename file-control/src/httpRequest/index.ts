import { getFileListMock, getFileList } from "./getFileList"
import {getFolderListMock,getFolderList} from "./getFolderList";

const mockSource = {
  getFileList: getFileListMock,
  getFolderList:getFolderListMock
  
};

const httpSource = {
  getFileList,
  getFolderList
};

console.log(process.env)
const httpRequest =
  process.env.REACT_APP_RUN_TYPE === "mock" ? mockSource : httpSource;

export default httpRequest;
