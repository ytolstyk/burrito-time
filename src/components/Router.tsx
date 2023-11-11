import React from "react";
import { ThemeProvider } from "styled-components";
import { TimerComponent } from "./Timer";
import { SettingsComponent } from "./Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

type Props = {
  theme?: "dark" | "light";
};

export function Router({ theme }: Props) {
  return (
    <NavigationContainer>
      <ThemeProvider
        theme={{
          name: theme,
        }}
      >
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={TimerComponent} />
          <Drawer.Screen name="Settings" component={SettingsComponent} />
        </Drawer.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
