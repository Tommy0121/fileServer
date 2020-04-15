import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Head from '../component/header/Head';
import SideBar from '../component/sidebar/SideBar';
import Container from './Container';
import { history } from '../configureStore/ConfigureStore';

const Root = () => {
  useEffect(() => {
    history.push('/');
  });
  return (
    <Layout>
      <Head />
      <Layout>
        <SideBar />
        <Container />
      </Layout>
    </Layout>
  );
};

export default Root;
