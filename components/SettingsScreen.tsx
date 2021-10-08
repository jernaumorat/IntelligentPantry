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
    return (
        <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30, justifyContent: 'space-evenly' }}>
             
            <Button color={'#1b7931'} title={"Scan"} onPress={() => { }} />
            <Button color={'#1b7931'} title={"Pair"} onPress={() => { }} />
            <Button color={'#1b7931'} title={"Dev Mode"} onPress={() => { }} />
            <Button color={'#1b7931'} title={"Reset All Settings"} onPress={StorageManager.resetDefault} />
        </View>
    )
}