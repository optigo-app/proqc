
import React, { useState,useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai'; 


const Jobdetails = ({ jobDetail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal(); 
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const tableData = [
    { shape: 'D:M round9', pointer: '0.250', quality: 'round9', color: 'bluish-white', pcs: 2, ctw: '0.500' },
    { shape: 'D:M round9', pointer: '0.500', quality: 'round9', color: 'bluish-white', pcs: 1, ctw: '0.500' },
    { shape: 'D:M round9', pointer: '0.667', quality: 'round9', color: 'bluish-white', pcs: 3, ctw: '2.000' },
    { shape: 'C:round9', pointer: '0.417', quality: 'round9', color: 'Emerald-green', pcs: 6, ctw: '2.500' },
    { shape: 'C:round9', pointer: '0.450', quality: 'round9', color: 'Emerald-green', pcs: 2, ctw: '0.900' },
    { shape: 'C:round9', pointer: '1.000', quality: 'round9', color: 'Emerald-green', pcs: 1, ctw: '1.000' },
    { shape: 'M:GOLD', pointer: '0.000', quality: '18K', color: 'RED', pcs: 0, ctw: '2.500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-row w-full justify-between p-6 h-auto overflow-auto max-h-[20vh]">
      <div className="flex flex-row w-full gap-4">
        <div className="w-1/3 flex flex-row gap-5 items-start">
          <img
            src={jobDetail.image}
            alt={jobDetail.name}
            className="w-[15vh] h-[15vh] object-cover rounded-md"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#7367F0]">
              {jobDetail.jobId} ({jobDetail.designNumber})
            </h2>
            <p className="text-lg font-semibold text-gray-800">{jobDetail.serialFor}</p>
            <p className="text-gray-600">{jobDetail.name}</p>
          </div>
        </div>

        <div className="sm:col-span-2 w-1/3 grid grid-cols-2 gap-1">
          <div className="flex flex-col">
            <p className="text-xs text-gray-400">Customer Name</p>
            <p className="font-semibold text-lg text-gray-700">{jobDetail.customerName}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-gray-400">PO</p>
            <p className="font-semibold text-lg text-gray-700">{jobDetail.poNumber}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-gray-400">Bag Location</p>
            <p className="font-semibold text-lg text-gray-700">{jobDetail.location}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-gray-400">Misc Add in Gross wt</p>
            <p className="font-semibold text-lg text-gray-700">{jobDetail['Misc Add in Gross wt']}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-gray-400">Is HMW Job?</p>
            <p className="font-semibold text-lg text-gray-700">{jobDetail['Is HMW Job?']}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Current Status</p>
            <p className="font-semibold text-lg text-yellow-700">{jobDetail.currentStatus}</p>
          </div>
        </div>

      <div className="w-1/3 flex flex-col h-full items-end  justify-between gap-3" >
      <div className=" w-fit flex flex-row h-fit items-center  gap-3">
          <span className="bg-green-100 h-fit text-green-800 px-3 py-1 rounded-full text-lg font-semibold">
            Last Received: {jobDetail.lastReceived}
          </span>
          <button  onClick={handleOpenModal} className="text-gray-400 hover:text-indigo-500 outline-none border-none transition-colors duration-200">
            <FaInfoCircle  size={26} />
          </button>
        </div>
      <div className=" w-fit flex flex-row h-fit items-center  gap-3">
          <span className="text-gray-600 text-sm">
           T D :<strong className='text-base'> {jobDetail.DiamondPcs} Pcs / {jobDetail.DiamondWt}  | </strong> Metal : <strong className='text-base'> {jobDetail.Metal} |</strong> 
          </span>
          <span className="text-gray-600  text-sm">Sprued Wt: <strong className='  cursor-pointer underline text-base'> {jobDetail.SprewWt}</strong> 
          </span>
          
        </div>
      </div>

      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#7367F0]">
                  Estimated Material For: {jobDetail.jobId}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-red-600 transition-colors outline-none border-none duration-200"
                >
                  <AiOutlineClose className="text-2xl" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                   
                    <tr className="bg-gray-2  00">
                      {['Shape', 'Pointer', 'Quality', 'Color', 'PCs', 'Ctw'].map((header) => (
                        <th key={header} className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } hover:bg-indigo-50 transition-colors duration-150`}
                      >
                        {Object.values(row).map((cell, cellIndex) => (
                          <td key={cellIndex} className="py-3 px-4 text-sm text-gray-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

           
            </div>
            <div className='flex w-full  p-3 pt-0 justify-end'>
              <p className="text-xs font-bold text-gray-400">
                 Press ESC for Close
                </p>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobdetails;
