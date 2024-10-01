import React, { useState, useEffect, useRef } from 'react';
import { FaQrcode, FaUser, FaBriefcase, FaCheckCircle, FaArrowRight, FaBarcode } from 'react-icons/fa';
import QrScanner from 'qr-scanner';
import { ClipLoader } from 'react-spinners';
import ScannerIcon from '../../Assets/Qrcode.png';
import img from '../../Assets/Jew.jpg';

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
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <img className="w-full md:w-48 h-48 object-cover" src={jobDetails.image} alt="Job" />
          <div className="flex-grow">
            <h2 className="text-3xl font-bold text-gray-800">{jobDetails.name}</h2>
            <p className="text-xl text-indigo-600 font-semibold">{jobDetails.jobId}</p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">Design: <span className="font-semibold">{jobDetails.designNumber}</span></p>
              <p className="text-gray-700">Customer: <span className="font-semibold">{jobDetails.customerName}</span></p>
              <p className="text-gray-700">PO: <span className="font-semibold">{jobDetails.poNumber}</span></p>
              <p className="text-gray-700">Status: <span className="font-semibold">{jobDetails.currentStatus}</span></p>
              <p className="text-gray-700">Location: <span className="font-semibold">{jobDetails.location}</span></p>
            </div>
          </div>
        </div>

        {jobDetails.jobFlag === 'Issue' && (
          <div className="bg-indigo-50 p-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">Issue Job</h3>
            <select className="w-full p-3 border mb-4 focus:border-indigo-600 focus:ring focus:ring-indigo-200">
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
              className="w-full bg-indigo-600 text-white px-6 py-3 hover:bg-indigo-700 transition duration-300 flex items-center justify-center text-lg font-semibold"
            >
              Issue Job <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}

        {jobDetails.jobFlag === 'Return' && (
          <div className="bg-gray-50 p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Return Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-700">Alloy Wt: <span className="font-semibold">0.000</span></p>
              <p className="text-gray-700">Lab Grown: <span className="font-semibold">0.000</span></p>
              <p className="text-gray-700">Diamond: <span className="font-semibold">0.000</span></p>
              <p className="text-gray-700">Color Stone: <span className="font-semibold">0.000</span></p>
              <p className="text-gray-700">Misc: <span className="font-semibold">0.000</span></p>
              <p className="text-gray-700">Current Net: <span className="font-semibold">0.000</span></p>
              <p className="text-gray-700">Current Gross: <span className="font-semibold">0.000</span></p>
              <p className="text-gray-700">Loss Weight: <span className="font-semibold">0.000</span></p>
              <p className="text-gray-700">Actual Loss: <span className="font-semibold">0.000</span></p>
              <p className="text-gray-700">Scrap Loss: <span className="font-semibold">0.000</span></p>
              <p className="text-gray-700">Exp Loss: <span className="font-semibold">0</span></p>
              <p className="text-gray-700">Max Loss %: <span className="font-semibold">0</span></p>
            </div>
            <div className="mt-6 flex items-center space-x-4">
              <label className="text-gray-700 font-semibold">Scrap:</label>
              <input
                type="number"
                value={scrap}
                onChange={(e) => setScrap(e.target.value)}
                placeholder="Enter scrap"
                className="flex-grow p-2 border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => {
                  alert("Job successfully returned");
                  setJobDetails(null);
                }}
                className="flex-1 bg-green-500 text-white px-6 py-3 hover:bg-green-600 transition duration-300 font-semibold"
              >
                Return
              </button>
              <button
                onClick={() => setJobDetails(null)}
                className="flex-1 bg-gray-500 text-white px-6 py-3 hover:bg-gray-600 transition duration-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );

  const renderRfBagDetails = () => (
    rfBagDetails && (
      <div className="bg-white p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">RF Bag Details</h2>
        <table className="w-full mb-8">
          <tbody>
            <tr>
              <td className="py-2 text-gray-700">RF Bag ID:</td>
              <td className="py-2 font-semibold">{rfBagDetails.rfbagid}</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">Material:</td>
              <td className="py-2 font-semibold">{rfBagDetails.Material}</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">Type:</td>
              <td className="py-2 font-semibold">{rfBagDetails.Type}</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">Color:</td>
              <td className="py-2 font-semibold">{rfBagDetails.Color}</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">Purity:</td>
              <td className="py-2 font-semibold">{rfBagDetails.Purity}</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">Weight:</td>
              <td className="py-2 font-semibold">{rfBagDetails.Gm}</td>
            </tr>
          </tbody>
        </table>
        <div className="bg-gray-50 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Material Requirements</h3>
          <div className="space-y-4">
            <input
              type="number"
              value={mountWeight}
              onChange={(e) => setMountWeight(e.target.value)}
              placeholder="Enter Required Weight (Gm)"
              className="w-full p-3 border focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
            <input
              type="number"
              value={pcs}
              onChange={(e) => setPcs(e.target.value)}
              placeholder="Enter Number of Pieces"
              className="w-full p-3 border focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
            <button
              onClick={() => {
                alert(`Weight: ${mountWeight} Gm, Pieces: ${pcs}`);
              }}
              className="w-full bg-green-500 text-white px-6 py-3 hover:bg-green-600 transition duration-300 flex items-center justify-center text-lg font-semibold"
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
      <div className="w-full">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="lg:w-1/4">
            <div className="bg-white p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Scan Job or RF Bag</h2>
              <div className="flex flex-col items-center space-y-6">
                {hasCamera ? (
                  <div className="w-64 h-64 bg-gray-100 overflow-hidden">
                    <video ref={videoRef} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="relative h-64 w-64 bg-gray-50 flex items-center justify-center cursor-pointer" onClick={handleToggleScanner}>
                    <img src={ScannerIcon} alt="scanner" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-0 w-full h-1 bg-red-500 animate-scanner-line"></div>
                    </div>
                  </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); handleCodeSubmit(barcode); }} className="w-full">
                  <div className="flex items-center justify-between bg-white border border-gray-300 overflow-hidden">
                    <input
                      type="text"
                      className="p-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Enter Code"
                      value={scannedCode}
                      onChange={handleChange}
                    />
                    <button
                      onClick={handleScanSubmit}
                      className={`bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center text-white px-6 py-3 font-semibold hover:from-indigo-600 hover:to-indigo-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={loading}
                    >
                      {loading ? <ClipLoader size={20} color="#fff" /> : (
                        <>
                          <FaBarcode className="mr-2" /> Scan
                        </>
                      )}
                    </button>
                  </div>
                </form>
                {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
              </div>
            </div>
          </div>
          <div className="lg:w-1/4">
            <div className="bg-white p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Employee Details</h2>
              <div className="space-y-3">
                <p className="flex items-center text-gray-700"><FaUser className="mr-2 text-indigo-500" /> Pradeep Varma</p>
                <p className="flex items-center text-gray-700"><FaBriefcase className="mr-2 text-indigo-500" /> Filing</p>
                <p className="flex items-center text-gray-700"><FaCheckCircle className="mr-2 text-green-500" /> Active</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-8">
            {renderJobDetails()}
            {renderRfBagDetails()}
          </div>
        </div>
        {(jobDetails || rfBagDetails) && (
          <div className="mt-8">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex-1 py-2 px-4 text-lg font-semibold transition duration-300 ${activeTab === 'summary' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-2 px-4 text-lg font-semibold transition duration-300 ${activeTab === 'details' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Details
              </button>
            </div>
            <div className="bg-white p-6">
              {activeTab === 'summary' ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Field</th>
                      <th className="p-2 text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobDetails ? (
                      <>
                        <tr><td className="p-2 border-t">Job ID</td><td className="p-2 border-t">{jobDetails.jobId}</td></tr>
                        <tr><td className="p-2 border-t">Name</td><td className="p-2 border-t">{jobDetails.name}</td></tr>
                        <tr><td className="p-2 border-t">Design Number</td><td className="p-2 border-t">{jobDetails.designNumber}</td></tr>
                        <tr><td className="p-2 border-t">Customer</td><td className="p-2 border-t">{jobDetails.customerName}</td></tr>
                        <tr><td className="p-2 border-t">Status</td><td className="p-2 border-t">{jobDetails.currentStatus}</td></tr>
                      </>
                    ) : (
                      <>
                        <tr><td className="p-2 border-t">RF Bag ID</td><td className="p-2 border-t">{rfBagDetails.rfbagid}</td></tr>
                        <tr><td className="p-2 border-t">Material</td><td className="p-2 border-t">{rfBagDetails.Material}</td></tr>
                        <tr><td className="p-2 border-t">Type</td><td className="p-2 border-t">{rfBagDetails.Type}</td></tr>
                        <tr><td className="p-2 border-t">Color</td><td className="p-2 border-t">{rfBagDetails.Color}</td></tr>
                        <tr><td className="p-2 border-t">Purity</td><td className="p-2 border-t">{rfBagDetails.Purity}</td></tr>
                      </>
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Action</th>
                      <th className="p-2 text-left">Department</th>
                      <th className="p-2 text-left">Employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border-t">2023-06-01</td>
                      <td className="p-2 border-t">Created</td>
                      <td className="p-2 border-t">Design</td>
                      <td className="p-2 border-t">John Doe</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-t">2023-06-02</td>
                      <td className="p-2 border-t">Approved</td>
                      <td className="p-2 border-t">Quality Control</td>
                      <td className="p-2 border-t">Jane Smith</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-t">2023-06-03</td>
                      <td className="p-2 border-t">In Progress</td>
                      <td className="p-2 border-t">Manufacturing</td>
                      <td className="p-2 border-t">Bob Johnson</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}