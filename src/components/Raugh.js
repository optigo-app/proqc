import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-barcode-scanner';
import { FaQrcode, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import Scannericon from '../Assets/Qrcode.png';
import { useRecoilValue } from 'recoil';
import { rd4State } from '../Recoil/FetchDataComponent';
import { ClipLoader } from 'react-spinners';

const Scanemp = () => {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState('');
  const [scannedCode, setScannedCode] = useState('');
  const [hasCamera, setHasCamera] = useState(true);
  const [qcdept, setQcdept] = useState([]);
  const [employeeid, setEmployeeid] = useState();
  const [eventid, setEventid] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalButtons, setModalButtons] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState('');
  const [isSlideVisible, setIsSlideVisible] = useState(false);

  const yc = localStorage.getItem('yearcode');
  const token = localStorage.getItem('proqctoken');
  const rd4 = useRecoilValue(rd4State);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (errorMessage) {
        setErrorMessage('');
        setBarcode('');
        setScannedCode('');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleScan = (result) => {
    if (result) {
      setScannedCode(result.text);
      setBarcode(result.text);
    }
  };

  const handleError = () => {
    setHasCamera(false);
  };

  const handleChange = (e) => {
    setBarcode(e.target.value);
    setScannedCode(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (barcode.trim() === '') {
      setErrorMessage('Please enter a valid barcode.');
    } else {
      setIsSlideVisible(true); 
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin.trim() === '') {
      setErrorMessage('Please enter your PIN.');
    } else {
      senddatatoapi(barcode, pin);
    }
  };

  const senddatatoapi = (barcode, pin) => {
    setLoading(true);
    const myHeaders = {
      Authorization: token,
      Yearcode: yc,
      Version: "v1",
      sp: "4",
      sv: "2",
      domain: "",
      "Content-Type": "application/json",
    };

    const raw = JSON.stringify({
      con: "{\"id\":\"\",\"mode\":\"SCANEMP\",\"appuserid\":\"kp23@gmail.com\"}",
      p: "eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2tpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=",
      dp: `{\"empbarcode\":\"${barcode}\",\"FrontEnd_RegNo\":\"\",\"pin\":\"${pin}\",\"Customerid\":\"\"}`,
    });

    axios.post('https://api.optigoapps.com/ReactStore/ReactStore.aspx', raw, { headers: myHeaders })
      .then((response) => {
        setLoading(false);
        const status = response.data.Data.rd[0].stat;
        if (status === 1) {
          const qcdepartment = response.data.Data.rd[0].qcdept.split(',');
          const empid = response.data.Data.rd[0].emp_id;
          const eveid = response.data.Data.rd[0].eventid;
          const fname = response.data.Data.rd[0].emp_firstname;
          const lname = response.data.Data.rd[0].emp_lastname;

          localStorage.setItem('empfname', fname);
          localStorage.setItem('emplname', lname);
          localStorage.setItem('empid', empid);

          setEmployeeid(empid);
          setEventid(eveid);

          const filteredQcdeptNames = rd4
            .filter(item => qcdepartment.includes(item.id.toString()))
            .map(item => item.qcdeptname);

          const filteredQcdeptIds = rd4
            .filter(item => qcdepartment.includes(item.id.toString()))
            .map(item => item.id);

          if (filteredQcdeptNames.length > 1) {
            setModalButtons(filteredQcdeptNames);
            setIsModalOpen(true);
          } else if (filteredQcdeptNames.length === 1) {
            const qcdeptId = filteredQcdeptIds[0];
            navigate(`/ScannerPage?QCID=${btoa(qcdeptId)}&empbarcode=${btoa(barcode)}&employeeid=${btoa(empid)}&eventid=${btoa(eveid)}`);
          }
        } else {
          setErrorMessage('Error: Invalid Employee Barcode or PIN.');
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage('Error: API call failed. Please try again.');
      });
  };

  const handlebuttonclick = (qcdeptId) => {
    navigate(`/ScannerPage?QCID=${btoa(qcdeptId)}&empbarcode=${btoa(barcode)}&employeeid=${btoa(employeeid)}&eventid=${btoa(eventid)}`);
  };

  const Modal = ({ buttons, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col justify-center items-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition duration-200"
        >
          <FaTimes size={20} />
        </button>
        <h3 className="text-3xl font-bold mb-4 text-center text-gray-600">Select QC Department</h3>
        <div className="flex flex-wrap gap-4">
          {buttons.map(({ name, id }) => (
            <button
              key={id}
              onClick={() => handlebuttonclick(id)}
              className="bg-gradient-to-r from-blue-100 via-indigo-50 text-lg h-44 w-44 to-green-100 text-black px-4 py-2 rounded-lg hover:from-green-200 hover:text-white font-normal hover:via-indigo-200 hover:to-blue-200 transition duration-200"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-50 to-green-100 p-4">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>

      {!isSlideVisible ? (
        <div className="w-full max-w-lg flex flex-col justify-center bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Scan Employee Barcode</h2>
          {hasCamera ? (
            <div className="h-64 w-64 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg mx-auto">
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          ) : (
            <div className="h-64 w-64 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg mx-auto">
              <img src={Scannericon} alt="Scanner" />
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6">
            <input
              type="text"
              value={barcode}
              onChange={handleChange}
              placeholder="Enter Barcode"
              className="border border-gray-400 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg hover:bg-gradient-to-l hover:from-green-500 hover:to-blue-500 transition duration-200"
            >
              Go
            </button>
          </form>

          {errorMessage && (
            <div className="mt-4 p-2 bg-red-100 text-red-600 text-center rounded-lg">
              {errorMessage}
            </div>
          )}
        </div>
      ) : (
        <div className={`slide-container transition-transform transform ${isSlideVisible ? 'translate-x-0' : '-translate-x-full'} w-full max-w-lg bg-white rounded-lg shadow-2xl p-8`}>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Enter PIN</h2>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="border border-gray-400 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg hover:bg-gradient-to-l hover:from-green-500 hover:to-blue-500 transition duration-200"
            >
              Submit
            </button>
          </form>

          {errorMessage && (
            <div className="mt-4 p-2 bg-red-100 text-red-600 text-center rounded-lg">
              {errorMessage}
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <ClipLoader color="green" size={60} />
        </div>
      )}

      {isModalOpen && (
        <Modal buttons={modalButtons} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Scanemp;
