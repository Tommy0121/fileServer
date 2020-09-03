import React from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import FileUploadPage from "./fileUpload/FileUpload";
import ImageList from "./imageList/ImageList";
import ChatRoom from './chatRoom/ChatRoom';

const Container = () => {
  const { Content } = Layout;
  return (
    <Layout style={{ padding: "24px" }}>
      <Content className="main-container">
        <Switch>
          <Route path="/" exact component={FileUploadPage} />
          <Route path="/list" component={ImageList} />
          <Route path="/chatroom" component={ChatRoom}/>
        </Switch>
      </Content>
    </Layout>
  );
};

export default Container;
