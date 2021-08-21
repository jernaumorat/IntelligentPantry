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
    KeyboardAvoidingView,
    Image,
    RefreshControl,
    Button,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';

const PantryDetail = ({ route, navigation }: any): JSX.Element => {
    const getURI = (id: number): string => {
        return 'http://192.168.0.248:5000/pantry/knownitems/' + id + '/img'
    }

    const { id } = route.params;

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Image style={{ flex: 5, height: '100%', minWidth: '100%' }} source={{ uri: getURI(id) }} />
            <View style={{ flex: 5 }}>
                <Text>Item ID</Text>
                <Text>Item Name</Text>
                <Text>Quantity</Text>
                <Text>Date/time recorded</Text>
                <Text>Located at (x,y)</Text>
            </View>
        </View>
    )
}

export default PantryDetail;