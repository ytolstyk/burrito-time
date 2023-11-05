import AsyncStorage from "@react-native-async-storage/async-storage";

const TIMESTAMP = "TIMESTAMP";
const BURRITO_COUNT = "BURRITO_COUNT";
const THEME = "THEME";

function valueOrZero(value) {
  return value ? value : 0;
}

export const localStorageHelper = {
  async set(key, state) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn(e);
    }
  },

  async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);

      return await JSON.parse(value);
    } catch (e) {
      console.warn(e);
    }
  },

  async delete(key) {
    await AsyncStorage.removeItem(key);
  },

  setTimestamp(timestamp) {
    return localStorageHelper.set(TIMESTAMP, timestamp);
  },

  async getTimestamp() {
    const timestamp = await localStorageHelper.get(TIMESTAMP);

    return valueOrZero(timestamp);
  },

  setBurritoCount(num) {
    return localStorageHelper.set(BURRITO_COUNT, num);
  },

  async getBurritoCount() {
    const count = await localStorageHelper.get(BURRITO_COUNT);

    return valueOrZero(count);
  },

  setTheme(theme) {
    return localStorageHelper.set(THEME, theme);
  },

  async getTheme() {
    return await localStorageHelper.get(THEME);
  },
};
