/*
 * Copyright © 2021 PS2106, licensed under the MIT License, 
 * the full text of which can be found under LICENSE.md at the top level of this repository,
 * or at https://mit-license.org
 */

import React, {
    useEffect,
    useState
} from "react";
import SplashScreen from "react-native-splash-screen";

import FirstRunApp from "./FirstRunApp";
import App from "./App";
import { StorageManager } from "./StorageManager";

const RootContainer = () => {
    const [firstRunFlow, setFRFlow] = useState(true);

    const endFR = () => {
        setFRFlow(false);
        StorageManager.setFirstRun(false)
    }

    useEffect(() => {
        StorageManager.getFirstRun().then(fr => { setFRFlow(fr); SplashScreen.hide() })
    }, [])

    return firstRunFlow ? <FirstRunApp endFR={endFR} /> : <App />
}

export default RootContainer;