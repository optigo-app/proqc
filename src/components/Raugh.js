import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaCheck, FaRegThumbsUp, FaRegThumbsDown, FaPause, FaQuestionCircle, FaCheckCircle, FaRegEdit } from 'react-icons/fa';
import { BiSolidImageAdd } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import Question from './Question';

function Survey() {
  // State declarations...
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [showSelection, setShowSelection] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [remarks, setRemarks] = useState({});
  const [editingRemark, setEditingRemark] = useState(null);
  const [images, setImages] = useState([]); 

  // All questions and filtered questions setup...
  const allQuestions = Question;
  const filteredQuestions = allQuestions.filter(q => selectedQuestions.includes(q.id));
  const questionsToDisplay = showSelection ? allQuestions : filteredQuestions;

  // Conclusion question setup...
  const conclusionQuestion = {
    id: 'conclusion',
    question: 'Conclusion',
    options: 'Approved,Rejected,On Hold',
  };

  // Current question and last question setup...
  const currentQuestion = questionsToDisplay[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionsToDisplay.length - 1;

  // Local storage setup...
  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('answers'));
    const storedSelectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions'));
    const storedRemarks = JSON.parse(localStorage.getItem('remarks'));
    if (storedAnswers) {
      setAnswers(storedAnswers);
    }
    if (storedSelectedQuestions) {
      setSelectedQuestions(storedSelectedQuestions);
      if (storedSelectedQuestions.length > 0) {
        setShowSelection(false);
      }
    }
    if (storedRemarks) {
      setRemarks(storedRemarks);
    }
  }, []);

  // Success message timeout...
  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setCurrentQuestionIndex(0);
        setPageStartIndex(0);
        setShowSelection(true);
      }, 3000);
    }
  }, [showSuccessMessage]);

  // Handle option click for regular and conclusion options...
  const handleOptionClick = (option) => {
    const selectedOptions = answers[currentQuestion.id] || [];
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(opt => opt !== option)
      : [...selectedOptions, option];
    const updatedAnswers = { ...answers, [currentQuestion.id]: updatedOptions };
    setAnswers(updatedAnswers);
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));
  };

  // Navigation and pagination...
  const handleNext = () => {
    if (currentQuestionIndex < questionsToDisplay.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (currentQuestionIndex + 1 >= pageStartIndex + 5) {
        setPageStartIndex(pageStartIndex + 5);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      if (currentQuestionIndex - 1 < pageStartIndex) {
        setPageStartIndex(pageStartIndex - 5);
      }
    }
  };

  const handlePaginationClick = (index) => {
    setCurrentQuestionIndex(index);
    if (index >= pageStartIndex + 5) {
      setPageStartIndex(index - 4);
    } else if (index < pageStartIndex) {
      setPageStartIndex(index);
    }
  };

  // Image upload and remove...
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [
      ...prevImages,
      ...newImages
    ].slice(0, 4)); // Keep only the first 4 images
  };

  const handleRemoveImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  // Additional handlers...
  const handleScrollRight = () => {
    if (pageStartIndex + 5 < questionsToDisplay.length) {
      setPageStartIndex(pageStartIndex + 5);
    }
  };

  const handleScrollLeft = () => {
    if (pageStartIndex > 0) {
      setPageStartIndex(pageStartIndex - 5);
    }
  };

  const handleSubmit = () => {
    localStorage.removeItem('answers');
    localStorage.removeItem('selectedQuestions');
    localStorage.removeItem('remarks');
    setAnswers({});
    setRemarks({});
    setShowSuccessMessage(true);
  };

  const handleQuestionSelectionChange = (questionId) => {
    const updatedSelectedQuestions = selectedQuestions.includes(questionId)
      ? selectedQuestions.filter(id => id !== questionId)
      : [...selectedQuestions, questionId];
    setSelectedQuestions(updatedSelectedQuestions);
    localStorage.setItem('selectedQuestions', JSON.stringify(updatedSelectedQuestions));
  };

  const handleRemarkChange = (questionId, newRemark) => {
    const updatedRemarks = { ...remarks, [questionId]: newRemark };
    setRemarks(updatedRemarks);
    localStorage.setItem('remarks', JSON.stringify(updatedRemarks));
  };

  const handleRemarkEdit = (questionId) => {
    if (editingRemark === questionId) {
      setEditingRemark(null);
    } else {
      setEditingRemark(questionId);
    }
  };

  const handleRemarkSave = (questionId) => {
    setEditingRemark(null);
    handleRemarkChange(questionId, remarks[questionId] || '');
  };

  const toggleSelectAll = () => {
    if (selectedQuestions.length === allQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(allQuestions.map(q => q.id));
    }
  };

  const getSelectedCount = () => {
    return (answers[currentQuestion.id] || []).length;
  };

  const currentQuestionNumber = currentQuestionIndex + 1;
  const totalQuestions = selectedQuestions.length;

  // Icon color mapping for conclusion options
  const conclusionOptionStyles = {
    Approved: "border-green-500 text-green-500",
    Rejected: "border-red-500 text-red-500",
    "On Hold": "border-yellow-500 text-yellow-500",
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-screen w-full lg:w-[60vw]  mb-5 md:mb-5 h-fit  overflow-auto mx-auto p-6 bg-white shadow-md rounded-lg">
      {showSuccessMessage ? (
        <div className="flex-1  flex flex-col items-center justify-center p-6 bg-green-100 rounded-lg shadow-md">
          <div className='h-64'></div>
          <FaCheck className="text-green-500 mb-4" size={40} />
          <h2 className="text-2xl font-semibold mb-2">Answers Submitted Successfully!</h2>
          <p className="text-gray-700">Thank you.</p>
          <div className='h-64'></div>
        </div>
      ) : (
        <div className="flex w-full flex-col lg:flex-row lg:pr-4">
          <div className="flex-1">
            {showSelection ? (
<></>            ) : (
              <>
                <div className="flex items-center mb-6">
                  <div className="text-lg font-semibold mr-4 text-[#39aa78]" >
                    {currentQuestionNumber}/{totalQuestions}
                  </div>
                  <h2 className="text-2xl flex-1">{currentQuestion.question}</h2>
                  <button
                    onClick={() => handleRemarkEdit(currentQuestion.id)}
                    className="ml-4 p-3 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FaRegEdit className="text-2xl transition text-blue-600 duration-300 ease-in-out hover:text-blue-200" />
                  </button>
                </div>

                <div className="flex  flex-wrap gap-3 mb-6">
                  {currentQuestion.options.split(',').map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className={`py-2 px-4 rounded-full shadow-md border border-gray-300 focus:outline-none ${
                        answers[currentQuestion.id]?.includes(option)
                          ? `bg-[#56a4ff] text-white ${conclusionOptionStyles[option]}` // Apply dynamic border color
                          : 'bg-white text-gray-700 hover:bg-teal-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {editingRemark === currentQuestion.id ? (
                  <div className="mb-4">
                    <textarea
                      value={remarks[currentQuestion.id] || ''}
                      onChange={(e) => handleRemarkChange(currentQuestion.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      rows="4"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => handleRemarkSave(currentQuestion.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : remarks[currentQuestion.id] ? (
                  <div className="mb-4 p-3 bg-gray-100 rounded-lg shadow-inner">
                    <p className="text-gray-700">{remarks[currentQuestion.id]}</p>
                  </div>
                ) : null}

                <div className="flex justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="p-3 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FaChevronLeft className="text-xl transition duration-300 ease-in-out hover:text-blue-600" />
                  </button>
                  {isLastQuestion && !showSuccessMessage && (
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Submit
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={isLastQuestion}
                    className="p-3 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FaChevronRight className="text-xl transition duration-300 ease-in-out hover:text-blue-600" />
                  </button>
                </div>
              </>
            )}
          </div>
          {!showSelection && (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="flex justify-center items-center w-48 h-48 mb-4 rounded-full bg-gray-200 cursor-pointer overflow-hidden relative">
                <label className="cursor-pointer absolute inset-0 flex items-center justify-center">
                  {images.length === 0 ? (
                    <BiSolidImageAdd className="text-gray-400 text-4xl" />
                  ) : (
                    images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Uploaded ${index}`}
                          className="w-48 h-48 rounded-full object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                        >
                          <IoCloseOutline />
                        </button>
                      </div>
                    ))
                  )}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Survey;
