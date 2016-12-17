import { handleActions } from 'redux-actions';
import * as actions from 'actions/type';

const initialState = {
  editValues: {},
  createModalVisible: false,
};

const updateTypeInput = (state, { payload }) => {
  const { editValues } = state;
  const values = { ...editValues, ...payload};
  return {
    ...state, 
    editValues: values, 
  };
};

const submitTypeRequest = (state) => ({
  ...state,
  submitTypeStatus: 'pending',
});

const submitTypeSuccess = (state) => ({
  ...state,
  submitTypeStatus: 'success',
  createModalVisible: false,
});

const submitTypeFailure = (state) => ({
  ...state,
  submitTypeStatus: 'error',  
});

const openCreateModal = (state) => ({
  ...state,
  createModalVisible: true,
});

const closeCreateModal = (state) => ({
  ...state,
  createModalVisible: false,
});

const queryTypesRequest = (state) => ({
  ...state,
  queryTypesStatus: 'pending',
});

const queryTypesSuccess = (state, { payload }) => ({
  ...state,
  types: payload,
  queryTypesStatus: 'success',
});

const queryTypesFailure = (state, { payload }) => ({
  ...state,
  types: payload,
  queryTypesStatus: 'error',
});

export default handleActions({
  [actions.updateTypeInput]: updateTypeInput,

  [actions.submitTypeRequest]: submitTypeRequest, 
  [actions.submitTypeSuccess]: submitTypeSuccess, 
  [actions.submitTypeFailure]: submitTypeFailure,

  [actions.queryTypesRequest]: queryTypesRequest,
  [actions.queryTypesSuccess]: queryTypesSuccess,
  [actions.queryTypesFailure]: queryTypesFailure,  

  [actions.openCreateModal]: openCreateModal,
  [actions.closeCreateModal]: closeCreateModal,
}, initialState);
