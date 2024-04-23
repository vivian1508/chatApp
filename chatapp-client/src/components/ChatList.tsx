import { useCallback, useEffect, useState } from "react";
import { CHAT_QUERY } from "../graphql/query.graphql";
import { useQuery } from '@apollo/client'
import { NEW_MESSAGE_SUBSCRIPTION } from "../graphql/subscription.graphql";
import ChatListItem from "./ChatListItem";
import { IChat } from "../models/types";
import { CHAT_LIST_LOADING } from "../utils/constants";

/**
 * ChatList to display all chats
 */
export interface IChatListProps {
  handleSelectChat: (chat: IChat) => void
}

function ChatList(props: IChatListProps) {
  const { handleSelectChat } = props;
  const [unreadCounts, setUnreadCounts] = useState({});
  const [selectedChatId, setSelectedChatId] = useState("");

  // Todo: query chats by login user id
  const { loading, error, data, subscribeToMore } = useQuery(CHAT_QUERY)

  const onClickChat = useCallback((chat: IChat) => {
    handleSelectChat(chat);
    setUnreadCounts({ ...unreadCounts, [chat._id]: 0 });
    setSelectedChatId(chat._id);
  }, [])

  useEffect(() => {
    if (data) {
      const initialUnreadCounts = {};
      data.chats.forEach((chat: IChat) => {
        initialUnreadCounts[chat._id] = 0;
        subscribeToNewMessages(chat._id);
      });
      setUnreadCounts(initialUnreadCounts);
    }
  }, [data, subscribeToMore]);

  const subscribeToNewMessages = (chatId: string) => {
    subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      variables: { chatId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newMessageAdded;
        // Update the unread count for the chat
        setUnreadCounts(prevUnreadCounts => {
          return ({
            ...prevUnreadCounts,
            [chatId]: prevUnreadCounts[chatId] + 1,
          })
        });
        // update chat's lastMessage to display in ChatList
        const newChats = prev.chats.map((chat: IChat) => {
          if (chat._id !== newFeedItem.chatId) {
            return chat;
          }
          return {
            ...chat, lastMessage: {
              __typename: newFeedItem.__typename,
              _id: newFeedItem._id,
              _text: newFeedItem.text,
              lastUpdateTime: newFeedItem.lastUpdateTime,
              creator: newFeedItem.creator
            }
          }
        })
        return { ...prev, chats: newChats };
      },
    });
  };

  if (loading) return <p>{CHAT_LIST_LOADING}</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="chat-list">
      {/*  TODO: Add Search bar*/}
      <div className="chat-list-header">
        search bar
      </div>
      <div className="chat-list-wrapper">
        {
          data.chats.map((chat: IChat) => {
            return (
              <ChatListItem
                key={chat._id}
                chat={chat}
                onClickChat={onClickChat}
                unreadNum={unreadCounts[chat._id]}
                selectedChatId={selectedChatId} />
            )
          })
        }
      </div>
    </div>
  )
}

export default ChatList;