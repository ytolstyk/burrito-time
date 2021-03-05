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

export const RoundButtonWrapper = styled.TouchableOpacity`
  ${props => {
    switch(props.size) {
      case 'large':
        return `
          width: ${baseMult(10)};
          height: ${baseMult(10)};
        `;

      case 'medium':
        return `
          width: ${baseMult(7)};
          height: ${baseMult(7)};
        `;

      case 'small':
        return `
          width: ${baseMult(5)};
          height: ${baseMult(5)};
        `;

      default:
        return `
          width: ${baseMult(7)};
          height: ${baseMult(7)};
        `;
    }
  }};

  padding: ${baseMult(1)};
  border-radius: ${baseMult(10)};
  align-items: center;
  justify-content: center;
  background-color: transparent;

  ${props => {
    return `
      background-color: ${colors[props.color]};
    `;
  }};
`;

export const RoundButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 24px;

  ${props => {
    switch(props.size) {
      case 'large':
        return 'font-size: 24px;';

      case 'medium':
        return 'font-size: 18px';

      case 'small':
        return 'font-size: 14px';

      default:
        return 'font-size: 18px';
    }
  }};
`;

export function RoundButton(props) {
  return (
    <RoundButtonWrapper {...props}>
      <RoundButtonText {...props}>
        {props.children}
      </RoundButtonText>
    </RoundButtonWrapper>
  )
}
