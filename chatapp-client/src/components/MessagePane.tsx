import { IMessage } from "../models/types";
import MessageItem from "./MessageItem";

export interface IMessagePaneProps {
  messages: [IMessage]
  loginId: string
}

function MessagePane({ messages, loginId }: IMessagePaneProps) {
  return (
    <div className="message-pane">
      {
        messages.map((message: IMessage) => {
          return <MessageItem key={message._id}
            message={message} loginId={loginId} />
        })
      }
    </div>
  )
}

export default MessagePane;