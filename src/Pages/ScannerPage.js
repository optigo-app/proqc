import React from 'react';
import { useNavigate } from 'react-router-dom';
import Scanner from '../components/Scanner';

const ScannerPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/job-questions');
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
