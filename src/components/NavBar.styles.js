import styled from 'styled-components/native';
import { baseMult } from '../styles/mixins';

export const NavBarWrapper = styled.View`
  padding: ${baseMult(1 / 2)};
  padding-right: ${baseMult(1)};
  padding-left: ${baseMult(1)};
  align-items: flex-end;
`;
