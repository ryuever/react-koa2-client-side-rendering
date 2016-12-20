import { handleActions } from 'redux-actions';
import * as actions from 'actions/option';

const initialState = {
  editedOptions: {},
};

const cleanupOptions = (state) => ({
  ...state,
  editedOptions: {},
});

const updateOptionInput = (state, { payload }) => {
  const { pid, name, id, value } = payload;
  const { editedOptions } = state;

  const obj = { 
    ...editedOptions[pid], [name]: {
      _id: id,
      language: name,
      description: value,
    },
  };
  const options = { ...editedOptions, [pid]: obj };

  return {
    ...state,
    editedOptions: options,
  };
};

const addNewOptions = (state, { payload }) => {
  const { pid } = payload;
  const { editedOptions } = state;
  const options = { ...editedOptions, [pid]: { ...payload } };

  return {
    ...state,
    editedOptions: options,
  };
};

const removeOption = (state, { payload }) => {
  const id = payload;
  const { editedOptions } = state;
  const options = {...editedOptions};
  if (options[id]) {
    delete options[id];
  } else {
    options[id] = { action: 'delete' };
  }

  return {
    ...state,
    editedOptions: options,
  };
}

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

const deleteOptionsSuccess = (state) => ({
  ...state,
  deleteOptionStatus: 'success',
});

export default handleActions({
  [actions.updateOptionInput]: updateOptionInput,
  [actions.addNewOptions]: addNewOptions, 
  [actions.removeOption]: removeOption,
  [actions.cleanupOptions]: cleanupOptions,

  [actions.queryOptionsRequest]: queryOptionsRequest,
  [actions.queryOptionsSuccess]: queryOptionsSuccess,
  [actions.queryOptionsFailure]: queryOptionsFailure,  

  [actions.deleteOptionsSuccess]: deleteOptionsSuccess,  
}, initialState);
