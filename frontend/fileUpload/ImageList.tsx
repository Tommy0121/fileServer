import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import { RequestUrls } from '../../constants/apiConstants';
import axios from 'axios';
import { UploadFile } from 'antd/lib/upload/interface';
type ListProps = {
  package: string;
};

type DisplayType = {
    uid:string;
    name:string,
    status:string
}
const ImageList = (props: ListProps) => {
  const [fileList, setFileList] = useState([]);
  const signal = axios.CancelToken.source();

  useEffect(() => {
    // fileList: [
    //     {
    //       uid: '-1',
    //       name: 'image.png',
    //       status: 'done',
    //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    //     {
    //       uid: '-2',
    //       name: 'image.png',
    //       status: 'done',
    //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    //     {
    //       uid: '-3',
    //       name: 'image.png',
    //       status: 'done',
    //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    //     {
    //       uid: '-4',
    //       name: 'image.png',
    //       status: 'done',
    //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    //     {
    //       uid: '-5',
    //       name: 'image.png',
    //       status: 'error',
    //     },
    //   ],
    const fetchImageData = async () => {
      const result = await axios.get(
        `http://localhost:3999/fileList/${props.package}`,
      );
        let displayData:UploadFile[] = [];

        result.data.map((item,index):DisplayType => {
            return {
                uid:index,
                name:item,
                status:'done'
            }
        })
      setFileList(result.data);
    };
    fetchImageData();
    return () => {
      signal.cancel('cancel api call');
    };
  }, []);
  return (
    <div>
      <Upload action={RequestUrls.uploadFile} fileList={fileList}></Upload>
    </div>
  );
};
