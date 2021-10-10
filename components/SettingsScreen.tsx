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
    SectionList,
    View,
    Button,
    Image,
    RefreshControl,
    Switch,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from "@react-navigation/native";
import { StorageManager } from '../StorageManager'
import { NetworkManager } from '../NetworkManager'
import { ThemeSwitch } from './ThemeSwitch';

export const SettingsScreen = (props: any): JSX.Element => {
    const colors = useTheme().colors
    // load props
    const devMode = props.devMode
    const setDevMode = props.setDevMode
    //function called on devmode click. sets devMode prop for app.tsx to remove nav item
    const onClickDevMode = () => {
        setDevMode(!devMode);
    }
    // Menu item Strings
    // control criti
    const MENU = [
        {
            title: "Robot",
            data: [
            {
                label:"Scan",
                control:"text",
                actiion: ()=>{NetworkManager.postScan();}
            },
            { 
                label:"Pair",
                control:"text",
                actiion: ()=>{NetworkManager.getPairingCode;}   /*need to insert correct function here*/
            }]
          },
        {
            title: "System",
            data: [
                {
                    label:"Dev Mode",
                    control:"switch",
                    actiion: ()=>{setDevMode(!devMode);}
                },
                {
                    label:"Reset All Settings",
                    control:"critical text",
                    actiion: ()=>{StorageManager.resetDefault();;}
                }]
        }
    ];
    
    const Item = (props: any) => (
        <TouchableOpacity onPress={()=>props.actiion()}>
        <View style={{...styles.item,backgroundColor: colors.card,}}>
            {/* inline syting condition for critical items */}
            <Text style ={props.control =="critical text" ? styles.critical : {color: colors.text}}>
                {props.label}
            </Text>
            {props.control =="switch" ?
                <Switch 
                    value={devMode} 
                    onValueChange={()=>props.actiion()}
                    trackColor={{ false: "#a1a1a1", true: "#a1a1a1" }}
                    thumbColor={devMode ? "#1e9e27" : "#f4f3f4"} />:null
            }
        </View>
        </TouchableOpacity>
      );

    return (
        <View style={{
            flex: 1, justifyContent: 'space-evenly', paddingTop: StatusBar.currentHeight,
            marginHorizontal: 32
        }}>
            <SectionList
                sections={MENU}
                renderItem={({item}) =>(Item(item)) }
                renderSectionHeader={({section}) => (<Text style={{...styles.title,color: colors.text}}>{section.title}</Text>)}
                keyExtractor={(item, index) => item.label + index}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
    },
    item: {
        flexDirection: "row",
        backgroundColor: "#1b7931",
        padding: 15,
        marginVertical: 1
    },
    critical: {
        fontSize: 16,
        color:'#c70c28',
    },
    title: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 22
    }
});