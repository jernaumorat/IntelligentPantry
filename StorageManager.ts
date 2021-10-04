import AsyncStorage from "@react-native-async-storage/async-storage";

import { DEFAULT_URL, PItem } from './NetworkManager'

export interface SM {
    id: number,

    getPantryItems(): Promise<PItem[]>,
    setPantryItems(pitems: PItem[]): Promise<void>,

    getURL(): Promise<{ http: string, https: string }>,
    setURL(url: { http: string, https: string }): Promise<void>,

    getToken(): Promise<string>,
    setToken(token: string): Promise<void>,

    getDarkMode(): Promise<'light' | 'dark' | 'system'>,
    setDarkMode(dmode: 'light' | 'dark' | 'system'): Promise<void>,

    getFirstRun(): Promise<boolean>,
    setFirstRun(frun: boolean): Promise<void>,

    resetDefault(): Promise<void>,
}

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
                    return JSON.parse(data) as { http: string, https: string }
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

    export const setURL = async (url: { http: string, https: string }) => {
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

    export const getDarkMode = async () => {
        try {
            let data = await AsyncStorage.getItem('@darkMode');
            if (data) {
                try {
                    return JSON.parse(data) as boolean
                } catch (e) {
                    await setDarkMode('system')
                    console.log(e)
                    return 'system'
                }
            } else {
                return 'system'
            }
        } catch (e) {
            await setDarkMode('system')
            console.log(e)
            return 'system'
        }
    }

    export const setDarkMode = async (dmode: 'light' | 'dark' | 'system') => {
        try {
            let json = JSON.stringify(dmode)
            await AsyncStorage.setItem('@darkMode', json)
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
        await setPantryItems([])
        await setURL(DEFAULT_URL)
        await setToken('')
        await setDarkMode('system')
        await setFirstRun(true)
    }
}