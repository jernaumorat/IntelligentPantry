import * as React from 'react';
import { useState } from 'react';
import {Switch as RNSwitch, Text, useColorScheme, View} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import { EventRegister } from 'react-native-event-listeners'

export const Switch = (props: any): JSX.Element => {
    var {setScheme, isDark} = useTheme();
    
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleScheme = () => {
       
        setIsEnabled(previousState => !previousState);
        EventRegister.emit('changeTheme', isEnabled);
        
    }

    return (

        <RNSwitch value={isEnabled} onValueChange={toggleScheme}/>
        
    ); 

}