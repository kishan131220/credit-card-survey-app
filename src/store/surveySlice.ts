import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SurveyResponse {
  question: string;
  selectedEmoji: string;
  submissionTime: string;
}

interface SurveyState {
  responses: SurveyResponse[];
}

const initialState: SurveyState = {
  responses: [],
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    addResponse: (state, action: PayloadAction<SurveyResponse>) => {
      state.responses.push(action.payload);
    },
    resetSurvey: (state) => {
      state.responses = [];
    },
  },
});

export const { addResponse, resetSurvey } = surveySlice.actions;
export default surveySlice.reducer;
