import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QrReader from 'react-qr-barcode-scanner';
import axios from 'axios';
import Scannericon from '../Assets/Qrcode.png';
import '../components/Sacnner.css';

const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

const ScannerPage = () => {
  const navigate = useNavigate();
  const [hasCamera, setHasCamera] = useState(true);
  const [scannedCode, setScannedCode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const queryParams = useQueryParams();
  const qcID = queryParams.get('QCID');
  const empcode = queryParams.get('empbarcode');
  console.log('qcID', qcID);

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    if (barcode) {
      try {
        const response = await axios.post('http://zen/api/ReactStore.aspx', {
          con: "{\"id\":\"\",\"mode\":\"SCANJOB\",\"appuserid\":\"kp23@gmail.com\"}",
          p: "eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2dpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=",
          dp: JSON.stringify({
            empbarcode: empcode,
            Jobno: barcode,
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

        if (response.data.Status == 200 ) { 
          localStorage.setItem('JobData', JSON.stringify(response.data.Data.rd));
          // console.log("response.data.Data.rd",response.data.Data.rd);
          navigate(`/job-questions?QCID=${qcID}&empbarcode=${empcode}&jobid=${barcode}`);
        } else {
          setErrorMessage('Error: ' + response.data.Message); 
        }
      } catch (error) {
        setErrorMessage('API call failed. Please try again.');
        console.error(error);
      }
    }
  };

  const handleScan = (result) => {
    if (result) {
      setScannedCode(result.text);
      setBarcode(result.text);
      setErrorMessage('');
    }
  };

  const handleError = () => {
    setHasCamera(false);
    // setErrorMessage('There is some error scanning the code, please type the code manually.');
  };

  const handleChange = (e) => {
    setBarcode(e.target.value);
    setScannedCode(e.target.value);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-50 to-green-100 p-4">
      <div className="w-full max-w-lg flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Scan here</h2>
        {hasCamera ? (
          <div className="h-64 w-64 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg mx-auto">
            <QrReader
              delay={300}
              onScan={handleScan}
              onError={handleError}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : (
          <div className="h-64 w-64 bg-white flex items-center justify-center rounded-lg shadow-lg relative overflow-hidden">
            <img src={Scannericon} alt="scanner" className="h-full w-full object-contain" />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-2 bg-red-500 animate-scanner-line"></div>
            </div>
          </div>
        )}

        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        <div className="mt-6">
          <form onSubmit={handleCodeSubmit} className="flex flex-col items-center">
            <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full">
              <input
                type="text"
                className="p-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter code manually"
                value={barcode}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 font-semibold rounded-r-lg hover:bg-green-700 transition duration-200"
              >
                Go
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
