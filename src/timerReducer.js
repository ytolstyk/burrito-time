import { BURRITO_COUNT, BURRITO_TIMESTAMP, BURRITO_COUNT_TIMESTAMP } from './timerActions';
import { localStorageHelper } from './helpers/localStorageHelper';

const initialState = {
  burritoCount: 0,
  lastBurritoTimestamp: 0,
};

export function timerReducer(state = initialState, action) {
  switch (action.type) {
    case BURRITO_COUNT:
      localStorageHelper.setBurritoCount(Number(action.payload));

      return {
        ...state,
        burritoCount: Number(action.payload),
      };

    case BURRITO_TIMESTAMP:
      localStorageHelper.setTimestamp(Number(action.payload));

      return {
        ...state,
        lastBurritoTimestamp: Number(action.payload),
      };

    case BURRITO_COUNT_TIMESTAMP:
      const { count, timestamp } = action.payload;

      localStorageHelper.setBurritoCount(Number(count));
      localStorageHelper.setTimestamp(Number(timestamp));

      return {
        ...state,
        burritoCount: Number(count),
        lastBurritoTimestamp: Number(timestamp),
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
