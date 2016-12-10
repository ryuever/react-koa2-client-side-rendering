import { handleActions } from 'redux-actions';
import * as actions from 'actions/quesionnaire';

const initialState = {
  editValues: {},
};

const updateQuestionnaireInput = (state, { payload }) => {
  const { editValues } = state;
  return {
    ...state, 
    {...editValues, ...payload},
  };
}

const submitQuestionnaireSuccess = (state, { payload }) => ({
  ...state,
  ...payload,
})

export default handleActions({
  [actions.updateQuestionnaireInput]: updateQuestionnaireInput,
  [actions.submitQuestionnaireSuccess]: submitQuestionnaireSuccess, 
}, initialState);
