import { handleActions } from 'redux-actions';
import * as actions from 'actions/question';

const initialState = {
  editedQuestions: {},
  defaultQuestions: {},
};

const addQuestionGroup = (state, { payload }) => {
  const { editedQuestions } = state;
  const { id } = payload
  const q = { ...editedQuestions, [id]: payload };
  return {
    ...state,
    editedQuestions: q,
  };
};

const openQuestionModal = (state, { payload }) => {
  const { id, lang } = payload;
  return {
    ...state,
    questionBoardVisible: true,
    currentLang: lang,
    currentId: id,
  };
};

const setQuestionTitle = (state, { payload }) => {
  const { currentId, currentLang, title } = payload;
  const { editedQuestions } = state;

  editedQuestions[currentId].content = {
    ...editedQuestions[currentId].content,
    [currentLang]: {
      ...editedQuestions[currentId].content[currentLang],
      title,
    },
  };

  return {
    ...state,
    editedQuestions,
  };
};

const setChoosenDefault = (state, { payload }) => {
  const { currentId, currentLang, value } = payload;
  const { editedQuestions } = state;
  
  editedQuestions[currentId].content = {
    ...editedQuestions[currentId].content,
    [currentLang]: {
      ...editedQuestions[currentId].content[currentLang],
      options: value,
    },
  };

  return {
    ...state,
    editedQuestions,
  };
};

export default handleActions({
  [actions.addQuestionGroup]: addQuestionGroup,
  [actions.openQuestionModal]: openQuestionModal,

  [actions.setQuestionTitle]: setQuestionTitle,
  [actions.setChoosenDefault]: setChoosenDefault,
}, initialState);
