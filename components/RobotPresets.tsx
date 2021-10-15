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
    View,
    Button,
    StyleSheet,
} from 'react-native';

import {
    Picker
} from '@react-native-picker/picker';

import Dialog from 'react-native-dialog';

import { NetworkManager, Preset } from '../NetworkManager';
import { useTheme } from '@react-navigation/native';

export const PresetDeleteDialog = (props: any): JSX.Element => {
    return (
        <View>
            <Dialog.Container visible={props.visible}>
                <Dialog.Title>Delete Preset</Dialog.Title>
                <Dialog.Description>Are you sure you want to delete the preset {props.presetLabel}?</Dialog.Description>
                <Dialog.Button label='Cancel' onPress={props.handleCancel} />
                <Dialog.Button label='Delete' onPress={props.handleDelete} color='#ff2020' />
            </Dialog.Container>
        </View>
    )
}

export const PresetCreateDialog = (props: any): JSX.Element => {
    return (
        <View>
            <Dialog.Container visible={props.visible}>
                <Dialog.Title>Create Preset</Dialog.Title>
                <Dialog.Description>Please enter a label for the new preset:</Dialog.Description>
                <Dialog.Input onChangeText={props.handleEdit}></Dialog.Input>
                <Dialog.Button label='Cancel' onPress={props.handleCancel} />
                <Dialog.Button label='Confirm' onPress={props.handleConfirm} color='#1b7931' />
            </Dialog.Container>
        </View>
    )
}

export const RobotPreset = (props: any): JSX.Element => {
    const [presetList, setPresetList] = useState<Preset[]>([])
    const [selected, setSelected] = useState(1)
    const [selLabel, setSelLabel] = useState('')
    const [newLabel, setNewLabel] = useState('')
    const [deleteVis, setDeleteVis] = useState(false);
    const [createVis, setCreateVis] = useState(false)
    const coordState = props.coords
    const setCoordState = props.setCoords
    const { colors } = useTheme();

    const components_from_presets = (data: Preset[]): JSX.Element[] => {
        const final = []

        for (let preset of data) {
            final.push(<Picker.Item key={preset.presetId} color={colors.text} label={preset.label} value={preset.presetId} />)
        }

        if (!final.length) {
            final.push(<Picker.Item key={'placeholder'} color={colors.text} label={'No presets yet...'} />)
        }

        return final
    }

    const preset_recall = () => {
        let newCoords = presetList.filter(item => { return item.presetId === selected })[0].coords
        setCoordState(newCoords);
    }

    const delete_preset = async () => {
        setDeleteVis(false)
        let pre = presetList.filter(item => { return item.presetId === selected })[0]
        if (await NetworkManager.deletePreset(pre)) {
            let pL = presetList
            pL = pL.filter(item => { return item !== pre })
            setPresetList(pL)
            update_state()
        }
    }

    const create_preset = async () => {
        setCreateVis(false)
        let pre = await NetworkManager.postPreset({ presetId: -1, label: newLabel, coords: coordState, presetX: null, presetY: null })
        if (pre) {
            let pL = presetList
            pL.push(pre)
            setPresetList(pL)

            setSelected(pre.presetId)
            setSelLabel(pL.filter(item => { return item.presetId === pre?.presetId })[0].label)
        }
    }

    const update_state = async () => {
        let presets: Preset[]
        try {
            presets = await NetworkManager.getPresets();
        } catch (e) {
            presets = []
        }
        setPresetList(presets);

        if (presets.length) setSelected(presets[0].presetId)
        if (presets.length) setSelLabel(presets.filter(item => { return item.presetId === presets[0].presetId })[0].label)
    }

    useEffect(() => {
        update_state()
    }, [])

    const pickerSelect = (itemVal: number) => {
        setSelected(itemVal)
        setSelLabel(presetList.filter(item => { return item.presetId === itemVal })[0].label)
    }

    return (<>
        <PresetDeleteDialog
            visible={deleteVis}
            handleCancel={() => { setDeleteVis(false) }}
            handleDelete={() => { delete_preset() }}
            presetLabel={selLabel}
        />
        <PresetCreateDialog
            visible={createVis}
            handleCancel={() => { setCreateVis(false) }}
            handleConfirm={() => { create_preset() }}
            handleEdit={(text: string) => { setNewLabel(text) }}
        />
        <View style={{ flex: 2, flexDirection: 'row' }}>
            <View style={[styles.pickerView, { flex: 7 }]}>
                <Picker style={styles.pickerStyle}

                    selectedValue={selected} onValueChange={presetList.length ? pickerSelect : () => { }}>
                    {components_from_presets(presetList)}
                </Picker>
            </View>
            <View style={[styles.pickerView, { flex: 3 }]}>
                <Button title={"Create"} color='#1b7931' onPress={() => { setCreateVis(true) }} />
                <Button title={"Recall"} color='#1b7931' onPress={preset_recall} disabled={!presetList.length} />
                <Button title={"Delete"} color='#1b7931' onPress={() => { setDeleteVis(true) }} disabled={!presetList.length} />
            </View>
        </View>
    </>);
}

const styles = StyleSheet.create({
    pickerView: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    pickerStyle: {

    }
});
