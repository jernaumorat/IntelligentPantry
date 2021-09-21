import * as React from 'react';
import {lightColors, darkColors, Colors} from './colorThemes';

export interface Theme {
    isDark: boolean;
    colors: Colors;
    setScheme: (val: 'dark' | 'light') => void;
    
}

export var ThemeContext = React.createContext<Theme>({
    isDark: false,
    colors: lightColors,
    setScheme: () => {
    
    },
     
});

export const useTheme = () => React.useContext(ThemeContext);
