import { useState, ChangeEvent } from 'react';
import Modal from 'react-modal';

interface Options {
  label: string;
  value: string;
}

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  options?: Options[];
  readOnly?: boolean;
}

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  title: string;
  fields: Field[];
  initialValues: { [key: string]: string };
  onSubmit: (data: { [key: string]: string }) => void;
  children?: React.ReactNode; // Add this line

}

const CustomModal: React.FC<Props> = ({ isOpen, onRequestClose, contentLabel, title, fields, initialValues, onSubmit, children }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      className="dark:border-strokedark text-black dark:text-white pt-30 w-1/3 h-1/2 m-auto"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      contentLabel={contentLabel}
    >
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="text-black dark:text-white font-extrabold">{title}</h3>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.name} className="mb-4.5 m-3">
                  <label className="mb-2.5 block font-bold text-black dark:text-white ml-3">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 dark:text-white text-black outline-none transition focus:border-primary active:border-primary"
                      >
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 dark:text-white text-black outline-none transition focus:border-primary active:border-primary"
                      value={formData[field.name]}
                      onChange={handleChange}
                      readOnly={field.readOnly}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button className="bg-primary text-white mt-2 px-6 py-2.5 rounded-md" type="submit">
                  {title === 'Update' ? 'Save' : title}
                </button>
              </div>
            </form>
          </div>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;