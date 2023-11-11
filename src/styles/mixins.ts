import { themes } from './constants';
import { colors } from './colors';

const base = 12;

export function baseMult(num: number) {
  return `${base * num}px;`;
}

export type ThemeProps = {
  theme: {
    name: string;
  };
};

export function themeProps(props: ThemeProps) {
  if (props.theme.name === themes.dark) {
    return `color: ${colors.lightGrey};`;
  }

  return `color: ${colors.black};`;
}
