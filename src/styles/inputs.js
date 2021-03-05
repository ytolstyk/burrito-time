import styled from 'styled-components/native';
import { colors } from './colors';
import { constants } from './constants';
import { baseMult, themeProps } from './mixins';

export const Input = styled.TextInput`
  ${themeProps};

  border: 1px solid ${colors.lightGrey};
  border-radius: ${constants.borderRadius};
  padding: ${baseMult(1 / 4)};
  padding-left: ${baseMult(1)};
  padding-right: ${baseMult(1)};
  width: ${baseMult(10)};
`;
