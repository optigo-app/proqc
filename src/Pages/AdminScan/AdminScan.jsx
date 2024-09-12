import React, { useEffect, useRef, useState } from 'react';
import './AdminScan.css';
import QrScanner from 'qr-scanner';
import { useNavigate } from 'react-router-dom';
import { Base64 } from 'js-base64';

const AdminScan = () => {
  const scanner = useRef(null); 
  const videoEl = useRef(null); 
  const [qrOn, setQrOn] = useState(true);
  const [scannedResults, setScannedResults] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const APIURL = 'http://api.optigoapps.com/ReactStore/ReactStore.aspx';

  const handleAPIRequest = async (decodedString) => {
    if (decodedString) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', decodedString);
      myHeaders.append(
        'Yearcode',
        'e3tsaXZlLm9wdGlnb2FwcHMuY29tfX17ezIwfX17e3Rlc3Q2OH19e3t0ZXN0Njh9fQ=='
      );
      myHeaders.append('Version', "v1");
      myHeaders.append('sp', '4');
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Cookie',
        'ASP.NET_SessionId=jhxfrdb2x4c5wfoiowdzmowk'
      );

      const body = {
        con: '{"id":"","mode":"INITQC","appuserid":"kp23@gmail.com"}',
        p: 'eyJQYWNrYWdlSWQxIjoiMSIsIkZyb250RW5kX1JlZ05vMSI6Ijgwa2dpemJpZHV3NWU3Z2ciLCJDdXN0b21lcmlkMSI6IjEwIn0=',
        dp: '{"empbarcode":"","deviceid":"DeviceID_SMIT1","deviceName":"DeviceName_SMIT1","brand":"mybrand","model":"mymodel","manufacturer":"mymanufacturer","appver":"appver1","appvercode":"22","device_type":"android/ios","onesignal_uid":"abc123_onesignal_uid"}',
      };

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow',
      };

      try {
        const response = await fetch(APIURL, requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        console.log('API Response:', data);
        navigate('/empscan');
      } catch (error) {
        console.error('API Request Error:', error);
      }
    }
  };

  const onScanSuccess = (result) => {
    if (result?.data) {
      const decodedString = Base64.decode(result.data);
      setScannedResults(decodedString); 
      setShowModal(true);
      console.log('Scanned QR Code:', decodedString);
      setErrorMessage(''); 
    }
  };

  const onScanFail = (err) => {
    console.error('Scan Error:', err);
    if (err.message.includes('Camera not found')) {
      setErrorMessage('ERROR: Camera not found. Please check your camera settings.');
    } else {
      setErrorMessage('An error occurred while scanning. Please try again.');
    }
  };

  useEffect(() => {
    if (videoEl.current) {
      scanner.current = new QrScanner(
        videoEl.current,
        onScanSuccess, 
        { onDecodeError: onScanFail, highlightScanRegion: true, preferredCamera: 'environment' }
      );

      scanner.current
        .start()
        .then(() => {
          setQrOn(true); 
        })
        .catch((err) => {
          setQrOn(false);
          console.error('Camera Error:', err);
          setErrorMessage('ERROR: Camera access failed. Please check your browser settings.');
        });
    }

    return () => {
      if (scanner.current) {
        scanner.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert('Camera is blocked or not accessible. Please allow camera in your browser permissions and reload.');
    }
  }, [qrOn]);

  return (
    <div className="backImg_container">
      <div className="main_container">
        <div className="scaneBoxMain">
          <video ref={videoEl} className="scanneBox_video" />
        </div>

        <h3 style={{ fontFamily: 'sans-serif', fontWeight: 500 }}>Get Connected by scanning QR Code in OptigoApps</h3>
        <h3 style={{ fontFamily: 'sans-serif' }}>{`(System Admin > My Device > Setup)`}</h3>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h4 style={{ fontFamily: 'sans-serif' }}>Scanned QR Code:</h4>
              <p>{scannedResults}</p>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminScan;
//  in this code do one thing if there is some error while scanning show a text field at screen in that user can type and add the code 