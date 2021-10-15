/*
 * Copyright © 2021 PS2106, licensed under the MIT License, 
 * the full text of which can be found under LICENSE.md at the top level of this repository,
 * or at https://mit-license.org
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    DEFAULT_URL,
    NetworkManager,
    PItem
} from './NetworkManager'

export namespace StorageManager {
    export const getPantryItems = async () => {
        try {
            let data = await AsyncStorage.getItem('@pantryItems');
            if (data) {
                try {
                    return JSON.parse(data) as PItem[]
                } catch (e) {
                    await setPantryItems([])
                    console.log(e)
                    return []
                }
            } else {
                return []
            }
        } catch (e) {
            await setPantryItems([])
            console.log(e)
            return []
        }
    }

    export const setPantryItems = async (pitems: PItem[]) => {
        try {
            let json = JSON.stringify(pitems)
            await AsyncStorage.setItem('@pantryItems', json)
            return
        } catch (e) {
            console.log(e)
            return
        }
    }

    export const getURL = async () => {
        try {
            let data = await AsyncStorage.getItem('@url');
            if (data) {
                try {
                    return JSON.parse(data) as string
                } catch (e) {
                    await setURL(DEFAULT_URL)
                    console.log(e)
                    return DEFAULT_URL
                }
            } else {
                return DEFAULT_URL
            }
        } catch (e) {
            await setURL(DEFAULT_URL)
            console.log(e)
            return DEFAULT_URL
        }
    }

    export const setURL = async (url: string) => {
        try {
            let json = JSON.stringify(url)
            await AsyncStorage.setItem('@url', json)
            return
        } catch (e) {
            console.log(e)
            return
        }
    }

    export const getToken = async () => {
        try {
            let data = await AsyncStorage.getItem('@token');
            if (data) {
                try {
                    return JSON.parse(data) as string
                } catch (e) {
                    await setToken('')
                    console.log(e)
                    return ''
                }
            } else {
                return ''
            }
        } catch (e) {
            await setToken('')
            console.log(e)
            return ''
        }
    }

    export const setToken = async (token: string) => {
        try {
            let json = JSON.stringify(token)
            await AsyncStorage.setItem('@token', json)
            return
        } catch (e) {
            console.log(e)
            return
        }
    }

    export const getDevMode = async () => {
        try {
            let data = await AsyncStorage.getItem('@devMode');
            if (data) {
                try {
                    return JSON.parse(data) as boolean
                } catch (e) {
                    await setDevMode(false)
                    console.log(e)
                    return false
                }
            } else {
                return false
            }
        } catch (e) {
            await setDevMode(false)
            console.log(e)
            return false
        }
    }

    export const setDevMode = async (frun: boolean) => {
        try {
            let json = JSON.stringify(frun)
            await AsyncStorage.setItem('@devMode', json)
            return
        } catch (e) {
            console.log(e)
            return
        }
    }

    export const getFirstRun = async () => {
        try {
            let data = await AsyncStorage.getItem('@firstRun');
            if (data) {
                try {
                    return JSON.parse(data) as boolean
                } catch (e) {
                    await setFirstRun(true)
                    console.log(e)
                    return true
                }
            } else {
                return true
            }
        } catch (e) {
            await setFirstRun(true)
            console.log(e)
            return true
        }
    }

    export const setFirstRun = async (frun: boolean) => {
        try {
            let json = JSON.stringify(frun)
            await AsyncStorage.setItem('@firstRun', json)
            return
        } catch (e) {
            console.log(e)
            return
        }
    }

    export const resetDefault = async () => {
        await NetworkManager.deleteToken()

        await setPantryItems([])
        await setURL(DEFAULT_URL)
        await setToken('')
        await setDevMode(false)
        await setFirstRun(true)
    }
}