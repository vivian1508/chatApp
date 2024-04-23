import MessageItem from "./MessageItem";

export interface IMessagePaneProps {
    messages: any
    loginId: string
}

function MessagePane({messages, loginId}: IMessagePaneProps) {
    return (
        <div className="message-pane">
        {
          messages.map((message) => {
            return <MessageItem key={message._id} 
                    message={message} loginId={loginId}/>
          })
        }
      </div>
    )
}

export default MessagePane;