import React, { useState } from 'react';
import { FaQrcode, FaUser, FaBriefcase, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import ScannerIcon from '../../Assets/Qrcode.png';
import img from '../../Assets/Jew.jpg';
import '../../components/Scanner.css';

export default function JobScan() {
  const [scannedCode, setScannedCode] = useState('');
  const [jobDetails, setJobDetails] = useState(null);
  const [rfBagDetails, setRfBagDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [mountWeight, setMountWeight] = useState('');
  const [pcs, setPcs] = useState('');

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
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-102">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={jobDetails.image} alt="Job" />
          </div>
          <div className="p-8 flex-grow">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{jobDetails.jobId}</div>
            <h2 className="mt-2 text-2xl leading-8 font-semibold text-gray-900">{jobDetails.name}</h2>
            <p className="mt-2 text-gray-600">Design: {jobDetails.designNumber}</p>
            <p className="text-gray-600">Customer: {jobDetails.customerName}</p>
            <p className="text-gray-600">PO: {jobDetails.poNumber}</p>
            <p className="text-gray-600">Status: {jobDetails.currentStatus}</p>
            <p className="text-gray-600">Location: {jobDetails.location}</p>
          </div>
        </div>
        {jobDetails.jobFlag === 'Issue' && (
          <div className="px-8 py-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Issue Job</h3>
            <select className="w-full p-2 border rounded mb-4 focus:border-indigo-500 focus:ring focus:ring-indigo-200">
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
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
            >
              Issue Job <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}
        {jobDetails.jobFlag === 'Return' && (
          <div className="px-8 py-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Return Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <p><strong>Alloy Wt:</strong> 0.000</p>
              <p><strong>Lab Grown:</strong> 0.000</p>
              <p><strong>Diamond:</strong> 0.000</p>
              <p><strong>Color Stone:</strong> 0.000</p>
              <p><strong>Misc:</strong> 0.000</p>
              <p><strong>Current Net:</strong> 0.000</p>
              <p><strong>Current Gross:</strong> 0.000</p>
              <p><strong>Loss Weight:</strong> 0.000</p>
              <p><strong>Actual Loss:</strong> 0.000</p>
              <p><strong>Scrap Loss:</strong> 0.000</p>
              <p><strong>Exp Loss:</strong> 0</p>
              <p><strong>Exp Loss %:</strong> 0</p>
            </div>
            <input
              type="number"
              value={mountWeight}
              onChange={(e) => setMountWeight(e.target.value)}
              placeholder="Enter Mount Weight"
              className="w-full p-2 border rounded mb-4 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
            <button
              onClick={() => {
                alert("Job successfully returned");
                setJobDetails(null);
              }}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center justify-center"
            >
              Return Job <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}
      </div>
    )
  );

  const renderRfBagDetails = () => (
    rfBagDetails && (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8 transition-all duration-300 ease-in-out transform hover:scale-102">
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
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transition-all duration-300 ease-in-out transform hover:scale-102">
              <div className="flex flex-col items-center space-y-4">
                <img src={ScannerIcon} alt="Scanner Icon" className="w-20 h-20" />
                <input
                  type="text"
                  placeholder="Scan or Enter Job Code"
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                  className="w-full md:w-2/3 p-2 border rounded focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
                <button
                  onClick={handleScanSubmit}
                  className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                >
                  <FaQrcode className="mr-2" /> Scan Job
                </button>
              </div>
            </div>
            {renderJobDetails()}
            {renderRfBagDetails()}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transition-all duration-300 ease-in-out transform hover:scale-102">
              <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
              <div className="space-y-2">
                <p><FaUser className="inline mr-2 text-indigo-500" /> Pradeep Varma</p>
                <p><FaBriefcase className="inline mr-2 text-indigo-500" /> Filing</p>
                <p><FaCheckCircle className="inline mr-2 text-green-500" /> Active</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102">
              <div className="flex space-x-4 mb-4">
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
              <div className="bg-gray-50 p-4 rounded">
                {activeTab === 'summary' ? (
                  <p>Summary information will be displayed here.</p>
                ) : (
                  <p>Detailed information will be displayed here.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}