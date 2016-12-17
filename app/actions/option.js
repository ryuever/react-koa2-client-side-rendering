import { createAction } from 'redux-actions';
import { Request } from 'cUtils';

export const updateOptionInput = createAction('UPDATE_OPTION_INPUT');
export const addNewOptions = createAction('ADD_NEW_OPTIONS');

export const submitOptionsRequest = createAction('SUBMIT_OPTIONS_REQUEST');
export const submitOptionsSuccess = createAction('SUBMIT_OPTIONS_SUCCESS');
export const submitOptionsFailure = createAction('SUBMIT_OPTIONS_FAILURE');
export function submitOptions({ typeId, data }) {
  return (dispatch) => {
    dispatch(submitOptionsRequest());
    Request.post(`/api/v1/type/${typeId}/options`, data).then((res) => {
      dispatch(submitOptionsSuccess(res));
      alert('添加成功');
    }).catch((err) => {
      dispath(submitOptionsFailure());
      alert('添加失败');
    })
  }
}

export const queryOptionsRequest = createAction('QUERY_OPTIONS_REQUEST');
export const queryOptionsFailure = createAction('QUERY_OPTIONS_FAILURE');
export const queryOptionsSuccess = createAction('QUERY_OPTIONS_SUCCESS');
export function queryOptions(typeId) {
  return (dispatch) => {
    dispatch(queryOptionsRequest());
    Request.get(`/api/v1/type/${typeId}/options`).then(res => {
      dispatch(queryOptionsSuccess(res));
    }).catch(err => {
      dispatch(queryOptionsFailure());
    })
  }
}