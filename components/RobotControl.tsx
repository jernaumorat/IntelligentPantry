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