import React, { useState, useEffect } from 'react';
import { Share } from 'react-native';
import {
  DateText,
} from './Timer.styles';
import { timeHelper } from '../helpers/timeHelper';
import { sharingHelper } from '../helpers/sharingHelper';
import { connect } from 'react-redux';
import { updateCountAndTimestamp } from '../timerActions';
import { timerSelectors } from '../timerReducer';
import { metaSelectors } from '../metaReducer';
import { NavBar } from './NavBar';
import { Container, Flex, Margin } from '../styles/common';
import { themes } from '../styles/constants';
import { H2, H4 } from '../styles/typography';
import { RoundButton } from '../styles/buttons';
import { Ionicons } from '@expo/vector-icons';

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

  async function handleShare() {
    try {
      await Share.share({
        message: sharingHelper.randomMessage(),
      });
    } catch(e) {
      console.warn(e);
    }
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
    <Container>
      <NavBar {...props} />
      <H2 center>Time Since Last Burrito</H2>
      <Flex flex={1}>
        <DateText>{renderTimestamp()}</DateText>
        <H2 center>
          {timeInSeconds()}
        </H2>
        <H4 center>
          Total burritos: {props.burritoCount}
        </H4>
      </Flex>

      <Margin bottom={2}>
        <Flex flexDirection="row" alignItems="center" justifyContent="center">
          <RoundButton size="small" />
          <Margin left={1} right={1}>
            <RoundButton onPress={handleTimerPress} color="purple" size="large">
              Eat!
            </RoundButton>
          </Margin>
          <RoundButton onPress={handleShare} color="orange" size="small">
            <Ionicons name="share-social" size={24} color="white" />
          </RoundButton>
        </Flex>
      </Margin>
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
