import React, { useState, useEffect } from "react";
import { Upload, Modal } from "antd";
import axios from "axios";
import "./_imageList.scss";
import { RequestUrls, baseResourceUrl } from "../constanst";
import { UploadFile } from "antd/lib/upload/interface";

// this should be in lib/models
export type FileListResponseModel = {
  url: string;
  size: number;
};


const ImageList = (props) => {
  const [fileList, setFileList] = useState<object[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  const [previewImage, setPreviewImage] = useState("");

  const signal = React.useMemo(() => axios.CancelToken.source(), []);

  const fetchImageData = React.useCallback(async () => {
    const packageName = props.location.state.packageName;
    const result = await axios.get<FileListResponseModel[]>(
      RequestUrls.fileList(packageName),
      {
        cancelToken: signal.token,
      }
    );

    let displayData = result.data.map((item: FileListResponseModel, index: number) => ({
      uid: index,
      name: item.url,
      url: baseResourceUrl + "/" + item,
      status: "done",
      size:item.size
    }));
    setFileList(displayData);
  }, []);

  useEffect(() => {
    fetchImageData();
    return () => {
      signal.cancel("cancel api call");
    };
  }, [fetchImageData, signal]);

  const handleCancel = () => {
    setPreviewVisible(false);
  };
  const handlePreview = (file) => {
    setPreviewImage(file.url);
    setPreviewVisible(true);
  };
  return (
    <div>
      <Upload
        listType="picture-card"
        action={RequestUrls.uploadFile}
        fileList={fileList as UploadFile[]}
        onPreview={handlePreview}
        className="img-list-card"
      ></Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ImageList;
