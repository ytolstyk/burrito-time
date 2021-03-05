import { ORIENTATION, THEME } from './metaActions';
import { localStorageHelper } from './helpers/localStorageHelper';

const initialState = {
  isLandscape: false,
  theme: '',
};

export function metaReducer(state = initialState, action) {
  switch (action.type) {
    case ORIENTATION:
      return {
        ...state,
        isLandscape: action.payload,
      };

    case THEME:
      localStorageHelper.setTheme(action.payload);

      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
}

export const metaSelectors = {
  isLandscape(state) {
    return state.meta.isLandscape;
  },

  theme(state) {
    return state.meta.theme;
  }
};
