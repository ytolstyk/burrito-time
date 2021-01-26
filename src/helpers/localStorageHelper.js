import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMESTAMP = 'TIMESTAMP';
const BURRITO_COUNT = 'BURRITO_COUNT';

function valueOrZero(value) {
  return value ? value : 0;
}

export const localStorageHelper = {
  async set(key, state) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      // saving error
    }
  },

  async get(key) {
    try {
      const value = await AsyncStorage.getItem(key)

      return await JSON.parse(value);
    } catch(e) {
      // error reading value
    }
  },

  async delete(key) {
    await AsyncStorage.removeItem(key);
  },

  setTimestamp(timestamp) {
    return localStorageHelper.set(TIMESTAMP, timestamp);
  },

  async getTimestamp() {
    const timestamp = localStorageHelper.get(TIMESTAMP);

    return valueOrZero(await timestamp);
  },

  setBurritoCount(num) {
    return localStorageHelper.set(BURRITO_COUNT, num);
  },

  async getBurritoCount() {
    const count = localStorageHelper.get(BURRITO_COUNT);

    return valueOrZero(await count);
  },
};
