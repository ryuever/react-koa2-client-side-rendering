import { handleActions } from 'redux-actions';
import * as actions from 'actions/questionnaire';

const initialState = {
  editValues: {},
};

const updateQuestionnaireInput = (state, { payload }) => {
  const { editValues } = state;
  const values = { ...editValues, ...payload};
  return {
    ...state, 
    editValues: values, 
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
