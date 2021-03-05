import styled from 'styled-components/native';
import { baseMult, themeProps } from './mixins';

function centerText(props) {
  if (props.center) {
    return 'text-align: center;';
  }
}

export const StyledText = styled.Text`
  ${centerText};
  ${themeProps};
`;

export const H1 = styled(StyledText)`
  font-size: 40px;
  margin-top: ${baseMult(1)};
  margin-bottom: ${baseMult(1)};
`;

export const H2 = styled(StyledText)`
  font-size: 32px;
  margin-top: ${baseMult(1)};
  margin-bottom: ${baseMult(1)};
`;

export const H3 = styled(StyledText)`
  font-size: 26px;
  font-weight: bold;
  margin-top: ${baseMult(1 / 2)};
  margin-bottom: ${baseMult(1 / 2)};
`;

export const H4 = styled(StyledText)`
  font-size: 20px;
  font-weight: bold;
  margin-top: ${baseMult(1 / 2)};
  margin-bottom: ${baseMult(1 / 2)};
`;

export const H5 = styled(StyledText)`
  font-size: 16px;
  font-weight: bold;
  margin-top: ${baseMult(1 / 2)};
  margin-bottom: ${baseMult(1 / 2)};
`;

export const Label = styled(StyledText)`
  font-weight: bold;
  font-size: 16px;
`;
