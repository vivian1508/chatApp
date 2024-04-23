import { useCallback, useState } from 'react';
import ChatList from './ChatList';
import ChatPane from './ChatPane';
import { WELCOME_MESSAGE } from '../utils/constants';
import { IChat } from '../models/types';

export interface IChatWrapperProps {
  loginUserId: string
}

/**
 * ChatWrapper to wrap ChatList and Chat Pane
 */
function ChatWrapper({ loginUserId }: IChatWrapperProps) {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = useCallback((chat) => {
    setSelectedChat(chat)
  },[])

  return (
    <div className="container">
      <ChatList handleSelectChat={handleSelectChat} />
      {selectedChat && <ChatPane chat={selectedChat} loginId={loginUserId} />}
      {!selectedChat && <div>{WELCOME_MESSAGE}</div>}
    </div>
  )
}

export default ChatWrapper;