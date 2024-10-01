
// this is in saperated card view ull but noiw i dont want to look it saperate cards i dont want ANYTHING TO LOOK LIKE A CARD .. I WANT TO LOOK LIKE S GOOD AND ATTRACTIVE SCREEN UI THAT SCANS THE JOB AND RFBAG AND SHOW  ITS DETAILS AND SUMMERY DETAILS IF JOB ... IN SHORT IS IS KIND OF SCAN AND SHOW DETAILS KIND OF SCREEN UI ... sHOW PROVIDED DATA AS PER CASES .. ALSO USE FLEX INSTEAD OF GRID AND REMOVE THAT CARDVIEW MKING IT ATTRACTIVE AND EYE PLEASEING PLEASE AND KEEP IT RESPONSIVE
import React, { useState, useEffect, useRef } from 'react';
import { FaQrcode, FaUser, FaBriefcase, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import QrScanner from 'qr-scanner';
import { ClipLoader } from 'react-spinners';
import ScannerIcon from '../../Assets/Qrcode.png';
import img from '../../Assets/Jew.jpg';
import '../../components/Scanner.css';

export default function JobScan() {
const [scannedCode, setScannedCode] = useState('');
const [jobDetails, setJobDetails] = useState(null);
const [rfBagDetails, setRfBagDetails] = useState(null);
const [activeTab, setActiveTab] = useState('summary');
const [mountWeight, setMountWeight] = useState('');
const [scrap,setScrap] = useState(0);
const [pcs, setPcs] = useState('');
const [hasCamera, setHasCamera] = useState(true);
const [barcode, setBarcode] = useState('');
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

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current = null;
      }
    };
  }, [hasCamera]);

  const handleScan = (result) => {
    if (result) {
      setBarcode(result);
      setHasCamera(false);
      handleCodeSubmit(result);
      handleScanSubmit(result);
    }
  };

  const handleCodeSubmit = async (scannedCode) => {
    if (barcode.trim() === '') {
      setErrorMessage('Please enter the Job#.');
      return;
    }
  };

  const handleToggleScanner = () => {
    setHasCamera(true);
  };

  const handleChange = (e) => {
    setScannedCode(e.target.value); 
    setBarcode(e.target.value);
    setErrorMessage('');
  };

  const jobData = [
    {
      jobId: "1/266040",
      name: "GOLD 10K Shine Gold",
      designNumber: "FD4",
      serialFor: "WOMENS",
      image: img,
      customerName: "ashok01",
      poNumber: "100 jobs for testing",
      lastReceived: "1.000 Gm",
      currentStatus: "Filing-Issue",
      location: "INDIA",
      jobFlag: 'Issue',
    },
    { 
      jobId: "1/266041",
      name: "GOLD 18K Shine Yellow",
      designNumber: "NEW-COP",
      serialFor: "Titan Earring",
      image: img,
      customerName: "amolpatil",
      poNumber: "15030",
      lastReceived: "0.000 Gm",
      currentStatus: "EC QC1-Issue",
      location: "INDIA",
      jobFlag: 'Return',
    }
  ];

  const rfBags = [
    {
      rfbagid: "0000008992",
      Material: "METAL",
      Type: "GOLD",
      Color: "YELLOW",
      Purity: "14K",
      Gm: "16.912/16.912"
    },
    {
      rfbagid: "0000009399",
      Lot: "1",
      Material: "DIAMOND",
      Shape: "ROUND",
      Color: "IJ",
      Size: "MIX",
      Clarity: "SI",
      Ctw: "97/100"
    }
  ];

  const handleScanSubmit = () => {
    const isJobId = scannedCode.startsWith("1/") && scannedCode.length > 2;
    if (isJobId) {
      const jobFound = jobData.find(job => job.jobId === scannedCode);
      if (jobFound) {
        setJobDetails(jobFound);
        setRfBagDetails(null);
      } else {
        alert("Job ID not found.");
      }
    } else if (scannedCode.length === 10) {
      const rfBagFound = rfBags.find(bag => bag.rfbagid === scannedCode);
      if (rfBagFound) {
        setRfBagDetails(rfBagFound);
        setJobDetails(null);
      } else {
        alert("RF Bag ID not found.");
      }
    } else {
      alert("Invalid code.");
    }
  };

  const renderJobDetails = () => (
    jobDetails && (
      <div className="bg-white w-full flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform p-4">
     <div className='flex flex-col w-full'>
     <div className='flex w-full flex-row'>
        <div className="md:flex md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48 rounded-lg shadow-md" src={jobDetails.image} alt="Job" />
        </div>
        <div className="p-4 flex-grow">
          <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold"><strong>{jobDetails.jobId}</strong></div>
          <h2 className="mt-2 text-2xl leading-tight font-bold text-gray-500"><strong>{jobDetails.name}</strong></h2>
          <p className="mt-2 text-gray-700 flex items-center">Design: <span className="font-medium ml-2"><strong>{jobDetails.designNumber}</strong></span></p>
          <p className="text-gray-700 flex items-center">Customer: <span className="font-medium ml-2"><strong>{jobDetails.customerName}</strong></span></p>
          <p className="text-gray-700 flex items-center">PO: <span className="font-medium ml-2"><strong>{jobDetails.poNumber}</strong></span></p>
          <p className="text-gray-700 flex items-center">Status: <span className="font-medium ml-2"><strong>{jobDetails.currentStatus}</strong></span></p>
          <p className="text-gray-700 flex items-center">Location: <span className="font-medium ml-2"><strong>{jobDetails.location}</strong></span></p>
        </div>
        </div>
        <div>
     
    {jobDetails.jobFlag === 'Return' && (     <div className="px-6 py-4  rounded-lg shadow-inner w-fit lg:max-w-2xl ">
            <select className="w-full p-2 border bg-slate-200 font-bold rounded-lg mb-4 focus:border-indigo-600 focus:ring focus:ring-indigo-200" disabled>
              <option>Filing</option>
            </select>
            <div className='flex flex-row gap-3'>
              
            <button
              onClick={() => {
                alert("Job successfully returned");
                setJobDetails(null);
              }}
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600 transition duration-300 w-full"
            >
              Return
            </button> 
            <button
              onClick={() => {
                setJobDetails(null);
              }}
              className="bg-slate-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600 transition duration-300 w-full"
            >
              Cancel
            </button> 
            </div>
          </div>)}
        </div>
     </div>
  
    
     {jobDetails.jobFlag === 'Issue' && (
          <div className="px-6 py-4 bg-indigo-50 rounded-lg shadow-inner w-full lg:max-w-2xl ">
            <h3 className="text-lg font-semibold mb-2 text-indigo-600">Issue Job</h3>
            <select className="w-full p-2 border rounded-lg mb-4 focus:border-indigo-600 focus:ring focus:ring-indigo-200">
              <option>Select Department</option>
              <option value="Filing">Filing</option>
              <option value="Casting">Casting</option>
              <option value="Polishing">Polishing</option>
            </select>
            <button
              onClick={() => {
                alert("Job successfully issued");
                setJobDetails(null);
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
            >
              Issue Job <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}
        {jobDetails.jobFlag === 'Return' && (
          <div className="md:w-full w-full return-details bg-gray-100 p-6 rounded-lg shadow">
       
            <div className="grid grid-cols-2 gap-4 mt-4">
              <p>Alloy Wt:<strong><span>0.000</span></strong></p>
              <p>Lab Grown:<strong><span>0.000</span></strong></p>
              <p>Diamond:<strong><span>0.000</span></strong></p>
              <p>Color Stone:<strong><span>0.000</span></strong></p>
              <p>Misc:<strong><span>0.000</span></strong></p>
              <p>Current Net:<strong><span>0.000</span></strong></p>
              <p>Current Gross:<strong><span>0.000</span></strong></p>
              <hr className="my-2 border-gray-300 col-span-2" />
              <p>Loss Weight: <strong><span>0.000</span></strong></p>
              <p>Actual Loss:<strong><span>0.000</span></strong></p>
              <p>Scrap Loss:<strong><span>0.000</span></strong></p>
              <hr className="my-2 border-gray-300 col-span-2" />
              <p>Exp Loss:<strong><span>0</span></strong></p>
              <p>Max Loss %:<strong><span>0</span></strong></p>
            </div>
           <div className='flex flex-row mt-4  w-fit justify-between align-middle items-center gap-4'>
           <p>Scrap :</p>
           
             <input
              type="number"
              value={scrap}
              onChange={(e) => setScrap(e.target.value)}
              placeholder="Enter  scrap"
              className="border p-2  rounded-lg w-fit focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
                       </div>
          
          </div>
        )}
      </div>
    )
  );
  
  const renderRfBagDetails = () => (
    rfBagDetails && (
      <div className="bg-white w-full shadow-lg rounded-lg overflow-hidden mt-0 md:mt-0 transition-all duration-300 ease-in-out transform hover:scale-102">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">RF Bag Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>RF Bag ID:</strong> {rfBagDetails.rfbagid}</p>
            <p><strong>Material:</strong> {rfBagDetails.Material}</p>
            <p><strong>Type:</strong> {rfBagDetails.Type}</p>
            <p><strong>Color:</strong> {rfBagDetails.Color}</p>
            <p><strong>Purity:</strong> {rfBagDetails.Purity}</p>
            <p><strong>Weight:</strong> {rfBagDetails.Gm}</p>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Material Requirements</h3>
            <input
              type="number"
              value={mountWeight}
              onChange={(e) => setMountWeight(e.target.value)}
              placeholder="Enter Required Weight (Gm)"
              className="w-full p-2 border rounded mb-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
            <input
              type="number"
              value={pcs}
              onChange={(e) => setPcs(e.target.value)}
              placeholder="Enter Number of Pieces"
              className="w-full p-2 border rounded mb-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
            <button
              onClick={() => {
                alert(`Weight: ${mountWeight} Gm, Pieces: ${pcs}`);
              }}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center justify-center"
            >
              Save Material Requirements <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transition-all duration-300 ease-in-out transform hover:scale-102">
              <div className="w-full flex flex-col items-center justify-center pt-2">
                {hasCamera ? (
                  <div className="w-64 h-64 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                    <video ref={videoRef} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="relative h-64 w-64 bg-gray-50 rounded-lg shadow-lg overflow-hidden flex items-center justify-center" onClick={handleToggleScanner}>
                    <img src={ScannerIcon} alt="scanner" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-0 w-full h-1 bg-red-500 animate-scanner-line"></div>
                    </div>
                  </div>
                )}
                <div className='h-[1.5rem] my-4'>
                  {errorMessage && <p className="text-red-600 text-base text-center">{errorMessage}</p>}
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleCodeSubmit(barcode); }} className="w-full">
                  <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full">
                    <input
                      type="text"
                      className="p-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Enter Code"
                      value={scannedCode}
                      onChange={handleChange}
                    />
                    <button
                      onClick={handleScanSubmit}
                      className={`bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white px-6 py-3 font-semibold rounded-r-lg hover:bg-green-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={loading}
                    >
                      {loading ? <ClipLoader size={20} color="#fff" /> : (
                        <>
                          <FaQrcode className="mr-2" /> Scan
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transition-all duration-300 ease-in-out transform hover:scale-102">
              <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
              <div className="space-y-2">
                <p><FaUser className="inline mr-2 text-indigo-500" /> Pradeep Varma</p>
                <p><FaBriefcase className="inline mr-2 text-indigo-500" /> Filing</p>
                <p><FaCheckCircle className="inline mr-2 text-green-500" /> Active</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2  ">
            {renderJobDetails()}
            {renderRfBagDetails()}
            {jobDetails && (
              <div className="bg-white mt-5 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('summary')}
                    className={`flex-1 py-2 px-4 rounded transition duration-300 ${activeTab === 'summary' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`flex-1 py-2 px-4 rounded transition duration-300 ${activeTab === 'details' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    Details
                  </button>
                </div>
                <div className="p-6 bg-white rounded-lg shadow mt-4">
                  {activeTab === 'summary' ? (
                    <p>This is the summary tab content.</p>
                  ) : (
                    <p>This is the details tab content.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
