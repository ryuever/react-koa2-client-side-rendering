import { createAction } from 'redux-actions';
import { Request } from 'cUtils';

export const updateQuestionnaireInput = createAction('UPDATE_QUESTIONNAIRE_INPUT');

export const submitQuestionnaireRequest = createAction('SUBMIT_QUESTIONNAIRE_REQUEST');
export const submitQuestionnaireSuccess = createAction('SUBMIT_QUESTIONNAIRE_SUCCESS');
export const submitQuestionnaireFailure = createAction('SUBMIT_QUESTIONNAIRE_FAILURE');
export function submitQuestionnaire(data) {
  return (dispatch) => {
    dispatch(submitQuestionnaireRequest());
    Request.post('/api/v1/questionnaire', data).then((res) => {
      dispatch(submitQuestionnaireSuccess(res));
      alert('提交成功');
    }).catch((err) => {
      dispatch(submitQuestionnaireFailure());
      alert('提交失败');      
    })
  }
}