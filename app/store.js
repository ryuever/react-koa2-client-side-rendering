import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import questionnaireReducer from './reducers/questionnaire';

const reducers = combineReducers({
  questionnaire: questionnaireReducer,
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
