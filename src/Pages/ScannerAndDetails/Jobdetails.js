import React from 'react'
import { FaInfoCircle } from 'react-icons/fa';

const Jobdetails = ({ jobDetail }) => {

  const InfoItem = ({ label, value }) => (
    <div className="flex flex-col">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-700 capitalize">{value}</p>
    </div>
  );

  return (
    <div className="bg-white px-6 rounded-lg shadow-md  p-2  h-[20vh]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-0">
        <h2 className="text-2xl font-bold text-indigo-700">
          {jobDetail.jobId} ({jobDetail.designNumber})
        </h2>
      <div className='flex flex-row gap-3'>
      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-lg font-semibold">
          Last Received: {jobDetail.lastReceived}
        </span>
        <button className="text-gray-400 hover:text-indigo-500 transition-colors duration-200">
          <FaInfoCircle className="text-2xl" />
        </button>
      </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Image and Serial Info */}
        <div className="flex flex-col items-start">
          <img
            src={jobDetail.image}
            alt={jobDetail.name}
            className="w-24 h-24 object-cover rounded-md mb-2"
          />
          <p className="text-lg font-semibold text-gray-800">{jobDetail.serialFor}</p>
          <p className="text-gray-600">{jobDetail.name}</p>
        </div>

        {/* Info Items */}
        <div className="sm:col-span-2 grid grid-cols-2 gap-1">
          <InfoItem label="Customer Name" value={jobDetail.customerName} />
          <InfoItem label="PO" value={jobDetail.poNumber} />
          <InfoItem label="Bag Location" value={jobDetail.location} />
          <InfoItem label="Misc Add in Gross wt" value={jobDetail['Misc Add in Gross wt']} />
          <InfoItem label="Is HMW Job?" value={jobDetail['Is HMW Job?']} />
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Current Status</p>
            <p className="font-medium text-yellow-600">{jobDetail.currentStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobdetails;
