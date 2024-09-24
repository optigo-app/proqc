import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import QrScanner from 'qr-scanner';
import axios from 'axios';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilValue } from 'recoil';
import { UploadLogicalPathState, ukeyState, rd3State, rd4State, YearCodeState } from '../Recoil/FetchDataComponent';
import { FaCheckCircle } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { MdOutlineQrCodeScanner } from "react-icons/md";
import '../components/Scanner.css';
import Scannericon from '../Assets/Qrcode.png';
import { FaGem } from 'react-icons/fa';  

const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

const SideDetails = ({ togglepanel, onScannerStateChange, showScanner,handlemodalopen }) => {
  const [data, setData] = useState([]);
  const [history, setHistory] = useState([]);
  const [hasCamera, setHasCamera] = useState(true);
  const [barcode, setBarcode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [imgError, setImgError] = useState(false);

  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const eveid = localStorage.getItem('eventId');
  const queryParams = useQueryParams();
  const empcode = atob(queryParams.get('empbarcode'));
  const imglink = localStorage.getItem('UploadLogicalPath');
  const ukeylink = localStorage.getItem('ukey');
  const yc = localStorage.getItem('yearcode');
  const token = localStorage.getItem('proqctoken');

  useEffect(() => {
    if (videoRef.current && !scannerRef.current && hasCamera) {
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => handleScan(result.data),
        {
          onDecodeError: (err) => console.log(err),
          preferredCamera: 'environment',
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      scannerRef.current.start().catch((err) => {
        console.error(err);
        setHasCamera(false);
      });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current = null;
      }
    };
  }, [hasCamera]);

  useEffect(() => {
    onScannerStateChange(!showDetails);
  }, [showDetails]);

  const handleScan = (result) => {
    if (result) {
      setBarcode(result);
      setHasCamera(false);
      handleCodeSubmit(result);
    }
  };
  

  const handleCodeSubmit = async (scannedCode) => {
    if (barcode.trim() === '') {
      setErrorMessage('Please enter the Job#.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.optigoapps.com/ReactStore/ReactStore.aspx',
        {
          con: '{"id":"","mode":"SCANJOB","appuserid":"kp23@gmail.com"}',
          p: 'eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2dpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=',
          dp: JSON.stringify({
            empbarcode: empcode,
            Jobno: barcode,
            Customerid: '10',
            eventid: eveid,
          }),
        },
        {
          headers: {
            Authorization: token,
            Yearcode: yc,
            Version: 'v1',
            sp: '4',
            sv: '0',
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.Data.rd[0].stat === 1) {
        setData(response.data.Data.rd[0]);
        setShowDetails(true);
        
        localStorage.setItem('Jobid', barcode);
        localStorage.setItem('JobCompleteStatusId', response.data.Data.rd[0].JobCompleteStatusId);
  
        const finalhistory = createFinalHistory(response.data.Data.rd1);
        localStorage.setItem('finalhistory', JSON.stringify(finalhistory));
  
        console.log("finalhistory", finalhistory);
        console.log("Response history", JSON.stringify(response.data.Data.rd1));
        setHistory(response.data.Data.rd1 || []);
  
      } else {
        setErrorMessage('Please enter a valid job#');
      }
    } catch (error) {
      setErrorMessage('Some Network Issue, Please try Again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const getQueById = (idToCompare) => {
    const rdArray = JSON.parse(localStorage.getItem('rd')) || [];
    const foundItem = rdArray.find(item => item.id === idToCompare);
    return foundItem ? foundItem.que : null; 
  };
  
  const getOptValuesFromIds = (idsString) => {
    const rd1Data = JSON.parse(localStorage.getItem('rd1')) || [];
    const idsArray = idsString.split(',').map(Number);
    const optValues = rd1Data
      .filter(item => idsArray.includes(item.id) && item.isvisi === 1)
      .map(item => item.opt);
    return optValues.join(','); 
  };
  
    const createFinalHistory = (historyArray) => {
      if (historyArray.length === 0) return [];
      
      console.log("historyArray", historyArray[0]);
    
      const finalHistory = {
        serialjobno: historyArray[0].serialjobno || "N/A",
        barcode: historyArray[0].barcode || "N/A",
        statusid: historyArray[0].statusid || "N/A",
        locationid: historyArray[0].locationid || "N/A",
        empname: historyArray[0].empname || "N/A",
        que_opt: {}
      };
    
      console.log("historyArray", historyArray);
    
      historyArray.forEach(item => {
      
        if (item.queid !== null && item.optids !== null) {
          console.log("item.optids", item.optids);
          const question = getQueById(item.queid) || "N/A";
          finalHistory.que_opt[question] = getOptValuesFromIds(item.optids) || "N/A";
        } else {
          console.log("Skipping item with null queid or optids");
        }
      });
    
      return [finalHistory];
    };
    

    
  const handleToggleScanner = () => {
    setShowDetails(false);
    setHasCamera(true);
  };

  const handleChange = (e) => {
    setBarcode(e.target.value);
    setErrorMessage('');
  };

 
  
  const productData = data;
  const fulllink = productData && imglink && ukeylink ? `${imglink}/${ukeylink}${productData.imgpath}` : '';
  const metaltype = productData?.MetalType1?.split(' ')[0] ?? "";

  return (
    <div className="flex flex-col w-full p-4 transform transition-all duration-300 ease-in-out">
      {showDetails ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <button className="p-2 bg-gray-500 text-white rounded" onClick={handleToggleScanner}>
              <MdOutlineQrCodeScanner size={24} />
            </button>
            {productData && <h3 className="text-2xl font-bold text-gray-700">{productData.jobserialno}</h3>}
            <button className="p-2 bg-gray-500 text-white rounded" onClick={togglepanel}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          {productData ? (
            <div className="space-y-6 w-lg">
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-800">
                  ({productData.designno}) for <span className="text-blue-500">{productData.CustomerCode}</span>
                </p>
              </div>
              <div className="w-[16rem] flex justify-center mb-4">
              <div className="w-56 h-56 rounded-lg shadow-lg flex items-center justify-center bg-gray-200">
      {imgError || !fulllink ? (
       
        <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-lg">
          <FaGem className="text-4xl text-gray-500" /> 
        </div>
      ) : (
      
        <img
          src={fulllink}
          alt="Product"
          className="w-56 h-5w-56 object-cover rounded-lg shadow-lg"
          onError={() => setImgError(true)} 
        />
      )}
    </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-600">
                  {productData.MetalType} {productData.MetalColor} <span className="text-[#9369ba]">{metaltype}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Gross Wt", value: productData.GrossWeightgm, subValue: productData.estmatedGrossWt || '0' },
                  { label: "Net Wt", value: productData.NetWtgm, subValue: productData.estmatedNetWt || '0' },
                  { label: "Dia (Wt/Pc)", value: `${productData.Diamond_actualctw} | ${productData.Diamond_actualpcsused}`, subValue: `${productData.estmatedDiamondctw || '0'} | ${productData.estmatedDiamondpcs || '0'}` },
                  { label: "Cs (Wt/Pc)", value: `${productData.ColorStone_actualctw} | ${productData.ColorStone_actualpcsused}`, subValue: `${productData.estmatedColorstonectw || '0'} | ${productData.estmatedcolorstonepcs || '0'}` },
                  { label: "Misc (Wt/Pc)", value: `${productData.Misc_actualctw} | ${productData.Misc_actualpcsused}`, subValue: `${productData.estmatedMiscctw || '0'} | ${productData.estmatedMiscPcs || '0'}` },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                    <span className="block text-sm text-gray-400">{item.label}</span>
                    <span className="block text-lg font-semibold text-blue-500">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    Status:
                    <span className={`px-4 pl-1 py-2 rounded-md font-semibold ${
                      productData.qccurrentstatus === 'Approved' ? 'text-xl text-green-600' :
                      productData.qccurrentstatus === 'Rejected' ? 'text-xl text-red-600' :
                      productData.qccurrentstatus === 'Pending' ? 'text-xl text-yellow-500' :
                      'text-xl text-gray-300'
                    }`}>
                      {productData.qccurrentstatus}
                    </span>
                  </span>
                </div>
              </div>
              <div className='w-full flex justify-center'>
              {history.length > 0 && (
                <button
                className="mt-6 p-3 bg-[#9369ba] text-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center justify-center"
                onClick={handlemodalopen}
              >
                <FaCheckCircle className="mr-2 text-lg" />
                Show Last QC Status
              </button>
               
              )}
              </div>
            </div>
          ) : (
            <div className='w-lg h-full flex justify-center'>
              <p>No Data Available</p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-lg flex flex-col items-center justify-center  pt-2">
          <div className="flex justify-end w-full items-center mb-4">
            <button className="p-2 bg-gray-500 text-white rounded" onClick={togglepanel}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          {hasCamera ? (
            <div className="h-64 w-64 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg mx-auto">
              <video ref={videoRef} style={{ width: '16rem', height: '16rem' }} />
            </div>
          ) : (
            <div className="relative h-64 w-64 bg-gray-50 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
              <img src={Scannericon} alt="scanner" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 w-full h-1 bg-red-500 animate-scanner-line"></div>
              </div>
              <button onClick={handleToggleScanner} className="relative z-10 p-4 bg-[#f9fafb] text-indigo-500 text-xl font-bold">
                Click here to scan
              </button>
            </div>
          )}
          <div className='h-[1.5rem] my-4'>
            {errorMessage && <p className="text-red-600 text-base text-center">{errorMessage}</p>}
          </div>
          <div>
            <form onSubmit={(e) => { e.preventDefault(); handleCodeSubmit(barcode); }} className="flex flex-col items-center">
              <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full">
                <input
                  type="text"
                  className="p-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Enter job#"
                  value={barcode}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className={`bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 font-semibold rounded-r-lg hover:bg-green-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? <ClipLoader size={20} color="#fff" /> : 'Go'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideDetails;
