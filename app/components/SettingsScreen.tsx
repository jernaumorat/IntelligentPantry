/*
 * Copyright © 2021 PS2106, licensed under the MIT License, 
 * the full text of which can be found under LICENSE.md at the top level of this repository,
 * or at https://mit-license.org
 */

import React, { useState } from 'react';

import {
    StatusBar,
    StyleSheet,
    Text,
    SectionList,
    View,
    Switch,
    TouchableOpacity,
    Linking,
} from 'react-native';

import { useTheme } from "@react-navigation/native";

import Dialog from 'react-native-dialog';

//@ts-ignore
import RNRestart from 'react-native-restart';

import { StorageManager } from '../StorageManager'
import { NetworkManager } from '../NetworkManager'


export const ResetDialog: React.FC<{ visible: boolean, handleCancel: () => void, handleReset: () => void }> = ({ visible, handleCancel, handleReset }): JSX.Element => {
    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Delete Preset</Dialog.Title>
                <Dialog.Description>Are you sure you want to reset all settings? This may require you to repair with the server if any other devices are paired.</Dialog.Description>
                <Dialog.Button label='Cancel' onPress={handleCancel} />
                <Dialog.Button label='Delete' onPress={handleReset} color='#ff2020' />
            </Dialog.Container>
        </View>
    )
}

export const PairDialog: React.FC<{ visible: boolean, code: string, handleCancel: () => void }> = ({ visible, code, handleCancel }): JSX.Element => {
    return (
        <View>
            <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
                <Dialog.Title>Pairing Code</Dialog.Title>
                <Dialog.Description style={{ fontSize: 50, textAlign: 'center' }}>{code}</Dialog.Description>
            </Dialog.Container>
        </View>
    )
}

export const CreditsDialog: React.FC<{ visible: boolean, handleCancel: () => void }> = ({ visible, handleCancel }): JSX.Element => {
    return (
        <View>
            <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
                <Dialog.Title style={{ fontSize: 30 }}>PS2106</Dialog.Title>
                <Dialog.Description style={{ fontSize: 21, textAlign: 'center' }}>
                    Nathaniel Munk
                </Dialog.Description>
                <Dialog.Description style={{ fontSize: 18, textAlign: 'center', marginBottom: 10, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://github.com/jernaumorat')}>
                    @jernaumorat
                </Dialog.Description>
                <Dialog.Description style={{ fontSize: 21, textAlign: 'center', marginBottom: 10 }}>
                    Blake Edwards
                </Dialog.Description>
                <Dialog.Description style={{ fontSize: 21, textAlign: 'center', marginBottom: 10 }}>
                    Bonita Sachdeva
                </Dialog.Description>
                <Dialog.Description style={{ fontSize: 21, textAlign: 'center' }}>
                    Sammy Haque
                </Dialog.Description>
            </Dialog.Container>
        </View>
    )
}

export const SettingsScreen: React.FC<{ devMode: boolean, setDevMode: (dm: boolean) => void }> = ({ devMode, setDevMode }) => {
    const [pairVisible, setPairVisible] = useState(false)
    const [resetVisible, setResetVisible] = useState(false)
    const [creditsVisible, setCreditsVisible] = useState(false)
    const [pairCode, setPairCode] = useState('')

    const { colors } = useTheme()

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
                    actiion: () => {
                        NetworkManager.getPairingCode().then(code => {
                            setPairCode(code);
                            setPairVisible(true);
                        });
                    }   /*need to insert correct function here*/
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
                    actiion: () => { setResetVisible(true); }
                }]
        }
    ];

    const handleCancel = (dia: 'pair' | 'reset' | 'credits') => {
        if (dia === 'pair') { setPairVisible(false) }
        if (dia === 'reset') { setResetVisible(false) }
        if (dia === 'credits') { setCreditsVisible(false) }
    }

    const handleReset = () => {
        StorageManager.resetDefault().then(() => {
            RNRestart.Restart()
        });
    }

    const Item = (props: any) => <>
        <PairDialog visible={pairVisible} code={pairCode} handleCancel={() => handleCancel('pair')} />
        <ResetDialog visible={resetVisible} handleCancel={() => handleCancel('reset')} handleReset={handleReset} />
        <CreditsDialog visible={creditsVisible} handleCancel={() => handleCancel('credits')} />
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
    </>;

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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, }}>
                <Text style={{ color: colors.text, }}>Copyright © 2021</Text>
                <Text style={{ color: colors.text, }} onLongPress={() => setCreditsVisible(true)}> PS2106</Text>
                <Text style={{ color: colors.text, }}>, licensed under the</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://mit-license.org')}>
                    <Text style={{ color: colors.text, textDecorationLine: 'underline' }}> MIT License</Text></TouchableOpacity>
                <Text style={{ color: colors.text, }}>.</Text>
            </View>
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