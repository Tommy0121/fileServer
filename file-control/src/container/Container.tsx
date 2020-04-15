import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import FileUploadPage from './fileUpload/FileUpload';
import ImageList from './imageList/ImageList'

const Container = () => {
  const { Content } = Layout;
  return (
    <Layout style={{ padding: '24px' }}>
      <Content
        style={{
          background: '#fff',
          padding: 24,
          minHeight: 280,
          height: 'calc(100vh - 112px)',
          overflow: 'auto',
        }}
      >
        <Switch>
          <Route path="/" exact component={FileUploadPage} />
          <Route path="/list" component={ImageList}/>
        </Switch>
      </Content>
    </Layout>
  );
};

export default Container;
