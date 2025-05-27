import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addResponse } from '../store/surveySlice';
import { ROUTES } from '../utils/routes.constants';
import { TOTAL_TIME } from '../utils/emoji.constants';

const options = ['Very Bad', 'Bad', 'Average', 'Good', 'Perfect'];

const SurveyQuestion3: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rating, setRating] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const formatTime = (seconds: number): string => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `00:${minutes}:${secs}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleNext = () => {
    console.log('first')
    if (rating !== null) {
      const submissionTime = dayjs()
            .startOf('day')
            .add(TOTAL_TIME - timeLeft, 'second')
            .format('HH:mm:ss');
      const response = {
        question: 'Online & Mobile Banking',
        selectedEmoji: rating !== null ? options[rating - 1] : 'Not selected',
        submissionTime,
      };
      dispatch(addResponse(response));
      navigate(ROUTES.THANK_YOU);
    } else {
      alert('Please select a rating');
    }
  };


  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-xl p-6 sm:p-10 w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-black">
            Online and Mobile Banking
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            How would you rate your experience with our online and mobile banking services?
          </p>
        </div>

        <div className="flex justify-center items-center gap-5 flex-wrap">
          {options.map((label, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => handleStarClick(index)}
            >
              <img
                className={'w-8 h-8 sm:w-9 sm:h-9 transition-colors duration-200'}
                src={`${rating !== null && index < rating ? '/star-filled.png' : '/star-empty.png'}`}
                alt={`Rating ${index + 1}`}
              />
              <span className="text-xs sm:text-sm text-gray-600">{label}</span>
            </div>
          ))}
        </div>

        <hr className="border-gray-300" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm sm:text-base">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50"
            onClick={handleNext}
          >
            Complete Survey
          </button>

          <div className="text-gray-600 text-sm">Remaining Question 3 / 3</div>

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

export default SurveyQuestion3;
