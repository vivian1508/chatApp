import { useState } from 'react';
import ChatList from './ChatList';
import ChatPane from './ChatPane';
 
 
 function ChatWrapper({loginUserId})  {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="container">
        <ChatList setSelectedChat={setSelectedChat} />
        {selectedChat && <ChatPane chat={selectedChat} loginId={loginUserId}/>}
        {!selectedChat && (<div> Click on one chat to start messaging</div>)}
    </div>
      
      // <SplitPane
      //   split="vertical"
      //   minSize={150}
      //   maxSize={500}
      //   defaultSize={330}
      // >
      //   <ChatList 
      //     setSelectedChat={setSelectedChat} />
      //   {selectedChat && <ChatPane chat={selectedChat} loginId={loginUserId}/>}
      //   {!selectedChat && (<div> Click on one chat to start messaging</div>)}
      // </SplitPane>
    

)
 }

 export default ChatWrapper;