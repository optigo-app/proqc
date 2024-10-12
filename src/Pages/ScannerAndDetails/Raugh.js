import React, { useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

export default function JobDetailsCard({ jobDetail }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-[20vh] flex overflow-hidden">
      <div className="flex-shrink-0 w-1/4 pr-4">
        <img
          src={jobDetail.image}
          alt={jobDetail.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-indigo-600">
              {jobDetail.jobId} <span className="text-gray-500">({jobDetail.designNumber})</span>
            </h2>
            <p className="text-sm font-medium text-gray-700">{jobDetail.name}</p>
            <p className="text-xs text-gray-500">{jobDetail.serialFor}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">{jobDetail.customerName}</p>
            <p className="text-xs text-gray-500">PO: {jobDetail.poNumber}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Bag Location</p>
            <p className="font-medium">{jobDetail.location}</p>
          </div>
          <div>
            <p className="text-gray-500">Misc Add in Gross wt</p>
            <p className="font-medium">{jobDetail['Misc Add in Gross wt']}</p>
          </div>
          <div>
            <p className="text-gray-500">Is HMW Job?</p>
            <p className="font-medium">{jobDetail['Is HMW Job?']}</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-gray-500">Current Status</p>
            <p className="text-sm font-semibold text-yellow-600">{jobDetail.currentStatus}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Last Received: {jobDetail.lastReceived}
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
            >
              <FaInfoCircle size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 w-1/4 pl-4 flex flex-col justify-between">
        <div>
          <p className="text-xs text-gray-500">T.D.</p>
          <p className="text-sm font-medium">
            {jobDetail.DiamondPcs} Pcs / {jobDetail.DiamondWt}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Metal</p>
          <p className="text-sm font-medium">{jobDetail.Metal}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Sprued Wt</p>
          <p className="text-sm font-medium underline cursor-pointer">{jobDetail.SprewWt}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-indigo-600">
                  Estimated Material For: {jobDetail.jobId}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                >
                  <AiOutlineClose className="text-2xl" />
                </button>
              </div>
              {/* Modal content goes here */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}