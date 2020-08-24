import React, { useState, useEffect } from "react";
import { Upload, Modal } from "antd";
import axios from "axios";
import "./_imageList.scss";
import { RequestUrls, baseResourceUrl } from "../../constanst";
import { UploadFile } from "antd/lib/upload/interface";
import {FileListResponseModel,FileListType} from 'file-server-models';
import httpRequest from '../../httpRequest/index';


const ImageList = (props) => {
  const [fileList, setFileList] = useState<object[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  const [previewImage, setPreviewImage] = useState("");

  const signal = React.useMemo(() => axios.CancelToken.source(), []);

  const fetchImageData = React.useCallback(async () => {
    const packageName = props.location.state.packageName;
    const result = await httpRequest.getFileList(packageName,signal);

    let displayData = result.data.map((item: FileListType, index: number) => ({
      uid: index,
      name: item.url,
      url: baseResourceUrl + "/" + item.url,
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
