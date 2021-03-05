import styled from 'styled-components/native';
import { baseMult } from './mixins';
import { colors } from './colors';
import Constants from 'expo-constants';

export const Flex = styled.View`
  ${props => {
    if (props.flex) {
      return `flex: ${props.flex};`;
    }
  }}

  ${props => {
    if (props.flexDirection) {
      return `flex-direction: ${props.flexDirection};`;
    }
  }}

  ${props => {
    if (props.justifyContent) {
      return `justify-content: ${props.justifyContent};`;
    }
  }}

  ${props => {
    if (props.alignItems) {
      return `align-items: ${props.alignItems};`;
    }
  }}

  ${props => {
    if (props.flexWrap) {
      return `flex-wrap: ${props.flexWrap};`;
    }
  }}
`;

const sidePadding = baseMult(1);

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
  padding-top: ${Constants.statusBarHeight}px;
  padding-bottom: ${baseMult(2)};
  padding-left: ${sidePadding};
  padding-right: ${sidePadding};
`;

export const Margin = styled.View`
  ${props => (props.top ? `margin-top: ${baseMult(props.top)};` : '')}
  ${props =>
    props.bottom ? `margin-bottom: ${baseMult(props.bottom)};` : ''}
  ${props => (props.right ? `margin-right: ${baseMult(props.right)};` : '')}
  ${props => (props.left ? `margin-left: ${baseMult(props.left)};` : '')}
`;

const sectionMargin = baseMult(1);

export const Section = styled.View`
  padding-bottom: ${baseMult(1)};
  margin-bottom: ${sectionMargin};
  border-bottom-color: ${colors.lightGrey};
  border-bottom-width: 1px;
  margin-top: ${sectionMargin};
`;
