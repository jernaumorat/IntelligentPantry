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

export const RobotCoordinate = (props:any): JSX.Element=> {
    const [xPos, setxPos] = useState('0')
    const [yPos, setyPos] = useState('0')
    return (
        <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-evenly'}}>
            {/* TODO: Make these TextInputs into components */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TextInput style={[style.textInput,{flex:2}]} editable={false} textAlign={'right'}>X</TextInput>
                <TextInput style={[style.textInput,{flex:5}]} maxLength={4} value={xPos} onChangeText={setxPos} textAlign={'center'} keyboardType={'numeric'} selectTextOnFocus={true} contextMenuHidden={true} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TextInput style={[style.textInput,{flex:2}]} editable={false} textAlign={'right'}>Y</TextInput>
                <TextInput style={[style.textInput,{flex:5}]} maxLength={4} value={yPos} onChangeText={setyPos} textAlign={'center'} keyboardType={'numeric'} selectTextOnFocus={true} contextMenuHidden={true} />
            </View>
            <Button color='#1b7931' title={"Go"} onPress={() => { }} />
        </View>
    );
}

const style = StyleSheet.create({
    textInput:{
        color:'#1b7931',
    }
});