import { createStore, combineReducers } from 'redux';
import { timerReducer } from './timerReducer';

const store = createStore(combineReducers({
  timer: timerReducer,
}));

export { store };
