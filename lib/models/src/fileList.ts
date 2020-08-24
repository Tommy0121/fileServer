import { responseType } from "./commonResponse";

export type FileListType = {
  url: string;
  size: number;
};

export type FileListResponseModel = responseType & {
  data: FileListType[];
};
