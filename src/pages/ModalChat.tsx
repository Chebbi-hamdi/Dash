import React from 'react';
import Modal from 'react-modal';

interface Message {
  _id: string;
  sender: string;
  content: string;
}

interface Participant {
  _id: string;
  name: string;
}

interface DiscussionData {
  messages: Message[];
  participants: Participant[];
}

interface ModalChatProps {
  isOpen: boolean;
  onRequestClose: () => void;
  discussionData: DiscussionData | null;
}

const ModalChat: React.FC<ModalChatProps> = ({
  isOpen,
  onRequestClose,
  discussionData,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Chat Modal"
      style={{
        overlay: {
          width: '40%',
          height: '60%',
          left: '35%',
          top: '20%',
          borderRadius: '10px',
          backgroundColor: 'rgba(225, 225, 225, 0.75)',
        },
      }}
    >
      <button
        onClick={onRequestClose}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: '#f44336' /* Red background */,
          color: 'white' /* White text color */,
          fontSize: '24px' /* Increase font size */,
          border: 'none' /* Remove border */,
          cursor: 'pointer' /* Add a pointer cursor on hover */,
          borderRadius: '50%' /* Circular button */,
          width: '30px' /* Width of the button */,
          height: '30px' /* Height of the button */,
          textAlign: 'center' /* Center the content */,
          lineHeight: '30px' /* Align the content vertically */,
          padding: 0 /* Remove padding */,
        }}
      >
        X
      </button>
      {discussionData && (
        <div className="message-list">
          {(discussionData?.messages || []).map((message: Message) => {
            const sender = discussionData?.participants.find(
              (participant: Participant) => participant._id === message.sender,
            );
            const isSameUser =
              sender?._id === discussionData?.participants[0]?._id;
            return (
              <div
                key={message._id}
                className={`message ${isSameUser ? 'self-start' : 'self-end'}`}
              >
                <div className="message-user">{sender?.name}</div>
                <div className="message-text">{message.content}</div>
              </div>
            );
          })}
        </div>
      )}
    </Modal>
  );
};

export default ModalChat;
