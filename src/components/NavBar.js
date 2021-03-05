import React from 'react';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { NavBarWrapper } from './NavBar.styles';
import { TouchableOpacity } from 'react-native';
import { themes } from '../styles/constants';
import { colors } from '../styles/colors';

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
    const color = props.theme === themes.dark ? colors.lightGrey : colors.black;

    if (props.renderBack) {
      return <Ionicons name="md-home" size={iconSize} color={color} />;
    }

    return <Octicons name="gear" size={iconSize} color={color} />;
  }

  return (
    <NavBarWrapper>
      <TouchableOpacity onPress={handleGearClick}>
        {renderButtons()}
      </TouchableOpacity>
    </NavBarWrapper>
  );
}
