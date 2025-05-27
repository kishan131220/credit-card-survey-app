import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routes.constants';

const ThankYouScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleViewResult = () => {
    navigate(ROUTES.RESULTS);
  };

  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <img src={'/CheckedIcon.png'} alt="Checked Icon" className="w-14 h-14 sm:w-16 sm:h-16" />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black">Thank You</h1>
          <p className="text-xs sm:text-sm text-gray-500">Your answers have been sent.</p>
        </div>

        <p className="text-gray-700 text-sm sm:text-base">
          Thank you for taking the time to complete this survey. Your feedback is invaluable to us and helps us serve you better.
        </p>

        <button
          onClick={handleViewResult}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
        >
          View Result
        </button>
      </div>
    </div>
  );
};

export default ThankYouScreen;
