import { createAction } from 'redux-actions';
import { Request } from 'cUtils';

export const updateTypeInput = createAction('UPDATE_TYPE_INPUT');
export const openCreateModal = createAction('OPEN_CREATE_MODAL');
export const closeCreateModal = createAction('CLOSE_CREATE_MODAL');

export const submitTypeRequest = createAction('SUBMIT_TYPE_REQUEST');
export const submitTypeSuccess = createAction('SUBMIT_TYPE_SUCCESS');
export const submitTypeFailure = createAction('SUBMIT_TYPE_FAILURE');
export function submitType(data) {
  return (dispatch) => {
    dispatch(submitTypeRequest());
    Request.post('/api/v1/type', data).then((res) => {
      dispatch(submitTypeSuccess(res));
      alert('添加成功');
    }).catch((err) => {
      dispath(submitTypeFailure());
      alert('添加失败');
    })
  }
}

export const queryTypesRequest = createAction('QUERY_TYPES_REQUEST');
export const queryTypesFailure = createAction('QUERY_TYPES_FAILURE');
export const queryTypesSuccess = createAction('QUERY_TYPES_SUCCESS');
export function queryTypes() {
  return (dispatch) => {
    dispatch(queryTypesRequest());
    Request.get('/api/v1/type').then(res => {
      console.log('res : ', res);
      dispatch(queryTypesSuccess(res));
    }).catch(err => {
      dispatch(queryTypesFailure());
    })
  }
}