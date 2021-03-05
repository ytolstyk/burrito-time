import { themes } from './constants';
import { colors } from './colors';

const base = 12;

export function baseMult(num) {
  return `${base * num}px;`;
}

export function themeProps(props) {
  if (props.theme === themes.dark) {
    return `color: ${colors.lightGrey};`;
  }
}
