import React, {
    useState
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

import { RobotPreset } from './RobotPresets';
import { RobotControls } from './RobotControl';
import { RobotCoordinate } from './RobotCoordinate';
import { NetworkManager, Coords } from '../NetworkManager';

export const RobotScreen = (props: any): JSX.Element => {
    const [coordState, setCoordState] = useState<Coords>({ x: 0, y: 0 })
    const updateCoords = (coords: Coords) => setCoordState(coords)

    const url = NetworkManager().getInstance().url + '/robot/camera'
    return (
        <KeyboardAvoidingView behavior={'position'}
            contentContainerStyle={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}
            style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Image style={{ flex: 5, height: '100%', minWidth: '100%' }} source={{ uri: url }} />
                    <RobotPreset coords={coordState} setCoords={updateCoords} />
                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <RobotControls coords={coordState} setCoords={updateCoords} />
                        <RobotCoordinate coords={coordState} setCoords={updateCoords} />
                    </View>
                </View>
            </TouchableWithoutFeedback >
        </KeyboardAvoidingView >
    )
}