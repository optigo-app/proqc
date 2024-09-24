import React, { useState, useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
import axios from 'axios';
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { ClipLoader } from 'react-spinners';
import '../components/Scanner.css';
import Scannericon from '../Assets/Qrcode.png';

const SideDetails = ({ togglepanel, onScannerStateChange, showScanner }) => {
  const [hasCamera, setHasCamera] = useState(true);
  const [barcode, setBarcode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // Controls whether job details are shown or scanner is shown
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && !scannerRef.current && hasCamera && showScanner) {
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
  }, [hasCamera, showScanner]);

  useEffect(() => {
    onScannerStateChange(!showDetails); 
  }, [showDetails]);

  const handleScan = (result) => {
    if (result) {
      setBarcode(result);
      setHasCamera(false);
      handleCodeSubmit(result);
    }
  };

  const handleCodeSubmit = async (scannedCode) => {
    setLoading(true);
    try {
      const response = await axios.post('API_URL', { /* payload */ });
      if (response.data.success) {
        setShowDetails(true); // Show job details on success
      } else {
        setErrorMessage('Job scan failed.');
      }
    } catch (error) {
      setErrorMessage('Network issue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full p-4 transition-all duration-300">
      {showScanner && !showDetails ? (
             <div className="w-full max-w-lg flex flex-col items-center justify-centerp-8 pt-2">
             <div className="flex justify-end  w-full  items-center mb-4">
       
         <button className="p-2 bg-gray-500 text-white rounded" onClick={togglepanel}>
           <FontAwesomeIcon icon={faArrowRight} />
         </button>
       </div>
           {hasCamera ? (
             <div className="h-64 w-64 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg mx-auto">
               <video ref={videoRef} style={{ width: '16rem', height: '16rem' }} />
             </div>
           ) : (
             <div className="relative h-64 w-64 bg-gray-50 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
             <img
               src={Scannericon}
               alt="scanner"
               className="absolute inset-0 w-full h-full object-cover"
             />
           
             <div className="absolute top-0 left-0 w-full h-full">
               <div className="absolute top-0 w-full h-1 bg-red-500 animate-scanner-line"></div>
             </div>
           
             <button
               onClick={handleToggleScanner}
               className="relative z-10 p-4 bg-[#f9fafb] text-indigo-500 text-xl font-bold "
             >
               Click here to scan
             </button>
           </div>
           
           )}
 <div className='h-[1.5rem]  my-4'>
 {errorMessage && <p className="text-red-600 text-base text-center ">{errorMessage}</p>}
 
 </div>
 
           <div className="">
             <form onSubmit={(e) => { e.preventDefault(); handleCodeSubmit(barcode); }} className="flex flex-col items-center">
               <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full">
                 <input
                   type="text"
                   className="p-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                   placeholder="Enter job#"
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
      ) : (
        <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
        <button
           className="p-2 bg-gray-500 text-white rounded"
           onClick={handleToggleScanner}
         >
               <MdOutlineQrCodeScanner size={24} />
         </button>
         {productData ? (
         <h3 className="text-2xl font-bold text-gray-700"> {productData.jobserialno}</h3>):(<></>)}
         <button
           className="p-2 bg-gray-500 text-white rounded"
           onClick={togglepanel}
         >
           <FontAwesomeIcon icon={faArrowRight} />
         </button>
       </div>
 
       {productData ? (
         <div className="space-y-6 w-lg  ">
           <div className="text-center">
             <p className="text-xl font-semibold text-gray-800">
               ({productData.designno}) for <span className="text-blue-500">{productData.CustomerCode}</span>
             </p>
           </div>
           <div className="w-full flex justify-center mb-4">
             <img
               src={fulllink}
               alt="Product"
               className="w-40 h-40 object-cover rounded-lg shadow-lg"
             />
           </div>
           <div className="text-center">
             <p className="text-lg font-semibold text-gray-600">
               {productData.MetalType} {productData.MetalColor} <span className="text-blue-500">{metaltype}</span>
             </p>
           </div>
 
           <div className="grid grid-cols-2 gap-4">
             {[
               { label: "Gross Wt", value: productData.GrossWeightgm, subValue: productData.estmatedGrossWt || '0' },
               { label: "Net Wt", value: productData.NetWtgm, subValue: productData.estmatedNetWt || '0' },
               { label: "Dia (Wt/Pc)", value: `${productData.Diamond_actualctw} | ${productData.Diamond_actualpcsused}`, subValue: `${productData.estmatedDiamondctw || '0'} | ${productData.estmatedDiamondpcs || '0'}` },
               { label: "Cs (Wt/Pc)", value: `${productData.ColorStone_actualctw} | ${productData.ColorStone_actualpcsused}`, subValue: `${productData.estmatedColorstonectw || '0'} | ${productData.estmatedcolorstonepcs || '0'}` },
               { label: "Misc (Wt/Pc)", value: `${productData.Misc_actualctw} | ${productData.Misc_actualpcsused}`, subValue: `${productData.estmatedMiscctw || '0'} | ${productData.estmatedMiscPcs || '0'}` },
             ].map((item, idx) => (
               <div key={idx} className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                 <span className="block text-sm text-gray-400">{item.label}</span>
                 <span className="block text-lg font-semibold text-blue-500">{item.value}</span>
                 {/* <span className="block text-xs text-gray-500">{item.subValue}</span> */}
               </div>
             ))}
           </div>
 
           <div className="mt-6">
             <div className="flex justify-between items-center">
               <span className="text-sm  text-gray-400">Status :
               <span
                 className={`px-4 pl-1 py-2 rounded-md  font-semibold ${
                   productData.qccurrentstatus=== 'Approved'
                     ? '  text-xl text-green-600'
                     : productData.qccurrentstatus === 'Rejected'
                     ? '  text-xl text-red-600'
                     : productData.qccurrentstatus === 'Pending'
                     ? ' text-xl text-yellow-500'
                     : ' text-xl text-gray-300'
                 }`}
               >
                 {productData.qccurrentstatus}
               </span>
               </span>
             </div>
           </div>
         </div>
       ) : (
         <div className='w-lg h-full flex justify-center'>
           <p>No Data Available</p>
         </div>
       )}
           {/* <button onClick={handleToggleScanner} className="mt-4 p-2 bg-blue-500 text-white rounded">
             Scan Another Job
           </button> */}
         </div>
      )}
    </div>
  );
};

export default SideDetails;
