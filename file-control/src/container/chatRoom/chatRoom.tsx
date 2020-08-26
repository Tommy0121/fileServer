import React from "react";
import Loading, { LoadingThreeDot } from "../../component/loading/loading";
import MessageBox,{MessageBoxProps} from '../../component/messageBox/MessageBox';



const chatRoom = () => {
  let messageBoxProps: MessageBoxProps = {
    firstPart:true,
    message:'adfadf'
  }
  const result = {
    ...messageBoxProps,
    firstPart:false
  }
  return (
    <div style={{ backgroundColor: "snow",padding:'24px 12px',minHeight:'calc(100vh - 112px)' }}>
      asdf
      <Loading />
      <LoadingThreeDot />
      <MessageBox  {...messageBoxProps}/>
      <MessageBox  {...result}/>
    </div>
  );
};

export default chatRoom;
