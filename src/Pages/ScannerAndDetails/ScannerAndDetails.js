import React, { useState, useRef, useEffect } from 'react';
import { FaQrcode, FaUser, FaEdit } from 'react-icons/fa';
import QrScanner from 'qr-scanner';
import { ClipLoader } from 'react-spinners';
import ScannerIcon from '../../Assets/Qrcode.png';
import img from '../../Assets/Jew.jpg';
import '../../components/Scanner.css';
import Jobdetails from './Jobdetails';
import Bulkjobscan from './Bulkjobscan';
import { BiArrowToRight } from "react-icons/bi";
import JobDetailsTab from './JobDetailsTab';
import RfBagDetails from './RfBagDetails';
import ReturnJobDetails from './ReturnJobDetails';
import { TfiUnlock } from "react-icons/tfi";
import { dbJobdetails } from '../../fakeapi/JobDetails';
import { Rmbag } from '../../fakeapi/Rmbag';

const ScannerAndDetails = () => {
const [scannedCode, setScannedCode] = useState('');
const [jobDetails, setJobDetails] = useState(null);
const [bulkJobDetails, setBulkJobDetails] = useState([]);
const [bulkScan, setBulkScan] = useState(false);
const [rfBagDetails, setRfBagDetails] = useState(null);
const [hasCamera, setHasCamera] = useState(true);
const [barcode, setBarcode] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [loading, setLoading] = useState(false);
const [rfBagArray, setRfBagArray] = useState([]); 
const videoRef = useRef(null);
const scannerRef = useRef(null);
const [selectedDept, setSelectedDept] = useState('');
const [bulkscancheck,setBulkscancheck] = useState(false);
const [employeeScanned, setEmployeeScanned] = useState(false);
const [employeeDetails, setEmployeeDetails] = useState(null);
const [returnjobdetails,setReturnjobdetails] = useState(null);
const [returnModeJob,setReturnModeJob] = useState(null);
const [jobflag,setJobflag]=useState('');
const [mode, setMode] = useState('Issue');
const EmployeeCodeRef = useRef(null); 
const JobRef = useRef(null); 

  useEffect(() => {
    if (mode === 'Issue' && !employeeScanned && EmployeeCodeRef.current) {
      EmployeeCodeRef.current.focus();
    }
  }, [!employeeScanned, mode]);

  useEffect(() => {
    if (mode === 'Issue' && employeeScanned && JobRef.current) {
      JobRef.current.focus();
    }
    if (mode === 'Return'  && JobRef.current) {
      JobRef.current.focus();
    }
  },  [mode]);


  const handleModeToggle = (mode) => {
    setMode(mode);  
    setEmployeeScanned(false);
    setEmployeeDetails(null);
    setScannedCode('');
    setJobDetails(null);
    setBulkJobDetails([]);
    setBulkScan(false);
    setBulkscancheck(false);
    setReturnjobdetails(null);
    setReturnModeJob(null);
  };
  
const jobData = dbJobdetails;
// const jobData = [
//     {
//       jobId: "1/111111",
//       name: "GOLD 10K Shine Gold",
//       designNumber: "FD4",
//       serialFor: "WOMENS", 
//       image: img,
//       customerName: "ashok01",
//       poNumber: "Misc",
//       lastReceived: "1.000 Gm",
//       currentStatus: "Filing-Issue",
//       location: "INDIA",
//       jobFlag: 'Return',
//        'Misc Add in Gross wt':'NO',
//        'Is HMW Job?':'No',
//        DiamondPcs:'3',
//        DiamondWt:10,
//        ColorStone:0.000,
//        Metal:1.000,
//        SprewWt:'20 Gm',
//        'AlloyWt':	'0.000',
//        LabGrown:0.000,
//        Diamond:1.000,
//        ColorStone:0.000,
//        Misc:0.000,
//        CurrentNet:.000,
//        CurrentGross:2.000,
//        actloss:0.00,
//        exploss:0,
//        losswt:1.00,
//        maxloss:2,
//     },
//     { 
// jobId: "1/222222",
// name: "GOLD 18K Shine Yellow",
// designNumber: "NEW-COP",
// serialFor: "Titan Earring",
// image: img,
// customerName: "amolpatil",
// poNumber: "Misc",
// lastReceived: "0.000 Gm",
// currentStatus: "EC QC1-Issue",
// location: "INDIA",
// // jobFlag: 'Return',
// jobFlag: 'Issue',
// 'Misc Add in Gross wt':'Yes',
// 'Is HMW Job?':'No',
// DiamondPcs:'3',
//  DiamondWt:10,
//  Metal:1.000,
//  SprewWt:'20 Gm',
//  AlloyWt:	'0.000',
// LabGrown:0.000,
// Diamond:1.000,
// ColorStone:0.000,
// Misc:0.000,
// CurrentNet:1.000,
// CurrentGross:2.000,
// actloss:0.00,
// exploss:0,
// losswt:1.00,
// maxloss:2
// },
// {
// jobId: "1/333333",
// name: "GOLD 10K Shine Gold",
// designNumber: "FD4",
// serialFor: "WOMENS", 
// image: img,
// customerName: "ashok01",
// poNumber: "Misc",
// lastReceived: "1.000 Gm",
// currentStatus: "Filing-Issue",
// location: "INDIA",
// jobFlag: 'Issue',
// 'Misc Add in Gross wt':'NO',
// 'Is HMW Job?':'No',
// DiamondPcs:'3',
// DiamondWt:10,
// Metal:1.000,
// SprewWt:'20 Gm',
// AlloyWt:	'0.000',
// LabGrown:0.000,
// Diamond:1.000,
// ColorStone:0.000,
// Misc:0.000,
// CurrentNet:1.000,
// CurrentGross:2.000,
// actloss:0.00,
// exploss:0,
// losswt:1.00,
// maxloss:2


// },
//     { 
// jobId: "1/555555",
// name: "GOLD 18K Shine Yellow",
// designNumber: "NEW-COP",
// serialFor: "Titan Earring",
// image: img,
// customerName: "amolpatil",
// poNumber: "Misc",
// lastReceived: "0.000 Gm",
// currentStatus: "EC QC1-Issue",
// location: "INDIA",
// // jobFlag: 'Return',
// jobFlag: 'Issue',
// 'Misc Add in Gross wt':'Yes',
// 'Is HMW Job?':'No',
// DiamondPcs:'3',
// DiamondWt:10,
// Metal:1.000,
// SprewWt:'20 Gm',
// AlloyWt:	'0.000',
// LabGrown:0.000,
// Diamond:1.000,
// ColorStone:0.000,
// Misc:0.000,
// CurrentNet:1.000,
// CurrentGross:2.000,
// actloss:0.00,
// exploss:0,
// losswt:1.00,
// maxloss:2


// },
//     {
//       jobId: "1/666666",
//       name: "GOLD 10K Shine Gold",
//       designNumber: "FD4",
//       serialFor: "WOMENS", 
//       image: img,
//       customerName: "ashok01",
//       poNumber: "Misc",
//       lastReceived: "1.000 Gm",
//       currentStatus: "Filing-Issue",
//       location: "INDIA",
//       jobFlag: 'Issue',
//        'Misc Add in Gross wt':'NO',
//        'Is HMW Job?':'No',
//        DiamondPcs:'3',
//        DiamondWt:10,
//        Metal:1.000,
//        SprewWt:'20 Gm',
//         AlloyWt:	'0.000',
// LabGrown:0.000,
// Diamond:1.000,
// ColorStone:0.000,
// Misc:0.000,
// CurrentNet:1.000,
// CurrentGross:2.000,
// actloss:0.00,
// exploss:0,
// losswt:1.00,
// maxloss:2


// },
//     { 
// jobId: "1/444444",
// name: "GOLD 18K Shine Yellow",
// designNumber: "NEW-COP",
// serialFor: "Titan Earring",
// image: img,
// customerName: "amolpatil",
// poNumber: "Misc",
// lastReceived: "0.000 Gm",
// currentStatus: "EC QC1-Issue",
// location: "INDIA",
// // jobFlag: 'Return',
// jobFlag: 'Issue',
// 'Misc Add in Gross wt':'Yes',
// 'Is HMW Job?':'No',
// DiamondPcs:'3',
//  DiamondWt:10,
//  Metal:1.000,
//  SprewWt:'20 Gm',
//   AlloyWt:	'0.000',
// LabGrown:0.000,
// Diamond:1.000,
// ColorStone:0.000,
// Misc:0.000,
// CurrentNet:1.000,
// CurrentGross:2.000,
// actloss:0.00,
// exploss:0,
// losswt:1.00,
// maxloss:2


// },
//     {
//       jobId: "1/777777",
//       name: "GOLD 10K Shine Gold",
//       designNumber: "FD4",
//       serialFor: "WOMENS", 
//       image: img,
//       customerName: "ashok01",
//       poNumber: "Misc",
//       lastReceived: "1.000 Gm",
//       currentStatus: "Filing-Issue",
//       location: "INDIA",
//       jobFlag: 'Issue',
//        'Misc Add in Gross wt':'NO',
//        'Is HMW Job?':'No',
//        DiamondPcs:'3',
//        DiamondWt:10,
//        Metal:1.000,
//        SprewWt:'20 Gm',
//         AlloyWt:	'0.000',
// LabGrown:0.000,
// Diamond:1.000,
// ColorStone:0.000,
// Misc:0.000,
// CurrentNet:1.000,
// CurrentGross:2.000,
// actloss:0.00,
// exploss:0,
// losswt:1.00,
// maxloss:2


// },
//     { 
//       jobId: "1/888888",
//       name: "GOLD 18K Shine Yellow",
//       designNumber: "NEW-COP",
//       serialFor: "Titan Earring",
//       image: img,
//       customerName: "amolpatil",
//       poNumber: "Misc",
//       lastReceived: "0.000 Gm",
//       currentStatus: "EC QC1-Issue",
//       location: "INDIA",
//       // jobFlag: 'Return',
//       jobFlag: 'Issue',
//       'Misc Add in Gross wt':'Yes',
//       'Is HMW Job?':'No',
//       DiamondPcs:'3',
//        DiamondWt:10,
//        Metal:1.000,
//        SprewWt:'20 Gm',
//         AlloyWt:	'0.000',
// LabGrown:0.000,
// Diamond:1.000,
// ColorStone:0.000,
// Misc:0.000,
// CurrentNet:1.000,
// CurrentGross:2.000,
// actloss:0.00,
// exploss:0,
// losswt:1.00,
// maxloss:2


// },
//     {
//       jobId: "1/999999",
//       name: "GOLD 10K Shine Gold",
//       designNumber: "FD4",
//       serialFor: "WOMENS", 
//       image: img,
//       customerName: "ashok01",
//       poNumber: "Misc",
//       lastReceived: "1.000 Gm",
//       currentStatus: "Filing-Issue",  
//       location: "INDIA",
//       jobFlag: 'Issue',
//        'Misc Add in Gross wt':'NO',
//        'Is HMW Job?':'No',
//        DiamondPcs:'3',
//        DiamondWt:10,
//        Metal:1.000,
//        SprewWt:'20 Gm',
//         AlloyWt:	'0.000',
// LabGrown:0.000,
// Diamond:1.000,
// ColorStone:0.000,
// Misc:0.000,
// CurrentNet:1.000,
// CurrentGross:2.000,
// actloss:0.00,
// exploss:0,
// losswt:1.00,
// maxloss:2


// },
//     { 
//       jobId: "1/1234566",
//       name: "GOLD 18K Shine Yellow",
//       designNumber: "NEW-COP",
//       serialFor: "Titan Earring",
//       image: img,
//       customerName: "amolpatil",
//       poNumber: "Misc",
//       lastReceived: "0.000 Gm",
//       currentStatus: "EC QC1-Issue",
//       location: "INDIA",
//       // jobFlag: 'Return',
//       jobFlag: 'Issue',
//       'Misc Add in Gross wt':'Yes',
//       'Is HMW Job?':'No',
//       DiamondPcs:'3',
//        DiamondWt:10,
//        Metal:1.000,
//        SprewWt:'20 Gm',
//        Diamond:1.000,
//        ColorStone:0.000,
//        Misc:0.000,
//        CurrentNet:1.000,
//        CurrentGross:2.000,
//        actloss:0.00,
//        exploss:0,
//        losswt:1.00,
//        maxloss:2


// },
//     {
//jobId: "1/123455",
//name: "GOLD 10K Shine Gold",
//designNumber: "FD4",
//serialFor: "WOMENS", 
//image: img,
//customerName: "ashok01",
//poNumber: "Misc",
//lastReceived: "1.000 Gm",
//currentStatus: "Filing-Issue",
//location: "INDIA",
//jobFlag: 'Issue',
// 'Misc Add in Gross wt':'NO',
// 'Is HMW Job?':'No',
// DiamondPcs:'3',
// DiamondWt:10,
// Metal:1.000,
// SprewWt:'20 Gm',
//  AlloyWt:	'0.000',
// LabGrown:0.000,
// Diamond:1.000,
// ColorStone:0.000,
// Misc:0.000,
// CurrentNet:1.000,
// CurrentGross:2.000,
// actloss:0.00,
// exploss:0,
// losswt:1.00,
// maxloss:2


// },
//     { 
//       jobId: "1/123456",
//       name: "GOLD 18K Shine Yellow",
//       designNumber: "NEW-COP",
//       serialFor: "Titan Earring",
//       image: img,
//       customerName: "amolpatil",
//       poNumber: "Misc",
//       lastReceived: "0.000 Gm",
//       currentStatus: "EC QC1-Issue",
//       location: "INDIA",
//       // jobFlag: 'Return',
//       jobFlag: 'Issue',
//       'Misc Add in Gross wt':'Yes',
//       'Is HMW Job?':'No',
//        DiamondPcs:'3',
//        DiamondWt:10,
//        Metal:1.000,
//        SprewWt:'20 Gm',
//         AlloyWt:	'0.000',
// LabGrown:0.000,
// Diamond:1.000,
// ColorStone:0.000,
// Misc:0.000,
// CurrentNet:1.000,
// CurrentGross:2.000,
// actloss:0.00,
// exploss:0,
// losswt:1.00,
// maxloss:2


// },
//   ];
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
      rfbagid: "0000008991",
      Lot: "1",
      Material: "DIAMOND",
      Shape: "ROUND",
      Color: "IJ",
      Size: "MIX",
      Clarity: "SI",
      Ctw: "97/100"
    },
    {
      rfbagid: "0000008993",
      Material: "METAL",
      Type: "GOLD",
      Color: "YELLOW",
      Purity: "14K",
      Gm: "16.912/16.912"
    },
    {
      rfbagid: "0000008994",
      Lot: "1",
      Material: "DIAMOND",
      Shape: "ROUND",
      Color: "IJ",
      Size: "MIX",
      Clarity: "SI",
      Ctw: "97/100"
    },
    {
      rfbagid: "0000008995",
      Lot: "1",
      Material: "DIAMOND",
      Shape: "ROUND",
      Color: "IJ",
      Size: "MIX",
      Clarity: "SI",
      Ctw: "97/100"
    }
  ];
  const Employees = [
    {
      empid: 'E1203',
      workerfname: "John",
      workerlname: "Doe",
    },
    {
      empid: 'E0522',
      workerfname: "Lilly",
      workerlname: "Johnson",
    },
  ];


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
  
  const handleempChange = (e) => {
    const value = e.target.value.toUpperCase(); 
    setScannedCode(value); 
  };


const handleScan = (result) => {
    if (result) {
      setBarcode(result);
      handleScanSubmit(result);
    }
  };

const handleScanSubmit = () => {
  setErrorMessage('');
  
  if (mode === 'Issue' && !employeeScanned) {
    if (!scannedCode) { 
      setErrorMessage('Please enter employee code.');
    } else {
      const employeeFound = Employees.find(emp => emp.empid === scannedCode);
      if (employeeFound) {
        setEmployeeDetails(employeeFound);
        setEmployeeScanned(true);
        setErrorMessage('');
        setScannedCode('');
      } else {
        setErrorMessage('Employee not found.');
      }
    }
  }
    else if (mode === 'Issue' && employeeScanned) {
    const isJobId = scannedCode.startsWith("1/") && scannedCode.length > 2;
    
    if (isJobId) {
      const jobFound = jobData.find(job => job.jobId === scannedCode);
      if (jobFound) {
        setRfBagArray([]);
        setJobDetails(null);
        setBulkscancheck(false);
        setReturnjobdetails(null);
        
        if (jobFound.jobFlag === 'Issue') {
          setJobDetails(jobFound);
          setBulkscancheck(true);

          if (bulkScan) {
            setBulkJobDetails(prev => {
              const updatedBulkJobs = prev.filter(existingJob => existingJob.jobId !== jobFound.jobId);
              console.log("updatedBulkJobs",bulkJobDetails);

              return [jobFound, ...updatedBulkJobs];
            });
          } else {
            setJobDetails(jobFound);
            setBulkJobDetails([]);
          }
          setScannedCode('');
        } else {
          setReturnjobdetails(jobFound);
          if (bulkScan) {
            setErrorMessage('Job already Issued');
            setBulkscancheck(true);
          } else {
            setBulkJobDetails([]);
            setScannedCode('');
          }
        }
      } else {
        setErrorMessage('Job ID not found.');
      }
    } 
    else if (scannedCode.length === 10) {
      if (jobDetails || returnjobdetails) {
        const rfBagFound = rfBags.find(bag => bag.rfbagid === scannedCode);
        if (rfBagFound) {
          setRfBagArray(prev => [rfBagFound, ...prev]);
          setScannedCode('');
        } else {
          setErrorMessage('RM Bag ID not found.');
        }
      } else {
        setErrorMessage('Please scan a job before scanning RM Bag.');
      }
    } else {
      setErrorMessage('');
    }
  } 
  else if (mode === 'Return') {
    const trimmedScannedCode = scannedCode.trim();
    const isJobId = trimmedScannedCode.startsWith("1/") && trimmedScannedCode.length > 2;
    if (isJobId) {
      const jobFound = jobData.find(job => job.jobId === trimmedScannedCode && job.jobFlag === 'Return');
      console.log("Return Mode Job Found:", jobFound);
      
      if (jobFound) {
        setReturnModeJob(jobFound); 
        setScannedCode('');
      } else {
        setErrorMessage('Job Is Not Issued Yet!');
      }
    } 
    
    else if (scannedCode.length === 10) {
      const rfBagFound = rfBags.find(bag => bag.rfbagid === scannedCode);
      if (rfBagFound && returnModeJob) {
        setRfBagArray(prev => [rfBagFound, ...prev]); 
        setEmployeeScanned(true);
        setEmployeeDetails({empid: 'E1203',
        workerfname: "John",
        workerlname: "Doe", }); 
        setMode('Issue'); 
        setReturnjobdetails(returnModeJob);
        setScannedCode('');
      } else {
        setErrorMessage('RM Bag ID not found or no Job scanned yet.');
      }
    } else {
      setErrorMessage('');
    }
  }
};

const handleChange = (e) => {
    setScannedCode(e.target.value); 
    setErrorMessage(''); 
  };
  const handleToggleBulkScan = (e) => {
    const isBulkScanChecked = e.target.checked;
    setBulkScan(isBulkScanChecked);

    if (isBulkScanChecked && jobDetails) {
      setBulkJobDetails((prev) => [jobDetails, ...prev]);
    } else if (!isBulkScanChecked) {
      
      setBulkJobDetails((prev) => prev.slice(1));
    }
};
  const handleToggleScanner = () => {
    setHasCamera(true);
  };
console.log("bagDetails",rfBagArray);

  const handleChangeEmployee = () => {
    setEmployeeScanned(false);  
    setEmployeeDetails(null);      
    setBarcode('');                
    setBulkJobDetails([]);    
    setJobDetails(null);
    setRfBagDetails(null); 
    setReturnjobdetails(null);     
    setBulkScan(false);   
    setRfBagArray([]);
    setErrorMessage('');        
};
const handleissuesubmit = () =>{
  setBarcode('');                
  setBulkJobDetails([]);    
  setJobDetails(null);
  setRfBagDetails(null); 
  setReturnjobdetails(null);     
  // setBulkScan(false);   
  setRfBagArray([]);
  setErrorMessage('');    
  setBulkScan(false);    
  setBulkscancheck(false);
}

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gray-100">
      <div className="max-w-screen">
        <div className="flex flex-row transition-all duration-500 ease-in-out transform">
          {mode === 'Issue' && !employeeScanned ?   (
            <div className="flex flex-col bg-white h-screen">

              <div className="p-4 mb-8 bg-indigo-50">   
              <div className="flex items-center justify-center mb-4">
        <div className="relative bg-gray-200 rounded-full inline-flex">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full   focus:outline-none ${
              mode === 'Issue'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 '
            }`}
            onClick={() => handleModeToggle('Issue')}
            >
            Issue
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full focus:outline-none ${
              mode === 'Return'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 '
            }`}
            onClick={() => handleModeToggle('Return')}
          >
            Return
          </button>
        </div>
      </div>
    
<select className="w-full p-2 border rounded-lg mb-4 focus:border-indigo-600 focus:ring focus:ring-indigo-200">
                    <option value="dept1">Locker 1</option>
                    <option value="dept2">Locker 2</option>
                    <option value="dept3">Locker 3</option>
                  </select>
                <h2 className="text-lg font-semibold">
                  <FaUser className="inline mr-2 text-indigo-500" /> Scan Employee ID
                </h2>
              </div>
              <div className="p-2 mb-8 transition-all duration-300 ease-in-out transform hover:scale-102">
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
                  <div className="h-[1.5rem] my-4">
                    {errorMessage && <p className="text-red-600 text-base text-center">{errorMessage}</p>}
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); handleScanSubmit(); }} className="w-fit">
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full">
                    <input
                    type="text"
                    className="p-3 w-fit text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter Employee ID"
                    value={scannedCode.toUpperCase()}
                    onChange={(e) => handleempChange(e)}
                    ref={EmployeeCodeRef} 
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
            </div>
          ) : (
            <div className='flex flex-row w-screen  h-screen overflow-auto flexoverflow-x-hidden'>
  <div className="flex flex-col justify-between max-w-96 bg-white h-screen">   
  <div className=''>
<div className="p-4 mb-2 bg-indigo-50">
<div className="flex items-center justify-center mb-4">
<div className="relative bg-gray-200 rounded-full inline-flex">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full   focus:outline-none ${
              mode === 'Issue'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 '
            }`}
            onClick={() => handleModeToggle('Issue')}
            >
            Issue
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full focus:outline-none ${
              mode === 'Return'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 '
            }`}
            onClick={() => handleModeToggle('Return')}
          >
            Return
          </button>
        </div>
            </div>

           <div className="flex flex-row gap-2 w-full justify-between h-fit items-center">
             <select className="w-full p-2 border rounded-lg mb-4 focus:border-indigo-600 focus:ring focus:ring-indigo-200">
               <option value="dept1">Locker 1</option>
               <option value="dept2">Locker 2</option>
               <option value="dept3">Locker 3</option>
             </select>   
           </div>
           {mode === 'Issue' && (
   <div className="w-full flex flex-wrap justify-between">
   <p className="text-lg font-semibold">
     <FaUser className="inline mr-2 text-indigo-500" />
     <strong className="text-blue-500">({employeeDetails.empid}) </strong>
     {employeeDetails.workerfname} {employeeDetails.workerlname}
   </p>
<button
onClick={handleChangeEmployee}
className=" text-blue-500 underline rounded-lg flex items-center ">
Change 
</button>
 </div>  )}
        
         </div>

 
            
         {(bulkScan || bulkscancheck) && (
  <div className="w-full flex flex-row justify-between pl-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="bulkScan"
        checked={bulkScan}
        onChange={handleToggleBulkScan}  
        className="mr-2"
      />
      <label htmlFor="bulkScan" className="text-gray-700 font-medium">
        Bulk Scan
      </label>      
    </div>
  </div>
)}




          <div className="p-2 mb-8 transition-all duration-300 ease-in-out transform hover:scale-102">
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
             <div className="h-[1.5rem] my-4">
               {errorMessage && <p className="text-red-600 text-base text-center">{errorMessage}</p>}
             </div>
              <form onSubmit={(e) => { e.preventDefault(); handleScanSubmit(); }} className="w-fit">
               <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full">
                 <input
                   type="text"
                   className="p-3 w-fit text-gray-700 placeholder-gray-400 focus:outline-none"
                   placeholder="Enter Job or RM Bag ID"
                   value={scannedCode}
                   onChange={handleChange}
                   ref={JobRef}
                 />
                 <button
                   onClick={handleScanSubmit}
                   className={`bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white px-6 py-3 font-semibold rounded-r-lg hover:bg-green-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                   disabled={loading}
                 >
                   {loading ? <ClipLoader size={20} color="#fff" /> : (
                     <>
                       <FaQrcode className="mr-2 h-full" /> Scan
                     </>

)}
                 </button>
               </div>
             </form>
</div>



</div>  


</div>  

{mode === 'Issue' && (jobDetails || returnjobdetails || bulkJobDetails.length > 0) && (
<div className='flex flex-col'> 
{!returnjobdetails && !bulkScan &&  (
  <button
  onClick={handleissuesubmit}
  className={`bg-gradient-to-r from-orange-300 to-orange-500 m-3 rounded-md   flex items-center justify-center text-lg text-white px-6 py-3 mt-4 font-semibold hover:bg-green-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={loading}
>
  {loading ? (
    <ClipLoader size={20} color="#fff" />
  ) : (
    <>
     Unlock Engage
      <TfiUnlock size={20} className="ml-2" />
    </>
  )}
</button>
)}
  <button
    onClick={handleissuesubmit}
    className={`bg-gradient-to-r from-blue-400 to-blue-600 flex  m-3 rounded-md mt-0 items-center justify-center text-lg text-white px-6 py-3 font-semibold hover:bg-green-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={loading}
  >
    {loading ? (
      <ClipLoader size={20} color="#fff" />
    ) : (
      <>
        Issue All
        <BiArrowToRight size={26} className="ml-2" />
      </>
    )}
  </button>

</div>
)}
{/* {bulkScan &&   &&(
  <button
    onClick={handleissuesubmit}
    className={`bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-lg text-white px-6 py-3 mt-4 font-semibold  hover:bg-green-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={loading}
  >
    {loading ? <ClipLoader size={20} color="#fff" /> : (
      <>
         Issue All
       <BiArrowToRight size={20} className="ml-2" />

      </>
    )}
  </button>
)}         */}
       </div>
<div className='w-full  flex felx-col  h-screen overflow-auto '>



{mode === 'Issue' ? (
<>
  {bulkScan  ? (
  <div className='w-full h-full items-start flex flex-col justify-start'>
                <Bulkjobscan jobList={bulkJobDetails} />
  
  </div>
              ) : (
                jobDetails &&   
               <div className='p-4 w-full h-screen flex flex-col justify-between' >
                <Jobdetails jobDetail={jobDetails} />
                {rfBagArray.length > 0 && (
                <div className="h-[30vh] overflow-auto flex flex-col justify-end items-end ">
                  <RfBagDetails bagDetails={rfBagArray}     setBagDetails={setRfBagArray}/> 
                </div>
              )}
                <JobDetailsTab jobDetail={jobDetails}/>
               </div>
                
              )}

{returnjobdetails &&  !bulkScan &&(
<>
<div className='p-4 w-full h-screen flex flex-col justify-between' >
        <Jobdetails jobDetail={returnjobdetails} />
        {rfBagArray.length > 0 && (
        <div className="h-[30vh] overflow-auto flex flex-col justify-end items-end ">
          <RfBagDetails bagDetails={rfBagArray}  setBagDetails={setRfBagArray}  />
        </div>
      )}
        <JobDetailsTab jobDetail={returnjobdetails} />
       </div>
</>
)}
</>):(<> 
{returnModeJob && (
  
  <div className='p-4 w-full h-screen flex flex-col justify-between' >  
    <Jobdetails jobDetail={returnModeJob} />
    <ReturnJobDetails jobDetails={returnModeJob}/>
    <JobDetailsTab jobDetail={returnModeJob} />
 </div>
  )}
</>)}
</div>
       </div>        
          )}
    </div>
      </div>
    </div>
  );
};

export default ScannerAndDetails;

