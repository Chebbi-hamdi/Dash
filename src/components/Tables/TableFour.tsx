import { useEffect, useState } from 'react';
import {
  useGetAll,
  useDelete,
  useGetById,
  useUpdate,
  useGetUserbyToken,
  useGetAllAdmins,
} from '../../hooks/customHooks';
import CustomModal from '../../pages/ModalUi';
import { useMutation } from '@tanstack/react-query';
import {
  createDiscussion,
  getDiscussion,
  getExistingDiscussion,
  sendMessage,
} from '../../api/discuusion';
import {
  MinChatUiProvider,
  MainContainer,
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader,
} from '@minchat/react-chat-ui';
import Modal from 'react-modal';
// import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const TableFour = () => {
  const { data: dataAdmin, isLoading: adminIsLoading } = useGetUserbyToken(
    'admin',
    'admin',
  );

  const [infoData, setInfoData] = useState({
    username: '',
    email: '',
    role: '',
    inscriptionDate: '',
    mobilePhone: '',
  });

  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenChatModal, setIsOpenChatModal] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState('');
  const [oldMessages, setOldMessages] = useState<any[]>([]);
  const navigate = useNavigate();

  const { data: adminData } = useGetById('admin', selectedAdminId, 'admins');
  const { data, isLoading } = useGetAllAdmins('admin', 'admins');
  const updateMutaion = useUpdate('admin', 'admins');
  const deleteAdmin = useDelete('admin', 'admins');
  const newData = adminData?.superAdmin || adminData?.admin;
  const [discussionId, setDiscussionId] = useState<string | null>(null);
  // const socket = io('http://localhost:3001');

  const handleDelete = (id: string) => {
    deleteAdmin.mutate(id);
  };

  const handleUpdate = async (updatedData: { [id: string]: string }) => {
    try {
      await updateMutaion.mutateAsync({
        id: selectedAdminId,
        data: updatedData,
      });
      setIsOpenUpdateModal(false);
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };

  const handleUpdateModal = (id: string) => {
    setIsOpenUpdateModal(true);
    setSelectedAdminId(id);
    console.log(updateMutaion.data);
  };
  useEffect(() => {
    setInfoData(newData);
  }, [newData]);

  const handleInfo = (id: string) => {
    setIsOpenInfoModal(true);
    setSelectedAdminId(id);
  };

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('----------------Connected to server-----------------');
  //     if (dataAdmin && !adminIsLoading) {
  //       console.log('user_connected:', dataAdmin.superAdmin._id);
  //       socket.emit('user_connected', dataAdmin.superAdmin._id);
  //     }
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [dataAdmin, adminIsLoading]);
  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to the server');
  //     socket.emit('user_connected', dataAdmin.superAdmin._id);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from the server');
  //   });
  //   socket.on('receive_message', (data) => {
  //     console.log('Message ++++++++++++++++++++++++++++++++++received:', data);
  //     setOldMessages((oldMessages) => [...oldMessages, data]);
  //   });

  //   return () => {
  //     socket.off('connect');
  //     socket.off('disconnect');
  //     socket.off('receive_message');
  //   };
  // }, [socket]);

  useEffect(() => {
    createDiscussionMutation.mutate(selectedAdminId);
  }, []);

  const createDiscussionMutation = useMutation({
    mutationFn: (selectedUserId: any) => {
      if (!adminIsLoading && dataAdmin && dataAdmin.superAdmin) {
        return createDiscussion(dataAdmin.superAdmin._id, selectedUserId);
      } else {
        throw new Error(
          'dataAdmin or dataAdmin.superAdmin is undefined or data is still loading',
        );
      }
    },
    onSuccess: (data) => {
      console.log('Discussion created', data);
      setIsOpenChatModal(true);
      setDiscussionId(data);
      console.log('+++++++++++', {
        discussionId: data,
        userID: dataAdmin.superAdmin._id,
      });
      // socket.emit('join_room', {
      //   discussionId: data,
      //   userID: dataAdmin.superAdmin._id,
      // });
      getDiscussionMutation.mutate(data);
    },
    onError: (error) => {
      console.error('Error creating discussion:', error);
    },
  });
  const getExistingDiscussionMutation = useMutation(
    {
      mutationFn: (selectedUserId: any) => {
        if (!adminIsLoading && dataAdmin && dataAdmin.superAdmin) {
          return getExistingDiscussion(
            dataAdmin.superAdmin._id,
            selectedUserId,
          )
        } else {
          throw new Error(
            'dataAdmin or dataAdmin.superAdmin is undefined or data is still loading',
          );
          
        }
      },
      onSuccess: (data) => {
        console.log('Existing Discussion fetched:', data);
        if (!data) {
          createDiscussionMutation.mutate(selectedAdminId);
        } else {
          setDiscussionId(data._id);
          setOldMessages(data.messages);
          const messageData = { discussionId: data, senderId: dataAdmin.superAdmin._id, selecltedUserId: selectedAdminId };

          navigate('/chat', { state: messageData });
        }
      },
      onError: (error) => {
        console.error('Error fetching existing discussion:', error);
      },
    },
  );

  const getDiscussionMutation = useMutation({
    mutationFn: (discussionId: string) => {
      return getDiscussion(discussionId);
    },
    onSuccess: (data) => {
      console.log('Messages fetched:', data);
      setOldMessages(data.messages);
    },
    onError: (error) => {
      console.error('Error fetching messages:', error);
    },
  });

  const handleChat = (id: string) => {
    console.log('id:', id);
    setSelectedAdminId(id);
    setIsOpenChatModal(true);
    getExistingDiscussionMutation.mutate(id);
    // if (!adminIsLoading) {
    //   createDiscussionMutation.mutate(id);
    // }
  };
  const sendMessageMutation = useMutation({
    mutationFn: (data: {
      discussionId: string;
      message: string;
      senderId: string;
      selecltedUserId: string;
    }) => {
      console.log('id before sending:', data.discussionId);
      return sendMessage(data.discussionId, data.message, data.senderId);
    },
    onSuccess: (data) => {
      console.log('Message sent');
      console.log('datasending :', data);
      // socket.emit('send_message', {
      //   discussionId: discussionId,
      //   message: data.content,
      //   senderId: data.senderId,
      //   selectedUserId: selectedAdminId,
      // });
      if (dataAdmin && !adminIsLoading) {
        getDiscussionMutation.mutate(data.discussion);
      }
    },

    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });

  const handleSendMessage = (message: string) => {
    if (!adminIsLoading && dataAdmin && dataAdmin.superAdmin && discussionId) {
      sendMessageMutation.mutate({
        discussionId,
        message,
        senderId: dataAdmin.superAdmin._id,
        selecltedUserId: selectedAdminId,
      });
      console.log('discussionId:', discussionId);
      // message = '';
    }
  };

  return (
    <div>
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
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    User Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Email
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Role
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Inscription Date
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Mobile Phone
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  [...data.superAdmins, ...data.admins].map(
                    (admin: any, index: number) => (
                      <tr key={admin.id || index}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {admin.username}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {admin.email}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              admin.role === 'admin'
                                ? 'bg-success text-success'
                                : 'bg-danger text-danger'
                            }`}
                          >
                            {admin.role}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            {admin.email}
                          </div>
                        </td>
                        <td className="border-b border-[#eee] py-5 w-1 px-4 dark:border-strokedark text-black dark:text-white ">
                          <div className="flex items-center space-x-3.5">
                            {admin.role}
                          </div>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                          <div className="flex items-center space-x-3.5 ">
                            <button
                              className="hover:text-primary "
                              onClick={() => {
                                handleInfo(admin._id);
                              }}
                            >
                              <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                  fill=""
                                />
                                <path
                                  d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                  fill=""
                                />
                              </svg>
                            </button>

                            <button
                              className="hover:text-primary"
                              onClick={() => handleDelete(admin._id)}
                            >
                              <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                  fill=""
                                />
                                <path
                                  d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                  fill=""
                                />
                                <path
                                  d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                  fill=""
                                />
                                <path
                                  d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                  fill=""
                                />
                              </svg>
                            </button>
                            <button
                              className="hover:text-primary"
                              onClick={() => {
                                handleUpdateModal(admin._id);
                              }}
                            >
                              <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24 "
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M6.3 12.3l10-10a1 1 0 011.4 0l4 4a1 1 0 010 1.4l-10 10a1 1 0 01-.7.3H7a1 1 0 01-1-1v-4a1 1 0 01.3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 012 0v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2h6a1 1 0 010 2H4v14h14v-6z" />
                              </svg>
                            </button>
                            <button
                              className="hover:text-primary"
                              onClick={() => {
                                handleChat(admin._id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#696464"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-3">
              <p className="text-sm text-black dark:text-white">
                Showing 1 to 10 of 20 entries
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-primary hover:underline">Previous</button>
              <button className="text-primary hover:underline">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* custom modal for info Admin */}
      {infoData && (
        <>
          <CustomModal
            isOpen={isOpenInfoModal}
            onRequestClose={() => setIsOpenInfoModal(false)}
            contentLabel="Admin Info Modal"
            title="Admin Info"
            fields={[
              {
                name: 'username',
                label: 'Name',
                type: 'text',
                placeholder: 'Enter your name',
                readOnly: true, // Set readOnly for info display
              },
              {
                name: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'Enter your email',
                readOnly: true, // Set readOnly for info display
              },
              {
                name: 'role',
                label: 'Role',
                type: 'text',
                placeholder: 'Enter your role',
                readOnly: true, // Set readOnly for info display
              },
              {
                name: 'inscriptionDate',
                label: 'Inscription Date',
                type: 'text',
                placeholder: 'Enter your inscription date',
                readOnly: true, // Set readOnly for info display
              },
              {
                name: 'mobilePhone',
                label: 'Mobile Phone',
                type: 'text',
                placeholder: 'Enter your mobile phone',
                readOnly: true, // Set readOnly for info display
              },
            ]}
            initialValues={{
              username: infoData?.username,
              email: infoData?.email,
              role: infoData?.role,
              inscriptionDate: infoData?.inscriptionDate,
              mobilePhone: infoData?.mobilePhone,
            }}
            onSubmit={() => {}} // No need to submit anything
          />
        </>
      )}

      {infoData && (
        <>
          <CustomModal
            isOpen={isOpenUpdateModal}
            onRequestClose={() => setIsOpenUpdateModal(false)}
            contentLabel="Update Admin Modal"
            title="Update"
            fields={[
              {
                name: 'username',
                label: 'Name',
                type: 'text',
                placeholder: 'Enter your name',
              },
              {
                name: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'Enter your email',
              },
              {
                name: 'role',
                label: 'Role',
                type: 'text',
                placeholder: 'Enter your role',
              },
              {
                name: 'inscriptionDate',
                label: 'Inscription Date',
                type: 'text',
                placeholder: 'Enter your inscription date',
              },
              {
                name: 'mobilePhone',
                label: 'Mobile Phone',
                type: 'text',
                placeholder: 'Enter your mobile phone',
              },
            ]}
            initialValues={{
              username: infoData?.username,
              email: infoData?.email,
              role: infoData?.role,
              inscriptionDate: infoData?.inscriptionDate,
              mobilePhone: infoData?.mobilePhone,
            }}
            onSubmit={handleUpdate}
          />
        </>
      )}
    </div>
  );
};

export default TableFour;

