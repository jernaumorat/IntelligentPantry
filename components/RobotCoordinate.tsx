import React, {
    useState,
    useEffect,
} from 'react';

import {
    View,
    Button,
    StyleSheet,
    TextInput,
} from 'react-native';

import { NetworkManager } from '../NetworkManager';

export const RobotCoordinate = (props: any): JSX.Element => {
    const coordState = props.coords
    const setCoordState = props.setCoords

    const [textXState, setTextXState] = useState('0');
    const [textYState, setTextYState] = useState('0');

    const setxPos = (x: String) => setCoordState({ x: Number(x), y: coordState.y })
    const setyPos = (y: String) => setCoordState({ x: coordState.x, y: Number(y) })

    useEffect(() => {
        setTextXState(coordState.x.toString());
        setTextYState(coordState.y.toString())
    }, [coordState])
    return (
        <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-evenly' }}>
            {/* TODO: Make these TextInputs into components */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TextInput style={[style.textInput, { flex: 2 }]} editable={false} textAlign={'right'}>X</TextInput>
                <TextInput key={coordState.x} style={[style.textInput, { flex: 5 }]} maxLength={4} value={textXState} onChangeText={setTextXState} onEndEditing={() => setxPos(textXState)} textAlign={'center'} keyboardType={'numeric'} selectTextOnFocus={true} contextMenuHidden={true} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TextInput style={[style.textInput, { flex: 2 }]} editable={false} textAlign={'right'}>Y</TextInput>
                <TextInput key={coordState.y} style={[style.textInput, { flex: 5 }]} maxLength={4} value={textYState} onChangeText={setTextYState} onEndEditing={() => setyPos(textYState)} textAlign={'center'} keyboardType={'numeric'} selectTextOnFocus={true} contextMenuHidden={true} />
            </View>
            <Button color='#1b7931' title={"Go"} onPress={() => { NetworkManager.postCoords(coordState) }} />
        </View>
    );
}

const style = StyleSheet.create({
    textInput: {
        color: '#1b7931',
    }
});