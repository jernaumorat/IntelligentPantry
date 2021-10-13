import React, { useLayoutEffect, useState } from "react";
import FirstRunApp from "./FirstRunApp";
import App from "./App";
import { StorageManager } from "./StorageManager";
import SplashScreen from "react-native-splash-screen";

const RootContainer = () => {
    const [firstRunFlow, setFRFlow] = useState(true);

    const endFR = () => {
        setFRFlow(false);
        StorageManager.setFirstRun(false)
    }

    useLayoutEffect(() => {
        (async () => {
            setFRFlow(await StorageManager.getFirstRun())
        })()
    }, [])

    return firstRunFlow ? <FirstRunApp endFR={endFR} /> : <App />
}

export default RootContainer;