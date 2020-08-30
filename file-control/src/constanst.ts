import io from "socket.io-client";

export const baseResourceUrl = process.env.NODE_ENV  === "development" ? "http://localhost:3999": "http://123.207.87.254:3999";

// export const baseResourceUrl =  "";

// export const baseHttpUrl =  `${baseResourceUrl}/api`;


const fileApiUrl = {
  uploadFile:`/api/file/uploadFile`,
  fileList:(packageName:string) => `/api/file/fileList/${packageName}`,
  fileDirs:`/api/file/imageDirs`,
}

export const RequestUrls = {
  ...fileApiUrl
};


export const socket = io(baseResourceUrl,{autoConnect:false,reconnection:false})