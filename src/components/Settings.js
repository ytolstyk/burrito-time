import moment from 'moment';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Switch } from 'react-native';
import { Container, Section, Margin } from '../styles/common';
import { H2, Label, StyledText } from '../styles/typography';
import { Input } from '../styles/inputs';
import { timerSelectors } from '../timerReducer';
import { metaSelectors } from '../metaReducer';
import { timeHelper } from '../helpers/timeHelper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavBar } from './NavBar';
import { LinkButton } from '../styles/buttons';
import { Flex } from '../styles/common';
import { updateLastTimestamp, updateCount } from '../timerActions';
import { updateTheme } from '../metaActions';
import { themes } from '../styles/constants';

const steps = ['date', 'time'];

function SettingsComponent(props) {
  const [step] = useState(0);
  const [showDatepicker, setShowDatepicker] = useState(false);

  function handleInputChange(text) {
    props.updateCount(Number(text.replace(/\D/g,'')));
  }

  function handleDateChange(event) {
    setShowDatepicker(false);

    if (event.type === 'dismissed') {
      return;
    }

    const newSelection = moment(event.nativeEvent.timestamp);
    const currentDate = moment();

    if (newSelection.diff(currentDate) < 0) {
      props.updateLastTimestamp(newSelection.valueOf());
    }
  }

  function handleThemeChange(value) {
    props.updateTheme(value ? themes.dark : themes.light);
  }

  function renderDatepicker() {
    if (showDatepicker) {
      return (
        <DateTimePicker
          value={props.lastTimestamp}
          onChange={handleDateChange}
          mode={steps[step]}
        />
      );
    }
  }

  return (
    <Container isDark={props.theme === themes.dark}>
      <NavBar {...props} renderBack />
      <ScrollView>
        <H2 center theme={props.theme}>Settings</H2>
        <Section>
          <Margin bottom={2}>
            <Label theme={props.theme}>Number of burritos</Label>
            <Input
              keyboardType="number-pad"
              placeholder="Total burritos"
              value={String(props.burritoCount)}
              onChangeText={handleInputChange}
              theme={props.theme}
            />
          </Margin>

          <Label theme={props.theme}>Last burrito date</Label>
          <Flex flexDirection="row" alignItems="center">
            <StyledText theme={props.theme}>
              {timeHelper.formatTime(props.lastTimestamp)}
            </StyledText>
            {renderDatepicker()}
            <LinkButton onPress={() => setShowDatepicker(true)}>
              Edit
            </LinkButton>
          </Flex>
        </Section>

        <Section>
          <Label theme={props.theme}>Theme</Label>
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={1}>
              <StyledText theme={props.theme}>Dark</StyledText>
            </Flex>
            <Switch onValueChange={handleThemeChange} value={props.theme === themes.dark} />
          </Flex>
        </Section>
      </ScrollView>
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
  updateLastTimestamp,
  updateCount,
  updateTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
