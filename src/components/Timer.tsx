import React, { useState, useEffect } from "react";
import { ScrollView, Share } from "react-native";
import { DateText } from "./Timer.styles";
import { timeHelper } from "../helpers/timeHelper";
import { randomMessage } from "../helpers/sharingHelper";
import { Container, Flex, Margin } from "../styles/common";
import { H2, H4 } from "../styles/typography";
import { RoundButton } from "../styles/buttons";
import { Ionicons } from "@expo/vector-icons";
import { useTimer } from "./useTimer";
import { Text } from "react-native";

export function TimerComponent() {
  const [timeNow, setTimeNow] = useState(Date.now());
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
          </Flex>

          <Margin top={6} bottom={4}>
            <Flex
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <RoundButton size="small" color="transparent" />
              <Margin left={1} right={1}>
                <RoundButton
                  onLongPress={handleTimerPress}
                  color="purple"
                  size="large"
                  label="Eat!"
                />
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
