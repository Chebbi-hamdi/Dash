
import { useEffect, useState } from 'react';


interface Message {
    content: string;
    _id: string;
    sender: string;
}






const TableChat = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [newData, setNewData] = useState([]);




    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
            setNewData(data);
            setIsLoading(false);
        });
    }, []);




    





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
                      
                      </tr>
                    </thead>
                    <tbody>
                      {newData?.map((discussion) => (
                        <tr
                          key={discussion?._id}
                          className="border-b border-stroke dark:border-strokedark"
                        >
                          <td className="py-4 px-4 text-black dark:text-white">
                            {discussion}
                          </td>
                          
                        </tr>
                      ))}
                    </tbody>
                    </table>
                </div>
            </div>
            )}
        </div>
    );
}

export default TableChat;