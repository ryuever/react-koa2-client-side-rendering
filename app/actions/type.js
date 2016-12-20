import { createAction } from 'redux-actions';
import { Request } from 'cUtils';

export const updateTypeInput = createAction('UPDATE_TYPE_INPUT');
export const openCreateModal = createAction('OPEN_CREATE_MODAL');
export const closeCreateModal = createAction('CLOSE_CREATE_MODAL');
export const setCurrentTypeId = createAction('SET_CURRENT_TYPE_ID');

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
      dispatch(queryTypesSuccess(res));
    }).catch(err => {
      dispatch(queryTypesFailure());
    })
  }
}

export const deleteTypeRequest = createAction('DELETE_TYPES_REQUEST');
export const deleteTypeFailure = createAction('DELETE_TYPES_FAILURE');
export const deleteTypeSuccess = createAction('DELETE_TYPES_SUCCESS');
export function deleteType(typeId) {
  return (dispatch) => {
    dispatch(deleteTypeRequest());
    Request.del(`/api/v1/type/${typeId}`).then(res => {
      dispatch(deleteTypeSuccess());
    }).catch(err => {
      dispatch(deleteTypeFailure());
    })
  }
}
