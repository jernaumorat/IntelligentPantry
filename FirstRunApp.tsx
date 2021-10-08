import React, { useEffect, useRef, useState } from "react";

import { ActivityIndicator, GestureResponderEvent, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, useColorScheme, View } from "react-native";

import { NavigationContainer, DarkTheme, DefaultTheme, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NetworkManager } from "./NetworkManager";
import { StorageManager } from "./StorageManager";

const wait = (timeout: number): Promise<number> => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const FRStack = createNativeStackNavigator();

const styles = StyleSheet.create({
    FRHeader: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FRBody: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FRFooter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    FRTitleText: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginHorizontal: 20
    },
    FRBodyText: {

    },
    FRCodeEntry: {
        width: 60,
        height: 60,
        borderWidth: 2,
        fontSize: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 10
    }
})

const FRNextButton: React.FC<{ navCallback: (e: GestureResponderEvent) => void, last: boolean, disabled: boolean, style?: object }> = ({ navCallback, last, disabled, style }) => {
    return (
        <TouchableOpacity style={[{
            borderRadius: 10,
            backgroundColor: disabled ? '#597860' : '#1b7931',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%',
            width: '70%',
            opacity: disabled ? 0.5 : 1,
        }, style]}
            onPress={navCallback}
            disabled={disabled}>
            <Text style={{ fontSize: 24 }}>{last ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
    )
}

const FRCodeEntry: React.FC<{ success: () => void }> = ({ success }) => {
    const [inputValue, setInputValue] = useState<string[]>(['', '', '', ''])
    const in_1 = useRef<TextInput>()
    const in_2 = useRef<TextInput>()
    const in_3 = useRef<TextInput>()
    const in_4 = useRef<TextInput>()
    const colors = useTheme().colors

    const handleChange = async () => {
        let code = inputValue.join('')

        if (code.length === 4) {
            let token = await NetworkManager.getToken(code)
            if (token === null) {
                await wait(750)
                setInputValue(['', '', '', ''])
                in_1.current?.focus()

                return
            }

            StorageManager.setToken(token)
            await wait(1500).then(() => success())
        }
    }

    useEffect(() => {
        handleChange()
    }, [inputValue])

    return (
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                // @ts-ignore
                ref={in_1}
                style={{ ...styles.FRCodeEntry, borderColor: colors.border, color: colors.card, backgroundColor: colors.text }}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                contextMenuHidden={true}
                maxLength={1}
                autoFocus={true}
                value={inputValue[0]}
                onChange={() => in_2.current?.focus()}
                onChangeText={(text) => setInputValue([text, inputValue[1], inputValue[2], inputValue[3]])} />
            <TextInput
                // @ts-ignore
                ref={in_2}
                style={{ ...styles.FRCodeEntry, borderColor: colors.border, color: colors.card, backgroundColor: colors.text }}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                contextMenuHidden={true}
                maxLength={1}
                value={inputValue[1]}
                onKeyPress={(e) => { if (e.nativeEvent.key === 'Backspace') { setInputValue(['', inputValue[1], inputValue[2], inputValue[3]]); in_1.current?.focus() } }}
                onChange={() => in_3.current?.focus()}
                onChangeText={(text) => setInputValue([inputValue[0], text, inputValue[2], inputValue[3]])} />
            <TextInput
                // @ts-ignore
                ref={in_3}
                style={{ ...styles.FRCodeEntry, borderColor: colors.border, color: colors.card, backgroundColor: colors.text }}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                contextMenuHidden={true}
                maxLength={1}
                value={inputValue[2]}
                onKeyPress={(e) => { if (e.nativeEvent.key === 'Backspace') { setInputValue([inputValue[0], '', inputValue[2], inputValue[3]]); in_2.current?.focus() } }}
                onChange={() => in_4.current?.focus()}
                onChangeText={(text) => setInputValue([inputValue[0], inputValue[1], text, inputValue[3]])} />
            <TextInput
                // @ts-ignore
                ref={in_4}
                style={{ ...styles.FRCodeEntry, borderColor: colors.border, color: colors.card, backgroundColor: colors.text }}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                contextMenuHidden={true}
                maxLength={1}
                value={inputValue[3]}
                onKeyPress={(e) => { if (e.nativeEvent.key === 'Backspace') { setInputValue([inputValue[0], inputValue[1], '', inputValue[3]]); in_3.current?.focus() } }}
                onChange={() => Keyboard.dismiss()}
                onChangeText={(text) => setInputValue([inputValue[0], inputValue[1], inputValue[2], text])} />
        </View>
    )
}

const FRWelcome: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.FRHeader}>
                <Text style={{ ...styles.FRTitleText, color: useTheme().colors.text }}>
                    Welcome to your Intelligent Pantry!
                </Text>
            </View>
            <View style={styles.FRBody}>
                <Text style={{ ...styles.FRBodyText, color: useTheme().colors.text }}>

                </Text>
            </View>
            <View style={styles.FRFooter}>
                <FRNextButton navCallback={(_) => { navigation.navigate('Pair') }} last={false} disabled={false} />
            </View>
        </View>
    )
}

const FRPair: React.FC<{ navigation: any }> = ({ navigation }) => {
    useEffect(() => {
        (async () => {
            if (await StorageManager.getToken() !== '') { await wait(1500).then(navigation.navigate('End')); return }
            try {
                let code = await NetworkManager.getPairingCode()
                if (code === null) { await wait(1500).then(navigation.navigate('Code')); return }
                let token = await NetworkManager.getToken(code)

                await StorageManager.setToken(token)

                await NetworkManager.getPantryItems()

                navigation.navigate('End')
            } catch (_) {
                StorageManager.setToken('')
                navigation.navigate('Network')
            }
        })()
    })

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.FRHeader}>
                <Text style={{ ...styles.FRTitleText, color: useTheme().colors.text }}>
                    Looking for your Intelligent Pantry Appliance...
                </Text>
            </View>
            <View style={styles.FRBody}>
                <ActivityIndicator size='large' color='#1b7931' />
            </View>
            <View style={styles.FRFooter}>

            </View>
        </View>
    )
}

const FRCode: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [disabled, setDisabled] = useState(false)
    const [code, setCode] = useState('')

    const codeCallback = (code: string) => {
        setCode(code)
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.FRHeader}>
                <Text style={{ ...styles.FRTitleText, color: useTheme().colors.text }}>
                    Please enter a pairing code from another connected app:
                </Text>
            </View>
            <View style={styles.FRBody}>
                <FRCodeEntry success={() => navigation.navigate('End')} />
            </View>
            <View style={styles.FRFooter}>
                <ActivityIndicator size='large' color='#1b7931' />
            </View>
        </View>
    )
}

const FRNetwork: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [disabled, setDisabled] = useState(false)

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.FRHeader}>
                <Text style={{ ...styles.FRTitleText, color: useTheme().colors.text }}>
                    We were unable to automatically detect your Intelligent Pantry Appliance.{`\n`}
                    Please ensure it is connected to power and your home network, or enter the
                    network details of the appliance below:
                </Text>
            </View>
            <View style={styles.FRBody}>

            </View>
            <View style={styles.FRFooter}>
                <FRNextButton navCallback={(_) => { navigation.navigate('End') }} last={false} disabled={disabled} />
            </View>
        </View>
    )
}

const FREnd: React.FC<{ navigation: any, endFR: () => void }> = ({ navigation, endFR }) => {
    useEffect(() => {
        StorageManager.setFirstRun(false)
    }, [])
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.FRHeader}>

            </View>
            <View style={styles.FRBody}>

            </View>
            <View style={styles.FRFooter}>
                <FRNextButton navCallback={(_) => { endFR() }} last={true} disabled={false} />
            </View>
        </View>
    )
}

const FirstRunApp: React.FC<{ endFR: () => void }> = ({ endFR }) => {
    return (
        <NavigationContainer theme={useColorScheme() == 'dark' ? DarkTheme : DefaultTheme}>
            <FRStack.Navigator>
                {/* <FRStack.Navigator screenOptions={{ headerShown: false }}> */}
                <FRStack.Screen name="Welcome" component={FRWelcome} />
                <FRStack.Screen name="Pair" component={FRPair} />
                <FRStack.Screen name="Code" component={FRCode} />
                <FRStack.Screen name="Network" component={FRNetwork} />
                <FRStack.Screen name="End">
                    {props => <FREnd {...props} endFR={endFR} />}
                </FRStack.Screen>
            </FRStack.Navigator>
        </NavigationContainer>
    )
}

export default FirstRunApp;