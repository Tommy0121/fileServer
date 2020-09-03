import React, { useState, useEffect } from "react";
import MessageBox, { MessageBoxProps } from "../../component/messageBox/MessageBox";
import { socket } from "../../constanst";
import { Button } from "antd";
import {withDebounce, withThrottle} from '../../httpRequest/httpClient'
import {chatMessageListMockData} from '../../mock/MockData'

const ChatRoom = () => {

  const [messageList, setMessageList] = useState<MessageBoxProps[]>([]);
  

  useEffect(() => {
    if (!socket.connected) {
      socket.open();
    }
    socket.on('chat message',(msg)=>{
      console.log(msg)
      setMessageList(pre=>{
        return [...pre,{firstPart:false,message:msg}]
      })
    })
    // setMessageList(chatMessageListMockData);
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = ()=>{
    console.log('handle click')
    socket.emit("chat message","here is mock message");
  }

  return (
    <div
      className="chatroom-container"
    >
      {
        messageList.map((item,index) => {
          const result:MessageBoxProps = {...item,message:item.message+index}
          return (<MessageBox key={index.toString()} {...result}/>)
        })
      }
      <Button onClick={withDebounce(handleClick,500)}>withDebounce</Button>
      <Button onClick={withThrottle(handleClick,500)}>withThrottle</Button>
    </div>
  );
};

export default ChatRoom;
