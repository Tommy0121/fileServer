import React, { useEffect, useState } from "react";
import { message, Icon, Upload, Modal } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile, RcFile } from "antd/lib/upload/interface";
import axios from "axios";
import {history} from '../../configureStore/ConfigureStore'

export const baseHttpUrl = process.env.NODE_ENV  === "development" ? "http://localhost:3999": "http://123.207.87.254:3999/";
export const RequestUrls = {
  uploadFile: `${baseHttpUrl}/uploadFile`,
  fileList:(packageName:string) => `${baseHttpUrl}/fileList/${packageName}`,
  fileDirs:`${baseHttpUrl}/imageDirs`,
  deleteFile: `${baseHttpUrl}/delete`
};

const FileUploadPage = () => {
  const [fileUploading, setFileUploading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [folders, setFolders] = useState<string[]>([]);
  const signal = axios.CancelToken.source();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(RequestUrls.fileDirs, {
        cancelToken: signal.token,
      });
      setFolders(result.data);
    };
    fetchData();
    return () => {
      signal.cancel("cancel api call");
    };
  }, [previewVisible]);

  function beforeUpload(file: RcFile) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setFileUploading(true);
      return;
    }
    if (info.file.status === "done") {
      // first parameter should be response url
      setFileUploading(false);
      setImgUrl(baseHttpUrl + info.file.response.path);
      setPreviewVisible(true);
    }
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePackageClick = (item:string) =>{
    history.push("/list",{packageName:item})
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <>
      <div className="file-container">
        {folders.map((item, index) => {
          return (
            <div className="col-img" key={index.toString()} onClick={() => {handlePackageClick(item)}}>
              <Icon type="folder-open" theme="filled" className="file-icon" />
              <span>{item}</span>
            </div>
          );
        })}
      </div>
      <div className="file-upload-container">
        <div>
          <Upload
            name="img"
            action={RequestUrls.uploadFile}
            listType="picture-card"
            onChange={handleChange}
            beforeUpload={beforeUpload}
            showUploadList={false}
          >
            {uploadButton}
          </Upload>
        </div>

        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: "100%" }} src={imgUrl} />
        </Modal>
      </div>
    </>
  );
};
export default FileUploadPage;
