import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaQrcode } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import ScannerIcon from '../../Assets/Qrcode.png';
import QrScanner from 'qr-scanner';
import { ReturnRmBags } from '../../fakeapi/ReturnRmBags';

const ReturnModal = ({isOpen, handleCloseReturnModal, selectedRowData, isWeightModalOpen, loading}) => {
  const rmBags = ReturnRmBags;
  const [hasCamera, setHasCamera] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [rmbagDetails, setRmbagDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [pcs, setPcs] = useState('');
  const [selectedReturnType, setSelectedReturnType] = useState(null); // New state for return type
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const JobRef = useRef(null);
  const WtRef = useRef(null);
  const [returnWeight, setReturnWeight] = useState('');
  const [wterror, setWterror] = useState('');

  useEffect(() => {
    if (isWeightModalOpen && JobRef.current) {
      JobRef.current.focus();
    }
  }, [isWeightModalOpen]);

  useEffect(() => {
    if (rmbagDetails && WtRef.current) {
      WtRef.current.focus();
    }
  }, [rmbagDetails]);

  const handleRMChange = (e) => {
    const value = e.target.value.toUpperCase();
    setErrorMessage('');
    setScannedCode(value);
  };

  const handleScan = (result) => {
    if (result) {
      setScannedCode(result);
      console.log("Scanned Result: ", result);
    }
  };

  const handleScanSubmit = () => {
    console.log(scannedCode);
    const foundBag = rmBags.find((bag) => bag.rmbagid === scannedCode);
    // Logic for matching foundBag details
  };

  const handlewtchange = (e) => {
    const value = e.target.value;
    setReturnWeight(value);
  };

  if (!isOpen || !selectedRowData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[50vw] min-w-[30vw]">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleCloseReturnModal}
            className="text-gray-500 hover:text-red-600 transition-colors duration-200"
          >
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 mb-6">
          {(selectedRowData?.item?.toUpperCase() === "DIAMOND" || 
            selectedRowData?.item?.toUpperCase() === "MISC" || 
            selectedRowData?.item?.toUpperCase() === "COLOR STONE") && (
            <div className="flex gap-2">
              {['Extra Return', 'Lost', 'Broken'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedReturnType(option)}
                  className={`px-4 py-2 rounded ${
                    selectedReturnType === option ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rest of your modal content (QR code scanner, form, etc.) */}

      </div>
    </div>
  );
};

export default ReturnModal;
