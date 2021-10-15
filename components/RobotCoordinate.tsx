/*
 * Copyright © 2021 PS2106, licensed under the MIT License, 
 * the full text of which can be found under LICENSE.md at the top level of this repository,
 * or at https://mit-license.org
 */

import React, {
    useState,
    useEffect,
} from 'react';

import {
    View,
    Button,
    StyleSheet,
    TextInput,
    Text,
} from 'react-native';

import { NetworkManager } from '../NetworkManager';

export const RobotCoordinate = (props: any): JSX.Element => {
    const coordState = props.coords
    const setCoordState = props.setCoords

    const [textXState, setTextXState] = useState('0');
    const [textYState, setTextYState] = useState('0');

    const setxPos = (x: String) => setCoordState({ x: Number(x) > 100 ? 100 : Number(x) < 0 ? 0 : Number(x), y: coordState.y })
    const setyPos = (y: String) => setCoordState({ x: coordState.x, y: Number(y) > 100 ? 100 : Number(y) < 0 ? 0 : Number(y) })

    useEffect(() => {
        setTextXState(coordState.x.toString());
        setTextYState(coordState.y.toString())
    }, [coordState])
    return (
        <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={[style.textInput, { flex: 2.5, textAlign: 'right' }]}>X</Text>
                <TextInput key={coordState.x} style={[style.textInput, { flex: 5 }]} maxLength={4} value={textXState} onChangeText={setTextXState} onEndEditing={() => setxPos(textXState)} textAlign={'center'} keyboardType={'numeric'} selectTextOnFocus={true} contextMenuHidden={true} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={[style.textInput, { flex: 2.5, textAlign: 'right' }]}>Y</Text>
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