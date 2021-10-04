import { useColorScheme } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { DEFAULT_URL, PItem } from './NetworkManager'

interface SM {
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

export const StorageManager = () => {
    let instance: SM;

    const createInstance = () => {
        return {
            getPantryItems: async () => {
                try {
                    let data = await AsyncStorage.getItem('@pantryItems');
                    if (data) {
                        try {
                            return JSON.parse(data) as PItem[]
                        } catch (e) {
                            await instance.setPantryItems([])
                            console.log(e)
                            return []
                        }
                    } else {
                        return []
                    }
                } catch (e) {
                    await instance.setPantryItems([])
                    console.log(e)
                    return []
                }
            },
            setPantryItems: async (pitems) => {
                try {
                    let json = JSON.stringify(pitems)
                    await AsyncStorage.setItem('@pantryItems', json)
                    return
                } catch (e) {
                    console.log(e)
                    return
                }
            },
            getURL: async () => {
                try {
                    let data = await AsyncStorage.getItem('@url');
                    if (data) {
                        try {
                            return JSON.parse(data) as { http: string, https: string }
                        } catch (e) {
                            await instance.setURL(DEFAULT_URL)
                            console.log(e)
                            return DEFAULT_URL
                        }
                    } else {
                        return DEFAULT_URL
                    }
                } catch (e) {
                    await instance.setURL(DEFAULT_URL)
                    console.log(e)
                    return DEFAULT_URL
                }
            },
            setURL: async (url) => {
                try {
                    let json = JSON.stringify(url)
                    await AsyncStorage.setItem('@url', json)
                    return
                } catch (e) {
                    console.log(e)
                    return
                }
            },
            getToken: async () => {
                try {
                    let data = await AsyncStorage.getItem('@token');
                    if (data) {
                        try {
                            return JSON.parse(data) as string
                        } catch (e) {
                            await instance.setToken('')
                            console.log(e)
                            return ''
                        }
                    } else {
                        return ''
                    }
                } catch (e) {
                    await instance.setToken('')
                    console.log(e)
                    return ''
                }
            },
            setToken: async (token) => {
                try {
                    let json = JSON.stringify(token)
                    await AsyncStorage.setItem('@token', json)
                    return
                } catch (e) {
                    console.log(e)
                    return
                }
            },
            getDarkMode: async () => {
                try {
                    let data = await AsyncStorage.getItem('@darkMode');
                    if (data) {
                        try {
                            return JSON.parse(data) as boolean
                        } catch (e) {
                            await instance.setDarkMode('system')
                            console.log(e)
                            return 'system'
                        }
                    } else {
                        return 'system'
                    }
                } catch (e) {
                    await instance.setDarkMode('system')
                    console.log(e)
                    return 'system'
                }
            },
            setDarkMode: async (dmode) => {
                try {
                    let json = JSON.stringify(dmode)
                    await AsyncStorage.setItem('@darkMode', json)
                    return
                } catch (e) {
                    console.log(e)
                    return
                }
            },
            getFirstRun: async () => {
                try {
                    let data = await AsyncStorage.getItem('@firstRun');
                    if (data) {
                        try {
                            return JSON.parse(data) as boolean
                        } catch (e) {
                            await instance.setFirstRun(true)
                            console.log(e)
                            return true
                        }
                    } else {
                        return true
                    }
                } catch (e) {
                    await instance.setFirstRun(true)
                    console.log(e)
                    return true
                }
            },
            setFirstRun: async (frun) => {
                try {
                    let json = JSON.stringify(frun)
                    await AsyncStorage.setItem('@firstRun', json)
                    return
                } catch (e) {
                    console.log(e)
                    return
                }
            },
            resetDefault: async () => {
                await instance.setPantryItems([])
                await instance.setURL(DEFAULT_URL)
                await instance.setToken('')
                await instance.setDarkMode('system')
                await instance.setFirstRun(true)
            }
        } as SM
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }

            return instance;
        }
    }
}