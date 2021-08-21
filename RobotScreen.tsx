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

interface ArrowProps {
    direction: 'up' | 'down' | 'left' | 'right',
    size: number
}

const ArrowButton = (props: ArrowProps): JSX.Element => {
    return (
        <TouchableOpacity>
            <Icon name={'caret' + props.direction} size={props.size} />
        </TouchableOpacity>
    )
}

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
                    <Image style={{ flex: 5, height: '100%', minWidth: '100%' }} source={{ uri: 'http://192.168.0.248:5000/pantry/knownitems/3/img' }} />
                    <View style={{ flex: 2, flexDirection: 'row', backgroundColor: 'green' }}>
                        <View style={{ flex: 7, justifyContent: 'space-around', backgroundColor: 'yellowgreen' }}>
                            <Picker selectedValue={preset} onValueChange={itemValue => setPreset(itemValue)}>
                                <Picker.Item label="Preset 1" value='1' />
                                <Picker.Item label="Preset 2" value='2' />
                                <Picker.Item label="Preset 3" value='3' />
                                <Picker.Item label="Preset 4" value='4' />
                                <Picker.Item label="Preset 5" value='5' />
                                <Picker.Item label="Preset 6" value='6' />
                                <Picker.Item label="Preset 7" value='7' />
                                <Picker.Item label="Preset 8" value='8' />
                            </Picker>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: 'darkolivegreen' }}>
                            <Button title={"Recall"} onPress={() => { }} />
                            <Button title={"Create"} onPress={() => { }} />
                        </View>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'blue' }}>
                        <View style={{ flex: 7, flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: 'cyan' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'lightgrey' }}>
                                <ArrowButton direction={'up'} size={64} />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'darkgrey' }}>
                                <ArrowButton direction={'left'} size={64} />
                                <ArrowButton direction={'down'} size={64} />
                                <ArrowButton direction={'right'} size={64} />
                            </View>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: 'deepskyblue' }}>
                            {/* TODO: Make these TextInputs into components */}
                            <TextInput value={xPos} onChangeText={setxPos} textAlign={'center'} keyboardType={'numeric'} selectTextOnFocus={true} contextMenuHidden={true} />
                            <TextInput value={yPos} onChangeText={setyPos} textAlign={'center'} keyboardType={'numeric'} selectTextOnFocus={true} contextMenuHidden={true} />
                            <Button title={"Go"} onPress={() => { }} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback >
        </KeyboardAvoidingView >
    )
}