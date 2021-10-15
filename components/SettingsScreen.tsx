import React, {
    useState,
    useEffect,
} from 'react';

import {
    StatusBar,
    StyleSheet,
    Text,
    SectionList,
    View,
    Switch,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from "@react-navigation/native";
import { StorageManager } from '../StorageManager'
import { NetworkManager } from '../NetworkManager'


export const SettingsScreen = (props: any): JSX.Element => {
    const colors = useTheme().colors
    // load props
    const devMode = props.devMode
    const setDevMode = props.setDevMode
    //function called on devmode click. sets devMode prop for app.tsx to remove nav item
    const onClickDevMode = () => {
        setDevMode(!devMode);
    }
    // Menu item Strings
    // control criti
    const MENU = [
        {
            title: "Robot",
            data: [
                {
                    label: "Scan",
                    control: "text",
                    actiion: () => { NetworkManager.postScan(); }
                },
                {
                    label: "Pair",
                    control: "text",
                    actiion: () => { NetworkManager.getPairingCode(); }   /*need to insert correct function here*/
                }]
        },
        {
            title: "System",
            data: [
                {
                    label: "Dev Mode",
                    control: "switch",
                    actiion: () => { setDevMode(!devMode); }
                },
                {
                    label: "Reset All Settings",
                    control: "critical text",
                    actiion: () => { StorageManager.resetDefault();; }
                }]
        }
    ];

    const Item = (props: any) => (
        <TouchableOpacity onPress={() => props.actiion()}>
            <View style={{ ...styles.item, backgroundColor: colors.card, }}>
                {/* inline syting condition for critical items */}
                <Text style={props.control == "critical text" ? styles.critical : { color: colors.text }}>
                    {props.label}
                </Text>
                {props.control == "switch" ?
                    <Switch
                        style={styles.switch}
                        value={devMode}
                        onValueChange={() => props.actiion()} /> : null
                }
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{
            flex: 1, justifyContent: 'space-evenly', paddingTop: StatusBar.currentHeight,
            marginHorizontal: 32
        }}>
            <SectionList
                sections={MENU}
                renderItem={({ item }) => (Item(item))}
                renderSectionHeader={({ section }) => (<Text style={{ ...styles.title, color: colors.text }}>{section.title}</Text>)}
                keyExtractor={(item, index) => item.label + index}
                scrollEnabled={false}
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
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: 60,
        marginVertical: 1
    },
    critical: {
        fontSize: 16,
        color: '#c70c28',
    },
    title: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 22
    },
    switch: {
        margin: 0,
        padding: 0,
        height: '80%'
    },
});