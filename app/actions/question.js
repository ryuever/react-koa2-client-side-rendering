import { createAction } from 'redux-actions';
import { Request } from 'cUtils';

export const addQuestionGroup = createAction('ADD_QUESTION_GROUP');
export const openQuestionModal = createAction('OPEN_QUESTION_MODAL');

export const setQuestionTitle = createAction('SET_QUESTION_TITLE');
export const setChoosenDefault = createAction('SET_CHOOSEN_DEFAULT');
