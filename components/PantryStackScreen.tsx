import React, { useLayoutEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PantryScreen } from './PantryScreen'
import { PantryDetail } from './PantryDetail'

const PantryStack = createNativeStackNavigator();

export const PantryStackScreen = (): JSX.Element => {
    return (
        <PantryStack.Navigator>
            <PantryStack.Screen name="AllItems" component={PantryScreen} options={{ headerShown: false }} />
            <PantryStack.Screen name="Item Detail" component={PantryDetail} />
        </PantryStack.Navigator>
    )
}