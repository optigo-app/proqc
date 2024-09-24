import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaRegEdit } from 'react-icons/fa';
import { TbMoodEmpty } from 'react-icons/tb';

function Survey({ onSuccess }) {
  const questionsData = useRecoilValue(rdState);
  const optionsData = useRecoilValue(rd1State);
  const bindedData = useRecoilValue(rd2State);
  const bindedQuestionsData = useRecoilValue(rd5State);

  const [answers, setAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [editingRemark, setEditingRemark] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showConclusionSlide, setShowConclusionSlide] = useState(false);
  const [loading, setLoading] = useState(false);

  const Questions = questionsData.length ? questionsData : JSON.parse(localStorage.getItem('rd')) || [];
  const Options = optionsData.length ? optionsData : JSON.parse(localStorage.getItem('rd1')) || [];

  const hasQuestions = Questions.length > 0;
  const currentQuestion = hasQuestions ? Questions[currentQuestionIndex] : null;

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('answers'));
    const storedSelectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions'));
    const storedRemarks = JSON.parse(localStorage.getItem('remarks'));
    if (storedAnswers) setAnswers(storedAnswers);
    if (storedSelectedQuestions) setSelectedQuestions(storedSelectedQuestions);
    if (storedRemarks) setRemarks(storedRemarks);
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

  const handleSliderChange = (option, intensity) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: {
        ...answers[currentQuestion.id],
        [option]: intensity,
      },
    };
    setAnswers(updatedAnswers);
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));
  };

  const getBackgroundColor = (intensity) => {
    const ratio = intensity / 100; // Assuming intensity is between 0-100
    const r = Math.round(255 - (255 * ratio)); // Red decreases from 255 to 0
    const g = Math.round(0 + (255 * ratio)); // Green increases from 0 to 255
    return `rgb(${r}, ${g}, 255)`; // RGB from blue to yellow
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-screen w-full lg:w-[60vw] min-h-[80vh] mb-5 md:mb-5 h-fit overflow-auto mx-auto p-6 bg-white shadow-md rounded-lg">
      {showSuccessMessage ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-2xl">Thank You for your Feedback!</h2>
        </div>
      ) : showConclusionSlide ? (
        <div>Conclusion Slide Content Here</div>
      ) : hasQuestions ? (
        <div className="flex w-full flex-col lg:flex-row lg:pr-4">
          <div className="flex flex-col justify-between h-full" style={{ width: '-webkit-fill-available' }}>
            <div>
              <div className="flex w-full justify-between items-center mb-4">
                <h2 className="text-2xl flex-1">{currentQuestion.question}</h2>
                <button onClick={() => setEditingRemark(currentQuestion.id)} className="ml-4 p-3 rounded-full text-white">
                  <FaRegEdit className="text-2xl" />
                </button>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {currentQuestion.options.split(',').map((option) => (
                  <div key={option} className="relative flex flex-col items-center">
                    <button
                      onClick={() => handleOptionClick(option)}
                      className={`py-2 px-4 rounded-full shadow-md border border-gray-300 focus:outline-none ${answers[currentQuestion.id]?.includes(option) ? 'bg-[#56a4ff] text-white' : 'bg-white text-gray-700 hover:bg-teal-100'}`}
                    >
                      {option}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      onChange={(e) => handleSliderChange(option, e.target.value)}
                      className="mt-2"
                      style={{ width: '150px' }}
                    />
                    <div className="w-full mt-1" style={{ height: '5px', backgroundColor: getBackgroundColor(answers[currentQuestion.id]?.[option] || 0) }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                disabled={currentQuestionIndex === 0}
                className="py-2 px-4 bg-[#39aa78] rounded-full disabled:text-gray-700 text-white shadow-md disabled:bg-gray-200"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="py-2 px-4 bg-[#9369ba] text-white rounded-full shadow-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white">
          <TbMoodEmpty className="text-5xl text-gray-600 mb-4" />
          <h2 className="text-3xl font-semibold text-gray-600">No Questions Available</h2>
          <p className="text-gray-600 mt-2">Please try again later or contact support.</p>
        </div>
      )}
    </div>
  );
}

export default Survey;
