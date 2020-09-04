import React from "react";
import avatar from "../../asset/akari.jpg";
import boxStyle from "./messageBox.module.scss";

export type MessageBoxProps = {
  firstPart: boolean;
  message: string;
};

const MessageBox = (props: MessageBoxProps) => {


  const messageType = props.firstPart ? "first" : "second";

  return (
    <div className={ `${boxStyle['message-container']} ${boxStyle[messageType]}`}>
      <img src={avatar} width="35px" height="35px" />
      <div className={`${boxStyle['arrow']} ${boxStyle[messageType]}`}></div>
      <div className={`${boxStyle['message-content']} ${boxStyle[messageType]}`}>
        <span className={`${boxStyle['message']}`} dangerouslySetInnerHTML={{__html:props.message}}></span>
      </div>
    </div>
  );
};

export default MessageBox;
