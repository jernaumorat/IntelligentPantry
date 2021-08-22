/*
 *  IntPantry.jsx - PS2106
 *  All named functions should be annotated with their return type. All function parameters should be annotated with their data type. 
 */

import React, { useEffect } from 'react';

import {
  StyleSheet,
  useColorScheme,
  Platform,
  Text,
  View,
  Image,
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

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';

import { RobotScreen } from './RobotScreen'
import PantryScreen from './PantryScreen'
import PantryDetail from './PantryDetail'
import { SettingsScreen } from './SettingsScreen'

const Tab = createBottomTabNavigator();

const PantryStack = createNativeStackNavigator();

const PantryStackScreen = (props: any): JSX.Element => {
  return (
    <PantryStack.Navigator>
      <PantryStack.Screen name="AllItems" component={PantryScreen} options={{ headerShown: false }} />
      <PantryStack.Screen name="Item Detail" component={PantryDetail} />
    </PantryStack.Navigator>
  )
}

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    SplashScreen.hide()
  }, [])

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
        },
        tabBarActiveTintColor: '#1b7931',
      })}>
        <Tab.Screen name="Robot" component={RobotScreen} />
        <Tab.Screen name="Pantry" component={PantryStackScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
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
