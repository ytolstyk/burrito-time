import React, { useState, useEffect } from 'react';
import {
  EatButton,
  EatButtonText,
  DateText,
} from './Timer.styles';
import { timeHelper } from '../helpers/timeHelper';
import { connect } from 'react-redux';
import { updateCountAndTimestamp } from '../timerActions';
import { timerSelectors } from '../timerReducer';
import { metaSelectors } from '../metaReducer';
import { NavBar } from './NavBar';
import { Container, Flex } from '../styles/common';
import { themes } from '../styles/constants';
import { H2, H4 } from '../styles/typography';

function TimerComponent(props) {
  const [timeNow, setTimeNow] = useState(Date.now());

  function handleTimerPress() {
    const dateNow = Date.now();
    const newCount = props.burritoCount + 1;

    props.updateCountAndTimestamp({
      count: newCount,
      timestamp: dateNow,
    });
  }

  function timeInSeconds() {
    if (props.lastTimestamp === 0) {
      return '0 days, 00:00:00.0';
    }

    return timeHelper.count(timeNow, props.lastTimestamp);
  }

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

    return timeHelper.formatTime(props.lastTimestamp);
  }

  return (
    <Container isDark={props.theme === themes.dark}>
      <NavBar {...props} />
      <H2 center {...props}>Time Since Last Burrito</H2>
      <Flex flex={1}>
        <DateText>{renderTimestamp()}</DateText>
        <H2 center {...props}>
          {timeInSeconds()}
        </H2>
        <H4 center {...props}>
          Total burritos: {props.burritoCount}
        </H4>
      </Flex>
      <EatButton
        onPress={handleTimerPress}
        accessibilityLabel="Reset timer"
      >
        <EatButtonText>Eat!</EatButtonText>
      </EatButton>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    burritoCount: timerSelectors.burritoCount(state),
    lastTimestamp: timerSelectors.lastBurritoTimestamp(state),
    theme: metaSelectors.theme(state),
  };
}

const mapDispatchToProps = {
  updateCountAndTimestamp
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerComponent);
