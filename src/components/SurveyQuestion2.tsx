import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addResponse } from '../store/surveySlice';
import { EMOJIS, TOTAL_TIME } from '../utils/emoji.constants';
import { ROUTES } from '../utils/routes.constants';
import EmojiSelector from './EmojiSelector';

const SurveyQuestion2: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const question = 'How would you rate the competitiveness of our interest rates and fees?';

  const formatTime = (seconds: number): string => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `00:${minutes}:${secs}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(ROUTES.SURVEY_QUESTION_3);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleSubmit = () => {
    const submissionTime = dayjs()
      .startOf('day')
      .add(TOTAL_TIME - timeLeft, 'second')
      .format('HH:mm:ss');

    const response = {
      question: 'Interest Rate & Fees',
      selectedEmoji: selectedIndex !== null ? EMOJIS[selectedIndex].label : 'Not selected',
      submissionTime,
    };
    dispatch(addResponse(response));
    navigate(ROUTES.SURVEY_QUESTION_3);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-800 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 sm:p-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">
          Interest Rates and Fees
        </h2>
        <p className="text-sm sm:text-base text-gray-700 mb-6">
          {question}
        </p>

       <div className="flex justify-center flex-wrap gap-5 mb-6">
          <EmojiSelector
            selectedIndex={selectedIndex}
            hoverIndex={hoverIndex}
            onSelect={setSelectedIndex}
            onHover={setHoverIndex}
          />
        </div>
        <hr />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm sm:text-base mt-6">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={selectedIndex === null}
          >
            Next Question
          </button>

          <div className="text-gray-600 text-sm">
            Remaining Question 2 / 3
          </div>

          <div className="flex items-center gap-1 text-gray-700">
            <img src='/Vector.png' alt="Timer Icon" className="w-7 h-8 text-gray-800" />
            <div>
              <span className='text-sm'>
                Time Remaining
              </span><br />
              <span className="font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestion2;
