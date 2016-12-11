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
}

const submitTypeSuccess = (state) => ({
  ...state,
  createModalVisible: false,
});

const submitTypeFailure = (state) => ({
  ...state,
  createModalVisible: false,
});

const openCreateModal = (state) => ({
  ...state,
  createModalVisible: true,
});

const closeCreateModal = (state) => ({
  ...state,
  createModalVisible: true,
});

export default handleActions({
  [actions.updateTypeInput]: updateTypeInput,

  [actions.submitTypeSuccess]: submitTypeSuccess, 
  [actions.submitTypeFailure]: submitTypeFailure,

  [actions.openCreateModal]: openCreateModal,
  [actions.closeCreateModal]: closeCreateModal,
}, initialState);
