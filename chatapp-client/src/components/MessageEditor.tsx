import { useState } from "react";

export interface IMessageEditorProps {
    sendMessage: any
    chatId: string
    loginId: string
}

function MessageEditor({sendMessage, chatId, loginId}: IMessageEditorProps) {
    const [msgText, setMsgText] = useState('');

    const handleChange = (event) => {
      setMsgText(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (msgText.trim() !== '') {
        const timeStamp = Date.now().toString();
        await sendMessage({ variables: { text: msgText, chatId,
          creatorId: loginId, createTime: timeStamp, lastUpdateTime: timeStamp} });
        setMsgText('');
      }
    };

    return (
        <form onSubmit={handleSubmit} className="message-editor">
            <input
            className="editor-input"
            type="text"
            placeholder="Type your message..."
            value={msgText}
            onChange={handleChange}
            />
            <button className="send-button" type="submit">Send</button>
        </form>
    )
}

export default MessageEditor;