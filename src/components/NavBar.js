import React from 'react';
import { Octicons } from '@expo/vector-icons';
import { NavBarWrapper } from './NavBar.styles';
import { TouchableOpacity } from 'react-native';

export function NavBar(props) {
  function handleGearClick() {
    props.navigation.navigate('Settings');
  }

  return (
    <NavBarWrapper>
      <TouchableOpacity onPress={handleGearClick}>
        <Octicons
          name="gear"
          size={30}
          color="black"
        />
      </TouchableOpacity>
    </NavBarWrapper>
  );
}
