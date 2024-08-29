import React, { useState } from 'react';
import { FaBarcode } from 'react-icons/fa';
import QrReader from 'react-qr-barcode-scanner';
import ring from "../Assets/Ring.png";

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
  Status: 'Success',
};

const Scanner = () => {
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
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-lg mt-10 flex justify-center">
        {hasCamera ? (
          <div className="h-72 w-72 flex items-center justify-center bg-white rounded-lg shadow-xl">
            <QrReader
              delay={300}
              onScan={handleScan}
              onError={() => setHasCamera(false)}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : (
          <div className="h-48 w-48 bg-gray-200 flex items-center justify-center rounded-lg shadow-xl">
            <FaBarcode className="text-gray-700 text-6xl" />
          </div>
        )}
      </div>

      <div className="w-full max-w-lg mt-6">
      <div className='flex items-center pr-0 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden'>
        <input
            type="text"
            className="p-2 w-full text-gray-700 placeholder-gray-400 focus:outline-none "
            placeholder="Enter job ID"
            value={scannedCode || code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 my-0 h-full text-white px-5 py-3 font-semibold rounded-r-lg hover:from-green-600 hover:to-green-700 shadow-md transition duration-200 ease-in-out"
            onClick={handleCodeSubmit}
          >
            Go
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="w-full max-w-4xl mt-10 p-6 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <p className="text-gray-900 font-bold text-xl flex gap-2 mb-4">
              <span className="text-blue-600">{code || scannedCode} (T321)</span> For Bunty
            </p>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src={productData.image}
                alt="Product"
                className="w-40 h-40 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              <div className="flex items-center">
                <span className="w-32 text-sm text-gray-600">Gross Wt:</span>
                <div className="flex flex-col">
                  <span className="text-green-800 font-semibold">{productData.GrossWt}</span>
                  <span className="text-gray-600 text-sm">{productData.estmatedGrossWt}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm text-gray-600">Net Weight:</span>
                <div className="flex flex-col">
                  <span className="text-green-800 font-semibold">{productData.NetWt}</span>
                  <span className="text-gray-600 text-sm">{productData.estmatedNetWt}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm text-gray-600">Diamond:</span>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col">
                    <span className="text-green-800 font-semibold">{productData.Diamondctw}</span>
                    <span className="text-gray-600 text-sm">{productData.estmatedDiamondctw}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-green-800 font-semibold">{productData.Diamondpcs}</span>
                    <span className="text-gray-600 text-sm">{productData.estmatedDiamondpcs}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm text-gray-600">Colorstone:</span>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col">
                    <span className="text-green-800 font-semibold">{productData.Colorstonectw}</span>
                    <span className="text-gray-600 text-sm">{productData.estmatedColorstonectw}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-green-800 font-semibold">{productData.colorstonepcs}</span>
                    <span className="text-gray-600 text-sm">{productData.estmatedcolorstonepcs}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm text-gray-600">Misc:</span>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col">
                    <span className="text-green-800 font-semibold">{productData.Miscctw}</span>
                    <span className="text-gray-600 text-sm">{productData.estmatedMiscctw}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-green-800 font-semibold">{productData.MiscPcs}</span>
                    <span className="text-gray-600 text-sm">{productData.estmatedMiscPcs}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm text-gray-600">Status:</span>
                <div className="flex flex-col">
                  <span className="text-green-800 font-semibold">{productData.Status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;

// in this code in the place of barcode icon use a bit animated lottie kind of file in which scaning line will be moving and a bitattractive and also make this Data rpresentation Good Looking and more attractive