import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MESSAGE_MUTATION } from "../graphql/mutation.graphql";
import { NEW_MESSAGE_SUBSCRIPTION } from "../graphql/subscription.graphql";

import { MESSAGES_BY_CHAT_ID_QUERY } from "../graphql/query.graphql";
import MessagePane from "./MessagePane";
import MessageEditor from "./MessageEditor";
import { IChat, IMessage } from "../models/types";
import { WELCOME_MESSAGE } from "../utils/constants";

export interface IChatPaneProps {
  chat: IChat
  loginId: string
}

/**
 * ChatPane which displays messages and message editor
 */
function ChatPane(props: IChatPaneProps) {
  const { chat, loginId } = props;

  const { loading, error, data, subscribeToMore } = useQuery(MESSAGES_BY_CHAT_ID_QUERY, {
    variables: { chatId: (chat && chat._id) || "" },
    skip: !chat
  });

  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
    refetchQueries: [
      MESSAGES_BY_CHAT_ID_QUERY, 
      'messagesByChatId' 
    ],
  })

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      variables: { chatId: chat._id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newMessageAdded;
        if (prev && prev.messagesByChatId &&
          prev.messagesByChatId.find((message: IMessage) => message._id === newFeedItem._id)) {
          return prev;
        }
        return { ...prev, messagesByChatId: [...prev.messagesByChatId, newFeedItem] };
      }
    });
    return () => unsubscribe();
  }, [chat._id])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const messages = data && data.messagesByChatId;

  return (
    <div className="chat-pane">
      <MessagePane messages={messages} loginId={loginId} />
      <MessageEditor chatId={chat._id} sendMessage={sendMessage} loginId={loginId} />
    </div>
  )
}

export default ChatPane;