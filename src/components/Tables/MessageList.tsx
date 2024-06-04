interface MessageProps {
    text: string;
    user: {
      id: string;
      name: string;
    };
    className: string;
  }
  
  const MessageList: React.FC<{ messages: MessageProps[] }> = ({ messages }) => (
    <div>
      {messages.map((message, index) => (
        <div key={index} className={message.className}>
            <div className="message">
                <div className="message-text">{message.text}</div>
                <div className="message-user">{message.user.name}</div>
            </div>
        </div>
      ))}
    </div>
  );

export default MessageList;