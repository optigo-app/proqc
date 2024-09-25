import { useState } from "react";
import { motion } from "framer-motion"; // Importing Framer Motion
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TbMoodEmpty } from "react-icons/tb";

function Survey({ onSuccess }) {
  const [isMenuOpen, setIsMenuOpen] = useState({});
  const [visibleLevel, setVisibleLevel] = useState(null); // Track which level is currently visible

  const handleOptionClick = (option) => {
    const selectedOptions = answers[currentQuestion.id] || [];
    if (selectedOptions.includes(option)) {
      // Toggle menu open/close on the same option click
      setIsMenuOpen((prev) => ({ ...prev, [option]: !prev[option] }));
      return;
    }
    const updatedOptions = [...selectedOptions, option];
    const updatedAnswers = { ...answers, [currentQuestion.id]: updatedOptions };
    setAnswers(updatedAnswers);
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));
    setSelectedOption(option);
    setIsMenuOpen((prev) => ({ ...prev, [option]: true })); // Open the menu for the new option
    setVisibleLevel(0); // Start showing levels from the beginning
    if (!intensities[option]) {
      setIntensities((prev) => ({ ...prev, [option]: 0 }));
    }
  };

  const handleIntensityChange = (value) => {
    if (selectedOption) {
      setIntensities((prev) => ({ ...prev, [selectedOption]: value }));
    }
  };

  const handleCancel = () => {
    if (selectedOption) {
      setIntensities((prev) => ({ ...prev, [selectedOption]: 0 }));
      setSelectedOption(null);
      const updatedOptions = (answers[currentQuestion.id] || []).filter((opt) => opt !== selectedOption);
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: updatedOptions }));
      localStorage.setItem('answers', JSON.stringify({ ...answers, [currentQuestion.id]: updatedOptions }));
    }
  };

  const getBackgroundColor = (intensity) => {
    const startColor = [86, 164, 255]; // #56a4ff
    const endColor = [147, 105, 186]; // #9369ba
    const ratio = intensity / 5; // Adjusting for 5 levels
    const interpolatedColor = startColor.map((start, index) => {
      return Math.round(start + ratio * (endColor[index] - start));
    });
    return `rgb(${interpolatedColor.join(",")})`;
  };

  const intensityLevels = [
    { value: 1, label: "Negligible" },
    { value: 2, label: "Minor" },
    { value: 3, label: "Moderate" },
    { value: 4, label: "Significant" },
    { value: 5, label: "Critical" },
  ];

  return (
    <div className="flex flex-col lg:flex-row max-w-screen w-full lg:w-[60vw] min-h-[80vh] mb-5 md:mb-5 h-fit overflow-auto mx-auto p-6 bg-white shadow-md rounded-lg">
      {hasQuestions && allQuestions ? (
        <div className="flex w-full flex-col lg:flex-row lg:pr-4">
          <div className="flex flex-col justify-between h-full w-full">
            <div>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl flex-1">{currentQuestion.question}</h2>
              </div>
              <div className="flex flex-wrap gap-3 mb-6 relative">
                {currentQuestion.options.split(',').map((option) => (
                  <div key={option} className="relative z-10">
                    <button
                      onClick={() => handleOptionClick(option)}
                      style={{
                        backgroundColor: answers[currentQuestion.id]?.includes(option)
                          ? getBackgroundColor(intensities[option] || 0)
                          : 'white',
                      }}
                      className={`py-2 px-4 rounded-full shadow-md border border-gray-300 
                        ${answers[currentQuestion.id]?.includes(option) ? 'text-white' : ''}`}
                    >
                      {option}
                      {isMenuOpen[option] ? (
                        <FaChevronUp className="inline ml-2 text-sm text-gray-500" />
                      ) : (
                        <FaChevronDown className="inline ml-2 text-sm text-gray-500" />
                      )}
                    </button>
                    {isMenuOpen[option] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }} // Duration for the animation
                        className={`absolute left-0 top-full mt-2 w-48 p-4 bg-white border border-gray-300 rounded-lg shadow-md z-20`}
                      >
                        <p className="mb-2 font-medium">Select Intensity:</p>
                        <div className="flex flex-col space-y-2">
                          {intensityLevels.slice(0, visibleLevel + 1).map((level) => (
                            <label key={level.value} className="flex items-center">
                              <input
                                type="radio"
                                value={level.value}
                                checked={intensities[option] === level.value}
                                onChange={() => handleIntensityChange(level.value)}
                                className="mr-2"
                              />
                              {level.label}
                            </label>
                          ))}
                        </div>
                        <button
                          onClick={handleCancel}
                          className="mt-4 py-1 px-3 text-gray-600 rounded-full"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="py-2 px-4 bg-[#39aa78] rounded-full text-white shadow-md disabled:bg-gray-200"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
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
