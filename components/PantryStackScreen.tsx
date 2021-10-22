/*
 * Copyright © 2021 PS2106, licensed under the MIT License, 
 * the full text of which can be found under LICENSE.md at the top level of this repository,
 * or at https://mit-license.org
 */

import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import {
    Platform,
    Text,
    TouchableOpacity
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PantryScreen } from './PantryScreen'
import { PantryDetail } from './PantryDetail'

const PantryStack = createNativeStackNavigator();

export const PantryStackScreen = ({ navigation, devMode }: any): JSX.Element => {
    const modalRef = useRef<ModalSelector>();
    const [sortType, setSortType] = useState<{
        sort: 'alpha' | 'quant',
        direction: 'asc' | 'dsc'
    }>({
        sort: 'quant',
        direction: 'dsc'
    })

    useEffect(() => {
        let osPrefix = (Platform.OS == ('ios' || 'macos')) ? 'ios-' : 'md-'
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 20, padding: 5 }} onPress={() => modalRef.current?.open()}>
                    <Ionicons name={osPrefix + 'funnel'} size={24} color={"#1b7931"} />
                </TouchableOpacity>
            )
        })
    }, [navigation])
    return (
        <>
            <ModalSelector
                ref={modalRef}
                animationType={'fade'}
                listType={'FLATLIST'}
                backdropPressToClose={true}
                touchableStyle={{ display: 'none' }}
                optionTextStyle={{ fontSize: 25 }}
                cancelTextStyle={{ fontSize: 25 }}
                cancelText={'Cancel'}
                data={[
                    { key: 'aa', label: 'Alphabetical (ascending)' },
                    { key: 'ad', label: 'Alphabetical (descending)' },
                    { key: 'qa', label: 'Quantity (ascending)' },
                    { key: 'qd', label: 'Quantity (descending)' }]}
                onChange={({ key }) => {
                    switch (key) {
                        case 'aa':
                            setSortType({ sort: 'alpha', direction: 'asc' })
                            break
                        case 'ad':
                            setSortType({ sort: 'alpha', direction: 'dsc' })
                            break
                        case 'qa':
                            setSortType({ sort: 'quant', direction: 'asc' })
                            break
                        case 'qd':
                            setSortType({ sort: 'quant', direction: 'dsc' })
                            break
                    }
                }}
            />
            <PantryStack.Navigator>
                <PantryStack.Screen name="AllItems" options={{ headerShown: false }}>
                    {props => <PantryScreen {...props} devMode={devMode} sortType={sortType} setSortType={setSortType} />}
                </PantryStack.Screen>
                {devMode ? <PantryStack.Screen name="Item Detail" component={PantryDetail} /> : <></>}
            </PantryStack.Navigator>
        </>
    )
}