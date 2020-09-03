import React, { useState, useEffect } from "react";
import MessageBox, { MessageBoxProps } from "../../component/messageBox/MessageBox";
import { socket } from "../../constanst";
import { Button,Input } from "antd";
import { withDebounce, withThrottle } from '../../httpRequest/httpClient'
import { chatMessageListMockData } from '../../mock/MockData'
import './chatRoom.scss'

const { TextArea } = Input;
const ChatRoom = () => {

  const [messageList, setMessageList] = useState<MessageBoxProps[]>(chatMessageListMockData);


  useEffect(() => {
    if (!socket.connected) {
      socket.open();
    }
    socket.on('chat message', (msg: string) => {
      console.log(msg)
      setMessageList(pre => {
        return [...pre, { firstPart: false, message: msg }]
      })
    })
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    socket.emit("chat message", "here is mock message");
  }


  return (
    <div
      className="chatroom-container"
    >
      <div className="chat-container">
        {
          messageList.map((item, index) => {
            const result: MessageBoxProps = { ...item, message: item.message + index }
            return (<MessageBox key={index.toString()} {...result} />)
          })
        }
      </div>
      <hr />

      <div className="input-container">
        <div>here should be image link and emoji</div>
        <TextArea placeholder="输入内容" className="no-border"/>
        <Button onClick={withDebounce(handleClick, 500)}>withDebounce</Button>
        <Button onClick={withThrottle(handleClick, 500)}>withThrottle</Button>
      </div>


    </div>
  );
};

export default ChatRoom;
