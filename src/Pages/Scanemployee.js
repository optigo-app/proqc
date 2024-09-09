import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-barcode-scanner';
import { FaQrcode } from 'react-icons/fa';
import Scannericon from '../Assets/Qrcode.png';
import { useRecoilValue } from 'recoil';
import { MdOutlineArrowBackIos } from "react-icons/md";
import { rd3State, rd4State,YearCodeState } from '../Recoil/FetchDataComponent';
import { FaTimes } from 'react-icons/fa';

const Scanemp = () => {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState('');
  const [scannedCode, setScannedCode] = useState('');
  const [hasCamera, setHasCamera] = useState(true);
  const[qcdept,setQcdept]=useState();
  const[employeeid,setEmployeeid]=useState();
  const[eventid,setEventid]=useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
const [modalButtons, setModalButtons] = useState([]);

  const yc = useRecoilValue(YearCodeState) || JSON.parse(localStorage.getItem('yearcode'));
  const rd4 = useRecoilValue(rd4State);


console.log("rd4",rd4);
console.log("YearCodeState",yc);

  const handleScan = (result) => {
    if (result) {
      setScannedCode(result.text);
      setBarcode(result.text);
      sendBarcodeToAPI(result.text);
    }
  };

  const handleError = () => {
    setHasCamera(false);
  };

  const handleChange = (e) => {
    setBarcode(e.target.value);
    setScannedCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendBarcodeToAPI(barcode);
  };

  
  const sendBarcodeToAPI = (barcode) => {
    const myHeaders = {
      Authorization: "9726350724901930",
      Yearcode: yc,
      Version: "qcv1",
      sp: "4",
      domain: "",
      "Content-Type": "application/json",
      Cookie: "ASP.NET_SessionId=ljibz2nmt0ws5yjwvc3w5fci",
    };
  
    const raw = JSON.stringify({
      con: "{\"id\":\"\",\"mode\":\"SCANEMP\",\"appuserid\":\"kp23@gmail.com\"}",
      p: "eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2tpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=",
      dp: `{\"empbarcode\":\"${barcode}\",\"FrontEnd_RegNo\":\"\",\"Customerid\":\"\"}`,
    });
  
    axios.post('https://api.optigoapps.com/ReactStore/ReactStore.aspx', raw, { headers: myHeaders })
      .then((response) => {
        const qcdepartment = response.data.Data.rd[0].qcdept.split(',');
        const empid = response.data.Data.rd[0].emp_id;
        setEmployeeid(empid);
        const eveid = response.data.Data.rd[0].eventid;
        setEventid(eveid);
        setTimeout(() => {
            setEventid(eveid);
        }, 10);
        const filteredQcdeptNames = rd4
          .filter(item => qcdepartment.includes(item.id.toString()))
          .map(item => item.qcdeptname);
  
        const filteredQcdeptIds = rd4
          .filter(item => qcdepartment.includes(item.id.toString()))
          .map(item => item.id);
  
        setQcdept(filteredQcdeptNames);
  
        if (filteredQcdeptNames.length > 1) {
          setModalButtons(filteredQcdeptNames);
          setIsModalOpen(true);
        } else if (filteredQcdeptNames.length === 1) {
          const qcdeptId = filteredQcdeptIds[0];
          navigate(`/ScannerPage?QCID=${btoa(qcdeptId)}&empbarcode=${btoa(barcode)}&employeeid=${btoa(employeeid)}&eventid=${btoa(eveid)} `);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  
  const handlebuttonclick = (qcdeptId) => {
    // navigate(`/ScannerPage?QCID=${btoa(qcdeptId)}&empbarcode=${btoa(barcode)}&employeeid=${btoa(employeeid)}&eventid=${btoa(eventid)}  `);
    navigate(`/ScannerPage?QCID=${btoa(qcdeptId)}&empbarcode=${btoa(barcode)}&employeeid=${btoa(employeeid)}&eventid=${btoa(0)}  `);
  }
    
  const Modal = ({ buttons, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 p-4 md:p-20 bg-opacity-30 z-50">
      <div className="bg-white  p-6 rounded-lg shadow-lg w-full h-full  flex flex-col justify-center items-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition duration-200"
        >
          <FaTimes size={20} />
        </button>
        <h3 className="text-3xl font-bold mb-4 text-center text-gray-600">Select QC Department</h3>
        <div className="flex flex-wrap  gap-4">
          {buttons.map(({ name, id }) => (
            <button
              key={id}
              onClick={() => handlebuttonclick(id)}
              className="bg-gradient-to-r from-blue-100 via-indigo-50  text-lg h-44 w-44 to-green-100 text-black px-4 py-2 rounded-lg hover:from-green-200 hover:text-white font-normal hover:via-indigo-200 hover:to-blue-200 transition duration-200"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );



  

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-50  to-green-100 p-4">
    
      <div className="w-full max-w-lg flex flex-col justify-center bg-white rounded-lg shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Scan Employee here</h2>
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
            <img src={Scannericon} alt="Scanner" className="h-full w-full object-contain" />
          </div>
        )}

        <div className="mt-6">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full">
              <input
                type="text"
                className="p-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter Employee Code"
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
        {isModalOpen && (
        <Modal
        buttons={modalButtons.map(name => ({ name, id: rd4.find(item => item.qcdeptname === name)?.id }))}
        onClose={() => setIsModalOpen(false)}
      />
      
      )}
      </div>
    </div>
  );
};

export default Scanemp;

// import React from 'react'

// const Scanemp = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Scanemp
