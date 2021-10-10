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
    SectionList,
    View,
    Button,
    Image,
    RefreshControl,
} from 'react-native';

import { StorageManager } from '../StorageManager'
import { NetworkManager } from '../NetworkManager'
import { ThemeSwitch } from './ThemeSwitch';

export const SettingsScreen = (props: any): JSX.Element => {
    // load props
    const devMode = props.devMode
    const setDevMode = props.setDevMode
    //function called on devmode click. sets devMode prop for app.tsx to remove nav item
    const onClickDevMode = () => {
        setDevMode(!devMode);
    }
    // Menu item Strings
    const DATA = [
        {
            title: "Robot",
            data: ["Scan", "Pair"]
        },
        {
            title: "System",
            data: ["Dev Mode", "Reset All Settings"]
        }];

    // Menu Item functions
    const onClickSetting = (item: String) => {
        if (item == "Scan") {
            NetworkManager.postScan();
        }
        if (item == "Pair") {
        }
        if (item == "Dev Mode") {
            setDevMode(!devMode);
        }
        if (item == "Reset All Settings") {
            StorageManager.resetDefault()
            setDevMode(!devMode);
        }
    }
    return (
        <View style={{
            flex: 1, justifyContent: 'space-evenly', paddingTop: StatusBar.currentHeight,
            marginHorizontal: 32
        }}>
            <SectionList
                sections={DATA}
                renderItem={({ item }) => <Text style={styles.item} onPress={() => onClickSetting(item)}>{item}</Text>}

                renderSectionHeader={({ section }) => (<Text style={styles.title}>{section.title}</Text>)}
                keyExtractor={(index) => index}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#1b7931",
        padding: 15,
        marginVertical: 1
    },
    title: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 22
    }
});