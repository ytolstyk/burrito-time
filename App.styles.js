import styled from 'styled-components/native';
import { colors } from './src/styles/colors';
import { baseMult } from './src/styles/mixins';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  padding-top: ${baseMult(2)};
  padding-bottom: ${baseMult(2)};
`;

export const Title = styled.Text`
  margin: ${baseMult(2)} 0;
  font-size: 32px;
  text-align: center;
  font-weight: 900;
`;

export const TimerWrapper = styled.View`
  flex: 1;
`;

export const EatButton = styled.TouchableOpacity`
  display: flex;
  margin-bottom: ${baseMult(2)};
  align-self: center;
  width: ${baseMult(10)};
  height: ${baseMult(10)};
  padding: ${baseMult(1)};
  background-color: ${colors.purple};
  border-radius: ${baseMult(10)};
  align-items: center;
  justify-content: center;
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

export const Timer = styled.Text`
  margin-top: ${baseMult(2)};
  font-size: 36px;
  text-align: center;
`;

export const BurritoCount = styled.Text`
  margin-top: ${baseMult(2)};
  font-size: 24px;
  text-align: center;
`;
