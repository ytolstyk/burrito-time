import React from 'react';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { NavBarWrapper } from './NavBar.styles';
import { TouchableOpacity } from 'react-native';

const iconSize = 30;

export function NavBar(props) {
  function handleGearClick() {
    if (props.renderBack) {
      props.navigation.navigate('Home');

      return;
    }

    props.navigation.navigate('Settings');
  }

  function renderButtons() {
    if (props.renderBack) {
      return <Ionicons name="md-home" size={iconSize} color="black" />;
    }

    return <Octicons name="gear" size={iconSize} color="black" />;
  }

  return (
    <NavBarWrapper>
      <TouchableOpacity onPress={handleGearClick}>
        {renderButtons()}
      </TouchableOpacity>
    </NavBarWrapper>
  );
}
