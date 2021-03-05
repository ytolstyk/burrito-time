import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { Ionicons } from '@expo/vector-icons';
import Router from './src/components/Router';
import { theme } from './src/metaActions';
import { updateCountAndTimestamp } from './src/timerActions';
import { localStorageHelper } from './src/helpers/localStorageHelper';

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

function App() {
  const [isReady, setIsReady] = useState(false);

  function handleLoadingFinished() {
    setIsReady(true);
  }

  async function loadAssetsAsync() {
    const fontAssets = cacheFonts([Ionicons.font]);

    store.dispatch(updateCountAndTimestamp({
      count: await localStorageHelper.getBurritoCount(),
      timestamp: await localStorageHelper.getTimestamp(),
    }));

    store.dispatch(theme(await localStorageHelper.getTheme()));

    await Promise.all([...fontAssets]);
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={handleLoadingFinished}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
