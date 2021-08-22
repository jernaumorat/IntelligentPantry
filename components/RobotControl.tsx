import React, {
    useState,
    useEffect,
} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export const RobotControls = (props:any): JSX.Element=> {
    return (
        <View style={{ flex: 7, flexDirection: 'column' }}>
            <View style={style.controlsView}>
                <ArrowButton direction={'up'} size={64} />
            </View>
            <View style={style.controlsView}>
                <ArrowButton direction={'left'} size={64} />
                <ArrowButton direction={'down'} size={64} />
                <ArrowButton direction={'right'} size={64} />
            </View>
        </View>
    );
}

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
const style = StyleSheet.create({
    controlsView: {  
        flex: 1, 
        flexDirection: 'row',      
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});