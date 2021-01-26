import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
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

  function handlePress() {
    localStorageHelper.setBurritoCount(count + 1);
    localStorageHelper.setTimestamp(Date.now());

    setCount(cnt => cnt + 1);
    setTimestamp(Date.now());
  }

  function timeInSeconds() {
    return timeHelper.count(timeNow, timestamp);
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

    return () => {
      clearInterval(interval);
    };
  }, []);

  function renderTimestamp() {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
  }

  return (
    <Container>
      <TopContainer>
        <Title>Time Since Last Burrito</Title>
        <TimerWrapper>
          <DateText>{renderTimestamp()}</DateText>
          <Timer>{timeInSeconds()}</Timer>
          <BurritoCount>Total burritos: {count}</BurritoCount>
        </TimerWrapper>
      </TopContainer>
      <BottomContainer>
        <EatButton onPress={handlePress} accessibilityLabel="Reset timer">
          <EatButtonText>Eat!</EatButtonText>
        </EatButton>
      </BottomContainer>
      <StatusBar style="auto" />
    </Container>
  );
}
