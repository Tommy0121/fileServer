import { FileListResponseModel } from "file-server-models";
import { MessageBoxProps } from "../component/messageBox/MessageBox";

export const fileDirsMockData = [
  "2020-10-10",
  "2020-10-10",
  "2020-10-10",
  "2020-10-10",
  "2020-10-10",
];

export const fileListMockData: FileListResponseModel = {
  message: "success",
  status: 1,
  data: [
    {
      url: "uploads/2020-08-04/d0bfd835.png",
      size: 100,
    },
  ],
};

export const chatMessageListMockData: MessageBoxProps[] = [
  {
    firstPart: true,
    message: "message",
  },
  {
    firstPart: true,
    message: "message",
  },
  {
    firstPart: true,
    message: "message",
  },
  {
    firstPart: true,
    message: "message",
  },
  {
    firstPart: false,
    message: "message",
  },
];
