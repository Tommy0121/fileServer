import axios from 'axios';
import { fileDirsMockData } from "../mock/MockData";
import { CancelTokenSource } from "axios";
import { RequestUrls } from '../constanst';

export const getFolderListMock: (
  signal: CancelTokenSource
) => Promise<string[]> = async (
  signal: CancelTokenSource
) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fileDirsMockData);
    }, 20);
  });

export const getFolderList = async (
  signal: CancelTokenSource
) => {
  const result = await axios.get<string[]>(
    RequestUrls.fileDirs,
    {
      cancelToken: signal.token,
    }
  );

  return result.data;
};
