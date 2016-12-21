import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import questionnaireReducer from 'reducers/questionnaire';
import typeReducer from 'reducers/type';
import optionReducer from 'reducers/option';
import questionReducer from 'reducers/question';

const reducers = combineReducers({
  questionnaire: questionnaireReducer,
  type: typeReducer,
  option: optionReducer,
  question: questionReducer,
});

const loggerMiddleware = createLogger({
  collapsed: true,
});

const middlewares = [thunkMiddleware].concat(
  __DEV__ ? [loggerMiddleware] : []
);

export default function configureStore(initialState) {
  return createStore(reducers, initialState, applyMiddleware(...middlewares));
}
