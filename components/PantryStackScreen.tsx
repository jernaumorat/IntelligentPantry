/*
 * Copyright © 2021 PS2106, licensed under the MIT License, 
 * the full text of which can be found under LICENSE.md at the top level of this repository,
 * or at https://mit-license.org
 */

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