import AsyncStorage from "@react-native-async-storage/async-storage";

const TIMER_KEY = "TIMER_KEY";

export type Timer = {
  timestamp: number;
  timestampList: number[];
  burritoCount: number;
};

export const initialState = {
  timer: {
    timestamp: 0,
    timestampList: [],
    burritoCount: 0,
  },
};

export const localStorageHelper = {
  async set(key: string, state: unknown) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn(e);
    }
  },

  async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value) {
        return await JSON.parse(value);
      }

      return null;
    } catch (e) {
      console.warn(e);
    }
  },

  async delete(key: string) {
    await AsyncStorage.removeItem(key);
  },
};

export function getTimerData() {
  return localStorageHelper.get(TIMER_KEY);
}

export function setTimerData(data: Timer) {
  return localStorageHelper.set(TIMER_KEY, data);
}
