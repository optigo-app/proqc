import React, { useState } from 'react';
import QrReader from 'react-qr-barcode-scanner';
import ring from "../Assets/Ring.png";
import {  faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Scannericon from '../Assets/Qrcode.png'
import { MdStart } from "react-icons/md";


const productData = {
  jobid: '1/14804',
  image: ring,
  estmatedGrossWt: '5.1001 gm',
  estmatedNetWt: '0.5 gm',
  estmatedDiamondctw: '0.784 ctw',
  estmatedDiamondpcs: '23 pcs',
  estmatedColorstonectw: '0.131 ctw',
  estmatedcolorstonepcs: '11 pcs',
  estmatedMiscctw: '0.45 ctw',
  estmatedMiscPcs: '1 pcs',
  GrossWt: '5.001 gm',
  NetWt: '0.1 gm',
  Diamondctw: '0.884 ctw',
  Diamondpcs: '26 pcs',
  Colorstonectw: '0.171 ctw',
  colorstonepcs: '11 pcs',
  Miscctw: '0.5 ctw',
  MiscPcs: '2 pcs',
  Status: 'Approved',
};

const Scanner = ({ togglePanel,visibility,handlenext }) => {
  const [hasCamera, setHasCamera] = useState(true);
  const [code, setCode] = useState('');
  const [scannedCode, setScannedCode] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleCodeSubmit = () => {
    setShowDetails(true);
  };

  const handleScan = (result) => {
    if (result) {
      setScannedCode(result.text);
      setShowDetails(true);
    }
  };

  return (
    <div className="w-screen min-h-screen  flex-col overflow-x-hidden md:h-screen md:max-h-screen bg-transparent md:bg-gray-100 flex items-center justify-between p-0 md:px-4 py-4">
     <div className={ `${visibility} pl-4 h-fit w-screen`}>
       <div
          className=" p-2 bg-gray-800 text-white rounded"
          onClick={togglePanel}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
       </div>   
      <div className="w-full bg-white my-auto  lg:max-w-4xl md:rounded-xl md:shadow-xl overflow-auto flex flex-col md:flex-row" >
    
        <div className="w-full md:w-[40%] p-6 bg-transparent md:bg-gray-50 md:  pt-20   flex flex-col items-center justify-start">
          {hasCamera ? (
            <div className="h-64  w-64 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">
              <QrReader
                delay={300}
                onScan={handleScan}
                onError={() => setHasCamera(false)}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          ) : (
            <div className="h-64  w-64  bg-white flex items-center justify-center rounded-lg shadow-lg">
              <img src={Scannericon} alt="scanner" className='h-full w-full object-contain' />
            </div>
          )}
          <div className=" mt-6">
            <div className="flex items-center justify-between pr-0 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
              <input
                type="text"
                className="p-3 w-full max-w-64 text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter job ID"
                value={scannedCode || code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                className=" bg-gradient-to-r from-[#26cc00] to-[#009c1a] h-full text-white px-5 py-3 font-semibold rounded-r-lg hover:bg-green-600 shadow-md transition duration-200 ease-in-out"
                onClick={handleCodeSubmit}
              >
                Go
              </button>
            </div>
          </div>
        </div>
        <div className="w-screen md:w-[60%]  h-[50rem]  flex  justify-center overflow-auto">

        {showDetails && ( 
          <div className="md:p-6    flex flex-col justify-center ">
            <div className="text-center mb-4">
              <p className="text-gray-800 font-bold text-xl">
                <span className="text-[#56a4ff]">{code || scannedCode} (T321)</span> For Bunty
              </p>
            </div>
            <div className="w-full flex justify-center h-full items-center ">
            <img
                src={productData.image}
                alt="Product"
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="grid  w-screen md:w-auto px-2  md:mt-auto grid-cols-2 gap-4">
              <div className="bg-[rgba(227,227,227,0.2)] shadow-xl border-gray-100 p-4 rounded-lg ">
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">Gross Wt:</span>
                </div>
                <div className="mt-0">
                  <span className="text-xl text-[#56a4ff] font-semibold">{productData.GrossWt}</span>
                  <div className="text-xs text-gray-500"> {productData.estmatedGrossWt}</div>
                </div>
              </div>
              <div className="bg-[rgba(227,227,227,0.2)] shadow-xl border-gray-100 p-4 rounded-lg ">
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">Net Weight:</span>
                </div>
                <div className="mt-0">
                  <span className="text-xl text-[#56a4ff] font-semibold">{productData.NetWt}</span>
                  <div className="text-xs text-gray-500"> {productData.estmatedNetWt}</div>
                </div>
              </div>
              <div className="bg-[rgba(227,227,227,0.2)] shadow-xl border-gray-100 p-4 rounded-lg ">
                  <span className="text-sm text-gray-400">Diamond:</span>
                <div className="mt-0">
                  <span className="text-xl text-[#56a4ff] font-semibold">{productData.Diamondctw} | {productData.Diamondpcs}</span>
                  <div className="text-xs text-gray-500"> {productData.estmatedDiamondctw} | {productData.estmatedDiamondpcs}</div>
                </div>
              </div>
              <div className="bg-[rgba(227,227,227,0.2)] shadow-xl border-gray-100 p-4 rounded-lg ">
                  <span className="text-sm text-gray-400">Colorstone:</span>
                <div className="mt-0">
                  <span className="text-xl text-[#56a4ff] font-semibold">{productData.Colorstonectw} | {productData.colorstonepcs}</span>
                  <div className="text-xs text-gray-500"> {productData.estmatedColorstonectw} | {productData.estmatedcolorstonepcs}</div>
                </div>
              </div>
              <div className="bg-[rgba(227,227,227,0.2)] shadow-xl border-gray-100 p-4 rounded-lg ">
                  <span className="text-sm text-gray-400">Misc:</span>
                <div className="mt-0">
                  <span className="text-xl text-[#56a4ff] font-semibold">{productData.Miscctw} | {productData.MiscPcs}</span>
                  <div className="text-xs text-gray-500"> {productData.estmatedMiscctw} | {productData.estmatedMiscPcs}</div>
                </div>
              </div>
              {/* <div className="bg-[rgba(227,227,227,0.2)] shadow-xl border-gray-100 p-4 rounded-lg  col-span-2"> */}
              <div className="  col-span-2">
               <div className='w-full h-fit flex justify-between'>
              <div>
              <div className="flex items-center">
                  <span className="text-sm text-gray-400">Status:</span>
                </div>
                <div className="mt-1 bg-green-600 rounded-md w-fit p-3 py-2">
                  <span className="text-lg text-white font-semibold">{productData.Status}</span>
                </div>
              </div>
              <div>
              <div className="flex items-center">
                  <span className="h-[1.25rem] text-white"></span>
                </div>
                <div className="mt-1 w-fit p-3 gap-2 py-2 bg-gradient-to-r   to-[#55a1f6] from-[#3f78ba] rounded-full shadow-lg flex items-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
                onClick={handlenext}
                >
      <span className="text-lg text-white font-semibold">Start QC</span>
      <MdStart size={24} className="text-white" />
    </div>

              </div>
               </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
      
    </div>
  );
};

export default Scanner;
