import React, { useEffect, useState, useRef } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';

const RfBagDetails = ({ bagDetails, setBagDetails }) => {
  const [expandedIndex, setExpandedIndex] = useState(bagDetails.length - 1);
  const [issuedWeight, setIssuedWeight] = useState({});
  const [tempWeight, setTempWeight] = useState(''); 
  const [pcs, setPcs] = useState({});
  const [tempPcs, setTempPcs] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const WeightRef = useRef(null); 
  const pcsInputRef = useRef(null); 
  
  
 const toggleExpand = (index) => {
     setExpandedIndex(expandedIndex === index ? null : index);
     const selectedBag = bagDetails[index];
     setTempWeight(issuedWeight[selectedBag.rfbagid] || '');
     setTempPcs(selectedBag.Material === 'DIAMOND' ? pcs[selectedBag.rfbagid] || '' : '');
     setErrorMessage(''); 
};

  useEffect(() => {
    if (expandedIndex && WeightRef.current) {
      WeightRef.current.focus();
    }
  }, [expandedIndex]);


  const handleRemove = (index) => {
    setBagDetails((prevBagDetails) => prevBagDetails.filter((_, i) => i !== index));
    if (index === expandedIndex) {
      setExpandedIndex(bagDetails.length - 2);
    }
  };

  useEffect(() => {
    if (!bagDetails[expandedIndex]) {
      setExpandedIndex(bagDetails.length - 1);
    }
  }, [bagDetails, expandedIndex]);
  
  const handleIssue = (index) => {
    const selectedBag = bagDetails[index];

    // Check if weight or pcs is empty
    if (!tempWeight || (selectedBag.Material === 'DIAMOND' && !tempPcs)) {
      setErrorMessage('Weight and Pcs must not be empty.');
      return; // Stop the issuing process
    }

    setIssuedWeight((prev) => ({
      ...prev,
      [selectedBag.rfbagid]: tempWeight,
    }));

    if (selectedBag.Material === 'DIAMOND') {
      setPcs((prev) => ({
        ...prev,
        [selectedBag.rfbagid]: tempPcs, 
      }));
    }

    // Automatically expand next item if there are more than 2 items in the list
    if (bagDetails.length > 2) {
      if (index < bagDetails.length - 1) {
        // Open the next item
        setExpandedIndex(index + 1);
        // Reset temporary values for the next item
        const nextBag = bagDetails[index + 1];
        setTempWeight(issuedWeight[nextBag.rfbagid] || '');
        setTempPcs(nextBag.Material === 'DIAMOND' ? pcs[nextBag.rfbagid] || '' : '');
      } else {
        // If the last item was issued, stay on the last one
        setExpandedIndex(bagDetails.length - 1);
      }
    }
  };

  return (
    <div className="w-full h-[30vh] flex flex-row-reverse gap-3">
      <div className="w-1/2 pr-4 h-[30vh] overflow-auto">
        {bagDetails.map((rfBagDetails, index) => (
          <div key={index} className={`w-full mx-auto shadow-lg rounded-lg overflow-hidden mt-1 transition-all duration-300 ease-in-out ${expandedIndex === index ? 'bg-[#DCF6E8]' : 'bg-white'}`}>
            <div className="p-4 cursor-pointer" onClick={() => toggleExpand(index)}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg flex flex-row font-semibold ">
                  <span className="flex flex-row justify-center items-center gap-2">
                    <span className='p-1 px-3 bg-[#DCF6E8] text-[#28c76f] rounded-md' style={{fontWeight:'500' }} >{rfBagDetails.rfbagid}</span> 

                    {rfBagDetails.Material === 'METAL' && (
                      <p className='text-gray-500 text-sm font-medium'>{rfBagDetails.Purity} {rfBagDetails.Color} {rfBagDetails.Type}</p>
                    )}
                    {rfBagDetails.Material === 'DIAMOND' && (
                      <p className='text-gray-500 text-sm font-medium'>{rfBagDetails.Material} ({rfBagDetails.Shape} {rfBagDetails.Ctw} {rfBagDetails.Color} {rfBagDetails.Size})</p>
                    )}
                  </span>
                </h3>
                <div className='flex flex-row gap-3'>
                  <p>
                    {rfBagDetails.Material === "DIAMOND" && issuedWeight[rfBagDetails.rfbagid] && (
                      <div className="text-base font-medium text-gray-800">
                        | Issued Weight: {issuedWeight[rfBagDetails.rfbagid]} Ctw | Pcs: {pcs[rfBagDetails.rfbagid] || '0'}
                      </div>
                    )}
                    {rfBagDetails.Material === "METAL" && issuedWeight[rfBagDetails.rfbagid] && (
                      <div className="text-base font-medium text-gray-800">
                        | Issued Weight: {issuedWeight[rfBagDetails.rfbagid]} Gm
                      </div>
                    )}
                  </p>
                  <div className="flex items-center">
                    <button onClick={() => handleRemove(index)} className="text-gray-400 hover:text-gray-600">
                      <FaTimes size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-1/2 h-full bg-white border-none rounded-lg p-6">
        {bagDetails[expandedIndex] ? (
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col justify-start">
              <span className='p-1 px-3 bg-[#DCF6E8] text-[#28c76f] font-semibold rounded-md w-fit text-xl mb-1'>
                {bagDetails[expandedIndex].rfbagid}
              </span>
              <div className="flex flex-col w-full justify-between">
                <div className="grid grid-cols-1 gap-4 mb-2">
                  {bagDetails[expandedIndex].Material === 'METAL' && (
                    <p className='text-gray-500 text-lg'>{bagDetails[expandedIndex].Purity} {bagDetails[expandedIndex].Color} {bagDetails[expandedIndex].Type}</p>
                  )}
                  {bagDetails[expandedIndex].Material === 'DIAMOND' && (
                    <p className='text-gray-500 text-lg'>{bagDetails[expandedIndex].Material} ({bagDetails[expandedIndex].Shape} {bagDetails[expandedIndex].Ctw} {bagDetails[expandedIndex].Color} {bagDetails[expandedIndex].Size})</p>
                  )}
                </div>
                <div className='w-full justify-center flex'>
                  <div className="p-2 w-64 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <h4 className="text-right text-gray-500 text-base">Issued Weight:</h4>
                      <input
                        // type="number"
                        value={tempWeight}
                        onChange={(e) => {
                          setTempWeight(e.target.value);
                          setErrorMessage(''); 
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') { 
                            if (bagDetails[expandedIndex].Material === 'DIAMOND') {
                              pcsInputRef.current.focus(); 
                            } else {
                              handleIssue(expandedIndex); 
                            }
                          }
                        }}
                        placeholder="Weight"
                        className="w-full p-1 border-2 rounded border-gray-500 text-lg"
                        ref={WeightRef}

                      />

                      {bagDetails[expandedIndex].Material === 'DIAMOND' && (
                        <>
                          <h4 className="text-right text-gray-500 text-base">Issued Pcs:</h4>
                          <input
                            ref={pcsInputRef} 
                            // type="number"
                            value={tempPcs}
                            onChange={(e) => {
                              setTempPcs(e.target.value);
                              setErrorMessage(''); 
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleIssue(expandedIndex); 
                              }
                            }}
                            placeholder="Pcs"
                            className="w-full p-1 border-2 rounded border-gray-500 text-lg"
                          />
                        </>
                      )}
                    </div>

                  <div className='h-[1.25rem] mt-3'>
                  {errorMessage && (
                      <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
                    )}
                  </div>
                    
                    <div className="flex justify-end ">
                      <button
                        onClick={() => handleIssue(expandedIndex)}
                        className="flex items-center justify-center bg-[#28c76f] text-white text-lg px-2 py-1 rounded hover:bg-[#4dc284] transition duration-300"
                      >
                        <FaPlus className="mr-1" /> Issue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='h-full w-full justify-center items-center text-center'><p>No RMbag Selected</p></div>
        )}
      </div>
    </div>
  );
};

export default RfBagDetails;
