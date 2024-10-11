import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobQuestions from './Pages/JobQuestions';
import ScannerPage from './Pages/ScannerPage';
import Scanemp from './Pages/Scanemployee';
import FetchDataComponent from './Recoil/FetchDataComponent'
import Login from './Pages/Login';
import JobScan from './Pages/JobScan/JobScan';
import ScannerAndDetails from './Pages/ScannerAndDetails/ScannerAndDetails';

const App = () => {
  return (
   <>
    <FetchDataComponent />

{/* <Router> */}
{/* <Router basename="/proqc"> */}
  <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/*" element=
    
    { <>
   <Login/>
    </>} /> 
    <Route path="/empscan" element={ <><FetchDataComponent /><Scanemp/></>} />
    <Route path="/ScannerPage/*" element={<ScannerPage />} />
    <Route path="/job-questions" element={<JobQuestions />} />
    {/* <Route path="/JobScan" element={<JobScan />} /> */}
    <Route path="/JobScan" element={<ScannerAndDetails />} />
  </Routes>
{/* </Router> */}
   </>
  );
};

export default App;

