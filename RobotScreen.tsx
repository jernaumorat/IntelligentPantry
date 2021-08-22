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
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

// TODO: remove all NewAppScreen imports, then remove from package deps.
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import {
    Picker
} from '@react-native-picker/picker';
import { RobotPreset } from './components/RobotPresets';
import { RobotControls } from './components/RobotControl';
import { RobotCoordinate } from './components/RobotCoordinate';

export const RobotScreen = (props: any): JSX.Element => {
    const [xPos, setxPos] = useState('0')
    const [yPos, setyPos] = useState('0')
    const [preset, setPreset] = useState('')

    return (
        <KeyboardAvoidingView behavior={'position'}
            contentContainerStyle={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', backgroundColor: 'white' }}
            style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', backgroundColor: 'white' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Image style={{ flex: 5, height: '100%', minWidth: '100%' }} source={{ uri: 'http://192.168.0.248:5000/robot/camera' }} />
                    <RobotPreset />
                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'blue' }}>
                        <RobotControls />
                        <RobotCoordinate />
                    </View>
                </View>
            </TouchableWithoutFeedback >
        </KeyboardAvoidingView >
    )
}