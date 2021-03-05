import styled from 'styled-components/native';
import { colors } from '../styles/colors';
import { baseMult } from '../styles/mixins';

const buttonDimensions = baseMult(10);
const wideButtonDimensions = baseMult(8);

export const EatButton = styled.TouchableOpacity`
  display: flex;
  margin-bottom: ${baseMult(2)};
  align-self: center;
  width: ${buttonDimensions};
  height: ${buttonDimensions};
  padding: ${baseMult(1)};
  background-color: ${colors.purple};
  border-radius: ${baseMult(10)};
  align-items: center;
  justify-content: center;

  ${props => {
    if (props.isLandscape) {
      return `
        width: ${wideButtonDimensions};
        height: ${wideButtonDimensions};
      `;
    }
  }}
`;

export const EatButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 24px;
`;

export const DateText = styled.Text`
  color: ${colors.grey};
  text-align: center;
`;
