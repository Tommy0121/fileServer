import React, { useState, useEffect } from "react";
import { Upload, Modal, message } from "antd";
import { RequestUrls, baseHttpUrl } from "../fileUpload/FileUpload";
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
  const signal = axios.CancelToken.source();
  const [previewImage, setPreviewImage] = useState("");

  const fetchImageData = async () => {
    const packageName = props.location.state.packageName;
    const result = await axios.get(RequestUrls.fileList(packageName), {
      cancelToken: signal.token,
    });
    let displayData = result.data.map(
      (item: string, index): DisplayType => {
        return {
          uid: index,
          name: item,
          url: baseHttpUrl + "/" + item,
          status: "done",
        };
      }
    );
    setFileList(displayData);
  };

  useEffect(() => {
    fetchImageData();
    return () => {
      signal.cancel("cancel api call");
    };
  }, []);

  const handleCancel = () => {
    setPreviewVisible(false);
  };
  const handlePreview = (file) => {
    setPreviewImage(file.url);
    setPreviewVisible(true);
  };
  const handleRemoveFile = async (file) => {
    console.log(file)
    const result = await axios.post(
      RequestUrls.deleteFile,
      { filePath: file.name },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(result.data)
    if(result.data.status === 1){
      fetchImageData();
      message.success('删除成功')
    }
  };
  return (
    <div>
      <Upload
        listType="picture-card"
        action={RequestUrls.uploadFile}
        fileList={fileList}
        onPreview={handlePreview}
        className="img-list-card"
        onRemove={handleRemoveFile}
      ></Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ImageList;
