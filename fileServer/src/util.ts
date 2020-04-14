export const getNewFileName = (paths: string[], fileName: string): string => {
  return paths[paths.length - 1].substr(0, 8) + "." + fileName.split(".").pop();
};
