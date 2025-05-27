import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingScreen from './components/LandingScreen';
import SurveyQuestion from './components/SurveyQuestion';
import SurveyQuestion2 from './components/SurveyQuestion2';
import SurveyQuestion3 from './components/SurveyQuestion3';
import ThankYouScreen from './components/ThankyouScreen';
import ResultsScreen from './components/ResultsScreen';
import { ROUTES } from './utils/routes.constants';

function App() {
  return (
   <Router>
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingScreen />} />
        <Route path={ROUTES.SURVEY_QUESTION_1} element={<SurveyQuestion />} />
        <Route path={ROUTES.SURVEY_QUESTION_2} element={<SurveyQuestion2 />} />
        <Route path={ROUTES.SURVEY_QUESTION_3} element={<SurveyQuestion3 />} />
        <Route path={ROUTES.THANK_YOU} element={<ThankYouScreen />} />
        <Route path={ROUTES.RESULTS} element={<ResultsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
