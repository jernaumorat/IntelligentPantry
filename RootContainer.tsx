import React, { useEffect, useState } from "react";
import FirstRunApp from "./FirstRunApp";
import App from "./App";
import { StorageManager } from "./StorageManager";
import SplashScreen from "react-native-splash-screen";

const RootContainer = () => {
    const [firstRunFlow, setFRFlow] = useState(true);

    const endFR = () => {
        setFRFlow(false);
        StorageManager().getInstance().setFirstRun(false)
    }

    useEffect(() => {
        (async () => {
            setFRFlow(await StorageManager().getInstance().getFirstRun())
        })()

        SplashScreen.hide()
    }, [])

    return firstRunFlow ? <FirstRunApp endFR={endFR} /> : <App />
}

export default RootContainer;