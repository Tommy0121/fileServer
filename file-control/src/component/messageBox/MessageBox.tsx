import React from "react";
import avatar from "../../asset/akari.jpg";
import "./messageBox.scss";

export type MessageBoxProps = {
  firstPart: boolean;
  message: string;
};

const MessageBox = (props: MessageBoxProps) => {
  const messageType = props.firstPart ? "first" : "second";

  return (
    <div className={`message-container ${messageType}`}>
      <img src={avatar} width="35px" height="35px" />
      <div className={`arrow ${messageType}`}></div>
      <div className={`message-content ${messageType}`}>
        <span className="message">{props.message}</span>
      </div>
    </div>
  );
};

export default MessageBox;
