import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { Ionicons } from '@expo/vector-icons';
import TimerComponent from './src/components/Timer';
import { SettingsComponent } from './src/components/Settings';

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

const Drawer = createDrawerNavigator();

function App() {
  const [isReady, setIsReady] = useState(false);

  function handleLoadingFinished() {
    setIsReady(true);
  }

  async function loadAssetsAsync() {
    const fontAssets = cacheFonts([Ionicons.font]);

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
    <NavigationContainer>
      <Provider store={store}>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={TimerComponent} />
          <Drawer.Screen name="Settings" component={SettingsComponent} />
        </Drawer.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
