import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import { Socket } from 'socket.io-client';
import { useMutation } from '@tanstack/react-query';
interface userData{
  superAdmin: {
    _id: string;
  }

}
interface Props {
  // socket: Socket;
  userData: userData;
}
const Users = ['65eebfe2574ecbb7adb59a2a','65e9a1df39edfcd4e785cade']
const Chat = 'chat_1';

const ChatPages: React.FC<Props> = ({ userData }) => {
  const [message, setMessage] = useState<string>('');
  const [msgReceived, setMsgReceived] = useState<string>('');

const sendMessage = () => {
    let otherUser = Users.find((user) => user !== userData.superAdmin._id);
    // const data = useMutation(on)
    const data = {
      userID : otherUser,
      message: message,
    };
    
    // socket.emit("send_message", data);
    setMessage('');
};

// useEffect(() => {
//   socket.emit('join_room',{roomChat:Chat,userID:userData.superAdmin._id})
//   socket.on("receive_message", (data) => {
//     console.log("Message received:", data);
//     setMsgReceived(data.message);
//   });
//   socket.on("notif", (data) => {
//     console.log("Message received:", data);
//   });
  
//   return () => {
//     socket.off("receive_message");
//   };
// }, [socket]);




  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chat" />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Send Message..."
            className="border-2 border-gray-300 p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => sendMessage()} // Example receiverId
          >
            Send
          </button>*******************
          <br />
          <div>
            <h1>{msgReceived}</h1>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ChatPages;
