import React, {
    useState,
    useEffect,
} from 'react';
import {
    View,
    Button,
    StyleSheet
} from 'react-native';
import {
    Picker
} from '@react-native-picker/picker';
import { create } from 'react-test-renderer';

export const RobotPreset = (props: any): JSX.Element => {
    const [preset, setPreset] = useState('')
    return (
        <View style={{ flex: 2, flexDirection: 'row' }}>
            <View style={[style.pickerView, { flex: 7 }]}>
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
            <View style={[style.pickerView, { flex: 3 }]}>
                <Button title={"Recall"} color='#1b7931' onPress={() => { }} />
                <Button title={"Create"} color='#1b7931' onPress={() => { }} />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    pickerView: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    }
});
