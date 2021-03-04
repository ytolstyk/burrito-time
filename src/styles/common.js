import styled from 'styled-components/native';
import { baseMult } from './mixins';
import { colors } from './colors';

export const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const TopContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  padding-top: ${baseMult(2)};
  padding-bottom: ${baseMult(2)};
`;
