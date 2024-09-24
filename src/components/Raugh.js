

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../components/Scanner.css';
import { IoMdExit } from 'react-icons/io';
import { ClipLoader } from 'react-spinners';
import QrScanner from 'qr-scanner';
import notiSound from "../components/sound/Timeout.mpeg";
import Sound from 'react-sound'; 
import Scannericon from '../Assets/Qrcode.png';

const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

const ScannerPage = () => {
  const navigate = useNavigate();
  const [scannedCode, setScannedCode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const [scanningEnabled, setScanningEnabled] = useState(true); 
  const companyCodeRef = useRef(null);
  const videoEl = useRef(null);
  const scanner = useRef(null);

  const queryParams = useQueryParams();
  const empcode = atob(queryParams.get('empbarcode'));
  const eveid = localStorage.getItem('eventId');
  const token = localStorage.getItem('proqctoken');
  const yc = localStorage.getItem('yearcode');
  const empfname = localStorage.getItem('empfname');
  const emplname = localStorage.getItem('emplname');
  useEffect(() => {
    if (companyCodeRef.current) {
      companyCodeRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (videoEl.current && scanningEnabled) {
      scanner.current = new QrScanner(videoEl.current, handleScan, {
        highlightScanRegion: true,
        preferredCamera: "environment",
      });
      scanner.current.start().catch((err) => {
        // setErrorMessage("Unable to access the camera.");
        setScanningEnabled(false); 
      });
    }

    return () => {
      if (scanner.current) {
        scanner.current.stop();
      }
    };
  }, [scanningEnabled]);
  useEffect(() => {
    if (playSound) {
      const soundTimeout = setTimeout(() => setPlaySound(false), 1000); 
      return () => clearTimeout(soundTimeout);
    }
  }, [playSound]);
  
  const handleScan = (result) => {
    if (result) {
      setScannedCode(result.data);
      setBarcode(result.data);
      // setPlaySound(true);
      if (!playSound) {
        setPlaySound(true);
      }    
      handleCodeSubmit(); 
        
    }
  };
  const handleCodeSubmit = async (e) => {
    e?.preventDefault();

    if (barcode.trim() === '') {
      setErrorMessage('Please enter the job number.');
      setPlaySound(true);
    } else {
      setLoading(true);
      try {
        const response = await axios.post('https://api.optigoapps.com/ReactStore/ReactStore.aspx', {
          con: "{\"id\":\"\",\"mode\":\"SCANJOB\",\"appuserid\":\"kp23@gmail.com\"}",
          p: "eyJQYWNrYWdlSW5kX1JlZ05vMSI6Ijgwa2dpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=",
          dp: JSON.stringify({
            empbarcode: empcode,
            Jobno: barcode,
            Customerid: "10",
            eventid: eveid
          })
        }, {
          headers: {
            Authorization: token,
            Yearcode: yc,
            Version: "v1",
            sp: "4",
            sv: '0',
            domain: "",
            "Content-Type": "application/json"
          }
        });

        if (response.data.Data.rd[0].stat === 1) {
          navigate(`/job-questions?QCID=${btoa(queryParams.get('QCID'))}&empbarcode=${btoa(empcode)}&jobid=${btoa(barcode)}&employeeid=${btoa(localStorage.getItem('empid'))}&eventid=${btoa(eveid)}`);
        } else {
          setErrorMessage('Job scan failed. Please check the code and try again.');
          setPlaySound(true);
        }
      } catch (error) {
        setErrorMessage('API call failed. Please try again.');
        setPlaySound(true);
      } finally {
        setLoading(false);
        setScanningEnabled(false);
      }
    }
  };
  const handleChange = (e) => {
    setBarcode(e.target.value);
    setScannedCode(e.target.value);
    setErrorMessage('');
  };
  const handleScanAgain = () => {
    setScanningEnabled(true);
    setBarcode(''); 
    setScannedCode(''); 
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-50 to-green-100 p-4">
      {playSound && (
        <Sound
          url={notiSound}
          playStatus={Sound.status.PLAYING}
          autoLoad={true} // Ensures sound is loaded in advance
          onFinishedPlaying={() => setPlaySound(false)}
        />
      )}


      <div className="w-full max-w-lg flex flex-col items-center bg-purple-50 rounded-lg shadow-2xl mb-6 p-4">
        <div className="flex items-center justify-between w-full">
          <p className="text-lg font-bold text-gray-800">
            <span className='text-[#56a4ff] font-semibold'>({empcode})</span> {empfname} {emplname}
          </p>
          <button onClick={() => navigate('/empscan')} className="flex items-center bg-red-500 text-white px-4 py-2 gap-3 rounded-lg hover:bg-red-600 transition duration-200">
            <IoMdExit size={22} /> Exit
          </button>
        </div>
      </div>

      <div className="w-full max-w-lg flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl p-8 pt-2">
        <h2 className="text-2xl font-bold text-center gap-5 mb-6 text-gray-700">Scan Job</h2>

        {scanningEnabled ? (
          <div className="h-64 w-64 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg mx-auto">
            <video ref={videoEl} className="h-full w-full object-cover"></video>
          </div>
        ) : (
          <div className="h-64 w-64 bg-white flex items-center justify-center rounded-lg shadow-lg relative overflow-hidden">
            <img src={Scannericon} alt="scanner" className="h-full w-full object-contain" />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-2 bg-red-500 animate-scanner-line"></div>
            </div>
            <button className="absolute inset-0 flex bg-gray-300 items-center justify-center text-[#8431c4] text-xl font-bold" onClick={handleScanAgain}>
              <p className='bg-gray-300 h-7 '>Click here to scan </p>
            </button>
          </div>
        )}

        {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
        <div className="mt-6">
          <form onSubmit={handleCodeSubmit} className="flex flex-col items-center">
            <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full">
              <input
                type="text"
                className="p-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter job#"
                value={barcode}
                onChange={handleChange}
                ref={companyCodeRef}
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
    </div>
  );
};

export default ScannerPage;
