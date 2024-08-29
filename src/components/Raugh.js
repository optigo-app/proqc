import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaCheck, FaTimes, FaPause, FaEllipsisH, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';
import Question from './Question'; 

function Survey() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [showSelection, setShowSelection] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false); 

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
    if (storedAnswers) {
      setAnswers(storedAnswers);
    }
  }, []);

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
    setIsSubmitted(true);
    setTimeout(() => {
      localStorage.removeItem('answers');
      setAnswers({});
      setCurrentQuestionIndex(0);
      setPageStartIndex(0);
      setShowSelection(true);
      setIsSubmitted(false); 
    }, 3000); 
  };

  const getSelectedCount = () => {
    return (answers[currentQuestion.id] || []).length;
  };

  const handleQuestionSelectionChange = (questionId) => {
    setSelectedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full lg:w-[60vw] h-fit mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex w-full flex-col lg:flex-row lg:pr-4">
        <div className="flex-1">
          {isSubmitted ? (
            <div className="text-center p-6">
              <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
              <h2 className="text-3xl font-semibold mb-2 text-green-500">Submitted Successfully!</h2>
              <p className="text-lg text-gray-700">Thank you for completing the survey.</p>
            </div>
          ) : showSelection ? (
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
              {isLastQuestion && (
                <div className="mt-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">{conclusionQuestion.question}</h2>
                <div className="flex flex-wrap gap-4 mb-8">
                  {conclusionQuestion.options.split(',').map((option) => {
                    const icons = {
                      Approved: <FaCheck size={24} color="#4CAF50" />,
                      Rejected: <FaTimes size={24} color="#F44336" />,
                      "On Hold": <FaPause size={24} color="#FF9800" />,
                      // Other: <FaEllipsisH size={24} color="#9E9E9E" />,
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
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handlePrevious}
                    className="py-3 px-6 rounded-lg shadow-lg border border-gray-300 bg-gray-200 text-gray-800 text-lg font-semibold hover:bg-gray-300 transition-all transform hover:scale-105"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="py-3 px-6 rounded-lg shadow-lg bg-[#56a4ff] text-white text-lg font-semibold hover:bg-[#4b93e2] transition-all transform hover:scale-105"
                  >
                    Submit
                  </button>
                </div>
              </div>
              )}
              {!isLastQuestion && (
                <div className="flex justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className={`py-3 px-6 rounded-full shadow-md transition-all ${
                      currentQuestionIndex === 0
                        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        : 'bg-[#56a4ff] text-white hover:bg-[#4b93e2]'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    className="py-3 px-6 rounded-full shadow-md bg-[#56a4ff] text-white text-xl font-semibold hover:bg-[#4b93e2] transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Survey;
