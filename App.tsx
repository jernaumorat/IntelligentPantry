/*
 *  IntPantry.jsx - PS2106
 *  All named functions should be annotated with their return type. All function parameters should be annotated with their data type. 
 */

import React, {
  useState,
  useEffect,
} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Platform,
} from 'react-native';

// TODO: remove all NewAppScreen imports, then remove from package deps.
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { RobotScreen } from './RobotScreen'
import { PantryScreen } from './PantryScreen'
import { SettingsScreen } from './SettingsScreen'

const Tab = createBottomTabNavigator();

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // TODO: fix url passing
  return (
    <NavigationContainer>
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
        }
      })}>
        <Tab.Screen name="Robot" component={RobotScreen} />
        <Tab.Screen name="Pantry" component={PantryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      {/* <SafeAreaView style={backgroundStyle}> */}
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
