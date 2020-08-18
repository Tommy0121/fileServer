import axios, { CancelTokenSource } from "axios";
import { fileListMockData } from "../mock/MockData";
import { FileListResponseModel } from "file-server-models";
import { RequestUrls } from "../container/constanst";

export const getFileListMock: (
  packageName: string,
  signal: CancelTokenSource
) => Promise<FileListResponseModel[]> = async (
  packageName: string,
  signal: CancelTokenSource
) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fileListMockData);
    }, 20);
  });

export const getFileList = async (
  packageName: string,
  signal: CancelTokenSource
) => {
  const result = await axios.get<FileListResponseModel[]>(
    RequestUrls.fileList(packageName),
    {
      cancelToken: signal.token,
    }
  );

  return result.data;
};
