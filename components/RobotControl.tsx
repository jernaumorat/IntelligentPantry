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

export const RobotControls = (props: any): JSX.Element => {
    const coordState = props.coords
    const setCoordState = props.setCoords

    const handlePress = (direction: 'up' | 'down' | 'left' | 'right') => {
        switch (direction) {
            case 'up': {
                let y = coordState.y - 5 < 0 ? 0 : coordState.y - 5
                setCoordState({ ...coordState, y: y })
                break;
            }
            case 'down': {
                let y = coordState.y + 5 > 99 ? 99 : coordState.y + 5
                setCoordState({ ...coordState, y: y })
                break;
            }
            case 'left': {
                let x = coordState.x - 5 < 0 ? 0 : coordState.x - 5
                setCoordState({ ...coordState, x: x })
                break;
            }
            case 'right': {
                let x = coordState.x + 5 > 99 ? 99 : coordState.x + 5
                setCoordState({ ...coordState, x: x })
                break;
            }
        }
    }

    return (
        <View style={{ flex: 7, flexDirection: 'column' }}>
            <View style={style.controlsView}>
                <ArrowButton direction={'up'} size={64} onPress={() => handlePress('up')} />
            </View>
            <View style={style.controlsView}>
                <ArrowButton direction={'left'} size={64} onPress={() => handlePress('left')} />
                <ArrowButton direction={'down'} size={64} onPress={() => handlePress('down')} />
                <ArrowButton direction={'right'} size={64} onPress={() => handlePress('right')} />
            </View>
        </View>
    );
}

interface ArrowProps {
    direction: 'up' | 'down' | 'left' | 'right',
    size: number,
    onPress: any
}

const ArrowButton = (props: ArrowProps): JSX.Element => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Icon name={'caret' + props.direction} size={props.size} color={'#1b7931'} />
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