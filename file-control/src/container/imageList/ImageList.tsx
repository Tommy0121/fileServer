import React, { useState, useEffect } from "react";
import { Upload, Modal } from "antd";
import { RequestUrls, baseResourceUrl } from "../fileUpload/FileUpload";
import axios from "axios";
import "./_imageList.scss";
type DisplayType = {
  uid: string;
  name: string;
  status: string;
  url: string;
};
const ImageList = (props) => {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  
  const [previewImage, setPreviewImage] = useState("");

  const signal = React.useMemo(() => axios.CancelToken.source(),[]);

  const fetchImageData = React.useCallback(async () => {
    const packageName = props.location.state.packageName;
    const result = await axios.get(RequestUrls.fileList(packageName), {
      cancelToken: signal.token,
    });
    
    let displayData = result.data.map(
      (item: string, index:string): DisplayType => {
        return {
          uid: index,
          name: item,
          url: baseResourceUrl + "/" + item,
          status: "done",
        };
      }
    );
    setFileList(displayData);
  },[]);

  // const fetchImageData = 

  useEffect(() => {
    fetchImageData();
    return () => {
      signal.cancel("cancel api call");
    };
  }, [fetchImageData,signal]);

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
        fileList={fileList}
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
