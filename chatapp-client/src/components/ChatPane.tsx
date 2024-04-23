import {useEffect} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CreateMessageMutation } from "../graphql/mutation/message.mutation";
import { NEW_MESSAGE_SUBSCRIPTION } from "../graphql/subscription/message.subscription";

import { MessagesByChatIdQuery } from "../graphql/query/message.query";
import MessagePane from "./MessagePane";
import MessageEditor from "./MessageEditor";
import { IChat, IMessage } from "../models/chat";

export interface IChatPaneProps {
  chat: IChat
  loginId: string
}

function ChatPane(props: IChatPaneProps) {
  const {chat, loginId} = props;

  const { loading, error, data, subscribeToMore } = useQuery(MessagesByChatIdQuery, {
    variables: {chatId: (chat && chat._id) || ""},
    skip: !chat
  });

  const [sendMessage] = useMutation(CreateMessageMutation, {
    refetchQueries: [
      MessagesByChatIdQuery, // DocumentNode object parsed with gql
      'messagesByChatId' // Query name
    ],
  })

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      variables: { chatId: chat._id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newMessageAdded;
        if(prev && prev.messagesByChatId && 
            prev.messagesByChatId.find((message: IMessage) => message._id === newFeedItem._id)) {
              return prev;
            }
        return {...prev, messagesByChatId: [...prev.messagesByChatId, newFeedItem]};
      }
    });
    return () => unsubscribe();
  },[chat._id])

  if(!chat) {
    return (
      <div>
       Click on one chat to start messaging
      </div>
    )
  } 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const messages = data && data.messagesByChatId;

  return (
    <div className="chat-pane">
      <MessagePane messages={messages} loginId={loginId}/>
      <MessageEditor chatId={chat._id} sendMessage={sendMessage} loginId={loginId}/>
    </div>
  )
}

export default ChatPane;