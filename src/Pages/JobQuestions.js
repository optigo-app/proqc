import React, { useState } from 'react';
import SideDetails from '../components/SideDetails';
import Survey from '../components/Survey';
import { MdOutlineReadMore, MdOutlineArrowBackIos } from 'react-icons/md'; // Import icons
import { useLocation,useNavigate } from "react-router-dom";
import { MdArrowBack } from 'react-icons/md';


const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
  };
  
const JobQuestions = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const navigate = useNavigate();
  const queryParams = useQueryParams();

  const qcID = atob(queryParams.get('QCID'));
  const empbarcode = atob(queryParams.get('empbarcode'));
  const jobid = atob(queryParams.get('jobid'));
  const empid = atob(queryParams.get('employeeid'));
  const eveid = atob(queryParams.get('eventid'));
  const yc = localStorage.getItem('yearcode');
  const token = localStorage.getItem('proqctoken');
  const togglePanelOpen = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleBackClick = () => {
    navigate(`/Scannerpage?QCID=${btoa(qcID)}&empbarcode=${btoa(empbarcode)}&employeeid=${btoa(empid)}&eventid=${btoa(eveid)} `);
  
  }
  

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
        style={{
          zIndex: 1000,
        }}
      >
        <div>
          <SideDetails togglepanel={togglePanelOpen} />
        </div>
      </div>

      <div
        className={`flex px-3 justify-center h-full min-h-screen w-screen overflow-y-auto mt-3 items-center transition-transform duration-500 ease-in-out ${
          isPanelOpen && window.innerWidth > 768 ? 'transform translate-x-48' : ''
        }`}
      >
        <Survey />
      </div>

      <button
        onClick={handleBackClick}
        className="absolute top-4 right-8 p-3 text-blue-500  rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center"
        aria-label="Back"
      >
        <MdArrowBack className="text-2xl font-bold" />
        <span className="ml-2 font-bold">Back</span>
      </button>
    </div>
  );
};

export default JobQuestions;

