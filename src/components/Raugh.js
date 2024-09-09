// import React, { useState, useEffect } from 'react';
// import { FaChevronLeft, FaChevronRight, FaCheck, FaRegThumbsUp, FaRegThumbsDown, FaPause, FaEllipsisH, FaQuestionCircle, FaCheckCircle, FaRegEdit } from 'react-icons/fa';
// import { BiSolidImageAdd } from "react-icons/bi";
// import { IoCloseOutline } from "react-icons/io5";
// import { useRecoilValue } from 'recoil';
// import { rdState, rd1State, rd2State, rd5State } from '../Recoil/FetchDataComponent';
// import Question from './Question';
// import { useLocation } from "react-router-dom";

// const useQueryParams = () => {
//   const location = useLocation();
//   return new URLSearchParams(location.search);
// };

// function Survey() {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [pageStartIndex, setPageStartIndex] = useState(0);
//   const [showSelection, setShowSelection] = useState(true);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [remarks, setRemarks] = useState({});
//   const [editingRemark, setEditingRemark] = useState(null);
//   const [images, setImages] = useState([]); 
//   const [noQuestionsAvailable, setNoQuestionsAvailable] = useState(false);

//   const queryParams = useQueryParams();
//   const qcID = queryParams.get('QCID');
//   console.log('qcID', qcID);
//   const questionsData = useRecoilValue(rdState);
//   const optionsData = useRecoilValue(rd1State);
//   const bindedData = useRecoilValue(rd2State);
//   const bindedQuestionsData = useRecoilValue(rd5State);

//   const Questions = questionsData.length ? questionsData : JSON.parse(localStorage.getItem('rd')) || [];
//   const Options = optionsData.length ? optionsData : JSON.parse(localStorage.getItem('rd1')) || [];
//   const Binded = bindedData.length ? bindedData : JSON.parse(localStorage.getItem('rd2')) || [];
//   const BindedQuestions = bindedQuestionsData.length ? bindedQuestionsData : JSON.parse(localStorage.getItem('rd5')) || [];

//   const filteredBindedQuestions = BindedQuestions.filter(bq => bq.qcdeptid === Number(qcID));
//   const bindedQuestionIds = filteredBindedQuestions.flatMap(bq => bq.que.split(',').map(Number));

//   const filteredQuestions = Questions.filter(q => bindedQuestionIds.includes(q.id));

//   const QuestionOptBinded = Binded.map((bind) => {
//     const question = filteredQuestions.find(q => q.id === bind.queid);
//     if (question) {
//       const optionIds = bind.opt.split(',').map(Number);
//       const questionOptions = Options.filter(option => optionIds.includes(option.id));
//       return {
//         id: question.id,
//         question: question.que,
//         options: questionOptions.map(opt => opt.opt).join(', ')
//       };
//     }
//     return null;
//   }).filter(item => item !== null);

//   useEffect(() => {
//     if (QuestionOptBinded.length > 0) {
//       setNoQuestionsAvailable(false);
//       const allQuestions = QuestionOptBinded;
//       const filteredQuestionsList = allQuestions.filter(q => selectedQuestions.includes(q.id));
//       setQuestionsToDisplay(showSelection ? allQuestions : filteredQuestionsList);
//     } else {
//       setNoQuestionsAvailable(true);
//     }
//   }, [QuestionOptBinded, selectedQuestions, showSelection]);

//   const [questionsToDisplay, setQuestionsToDisplay] = useState([]);

//   const conclusionQuestion = {
//     id: 'conclusion',
//     question: 'Conclusion',
//     options: 'Approved,Rejected,On Hold',
//   };

//   const currentQuestion = questionsToDisplay[currentQuestionIndex];
//   const isLastQuestion = currentQuestionIndex === questionsToDisplay.length - 1;

//   useEffect(() => {
//     const storedAnswers = JSON.parse(localStorage.getItem('answers'));
//     const storedSelectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions'));
//     const storedRemarks = JSON.parse(localStorage.getItem('remarks'));
//     if (storedAnswers) {
//       setAnswers(storedAnswers);
//     }
//     if (storedSelectedQuestions) {
//       setSelectedQuestions(storedSelectedQuestions);
//       if (storedSelectedQuestions.length > 0) {
//         setShowSelection(false);
//       }
//     }
//     if (storedRemarks) {
//       setRemarks(storedRemarks);
//     }
//   }, []);

//   useEffect(() => {
//     if (showSuccessMessage) {
//       setTimeout(() => {
//         setShowSuccessMessage(false);
//         setCurrentQuestionIndex(0);
//         setPageStartIndex(0);
//         setShowSelection(true);
//       }, 3000);
//     }
//   }, [showSuccessMessage]);

//   const handleOptionClick = (option) => {
//     const selectedOptions = answers[currentQuestion.id] || [];
//     const updatedOptions = selectedOptions.includes(option)
//       ? selectedOptions.filter(opt => opt !== option)
//       : [...selectedOptions, option];
//     const updatedAnswers = { ...answers, [currentQuestion.id]: updatedOptions };
//     setAnswers(updatedAnswers);
//     localStorage.setItem('answers', JSON.stringify(updatedAnswers));
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < questionsToDisplay.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       if (currentQuestionIndex + 1 >= pageStartIndex + 5) {
//         setPageStartIndex(pageStartIndex + 5);
//       }
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//       if (currentQuestionIndex - 1 < pageStartIndex) {
//         setPageStartIndex(pageStartIndex - 5);
//       }
//     }
//   };

//   const handlePaginationClick = (index) => {
//     setCurrentQuestionIndex(index);
//     if (index >= pageStartIndex + 5) {
//       setPageStartIndex(index - 4);
//     } else if (index < pageStartIndex) {
//       setPageStartIndex(index);
//     }
//   };

//   const handleScrollRight = () => {
//     if (pageStartIndex + 5 < questionsToDisplay.length) {
//       setPageStartIndex(pageStartIndex + 5);
//     }
//   };

//   const handleScrollLeft = () => {
//     if (pageStartIndex > 0) {
//       setPageStartIndex(pageStartIndex - 5);
//     }
//   };

//   const handleSubmit = () => {
//     localStorage.removeItem('answers');
//     localStorage.removeItem('selectedQuestions');
//     localStorage.removeItem('remarks');
//     setAnswers({});
//     setRemarks({});
//     setShowSuccessMessage(true);
//   };

//   const getSelectedCount = () => {
//     return (answers[currentQuestion.id] || []).length;
//   };

//   const handleQuestionSelectionChange = (questionId) => {
//     const updatedSelectedQuestions = selectedQuestions.includes(questionId)
//       ? selectedQuestions.filter(id => id !== questionId)
//       : [...selectedQuestions, questionId];
//     setSelectedQuestions(updatedSelectedQuestions);
//     localStorage.setItem('selectedQuestions', JSON.stringify(updatedSelectedQuestions));
//   };

//   const handleRemarkChange = (questionId, newRemark) => {
//     const updatedRemarks = { ...remarks, [questionId]: newRemark };
//     setRemarks(updatedRemarks);
//     localStorage.setItem('remarks', JSON.stringify(updatedRemarks));
//   };

//   const handleRemarkEdit = (questionId) => {
//     if (editingRemark === questionId) {
//       setEditingRemark(null);
//     } else {
//       setEditingRemark(questionId);
//     }
//   };

//   const handleRemarkSave = (questionId) => {
//     setEditingRemark(null);
//     handleRemarkChange(questionId, remarks[questionId] || '');
//   };

//   const toggleSelectAll = () => {
//     if (selectedQuestions.length === QuestionOptBinded.length) {
//       setSelectedQuestions([]);
//     } else {
//       setSelectedQuestions(QuestionOptBinded.map(q => q.id));
//     }
//   };

//   const handleImageUpload = (event) => {
//     const files = Array.from(event.target.files);
//     const newImages = files.map(file => URL.createObjectURL(file));
//     setImages(prevImages => [
//       ...prevImages,
//       ...newImages
//     ].slice(0, 4)); 
//   };

//   const handleRemoveImage = (index) => {
//     setImages(prevImages => prevImages.filter((_, i) => i !== index));
//   };

//   const currentQuestionNumber = currentQuestionIndex + 1;
//   const totalQuestions = selectedQuestions.length;

//   return (
//     <div className="flex flex-col lg:flex-row max-w-screen w-full  lg:w-[60vw]  mb-5 md:mb-5 h-fit  overflow-auto mx-auto p-6 bg-white shadow-md rounded-lg">
//       <div className="flex-grow">
//         {noQuestionsAvailable ? (
//           <div>No Questions Available</div>
//         ) : (
//           <div>
//             {questionsToDisplay.length > 0 && (
//               <div className="flex flex-col lg:flex-row mb-4">
//                 <div className="flex-none lg:w-32 lg:mr-4">
//                   <button
//                     className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
//                     onClick={handlePrevious}
//                     disabled={currentQuestionIndex === 0}
//                   >
//                     <FaChevronLeft />
//                   </button>
//                   <button
//                     className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg ml-2"
//                     onClick={handleNext}
//                     disabled={isLastQuestion}
//                   >
//                     <FaChevronRight />
//                   </button>
//                 </div>
//                 <div className="flex-grow">
//                   {showSelection ? (
//                     <div className="mb-4">
//                       {QuestionOptBinded.map(q => (
//                         <div key={q.id} className="border p-4 mb-4 rounded-lg">
//                           <h3 className="text-lg font-semibold">{q.question}</h3>
//                           <div>
//                             {q.options.split(', ').map(option => (
//                               <label key={option} className="block">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedQuestions.includes(q.id)}
//                                   onChange={() => handleQuestionSelectionChange(q.id)}
//                                 />
//                                 {option}
//                               </label>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                       <button
//                         onClick={toggleSelectAll}
//                         className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
//                       >
//                         {selectedQuestions.length === QuestionOptBinded.length ? 'Deselect All' : 'Select All'}
//                       </button>
//                     </div>
//                   ) : (
//                     <div>
//                       {currentQuestion && (
//                         <div>
//                           <h2 className="text-xl font-bold mb-2">{currentQuestion.question}</h2>
//                           <div className="mb-4">
//                             {currentQuestion.options.split(', ').map(option => (
//                               <button
//                                 key={option}
//                                 className={`bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mr-2 mb-2 ${
//                                   (answers[currentQuestion.id] || []).includes(option) ? 'bg-blue-500 text-white' : ''
//                                 }`}
//                                 onClick={() => handleOptionClick(option)}
//                               >
//                                 {option}
//                               </button>
//                             ))}
//                           </div>
//                           <div className="mb-4">
//                             <label htmlFor="remark" className="block mb-2 text-lg font-semibold">Remarks:</label>
//                             {editingRemark === currentQuestion.id ? (
//                               <div className="flex items-center">
//                                 <input
//                                   type="text"
//                                   value={remarks[currentQuestion.id] || ''}
//                                   onChange={(e) => handleRemarkChange(currentQuestion.id, e.target.value)}
//                                   className="border px-2 py-1 rounded-lg"
//                                 />
//                                 <button
//                                   onClick={() => handleRemarkSave(currentQuestion.id)}
//                                   className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
//                                 >
//                                   Save
//                                 </button>
//                                 <button
//                                   onClick={() => setEditingRemark(null)}
//                                   className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             ) : (
//                               <div className="flex items-center">
//                                 <span className="flex-grow">{remarks[currentQuestion.id]}</span>
//                                 <button
//                                   onClick={() => handleRemarkEdit(currentQuestion.id)}
//                                   className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
//                                 >
//                                   Edit
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                           <div className="mb-4">
//                             <label htmlFor="images" className="block mb-2 text-lg font-semibold">Upload Images:</label>
//                             <input
//                               type="file"
//                               id="images"
//                               accept="image/*"
//                               multiple
//                               onChange={handleImageUpload}
//                               className="block"
//                             />
//                             <div className="flex mt-2">
//                               {images.map((image, index) => (
//                                 <div key={index} className="relative">
//                                   <img src={image} alt={`Uploaded ${index}`} className="w-20 h-20 object-cover rounded-lg mr-2" />
//                                   <button
//                                     onClick={() => handleRemoveImage(index)}
//                                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                                   >
//                                     <IoCloseOutline />
//                                   </button>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//             <div className="flex justify-between items-center">
//               <button
//                 onClick={handleSubmit}
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                 disabled={showSelection || questionsToDisplay.length === 0}
//               >
//                 Submit
//               </button>
//               {showSuccessMessage && <p className="text-green-500">Survey submitted successfully!</p>}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Survey;

