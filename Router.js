import React, { useState, useEffect } from 'react';
import TimerComponent from './Timer';
import { SettingsComponent } from './Settings';
import { Provider } from 'react-redux';
import { store } from './store';

export function Router() {
  return (
    <Provider store={store}>
      <TimerComponent />
    </Provider>
  );
}
