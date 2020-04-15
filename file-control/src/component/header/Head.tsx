import React from 'react'
import { Layout } from 'antd'
import logo from "../../logo.svg";

const Head = () => {
  const { Header } = Layout;

  return (
    <Header className="header">
      <div className="logo">
        <a>
          <img alt="" src={logo} width="50" height="50" />
        </a>
      </div>
    </Header>
  )
}

export default Head;