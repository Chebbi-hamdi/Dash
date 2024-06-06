import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableFour from '../components/Tables/TableFour';
import DefaultLayout from '../layout/DefaultLayout';
import { useState } from 'react';
import Modal from 'react-modal';
// import crudRouter from '../api/routes/route';
import { useCreate } from '../hooks/customHooks';
const Admins = () => {

  const [modalIsOpen, setIsOpen] = useState(false);

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const handleRoleChange = (e: any) => {
    console.log(e);
    setRole(e);
  };

  const addAdminMutation = useCreate('admin', 'admins');
  const handleAddAdmin = (e: React.FormEvent<HTMLFormElement>) => {
    setIsOpen(false);
    e.preventDefault();
    addAdminMutation.mutate({ username, email, password, role });
    setEmail('');
    setName('');
    setPassword('');
    setRole('');
  };



  return (
    <DefaultLayout>
      <Breadcrumb pageName="Admins" />
      <div className="flex justify-start">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black text-white py-2 px-4 mb-3 rounded-md"
        >
          Add Admin
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <TableFour />
      </div>
      <Modal className=" dark:border-strokedark  text-black dark:text-white pt-30 w-2/3 h-1/2 ml-96  rounded-lg"
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
   
        }}
        contentLabel="Add Admin Modal"
      >
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div>
            <form onSubmit={(e) => handleAddAdmin(e)} className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 dark:text-white text-black outline-none transition focus:border-primary active:border-primary"
                  onChange={(e) => setName(e.target.value)}
                  value={username}
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px]  dark:text-white border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded border-[1.5px]  dark:text-white border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

                <label className="mb-2.5 block text-black dark:text-white">
                  Role
                </label>
              <div className="relative z-20 bg-white dark:bg-form-input mb-4.5">
                <select
                  className=" w-full z-20  
                  border-stroke bg-transparent py-3 px-12
                  rounded border
                  appearance-none relative 
                    text-body outline-none transition
                     focus:border-primary active:border-primary
                      dark:border-form-strokedark dark:bg-form-input"
                  onChange={(e) => {
                    handleRoleChange(e.target.value);
                  }}
                  value={role}
                >
                  <option
                    value="admin"
                    className="text-body dark:text-bodydark"
                  >
                    Admin
                  </option>
                  <option
                    value="superAdmin"
                    className="text-body dark:text-bodydark"
                  >
                    superAdmin
                  </option>
                </select>
                <span className="absolute top-1/2 right-6 z-30 -translate-y-1/2">
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

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 dark:bg-primarydark dark:text-white dark:hover:bg-opacity-90 dark:bg-slate-900"
              >
                Add Admin
              </button>
            </form>
          </div>
        </div>
        {addAdminMutation.isPending && (
          <p className="text-black dark:text-white flex justify-center font-satoshi font-medium">
            Adding Admin...
          </p>
        )}
      </Modal>
    </DefaultLayout>
  );
};

export default Admins;
