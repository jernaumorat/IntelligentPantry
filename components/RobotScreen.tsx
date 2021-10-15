/*
 * Copyright © 2021 PS2106, licensed under the MIT License, 
 * the full text of which can be found under LICENSE.md at the top level of this repository,
 * or at https://mit-license.org
 */

import React, {
    useLayoutEffect,
    useState
} from 'react';

import {
    View,
    KeyboardAvoidingView,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import { RobotPreset } from './RobotPresets';
import { RobotControls } from './RobotControl';
import { RobotCoordinate } from './RobotCoordinate';
import { Coords, DEFAULT_URL } from '../NetworkManager';
import { StorageManager } from '../StorageManager';

export const RobotScreen = (): JSX.Element => {
    const [imgSrc, setImgSrc] = useState({ uri: DEFAULT_URL, headers: { 'Authorization': 'Bearer ' } })
    const [coordState, setCoordState] = useState<Coords>({ x: 0, y: 0 })
    const updateCoords = (coords: Coords) => setCoordState(coords)

    useLayoutEffect(() => {
        StorageManager.getURL().then(url => {
            StorageManager.getToken().then(tk => {
                setImgSrc({ uri: url + '/robot/camera', headers: { 'Authorization': 'Bearer ' + tk } })
            })
        })
    }, [])

    return (
        <KeyboardAvoidingView behavior={'position'}
            contentContainerStyle={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}
            style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Image style={{ flex: 5, height: '100%', minWidth: '100%' }} source={{ ...imgSrc }} />
                    <RobotPreset coords={coordState} setCoords={updateCoords} />
                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <RobotControls coords={coordState} setCoords={updateCoords} />
                        <RobotCoordinate coords={coordState} setCoords={updateCoords} />
                    </View>
                </View>
            </TouchableWithoutFeedback >
        </KeyboardAvoidingView >
    )
}