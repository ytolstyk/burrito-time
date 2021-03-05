import moment from 'moment';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView } from 'react-native';
import { Container, Section, Margin } from '../styles/common';
import { H2, Label } from '../styles/typography';
import { Input } from '../styles/inputs';
import { timerSelectors } from '../timerReducer';
import { timeHelper } from '../helpers/timeHelper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavBar } from './NavBar';
import { LinkButton } from '../styles/buttons';
import { Flex } from '../styles/common';
import { updateLastTimestamp, updateCount } from '../timerActions';

const steps = ['date', 'time'];

function SettingsComponent(props) {
  const [step] = useState(0);
  const [showDatepicker, setShowDatepicker] = useState(false);

  function handleInputChange(text) {
    props.updateCount(Number(text.replace(/\D/g,'')));
  }

  function handleDateChange(event) {
    if (event.type === 'dismissed') {
      setShowDatepicker(false);

      return;
    }

    setShowDatepicker(false);

    const newSelection = moment(event.nativeEvent.timestamp);
    const previousSelection = moment(props.lastTimestamp);

    if (newSelection.diff(previousSelection) < 0) {
      props.updateLastTimestamp(newSelection.valueOf());
    }
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
    <Container>
      <NavBar {...props} renderBack />
      <ScrollView>
        <H2 center>Settings</H2>
        <Section>
          <Margin bottom={2}>
            <Label>Number of burritos</Label>
            <Input
              keyboardType="number-pad"
              placeholder="Total burritos"
              value={String(props.burritoCount)}
              onChangeText={handleInputChange}
            />
          </Margin>

          <Label>Last burrito date</Label>
          <Flex flexDirection="row" alignItems="center">
            <Text>{timeHelper.formatTime(props.lastTimestamp)}</Text>
            {renderDatepicker()}
            <LinkButton onPress={() => setShowDatepicker(true)}>
              Edit
            </LinkButton>
          </Flex>
        </Section>
        <Section>
          <Label>Toggle theme</Label>
        </Section>
      </ScrollView>
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
  updateLastTimestamp,
  updateCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
