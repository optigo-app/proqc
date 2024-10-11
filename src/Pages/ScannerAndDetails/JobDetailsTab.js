import React, { useState } from 'react';
import SummaryTable from '../JobScan/SummeryTable';
import DetailsTable from '../JobScan/DetailsTable';
import { GrTransaction } from "react-icons/gr";


const TabIcon = ({ icon: Icon, isActive }) => (
  <Icon className={`w-8 h-8 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
);

const TabContent = ({ children, isActive }) => (
  <div
    className={`transition-all duration-300 ${
      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 absolute'
    }`}
  >
    {children}
  </div>
);

const JobDetailsTab = ({ jobDetail }) => {
  const [activeTab, setActiveTab] = useState('summary');

  const tabs = [
    { id: 'summary', icon: TableIcon, content: <SummaryTable jobDetail={jobDetail} /> },
    // { id: 'details', icon: ListIcon, content: <DetailsTable jobDetail={jobDetail} /> },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 pb-0 w-full  mx-auto">
      <div className="flex justify-start mb-2 text-blue-600 gap-3 text-lg  items-center">
        {/* {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center px-4  py-3 text-sm font-medium transition-all duration-200 ease-in-out rounded-md mr-2 last:mr-0 ${
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <TabIcon icon={tab.icon} isActive={activeTab === tab.id} />
            <span className="ml-2 capitalize">{tab.id}</span>
          </button>
        ))}
        */}

        <GrTransaction/>
        Transactions
      </div>
      <div className="relative overflow-hidden">
        {/* {tabs.map((tab) => (
          <TabContent key={tab.id} isActive={activeTab === tab.id}>
            {tab.content}
          </TabContent>
        ))} */}

        <SummaryTable/>
      </div>
    </div>
  );
};

const TableIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const ListIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

export default JobDetailsTab;

// import React, { useState } from 'react';
// import SummaryTable from '../JobScan/SummaryTable';
// import DetailsTable from '../JobScan/DetailsTable';

// const TabIcon = ({ icon: Icon, isActive }) => (
//   <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
// );

// const TabContent = ({ children, isActive }) => (
//   <div
//     className={`transition-all duration-500 ease-in-out absolute top-0 left-0 w-full ${
//       isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
//     }`}
//   >
//     {children}
//   </div>
// );

// const JobDetailsTab = ({ jobDetail }) => {
//   const [activeTab, setActiveTab] = useState('summary');

//   const tabs = [
//     { id: 'summary', icon: TableIcon, label: 'Summary', content: <SummaryTable jobDetail={jobDetail} /> },
//     { id: 'details', icon: ListIcon, label: 'Details', content: <DetailsTable jobDetail={jobDetail} /> },
//   ];

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl mx-auto flex">
//       <div className="w-48 flex flex-col space-y-2 mr-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center justify-start px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out rounded-md ${
//               activeTab === tab.id
//                 ? 'bg-blue-100 text-blue-600'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             <TabIcon icon={tab.icon} isActive={activeTab === tab.id} />
//             <span className="ml-3">{tab.label}</span>
//           </button>
//         ))}
//       </div>
//       <div className="flex-1 relative overflow-hidden" style={{ minHeight: '400px' }}>
//         {tabs.map((tab) => (
//           <TabContent key={tab.id} isActive={activeTab === tab.id}>
//             {tab.content}
//           </TabContent>
//         ))}
//       </div>
//     </div>
//   );
// };

// const TableIcon = ({ className }) => (
//   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//   </svg>
// );

// const ListIcon = ({ className }) => (
//   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
//   </svg>
// );

// export default JobDetailsTab;