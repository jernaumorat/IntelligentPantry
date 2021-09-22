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

import { NetworkManager, Preset } from '../NetworkManager';

export const RobotPreset = (props: any): JSX.Element => {
    const [presetList, setPresetList] = useState<Preset[]>([])
    const [selected, setSelected] = useState(1)
    const setCoordState = props.setCoords

    let nm = NetworkManager().getInstance()

    const components_from_presets = (data: Preset[]): JSX.Element[] => {
        const final = []
        for (let preset of data) {
            final.push(<Picker.Item key={preset.presetId} label={preset.label} value={preset.presetId} />)
        }

        return final
    }

    const preset_recall = async () => {
        let newCoords = presetList.filter(item => { return item.presetId === selected })[0].coords
        console.log(newCoords)
        setCoordState(newCoords);
    }

    const update_state = async () => {
        const presets: Preset[] = await nm.getPresets();
        setPresetList(presets);
    }

    useEffect(() => {
        update_state()
    }, [])

    return (
        <View style={{ flex: 2, flexDirection: 'row' }}>
            <View style={[style.pickerView, { flex: 7 }]}>
                <Picker selectedValue={selected} onValueChange={itemValue => setSelected(itemValue)}>
                    {components_from_presets(presetList)}
                    {/* <Picker.Item label='Preset 1' value='1' /> */}
                </Picker>
            </View>
            <View style={[style.pickerView, { flex: 3 }]}>
                <Button title={"Recall"} color='#1b7931' onPress={preset_recall} />
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
