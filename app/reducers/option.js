import { handleActions } from 'redux-actions';
import * as actions from 'actions/option';

const initialState = {
  editedOptions: {},
};

const updateOptionInput = (state, { payload }) => {
  const { id, name, value } = payload;
  const { editedOptions } = state;

  const obj = { ...editedOptions[id], [name]: value };
  const options = { ...editedOptions, [id]: obj };

  return {
    ...state,
    editedOptions: options,
  };
};

const addNewOptions = (state, { payload }) => {
  const { id } = payload;
  const { editedOptions } = state;
  const options = { ...editedOptions, [id]: { ...payload } };

  return {
    ...state,
    editedOptions: options,
  };
};

const queryOptionsRequest = (state) => ({
  ...state,
  queryOptionsStatus: 'pending',
});

const queryOptionsSuccess = (state, { payload }) => ({
  ...state,
  defaultOptions: payload,
  queryOptionsStatus: 'success',
});

const queryOptionsFailure = (state, { payload }) => ({
  ...state,
  queryOptionsStatus: 'error',
});

export default handleActions({
  [actions.updateOptionInput]: updateOptionInput,
  [actions.addNewOptions]: addNewOptions, 

  [actions.queryOptionsRequest]: queryOptionsRequest,
  [actions.queryOptionsSuccess]: queryOptionsSuccess,
  [actions.queryOptionsFailure]: queryOptionsFailure,  
}, initialState);
