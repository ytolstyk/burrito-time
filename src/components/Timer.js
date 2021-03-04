import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
  Title,
  EatButton,
  EatButtonText,
  TimerWrapper,
  DateText,
  Timer,
  BurritoCount
} from './Timer.styles';
import { localStorageHelper } from '../helpers/localStorageHelper';
import { TopContainer } from '../styles/common';
import { timeHelper } from '../helpers/timeHelper';
import { connect } from 'react-redux';
import { updateCountAndTimestamp } from '../timerActions';
import { timerSelectors } from '../timerReducer';
import { NavBar } from './NavBar';
import { Container } from '../styles/common';

function TimerComponent(props) {
  const [timeNow, setTimeNow] = useState(Date.now());
  const [isLandscape, setIsLandscape] = useState(false);

  function handleTimerPress() {
    const dateNow = Date.now();
    const newCount = props.burritoCount + 1;

    localStorageHelper.setBurritoCount(newCount);
    localStorageHelper.setTimestamp(dateNow);

    props.updateCountAndTimestamp({
      count: newCount,
      timestamp: dateNow,
    });
  }

  function timeInSeconds() {
    if (props.lastTimestamp === 0) {
      return '0 days, 00:00:00.000';
    }

    return timeHelper.count(timeNow, props.lastTimestamp);
  }

  function onDimensionChange({ screen }) {
    setIsLandscape(screen.height <= screen.width);
  }

  async function setStuff() {
    props.updateCountAndTimestamp({
      count: await localStorageHelper.getBurritoCount(),
      timestamp: await localStorageHelper.getTimestamp(),
    });
  }

  useEffect(() => {
    setStuff();

    Dimensions.addEventListener("change", onDimensionChange);

    return () => {
      Dimensions.removeEventListener("change", onDimensionChange);
    };
  }, []);

  useEffect(() => {
    if (props.lastTimestamp === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeNow(Date.now());
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [props.lastTimestamp]);

  function renderTimestamp() {
    if (props.lastTimestamp === 0) {
      return "You haven't had a burrito yet";
    }

    return moment(props.lastTimestamp).format('MMMM Do YYYY, h:mm:ssa');
  }

  return (
    <Container>
      <TopContainer>
        <NavBar {...props} />
        <Title>Time Since Last Burrito</Title>
        <TimerWrapper>
          <DateText>{renderTimestamp()}</DateText>
          <Timer isLandscape={isLandscape}>
            {timeInSeconds()}
          </Timer>
          <BurritoCount isLandscape={isLandscape}>
            Total burritos: {props.burritoCount}
          </BurritoCount>
        </TimerWrapper>
        <EatButton
          onPress={handleTimerPress}
          accessibilityLabel="Reset timer"
          isLandscape={isLandscape}
        >
          <EatButtonText>Eat!</EatButtonText>
        </EatButton>
      </TopContainer>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    burritoCount: timerSelectors.burritoCount(state),
    lastTimestamp: timerSelectors.lastBurritoTimestamp(state),
  };
}

const mapDispatchToProps = {
  updateCountAndTimestamp
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerComponent);
