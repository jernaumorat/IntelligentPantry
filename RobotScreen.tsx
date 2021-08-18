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
    KeyboardAvoidingView,
    Image,
    RefreshControl,
    Button,
} from 'react-native';

// TODO: remove all NewAppScreen imports, then remove from package deps.
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import {
    Picker
} from '@react-native-picker/picker';

export const RobotScreen = (props: any): JSX.Element => {
    return (
        <KeyboardAvoidingView style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', backgroundColor: 'white' }}>
            <View style={{ flex: 5, backgroundColor: 'red' }}>
                <Image source={{ uri: '' }} />
            </View>
            <View style={{ flex: 2, flexDirection: 'row', backgroundColor: 'green' }}>
                <View style={{ flex: 7, justifyContent: 'space-evenly', backgroundColor: 'yellowgreen' }}>
                    <Picker>
                        <Picker.Item>Preset 1</Picker.Item>
                        <Picker.Item>Preset 2</Picker.Item>
                    </Picker>
                </View>
                <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: 'darkolivegreen' }}>
                    <Button title={"Recall"} onPress={() => { }} />
                    <Button title={"Create"} onPress={() => { }} />
                </View>
            </View>
            <View style={{ flex: 3, flexDirection: 'row', backgroundColor: 'blue' }}>
                <View style={{ flex: 7, backgroundColor: 'cyan' }}>

                </View>
                <View style={{ flex: 3, flexDirection: 'column', backgroundColor: 'deepskyblue' }}>

                </View>
            </View>
        </KeyboardAvoidingView>
    )
}