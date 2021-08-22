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
import {
    Picker
} from '@react-native-picker/picker';

export const RobotCoordinate = (props:any): JSX.Element=> {
    const [xPos, setxPos] = useState('0')
    const [yPos, setyPos] = useState('0')
    return (
        <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: 'deepskyblue' }}>
            {/* TODO: Make these TextInputs into components */}
            <TextInput value={xPos} onChangeText={setxPos} textAlign={'center'} keyboardType={'numeric'} selectTextOnFocus={true} contextMenuHidden={true} />
            <TextInput value={yPos} onChangeText={setyPos} textAlign={'center'} keyboardType={'numeric'} selectTextOnFocus={true} contextMenuHidden={true} />
            <Button title={"Go"} onPress={() => { }} />
        </View>
    );
}
//export default CoordinateComponent;