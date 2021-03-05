import { createStore, combineReducers } from 'redux';
import { timerReducer } from './timerReducer';
import { metaReducer } from './metaReducer';

const store = createStore(combineReducers({
  timer: timerReducer,
  meta: metaReducer,
}));

export { store };
