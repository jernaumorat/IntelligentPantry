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

import { StorageManager } from '../StorageManager'
import { NetworkManager } from '../NetworkManager'
import { ThemeSwitch } from './ThemeSwitch';

export const SettingsScreen = (props: any): JSX.Element => {
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
                label:"Scasn",
                control:"text",
                actiion: ()=>{NetworkManager.postScan();;}
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
        <View style={styles.item}>

            {/* inline syting condition for critical items */}
            <Text style ={props.control =="critical text" ? styles.critical: null}>{props.label}</Text>            
            {props.control =="switch" ?
                <Switch 
                    style={styles.switch}
                    value={devMode} 
                    onValueChange={()=>props.actiion()}
                    trackColor={{ false: "#767577", true: "#81b0ff" }} />:null
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
                renderSectionHeader={({section}) => (<Text style={styles.title}>{section.title}</Text>)}
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
        color:'#770000',        
    },
    switch: {
        backgroundColor: "#1b7931",
        alignSelf:"flex-end"
    },
    title: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 22
    }
});