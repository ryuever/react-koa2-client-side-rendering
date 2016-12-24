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
};

const openQuestionModal = (state, { payload }) => ({
  ...state,
  questionBoardVisible: true,
  currentLang: payload,
});

const setCurrentLang = (state, { payload }) => ({
  ...state,
  currentLang: payload,
});

export default handleActions({
  [actions.addQuestionGroup]: addQuestionGroup,
  [actions.openQuestionModal]: openQuestionModal,
  [actions.setCurrentLang]: setCurrentLang,
}, initialState);
