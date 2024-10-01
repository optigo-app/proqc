
import React, { useState, useEffect, useRef } from 'react';
import { FaQrcode, FaUser, FaBriefcase, FaCheckCircle, FaArrowRight, FaTimesCircle } from 'react-icons/fa';
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
  const [scrap, setScrap] = useState(0);
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
      img: img,
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
      img: img,
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
      <div className="bg-white w-full flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 p-6">
        <div className='flex flex-col w-full'>
          <div className='flex w-full flex-col md:flex-row gap-6'>
            <div className="md:flex md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48 rounded-lg shadow-md" src={jobDetails.img} alt="Job" width={192} height={192} />
            </div>
            <div className="flex-grow">
              <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold">{jobDetails.jobId}</div>
              <h2 className="mt-2 text-3xl leading-tight font-bold text-gray-900">{jobDetails.name}</h2>
              <p className="mt-2 text-gray-700 flex items-center">Design: <span className="font-medium ml-2">{jobDetails.designNumber}</span></p>
              <p className="text-gray-700 flex items-center">Customer: <span className="font-medium ml-2">{jobDetails.customerName}</span></p>
              <p className="text-gray-700 flex items-center">PO: <span className="font-medium ml-2">{jobDetails.poNumber}</span></p>
              <p className="text-gray-700 flex items-center">Status: <span className="font-medium ml-2">{jobDetails.currentStatus}</span></p>
              <p className="text-gray-700 flex items-center">Location: <span className="font-medium ml-2">{jobDetails.location}</span></p>
            </div>
          </div>
          <div className="mt-6">
            {jobDetails.jobFlag === 'Return' && (
              <div className="px-6 py-4 bg-blue-50 rounded-lg shadow-inner w-full lg:max-w-2xl">
                <select className="w-full p-2 border bg-gray-100 font-bold rounded-lg mb-4 focus:border-blue-600 focus:ring focus:ring-blue-200" disabled>
                  <option>Filing</option>
                </select>
                <div className='flex flex-row gap-3'>
                  <button
                    onClick={() => {
                      alert("Job successfully returned");
                      setJobDetails(null);
                    }}
                    className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300 w-full flex items-center justify-center"
                  >
                    <FaCheckCircle className="mr-2" /> Return
                  </button> 
                  <button
                    onClick={() => {
                      setJobDetails(null);
                    }}
                    className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition duration-300 w-full flex items-center justify-center"
                  >
                    <FaTimesCircle className="mr-2" /> Cancel
                  </button> 
                </div>
              </div>
            )}
            {jobDetails.jobFlag === 'Issue' && (
              <div className="px-6 py-4 bg-amber-50 rounded-lg shadow-inner w-full lg:max-w-2xl">
                <h3 className="text-lg font-semibold mb-2 text-amber-600">Issue Job</h3>
                <select className="w-full p-2 border rounded-lg mb-4 focus:border-amber-600 focus:ring focus:ring-amber-200">
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
                  className="w-full bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition duration-300 flex items-center justify-center"
                >
                  Issue Job <FaArrowRight className="ml-2" />
                </button>
              </div>
            )}
          </div>
          {jobDetails.jobFlag === 'Return' && (
            <div className="mt-6 w-full return-details bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Return Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <p>Alloy Wt: <strong>0.000</strong></p>
                <p>Lab Grown: <strong>0.000</strong></p>
                <p>Diamond: <strong>0.000</strong></p>
                <p>Color Stone: <strong>0.000</strong></p>
                <p>Misc: <strong>0.000</strong></p>
                <p>Current Net: <strong>0.000</strong></p>
                <p>Current Gross: <strong>0.000</strong></p>
                <hr className="my-2 border-gray-300 col-span-full" />
                <p>Loss Weight: <strong>0.000</strong></p>
                <p>Actual Loss: <strong>0.000</strong></p>
                <p>Scrap Loss: <strong>0.000</strong></p>
                <hr className="my-2 border-gray-300 col-span-full" />
                <p>Exp Loss: <strong>0</strong></p>
                <p>Max Loss %: <strong>0</strong></p>
              </div>
              <div className='flex flex-row mt-6 w-full md:w-1/2 items-center gap-4'>
                <label htmlFor="scrap" className="font-medium text-gray-700">Scrap:</label>
                <input
                  id="scrap"
                  type="number"
                  value={scrap}
                  onChange={(e) => setScrap(e.target.value)}
                  placeholder="Enter scrap"
                  className="flex-grow border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
  
  const renderRfBagDetails = () => (
    rfBagDetails && (
      <div className="bg-white w-full shadow-lg rounded-lg overflow-hidden  transition-all duration-300 ease-in-out transform hover:scale-105">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-700">RF Bag Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <p><strong className="text-gray-700">RF Bag ID:</strong> <span className="text-purple-600">{rfBagDetails.rfbagid}</span></p>
            <p><strong className="text-gray-700">Material:</strong> <span className="text-purple-600">{rfBagDetails.Material}</span></p>
            <p><strong className="text-gray-700">Type:</strong> <span className="text-purple-600">{rfBagDetails.Type}</span></p>
            <p><strong className="text-gray-700">Color:</strong> <span className="text-purple-600">{rfBagDetails.Color}</span></p>
            <p><strong className="text-gray-700">Purity:</strong> <span className="text-purple-600">{rfBagDetails.Purity}</span></p>
            <p><strong className="text-gray-700">Weight:</strong> <span className="text-purple-600">{rfBagDetails.Gm}</span></p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-purple-700">Material Requirements</h3>
            <input
              type="number"
              value={mountWeight}
              onChange={(e) => setMountWeight(e.target.value)}
              placeholder="Enter Required Weight (Gm)"
              className="w-full p-3 border rounded-lg mb-4 focus:border-purple-500 focus:ring focus:ring-purple-200"
            />
            <input
              type="number"
              value={pcs}
              onChange={(e) => setPcs(e.target.value)}
              placeholder="Enter Number of Pieces"
              className="w-full p-3 border rounded-lg mb-4 focus:border-purple-500 focus:ring focus:ring-purple-200"
            />
            <button
              onClick={() => {
                alert(`Weight: ${mountWeight} Gm, Pieces: ${pcs}`);
              }}
              className="w-full bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition duration-300 flex items-center justify-center"
            >
              Save Material Requirements <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className="w-full flex flex-col items-center justify-center pt-2">
                {hasCamera ? (
                  <div className="w-64 h-64 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                    <video ref={videoRef} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div 
                    className="relative h-64 w-64 bg-gray-50 rounded-lg shadow-lg overflow-hidden flex items-center justify-center cursor-pointer" 
                    onClick={handleToggleScanner}
                  >
                    <img src={ScannerIcon} alt="scanner" layout="fill" objectFit="cover" />
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
                      placeholder="Enter job#"
                      value={scannedCode}
                      onChange={handleChange}
                    />
                    <button
                      onClick={handleScanSubmit}
                      className={`bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white px-6 py-3 font-semibold rounded-r-lg hover:from-purple-500 hover:to-purple-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transition-all duration-300 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-4 text-purple-700">Employee Details</h2>
              <div className="space-y-3">
                <p className="flex items-center"><FaUser className="mr-2 text-purple-500" /> Pradeep Varma</p>
                <p className="flex items-center"><FaBriefcase className="mr-2 text-purple-500" /> Filing</p>
                <p className="flex items-center"><FaCheckCircle className="mr-2 text-green-500" /> Active</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            {renderJobDetails()}
            {renderRfBagDetails()}
            {jobDetails && (
              <div className="bg-white mt-8 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setActiveTab('summary')}
                    className={`flex-1 py-2 px-4 rounded-full transition duration-300 ${activeTab === 'summary' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`flex-1 py-2 px-4 rounded-full transition duration-300 ${activeTab === 'details' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Details
                  </button>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg shadow">
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