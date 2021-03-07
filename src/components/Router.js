import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { ThemeProvider } from 'styled-components';
import TimerComponent from './Timer';
import SettingsComponent from './Settings';
import { orientationIsLandscape } from '../metaActions';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { metaSelectors } from '../metaReducer';

const Drawer = createDrawerNavigator();

function Router(props) {
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
      <ThemeProvider theme={{
        name: props.theme
      }}>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={TimerComponent} />
          <Drawer.Screen name="Settings" component={SettingsComponent} />
        </Drawer.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}

function mapStateToProps(state) {
  return {
    theme: metaSelectors.theme(state),
  };
}

const mapDispatchToProps = {
  orientationIsLandscape,
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
