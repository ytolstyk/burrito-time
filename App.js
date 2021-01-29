import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
  Container,
  Title,
  EatButton,
  EatButtonText,
  TimerWrapper,
  DateText,
  Timer,
  BurritoCount
} from './App.styles';
import { localStorageHelper } from './src/helpers/localStorageHelper';
import { BottomContainer, TopContainer } from './src/styles/common';
import { timeHelper } from './src/helpers/timeHelper';

export default function App() {
  const [count, setCount] = useState(0);
  const [timestamp, setTimestamp] = useState(0);
  const [timeNow, setTimeNow] = useState(Date.now());
  const [isLandscape, setIsLandscape] = useState(false);

  function handlePress() {
    localStorageHelper.setBurritoCount(count + 1);
    localStorageHelper.setTimestamp(Date.now());

    setCount(cnt => cnt + 1);
    setTimestamp(Date.now());
  }

  function timeInSeconds() {
    if (timestamp === 0) {
      return '0 days, 00:00:00.000';
    }

    return timeHelper.count(timeNow, timestamp);
  }

  function onDimensionChange({ screen }) {
    setIsLandscape(screen.height <= screen.width);
  }

  async function setStuff() {
    setCount(await localStorageHelper.getBurritoCount());
    setTimestamp(await localStorageHelper.getTimestamp());
  }

  useEffect(() => {
    setStuff();

    const interval = setInterval(() => {
      setTimeNow(Date.now());
    }, 33);

    Dimensions.addEventListener("change", onDimensionChange);

    return () => {
      Dimensions.removeEventListener("change", onDimensionChange);
      clearInterval(interval);
    };
  }, []);

  function renderTimestamp() {
    if (timestamp === 0) {
      return "You haven't had a burrito yet";
    }

    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
  }

  return (
    <Container>
      <TopContainer>
        <Title>Time Since Last Burrito</Title>
        <TimerWrapper>
          <DateText>{renderTimestamp()}</DateText>
          <Timer isLandscape={isLandscape}>
            {timeInSeconds()}
          </Timer>
          <BurritoCount isLandscape={isLandscape}>
            Total burritos: {count}
          </BurritoCount>
        </TimerWrapper>
      </TopContainer>
      <BottomContainer>
        <EatButton onPress={handlePress} accessibilityLabel="Reset timer">
          <EatButtonText>Eat!</EatButtonText>
        </EatButton>
      </BottomContainer>
    </Container>
  );
}
