import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routes.constants';

const LandingScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate(ROUTES.SURVEY_QUESTION_1);
  };

  return (
    <div className="bg-blue-800 text-white min-h-screen flex flex-col items-center justify-center px-5 text-center">
      <img
        src="/clipboard-survey-icon.png"
        alt="Survey Icon"
        className="w-20 sm:w-16 mb-5"
      />
      <h1 className="text-3xl sm:text-2xl text-yellow-400 font-bold m-0">Credit Card</h1>
      <h2 className="text-2xl sm:text-xl text-yellow-400 mt-1">Customer Satisfaction Survey</h2>
      <p className="max-w-xl text-base sm:text-sm leading-relaxed my-6 sm:my-4">
        We value your feedback! At Gold Credit Card, we are dedicated to providing you with the
        best possible credit card experience. Your responses to this survey will help us understand
        what we're doing well and where we can improve. The survey should take about 5 minutes to
        complete. Thank you for your time and valuable input!
      </p>
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm w-[240px]"
        onClick={handleStartClick}
      >
        Click to Start
      </button>
    </div>
  );
};

export default LandingScreen;
