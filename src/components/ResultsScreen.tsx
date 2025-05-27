import React from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routes.constants';

const ResultsScreen: React.FC = () => {
  const navigate = useNavigate();
  const results = useSelector((state: RootState) => state.survey.responses);

  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-2xl text-center space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Result</h1>
          <p className="text-sm sm:text-base text-gray-500">
            Your survey result available here
          </p>
        </div>

        <div className="divide-y divide-gray-300 text-left">
          {results?.length ? results.map((item, index) => (
            <div
              key={index}
              className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-sm sm:text-base"
            >
              <span className="font-medium text-black">{item.question}</span>
              <div className="flex flex-col sm:flex-row sm:gap-4 justify-between sm:justify-end text-right sm:text-left">
                <span className="text-gray-700 font-medium">{item.selectedEmoji}</span>
                <span className="text-gray-500 font-medium">{item.submissionTime}</span>
              </div>
            </div>
          )) : (
            <span className='text-xl items-center justify-center flex'>
              No results available yet
            </span>
          )
        }
        </div>
        <button
            className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50"
            onClick={() => navigate(ROUTES.LANDING)}
          >
            Go to Home
          </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
