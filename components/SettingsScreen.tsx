import React, {
    useState,
    useEffect,
} from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    Image,
    RefreshControl,
} from 'react-native';

// TODO: remove all NewAppScreen imports, then remove from package deps.
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Switch } from '../components';
export const SettingsScreen = (props: any): JSX.Element => {
    return (
        <View style={{ flex: 1, paddingLeft: 30, paddingRight: 30, justifyContent: 'space-evenly' }}>
             <View>
             <Text style={{color: "green", textAlign :"right",width:"100%",alignSelf: 'flex-end' }} >Enable Dark Mode</Text>
             <Switch/>
             </View>
            <Button color={'#1b7931'} title={"Scan"} onPress={() => { }} />
            <Button color={'#1b7931'} title={"Pair"} onPress={() => { }} />
            <Button color={'#1b7931'} title={"Dev Mode"} onPress={() => { }} />
        </View>
    )
}