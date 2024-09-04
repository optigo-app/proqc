// import React from 'react';
// import img from "../Assets/Ring.png";

// const SideDetails = () => {
//   const productDetails = {
//     jobId: '1/265009 [1H572] for EG302',
//     goldType: 'GOLD 22K(Yellow)',
//     grossWt: '5.000',
//     metalWt: '5.000',
//     productType: '2',
//     category: 'Necklace',
//     hallmark: 'With HallMark',
//     imageUrl: img,
//   };

//   return (
//     <div className="w-full p-2  px-6 border bg-[#f4f4f4] justify-between shadow-lg flex  md:flex-row items-center transform transition-transform duration-300 " style={{alignItems:'center'}}>
//      <div className='flex flex-col gap-2'>
//      <div className='flex flex-row h-full items-center'>
//      <div className="text-center mb-4 md:mb-0 md:mr-6 h-full flex items-center  ">
//         <p className="text-xl font-semibold  text-[#266731]">   
//           {productDetails.jobId}
//         </p>
//       </div>
//       <div className=" text-center  mb-4 md:mb-0 md:mr-6 ">
//         <p className="text-black font-semibold">{productDetails.goldType}</p>
//       </div>
//      </div>
//      <ul className="space-y-2 text-sm text-[#444] flex flex-col md:flex-row md:space-x-6 md:space-y-0">
//   <div className="flex flex-wrap gap-4 md:gap-6">
//     <li className="text-gray-600 flex items-center gap-2">
//       Gross Wt: <span className="font-semibold text-lg">{productDetails.grossWt}</span>
//     </li>
//     <li className="text-gray-600 flex items-center gap-2">
//       Metal Wt: <span className="font-semibold text-lg">{productDetails.metalWt}</span>
//     </li>
//     <li className="text-gray-600 flex items-center gap-2">
//       Product Type: <span className="font-semibold text-lg">{productDetails.productType}</span>
//     </li>
//     <li className="text-gray-600 flex items-center gap-2">
//       Category: <span className="font-semibold text-lg">{productDetails.category}</span>
//     </li>
//     <li className="text-gray-600 flex items-center gap-2">
//       HallMark: <span className="font-semibold text-lg">{productDetails.hallmark}</span>
//     </li>
//   </div>
// </ul>

//      </div>
//       <div className="mt-4 md:mt-0 md:ml-6 text-center">
//         <img
//           src={productDetails.imageUrl}
//           alt="Product"
//           className="w-20 h-20 object-contain mx-auto rounded-lg shadow-md"
//         />
//       </div>
//     </div>
//   );
// };

// export default SideDetails;



import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { faBarcode, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

const SideDetails = ({togglepanel}) => {
  const [data, setData] = useState([]);
  const queryParams = useQueryParams();
  const qcID = queryParams.get('QCID');
  const empcode = queryParams.get('empbarcode');
  const jobid = queryParams.get('jobid');

  useEffect(() => {
    const localStorageData = localStorage.getItem('JobData');
    let responseData;

    if (localStorageData) {
      responseData = JSON.parse(localStorageData);
      if (Array.isArray(responseData) && responseData.length > 0) {
        setData(responseData);
      } else {
        fetchDataFromApi();
      }
    } else {
      fetchDataFromApi();
    }
  }, []);

  const fetchDataFromApi = async () => {
    try {
      const response = await axios.post('http://zen/api/ReactStore.aspx', {
        con: "{\"id\":\"\",\"mode\":\"SCANJOB\",\"appuserid\":\"kp23@gmail.com\"}",
        p: "eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2dpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=",
        dp: JSON.stringify({
          empbarcode: empcode,
          Jobno: jobid,
          Customerid: "10"
        })
      }, {
        headers: {
          Authorization: "Bearer 9065471700535651",
          Yearcode: "e3t6ZW59fXt7MjB9fXt7b3JhaWwyNX19e3tvcmFpbDI1fX0=",
          Version: "v1",
          sp: "4",
          domain: "",
          "Content-Type": "application/json",
          "Cookie": "ASP.NET_SessionId=f0w3jjmd1vryhwsww0dfds1z"
        }
      });

      if (response.data.Status === 200) {
        setData(response.data.Data.rd);
        localStorage.setItem('JobData', JSON.stringify(response.data.Data.rd));
      } else {
        console.error('Error: ' + response.data.Message);
      }
    } catch (error) {
      console.error('API call failed', error);
    }
  };

  const productData = data[0];

  return (
    <>
      <div className='flex flex-col'>
      <div className='w-full pb-0 p-3'>
       <button
          className="p-2 bg-gray-800 text-white rounded"
          onClick={togglepanel}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
       </div>
        {productData ? (
          <div className="md:p-6 pt-0 flex flex-col justify-center">
            <div className="text-center mb-4">
              <p className="text-gray-800 font-bold text-xl">
                <span className="text-[#56a4ff]">{productData.jobserialno} ({productData.designno})</span> For {productData.CustomerCode}
              </p>
            </div>

            <div className="grid w-screen md:w-auto px-2 md:mt-auto grid-cols-2 gap-4">
              <div className="bg-[rgba(227,227,227,0.5)] shadow-xl border-gray-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">Gross Wt:</span>
                </div>
                <div className="mt-0">
                  <span className="text-xl text-[#56a4ff] font-semibold">{productData.GrossWeightgm}</span>
                  <div className="text-xs text-gray-500">{productData.estmatedGrossWt || '0'}</div>
                </div>
              </div>
              <div className="bg-[rgba(227,227,227,0.5)] shadow-xl border-gray-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">Net Weight:</span>
                </div>
                <div className="mt-0">
                  <span className="text-xl text-[#56a4ff] font-semibold">{productData.NetWtgm}</span>
                  <div className="text-xs text-gray-500">{productData.estmatedNetWt || '0'}</div>
                </div>
              </div>
              <div className="bg-[rgba(227,227,227,0.5)] shadow-xl border-gray-100 p-4 rounded-lg">
                <span className="text-sm text-gray-400">Diamond:</span>
                <div className="mt-0">
                  <span className="text-xl text-[#56a4ff] font-semibold">{productData.Diamond_actualctw} | {productData.Diamond_actualpcsused}</span>
                  <div className="text-xs text-gray-500">{productData.estmatedDiamondctw || '0'} | {productData.estmatedDiamondpcs || '0'}</div>
                </div>
              </div>
              <div className="bg-[rgba(227,227,227,0.5)] shadow-xl border-gray-100 p-4 rounded-lg">
                <span className="text-sm text-gray-400">Colorstone:</span>
                <div className="mt-0">
                  <span className="text-xl text-[#56a4ff] font-semibold">{productData.ColorStone_actualctw} | {productData.ColorStone_actualpcsused}</span>
                  <div className="text-xs text-gray-500">{productData.estmatedColorstonectw || '0'} | {productData.estmatedcolorstonepcs || '0'}</div>
                </div>
              </div>
              <div className="bg-[rgba(227,227,227,0.5)] shadow-xl border-gray-100 p-4 rounded-lg">
                <span className="text-sm text-gray-400">Misc:</span>
                <div className="mt-0">
                  <span className="text-xl text-[#56a4ff] font-semibold">{productData.Misc_actualctw} | {productData.Misc_actualpcsused}</span>
                  <div className="text-xs text-gray-500">{productData.estmatedMiscctw || '0'} | {productData.estmatedMiscPcs || '0'}</div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="w-full h-fit flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400">Status:</span>
                    </div>
                    <div className="mt-1 bg-green-600 rounded-md w-fit p-3 py-2">
                      <span className="text-lg text-white font-semibold">{productData.qccurrentstatus}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="h-[1.25rem] text-white"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default SideDetails;

