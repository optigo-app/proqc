import React, { useState, useRef, useEffect } from 'react';
import Scannericon from '../../Assets/Qrcode.png';
import img from '../../Assets/Jew.jpg';
import '../../components/Scanner.css';
import QrScanner from 'qr-scanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 
import ClipLoader from 'react-spinners/ClipLoader';
const JobScan = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [jobDetailsVisible, setJobDetailsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [hasCamera, setHasCamera] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

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

    const handleScan = (result) => {
      if (result) {
        setBarcode(result);
        setHasCamera(false);
        handleCodeSubmit(result);
      }
    };
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current = null;
      }
    };
  }, [hasCamera]);

  const togglepanel = () => {
    console.log('Toggling panel'); // Add your logic to toggle the panel
  };

  const handleCodeSubmit = (code) => {
    if (code.length === 10) {
      // If the code is an RF Bag ID
      console.log('RF Bag ID:', code);
      // Add your logic to show RF Bag details
    } else if (code.startsWith('1/')) {
      // If the code is a Job ID
      console.log('Job ID:', code);
      // Add your logic to show job details
      setJobDetailsVisible(true);
    } else {
      setErrorMessage('Invalid code. Please try again.');
    }
  };

  const handleToggleScanner = () => {
    setHasCamera(!hasCamera); // Add logic to toggle the scanner on and off
  };

  const handleChange = (e) => {
    setBarcode(e.target.value);
    setErrorMessage('');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <div className="w-full max-w-lg flex flex-col items-center justify-center pt-2">
        <div className="flex justify-end w-full items-center mb-4">
          <button className="p-2 bg-gray-500 text-white rounded" onClick={togglepanel}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>

        {hasCamera ? (
          <div className="w-64 h-64 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="relative h-64 w-64 bg-gray-50 rounded-lg shadow-lg overflow-hidden flex items-center justify-center" onClick={handleToggleScanner}>
            <img src={Scannericon} alt="scanner" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 w-full h-1 bg-red-500 animate-scanner-line"></div>
            </div>
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
                placeholder="Enter job# or RF Bag#"
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
    </div>
  );
};

export default JobScan;
