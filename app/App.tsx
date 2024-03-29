/*
 * Copyright © 2021 PS2106, licensed under the MIT License, 
 * the full text of which can be found under LICENSE.md at the top level of this repository,
 * or at https://mit-license.org
 */

import React, {
  useEffect,
  useState
} from 'react';

import {
  useColorScheme,
  Platform,
} from 'react-native';

import {
  NavigationContainer, DarkTheme, DefaultTheme
} from '@react-navigation/native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { RobotScreen } from './components/RobotScreen'
import { PantryStackScreen } from './components/PantryStackScreen'
import { SettingsScreen } from './components/SettingsScreen'
import { StorageManager } from './StorageManager';

const Tab = createBottomTabNavigator();

const App = (): JSX.Element => {
  // create the state var and set func
  const [devMode, setDevMode] = useState(false)
  const scheme = useColorScheme();

  useEffect(() => {
    StorageManager.getDevMode().then(dm => setDevMode(dm))
  }, [])

  const devToggle = (dm: boolean) => {
    StorageManager.setDevMode(dm)
    setDevMode(dm)
  }

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator initialRouteName="Pantry" screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let osPrefix = (Platform.OS == ('ios' || 'macos')) ? 'ios-' : 'md-'
          switch (route.name) {
            case 'Robot':
              iconName = osPrefix + 'camera'
              break
            case 'Pantry':
              iconName = osPrefix + 'nutrition'
              break
            case 'Settings':
              iconName = osPrefix + 'cog'
              break;
            default:
              iconName = osPrefix + 'help-buoy'
          }

          return (<Ionicons name={iconName} size={size} color={color} />)
        },
        tabBarActiveTintColor: '#1b7931',
        lazy: false
      })}>
        {devMode ? <Tab.Screen name="Robot" component={RobotScreen} /> : <></>}
        <Tab.Screen name="Pantry">
          {props => <PantryStackScreen {...props} devMode={devMode} />}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {props => <SettingsScreen {...props} devMode={devMode} setDevMode={devToggle} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
