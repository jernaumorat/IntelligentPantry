/*
 * Copyright © 2021 PS2106, licensed under the MIT License, 
 * the full text of which can be found under LICENSE.md at the top level of this repository,
 * or at https://mit-license.org
 */

import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PantryScreen } from './PantryScreen'
import { PantryDetail } from './PantryDetail'
import { Platform, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PantryStack = createNativeStackNavigator();

export const PantryStackScreen = ({ navigation, devMode }: any): JSX.Element => {
    useEffect(() => {
        let osPrefix = (Platform.OS == ('ios' || 'macos')) ? 'ios-' : 'md-'
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 20 }}>
                    <Ionicons name={osPrefix + 'funnel'} size={24} color={"#1b7931"} />
                </TouchableOpacity>
            )
        })
    }, [navigation])
    return (
        <PantryStack.Navigator>
            <PantryStack.Screen name="AllItems" options={{ headerShown: false }}>
                {props => <PantryScreen {...props} devMode={devMode} />}
            </PantryStack.Screen>
            {devMode ? <PantryStack.Screen name="Item Detail" component={PantryDetail} /> : <></>}
        </PantryStack.Navigator>
    )
}