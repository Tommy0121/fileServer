import fs from "fs";
import { Socket } from "socket.io";

export const getNewFileName = (paths: string[], fileName: string): string => {
  console.log('getNewFileName');
  paths.forEach(element => {
    console.log(element);
  });
  return paths[paths.length - 1].substr(0, 8) + "." + fileName.split(".").pop();
};

export const isEmptyFolder = (path:string):boolean => {
  const files = fs.readdirSync(path);

  return files.length === 0;
}

export let userSocketStorage:{[x:string]:Socket}= {

}
