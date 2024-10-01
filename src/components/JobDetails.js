import React from 'react';
import { Conclusion } from '../Pages/JobQuestions';

const JobDetails = ({ finalHistory }) => {
  if (!finalHistory.length) return null;

  const statusObj = Conclusion.find(item => item.id === String(finalHistory[0]?.statusid)) || {};
  const jobInfo = finalHistory[0] || {};

  return (
    <div className="bg-white h-screen flex flex-col justify-start shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Previous History for{" "}
        <span className="text-blue-600">{jobInfo?.serialjobno || 'N/A'}</span>
      </h2>

      <div className="mb-6">
        <p className="text-gray-700 text-lg">
          <span className="font-medium">Done By</span>{" "}
          <span className="font-semibold text-blue-600">
            {jobInfo?.empname || 'N/A'} ({jobInfo?.barcode || 'N/A'})
          </span>
        </p>
      </div>

      <div className="flex-grow mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Questions and Answers:</h3>
        {jobInfo?.que_opt && Object.keys(jobInfo?.que_opt).length > 0 ? (
          <ul className="list-disc pl-6">
            {Object.entries(jobInfo?.que_opt).map(([question, answer], index) => (
              <li key={question} className="mb-4">
                <p className="font-semibold text-lg text-gray-800">
                  {index + 1}. {question}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {answer.split(',').map((ans, ansIndex) => (
                    <span
                      key={ansIndex}
                      className="py-1 px-3 rounded-full border border-gray-300 bg-gray-100 text-gray-800"
                    >
                      {ans.trim()}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">
            {statusObj?.status === 'Approved' || statusObj?.status === 'Final Approved' ? (
              <span className="text-xl font-semibold" style={{ color: statusObj?.iconcolor }}>
                {statusObj?.status}
              </span>
            ) : (
              'No questions and answers available.'
            )}
          </p>
        )}
      </div>

      {statusObj?.status && (
        <div className="p-4 bg-gray-50 rounded-md shadow-sm">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            Department-wise QC Status:
            <p className="text-lg font-semibold" style={{ color: statusObj?.iconcolor }}>
              {statusObj?.status}
            </p>
          </h4>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
