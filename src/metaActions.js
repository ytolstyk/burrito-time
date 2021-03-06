export const ORIENTATION = 'ORIENTATION';
export const THEME = 'THEME';

export function orientationIsLandscape(isLandscape) {
  return {
    type: ORIENTATION,
    payload: isLandscape,
  };
}

export function updateTheme(name) {
  return {
    type: THEME,
    payload: name,
  };
}
