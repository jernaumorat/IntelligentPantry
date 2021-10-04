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
    Button,
    Image,
    RefreshControl,
} from 'react-native';

import { StorageManager } from '../StorageManager'
import { ThemeSwitch } from './ThemeSwitch';

export const SettingsScreen = (props: any): JSX.Element => {
    const sm = StorageManager().getInstance()
    return (
        <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30, justifyContent: 'space-evenly' }}>
            <View>
                <Text style={{ color: "green", textAlign: "right", width: "100%", alignSelf: 'flex-end' }} >Enable Dark Mode</Text>
                <ThemeSwitch />
            </View>
            <Button color={'#1b7931'} title={"Scan"} onPress={() => { }} />
            <Button color={'#1b7931'} title={"Pair"} onPress={() => { }} />
            <Button color={'#1b7931'} title={"Dev Mode"} onPress={() => { }} />
            <Button color={'#1b7931'} title={"Reset All Settings"} onPress={sm.resetDefault} />
        </View>
    )
}