import React from "react";

import { Button, SafeAreaView } from "react-native";

const FirstRunApp: React.FC<{ endFR: React.Dispatch<React.SetStateAction<boolean>> }> = ({ endFR }) => {
    return (
        <SafeAreaView>
            <Button title={"End Flow"} onPress={() => { endFR(false) }} />
        </SafeAreaView>
    )
}

export default FirstRunApp;