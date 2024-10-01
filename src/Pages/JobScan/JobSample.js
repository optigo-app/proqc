import React, { useState, useEffect, useRef } from 'react';
import { IoQrCodeSharp, IoPersonSharp, IoBriefcaseSharp, IoCheckmarkCircleSharp, IoCloseCircleSharp } from 'react-icons/io5';
import QrScanner from 'qr-scanner';
import img from '../../Assets/Jew.jpg'; // Ensure this path is correct

const JobScan = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [jobDetailsVisible, setJobDetailsVisible] = useState(false);
  const [rfBagDetailsVisible, setRfBagDetailsVisible] = useState(false);
  const [employeeDetailsVisible, setEmployeeDetailsVisible] = useState(true);
  const [jobDetails, setJobDetails] = useState(null);
  const [rfBagDetails, setRfBagDetails] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [mountWeight, setMountWeight] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);

  const jobDetail = [
    {
      jobId: "1/266040",
      name: "GOLD 10K Shine Gold",
      designNumber: "FD4",
      serialFor: "WOMENS",
      image: img,
      cusname: "ashok01",
      cuspoNumber: "100 jobs for testing",
      lastReceived: "1.000 Gm",
      currentStatus: "Filing-Issue",
      location: "INDIA",
    },
    {
      jobId: "1/266041",
      name: "GOLD 10K Shine Gold",
      designNumber: "FD4",
      serialFor: "WOMENS",
      image: img,
      cusname: "ashok01",
      cuspoNumber: "100 jobs for testing",
      lastReceived: "1.000 Gm",
      currentStatus: "Filing-Issue",
      location: "INDIA",
    }
  ];

  const employeeDetail = {
    employeeId: "E12345",
    name: "Pradeep Varma",
    department: "Filing",
    status: "Active"
  };

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
    const isJobId = scannedCode.startsWith('1/');
    const isRfBagId = scannedCode.length === 10;

    if (isJobId) {
      const job = jobDetail.find(job => job.jobId === scannedCode);
      if (job) {
        setJobDetails(job);
        setJobDetailsVisible(true);
        setRfBagDetailsVisible(false);
      } else {
        alert('Job not found');
      }
    } else if (isRfBagId) {
      const rfBag = rfBags.find(bag => bag.rfbagid === scannedCode);
      if (rfBag) {
        setRfBagDetails(rfBag);
        setRfBagDetailsVisible(true);
        setJobDetailsVisible(false);
      } else {
        alert('RF Bag not found');
      }
    } else {
      alert('Invalid Code');
    }
  };

  const startScanner = () => {
    setIsScanning(true);
    const qrScanner = new QrScanner(videoRef.current, (result) => {
      setScannedCode(result);
      setIsScanning(false);
      qrScanner.stop();
    });
    qrScanner.start();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F12') {
        startScanner();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderJobDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{jobDetails.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={jobDetails.image} alt="Job" className="w-full h-64 object-cover rounded-lg" />
        <div className="space-y-2">
          <p className="text-gray-600"><span className="font-semibold">Design:</span> {jobDetails.designNumber}</p>
          <p className="text-gray-600"><span className="font-semibold">Serial For:</span> {jobDetails.serialFor}</p>
          <p className="text-gray-600"><span className="font-semibold">Customer:</span> {jobDetails.cusname}</p>
          <p className="text-gray-600"><span className="font-semibold">Last Received:</span> {jobDetails.lastReceived}</p>
          <p className="text-gray-600"><span className="font-semibold">Status:</span> {jobDetails.currentStatus}</p>
          <p className="text-gray-600"><span className="font-semibold">Location:</span> {jobDetails.location}</p>
        </div>
      </div>
    </div>
  );

  const renderRfBagDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">RF Bag ID: {rfBagDetails.rfbagid}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="text-gray-600"><span className="font-semibold">Material:</span> {rfBagDetails.Material}</p>
          <p className="text-gray-600"><span className="font-semibold">Type:</span> {rfBagDetails.Type}</p>
          <p className="text-gray-600"><span className="font-semibold">Color:</span> {rfBagDetails.Color}</p>
          <p className="text-gray-600"><span className="font-semibold">Purity:</span> {rfBagDetails.Purity}</p>
          <p className="text-gray-600"><span className="font-semibold">Weight:</span> {rfBagDetails.Gm}</p>
        </div>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Mount Weight"
            value={mountWeight}
            onChange={(e) => setMountWeight(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-4">
            <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300" onClick={() => {/* handle weight save */}}>
              Save
            </button>
            <button className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300" onClick={() => {/* handle cancel */}}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <IoQrCodeSharp className="w-8 h-8 mr-2 text-blue-500" />
                QR Code Scanner
              </h2>
              <div className="relative">
                <video ref={videoRef} className={`w-full h-64 bg-gray-200 rounded-lg mb-4 ${isScanning ? 'block' : 'hidden'}`}></video>
                {!isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button onClick={startScanner} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                      Start Scanning
                    </button>
                  </div>
                )}
              </div>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Scan or Enter Job Code"
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleScanSubmit} className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                  Go
                </button>
              </div>
            </div>
            {jobDetailsVisible && renderJobDetails()}
            {rfBagDetailsVisible && renderRfBagDetails()}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <IoPersonSharp className="w-8 h-8 mr-2 text-green-500" />
                Employee Details
              </h2>
              <div className="space-y-4">
                <p className="flex items-center text-gray-600">
                  <IoPersonSharp className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="font-semibold">Name:</span> {employeeDetail.name}
                </p>
                <p className="flex items-center text-gray-600">
                  <IoBriefcaseSharp className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="font-semibold">Department:</span> {employeeDetail.department}
                </p>
                <p className="flex items-center text-gray-600">
                  {employeeDetail.status === 'Active' ? (
                    <IoCheckmarkCircleSharp className="w-5 h-5 mr-2 text-green-500" />
                  ) : (
                    <IoCloseCircleSharp className="w-5 h-5 mr-2 text-red-500" />
                  )}
                  <span className="font-semibold">Status:</span> {employeeDetail.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobScan;

