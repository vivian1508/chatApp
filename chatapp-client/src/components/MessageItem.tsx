import { IMessage } from "../models/types";
import { formatTimestamp } from "../utils/timeFormatter";

export interface IMessageItemProps {
    message: IMessage
    loginId: string
}

function MessageItem({ message, loginId }: IMessageItemProps) {
    const isMine = message.creatorId && message.creatorId.toString() === loginId;
    return (
        <div className={`message-item ${isMine ? 'mine' : 'other'}`}>
            <img className="avatar" src={message.creator && message.creator.avatarUrl} alt="Avatar" />
            <div className="message-details">
                <div className="header">
                    <div className="name">{message.creator && message.creator.name}</div>
                    <div className="timestamp">{formatTimestamp(parseInt(message.lastUpdateTime))}</div>
                </div>
                <div className="content">{message.text}</div>
            </div>
        </div>
    )
}

export default MessageItem;