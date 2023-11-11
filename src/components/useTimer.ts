import { useCallback, useEffect } from "react";
import {
  Timer,
  getTimerData,
  initialState,
  setTimerData,
} from "../helpers/localStorageHelper";
import useSWR from 'swr';
import { yearWorthOfTimestamps } from "../helpers/timeHelper";

const TIMER_KEY = "timerKey";

export function useTimer() {
  const { data, isLoading, error, mutate } = useSWR<Timer>(TIMER_KEY, getTimerData);

  useEffect(() => {
    if (!data && !isLoading && !error) {
      setTimerData(initialState.timer).then(() => {
        mutate();
      });
    }
  }, [data, isLoading, error, mutate]);

  const updateTimer = useCallback(
    (timer: Timer) => {
      setTimerData(timer).then(() => mutate());
    },
    [mutate]
  );

  const addTimestamp = useCallback(
    (timestamp: number) => {
      if (!data) return;

      const { timestampList, burritoCount } = data;

      setTimerData({
        ...data,
        timestamp,
        timestampList: [...yearWorthOfTimestamps(timestampList), timestamp],
        burritoCount: burritoCount + 1,
      }).then(() => mutate());
    },
    [mutate, data]
  );

  const updateBurritoCount = useCallback(
    (num: number) => {
      if (!data) return;

      setTimerData({
        ...data,
        burritoCount: num,
      }).then(() => mutate());
    },
    [mutate, data]
  );

  const updateLastTimestamp = useCallback(
    (timestamp: number) => {
      if (!data) return;

      const { timestampList } = data;
      timestampList[timestampList.length - 1] = timestamp;

      setTimerData(
        {
          ...data,
          timestamp,
          timestampList,
        }).then(() => mutate());
    },
    [mutate, data]
  );

  const resetData = useCallback(() => {
    setTimerData(initialState.timer).then(() => mutate());
  }, [mutate]);

  return {
    timerData: data,
    isLoading,
    addTimestamp,
    updateTimer,
    resetData,
    updateBurritoCount,
    updateLastTimestamp,
  };
}
