/*
 * Copyright © 2021 PS2106, licensed under the MIT License, 
 * the full text of which can be found under LICENSE.md at the top level of this repository,
 * or at https://mit-license.org
 */

import React, {
    useState,
    useEffect,
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import { NetworkManager, PDetail } from '../NetworkManager';
import { useTheme } from '@react-navigation/native';
import { StorageManager } from '../StorageManager';

const makeStyles = (colors: any) => StyleSheet.create({
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
        fontWeight: 'bold',
        color: colors.text,
    },
    DetailItem: {
        flex: 3,
        margin: 5,
        padding: 5,
        fontSize: 22,
        textAlign: 'left',
        color: colors.text,
    }
})


export const PantryDetail = ({ route }: any): JSX.Element => {
    const [detailState, setDetailState] = useState<PDetail>();
    const [bearer, setBearer] = useState("");

    const { id } = route.params;

    const update_state = async () => {
        const pdetail: PDetail = await NetworkManager.getPantryDetail(id);
        setDetailState(pdetail);
    }

    useEffect(() => {
        StorageManager.getToken().then(tk => { setBearer(tk) })
        update_state()
    }, [])

    const { colors } = useTheme();
    const pdStyles = makeStyles(colors)
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Image style={{ flex: 5, height: '100%', minWidth: '100%' }} source={{ uri: detailState?.uri, headers: { 'Authorization': 'Bearer ' + bearer } }} />
            <View style={{ flex: 5, flexDirection: 'column' }}>
                <View style={[pdStyles.TableRow]}>
                    <Text style={[pdStyles.DetailHeader]}>Item ID</Text>
                    <Text style={[pdStyles.DetailItem]}>{detailState?.id}</Text>
                </View>
                <View style={[pdStyles.TableRow]}>
                    <Text style={[pdStyles.DetailHeader]}>Item Name</Text>
                    <Text style={[pdStyles.DetailItem]}>{detailState?.label}</Text>
                </View>
                <View style={[pdStyles.TableRow]}>
                    <Text style={[pdStyles.DetailHeader]}>Quantity</Text>
                    <Text style={[pdStyles.DetailItem]}>{detailState?.quantity}</Text>
                </View>
                <View style={[pdStyles.TableRow]}>
                    <Text style={[pdStyles.DetailHeader]}>Location</Text>
                    <Text style={[pdStyles.DetailItem]}>({detailState?.coords.x}, {detailState?.coords.y})</Text>
                </View>
            </View>
        </View>
    )
}