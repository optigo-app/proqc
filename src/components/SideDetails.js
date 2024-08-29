import React from 'react';
import img from "../Assets/Ring.png";

const SideDetails = () => {
  const productDetails = {
    jobId: '1/265009 [1H572] for EG302',
    goldType: 'GOLD 22K(Yellow)',
    grossWt: '5.000',
    metalWt: '5.000',
    productType: '2',
    category: 'Necklace',
    hallmark: 'With HallMark',
    imageUrl: img,
  };

  return (
    <div className="w-full p-2  px-6 border bg-[#f4f4f4] justify-between shadow-lg flex flex-col md:flex-row items-center transform transition-transform duration-300 " style={{alignItems:'center'}}>
     <div className='flex flex-row h-full items-center'>
     <div className="text-center mb-4 md:mb-0 md:mr-6 h-full flex items-center  ">
        <p className="text-xl font-semibold  text-gray-700">   
          {productDetails.jobId}
        </p>
      </div>
      <div className="bg-white text-center py-3 px-5 rounded-lg mb-4 md:mb-0 md:mr-6 shadow-md">
        <p className="text-black font-semibold">{productDetails.goldType}</p>
      </div>
     </div>
      <ul className="space-y-2 text-sm text-[#444] flex flex-col md:flex-row md:space-x-6 md:space-y-0">
        <li className='text-gray-600 flex flex-row items-center gap-2'>
          Gross Wt: <span className="font-semibold text-lg"> {productDetails.grossWt}</span>
        </li>
        <li className='text-gray-600 flex flex-row items-center gap-2'>
          Metal Wt: <span className="font-semibold text-lg"> {productDetails.metalWt}</span>
        </li>
        <li className='text-gray-600 flex flex-row items-center gap-2'>
          Product Type: <span className="font-semibold text-lg"> {productDetails.productType}</span>
        </li>
        <li className='text-gray-600 flex flex-row items-center gap-2'>
          Category: <span className="font-semibold text-lg"> {productDetails.category}</span>
        </li>
        <li className='text-gray-600 flex flex-row items-center gap-2'>
          HallMark: <span className="font-semibold text-lg"> {productDetails.hallmark}</span>
        </li>
      </ul>
      <div className="mt-4 md:mt-0 md:ml-6 text-center">
        <img
          src={productDetails.imageUrl}
          alt="Product"
          className="w-20 h-20 object-contain mx-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default SideDetails;
