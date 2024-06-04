import {
  MinChatUiProvider,
  MainContainer,
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader,
} from '@minchat/react-chat-ui';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { getDiscussion, sendMessage } from '../api/discuusion';
// import io from 'socket.io-client';
interface discussionId {
  discussionId: string;
  senderId: string;
  receiverId: string;
}

const MinChat: React.FC<discussionId> = ({ discussionId , senderId , receiverId}) => {
  const location = useLocation();
  


  const [oldMessages, setOldMessages] = useState<string[]>([]);
  // const [newMessages, setNewMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  // const socket = io('http://localhost:3001');

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to the server');
  //     socket.emit('user_connected', { userId: senderId });
  //   });
  //   socket.emit('join_room', { discussionId: discussionId , userId: senderId})

  //   socket.on('receive_message', (data) => {
  //     console.log('Message ++++++++++++++++++++++++++++++++++received:', data);
  //     setOldMessages((oldMessages) => [...oldMessages, data]);
  //   });
  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from the server');
  //   });

  //   return () => {
  //     socket.off('connect');

  //     socket.off('disconnect');
  //     socket.off('receive_message');
  //   };
  // }, [socket]);

  const getDiscussionMutation = useMutation({
    mutationFn: (discussionId: string) => {
      return getDiscussion(discussionId);
    },
    onSuccess: (data) => {
      setOldMessages(data.messages);

    },
    onError: (error) => {
      console.error('Error fetching messages:', error);
    },
  });

  useEffect(() => {
    getDiscussionMutation.mutate(discussionId);

  }, []);
  // useEffect(() => {
  //   console.log(newMessages);
    
  // }, [newMessages]);

  const sendMessageMutation = useMutation({
    mutationFn: (args: {
      discussionId: string;
      message: string;
      senderId: string;
      receiverId: string;
    }) => {
      const { discussionId, message, senderId } = args;
      console.log(
        'discussionId:',
        discussionId,
        'message:',
        message,
        'senderId:',
        senderId,
      );
      return sendMessage(discussionId, message, senderId);
    },
    onSuccess: (data) => {
      // console.log('newMessages:', receiverId);
      setOldMessages((oldMessages) => [...oldMessages, data]);
      console.log('data:', data);
      console.log('oldMessages:', oldMessages);
      
      // socket.emit('send_message', {
      //   discussion: data.discussion,
      //   content: data.content,
      //   sender: data.sender,
      //   //receiverId: data.receiverId,
      // });
    },
    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });

  const handleSendMessage = (message: any) => {
    sendMessageMutation.mutate({ discussionId, message, senderId, receiverId });
    setOldMessages((oldMessages) => [...oldMessages, message]);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="MinChat" />
      <MinChatUiProvider theme="#6ea9d7">
                <MainContainer style={{ height: '100vh' }}>
          <MessageContainer>
            <MessageHeader  />
            {/* <MessageList
              messages={(oldMessages ||  []).map((message) => (
                {
                // text: message.content, 
                // user: {
                //   id: message._id,
                //   name: message.sender,
                },
              }))}
            /> */}
            <MessageInput
              placeholder="Type message here"
              showSendButton={true}
              onSendMessage={(message) => handleSendMessage(message)}
            />
          </MessageContainer>
        </MainContainer>
      </MinChatUiProvider>
    </DefaultLayout>
  );
};

export default MinChat;
