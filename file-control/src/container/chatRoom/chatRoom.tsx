import React from "react";
import Loading, { LoadingThreeDot } from "../../component/loading/loading";
import MessageBox,{MessageBoxProps} from '../../component/messageBox/MessageBox';



const chatRoom = () => {
  const messageBoxProps: MessageBoxProps = {
    firstPart:true,
    message:'adfadf'
  }
  return (
    <div style={{ backgroundColor: "snow",padding:'24px 12px',minHeight:'calc(100vh - 112px)' }}>
      asdf
      <Loading />
      <LoadingThreeDot />
      <MessageBox  {...messageBoxProps}/>
    </div>
  );
};

export default chatRoom;
