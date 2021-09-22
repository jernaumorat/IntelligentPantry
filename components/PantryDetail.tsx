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

const pdStyles = StyleSheet.create({
    TableRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    DetailHeader: {
        flex: 2,
        margin: 5,
        padding: 5,
        fontSize: 22,
        textAlign: 'right',
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },
    DetailItem: {
        flex: 3,
        margin: 5,
        padding: 5,
        fontSize: 22,
        textAlign: 'left'
    }
})

export const PantryDetail = ({ route, navigation }: any): JSX.Element => {
    const getURI = (id: number): string => {
        return 'http://192.168.0.248:5000/pantry/' + id + '/img'
    }

    const { id } = route.params;

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Image style={{ flex: 5, height: '100%', minWidth: '100%' }} source={{ uri: getURI(id) }} />
            <View style={{ flex: 5, flexDirection: 'column' }}>
                <View style={[pdStyles.TableRow]}>
                    <Text style={[pdStyles.DetailHeader]}>Item ID</Text>
                    <Text style={[pdStyles.DetailItem]}>1234</Text>
                </View>
                <View style={[pdStyles.TableRow]}>
                    <Text style={[pdStyles.DetailHeader]}>Item Name</Text>
                    <Text style={[pdStyles.DetailItem]}>Ambrosia</Text>
                </View>
                <View style={[pdStyles.TableRow]}>
                    <Text style={[pdStyles.DetailHeader]}>Quantity</Text>
                    <Text style={[pdStyles.DetailItem]}>88</Text>
                </View>
                <View style={[pdStyles.TableRow]}>
                    <Text style={[pdStyles.DetailHeader]}>Date/time recorded</Text>
                    <Text style={[pdStyles.DetailItem]}>01/01/2022 24:61</Text>
                </View>
                <View style={[pdStyles.TableRow]}>
                    <Text style={[pdStyles.DetailHeader]}>Location</Text>
                    <Text style={[pdStyles.DetailItem]}>(51, 49)</Text>
                </View>
            </View>
        </View>
    )
}