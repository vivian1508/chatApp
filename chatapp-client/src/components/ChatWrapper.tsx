import { useState } from 'react';
import ChatList from './ChatList';
import ChatPane from './ChatPane';

export interface IChatWrapperProps {
  loginUserId: string
}

/**
 * ChatWrapper to wrap ChatList and Chat Pane
 */
function ChatWrapper({ loginUserId }: IChatWrapperProps) {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="container">
      <ChatList setSelectedChat={setSelectedChat} />
      {selectedChat && <ChatPane chat={selectedChat} loginId={loginUserId} />}
    </div>
  )
}

export default ChatWrapper;