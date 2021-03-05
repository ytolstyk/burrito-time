import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import TimerComponent from './Timer';
import SettingsComponent from './Settings';
import { orientationIsLandscape } from '../metaActions';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function Router() {
  function onDimensionChange({ screen }) {
    props.orientationIsLandscape(screen.height <= screen.width);
  }

  useEffect(() => {
    Dimensions.addEventListener("change", onDimensionChange);

    return () => {
      Dimensions.removeEventListener("change", onDimensionChange);
    };
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={TimerComponent} />
        <Drawer.Screen name="Settings" component={SettingsComponent} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const mapDispatchToProps = {
  orientationIsLandscape,
};

export default connect(null, mapDispatchToProps)(Router);
