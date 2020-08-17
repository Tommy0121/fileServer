import React, { useEffect, useState } from "react";
import { FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Modal } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile, RcFile } from "antd/lib/upload/interface";
import axios from "axios";
import {history} from '../../configureStore/ConfigureStore'
import { baseResourceUrl, RequestUrls } from "../constanst";


const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
  
  if (!isJpgOrPng) {
    message.error("仅支持JPG/PNG/GIF 文件!");
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error("文件大小不超过 5MB!");
  }
  return isJpgOrPng && isLt2M;
}






const FileUploadPage = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [folders, setFolders] = useState<string[]>([]);


  const signal = React.useMemo(() =>axios.CancelToken.source(),[] ) ;

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
  }, [signal]);



  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // first parameter should be response url
      setImgUrl(baseResourceUrl + info.file.response.path);
      if(copyUrl(baseResourceUrl + info.file.response.path)){
        message.success("地址已经复制")
      }
        
      setPreviewVisible(true);
    }
  };


  const copyUrl = (value:string):boolean => {
    const input =document.createElement('input');
    input.setAttribute('readonly', 'readonly'); 
    input.setAttribute('value', value);
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand('copy');
    document.body.removeChild(input);

    return result
  }


  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePackageClick = (item:string) =>{
    history.push("/list",{packageName:item})
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return <>
    <div className="file-container">
      {folders.map((item, index) => {
        return (
          <div className="col-img" key={index.toString()} onClick={() => {handlePackageClick(item)}}>
            <FolderOpenOutlined />
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
  </>;
};
export default FileUploadPage;
