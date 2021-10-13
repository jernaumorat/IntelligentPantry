import React, { useLayoutEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PantryScreen } from './PantryScreen'
import { PantryDetail } from './PantryDetail'
import { Platform, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PantryStack = createNativeStackNavigator();

export const PantryStackScreen = ({ navigation }): JSX.Element => {
    useLayoutEffect(() => {
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
            <PantryStack.Screen name="AllItems" component={PantryScreen} options={{ headerShown: false }} />
            <PantryStack.Screen name="Item Detail" component={PantryDetail} />
        </PantryStack.Navigator>
    )
}