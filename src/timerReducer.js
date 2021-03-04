import { BURRITO_COUNT, BURRITO_TIMESTAMP, BURRITO_COUNT_TIMESTAMP } from './timerActions';

const initialState = {
  burritoCount: 0,
  lastBurritoTimestamp: 0,
};

export function timerReducer(state = initialState, action) {
  switch (action.type) {
    case BURRITO_COUNT:
      return {
        ...state,
        burritoCount: action.payload,
      };

    case BURRITO_TIMESTAMP:
      return {
        ...state,
        lastBurritoTimestamp: action.payload,
      };

    case BURRITO_COUNT_TIMESTAMP:
      return {
        ...state,
        burritoCount: action.payload.count,
        lastBurritoTimestamp: action.payload.timestamp,
      };

    default:
      return state;
  }
}

export const timerSelectors = {
  burritoCount(state) {
    return state.timer.burritoCount;
  },

  lastBurritoTimestamp(state) {
    return state.timer.lastBurritoTimestamp;
  },
};
