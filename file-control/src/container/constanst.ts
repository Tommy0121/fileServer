
export const baseResourceUrl = process.env.NODE_ENV  === "development" ? "http://localhost:3999": "http://123.207.87.254:3999";

export const baseHttpUrl =  `${baseResourceUrl}/api`;


const fileApiUrl = {
  uploadFile:`${baseHttpUrl}/file/uploadFile`,
  fileList:(packageName:string) => `${baseHttpUrl}/file/fileList/${packageName}`,
  fileDirs:`${baseHttpUrl}/file/imageDirs`,
}

export const RequestUrls = {
  ...fileApiUrl
};
