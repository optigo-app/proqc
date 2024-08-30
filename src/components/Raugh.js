

// until maxwidth(1400px) ths will be the break point of my refrence larger screens whose width is larger than 1400px and smaller means smaller than width 1400px:
//  in larger screen it will look as it is given but in smaller screen 
// goldType: 'GOLD 22K(Yellow)',
// grossWt: '5.000',
// metalWt: '5.000',
// productType: '2',
// category: 'Necklace',
// hallmark: 'With HallMark',
// imageUrl: img,
// this details will be hidden and in the place of that there will be a button named as hamburger menu button by click on that it will open a slider from right side in that slider there will be all the product details shown in the mnost representable way as yu can :
// pease make it good looking and attractive
// in this code do as i say  make ths fully responsive so for making it responsive make it like in 1400px and smaller than that screen in side bar only show jobid at left side and at right side it will show a button with icon and name will be show details by click on that button it will open a side bar inside that there will be a image by out side clicking of that bar it will get closed also there will be a close icon too 
// do one tjhing when we click on show details button it is opening a slide bar when slide bar opens add a good anination and show all the productdata into slidebar arrange it proper

// show animation in slider

// breakpoint will be maxwidth1400 u can use mediaquery or anything as you want just give me desired answer
// normally use tailwind css so that ui doent changed but for setting up the breakpoint anhd show flex and hidden functionality and for my desired answer use normal css and media quesry

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
     <div className='flex flex-col xl:flex-row'>
     <div className='flex flex-row h-full items-center'>
     <div className="text-center mb-4 md:mb-0 md:mr-6 h-full flex items-center  ">
        <p className="text-xl font-semibold  text-gray-700">   
          {productDetails.jobId}
        </p>
      </div>
      <div className=" text-center  mb-4 md:mb-0 md:mr-6 ">
        <p className="text-black font-semibold">{productDetails.goldType}</p>
      </div>
     </div>
      <ul className="space-y-2 text-sm text-[#444] flex flex-row md:space-x-6 md:space-y-0">
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
     </div>
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

