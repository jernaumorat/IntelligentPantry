import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PantryScreen } from './PantryScreen'
import { PantryDetail } from './PantryDetail'

const PantryStack = createNativeStackNavigator();

export const PantryStackScreen: React.FC<{ devMode: boolean }> = ({ devMode }) => {
    return (
        <PantryStack.Navigator>
            <PantryStack.Screen name="AllItems" options={{ headerShown: false }}>
                {props => <PantryScreen {...props} devMode={devMode} />}
            </PantryStack.Screen>
            {devMode ? <PantryStack.Screen name="Item Detail" component={PantryDetail} /> : <></>}
        </PantryStack.Navigator>
    )
}