import { createAction } from 'redux-actions';
import { Request } from 'cUtils';

export const addQuestionGroup = createAction('ADD_QUESTION_GROUP');
export const openQuestionModal = createAction('OPEN_QUESTION_MODAL');
export const setCurrentLang = createAction('SET_CURRENT_LANG');
