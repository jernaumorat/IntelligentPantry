import * as React from 'react';
import { useState } from 'react';
import {Switch as RNSwitch, Text, useColorScheme, View} from 'react-native';

//react native Library used to send and recieve events https://www.npmjs.com/package/react-native-event-listeners
import { EventRegister } from 'react-native-event-listeners'


//create a toggle switch component provided by react native 
export const Switch = (props: any): JSX.Element => {
    
    // variable to hold the toggle state or value ie true/flase 
    const [isEnabled, setIsEnabled] = useState(false);
    
    const toggleScheme = () => {
        //set switched value to isEnabled variable
        setIsEnabled(previousState => !previousState);
         // emit signal(envoke changeTheme event) to change theme in the App.tsx with value of switch 
        EventRegister.emit('changeTheme', !isEnabled);
        
    }

    return (
       
        <RNSwitch
        trackColor={{true: 'grey', false: 'black'}}
        style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
        value={isEnabled} onValueChange={toggleScheme}/>
        
    );
}
