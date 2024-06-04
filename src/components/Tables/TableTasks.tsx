import { useEffect, useState } from 'react';
import {
  useGetAllTasks,
  useGetTaskById,
  useDelete,
  useAssign,
} from '../../hooks/customHooksTasks';
import { useGetAllUsers } from '../../hooks/customHooks';
import CustomModal from '../../pages/ModalUi';

const TableTasks = () => {
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [selectedtaskId, setSelectedtaskId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);



  //   const [selectedUserId, setSelectedUserId] = useState('');

  const { data: taskData } = useGetTaskById('tasks', selectedtaskId, 'tasks');
  const { data, isLoading  } = useGetAllTasks('tasks',currentPage, itemsPerPage, 'tasks');
  const { data: userData, isLoading: isUsersLoading } = useGetAllUsers(
    'users',
    'users',
  );

  console.log('----------------Data------------',userData);
  useEffect(() => {
    if (data) {
      console.log(data.totalTasks);
    } else {
      console.log('Data is not yet loaded');
    }
    setTotalItems(data?.totalTasks)
    
  }, [data]);
console.log('----------------currentPage------------',currentPage);

  const assignTask = useAssign('tasks', 'tasks');
  //   const { data: userData } = useGetById('users', selectedUserId, 'users');
    const deleteAdmin = useDelete('tasks', 'tasks');


  const newData = data?.tasks;
  const userDataName = userData?.formedUsers;
  // console.log('----------------', userDataName);

  if (isUsersLoading) {
    return <div>Loading...</div>;
  }

  // useEffect(() => {
  //     const userIds = taskData.map((task: { owner: string }) => task.owner);
  //     setSelectedUserId(userIds);
  //     console.log("###########################",userIds);
  //   }, [taskData]);

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       console.log('selectedUserId:', selectedUserId);
  //       const userIds = selectedUserId.split(', ');
  //       console.log('userIds:', userIds);
  //       try {
  //         const users = await Promise.all(userIds.map(id => useGetById('users', id, 'users')));
  //         console.log('users:', users);
  //       } catch (error) {
  //         console.error('Error fetching users:', error);
  //       }
  //     };

  //     fetchUsers();
  //   }, [selectedUserId]);

    const handleDelete = (id: string) => {
      deleteAdmin.mutate(id);
    };

  // const handleInfo = (id: string) => {
  //   setIsOpen(true);
  //   setSelectedAdminId(id);
  //   console.log(id);
  // };

  const handleInfo = (id: string) => {
    setIsOpenInfoModal(true);
    setSelectedtaskId(id);
    console.log(id, taskData);
  };

  const handleAssign = (id: string, taskStatus: string) => {
    if (taskStatus === 'Unassigned') {
      setIsModalOpen(true);
      setSelectedtaskId(id);
    }
  };

  const handleSubmitAssign = (data: any) => {
    console.log('//////////////////', data);
    console.log('*************************', selectedtaskId);
    setIsModalOpen(false);
    assignTask.mutate({ taskId: selectedtaskId, userId: data.user });
  };

  // const handleInfo = (id: string) => {
  //   setIsOpenInfoModal(true);
  //   setSelectedAdminId(id);
  //   setInfoData(newData);
  //   console.log(id), console.log(newData);

  // };

  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  }

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
                    Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Email
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Task Owner
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Bio
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(newData) &&
                  newData.map((task: any, index: number) => (
                    <tr key={task.id || index}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {task?.title}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {task?.owner?.email?.primary}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          {task?.owner?.name}
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                            task.TaskManagerStatus === 'Done'
                              ? 'bg-success text-success'
                              : task.TaskManagerStatus === 'In Progress'
                              ? 'bg-primary text-primary'
                              : task.TaskManagerStatus === 'Unassigned'
                              ? 'bg-warning text-warning'
                              : 'bg-success text-success'
                          }`}
                          onClick={() => {
                            handleAssign(task._id, task.TaskManagerStatus);
                          }}
                        >
                          {task?.TaskManagerStatus}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 w-1 px-4 dark:border-strokedark text-black dark:text-white ">
                        <div className="flex items-center space-x-3.5">
                          {task?.TaskType?.content}
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                        <div className="flex items-center space-x-3.5 ">
                          <button
                            className="hover:text-primary "
                            onClick={() => {
                              handleInfo(task._id);
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
                            onClick={() => handleDelete(task._id)}
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
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-3">
              <p className="text-sm text-black dark:text-white">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, totalItems)} of{' '}
                {totalItems} entries
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="text-primary hover:underline"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="text-primary hover:underline"
                onClick={handleNext}
                disabled={currentPage * itemsPerPage >= totalItems}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* custom modal for info Admin */}
      {taskData && (
        <>
          <CustomModal
            isOpen={isOpenInfoModal}
            onRequestClose={() => setIsOpenInfoModal(false)}
            contentLabel="Admin Info Modal"
            title="Admin Info"
            fields={[
              {
                name: 'taskname',
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
                name: 'status',
                label: 'Status',
                type: 'text',
                placeholder: 'Enter your status',
                readOnly: true, // Set readOnly for info display
              },
              {
                name: 'bio',
                label: 'Bio',
                type: 'text',
                placeholder: 'Enter your bio',
                readOnly: true, // Set readOnly for info display
              },
              {
                name: 'phone  ',
                label: 'Mobile Phone',
                type: 'text',
                placeholder: 'Enter your mobile phone',
                readOnly: true, // Set readOnly for info display
              },
            ]}
            initialValues={{
              taskname: taskData?.name,
              email: taskData?.email?.primary,
              status: taskData?.status,
              phone: taskData?.phone?.primary,
              bio: taskData?.bio,
            }}
            onSubmit={() => {}} // No need to submit anything
          />
        </>
      )}
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Modal"
        title="Task Assign"
        fields={[
          {
            name: 'user',
            label: 'User',
            type: 'select',
            placeholder: 'Select user',
            options: Array.isArray(userDataName)
              ? userDataName.map((user) => ({
                  value: user._id,
                  label: user.name,
                }))
              : [],
          },
        ]}
        initialValues={{ user: 'User1' }} // Set initial values for your fields
        onSubmit={handleSubmitAssign}
      />
    </div>
  );
};

export default TableTasks;
