import React, { useState, useEffect } from "react";
import Loading, { LoadingThreeDot } from "../../component/loading/loading";
import MessageBox, {
  MessageBoxProps,
} from "../../component/messageBox/MessageBox";
import { socket } from "../../constanst";

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
    return () => {
      connection?.disconnect();
    };
  }, [connection]);

  return (
    <div
      style={{
        backgroundColor: "snow",
        padding: "24px 12px",
        minHeight: "calc(100vh - 112px)",
      }}
    >
      asdf
      <Loading />
      <LoadingThreeDot />
      <MessageBox {...messageBoxProps} />
      <MessageBox {...result} />
    </div>
  );
};

export default ChatRoom;
