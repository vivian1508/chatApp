import { IChat } from "../models/types";

export interface IChatListItemProps {
  chat: IChat
  handleSelectChat: (chat: IChat) => void
  unreadNum: number
  selectedChatId: string
}

/**
 * ChatListItem, which contains contact avatar, unread number, contact name and last message
 */
function ChatListItem(props: IChatListItemProps) {
  const { chat, handleSelectChat, unreadNum, selectedChatId } = props;

  return (
    <div className="chat-list-item"
      onClick={() => handleSelectChat(chat)}>
      <div className="avatar-container">
        <img className="avatar-img" src={chat.avatarUrl} />
        {unreadNum > 0 && chat._id !== selectedChatId && <div className="unread-badge">{unreadNum}</div>}
      </div>
      <div className="item-content">
        <div className="chat-list-contact">
          {chat.name}
        </div>
        <div className="chat-list-message">
          {chat.lastMessage && chat.lastMessage && chat.lastMessage.text}
        </div>
      </div>
    </div>
  )
}

export default ChatListItem;