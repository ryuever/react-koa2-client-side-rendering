import { handleActions } from 'redux-actions';
import * as actions from 'actions/question';

const initialState = {
  editedQuestions: {},
  defaultQuestions: {},
};

const addQuestionGroup = (state, { payload }) => {
  const { editedQuestions } = state;
  const { id, ...rest } = payload
  const q = { ...editedQuestions, [id]: rest };
  return {
    ...state,
    editedQuestions: q,
  };
}

export default handleActions({
  [actions.addQuestionGroup]: addQuestionGroup,  
}, initialState);
