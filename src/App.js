import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobQuestions from './Pages/JobQuestions';
import ScannerPage from './Pages/ScannerPage';
import Scanemp from './Pages/Scanemp'
import FetchDataComponent from './Recoil/FetchDataComponent'

const App = () => {
  return (
   <>
    <FetchDataComponent />

<Router basename="/proqc">
  <Routes>
    <Route path="/" element={<Scanemp/>} />
    <Route path="/ScannerPage" element={<ScannerPage />} />
    <Route path="/job-questions" element={<JobQuestions />} />
  </Routes>
</Router>
   </>
  );
};

export default App;


 