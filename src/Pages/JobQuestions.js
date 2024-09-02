import React, { useEffect, useState } from 'react';
import SideDetails from '../components/SideDetails';
import Survey from '../components/Survey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Scanner from '../components/Scanner';
// import axios from "axios";

const JobQuestions = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanelOpen = () => {
    setIsPanelOpen(!isPanelOpen);

  };
 

  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await axios.post(
    //         "http://zen/api/ReactStore.aspx",
    //         {
    //           con: "{\"id\":\"\",\"mode\":\"SYNCQC\",\"appuserid\":\"kp23@gmail.com\"}",
    //           p: "eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2dpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=",
    //           dp: "{\"PackageId\":\"1\",\"FrontEnd_RegNo\":\"80kgizbiduw5e7gg\",\"Customerid\":\"10\"}"
    //         },
    //         {
    //           headers: {
    //             Authorization: "Bearer 9065471700535651",
    //             Yearcode: "e3t6ZW59fXt7MjB9fXt7b3JhaWwyNX19e3tvcmFpbDI1fX0=",
    //             Version: "v1",
    //             sp: "4",
    //             domain: "",
    //             "Content-Type": "application/json",
    //           }
    //         }
    //       );
  
    //       console.log(response.data);
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };
  
    //   fetchData();
    // }, []);
  





  
  return (
    <div className="flex flex-col w-screen min-h-screen bg-gray-50 relative">
      <SideDetails />

     <div className='h-20'>
     {!isPanelOpen && (
       <button
       className="self-start ml-4 mt-2 p-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
       onClick={togglePanelOpen}
     >
       <FontAwesomeIcon icon={faBarcode} className="text-xl" />
     </button>
     
      )}
     </div>

     <div
  className={`fixed top-0 left-0 overflow-y-auto w-screen h-full bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
    isPanelOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
  style={{
    zIndex: 1000,
  }}
>
       {/* <div>
       <button
          className="absolute top-4 left-4 p-2 bg-gray-800 text-white rounded"
          onClick={togglePanel}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
       </div> */}
<div>
<Scanner togglePanel={togglePanelOpen} handlenext={togglePanelOpen} visibility="flex" />

  </div>     
   </div>

      <div className="flex  px-3 justify-center h-full w-screen overflow-hidden items-center">
        <Survey />
      </div>
    </div>
  );
};

export default JobQuestions;
