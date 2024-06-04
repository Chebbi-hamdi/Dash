//i want to make select user component
import React, { useState } from 'react';

import Modal from 'react-modal';
import { useGetDiscussion, useGetParticipants } from '../../../hooks/costumeHooksDiscussion';
type SelectUserProps = {
  discussionId: string | null;
};

const SelectUser: React.FC<SelectUserProps> = ({ discussionId }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: participantsData } = discussionId
    ? useGetParticipants('discussion', discussionId, 'discussion')
    : { data: null };

  const { data: discussionData } = useGetDiscussion(
    'discussion',
    selectedDiscussionId,
    'discussion',
  );
  console.log('discussionData', discussionData?.messages);

  //   const { data: userData } = userId
  //     ? useGetById('users', userId, 'users')
  //     : { data: null };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="mb-4.5">
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          key={selectedOption}
          value={JSON.stringify({
            participantId: selectedOption,
            discussionId: selectedDiscussionId,
          })}
          onChange={(e) => {
            const { participantId, discussionId } = JSON.parse(e.target.value);
            setSelectedOption(participantId);
            setSelectedDiscussionId(discussionId);
            changeTextColor();
            setIsModalOpen(true); // Open the modal when an option is selected
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            List of participants
          </option>
          {participantsData &&
            participantsData.map(
              (
                data: {
                  participants: { _id: string; name: string }[];
                  _id: string;
                },
                dataIndex: number,
              ) =>
                data.participants.map(
                  (
                    participant: { _id: string; name: string },
                    participantIndex: number,
                  ) => (
                    <option
                      key={`${dataIndex}-${participantIndex}`}
                      value={JSON.stringify({
                        participantId: participant._id,
                        discussionId: data._id,
                      })}
                    >
                      {participant.name}
                    </option>
                  ),
                ),
            )}
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 225, 0.5)',
          },
        }}
      >
        {/*display only discussion messages*/}
        {discussionData?.messages.map((message: any) => (
        
          <div key={message._id}>
            <span style={{
                color: 'red',
                

            }}>{message.content}{console.log('ddddddddd', message.content)}</span>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default SelectUser;
