import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaCheck, FaRegThumbsUp, FaRegThumbsDown, FaPause, FaEllipsisH, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';
import Question from './Question';

function Survey() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [showSelection, setShowSelection] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const allQuestions = Question;
  const filteredQuestions = allQuestions.filter(q => selectedQuestions.includes(q.id));
  const questionsToDisplay = showSelection ? allQuestions : filteredQuestions;

  const conclusionQuestion = {
    id: 'conclusion',
    question: 'Conclusion',
    options: 'Approved,Rejected,On Hold',
  };

  const currentQuestion = questionsToDisplay[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionsToDisplay.length - 1;

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('answers'));
    const storedSelectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions'));
    if (storedAnswers) {
      setAnswers(storedAnswers);
    }
    if (storedSelectedQuestions) {
      setSelectedQuestions(storedSelectedQuestions);
      if (storedSelectedQuestions.length > 0) {
        setShowSelection(false);
      }
    }
  }, []);

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

  const handleOptionClick = (option) => {
    const selectedOptions = answers[currentQuestion.id] || [];
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(opt => opt !== option)
      : [...selectedOptions, option];
    const updatedAnswers = { ...answers, [currentQuestion.id]: updatedOptions };
    setAnswers(updatedAnswers);
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));
  };

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
    setAnswers({});
    setShowSuccessMessage(true);
  };

  const getSelectedCount = () => {
    return (answers[currentQuestion.id] || []).length;
  };

  const handleQuestionSelectionChange = (questionId) => {
    const updatedSelectedQuestions = selectedQuestions.includes(questionId)
      ? selectedQuestions.filter(id => id !== questionId)
      : [...selectedQuestions, questionId];
    setSelectedQuestions(updatedSelectedQuestions);
    localStorage.setItem('selectedQuestions', JSON.stringify(updatedSelectedQuestions));
  };

  return (
    <div className="flex flex-col lg:flex-row w-full lg:w-[60vw] h-fit min-h-96 mx-auto p-6 bg-white shadow-md rounded-lg">
      {showSuccessMessage ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-green-100 rounded-lg shadow-md">
          <FaCheck className="text-green-500 mb-4" size={40} />
          <h2 className="text-2xl font-semibold mb-2">Survey Submitted Successfully!</h2>
          <p className="text-gray-700">Thank you for completing the survey.</p>
        </div>
      ) : (
        <div className="flex w-full flex-col lg:flex-row lg:pr-4">
          <div className="flex-1">
            {showSelection ? (
              <div className="flex flex-col mb-4 p-4">
                <h2 className="text-3xl font-semibold mb-6 text-[#56a4ff] flex items-center">
                  <FaQuestionCircle className="mr-2" />
                  Select Your Questions
                </h2>
                {allQuestions.map((q) => (
                  <div key={q.id} className="flex items-center mb-3 p-2 hover:bg-gray-100 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(q.id)}
                      onChange={() => handleQuestionSelectionChange(q.id)}
                      className="mr-2"
                    />
                    <span className="text-lg">{q.question}</span>
                  </div>
                ))}
                <button
                  onClick={() => setShowSelection(false)}
                  disabled={selectedQuestions.length === 0}
                  className={`flex items-center justify-center py-3 px-5 mt-4 rounded-full shadow-md transition-all ${
                    selectedQuestions.length === 0 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-[#56a4ff] text-white hover:bg-[#4b93e2]'
                  }`}
                >
                  <FaCheckCircle className="mr-2" />
                  Start
                </button>
              </div>
            ) : (
              <>
                <div className="flex w-full justify-between items-center mb-4">
                <div className="flex space-x-2 my-5 w-fit justify-between flex-row items-center">
                    <button
                      onClick={handleScrollLeft}
                      disabled={pageStartIndex === 0}
                      className="w-8 h-8 rounded-full shadow-md focus:outline-none text-[#56a4ff] hover:bg-gray-300 flex justify-center items-center disabled:text-gray-300"
                    >
                      <FaChevronLeft />
                    </button>

                    <div className='flex flex-row gap-3'>
                      {questionsToDisplay.slice(pageStartIndex, pageStartIndex + 5).map((_, index) => (
                        <button
                          key={index + pageStartIndex}
                          onClick={() => handlePaginationClick(index + pageStartIndex)}
                          className={`w-8 h-8 rounded-full shadow-md focus:outline-none ${
                            currentQuestionIndex === index + pageStartIndex
                              ? 'text-[#56a4ff]'
                              : 'text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {index + pageStartIndex + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleScrollRight}
                      disabled={pageStartIndex + 5 >= questionsToDisplay.length}
                      className="w-8 h-8 rounded-full shadow-md focus:outline-none text-[#56a4ff] hover:bg-gray-300 flex justify-center items-center disabled:text-gray-300"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                  <p className='text-lg font-bold text-green-500'>
                    {getSelectedCount()}
                  </p>
                </div>

                <h2 className="text-2xl mb-4">{currentQuestion.question}</h2>
                <div className="flex flex-wrap gap-3 mb-6">
                  {currentQuestion.options.split(',').map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className={`py-2 px-4 rounded-full shadow-md border border-gray-300 focus:outline-none ${
                        answers[currentQuestion.id]?.includes(option)
                          ? 'bg-[#56a4ff] text-white'
                          : 'bg-white text-gray-700 hover:bg-teal-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div>
                  {isLastQuestion ? (
                    <>
                      <div className="mt-6">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">{conclusionQuestion.question}</h2>
                        <div className="flex flex-wrap gap-4 mb-8">
                          {conclusionQuestion.options.split(',').map((option) => {
                            const icons = {
                              Approved: <FaRegThumbsUp size={24} color="#4CAF50" />,
                              Rejected: <FaRegThumbsDown size={24} color="#F44336" />,
                              "On Hold": <FaPause size={24} color="#FF9800" />,
                            };
                            return (
                              <button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className={`flex flex-col items-center py-4 px-6 rounded-lg shadow-lg border border-gray-300 focus:outline-none transition-transform transform ${
                                  answers[conclusionQuestion.id]?.includes(option)
                                    ? 'bg-[#56a4ff] text-white scale-105'
                                    : 'bg-white text-gray-700 hover:bg-teal-100'
                                }`}
                              >
                                {icons[option]}
                                <span className="mt-2 text-lg font-medium">{option}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="py-2 px-4 bg-[#39aa78] rounded-full disabled:text-gray-700 text-white shadow-md disabled:bg-gray-200"
                  >
                    Previous
                  </button>
                  {isLastQuestion ? (
                    <>
                      <button
                        onClick={handleSubmit}
                        className="py-2 px-4 bg-[#56a4ff] text-white rounded-full shadow-md"
                      >
                        Submit
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="py-2 px-4 bg-[#56a4ff] text-white rounded-full shadow-md"
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Survey;
  
//   in this code it will show question number/Total Selected Questions 