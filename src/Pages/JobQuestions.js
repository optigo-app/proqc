import React, { useState } from 'react';
import SideDetails from '../components/SideDetails';
import Survey from '../components/Survey';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { SiTicktick } from 'react-icons/si';
import { ImCross } from 'react-icons/im';
import { MdOutlineReadMore, MdArrowBack, MdClose } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { FaGem } from 'react-icons/fa';  // A jewelry-related icon from react-icons


const Conclusion = [
  { id: '1', status: 'Approved', icon: <FaRegThumbsUp />, iconcolor: '#4CAF50', bgcolor: '#4CAF5030' },
  { id: '2', status: 'Rejected', icon: <FaRegThumbsDown />, iconcolor: '#F44336', bgcolor: '#F4433630' },
  { id: '3', status: 'Final Approved', icon: <SiTicktick />, iconcolor: '#4CAF50', bgcolor: '#4CAF5030' },
  { id: '4', status: 'Final Rejected', icon: <ImCross />, iconcolor: '#F44336', bgcolor: '#F4433630' },
];

const Modal = ({ isOpen, onClose, finalHistory }) => {
  if (!isOpen) return null;
  const statusObj = Conclusion.find(item => item.id === String(finalHistory[0]?.statusid)) || {};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{ zIndex: 100 }}>
    <div className="bg-white w-full lg:w-[60vw] min-h-[80vh] rounded-lg p-6 shadow-lg flex flex-col relative">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Previous History for{" "}
          <span className="font-bold text-xl text-blue-600">{finalHistory[0]?.serialjobno || 'N/A'}</span>
        </h2>
        <button onClick={onClose} className="hover:text-blue-600 transition duration-300">
          <MdClose className="text-3xl text-gray-700 hover:text-gray-900" />
        </button>
      </div>
  
      <div className="mb-6">
        <div className="flex items-center">
          <span className="text-gray-600">Done By:</span>
          <span className="ml-3 font-semibold text-lg text-blue-600">
            {finalHistory[0]?.empname || 'N/A'} ({finalHistory[0]?.barcode || 'N/A'})
          </span>
        </div>
      </div>
  
      <div className="mb-6 flex-grow">
        <h3 className="text-lg font-semibold text-gray-600 mb-3">Questions and Answers:</h3>
        {finalHistory[0]?.que_opt && Object.keys(finalHistory[0]?.que_opt).length > 0 ? (
          <ul className="list-disc pl-6">
            {Object.entries(finalHistory[0]?.que_opt).map(([question, answer], index) => (
              <li key={question} className="mt-2 flex flex-col">
                <span className="font-semibold text-lg text-gray-700">
                  {index + 1}. {question}:
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {answer.split(',').map((ans, ansIndex) => (
                    <span
                      key={ansIndex}
                      className={`py-2 px-4 rounded-full shadow-md border border-gray-300 focus:outline-none bg-[#56a4ff] text-white transition transform hover:scale-105`}
                    >
                      {ans.trim()}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No questions and answers available.</p>
        )}
      </div>
  
      {statusObj?.status && (
        <div className="rounded-lg p-4 flex items-center justify-center mt-auto" style={{ backgroundColor: statusObj?.bgcolor }}>
          <div className="flex items-center">
            <div className="text-3xl mr-4" style={{ color: statusObj?.iconcolor }}>
              {statusObj?.icon}
            </div>
            <div>
              <h4 className="text-xl font-semibold" style={{ color: statusObj?.iconcolor }}>
                {statusObj?.status}
              </h4>
              {statusObj?.rem && <p className="text-gray-700">{statusObj?.rem}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  

  );
};



const JobQuestions = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();


  const finalhistory = JSON.parse(localStorage.getItem('finalhistory')) || {};

  const togglePanelOpen = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handlemodal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    localStorage.removeItem('answers');
    localStorage.removeItem('selectedQuestions');
    localStorage.removeItem('remarks');
    localStorage.removeItem('images');
    navigate(`/empscan`);
  };

  const handleOpenScanner = () => {
    setIsScanning(true);
    setShowScanner(true);
    setIsPanelOpen(true);
  };

  const handleScannerStateChange = (isScannerActive) => {
    setIsScanning(isScannerActive);
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen bg-gray-50 relative">
      <div className="md:h-screen mb-2 md:mb-0 h-fit w-fit p-5">
        {!isPanelOpen && (
          <button
            className="self-start mt-2 p-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-400 transition-transform transform hover:scale-105"
            onClick={togglePanelOpen}
          >
            <MdOutlineReadMore className="text-2xl text-white" />
          </button>
        )}
      </div>

      <div
        className={`fixed top-0 left-0 flex flex-col w-fit h-screen overflow-y-auto bg-[#f4f4f4] shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isPanelOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ zIndex: 100}}
      >
        <SideDetails 
          togglepanel={togglePanelOpen} 
          onScannerStateChange={handleScannerStateChange} 
          showScanner={showScanner}
          handlemodalopen={handlemodal}
        />
      </div>

      <div
        className={`flex px-3 justify-center h-full min-h-screen w-screen overflow-y-auto mt-3 items-center transition-transform duration-500 ease-in-out ${
          isPanelOpen && window.innerWidth > 768 ? 'transform translate-x-48' : ''
        }`}
      >
        {isScanning ? (
          <div className="flex flex-col items-center justify-center text-center">
            <ClipLoader size={50} color="#4A90E2" />
            <p className="mt-4 text-xl font-semibold text-gray-700">Scanning Process Running, Please Wait...</p>
          </div>
        ) : (
          <Survey onSuccess={handleOpenScanner} />
        )}
      </div>

      <button
        onClick={handleBackClick}
        className="absolute top-4 right-8 p-3 text-blue-500 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center"
        aria-label="Back"
      >
        <MdArrowBack className="text-2xl font-bold" />
        <span className="ml-2 font-bold">Back</span>
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} finalHistory={finalhistory} />
    </div>
  );
};

export default JobQuestions;
