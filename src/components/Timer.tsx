import React, { useState, useEffect } from "react";
import { ScrollView, Share } from "react-native";
import { DateText } from "./Timer.styles";
import {
  burritosLastSevenDays,
  burritosLastThirtyDays,
  timeHelper,
} from "../helpers/timeHelper";
import { randomMessage } from "../helpers/sharingHelper";
import { Container, Flex, Margin } from "../styles/common";
import { H2, H4, StatCounterText } from "../styles/typography";
import { RoundButton } from "../styles/buttons";
import { Ionicons } from "@expo/vector-icons";
import { useTimer } from "./useTimer";
import { Text } from "react-native";
import { BurritoEatingAnimation } from "./BurritoEatingAnimation";

export function TimerComponent() {
  const [timeNow, setTimeNow] = useState(Date.now());
  const [eatPressed, setEatPressed] = useState(false);
  const { timerData, isLoading, addTimestamp } = useTimer();

  function handleTimerPress() {
    addTimestamp(Date.now());
  }

  async function handleShare() {
    if (!timerData) return;

    try {
      await Share.share({
        message: randomMessage(timerData.timestamp, timerData.burritoCount),
      });
    } catch (e) {
      console.warn(e);
    }
  }

  function timeInSeconds() {
    if (!timerData) return;

    if (timerData.timestamp === 0) {
      return "0 days, 00:00:00.0";
    }

    return timeHelper.count(timeNow, timerData.timestamp);
  }

  useEffect(() => {
    if (!timerData) return;

    if (timerData.timestamp === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeNow(Date.now());
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [timerData]);

  function renderTimestamp() {
    if (!timerData) return "";

    if (timerData.timestamp === 0) {
      return "You haven't had a burrito yet";
    }

    return timeHelper.formatTime(timerData.timestamp);
  }

  if (isLoading || !timerData) {
    return (
      <Container>
        <Text>Loading!</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Flex
        flex={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <ScrollView>
          <H2 center>Time Since Last Burrito</H2>
          <Flex flex={1}>
            <DateText>{renderTimestamp()}</DateText>
            <H2 center>{timeInSeconds()}</H2>
            <H4 center>Total burritos: {timerData.burritoCount}</H4>
            <Margin top={1}>
              <StatCounterText center>
                Last 7 days: {burritosLastSevenDays(timerData.timestampList)}
              </StatCounterText>
              <StatCounterText center>
                Last 30 days: {burritosLastThirtyDays(timerData.timestampList)}
              </StatCounterText>
            </Margin>
          </Flex>

          <Margin top={6} bottom={4} position="relative">
            <Flex
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <RoundButton size="small" color="transparent" />
              <Margin left={1} right={1}>
                <RoundButton
                  delayLongPress={1000}
                  onLongPress={handleTimerPress}
                  color="purple"
                  size="large"
                  label="Eat!"
                  onPressIn={() => setEatPressed(true)}
                  onPressOut={() => setEatPressed(false)}
                />
                {eatPressed && <BurritoEatingAnimation />}
              </Margin>
              <RoundButton onPress={handleShare} color="orange" size="small">
                <Ionicons name="share-social" size={24} color="white" />
              </RoundButton>
            </Flex>
          </Margin>
        </ScrollView>
      </Flex>
    </Container>
  );
}
