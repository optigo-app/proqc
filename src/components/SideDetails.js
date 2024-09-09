import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilValue } from 'recoil';
import { UploadLogicalPathState, ukeyState } from '../Recoil/FetchDataComponent';
import { rd3State, rd4State,YearCodeState } from '../Recoil/FetchDataComponent';

const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

const SideDetails = ({ togglepanel }) => {
  const [data, setData] = useState([]);
  const queryParams = useQueryParams();
  
  const empcode = atob(queryParams.get('empbarcode'));
  const jobid = atob(queryParams.get('jobid'));
  const imglink = useRecoilValue(UploadLogicalPathState) || localStorage.getItem('UploadLogicalPath');
  const ukeylink = useRecoilValue(ukeyState) || localStorage.getItem('ukey');
  const yc = useRecoilValue(YearCodeState) || JSON.parse(localStorage.getItem('yearcode'));
  console.log(yc,"yc");

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
      const response = await axios.post('https://api.optigoapps.com/ReactStore/ReactStore.aspx', {
        con: "{\"id\":\"\",\"mode\":\"SCANJOB\",\"appuserid\":\"kp23@gmail.com\"}",
        p: "eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2dpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=",
        dp: JSON.stringify({
          empbarcode: empcode,
          Jobno: jobid,
          Customerid: "10",
          eventid: "1"
        })
      }, {
        headers: {
          Authorization: "972635 0724901930",
          // Yearcode: yc,
          Yearcode: yc,
          Version: "qcv1",
          sp: "4",
          sv:'0',
          domain: "",
          "Content-Type": "application/json",
        }
      });

      if (response.data.Data.rd.stat == 1) {
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
  const fulllink = productData && imglink && ukeylink ? `${imglink}/${ukeylink}${productData.imgpath}` : '';
  const metaltype = productData?.MetalType1?.split(' ')[0] ?? "";

  return (
    <div className="flex flex-col w-full p-4  transform transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-700">Job Details</h3>
        <button
          className="p-2 bg-gray-500 text-white rounded"
          onClick={togglepanel}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      {productData ? (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800">
              {productData.jobserialno} ({productData.designno}) for <span className="text-blue-500">{productData.CustomerCode}</span>
            </p>
          </div>
          <div className="w-full flex justify-center mb-4">
            <img
              src={fulllink}
              alt="Product"
              className="w-40 h-40 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-600">
              {productData.MetalType} {productData.MetalColor} <span className="text-blue-500">{metaltype}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Gross Wt", value: productData.GrossWeightgm, subValue: productData.estmatedGrossWt || '0' },
              { label: "Net Wt", value: productData.NetWtgm, subValue: productData.estmatedNetWt || '0' },
              { label: "Diamond", value: `${productData.Diamond_actualctw} | ${productData.Diamond_actualpcsused}`, subValue: `${productData.estmatedDiamondctw || '0'} | ${productData.estmatedDiamondpcs || '0'}` },
              { label: "Colorstone", value: `${productData.ColorStone_actualctw} | ${productData.ColorStone_actualpcsused}`, subValue: `${productData.estmatedColorstonectw || '0'} | ${productData.estmatedcolorstonepcs || '0'}` },
              { label: "Misc", value: `${productData.Misc_actualctw} | ${productData.Misc_actualpcsused}`, subValue: `${productData.estmatedMiscctw || '0'} | ${productData.estmatedMiscPcs || '0'}` },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                <span className="block text-sm text-gray-400">{item.label}:</span>
                <span className="block text-lg font-semibold text-blue-500">{item.value}</span>
                <span className="block text-xs text-gray-500">{item.subValue}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Status:</span>
              <span
                className={`px-4 py-2 rounded-md text-white font-semibold ${
                  productData.qccurrentstatus=== 'approved'
                    ? 'bg-green-600'
                    : productData.qccurrentstatus === 'rejected'
                    ? 'bg-red-600'
                    : productData.qccurrentstatus === 'pending'
                    ? 'bg-yellow-500'
                    : 'bg-gray-300'
                }`}
              >
                {productData.qccurrentstatus}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-96 h-full flex justify-center'>
          <p>No Data Available</p>
        </div>
      )}
    </div>
  );
};

export default SideDetails;
