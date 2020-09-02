import React, { useState, useEffect } from "react";
import Loading, { LoadingThreeDot } from "../../component/loading/loading";
import MessageBox, {
  MessageBoxProps,
} from "../../component/messageBox/MessageBox";
import { socket } from "../../constanst";
import { Button } from "antd";
import {withDebounce, withThrottle} from '../../httpRequest/httpClient'

const ChatRoom = () => {
  const [connection, setConnection] = useState<SocketIOClient.Socket>();
  let messageBoxProps: MessageBoxProps = {
    firstPart: true,
    message: "adfadf",
  };
  const result = {
    ...messageBoxProps,
    firstPart: false,
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.open();
    }
    setConnection(socket);
    socket.on('',()=>{
      
    })
    return () => {
      connection?.disconnect();
    };
  }, [connection]);

  const handleClick = ()=>{
    console.log('click');
  }

  return (
    <div
      className="chatroom-container"
    >
      <Loading />
      <LoadingThreeDot />
      <MessageBox {...messageBoxProps} />
      <MessageBox {...result} />
      <Button onClick={withDebounce(handleClick,500)}>withDebounce</Button>
      <Button onClick={withThrottle(handleClick,500)}>withThrottle</Button>
    </div>
  );
};

export default ChatRoom;
