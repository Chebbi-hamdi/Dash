import React, { useState, useEffect } from 'react';
import '../../css/MessageList.css';
import {
  useGetAll,
  useGetDiscussion,
} from '../../hooks/costumeHooksDiscussion';
import ModalChat from '../../pages/ModalChat';

interface Message {
  content: string;
  _id: string;
  sender: string;
  timestamp: number;
}

interface Participant {
  _id: string;
  name: string;
}

const TableDiscussion = () => {
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<
    string | null
  >(null);
  const { data, isLoading } = useGetAll('discussion', 'discussion');
  const { data: discussionData, refetch: refetchDiscussion } = useGetDiscussion(
    'discussion',
    selectedDiscussionId || '',
    'discussion',
  );

  useEffect(() => {
    if (selectedDiscussionId) {
      refetchDiscussion();
    }
  }, [selectedDiscussionId, refetchDiscussion]);

  const handleInfoDiscussion = (id: string) => {
    setSelectedDiscussionId(id);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <svg
            className="w-10 h-10 text-primary animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0012 20v-4H6z"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto"></div>
          <div className="flex">
            <div className="w-1/3 border-r">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                <h2 className="text-xl font-bold pb-5">Discussions</h2>
                <ul className="list-discussion">
                  {data?.discussions.map((discussion: any) => (
                    <li key={discussion._id}>
                      <button
                        onClick={() => handleInfoDiscussion(discussion._id)}
                      >
                        {discussion._id}
                      </button>
                    </li>
                  ))}
                </ul>
                </>
              )}
            </div>
            <div className="w-2/3 overflow-y-scroll  h-96 p-4">
              {(discussionData?.messages || []).map((message: Message) => {
                const sender = discussionData?.participants.find(
                  (participant: Participant) =>
                    participant._id === message.sender,
                );
                const isSameUser =
                  sender?._id === discussionData?.participants[0]?._id;
                return (
                  <div
                    key={message._id}
                    className={`message ${
                      isSameUser ? 'self-start' : 'self-end'
                    }`}
                  >
                    <div className="message-user">
                      <img
                        src={sender?.imagePath}
                        alt={sender?.name}
                        className="image-user"
                      />{' '}
                      {sender?.name}
                    </div>
                    <div className="message-content">
                      <div className="message-text">{message.content}</div>
                      <div className="message-timestamp">
                        {new Date(message.timestamp).toLocaleString()}
                      </div>{' '}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableDiscussion;
