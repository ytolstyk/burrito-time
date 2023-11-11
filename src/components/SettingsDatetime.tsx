import { useEffect, useState } from "react";
import { LinkButton } from "../styles/buttons";
import { Flex } from "../styles/common";
import { StyledText } from "../styles/typography";
import { useTimer } from "./useTimer";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { timeHelper } from "../helpers/timeHelper";

type Props = {
  timestamp: number;
};

export function SettingsDatetime({ timestamp }: Props) {
  const [step, setStep] = useState<"date" | "time">("date");
  const [currentTimestamp, setCurrentTimestamp] = useState(new Date(timestamp));
  const [showDatepicker, setShowDatepicker] = useState(false);
  const { updateLastTimestamp } = useTimer();

  const handleDateChange = (event: DateTimePickerEvent) => {
    if (!event.nativeEvent.timestamp) {
      setShowDatepicker(false);

      return setStep("date");
    }

    if (event.type === "dismissed") {
      setShowDatepicker(false);
      setStep("date");

      return setCurrentTimestamp(new Date(timestamp));
    }

    if (step === "date") {
      setCurrentTimestamp(new Date(event.nativeEvent.timestamp));

      return setStep("time");
    }

    const datetime = new Date(event.nativeEvent.timestamp);

    currentTimestamp.setHours(datetime.getHours());
    currentTimestamp.setMinutes(datetime.getMinutes());

    if (new Date() > currentTimestamp) {
      setCurrentTimestamp(new Date(currentTimestamp));
      updateLastTimestamp(currentTimestamp.valueOf());
      setShowDatepicker(false);
    }

    setShowDatepicker(false);
    setStep("date");
  };

  useEffect(() => {
    if (timestamp === currentTimestamp.getTime()) {
      return;
    }

    setCurrentTimestamp(new Date(timestamp));
  }, [timestamp]);

  function renderDatepicker() {
    if (showDatepicker) {
      return (
        <DateTimePicker
          value={currentTimestamp}
          onChange={handleDateChange}
          mode={step}
        />
      );
    }
  }

  function renderLastDate() {
    if (timestamp === 0) {
      return "You have not had a burrito yet";
    }

    return timeHelper.formatTime(timestamp);
  }

  return (
    <Flex flexDirection="row" alignItems="center">
      <StyledText>{renderLastDate()}</StyledText>
      {renderDatepicker()}
      <LinkButton onPress={() => setShowDatepicker(true)}>Edit</LinkButton>
    </Flex>
  );
}
