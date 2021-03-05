import React from 'react';
import styled from 'styled-components/native';
import { colors } from './colors';
import { baseMult } from './mixins';

export const LinkButtonWrapper = styled.TouchableOpacity`
  background-color: transparent;
  padding: ${baseMult(1 / 2)};
`;

export const LinkButtonText = styled.Text`
  color: ${colors.purple};
  text-decoration: underline;
`;

export function LinkButton(props) {
  return (
    <LinkButtonWrapper {...props}>
      <LinkButtonText>
        {props.children}
      </LinkButtonText>
    </LinkButtonWrapper>
  )
}
