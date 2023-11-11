import React from "react";
import { ScrollView, Text } from "react-native";
import { Container, Section, Margin } from "../styles/common";
import { H2, Label } from "../styles/typography";
import { useTimer } from "./useTimer";
import { SettingsDatetime } from "./SettingsDatetime";
import { BurritoCountForm } from "./BurritoCountForm";
import { PressableButton } from "../styles/pressableButton";

export function SettingsComponent() {
  const { timerData, isLoading, resetData } = useTimer();

  if (!timerData || isLoading) {
    return (
      <Container>
        <Text>LOADING!</Text>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView>
        <H2 center>Settings</H2>
        <Section>
          <Margin bottom={2}>
            <Label>Number of burritos</Label>
            <BurritoCountForm burritoCount={timerData.burritoCount} />
          </Margin>

          <Label>Last burrito date</Label>
          <SettingsDatetime timestamp={timerData.timestamp} />
        </Section>

        <Section>
          <Label>Reset all data (long press)</Label>
          <Margin top={2}>
            <PressableButton label="Reset" onLongPress={resetData} />
          </Margin>
        </Section>
      </ScrollView>
    </Container>
  );
}
