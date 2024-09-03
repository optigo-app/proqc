import React from 'react';
import Scanner from '../components/Scanner';
import { useLocation, useNavigate } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

const ScannerPage = () => {
  const navigate = useNavigate();
  const queryParams = useQueryParams();
    const qcID = queryParams.get('QCID');
    console.log('qcID',qcID);


  const handleNext = () => {
    navigate(`/job-questions?QCID=${qcID}`);
  };

  return (
    <div
      className={ ` w-screen overflow-x-hidden flex flex-row overflow-y-auto h-auto lg:h-screen bg-bg-gray-100 shadow-2xl transform transition-transform duration-500 ease-in-out`} >
      <div>
        <Scanner visibility="hidden"  handlenext={handleNext}/>
      </div>
      <div className="p-4">
      
      </div>
    </div>  
  );      
};

export default ScannerPage;
