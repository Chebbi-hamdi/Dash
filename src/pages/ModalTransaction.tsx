import React, { FC } from 'react';
import Modal from 'react-modal';


interface Transaction {
  _id: string;
  amount: number;
  createdAt: string;
  phone: string;
  status: string;
  type: string;
  email: string;
  name: string
  order: string;
}

interface ModalTransactionProps {
  data: Transaction | null;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ModalTransaction: FC<ModalTransactionProps> = ({ data , isOpen, onRequestClose }) => {
  if (!data) {
    return null;
  }

  return (
    <Modal
      className="dark:border-strokedark text-black dark:text-white pt-30 w-1/3 h-1/2 m-auto"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40%',
          height:'50%',
          top: '20%',
            left: '30%',
            borderRadius: '15px',
          backgroundColor: 'rgba(225, 225, 225, 0.75)',
        },
        content: {
          position: 'relative',
          width: '80%',
          height: '80%',
          borderRadius: '10px',
          backgroundColor: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
          padding: '20px',
        },
      }}
    >
      <button
        onClick={onRequestClose}
        className="absolute top-5 right-5 bg-red-500 text-white rounded-full w-4 h-8 flex items-center justify-center"
      >
        X
      </button>
      <h1 className="text-2xl font-semibold">Transaction Details</h1>
      <h2>{data._id}</h2>
      <p>Amount: {data.amount}</p>
      <p>Created At: {data.createdAt}</p>
      <p>Phone: {data.phone}</p>
      <p>Status: {data.status}</p>
      <p>Type: {data.type}</p>
      <p>User: {data.name}</p>
      <p>Email: {data.email}</p>
    </Modal>
  );
}

export default ModalTransaction;