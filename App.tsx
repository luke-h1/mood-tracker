import React from 'react';
import { AppContextProvider } from './src/context/App.provider';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './src/screens/BottomTabs.navigator';

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppContextProvider>
  );
}
