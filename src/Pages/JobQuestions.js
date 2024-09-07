// import React, { useEffect, useState } from 'react';
// import SideDetails from '../components/SideDetails';
// import Survey from '../components/Survey';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBarcode, faArrowRight } from '@fortawesome/free-solid-svg-icons';


// import Scanner from '../components/Scanner';
// // import axios from "axios";

// const JobQuestions = () => {
//   const [isPanelOpen, setIsPanelOpen] = useState(false);

//   const togglePanelOpen = () => {
//     setIsPanelOpen(!isPanelOpen);

//   };
 

  
//   useEffect(() => {
   
//   }, []);
  





  
//   return (
//     <div className="flex flex-col w-screen min-h-screen bg-gray-50 relative">


//      <div className='h-20'>
//      {!isPanelOpen && (
//        <button
//        className="self-start ml-4 mt-2 p-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
//        onClick={togglePanelOpen}
//      >
//        <FontAwesomeIcon icon={faBarcode} className="text-xl" />
//      </button>
     
//       )}
//      </div>

//      <div
//   className={`fixed top-0 left-0 flex flex-col w-fit h-screen overflow-y-auto bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
//     isPanelOpen ? 'translate-x-0' : '-translate-x-full'
//   }`}
//   style={{
//     zIndex: 1000,
//   }}
// >
// <div >
// <SideDetails togglepanel={togglePanelOpen} />
//   </div>     
//    </div>

//       <div className="flex  px-3 justify-center h-full w-screen overflow-hidden items-center">
//         <Survey />
//       </div>
//     </div>
//   );
// };

// export default JobQuestions;


import React, { useEffect, useState } from 'react';
import SideDetails from '../components/SideDetails';
import Survey from '../components/Survey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineReadMore } from "react-icons/md";

const JobQuestions = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const togglePanelOpen = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="flex flex-col  md:flex-row  w-screen h-screen bg-gray-50 from-blue-100 via-indigo-50 to-green-100 relative">
      <div  className='md:h-screen mb-2 md:mb-0  h-fit w-fit p-5'
      // <div  className='md:h-screen mb-5 md:mb-0 shadow-2xl bg-[#f4f4f4] h-fit w-screen md:w-fit p-5'
      >
        {!isPanelOpen && (
          <button
            className="self-start  mt-2 p-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-400 transition-transform transform hover:scale-105"
            onClick={togglePanelOpen}
          >
            <MdOutlineReadMore  className="text-2xl text-white" />
         
          </button>
        )}
      </div>

      <div
        className={`fixed top-0 left-0 flex flex-col w-fit h-screen overflow-y-auto  bg-[#f4f4f4] shadow-2xl transform transition-transform duration-500 ease-in-out ${
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
        className={`flex  px-3 justify-center h-full min-h-screen w-screen overflow-y-auto mt-3 items-center transition-transform duration-500 ease-in-out ${
          isPanelOpen && window.innerWidth > 768 ? 'transform translate-x-48' : ''
        }`}
      >
        <Survey />
      </div>
    </div>
  );
};

export default JobQuestions;
