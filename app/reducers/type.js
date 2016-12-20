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

const setCurrentTypeId = (state, { payload }) => {
  const currentTypeId = payload;
  const { types, currentType } = state;

  let ct = {...currentType};
  if (currentType && !currentType['_id'] && types) {
    for (let key = 0; key < types.length; key++) {
      if (currentTypeId === `${types[key]['_id']}`) {
        ct = types[key];
        break;
      }
    }
  }

  return {
    ...state,
    currentTypeId,
    currentType: ct,
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

const queryTypesSuccess = (state, { payload }) => {
  const { currentTypeId } = state;
  let currentType = {};

  for (let key = 0; key < payload.length; key++) {
    if (currentTypeId === `${payload[key]['_id']}`) {
      currentType = payload[key];
      break;
    }
  }

  return {
    ...state,
    types: payload,
    currentType,
    queryTypesStatus: 'success',
  };
};

const queryTypesFailure = (state, { payload }) => ({
  ...state,
  types: payload,
  queryTypesStatus: 'error',
});

const deleteTypeRequest = (state) => ({
  ...state,
  deleteTypeStatus: 'pending',
});

const deleteTypeSuccess = (state) => ({
  ...state,
  deleteTypeStatus: 'success',
});

const deleteTypeFailure = (state, { payload }) => ({
  ...state,
  types: payload,
  deleteTypeStatus: 'error',
});

export default handleActions({
  [actions.updateTypeInput]: updateTypeInput,
  [actions.setCurrentTypeId]: setCurrentTypeId,

  [actions.submitTypeRequest]: submitTypeRequest, 
  [actions.submitTypeSuccess]: submitTypeSuccess, 
  [actions.submitTypeFailure]: submitTypeFailure,

  [actions.queryTypesRequest]: queryTypesRequest,
  [actions.queryTypesSuccess]: queryTypesSuccess,
  [actions.queryTypesFailure]: queryTypesFailure,  

  [actions.deleteTypeRequest]: deleteTypeRequest,
  [actions.deleteTypeSuccess]: deleteTypeSuccess,
  [actions.deleteTypeFailure]: deleteTypeFailure,    

  [actions.openCreateModal]: openCreateModal,
  [actions.closeCreateModal]: closeCreateModal,
}, initialState);
