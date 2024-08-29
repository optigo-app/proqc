import React, { useState } from 'react';
import SideDetails from './components/SideDetails';
import Survey from './components/Survey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Scanner from './components/Scanner';

const App = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50 relative">
      <SideDetails />

     <div className='h-20'>
     {!isPanelOpen && (
       <button
       className="self-start ml-4 mt-2 p-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
       onClick={togglePanel}
     >
       <FontAwesomeIcon icon={faBarcode} className="text-xl" />
     </button>
     
      )}
     </div>

     <div
  className={`fixed top-0 left-0 overflow-y-auto w-full h-full bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
    isPanelOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
  style={{
    zIndex: 1000,
  }}
>
       <div>
       <button
          className="absolute top-4 left-4 p-2 bg-gray-800 text-white rounded"
          onClick={togglePanel}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
       </div>
<div>
<Scanner/>

  </div>     
   </div>

      <div className="flex justify-center h-full px-3 items-center">
        <Survey />
      </div>
    </div>
  );
};

export default App;
