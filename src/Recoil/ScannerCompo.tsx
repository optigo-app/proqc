import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-barcode-scanner';
import { atom, useRecoilState } from 'recoil';
import axios from 'axios';
import Scannericon from '../Assets/Qrcode.png';
import '../components/Sacnner.css';


export const rdState = atom({ key: 'rdState', default: [] });
export const rd1State = atom({ key: 'rd1State', default: [] });
export const rd2State = atom({ key: 'rd2State', default: [] });
export const rd3State = atom({ key: 'rd3State', default: [] });
export const rd4State = atom({ key: 'rd4State', default: [] });
export const rd5State = atom({ key: 'rd5State', default: [] });
export const YearCodeState = atom({ key: 'YearCodeState', default: '' });
export const tokenState = atom({ key: 'tokenState', default: '' });
export const UploadLogicalPathState = atom({ key: 'UploadLogicalPathState', default: '' });
export const ukeyState = atom({ key: 'ukeyState', default: '' });

const ScannerCompo = () => {
  const navigate = useNavigate();
  const [hasCamera, setHasCamera] = useState(true);
  const [scannedCode, setScannedCode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, settoken] = useRecoilState(tokenState);
  const [rd, setRd] = useRecoilState(rdState);
  const [rd1, setRd1] = useRecoilState(rd1State);
  const [rd2, setRd2] = useRecoilState(rd2State);
  const [rd3, setRd3] = useRecoilState(rd3State);
  const [rd4, setRd4] = useRecoilState(rd4State);
  const [rd5, setRd5] = useRecoilState(rd5State);
  const [yearCode, setYearCode] = useRecoilState(YearCodeState);
  const [uploadLogicalPath, setUploadLogicalPath] = useRecoilState(UploadLogicalPathState);
  const [ukey, setUkey] = useRecoilState(ukeyState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOptionSelect = (option) => {
    console.log(`Selected option: ${option}`);
    setIsModalOpen(false);
    // Handle navigation or other logic here
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
    setErrorMessage('There is some error scanning the code, please type the code manually.');
  };

  const handleChange = (e) => {
    setBarcode(e.target.value);
    setScannedCode(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `9726350724901930`,
            Yearcode: '',
            Version: 'qcv1',
            sp: '4',
            domain: '',
            'Content-Type': 'application/json',
            Cookie: 'ASP.NET_SessionId=ro1minpbubgu5dw0tejcii4a',
          },
        };

        const data = {
          con: '{"id":"","mode":"INITQC","appuserid":"kp23@gmail.com"}',
          p: 'eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2dpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=',
          dp: '{"empbarcode":"","deviceid":"DeviceID_SMIT1","deviceName":"DeviceName_SMIT1","brand":"mybrand","model":"mymodel","manufacturer":"mymanufacturer","appver":"appver1", "appvercode":"22","device_type":"android/ios","onesignal_uid":"abc123_onesignal_uid"}',
        };

        const response = await axios.post('https://api.optigoapps.com/ReactStore/ReactStore.aspx', data, config);
        const responseData = response.data.Data.rd[0].yearcode;
        const UploadLogicalPathData = response.data.Data.rd[0].UploadLogicalPath;
        const ukeyData = response.data.Data.rd[0].ukey;
        setYearCode(responseData);
        setUploadLogicalPath(UploadLogicalPathData);
        setUkey(ukeyData);
        localStorage.setItem('yearCode', responseData);
        localStorage.setItem('UploadLogicalPath', UploadLogicalPathData);
        localStorage.setItem('ukey', ukeyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setYearCode, setUploadLogicalPath, setUkey]);

  useEffect(() => {
    if (!yearCode) return;

    const headers = {
      Authorization: '9726350724901930',
      Yearcode: yearCode,
      Version: 'qcv1',
      sp: '4',
      domain: '',
      'Content-Type': 'application/json',
      Cookie: 'ASP.NET_SessionId=i4btgm10k555buulfvmqyeyc',
    };

    const data = {
      con: '{"id":"","mode":"GETMASTER","appuserid":"kp23@gmail.com"}',
      p: 'eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2dpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=',
      dp: '{"PackageId":"1","FrontEnd_RegNo":"80kgizbiduw5e7gg","Customerid":"10"}',
    };

    axios
      .post('https://api.optigoapps.com/ReactStore/ReactStore.aspx', data, { headers })
      .then((response) => {
        const responseData = response.data.Data;

        setRd(responseData.rd);
        setRd1(responseData.rd1);
        setRd2(responseData.rd2);
        setRd3(responseData.rd3);
        setRd4(responseData.rd4);
        setRd5(responseData.rd5);
        localStorage.setItem('rd', JSON.stringify(responseData.rd));
        localStorage.setItem('rd1', JSON.stringify(responseData.rd1));
        localStorage.setItem('rd2', JSON.stringify(responseData.rd2));
        localStorage.setItem('rd3', JSON.stringify(responseData.rd3));
        localStorage.setItem('rd4', JSON.stringify(responseData.rd4));
        localStorage.setItem('rd5', JSON.stringify(responseData.rd5));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [yearCode, setRd, setRd1, setRd2, setRd3, setRd4, setRd5]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-50 to-green-100 p-4">
      <div className="w-full max-w-lg flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Scan here</h2>
        {hasCamera ? (
          <div className="h-64 w-64 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg mx-auto">
            {/* <QrReader
              delay={300}
              onScan={handleScan}
              onError={handleError}
              style={{ width: '100%', height: '100%' }}
            /> */}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <h3 className="text-lg font-semibold mb-4">Select an Event</h3>
            <div className="flex justify-around mb-4">
              <button
                onClick={() => handleOptionSelect('Sales')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              >
                Sales
              </button>
              <button
                onClick={() => handleOptionSelect('Production')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Production
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScannerCompo;
