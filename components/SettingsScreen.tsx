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
    // load props
    const devMode = props.devMode
    const setDevMode = props.setDevMode    
    //function called on devmode click. sets devMode prop for app.tsx to remove nav item
    const onClickDevMode = ()=> {
        setDevMode(!devMode);
    }
    return (
        <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30, justifyContent: 'space-evenly' }}>
             
            <Button color={'#1b7931'} title={"Scan"} onPress={() => { }} />
            <Button color={'#1b7931'} title={"Pair"} onPress={() => { }} />
            <Button color={'#1b7931'} title={"Dev Mode"} onPress={onClickDevMode} />
            <Button color={'#1b7931'} title={"Reset All Settings"} onPress={StorageManager.resetDefault} />
        </View>
    )
}