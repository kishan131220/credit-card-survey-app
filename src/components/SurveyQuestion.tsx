import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { EMOJIS, TOTAL_TIME } from '../utils/emoji.constants';
import { useDispatch } from 'react-redux';
import { addResponse } from '../store/surveySlice';
import { ROUTES } from '../utils/routes.constants';

const SurveyQuestion: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    const submissionTime = dayjs()
      .startOf('day')
      .add(TOTAL_TIME - timeLeft, 'second')
      .format('HH:mm:ss');

    const response = {
      question: 'Overall Satisfaction',
      selectedEmoji: selectedIndex !== null ? EMOJIS[selectedIndex].label : 'Not selected',
      submissionTime,
    };
    dispatch(addResponse(response));
    navigate(ROUTES.SURVEY_QUESTION_2);
  };

  const formatTime = (seconds: number): string => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `00:${mins}:${secs}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-700 px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-10 w-full max-w-2xl text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Overall Satisfaction</h2>
        <p className="mb-5 sm:mb-6 text-gray-700 text-sm sm:text-base">
          How satisfied are you with your overall experience with our credit card?
        </p>

        <div className="flex justify-center flex-wrap gap-5 mb-6">
          {EMOJIS.map((emoji, index) => (
            <button
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setSelectedIndex(index)}
              className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
              title={emoji.label}
            >
              <img
                src={
                  selectedIndex === index || hoverIndex === index
                    ? emoji.highlight
                    : emoji.icon
                }
                alt={emoji.label}
                className="w-10 h-10 sm:w-12 sm:h-12 transition-all duration-200"
              />
              <span
                className={`text-xs mt-1 ${
                  selectedIndex === index || hoverIndex === index
                    ? 'text-yellow-500 font-medium'
                    : 'text-gray-600'
                }`}
              >
                {emoji.label}
              </span>
            </button>
          ))}
        </div>

        <hr className="mb-6 border-gray-300" />

        {/* Footer: Button + Step + Timer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm sm:text-base">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50"
            onClick={handleNext}
            disabled={selectedIndex === null}
          >
            Next Question
          </button>

          <div className="text-gray-600">Remaining Question 1 / 3</div>

          <div className="flex items-center gap-2 text-gray-700">
            <img src="/Vector.png" alt="Timer Icon" className="w-5 h-5" />
            <div className="text-right leading-tight">
              <span className="text-xs sm:text-sm">Time Remaining</span>
              <br />
              <span className="font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestion;
