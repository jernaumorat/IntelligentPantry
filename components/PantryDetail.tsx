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

import { NetworkManager, PItem } from '../NetworkManager';

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
    const [detailState, setDetailState] = useState<PItem>();

    const { id } = route.params;

    let nm = NetworkManager().getInstance()
    const imgurl = nm.url + '/pantry/' + id + '/img'

    const update_state = async () => {
        const pdetail: PItem = await nm.getPantryDetail(id);
        setDetailState(pdetail);
    }

    useEffect(() => {
        update_state()
    }, [])

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Image style={{ flex: 5, height: '100%', minWidth: '100%' }} source={{ uri: imgurl }} />
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
                {/* <View style={[pdStyles.TableRow]}>
                    <Text style={[pdStyles.DetailHeader]}>Location</Text>
                    <Text style={[pdStyles.DetailItem]}>({detailState?.coords.x || 0}, {detailState?.coords.y})</Text>
                </View> */}
            </View>
        </View>
    )
}