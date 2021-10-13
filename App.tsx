/*
 *  IntPantry.jsx - PS2106
 *  All named functions should be annotated with their return type. All function parameters should be annotated with their data type. 
 */

import React, { lazy, useEffect, useState } from 'react';

import {
  StyleSheet,
  useColorScheme,
  Platform,
  Text,
  View,
  Image,
} from 'react-native';

import {
  NavigationContainer, DarkTheme, DefaultTheme
} from '@react-navigation/native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';

import { StorageManager } from './StorageManager'
import { RobotScreen } from './components/RobotScreen'
import { PantryStackScreen } from './components/PantryStackScreen'
import { SettingsScreen } from './components/SettingsScreen'
import { EventRegister } from 'react-native-event-listeners'
const Tab = createBottomTabNavigator();

const App = (): JSX.Element => {
  // create the state var and set func
    const [devMode, setDevMode] = useState(true)
    const scheme = useColorScheme();
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  
  //set component as nothing or if devMode = true enable robot nav tab icon
  let RobotScreenComponent;
  if(devMode){
      RobotScreenComponent = <Tab.Screen name="Robot" component={RobotScreen} />
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
        {RobotScreenComponent}
        <Tab.Screen name="Pantry" component={PantryStackScreen} />
        <Tab.Screen name="Settings" children={()=><SettingsScreen devMode={devMode} setDevMode={setDevMode}/>}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
